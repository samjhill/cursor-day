"use client";

import type { Ingredient } from "@/lib/ingredients";
import type { Spice } from "@/lib/spices";
import type { TrackId } from "@/lib/tracks";
import { AiPlater } from "./ai-plater";
import { KitchenDashboard } from "./kitchen-dashboard";
import { BuildSprint } from "./build-sprint";

interface Props {
  trackId: TrackId;
  dishName: string;
  ingredients: Ingredient[];
  spice: Spice | null;
}

export function TrackWidget({
  trackId,
  dishName,
  ingredients,
  spice,
}: Props) {
  switch (trackId) {
    case "visual-dash":
      return <KitchenDashboard />;
    case "interactive":
      return (
        <BuildSprint
          dishName={dishName}
          ingredients={ingredients}
          spice={spice}
        />
      );
    case "ai-tool":
    default:
      return (
        <AiPlater
          dishName={dishName}
          trackId={trackId}
          ingredients={ingredients}
          spice={spice}
        />
      );
  }
}
