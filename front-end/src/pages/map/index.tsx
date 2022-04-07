const PAGES = [
  { href: 'map/calentamiento/', label: 'Proyecciones de calentamiento en España' },
  { href: 'map/sequias/', label: 'Duración de las sequías a lo largo del año' },
  { href: 'map/cultivos/', label: 'Superficie destinada a los cultivos' },
  { href: 'map/zonas-optimas-olivo/', label: 'Cambio en zonas óptimas para el cultivo de olivo' },
  { href: 'map/rendimiento-olivo/', label: 'Proyecciones de rendimiento del olivo' },
  {
    href: 'map/rendimiento-cereales/',
    label: 'Proyecciones de rendimiento del cultivo del cereal',
  },
  {
    href: 'map/zonas-optimas-vino/',
    label: 'Cambios en zonas óptimas para la producción de vino de calidad',
  },
  {
    href: 'map/sequias-dehesa/',
    label: 'Duración de las sequías a lo largo del año en zonas de dehesa',
  },
  { href: 'map/incendios-dehesa/', label: 'Riesgo de incendios en zonas de dehesa' },
  { href: 'map/aridez/', label: 'Aridez' },
  { href: 'map/precipitacion/', label: 'Precipitación trimestre más húmedo' },
];

// const PAGES = [
//   { href: 'map/calentamiento.html', label: 'Proyecciones de calentamiento en España' },
//   { href: 'map/sequias.html', label: 'Duración de las sequías a lo largo del año' },
//   { href: 'map/cultivos.html', label: 'Superficie destinada a los cultivos' },
//   {
//     href: 'map/zonas-optimas-olivo.html',
//     label: 'Cambio en zonas óptimas para el cultivo de olivo',
//   },
//   { href: 'map/rendimiento-olivo.html', label: 'Proyecciones de rendimiento del olivo' },
//   {
//     href: 'map/rendimiento-cereales.html',
//     label: 'Proyecciones de rendimiento del cultivo del cereal',
//   },
//   {
//     href: 'map/zonas-optimas-vino.html',
//     label: 'Cambios en zonas óptimas para la producción de vino de calidad',
//   },
//   {
//     href: 'map/sequias-dehesa.html',
//     label: 'Duración de las sequías a lo largo del año en zonas de dehesa',
//   },
//   { href: 'map/incendios-dehesa.html', label: 'Riesgo de incendios en zonas de dehesa' },
//   { href: 'map/aridez.html', label: 'Aridez' },
//   { href: 'map/precipitacion.html', label: 'Precipitación trimestre más húmedo' },
// ];

const Index: React.FC = () => (
  <div className="p-12">
    <>
      <h3>El riesgo climático</h3>
      {PAGES.map((page, i) => {
        if (i < 2) {
          return (
            <a className="block p-1" key={page.href} href={page.href}>
              {page.label}
            </a>
          );
        }
      })}
      <h3>El riesgo agrícola</h3>
      {PAGES.map((page, i) => {
        if (i >= 2 && i < 9) {
          return (
            <a className="block p-1" key={page.href} href={page.href}>
              {page.label}
            </a>
          );
        }
      })}
      <h3>Otros</h3>
      {PAGES.map((page, i) => {
        if (i >= 9) {
          return (
            <a className="block p-1" key={page.href} href={page.href}>
              {page.label}
            </a>
          );
        }
      })}
    </>
  </div>
);

export default Index;
