// containers
import Section from 'containers/section';
import Hero from 'containers/sections/hero';
import Footer from 'containers/sections/footer';
import CultivoCulturaCambio from 'containers/sections/cultivo-cultura-cambio';
import ElRiesgoClimatico from 'containers/sections/el-riesgo-climatico';
import ElRiesgoAgricola from 'containers/sections/el-riesgo-agricola';
import CultivoCulturaResiliencia from 'containers/sections/cultivo-cultura-resiliencia';
import Menu from 'containers/menu';
import { SectionIDs } from 'types';

const Welcome: React.FC = () => {
  return (
    <div>
      <div>
        <Menu />
        <Hero />
        <Section id={SectionIDs.CultivoCulturaCambio} title="Cultivo, cultura, cambio">
          <CultivoCulturaCambio />
        </Section>
        <Section id={SectionIDs.ElRiesgoClimatico} title="El Riesgo Climático">
          <ElRiesgoClimatico />
        </Section>
        <Section id={SectionIDs.ElRiesgoAgricola} title="El Riesgo Agricola">
          <ElRiesgoAgricola />
        </Section>
        <Section id={SectionIDs.CultivoCulturaResiliencia} title="Cultivo, Cultura, Resiliencia">
          <CultivoCulturaResiliencia />
        </Section>
        <Footer />
      </div>
    </div>
  );
};

export default Welcome;
