"use client";

import type { Ingredient } from "@/lib/ingredients";
import type { Spice } from "@/lib/spices";
import type { TrackId } from "@/lib/tracks";
import type { ToolIdea } from "@/lib/tool-ideas";
import { AiPlater } from "./ai-plater";
import { KitchenDashboard } from "./kitchen-dashboard";
import { BuildSprint } from "./build-sprint";
import { Experience } from "@/components/experience";

interface Props {
  trackId: TrackId;
  dishName: string;
  ingredients: Ingredient[];
  spice: Spice | null;
  tool?: ToolIdea | null;
}

export function TrackWidget({
  trackId,
  dishName,
  ingredients,
  spice,
  tool,
}: Props) {
  switch (trackId) {
    case "visual-dash":
      return <KitchenDashboard />;
    case "interactive":
      return tool?.id === "slot-prompt" ? (
        <Experience />
      ) : (
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
          toolBrief={tool?.buildBrief}
        />
      );
  }
}
