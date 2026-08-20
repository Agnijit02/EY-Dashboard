import type { KPIData } from '../dashboard.types';
import KPICard from './KPICard';

interface KPIGridProps {
  data: KPIData[];
}

function KPIGrid({ data }: KPIGridProps) {
  return (
    <section aria-label="Business performance indicators" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {data.map((kpi) => (
        <KPICard key={kpi.id} data={kpi} />
      ))}
    </section>
  );
}

export default KPIGrid;