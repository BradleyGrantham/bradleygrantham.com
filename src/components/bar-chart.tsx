type BarChartProps = {
  data: { label: string; value: number }[];
  title?: string;
};

export function BarChart({ data, title }: BarChartProps) {
  const max = Math.max(...data.map((d) => d.value));

  return (
    <div className="not-prose my-8 rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
      {title && (
        <h3 className="mb-4 text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {title}
        </h3>
      )}
      <div className="flex items-end gap-3 h-48">
        {data.map((d) => (
          <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
            <div
              className="w-full rounded-t bg-zinc-900 dark:bg-zinc-100"
              style={{ height: `${(d.value / max) * 100}%` }}
            />
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {d.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
