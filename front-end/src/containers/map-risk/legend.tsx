import { FC, useState } from 'react';

import Modal from 'components/modal';
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
  const [modal, setModal] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (modalType) => {
    setModal(modalType);
    setModalOpen(true);
  };

  const thisLegend = (legendType) => {
    switch (legendType) {
      case 'cultivos':
        return (
          <div className="absolute py-1 bg-white w-96 bottom-4 right-4">
            <LegendItem
              icon={null}
              id="legend-cultivos-1"
              name="Superficie destinada a cultivos clave"
            >
              <LegendTypeBasic className="text-sm text-black" items={LEGEND_ITEMS_CULTIVOS} />
            </LegendItem>
            <div className="absolute top-4 right-4">
              <button onClick={() => openModal('cultivos')}>
                <span>i</span>
              </button>
            </div>
          </div>
        );
      case 'cultivos-olivar':
        return (
          <div className="absolute py-1 bg-white w-96 bottom-4 right-4">
            <LegendItem
              icon={null}
              id="legend-cultivo-olivar-1"
              name="Superficie destinada a cultivo del olivo"
            >
              <LegendTypeBasic className="text-sm text-black" items={[LEGEND_ITEMS_CULTIVOS[0]]} />
            </LegendItem>
            <div className="absolute top-4 right-4">
              <button onClick={() => openModal('cultivos')}>
                <span>i</span>
              </button>
            </div>
          </div>
        );
      case 'cultivos-dehesa':
        return (
          <div className="absolute py-1 bg-white w-96 bottom-4 right-4">
            <LegendItem
              icon={null}
              id="legend-cultivo-dehesa-1"
              name="Superficie destinada a cultivo de dehesa"
            >
              <LegendTypeBasic className="text-sm text-black" items={[LEGEND_ITEMS_CULTIVOS[3]]} />
            </LegendItem>
            <div className="absolute top-4 right-4">
              <button onClick={() => openModal('cultivos')}>
                <span>i</span>
              </button>
            </div>
          </div>
        );
      case 'cultivos-vinedo':
        return (
          <div className="absolute py-1 bg-white w-96 bottom-4 right-4">
            <LegendItem
              icon={null}
              id="legend-cultivo-dehesa-1"
              name="Superficie destinada a cultivo de viñedo"
            >
              <LegendTypeBasic className="text-sm text-black" items={[LEGEND_ITEMS_CULTIVOS[1]]} />
            </LegendItem>
            <div className="absolute top-4 right-4">
              <button onClick={() => openModal('cultivos')}>
                <span>i</span>
              </button>
            </div>
          </div>
        );
      case 'cultivos-cereal':
        return (
          <div className="absolute py-1 bg-white w-96 bottom-4 right-4">
            <LegendItem
              icon={null}
              id="legend-cultivo-cereals-1"
              name="Superficie destinada a cultivo de cereales"
            >
              <LegendTypeBasic className="text-sm text-black" items={[LEGEND_ITEMS_CULTIVOS[2]]} />
            </LegendItem>
            <div className="absolute top-4 right-4">
              <button onClick={() => openModal('cultivos')}>
                <span>i</span>
              </button>
            </div>
          </div>
        );
      case 'rendimiento-olivo':
        return (
          <div className="absolute py-1 bg-white w-96 bottom-4 right-4">
            <LegendItem
              icon={null}
              id="legend-rendimiento-olivo-1"
              name="Cambio en el rendimiento (%)"
            >
              <LegendTypeGradient className="text-sm text-black" items={LEGEND_ITEMS_RENDIMIENTO} />
            </LegendItem>
            <div className="absolute top-4 right-4">
              <button onClick={() => openModal('cultivos')}>
                <span>i</span>
              </button>
            </div>
          </div>
        );
      case 'rendimiento-cereal':
        return (
          <div className="absolute py-1 bg-white w-96 bottom-4 right-4">
            <LegendItem
              icon={null}
              id="legend-rendimiento-cereal-1"
              name="Cambio en el rendimiento (%)"
            >
              <LegendTypeGradient className="text-sm text-black" items={LEGEND_ITEMS_RENDIMIENTO} />
            </LegendItem>
            <div className="absolute top-4 right-4">
              <button onClick={() => openModal('cultivos')}>
                <span>i</span>
              </button>
            </div>
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
            <div className="absolute top-4 right-4">
              <button onClick={() => openModal('cultivos')}>
                <span>i</span>
              </button>
            </div>
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
            <div className="absolute top-4 right-4">
              <button onClick={() => openModal('cultivos')}>
                <span>i</span>
              </button>
            </div>
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
            <div className="absolute top-4 right-4">
              <button onClick={() => openModal('cultivos')}>
                <span>i</span>
              </button>
            </div>
          </div>
        );
      case 'zonas-optimas-olivo':
        return (
          <div className="absolute py-1 bg-white w-96 bottom-4 right-4">
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
            <div className="absolute top-4 right-4">
              <button onClick={() => openModal('cultivos')}>
                <span>i</span>
              </button>
            </div>
          </div>
        );
      case 'sequias-dehesa':
        return (
          <div className="absolute py-1 bg-white w-96 bottom-4 right-4">
            <LegendItem icon={null} id="legend-sequias-dehesa-1" name="Duración de sequías (días)">
              <LegendTypeGradient
                className="text-sm text-black"
                items={LAYER_GRADIENT_SEQUIAS_DEHESA}
              />
            </LegendItem>
            <div className="absolute top-4 right-4">
              <button onClick={() => openModal('cultivos')}>
                <span>i</span>
              </button>
            </div>
          </div>
        );
      case 'incendios-dehesa':
        return (
          <div className="absolute py-1 bg-white w-96 bottom-4 right-4">
            <LegendItem icon={null} id="legend-incendio-dehesa-1" name="Riesgo de incendio">
              <LegendTypeChoropleth
                className="text-sm text-black"
                items={LAYER_GRADIENT_INCENDIOS_DEHESA}
              />
            </LegendItem>
            <div className="absolute top-4 right-4">
              <button onClick={() => openModal('cultivos')}>
                <span>i</span>
              </button>
            </div>
          </div>
        );
      case 'aridez':
        return (
          <div className="absolute py-1 bg-white w-96 bottom-4 right-4">
            <LegendItem icon={null} id="legend-aridez-1" name="Grado de aridez">
              <LegendTypeGradient className="text-sm text-black" items={LAYER_GRADIENT_ARIDEZ} />
            </LegendItem>
            <div className="absolute top-4 right-4">
              <button onClick={() => openModal('cultivos')}>
                <span>i</span>
              </button>
            </div>
          </div>
        );
      case 'precipitacion':
        return (
          <div className="absolute py-1 bg-white w-96 bottom-4 right-4">
            <LegendItem icon={null} id="legend-precipitacion-1" name="Precipitación (mm/mes)">
              <LegendTypeGradient
                className="text-sm text-black"
                items={LEGEND_ITEMS_PRECIPITACION}
              />
            </LegendItem>
            <div className="absolute top-4 right-4">
              <button onClick={() => openModal('cultivos')}>
                <span>i</span>
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const thisModal = (legendType) => {
    switch (legendType) {
      case 'cultivos':
        return (
          <Modal
            size="wide"
            dismissable
            open={modalOpen}
            onDismiss={() => setModalOpen(false)}
            title="TITLE"
          >
            <div className="px-10">
              <h1 className="mb-5 text-xl font-medium">Superficie destinada a cultivos clave</h1>
              <div className="text-lg">
                <div className="flex my-4">
                  <div className="flex-initial w-24 font-bold">Descripción</div>
                  <div className="flex-1">
                    Las superficies destinadas a los diferentes cultivos se han obtenido a partir
                    del conjunto de datos Corine Land Cover (CLC) 2018. CLC2018 es uno de los
                    conjuntos de datos de Corine Land Cover (CLC) producidos dentro del marco del
                    Servicio de Monitoreo de Tierras de Copernicus que se refiere al estado de
                    cobertura/uso del suelo del año 2018. El servicio CLC tiene una herencia de
                    mucho tiempo (anteriormente conocido como &quot;Programa de Cobertura Terrestre
                    CORINE&quot;), coordinado por la Agencia Europea de Medio Ambiente (AEMA).
                    Proporciona información coherente y temáticamente detallada sobre la cobertura
                    del suelo y sus cambios para toda Europa.
                  </div>
                </div>
                <div className="flex my-4">
                  <div className="flex-initial w-24 font-bold">Referencia</div>
                  <div className="flex-1">
                    <a
                      className="underline"
                      href="https://land.copernicus.eu/pan-european/corine-land-cover/clc2018"
                    >
                      https://land.copernicus.eu/pan-european/corine-land-cover/clc2018
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        );
      case 'cultivos-olivar':
        return (
          <Modal
            size="wide"
            dismissable
            open={modalOpen}
            onDismiss={() => setModalOpen(false)}
            title="TITLE"
          >
            <div className="px-10">
              <h1 className="mb-5 text-xl font-medium">
                Superficie destinada al cultivo del olivo
              </h1>
              <div className="text-lg">
                <div className="flex my-4">
                  <div className="flex-initial w-24 font-bold">Descripción</div>
                  <div className="flex-1">
                    Las superficies destinadas al cultivo del olivo se han obtenido a partir del
                    conjunto de datos Corine Land Cover (CLC) 2018. CLC2018 es uno de los conjuntos
                    de datos de Corine Land Cover (CLC) producidos dentro del marco del Servicio de
                    Monitoreo de Tierras de Copernicus que se refiere al estado de cobertura/uso del
                    suelo del año 2018. El servicio CLC tiene una herencia de mucho tiempo
                    (anteriormente conocido como &quot;Programa de Cobertura Terrestre
                    CORINE&quot;), coordinado por la Agencia Europea de Medio Ambiente (AEMA).
                    Proporciona información coherente y temáticamente detallada sobre la cobertura
                    del suelo y sus cambios para toda Europa.
                  </div>
                </div>
                <div className="flex my-4">
                  <div className="flex-initial w-24 font-bold">Referencia</div>
                  <div className="flex-1">
                    <a
                      className="underline"
                      href="https://land.copernicus.eu/pan-european/corine-land-cover/clc2018"
                    >
                      https://land.copernicus.eu/pan-european/corine-land-cover/clc2018
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        );
      case 'cultivos-dehesa':
        return (
          <Modal
            size="wide"
            dismissable
            open={modalOpen}
            onDismiss={() => setModalOpen(false)}
            title="TITLE"
          >
            <div className="px-10">
              <h1 className="mb-5 text-xl font-medium">Superficie ocupada por dehesa</h1>
              <div className="text-lg">
                <div className="flex my-4">
                  <div className="flex-initial w-24 font-bold">Descripción</div>
                  <div className="flex-1">
                    Las superficies ocupada por la dehesa se han obtenido a partir del conjunto de
                    datos Corine Land Cover (CLC) 2018. CLC2018 es uno de los conjuntos de datos de
                    Corine Land Cover (CLC) producidos dentro del marco del Servicio de Monitoreo de
                    Tierras de Copernicus que se refiere al estado de cobertura/uso del suelo del
                    año 2018. El servicio CLC tiene una herencia de mucho tiempo (anteriormente
                    conocido como &quot;Programa de Cobertura Terrestre CORINE&quot;), coordinado
                    por la Agencia Europea de Medio Ambiente (AEMA). Proporciona información
                    coherente y temáticamente detallada sobre la cobertura del suelo y sus cambios
                    para toda Europa.
                  </div>
                </div>
                <div className="flex my-4">
                  <div className="flex-initial w-24 font-bold">Referencia</div>
                  <div className="flex-1">
                    <a
                      className="underline"
                      href="https://land.copernicus.eu/pan-european/corine-land-cover/clc2018"
                    >
                      https://land.copernicus.eu/pan-european/corine-land-cover/clc2018
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        );
      case 'cultivos-vinedo':
        return (
          <Modal
            size="wide"
            dismissable
            open={modalOpen}
            onDismiss={() => setModalOpen(false)}
            title="TITLE"
          >
            <div className="px-10">
              <h1 className="mb-5 text-xl font-medium">
                Superficie destinada al cultivo del viñedo
              </h1>
              <div className="text-lg">
                <div className="flex my-4">
                  <div className="flex-initial w-24 font-bold">Descripción</div>
                  <div className="flex-1">
                    Las superficies destinadas al cultivo del viñedo se han obtenido a partir del
                    conjunto de datos Corine Land Cover (CLC) 2018. CLC2018 es uno de los conjuntos
                    de datos de Corine Land Cover (CLC) producidos dentro del marco del Servicio de
                    Monitoreo de Tierras de Copernicus que se refiere al estado de cobertura/uso del
                    suelo del año 2018. El servicio CLC tiene una herencia de mucho tiempo
                    (anteriormente conocido como &quot;Programa de Cobertura Terrestre
                    CORINE&quot;), coordinado por la Agencia Europea de Medio Ambiente (AEMA).
                    Proporciona información coherente y temáticamente detallada sobre la cobertura
                    del suelo y sus cambios para toda Europa.
                  </div>
                </div>
                <div className="flex my-4">
                  <div className="flex-initial w-24 font-bold">Referencia</div>
                  <div className="flex-1">
                    <a
                      className="underline"
                      href="https://land.copernicus.eu/pan-european/corine-land-cover/clc2018"
                    >
                      https://land.copernicus.eu/pan-european/corine-land-cover/clc2018
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        );
      case 'cultivos-cereal':
        return (
          <Modal
            size="wide"
            dismissable
            open={modalOpen}
            onDismiss={() => setModalOpen(false)}
            title="TITLE"
          >
            <div className="px-10">
              <h1 className="mb-5 text-xl font-medium">
                Superficie destinada al cultivo del cereal
              </h1>
              <div className="text-lg">
                <div className="flex my-4">
                  <div className="flex-initial w-24 font-bold">Descripción</div>
                  <div className="flex-1">
                    Las superficies destinadas al cultivo del cereal se han obtenido a partir del
                    conjunto de datos Corine Land Cover (CLC) 2018. CLC2018 es uno de los conjuntos
                    de datos de Corine Land Cover (CLC) producidos dentro del marco del Servicio de
                    Monitoreo de Tierras de Copernicus que se refiere al estado de cobertura/uso del
                    suelo del año 2018. El servicio CLC tiene una herencia de mucho tiempo
                    (anteriormente conocido como &quot;Programa de Cobertura Terrestre
                    CORINE&quot;), coordinado por la Agencia Europea de Medio Ambiente (AEMA).
                    Proporciona información coherente y temáticamente detallada sobre la cobertura
                    del suelo y sus cambios para toda Europa.
                  </div>
                </div>
                <div className="flex my-4">
                  <div className="flex-initial w-24 font-bold">Referencia</div>
                  <div className="flex-1">
                    <a
                      className="underline"
                      href="https://land.copernicus.eu/pan-european/corine-land-cover/clc2018"
                    >
                      https://land.copernicus.eu/pan-european/corine-land-cover/clc2018
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        );
      case 'rendimiento-olivo':
        return (
          <Modal
            size="wide"
            dismissable
            open={modalOpen}
            onDismiss={() => setModalOpen(false)}
            title="TITLE"
          >
            <div className="px-10">
              <h1 className="mb-5 text-xl font-medium">Cambio en rendimiento (%)</h1>
              <div className="text-lg">
                <div className="flex my-4">
                  <div className="flex-initial w-24 font-bold">Descripción</div>
                  <div className="flex-1">
                    Este indicador muestra la diferencia de la producción de la aceituna entre entre
                    para el futuro (2041-2070, RCP4.5 y RCP8.5) y el pasado reciente (1989-2005).
                    Para el calculo se ha utilizado un conjunto de modelos climáticos, escenarios
                    futuros y modelos dinámicos de cultivos. Los modelos de cultivos han sido
                    alimentados con un conjunto de datos del modelo climático regional EURO-CORDEX,
                    junto con con datos de suelo y terreno.
                  </div>
                </div>
                <div className="flex my-4">
                  <div className="flex-initial w-24 font-bold">Referencia</div>
                  <div className="flex-1">
                    <a
                      className="underline"
                      href="https://land.copernicus.eu/pan-european/corine-land-cover/clc2018"
                    >
                      https://land.copernicus.eu/pan-european/corine-land-cover/clc2018
                    </a>
                  </div>
                </div>
                <div className="flex my-4">
                  <div className="flex-initial w-24 font-bold">Fuente</div>
                  <div className="flex-1">
                    <a className="underline" href="https://doi.org/10.1002/joc.6237">
                      https://doi.org/10.1002/joc.6237
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        );
      case 'rendimiento-cereal':
        return (
          <Modal
            size="wide"
            dismissable
            open={modalOpen}
            onDismiss={() => setModalOpen(false)}
            title="TITLE"
          >
            <div className="px-10">
              <h1 className="mb-5 text-xl font-medium">Cambio en rendimiento (%)</h1>
              <div className="text-lg">
                <div className="flex my-4">
                  <div className="flex-initial w-24 font-bold">Referencia</div>
                  <div className="flex-1">
                    <a
                      className="underline"
                      href="https://joint-research-centre.ec.europa.eu/peseta-projects/jrc-peseta-iv_en"
                    >
                      https://joint-research-centre.ec.europa.eu/peseta-projects/jrc-peseta-iv_en
                    </a>
                  </div>
                </div>
                <div className="flex my-4">
                  <div className="flex-initial w-24 font-bold">Fuente</div>
                  <div className="flex-1">
                    <a
                      className="underline"
                      href="https://joint-research-centre.ec.europa.eu/peseta-projects/jrc-peseta-iv_en"
                    >
                      https://joint-research-centre.ec.europa.eu/peseta-projects/jrc-peseta-iv_en
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        );
      case 'zonas-optimas-vino_indice_frescor_nocturno':
        return (
          <Modal
            size="wide"
            dismissable
            open={modalOpen}
            onDismiss={() => setModalOpen(false)}
            title="TITLE"
          >
            <div className="px-10">
              <h1 className="mb-5 text-xl font-medium">Índice de frescor nocturno</h1>
              <div className="text-lg">
                <div className="flex my-4">
                  <div className="flex-initial w-24 font-bold">Descripción</div>
                  <div className="flex-1">
                    El índice de Frescor Nocturno pone de relieve la importancia de las diferencias
                    de temperatura entre noche y día para la maduración. Es muy importante para una
                    buena calidad contar en el periodo de maduración con días cálidos, que
                    favorezcan la maduración, y con noches frías.
                  </div>
                </div>
                <div className="flex my-4">
                  <div className="flex-initial w-24 font-bold">Referencia</div>
                  <div className="flex-1">
                    Resco P, Iglesias A, Bardají I, Sotés V (2015). Exploring adaptation choices for
                    grapevine regions in Spain. Regional Environmental Change, 16(4), 979-993.
                    doi:10.1007/s10113-015-0811-4
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        );
      case 'zonas-optimas-vino_indice_huglin':
        return (
          <Modal
            size="wide"
            dismissable
            open={modalOpen}
            onDismiss={() => setModalOpen(false)}
            title="TITLE"
          >
            <div className="px-10">
              <h1 className="mb-5 text-xl font-medium">Índice de huglin</h1>
              <div className="text-lg">
                <div className="flex my-4">
                  <div className="flex-initial w-24 font-bold">Descripción</div>
                  <div className="flex-1">
                    El índice de Huglin muestra una buena relación entre las zonas con el potencial
                    de azúcares de la uva, lo que ha permitido la división en zonas que representan
                    correctamente las diversas calidades de la uva y algunas de las características
                    del vino como resultado de la influencia climática.
                  </div>
                </div>
                <div className="flex my-4">
                  <div className="flex-initial w-24 font-bold">Referencia</div>
                  <div className="flex-1">
                    Resco P, Iglesias A, Bardají I, Sotés V (2015). Exploring adaptation choices for
                    grapevine regions in Spain. Regional Environmental Change, 16(4), 979-993.
                    doi:10.1007/s10113-015-0811-4
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        );
      case 'zonas-optimas-vino_indice_sequia':
        return (
          <Modal
            size="wide"
            dismissable
            open={modalOpen}
            onDismiss={() => setModalOpen(false)}
            title="TITLE"
          >
            <div className="px-10">
              <h1 className="mb-5 text-xl font-medium">Índice de sequía</h1>
              <div className="text-lg">
                <div className="flex my-4">
                  <div className="flex-initial w-24 font-bold">Descripción</div>
                  <div className="flex-1">
                    El índice de Sequía establece la importancia del nivel hídrico sobre nivel de
                    maduración de la uva y la calidad del vino, que necesita niveles moderados de
                    déficit para alcanzar su máximo potencial.
                  </div>
                </div>
                <div className="flex my-4">
                  <div className="flex-initial w-24 font-bold">Referencia</div>
                  <div className="flex-1">
                    Resco P, Iglesias A, Bardají I, Sotés V (2015). Exploring adaptation choices for
                    grapevine regions in Spain. Regional Environmental Change, 16(4), 979-993.
                    doi:10.1007/s10113-015-0811-4
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        );
      case 'zonas-optimas-olivo':
        return (
          <Modal
            size="wide"
            dismissable
            open={modalOpen}
            onDismiss={() => setModalOpen(false)}
            title="TITLE"
          >
            <div className="px-10">
              <h1 className="mb-5 text-xl font-medium">Zonas óptimas para el cultivo del olivo</h1>
              <div className="text-lg">
                <div className="flex my-4">
                  <div className="flex-initial w-24 font-bold">Descripción</div>
                  <div className="flex-1">
                    Este indicador muestra el cuantil del 95% (&quot;áreas altamente
                    adecuadas&quot;) en todas las variedades de aceituna. Los valores más cercanos a
                    1000 tienen mayor probabilidad de ser aptos para al menos una variedad de
                    aceituna. Se han utilizamos las siete variedades de aceituna más productivas en
                    Andalucía y las especies de olivo silvestre para desarrollar un Modelo de
                    Distribución de Especies, junto con propiedades del suelo, geomorfología,
                    balance hídrico y predictores (bio-)climáticos a escala fina. También se han
                    derivado las proyecciones del clima futuro para evaluar el efecto del cambio
                    climático en la idoneidad ambiental y la productividad de cada variedad de
                    olivo.
                  </div>
                </div>
                <div className="flex my-4">
                  <div className="flex-initial w-24 font-bold">Referencia</div>
                  <div className="flex-1">
                    <a className="underline" href="https://doi.org/10.1016/j.scitotenv.2019.136161">
                      https://doi.org/10.1016/j.scitotenv.2019.136161
                    </a>
                  </div>
                </div>
                <div className="flex my-4">
                  <div className="flex-initial w-24 font-bold">Fuente</div>
                  <div className="flex-1">
                    <a className="underline" href="https://doi.org/10.1016/j.scitotenv.2019.136161">
                      https://doi.org/10.1016/j.scitotenv.2019.136161
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        );
      case 'sequias-dehesa':
        return (
          <Modal
            size="wide"
            dismissable
            open={modalOpen}
            onDismiss={() => setModalOpen(false)}
            title="TITLE"
          >
            <div className="px-10">
              <h1 className="mb-5 text-xl font-medium">Duración máxima de las sequías (días)</h1>
              <div className="text-lg">
                <div className="flex my-4">
                  <div className="flex-initial w-24 font-bold">Descripción</div>
                  <div className="flex-1">
                    Este indicador mustra el número máximo de días consecutivos de los períodos
                    secos a lo largo del año. Este indicador bioclimático se ha calculan en base a
                    las proyecciones climáticas diarias de CMIP5 de un modelo de circulación global
                    para dos escenarios climáticos futuros, trayectoria de concentración
                    representativa (RCP, por sus siglas en inglés) 4.5 y RCP 8.5.
                  </div>
                </div>
                <div className="flex my-4">
                  <div className="flex-initial w-24 font-bold">Referencia</div>
                  <div className="flex-1">
                    DOI:{' '}
                    <a
                      className="underline"
                      href="https://cds.climate.copernicus.eu/cdsapp#!/dataset/10.24381/cds.0ab27596?tab=overview"
                    >
                      10.24381/cds.0ab27596
                    </a>
                  </div>
                </div>
                <div className="flex my-4">
                  <div className="flex-initial w-24 font-bold">Fuente</div>
                  <div className="flex-1">
                    <a
                      className="underline"
                      href="https://cds.climate.copernicus.eu/cdsapp#!/dataset/10.24381/cds.0ab27596?tab=overview"
                    >
                      https://cds.climate.copernicus.eu/cdsapp#!/dataset/10.24381/cds.0ab27596?tab=overview
                    </a>
                  </div>
                </div>
                <div className="flex my-4">
                  <div className="flex-initial w-24 font-bold">Licencia</div>
                  <div className="flex-1">
                    <a
                      className="underline"
                      href="https://cds.climate.copernicus.eu/api/v2/terms/static/licence-to-use-copernicus-products.pdf"
                    >
                      Licence to use Copernicus Products
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        );
      case 'incendios-dehesa':
        return (
          <Modal
            size="wide"
            dismissable
            open={modalOpen}
            onDismiss={() => setModalOpen(false)}
            title="TITLE"
          >
            <div className="px-10">
              <h1 className="mb-5 text-xl font-medium">Riesgo de incendio</h1>
              <div className="text-lg">
                <div className="flex my-4">
                  <div className="flex-initial w-24 font-bold">Descripción</div>
                  <div className="flex-1">
                    Este indicador presenta las proyecciones de peligro de incendios para España
                    basados en el sistema canadiense de índices meteorológicos contra incendios
                    (FWI, por sus siglas en inglés) en condiciones climáticas futuras. El FWI es un
                    índice basado en la meteorología que se utiliza en todo el mundo para estimar el
                    peligro de incendio y se implementa en el modelo mundial de previsión de
                    incendios del ECMWF (GEFF, por sus siglas en inglés). En este conjunto de datos,
                    los valores de FWI diarios, los valores de FWI estacionales y otros indicadores
                    específicos de umbral derivados de FWI se modelaron utilizando el modelo GEFF
                    para estimar el peligro de incendio en escenarios climáticos futuros. Estos
                    indicadores incluyen el número de días con condiciones de peligro de incendio
                    moderado, alto o muy alto según la clasificación del Sistema Europeo de
                    Información sobre Incendios Forestales (EFFIS, por sus siglas en inglés) durante
                    la temporada de incendios del hemisferio norte (junio-septiembre):
                    <ul>
                      <li>Muy bajo: &lt;5.2</li>
                      <li>Bajo: 5.2 - 11.2</li>
                      <li>Moderado: 11.2 - 21.3</li>
                      <li>Alto: 21.3 - 38.0</li>
                      <li>Muy alto: 38.0 - 50</li>
                      <li>Extremo: &gt;=50.0</li>
                    </ul>
                  </div>
                </div>
                <div className="flex my-4">
                  <div className="flex-initial w-24 font-bold">Referencia</div>
                  <div className="flex-1">
                    DOI:{' '}
                    <a
                      className="underline"
                      href="https://cds.climate.copernicus.eu/cdsapp#!/dataset/10.24381/cds.ca755de7?tab=overview"
                    >
                      10.24381/cds.ca755de7
                    </a>
                  </div>
                </div>
                <div className="flex my-4">
                  <div className="flex-initial w-24 font-bold">Fuente</div>
                  <div className="flex-1">
                    <a
                      className="underline"
                      href="https://cds.climate.copernicus.eu/cdsapp#!/dataset/10.24381/cds.ca755de7?tab=overview"
                    >
                      https://cds.climate.copernicus.eu/cdsapp#!/dataset/10.24381/cds.ca755de7?tab=overview
                    </a>
                  </div>
                </div>
                <div className="flex my-4">
                  <div className="flex-initial w-24 font-bold">Licencia</div>
                  <div className="flex-1">
                    <a
                      className="underline"
                      href="https://cds.climate.copernicus.eu/api/v2/terms/static/licence-to-use-copernicus-products.pdf"
                    >
                      Licence to use Copernicus Products
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        );
      case 'aridez':
        return (
          <Modal
            size="wide"
            dismissable
            open={modalOpen}
            onDismiss={() => setModalOpen(false)}
            title="TITLE"
          >
            <div className="px-10">
              <h1 className="mb-5 text-xl font-medium">Media anual de aridez</h1>
              <div className="text-lg">
                <div className="flex my-4">
                  <div className="flex-initial w-24 font-bold">Descripción</div>
                  <div className="flex-1">
                    Este indicador muestra la evaporación potencial mensual dividida por la
                    precipitación media mensual, promediada a lo largo del año. Este indicador
                    bioclimático se ha calculan en base a las proyecciones climáticas diarias de
                    CMIP5 de un modelo de circulación global para dos escenarios climáticos futuros,
                    trayectoria de concentración representativa (RCP, por sus siglas en inglés) 4.5
                    y RCP 8.5.
                  </div>
                </div>
                <div className="flex my-4">
                  <div className="flex-initial w-24 font-bold">Referencia</div>
                  <div className="flex-1">
                    DOI:{' '}
                    <a
                      className="underline"
                      href="https://cds.climate.copernicus.eu/cdsapp#!/dataset/10.24381/cds.0ab27596?tab=form"
                    >
                      10.24381/cds.0ab27596
                    </a>
                  </div>
                </div>
                <div className="flex my-4">
                  <div className="flex-initial w-24 font-bold">Fuente</div>
                  <div className="flex-1">
                    <a
                      className="underline"
                      href="https://cds.climate.copernicus.eu/cdsapp#!/dataset/10.24381/cds.0ab27596?tab=form"
                    >
                      https://cds.climate.copernicus.eu/cdsapp#!/dataset/10.24381/cds.0ab27596?tab=form
                    </a>
                  </div>
                </div>
                <div className="flex my-4">
                  <div className="flex-initial w-24 font-bold">Licencia</div>
                  <div className="flex-1">
                    <a
                      className="underline"
                      href="https://cds.climate.copernicus.eu/api/v2/terms/static/licence-to-use-copernicus-products.pdf"
                    >
                      Licence to use Copernicus Products
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        );
      case 'precipitacion':
        return (
          <Modal
            size="wide"
            dismissable
            open={modalOpen}
            onDismiss={() => setModalOpen(false)}
            title="TITLE"
          >
            <div className="px-10">
              <h1 className="mb-5 text-xl font-medium">Precipitación (mm/mes)</h1>
              <div className="text-lg">
                <div className="flex my-4">
                  <div className="flex-initial w-24 font-bold">Descripción</div>
                  <div className="flex-1">
                    Este indicador muestra la media de la precipitación media mensual durante el
                    trimestre más lluvioso, definida como el trimestre con la precipitación media
                    mensual más alta (de la media diaria) utilizando una media móvil de 3 meses
                    consecutivos. Para calcular la suma de la precipitación total durante el mes, se
                    ha aplicado un factor de conversión de 3600x24x91.3 (número promedio de días por
                    trimestre)*1000. Este indicador bioclimático se ha calculan en base a las
                    proyecciones climáticas diarias de CMIP5 de un modelo de circulación global para
                    dos escenarios climáticos futuros, trayectoria de concentración representativa
                    (RCP, por sus siglas en inglés) 4.5 y RCP 8.5.
                  </div>
                </div>
                <div className="flex my-4">
                  <div className="flex-initial w-24 font-bold">Referencia</div>
                  <div className="flex-1">
                    DOI:{' '}
                    <a
                      className="underline"
                      href="https://cds.climate.copernicus.eu/cdsapp#!/dataset/10.24381/cds.0ab27596?tab=form"
                    >
                      10.24381/cds.0ab27596
                    </a>
                  </div>
                </div>
                <div className="flex my-4">
                  <div className="flex-initial w-24 font-bold">Fuente</div>
                  <div className="flex-1">
                    <a
                      className="underline"
                      href="https://cds.climate.copernicus.eu/cdsapp#!/dataset/10.24381/cds.0ab27596?tab=form"
                    >
                      https://cds.climate.copernicus.eu/cdsapp#!/dataset/10.24381/cds.0ab27596?tab=form
                    </a>
                  </div>
                </div>
                <div className="flex my-4">
                  <div className="flex-initial w-24 font-bold">Licencia</div>
                  <div className="flex-1">
                    <a
                      className="underline"
                      href="https://cds.climate.copernicus.eu/api/v2/terms/static/licence-to-use-copernicus-products.pdf"
                    >
                      Licence to use Copernicus Products
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {thisLegend(legendType)}
      {thisModal(legendType)}
    </>
  );
};

export default Legend;
