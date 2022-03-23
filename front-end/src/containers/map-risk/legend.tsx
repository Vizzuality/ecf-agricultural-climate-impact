import { FC } from 'react';

import LegendItem from 'components/map/legend/item';
import LegendTypeBasic from 'components/map/legend/types/basic';
import LegendTypeGradient from 'components/map/legend/types/gradient';
import LegendTypeChoropleth from 'components/map/legend/types/choropleth';

import {
  LEGEND_ITEMS_CULTIVOS,
  LEGEND_ITEMS_RENDIMIENTO,
  LEGEND_ITEMS_ZONAS_OPTIMAS_OLIVO,
  LEGEND_ITEMS_ZONAS_OPTIMAS_VINO,
  LAYER_GRADIENT_SEQUIAS_DEHESA,
  LAYER_GRADIENT_INCENDIOS_DEHESA,
} from './constants';

const Legend: FC<{ legendType: string }> = ({ legendType }) => {
  const thisLegend = (legendType) => {
    switch (legendType) {
      case 'cultivos':
        return (
          <div className="absolute w-64 py-1 bg-white bottom-4 right-4">
            <LegendItem
              icon={null}
              id="legend-cultivos-1"
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
              id="legend-cultivo-olivo-1"
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
      case 'rendimiento-cereal':
        return (
          <div className="absolute w-64 py-1 bg-white bottom-4 right-4">
            <LegendItem
              icon={null}
              id="legend-rendimiento-cereal-1"
              name="Cambio en el rendimiento (%)"
            >
              <LegendTypeGradient className="text-sm text-black" items={LEGEND_ITEMS_RENDIMIENTO} />
            </LegendItem>
          </div>
        );
      case 'zonas-optimas-vino':
        return (
          <div className="absolute w-64 py-1 bg-white bottom-4 right-4">
            <LegendItem
              icon={null}
              id="legend-zonas-optimas-vino-1"
              name="Cambios en zonas óptimas para el cultivo de olivo"
            >
              <LegendTypeGradient
                className="text-sm text-black"
                items={LEGEND_ITEMS_ZONAS_OPTIMAS_VINO}
              />
            </LegendItem>
          </div>
        );
      case 'zonas-optimas-olivo':
        return (
          <div className="absolute w-64 py-1 bg-white bottom-4 right-4">
            <LegendItem
              icon={null}
              id="legend-zonas-optimas-olivo-1"
              name="Cambios en zonas óptimas para el cultivo de olivo"
            >
              <LegendTypeGradient
                className="text-sm text-black"
                items={LEGEND_ITEMS_ZONAS_OPTIMAS_OLIVO}
              />
            </LegendItem>
          </div>
        );
      case 'sequias-dehesa':
        return (
          <div className="absolute w-64 py-1 bg-white bottom-4 right-4">
            <LegendItem icon={null} id="legend-sequias-dehesa-1" name="Duración de sequías (días)">
              <LegendTypeGradient
                className="text-sm text-black"
                items={LAYER_GRADIENT_SEQUIAS_DEHESA}
              />
            </LegendItem>
          </div>
        );
      case 'incendios-dehesa':
        return (
          <div className="absolute w-64 py-1 bg-white bottom-4 right-4">
            <LegendItem icon={null} id="legend-incendio-dehesa-1" name="Riesgo de incendio">
              <LegendTypeChoropleth
                className="text-sm text-black"
                items={LAYER_GRADIENT_INCENDIOS_DEHESA}
              />
            </LegendItem>
          </div>
        );
      default:
        return null;
    }
  };

  return <>{thisLegend(legendType)}</>;
};

export default Legend;
