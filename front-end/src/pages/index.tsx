import { useCallback, useState, useMemo, useEffect } from 'react';

import ReactMarkdown from 'react-markdown';
import { useDispatch } from 'react-redux';

import flatten from 'lodash/flatten';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { setActiveDatasets } from 'store/features/datasets';
import { setLayerParams } from 'store/features/layers';
import { setBasemap, setBoundaries, setLabels } from 'store/features/ui/map';
import { useAppSelector } from 'store/hooks';

import PluginMapboxGl from '@vizzuality/layer-manager-plugin-mapboxgl';
import { LayerManager, Layer } from '@vizzuality/layer-manager-react';
import queryString from 'query-string';
import {
  Legend,
  LegendListItem,
  LegendItemToolbar,
  LegendItemTypes,
  Icons,
} from 'vizzuality-components';

import Icon from 'components/icon';
import Map from 'components/map';
import { DEFAULT_VIEWPORT } from 'components/map/constants';
import BasemapControls from 'components/map/controls/basemap';
import ZoomControls from 'components/map/controls/zoom';
import Modal from 'components/modal';
import { GAPage } from 'lib/analytics/ga';
import { AppDispatch } from 'store';
import { getLayerGroups } from 'utils/layers';

import RW_LOGO_SVG from 'svgs/rw-logo.svg?sprite';

const DEFAULT_MODAL_STATE = {
  title: null,
  content: null,
};
export interface ViewPortTypes {
  zoom?: number;
  pitch?: number;
  longitude?: number;
  latitude: number;
}

export interface URLParams {
  lat?: string;
  lng?: string;
  zoom?: string;
  datasets?: string;
  embed?: string;
}

export interface QueryParams {
  lat?: number;
  lng?: number;
  zoom?: number;
  datasets?: string[];
  embed?: boolean;
}

const Home: React.FC = () => {
  const router = useRouter();

  const [modalContent, setModalContent] = useState(DEFAULT_MODAL_STATE);
  const [layersOrder, setLayersOrder] = useState([]);
  const dispatch: AppDispatch = useDispatch();
  const basemap = useAppSelector((state) => state.map.basemap);
  const labels = useAppSelector((state) => state.map.labels);
  const boundaries = useAppSelector((state) => state.map.boundaries);
  const layerParams = useAppSelector((state) => state.layers);
  const activeDatasets = useAppSelector((state) => state.activeDatasets);
  const { pathname } = router;
  const [viewport, setViewport] = useState<Partial<ViewPortTypes>>(DEFAULT_VIEWPORT);
  const [query, setQuery] = useState<QueryParams>({ embed: false });

  // // const handleViewport = useCallback((_viewport) => {
  // //   setViewport(_viewport);
  // // }, []);

  // // const handleZoom = useCallback((zoom) => {
  // //   setViewport((prevViewport) => ({
  // //     ...prevViewport,
  // //     zoom,
  // //     transitionDuration: 250,
  // //   }));
  // // }, []);

  // // const handleBasemap = useCallback(({ id }) => {
  // //   dispatch(setBasemap(id));
  // // }, []);

  // // const handleBoundaries = useCallback((_boundaries) => {
  // //   dispatch(setBoundaries(_boundaries));
  // // }, []);

  // // const handleLabels = useCallback(({ value }) => {
  // //   dispatch(setLabels(value));
  // // }, []);

  // // const onChangeOrder = useCallback((newOrder) => {
  // //   setLayersOrder(newOrder);
  // // }, []);

  // // const onChangeOpacity = useCallback((layer, opacity) => {
  // //   dispatch(
  // //     setLayerParams({
  // //       id: layer.id,
  // //       params: {
  // //         opacity,
  // //       },
  // //     })
  // //   );
  // // }, []);

  // // const onChangeVisibility = useCallback((layer) => {
  // //   dispatch(
  // //     setLayerParams({
  // //       id: layer.id,
  // //       params: {
  // //         visibility: !layer.visibility,
  // //       },
  // //     })
  // //   );
  // // }, []);

  // // const onChangeLayer = useCallback(() => {}, []);

  // // const onRemoveLayer = useCallback(
  // //   (layer) => {
  // //     dispatch(
  // //       setActiveDatasets(activeDatasets.filter((datasetId) => datasetId !== layer.dataset))
  // //     );
  // //   },
  // //   [activeDatasets]
  // // );

  // // const { data: datasets } = useFetchDatasets(
  // //   {},
  // //   {
  // //     placeholderData: [],
  // //   }
  // // );

  // const layers = useMemo(
  //   () =>
  //     flatten(
  //       datasets
  //         .filter(({ id }) => activeDatasets.includes(id))
  //         .map(({ layer }) =>
  //           layer.map((_layer) => ({
  //             ..._layer,
  //             ...(layerParams[_layer.id] || {}),
  //           }))
  //         )
  //     ).sort((a, b) => (layersOrder.indexOf(a.dataset) > layersOrder.indexOf(b.dataset) ? 1 : -1)),
  //   [datasets, activeDatasets, layerParams, layersOrder]
  // );

  // const layerGroups = useMemo(() => getLayerGroups(layers, layerParams), [layers, layerParams]);

  // const onChangeInfo = useCallback(
  //   (layer) => {
  //     const datasetMetadata = datasets.find(({ id }) => id === layer.dataset)?.metadata;

  //     const { name, source, description, info } = datasetMetadata?.[0];

  //     const {
  //       technical_title: techincalTitle,
  //       sources,
  //       functions,
  //       cautions,
  //       citations,
  //       license,
  //       license_link: licenseLink,
  //       spatial_resolution: spatialResolution,
  //       date_of_content: dateOfContent,
  //       geographic_coverage: geographicCoverage,
  //       learn_more_link: learnMoreLink,
  //       data_download_original_link: dataDownloadOriginalLink,
  //       data_download_link: dataDownloadLink,
  //     } = info;

  //     setModalContent({
  //       title: name,
  //       content: (
  //         <div>
  //           <h2>{name}</h2>
  //           <p className="text-xs">SOURCE: {source}</p>

  //           {functions && <p>{functions}</p>}

  //           <p>
  //             <ul>
  //               <li>
  //                 {(dataDownloadLink || dataDownloadOriginalLink) && (
  //                   <a
  //                     target="_blank"
  //                     rel="noopener noreferrer"
  //                     href={dataDownloadLink || dataDownloadOriginalLink}
  //                   >
  //                     Download
  //                   </a>
  //                 )}
  //               </li>
  //               <li>
  //                 {learnMoreLink && (
  //                   <a target="_blank" rel="noopener noreferrer" href={learnMoreLink}>
  //                     Learn more from source
  //                   </a>
  //                 )}
  //               </li>
  //             </ul>
  //           </p>
  //           {description && <ReactMarkdown>{description}</ReactMarkdown>}

  //           <h3>Further Information</h3>

  //           {techincalTitle && (
  //             <div>
  //               <h4>Formal Name</h4>
  //               <p>{techincalTitle}</p>
  //             </div>
  //           )}

  //           {cautions && (
  //             <div>
  //               <h4>Cautions</h4>
  //               <ReactMarkdown>{cautions}</ReactMarkdown>
  //             </div>
  //           )}

  //           {citations && (
  //             <div>
  //               <h4>Suggested Citation</h4>
  //               <ReactMarkdown>{citations}</ReactMarkdown>
  //             </div>
  //           )}

  //           {spatialResolution && (
  //             <div>
  //               <h4>Spatial Resolution</h4>
  //               <p>{spatialResolution}</p>
  //             </div>
  //           )}

  //           {sources.length && (
  //             <div>
  //               <h4>Sources</h4>
  //               <p>
  //                 <ul>
  //                   {sources.map((sourceMeta) => (
  //                     <li>{sourceMeta['source-name'] || sourceMeta['source-description']}</li>
  //                   ))}
  //                 </ul>
  //               </p>
  //             </div>
  //           )}

  //           {license && (
  //             <div>
  //               <h4>License</h4>
  //               <p>
  //                 {licenseLink ? (
  //                   <a target="_blank" rel="noreferrer noopener" href={licenseLink}>
  //                     {license}
  //                   </a>
  //                 ) : (
  //                   license
  //                 )}
  //               </p>
  //             </div>
  //           )}

  //           {dateOfContent && (
  //             <div>
  //               <h4>Date of content</h4>
  //               <p>{dateOfContent}</p>
  //             </div>
  //           )}

  //           {geographicCoverage && (
  //             <div>
  //               <h4>Geographic coverage</h4>
  //               <p>{geographicCoverage}</p>
  //             </div>
  //           )}
  //         </div>
  //       ),
  //     });
  //   },
  //   [datasets]
  // );

  // useEffect(() => {
  //   const defaultDatasets = datasets.filter(({ active }) => active).map(({ id }) => id);
  //   const newActiveDatasets = query?.datasets?.length ? query.datasets : defaultDatasets;

  //   dispatch(setActiveDatasets(newActiveDatasets));
  // }, [datasets, query]);

  // useEffect(() => {
  //   GAPage(pathname);
  // }, [pathname]);

  // useEffect(() => {
  //   const urlParams = queryString.parse(window.location.search) as URLParams;
  //   const datasetsParsed = urlParams.datasets?.split(',');

  //   setQuery({
  //     ...(urlParams.lat && { latitude: +urlParams.lat }),
  //     ...(urlParams.lng && { longitude: +urlParams.lng }),
  //     ...(urlParams.zoom && { zoom: +urlParams.zoom }),
  //     ...(urlParams.datasets && { datasets: datasetsParsed }),
  //     ...(urlParams.embed && { embed: Boolean(urlParams.embed) }),
  //   });
  // }, []);

  // useEffect(() => {
  //   if (query) setViewport({ ...DEFAULT_VIEWPORT, ...query });
  // }, [query]);

  // useEffect(() => {
  //   const { latitude, longitude, zoom } = viewport;
  //   router.push(
  //     {
  //       pathname: '/',
  //       query: {
  //         ...(latitude && { lat: latitude }),
  //         ...(longitude && { lng: longitude }),
  //         ...(zoom && { zoom }),
  //         ...(activeDatasets.length && { datasets: activeDatasets.join(',') }),
  //         ...(query?.embed && { embed: 'true' }),
  //       },
  //     },
  //     `/?lat=${latitude}&lng=${longitude}&zoom=${zoom}${
  //       activeDatasets.length ? `&datasets=${activeDatasets}` : ''
  //     }${query?.embed ? `&embed=true` : ''}`,
  //     {
  //       shallow: true,
  //     }
  //   );
  // }, [viewport, activeDatasets]);

  return (
    <>
      <Head>
        <title>Impactos del cambio climático en la agricultura española</title>
        <meta name="description" content="" />
      </Head>
      <h1>Impactos del cambio climático en la agricultura española</h1>
      {/* <div
        className="relative flex flex-col"
        style={{ height: query?.embed ? '100vh' : 'calc(100vh - 75px)' }}
      >
        <div className="absolute top-0 left-0 right-0 h-full">
          <Map
            mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
            viewport={viewport}
            basemap={basemap}
            labels={labels}
            boundaries={boundaries}
            onMapViewportChange={handleViewport}
          >
            {(map) => (
              <>
                <LayerManager map={map} plugin={PluginMapboxGl}>
                  {layers.map((l) => (
                    <Layer key={l.id} {...l} />
                  ))}
                </LayerManager>
              </>
            )}
          </Map>
          <div className="absolute z-10 top-10 right-5">
            <ZoomControls viewport={viewport} onZoomChange={handleZoom} />
            <BasemapControls
              basemap={basemap}
              labels={labels}
              boundaries={boundaries}
              onChangeBasemap={handleBasemap}
              onChangeLabels={handleLabels}
              onChangeBoundaries={handleBoundaries}
            />
          </div>
          <div className="absolute z-10 max-w-sm bottom-10 right-5 lg:max-w-none">
            <Legend maxHeight={300} onChangeOrder={onChangeOrder}>
              {layerGroups.map((lg, i) => (
                <LegendListItem
                  index={i}
                  key={lg.id}
                  layerGroup={lg}
                  toolbar={<LegendItemToolbar />}
                  onChangeInfo={onChangeInfo}
                  onChangeOpacity={onChangeOpacity}
                  onChangeVisibility={onChangeVisibility}
                  onChangeLayer={onChangeLayer}
                  onRemoveLayer={onRemoveLayer}
                >
                  <LegendItemTypes />
                </LegendListItem>
              ))}
            </Legend>
          </div>
          {query?.embed && (
            <div className="absolute z-10 bottom-6 left-96">
              <a href="https://resourcewatch.org">
                <Icon
                  icon={RW_LOGO_SVG}
                  className="text-white"
                  style={{
                    width: 200,
                    height: 35,
                  }}
                />
              </a>
            </div>
          )}
        </div>
      </div> */}
      <Modal
        open={Boolean(modalContent.content)}
        onDismiss={() => setModalContent(DEFAULT_MODAL_STATE)}
        title={modalContent.title}
      >
        <div className="p-6 overflow-y-auto">{modalContent.content}</div>
      </Modal>
      <Icons />
    </>
  );
};

export default Home;
