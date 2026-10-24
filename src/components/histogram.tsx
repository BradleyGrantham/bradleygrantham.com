type HistogramProps = {
  // Counts per bin, starting at 0. Bin i covers [i * binSize, (i + 1) * binSize).
  bins: number[];
  binSize: number;
  // Dashed reference lines, e.g. percentiles, in the same units as binSize.
  markers?: { label: string; value: number }[];
  title?: string;
  caption?: string;
};

function formatMs(ms: number) {
  if (ms === 0) return "0";
  return ms >= 1000 ? `${ms / 1000} s` : `${ms} ms`;
}

export function Histogram({ bins, binSize, markers = [], title, caption }: HistogramProps) {
  const max = Math.max(...bins);
  const range = bins.length * binSize;
  const step = max > 50 ? 50 : 10;
  const yTicks = Array.from({ length: Math.floor(max / step) + 1 }, (_, i) => i * step);
  const xTicks = Array.from({ length: Math.floor(range / 1000) + 1 }, (_, i) => i * 1000);
  const pct = (v: number) => `${(v / range) * 100}%`;
  const labelRowHeight = markers.length * 16;

  return (
    <figure className="not-prose my-8 rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
      {title && (
        <h3 className="mb-4 text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {title}
        </h3>
      )}
      <div className="flex gap-2 text-xs text-zinc-500 dark:text-zinc-400">
        <div className="relative h-48 w-6 shrink-0 text-right" style={{ marginTop: labelRowHeight }}>
          {yTicks.map((t) => (
            <span
              key={t}
              className="absolute right-0 translate-y-1/2"
              style={{ bottom: `${(t / max) * 100}%` }}
            >
              {t}
            </span>
          ))}
        </div>
        <div className="flex-1">
          <div className="relative" style={{ height: labelRowHeight }}>
            {markers.map((m, i) => (
              <span
                key={m.label}
                className="absolute whitespace-nowrap pl-1"
                style={{ left: pct(m.value), top: i * 16 }}
              >
                {m.label} {m.value.toLocaleString()} ms
              </span>
            ))}
          </div>
          <div className="relative h-48 border-b border-zinc-300 dark:border-zinc-700">
            {yTicks.slice(1).map((t) => (
              <div
                key={t}
                className="absolute inset-x-0 border-t border-zinc-100 dark:border-zinc-900"
                style={{ bottom: `${(t / max) * 100}%` }}
              />
            ))}
            <div className="relative flex h-full items-end gap-px">
              {bins.map((n, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm bg-zinc-900 dark:bg-zinc-100"
                  style={{ height: `${(n / max) * 100}%` }}
                  title={`${formatMs(i * binSize)}–${formatMs((i + 1) * binSize)}: ${n}`}
                />
              ))}
            </div>
            {markers.map((m, i) => (
              <div
                key={m.label}
                className="absolute bottom-0 border-l border-dashed border-zinc-400 dark:border-zinc-500"
                style={{ left: pct(m.value), top: -labelRowHeight + i * 16 }}
              />
            ))}
          </div>
          <div className="relative mt-1 h-4">
            {xTicks.map((t) => (
              <span
                key={t}
                className="absolute -translate-x-1/2 first:translate-x-0"
                style={{ left: pct(t) }}
              >
                {formatMs(t)}
              </span>
            ))}
          </div>
        </div>
      </div>
      {caption && (
        <figcaption className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
