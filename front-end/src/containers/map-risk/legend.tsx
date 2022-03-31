import { FC } from 'react';

import LegendItem from 'components/map/legend/item';
import LegendTypeBasic from 'components/map/legend/types/basic';
import LegendTypeGradient from 'components/map/legend/types/gradient';
import LegendTypeChoropleth from 'components/map/legend/types/choropleth';

import {
  LEGEND_ITEMS_CULTIVOS,
  LEGEND_ITEMS_RENDIMIENTO,
  LEGEND_ITEMS_ZONAS_OPTIMAS_OLIVO,
  // LEGEND_ITEMS_ZONAS_OPTIMAS_VINO,
  LEGEND_ITEMS_ZONAS_OPTIMAS_VINO_INDICE_FRESCOR_NOCTURNO,
  LEGEND_ITEMS_ZONAS_OPTIMAS_VINO_INDICE_HUGLIN,
  LEGEND_ITEMS_ZONAS_OPTIMAS_VINO_INDICE_SEQUIA,
  LAYER_GRADIENT_SEQUIAS_DEHESA,
  LAYER_GRADIENT_INCENDIOS_DEHESA,
  LAYER_GRADIENT_ARIDEZ,
  LEGEND_ITEMS_PRECIPITACION,
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
      case 'zonas-optimas-vino_indice_frescor_nocturno':
        return (
          <div className="absolute py-1 bg-white w-96 bottom-4 right-4">
            <LegendItem
              icon={null}
              id="legend-zonas-optimas-vino-frescor-nocturno-1"
              name="Índice de frescor nocturno"
            >
              <LegendTypeChoropleth
                className="text-sm text-black"
                items={LEGEND_ITEMS_ZONAS_OPTIMAS_VINO_INDICE_FRESCOR_NOCTURNO}
              />
            </LegendItem>
          </div>
        );
      case 'zonas-optimas-vino_indice_huglin':
        return (
          <div className="absolute py-1 bg-white w-96 bottom-4 right-4">
            <LegendItem icon={null} id="legend-zonas-optimas-vino-huglin-1" name="Índice de huglin">
              <LegendTypeChoropleth
                className="text-sm text-black"
                items={LEGEND_ITEMS_ZONAS_OPTIMAS_VINO_INDICE_HUGLIN}
              />
            </LegendItem>
          </div>
        );
      case 'zonas-optimas-vino_indice_sequia':
        return (
          <div className="absolute py-1 bg-white w-96 bottom-4 right-4">
            <LegendItem icon={null} id="legend-zonas-optimas-vino-sequia-1" name="Índice de sequía">
              <LegendTypeChoropleth
                className="text-sm text-black break-all"
                items={LEGEND_ITEMS_ZONAS_OPTIMAS_VINO_INDICE_SEQUIA}
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
      case 'aridez':
        return (
          <div className="absolute w-64 py-1 bg-white bottom-4 right-4">
            <LegendItem icon={null} id="legend-aridez-1" name="Grado de aridez">
              <LegendTypeGradient className="text-sm text-black" items={LAYER_GRADIENT_ARIDEZ} />
            </LegendItem>
          </div>
        );
      case 'precipitacion':
        return (
          <div className="absolute w-64 py-1 bg-white bottom-4 right-4">
            <LegendItem icon={null} id="legend-precipitacion-1" name="Precipitación (mm/mes)">
              <LegendTypeGradient
                className="text-sm text-black"
                items={LEGEND_ITEMS_PRECIPITACION}
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
