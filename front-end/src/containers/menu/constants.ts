import { SectionIDs, SectionObject } from 'types';

export const SECTIONS: SectionObject[] = [
  {
    id: SectionIDs.DesafioGlobal,
    label: 'Un desafío global',
    url: `#${SectionIDs.DesafioGlobal}`,
  },
  {
    id: SectionIDs.EconomiaRiesgo,
    label: 'Una economía en riesgo',
    url: `#${SectionIDs.EconomiaRiesgo}`,
  },
  {
    id: SectionIDs.EfectosCultivos,
    label: 'Efectos sobre cultivos',
    url: `#${SectionIDs.EfectosCultivos}`,
  },
  {
    id: SectionIDs.Conclusiones,
    label: 'Conclusiones',
    url: `#${SectionIDs.Conclusiones}`,
  },
];
