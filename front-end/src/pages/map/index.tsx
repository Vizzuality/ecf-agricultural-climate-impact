const PAGES = [
  'map/aridez/',
  'map/calentamiento/',
  'map/cultivo-olivo/',
  'map/cultivos/',
  'map/incendios-dehesa/',
  'map/precipitacion/',
  'map/rendimiento-cereales/',
  'map/rendimiento-olivo/',
  'map/sequias-dehesa/',
  'map/zonas-optimas-olivo/',
  'map/zonas-optimas-vino/',
];

const Index: React.FC = () => (
  <div className="p-12">
    {PAGES.map((page) => (
      <a className="block p-1" key={page} href={page}>
        {page}
      </a>
    ))}
  </div>
);

export default Index;
