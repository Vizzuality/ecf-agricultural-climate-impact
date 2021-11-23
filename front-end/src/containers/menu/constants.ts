import { SectionIDs, SectionObject, SubsectionIDs } from 'types';

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
    subsections: [
      {
        id: SubsectionIDs.Cereales,
        label: 'Cereales',
        url: `#${SubsectionIDs.Cereales}`
      },
      {
        id: SubsectionIDs.Dehesa,
        label: 'Dehesa',
        url: `#${SubsectionIDs.Dehesa}`
      },
      {
        id: SubsectionIDs.Olivar,
        label: 'Olivar',
        url: `#${SubsectionIDs.Olivar}`
      },
      {
        id: SubsectionIDs.Vinedo,
        label: 'Viñedo',
        url: `#${SubsectionIDs.Vinedo}`
      },
    ]
  },
  {
    id: SectionIDs.Conclusiones,
    label: 'Conclusiones',
    url: `#${SectionIDs.Conclusiones}`,
  },
];
