import os
import numpy as np
import pandas as pd
import geopandas as gpd
import xarray as xr
import rioxarray
import rasterio
import regionmask
import cartopy.crs as ccrs
from tqdm import tqdm
import matplotlib.pyplot as plt
from mpl_toolkits.axes_grid1 import make_axes_locatable
import subprocess


def set_lat_lon_attrs(ds):
    """ Set CF latitude and longitude attributes"""
    ds["lon"] = ds.lon.assign_attrs({
      'axis' : 'X',
       'long_name' : 'longitude',
        'standard_name' : 'longitude',
         'stored_direction' : 'increasing',
          'type' : 'double',
           'units' : 'degrees_east',
            'valid_max' : 360.0,
             'valid_min' : -180.0
             })
    ds["lat"] = ds.lat.assign_attrs({
      'axis' : 'Y',
       'long_name' : 'latitude',
        'standard_name' : 'latitude',
         'stored_direction' : 'increasing',
          'type' : 'double',
           'units' : 'degrees_north',
            'valid_max' : 90.0,
             'valid_min' : -90.0
             })
    return ds


def create_ds_mask(df, ds, name, lon_name='lon', lat_name='lat'):
    """Create masks of geographical regions"""
    # Create index column
    if 'index' not in df:
        df = df.reset_index(drop=True).reset_index()

    # Extract indexes and geoms that are large enough!
    id_ints = df['index'].values
    geoms = df['geometry'].values
    
    print(f'Number of indexes: {len(id_ints)}')
    print(f'Number of geoms: {len(geoms)}')


    # create mask object
    da_mask = regionmask.Regions(
      name = name,
      numbers = id_ints,
      outlines = geoms)\
      .mask(ds, lon_name=lon_name, lat_name=lat_name)\
      .rename(name)

    # get the ints actually written to mask
    id_ints_mask = da_mask.to_dataframe().dropna()[name].unique()
    id_ints_mask = np.sort(id_ints_mask).astype('int')
    
    print(f'Number of ints in mask: {len(id_ints_mask)}')
    
    # get the ints not written to mask
    id_ints_not_in_mask = df[~df['index'].isin(id_ints_mask)]['index'].values
    
    if len(id_ints_not_in_mask) > 0: 
        print(f'Ints not in mask: {id_ints_not_in_mask}')
    
    # update da attributes
    da_mask.attrs['id_ints'] = id_ints_mask
    da_mask = set_lat_lon_attrs(da_mask)
    
    return da_mask, id_ints_not_in_mask

def number_of_digits(x):
    """Get number of digits to the left/right of a decimal point"""
    # Number of digits to the left of the decimal point
    dig_left = int(np.log10(x))+1
    # Number of digits to the right of the decimal point
    if '.' in str(x):
        decList = [int(y) for y in list(str(x).split('.')[1])]
        dig_right = next((i for i, x in enumerate(decList) if x), None) + 1
    else:
        dig_right = 0
        
    return dig_left, dig_right

def find_nearest(array, value):
    """Find nearest value in numpy array"""
    array = np.asarray(array)
    
    # Get the mean step values
    step = np.abs(np.diff(array)).max()*1.5
    
    # Find the nearest values
    diff = np.abs(array - value)
    idx = np.argwhere((diff >= np.amin(diff) - step) & (diff <= np.amin(diff) + step))

    return idx

def get_nearest_xy_from_latlon(ds, lat, lon, lon_name='lon', lat_name='lat'):
    """Return the x/y values for a given longitude/latitude values"""
    # Read all lon/lat values
    lons = ds[lon_name].data
    lats = ds[lat_name].data
    
    # Get mean lon/lat step size 
    mean_lat_size = np.abs(np.diff(lats)).mean()
    #print(mean_y_size)
    mean_lon_size = np.abs(np.diff(lons)).mean()
    
    # Round lon/lat values to the first decimal place
    dig_left, dig_right = number_of_digits(mean_lat_size) 
    if dig_right == 0: 
        lat = round(lat)
    else:
        lat = round(lat, dig_right)
        
    dig_left, dig_right = number_of_digits(mean_lon_size) 
    if dig_right == 0: 
        lon = round(lon)
    else:
        lon = round(lon, dig_right)
    
    # Find the positions of the nearest longitude/latitude values
    idx_lon = find_nearest(lons, lon)
    idx_lat = find_nearest(lats, lat)
    
    # Check the identical rows in both arrays
    res = (idx_lon[:, None] == idx_lat).all(-1).any(-1)
    yx_positions = idx_lon[res]
    
    
    if yx_positions.shape[0] == 0:
        raise Exception("Sorry, lat/lon values outside data domain")   
    if yx_positions.shape[0] > 1:
        # If more than one identical rows take the row nearest to the mean value
        yx_positions = np.mean(yx_positions,axis=0).astype(int).reshape(1,2)

    # Get the x/y values
    x_position = yx_positions[0][1]
    y_position = yx_positions[0][0]
    
    x = ds.rlon.data[yx_positions[0][1]]
    y = ds.rlat.data[yx_positions[0][0]]

    return x_position, y_position, x, y

def get_nearest_latlon_from_latlon(ds, lat, lon, lon_name='lon', lat_name='lat'):
    """Return the x/y values for a given longitude/latitude values"""
    # Read all lon/lat values
    lons = ds[lon_name].data
    lats = ds[lat_name].data
    
    # Get mean lon/lat step size 
    mean_lat_size = np.abs(np.diff(lats)).mean()
    #print(mean_y_size)
    mean_lon_size = np.abs(np.diff(lons)).mean()
    
    # Round lon/lat values to the first decimal place
    dig_left, dig_right = number_of_digits(mean_lat_size) 
    if dig_right == 0: 
        lat = round(lat)
    else:
        lat = round(lat, dig_right)
        
    dig_left, dig_right = number_of_digits(mean_lon_size) 
    if dig_right == 0: 
        lon = round(lon)
    else:
        lon = round(lon, dig_right)
    
    # Find the positions of the nearest longitude/latitude values
    lon_positions = find_nearest(lons, lon)
    lat_positions = find_nearest(lats, lat)
    
    # If more than one identical rows take the row nearest to the mean value
    lon_position = round(np.mean(lon_positions))
    lat_position = round(np.mean(lat_positions))

    return lon_position, lat_position

def get_centroid_values(gdf, ds, da, id_ints_not_in_mask, logical_coordinates=False, lon_name='lon', lat_name='lat'):

    #Add geometries smaller than mean cell size into the mask
    print("Adding values for geometries smaller than mean cell size:")
    gdf_not_in_mask = gdf.iloc[id_ints_not_in_mask].copy()
    gdf_not_in_mask['centroid'] = gdf_not_in_mask['geometry'].apply(lambda x: x.centroid)
    
    values = []
    for id_int in tqdm(id_ints_not_in_mask):
        lon = gdf_not_in_mask['centroid'].loc[id_int].x
        lat = gdf_not_in_mask['centroid'].loc[id_int].y
        
        if logical_coordinates:
            # Get x/y positions for the corresponding longitude/latitude values
            x_pos, y_pos, x, y = get_nearest_xy_from_latlon(ds, lat, lon, lon_name=lon_name, lat_name=lat_name)
        else:
            # Get longitude/latitude positions for the corresponding longitude/latitude values
            x_pos, y_pos = get_nearest_latlon_from_latlon(ds, lat, lon, lon_name=lon_name, lat_name=lat_name)
        
        # Replace cell value with new int
        values.append(da.data[:, y_pos, x_pos])
            
    return values

def display_figures(gdf, gdf_vectors, gdf_ids, geometry, ds_rasters, dataset, indicator, scenario, year, bbox, cmap='magma'):
    df = gdf[geometry].copy()
    df = df[(df['dataset'] == dataset) & (df['indicator'] == indicator) & (df['scenario'] == scenario) & (df['year'] == year)]
    
    df = pd.merge(gdf_vectors[geometry],  df, on=gdf_ids[geometry], how='left')
    
    fig = plt.figure(figsize=(25,10))
    
    ax1 = fig.add_subplot(121)
    ax2 = fig.add_subplot(122, projection=ccrs.PlateCarree())
    
    divider = make_axes_locatable(ax1)
    cax = divider.append_axes("right", size="5%", pad=-0.5) 
    df.plot(ax=ax1, column='value', cmap=cmap, legend=True, cax=cax, legend_kwds={'label': indicator})
    ax1.set_title(f'time = {year}, scenario = {scenario}')
    
    
    ax2.set_global()
    ds_rasters[dataset].sel(scenario=scenario).sel(time=year)[indicator].plot.pcolormesh(ax=ax2, cmap=cmap, transform=ccrs.PlateCarree(), x='lon', y='lat', add_colorbar=True)
    ax2.coastlines()
    ax2.set_ylim([bbox[1]-1,bbox[3]+1]);
    ax2.set_xlim([bbox[0]-1,bbox[2]+1]);
