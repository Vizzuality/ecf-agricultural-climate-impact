const PAGES = [
  { href: 'map/aridez/', label: 'Aridez' },
  { href: 'map/calentamiento/', label: 'Proyecciones de calentamiento' },
  // { href: 'map/cultivo-olivo/', label: 'Olivar' },
  { href: 'map/cultivos/', label: 'Superficie destinada a los cultivos' },
  { href: 'map/incendios-dehesa/', label: 'Riesgo de incendios en zonas de dehesa' },
  { href: 'map/precipitacion/', label: 'Precipitación trimestre más húmedo' },
  {
    href: 'map/rendimiento-cereales/',
    label: 'Proyecciones de rendimiento del cultivo del cereal',
  },
  { href: 'map/rendimiento-olivo/', label: 'Proyecciones de rendimiento del olivo' },
  { href: 'map/sequias/', label: 'Proyecciones de sequías' },
  {
    href: 'map/sequias-dehesa/',
    label: 'Duración de las sequías a lo largo del año en zonas de dehesa',
  },
  { href: 'map/zonas-optimas-olivo/', label: 'Cambio en zonas óptimas para el cultivo de olivo' },
  {
    href: 'map/zonas-optimas-vino/',
    label: 'Cambios en zonas óptimas para la producción de vino de calidad',
  },
];

const Index: React.FC = () => (
  <div className="p-12">
    {PAGES.map((page) => (
      <a className="block p-1" key={page.href} href={page.href}>
        {page.label}
      </a>
    ))}
  </div>
);

export default Index;
