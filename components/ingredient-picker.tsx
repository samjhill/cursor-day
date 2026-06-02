import { clsx } from "clsx";
import type { Ingredient } from "@/lib/ingredients";

interface Props {
  ingredients: Ingredient[];
  selected: Ingredient[];
  onToggle: (ingredient: Ingredient) => void;
}

const categoryLabels = {
  core: "Pantry Staples",
  flavor: "Seasonings",
  garnish: "Garnish",
} as const;

export function IngredientPicker({ ingredients, selected, onToggle }: Props) {
  const categories = ["core", "flavor", "garnish"] as const;

  return (
    <div className="space-y-5">
      {categories.map((cat) => {
        const items = ingredients.filter((i) => i.category === cat);
        if (items.length === 0) return null;
        return (
          <div key={cat}>
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-kitchen-muted">
              {categoryLabels[cat]}
            </p>
            <div className="flex flex-wrap gap-2">
              {items.map((ingredient) => {
                const isSelected = selected.some((s) => s.id === ingredient.id);
                return (
                  <button
                    key={ingredient.id}
                    type="button"
                    onClick={() => onToggle(ingredient)}
                    className={clsx(
                      "rounded-full border px-3 py-1.5 text-sm transition-all",
                      isSelected
                        ? "border-violet-500 bg-violet-500/15 text-violet-200"
                        : "border-kitchen-border text-zinc-400 hover:border-zinc-600"
                    )}
                  >
                    {ingredient.emoji} {ingredient.name}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
