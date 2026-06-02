import Link from "next/link";
import { ChefHat, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BuildPlaceholderPage({ params }: Props) {
  const { slug } = await params;

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <Card className="border-dashed border-amber-500/40 bg-amber-500/5 text-center">
        <FolderOpen className="mx-auto h-12 w-12 text-amber-400" />
        <h1 className="mt-4 text-2xl font-bold">Station: {slug}</h1>
        <p className="mt-2 text-zinc-400">
          This build hasn&apos;t been plated yet. Open in Cursor and create{" "}
          <code className="text-amber-400">app/build/{slug}/page.tsx</code>
        </p>
        <p className="mt-4 text-sm text-kitchen-muted">
          Copy the starter from{" "}
          <code className="text-zinc-300">app/build/_template/page.tsx</code>
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/kitchen">
            <Button variant="outline" size="sm">
              <ChefHat className="h-4 w-4" />
              Back to Kitchen
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
