import {
  SectionIDs,
  SectionObject,
  // SubsectionIDs
} from 'types';

export const SECTIONS: SectionObject[] = [
  {
    id: SectionIDs.CultivoCulturaCambio,
    label: 'Cultivo, cultura, cambio',
    url: `#${SectionIDs.CultivoCulturaCambio}`,
  },
  {
    id: SectionIDs.ElRiesgoClimatico,
    label: 'El riesgo climático',
    url: `#${SectionIDs.ElRiesgoClimatico}`,
  },
  {
    id: SectionIDs.ElRiesgoAgricola,
    label: 'El Riesgo Agrícola',
    url: `#${SectionIDs.ElRiesgoAgricola}`,
  },
  // {
  //   id: SectionIDs.ElRiesgoAgricola,
  //   label: 'El Riesgo Agrícola',
  //   url: `#${SectionIDs.ElRiesgoAgricola}`,
  //   subsections: [
  //     {
  //       id: SubsectionIDs.Cereales,
  //       label: 'Cereales',
  //       url: `#${SubsectionIDs.Cereales}`,
  //     },
  //     {
  //       id: SubsectionIDs.Dehesa,
  //       label: 'Dehesa',
  //       url: `#${SubsectionIDs.Dehesa}`,
  //     },
  //     {
  //       id: SubsectionIDs.Olivar,
  //       label: 'Olivar',
  //       url: `#${SubsectionIDs.Olivar}`,
  //     },
  //     {
  //       id: SubsectionIDs.Vinedo,
  //       label: 'Viñedo',
  //       url: `#${SubsectionIDs.Vinedo}`,
  //     },
  //   ],
  // },
  {
    id: SectionIDs.CultivoCulturaResiliencia,
    label: 'Cultivo, cultura, resiliencia',
    url: `#${SectionIDs.CultivoCulturaResiliencia}`,
  },
];
