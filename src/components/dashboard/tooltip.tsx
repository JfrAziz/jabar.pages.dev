import { Label } from "@/components/ui/label";
import { useDashboardStore } from "./store";

export const Tooltip = () => {
  const tooltip = useDashboardStore((state) => state.tooltip);

  const settings = useDashboardStore((state) => state.settings);

  if (!settings.tooltip || !tooltip) return null;

  return (
    <div
      style={{ left: tooltip.position.x, top: tooltip.position.y }}
      className="-translate-x-[50%] -translate-y-full pointer-events-none absolute z-[100] w-64 cursor-pointer gap-0.5 rounded-sm border bg-background p-4 shadow-sm"
    >
      {Object.keys(tooltip.data)
        .filter((key) => key !== "geometry")
        .map((key) => (
          <div
            key={key}
            className="flex flex-row items-center justify-between gap-0.5"
          >
            <Label className="font-bold text-xs">{key}</Label>
            <Label className="font-light font-mono text-xs">
              {!tooltip.data[key] || Number.isNaN(Number(tooltip.data[key]))
                ? tooltip.data[key]
                : Number(tooltip.data[key]).toFixed(4)}
            </Label>
          </div>
        ))}
    </div>
  );
};
