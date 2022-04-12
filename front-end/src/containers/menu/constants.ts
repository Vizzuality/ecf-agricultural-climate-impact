import { SectionIDs, SectionObject, SubsectionIDs } from 'types';

export const SECTIONS: SectionObject[] = [
  {
    id: SectionIDs.CultivoCulturaCambio,
    label: 'Cultivo, cultura, cambio',
    url: `section-${SectionIDs.CultivoCulturaCambio}`,
  },
  {
    id: SectionIDs.ElRiesgoClimatico,
    label: 'El riesgo climático',
    url: `section-${SectionIDs.ElRiesgoClimatico}`,
  },
  {
    id: SectionIDs.ElRiesgoAgricola,
    label: 'El Riesgo Agrícola',
    url: `section-${SectionIDs.ElRiesgoAgricola}`,
    subsections: [
      {
        id: SubsectionIDs.Cereales,
        label: 'Cereales',
        url: `section-${SubsectionIDs.Cereales}`,
      },
      {
        id: SubsectionIDs.Dehesa,
        label: 'Dehesa',
        url: `section-${SubsectionIDs.Dehesa}`,
      },
      {
        id: SubsectionIDs.Olivar,
        label: 'Olivar',
        url: `section-${SubsectionIDs.Olivar}`,
      },
      {
        id: SubsectionIDs.Vinedo,
        label: 'Viñedo',
        url: `section-${SubsectionIDs.Vinedo}`,
      },
    ],
  },
  {
    id: SectionIDs.CultivoCulturaResiliencia,
    label: 'Cultivo, cultura, resiliencia',
    url: `section-${SectionIDs.CultivoCulturaResiliencia}`,
  },
];
