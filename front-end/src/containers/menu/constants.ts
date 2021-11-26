import { SectionIDs, SectionObject, SubsectionIDs } from 'types';

export const SECTIONS: SectionObject[] = [
  {
    id: SectionIDs.DesafioGlobal,
    label: 'Un desafío global',
    url: `#${SectionIDs.DesafioGlobal}`,
    color: '#BC6C25',
  },
  {
    id: SectionIDs.EconomiaRiesgo,
    label: 'Una economía en riesgo',
    url: `#${SectionIDs.EconomiaRiesgo}`,
    color: '#283618',
  },
  {
    id: SectionIDs.EfectosCultivos,
    label: 'Efectos sobre cultivos',
    url: `#${SectionIDs.EfectosCultivos}`,
    color: '#CC904D',
    subsections: [
      {
        id: SubsectionIDs.Cereales,
        label: 'Cereales',
        url: `#${SubsectionIDs.Cereales}`,
      },
      {
        id: SubsectionIDs.Dehesa,
        label: 'Dehesa',
        url: `#${SubsectionIDs.Dehesa}`,
      },
      {
        id: SubsectionIDs.Olivar,
        label: 'Olivar',
        url: `#${SubsectionIDs.Olivar}`,
      },
      {
        id: SubsectionIDs.Vinedo,
        label: 'Viñedo',
        url: `#${SubsectionIDs.Vinedo}`,
      },
    ],
  },
  {
    id: SectionIDs.Conclusiones,
    label: 'Conclusiones',
    url: `#${SectionIDs.Conclusiones}`,
    color: '#CC904D',
  },
];
