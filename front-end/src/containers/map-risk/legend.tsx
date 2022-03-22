import { FC } from 'react';

import LegendItem from 'components/map/legend/item';
import LegendTypeBasic from 'components/map/legend/types/basic';
import LegendTypeGradient from 'components/map/legend/types/gradient';

import { LEGEND_ITEMS_CULTIVOS, LEGEND_ITEMS_RENDIMIENTO } from './constants';

const Legend: FC<{ legendType: string }> = ({ legendType }) => {
  const thisLegend = (legendType) => {
    switch (legendType) {
      case 'cultivos':
        return (
          <div className="absolute w-64 py-1 bg-white bottom-4 right-4">
            <LegendItem
              icon={null}
              id="legend-crops-1"
              name="Superficie destinada a cultivos clave"
            >
              <LegendTypeBasic className="text-sm text-black" items={LEGEND_ITEMS_CULTIVOS} />
            </LegendItem>
          </div>
        );
      case 'cultivo-olivo':
        return (
          <div className="absolute w-64 py-1 bg-white bottom-4 right-4">
            <LegendItem
              icon={null}
              id="legend-crops-1"
              name="Superficie destinada a cultivos clave"
            >
              <LegendTypeBasic className="text-sm text-black" items={[LEGEND_ITEMS_CULTIVOS[0]]} />
            </LegendItem>
          </div>
        );
      case 'rendimiento-olivo':
        return (
          <div className="absolute w-64 py-1 bg-white bottom-4 right-4">
            <LegendItem
              icon={null}
              id="legend-rendimiento-olivo-1"
              name="Cambio en el rendimiento (%)"
            >
              <LegendTypeGradient className="text-sm text-black" items={LEGEND_ITEMS_RENDIMIENTO} />
            </LegendItem>
          </div>
        );
      case 'zonas-optimas-olivo':
        // It's raster and I have no data
        return null;
      default:
        return null;
    }
  };

  return <>{thisLegend(legendType)}</>;
};

export default Legend;
