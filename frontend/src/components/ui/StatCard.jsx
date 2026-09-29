import { Card, CardContent } from './Card';
import { clsx } from 'clsx';

export function StatCard({ title, value, icon: Icon, description, trend, className }) {
  return (
    <Card className={clsx("transition-all duration-300 hover:shadow-md", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <div className="flex items-baseline space-x-2">
              <h3 className="text-3xl font-bold text-slate-800">{value}</h3>
              {trend && (
                <span className={clsx(
                  "text-xs font-semibold px-2 py-0.5 rounded-full",
                  trend === 'up' ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                )}>
                  {trend === 'up' ? '+' : '-'}
                </span>
              )}
            </div>
            {description && (
              <p className="text-sm text-slate-400 mt-1">{description}</p>
            )}
          </div>
          <div 
            className="h-14 w-14 rounded-2xl flex items-center justify-center bg-opacity-10"
            style={{ backgroundColor: 'var(--color-primary-50, rgba(0,0,0,0.05))' }}
          >
            <Icon size={28} style={{ color: 'var(--color-primary)' }} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
