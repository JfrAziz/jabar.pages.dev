import { FC } from "react";
import { useDashboardStore } from "./store";
import { INITIAL_VIEW_STATE } from "./constant";
import { SplittedMaps, DeckGLOverlay } from "@/components/ui/maps";
import { useRegionLayer } from "@/components/analysis/use-regencies-broder-layer";
import {
  useGridLayer,
  GridFillType,
  GridElevation,
} from "@/components/analysis/use-grid-layer";

interface GridLayerProps {
  fill: GridFillType;
  elevation?: GridElevation;
}

export const GridLayer: FC<GridLayerProps> = ({ fill, elevation }) => {
  const showRegion = useDashboardStore((state) => state.settings.region);

  const gridLayer = useGridLayer({
    fill,
    elevation,
    onHover: (tooltip) => useDashboardStore.setState({ tooltip }),
  });

  const region = useRegionLayer({ disabled: !showRegion });

  return <DeckGLOverlay controller layers={[gridLayer, ...region]} />;
};

type CompareGridLayerProps = Pick<GridLayerProps, "elevation">;

export const CompareGridLayer: FC<CompareGridLayerProps> = ({ elevation }) => {
  const baseMap = useDashboardStore((state) => state.settings.baseMap);

  return (
    <SplittedMaps
      viewState={INITIAL_VIEW_STATE}
      left={<GridLayer fill="FoodExpend" elevation={elevation} />}
      right={<GridLayer fill="NonFoodExpend" elevation={elevation} />}
      mapStyle={
        baseMap === "default"
          ? "/maps/style.json"
          : "/maps/style-satellite.json"
      }
    />
  );
};
