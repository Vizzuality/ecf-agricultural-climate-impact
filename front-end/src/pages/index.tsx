import { useInView } from 'react-intersection-observer';

// containers
import Headline from 'containers/headline';
import MapVisualization from 'containers/map-visualization';
import DesafioGlobalHeadline from 'containers/sections/desafio-global/headline';
import DesafioGlobalNarrative from 'containers/sections/desafio-global/narrative';
import EconomiaEnRiesgoHeadline from 'containers/sections/economia-en-riesgo/headline';
import EfectosSobreCultivosHeadline from 'containers/sections/efectos-sobre-cultivos/headline';
import ConclusionesHeadline from 'containers/sections/conclusiones/headline';
import Menu from 'containers/menu';

// types
import { SectionIDs } from 'types';

// hooks
import { useAppContext } from 'hooks/use-app-context';
import { useEffect } from 'react';

const Welcome: React.FC = () => {
  // const [activeLayerId, setActiveLayerId] = useState();
  const { ref: desafioRef, inView: desafioInView } = useInView({ threshold: 0 });
  const { ref: economiaRef, inView: economiaInView } = useInView({ threshold: 0 });
  const { ref: efectosRef, inView: efectosInView } = useInView({ threshold: 0 });
  const { ref: conclusionesRef, inView: conclusionesInView } = useInView({ threshold: 0 });

  const { setCurrentSection } = useAppContext();

  useEffect(() => {
    if (desafioInView) {
      setCurrentSection(SectionIDs.DesafioGlobal);
    } else if (economiaInView) {
      setCurrentSection(SectionIDs.EconomiaRiesgo);
    } else if (efectosInView) {
      setCurrentSection(SectionIDs.EfectosCultivos);
    } else if (conclusionesInView) {
      setCurrentSection(SectionIDs.Conclusiones);
    }
  }, [desafioInView, economiaInView, efectosInView, conclusionesInView, setCurrentSection]);

  return (
    <div>
      <Headline />
      <Menu />
      <section ref={desafioRef} id={SectionIDs.DesafioGlobal}>
        <div className="h-screen">
          <MapVisualization activeLayerId="protected-areas" />
        </div>
        <DesafioGlobalHeadline />
        <DesafioGlobalNarrative />
      </section>
      <section ref={economiaRef} id={SectionIDs.EconomiaRiesgo}>
        <EconomiaEnRiesgoHeadline />
      </section>
      <section ref={efectosRef} id={SectionIDs.EfectosCultivos}>
        <EfectosSobreCultivosHeadline />
      </section>
      <section ref={conclusionesRef} id={SectionIDs.Conclusiones}>
        <ConclusionesHeadline />
      </section>
    </div>
  );
};

export default Welcome;
