/* eslint-disable */
import React from 'react';

import { getLayerImage, getBasemapImage } from './helper';

class MapThumbnail extends React.Component {
  // static defaultProps = {
  //   zoom: 1,
  //   lat: 20,
  //   lng: -20,
  // };

  constructor(props) {
    super(props);

    this.state = {
      imageSrc: '',
      basemapSrc: '',
    };
  }

  async componentDidMount() {
    const { width, height } = this.getSize();

    const { zoom = 1, lat = 20, lng = -20, layerSpec } = this.props;

    const thumbnail = await getLayerImage({
      width,
      height,
      zoom,
      lat,
      lng,
      layerSpec,
    });

    const basemap = await getBasemapImage({
      width,
      height,
      zoom,
      lat,
      lng,
      layerSpec,
    });

    this.setStateAsync({
      imageSrc: thumbnail,
      basemapSrc: basemap,
    });
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }

  getSize() {
    return {
      width: this.chart && this.chart.offsetWidth ? this.chart.offsetWidth : 100,
      height: this.chart && this.chart.offsetHeight ? this.chart.offsetHeight : 100,
    };
  }

  render() {
    const { imageSrc, basemapSrc } = this.state;
    const bgImage =
      imageSrc && imageSrc !== ''
        ? `url('${imageSrc}') , url('${basemapSrc}')`
        : `url('${basemapSrc}')`;

    return (
      <div
        ref={(c) => {
          this.chart = c;
        }}
        className="w-full h-full bg-cover bg-center absolute left-0 rounded rounded-tr-none rounded-br-none"
        style={{
          ...(bgImage && { backgroundImage: bgImage }),
        }}
      />
    );
  }
}

export default MapThumbnail;
