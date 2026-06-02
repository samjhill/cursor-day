/**
 * Starter page for a rolled build. Cursor copies this to app/build/{slug}/page.tsx
 * and replaces the placeholder with the real tool UI.
 */
export default function BuildTemplatePage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16 text-center">
      <p className="text-4xl">🍳</p>
      <h1 className="mt-4 text-2xl font-bold">Your tool goes here</h1>
      <p className="mt-2 text-zinc-400">
        Replace this file with your rolled tool. Import components from{" "}
        <code className="text-amber-400">projects/&#123;slug&#125;/</code>.
      </p>
    </div>
  );
}
