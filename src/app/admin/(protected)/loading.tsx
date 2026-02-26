export default function AdminLoading(): React.JSX.Element {
  return (
    <div className="flex h-screen w-full bg-white text-neutral-900">
      <aside className="hidden w-[280px] shrink-0 flex-col border-r border-neutral-200 bg-neutral-50 md:flex">
        <div className="h-16 border-b border-neutral-200" />
        <div className="flex-1 px-3 py-5">
          <div className="space-y-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-12 animate-pulse rounded-lg bg-neutral-200"
                style={{ animationDelay: `${i * 50}ms` }}
              />
            ))}
          </div>
        </div>
        <div className="border-t border-neutral-200 p-4">
          <div className="flex items-center gap-3 rounded-lg bg-neutral-100 p-3">
            <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-neutral-300" />
            <div className="flex-1 space-y-1">
              <div className="h-4 w-24 animate-pulse rounded bg-neutral-200" />
              <div className="h-3 w-32 animate-pulse rounded bg-neutral-200" />
            </div>
          </div>
        </div>
      </aside>
      <main className="flex flex-1 flex-col overflow-hidden bg-white">
        <header className="flex min-h-[72px] flex-wrap items-center justify-between gap-4 border-b border-neutral-200 bg-white px-8 py-4">
          <div className="space-y-1">
            <div className="h-8 w-48 animate-pulse rounded bg-neutral-200" />
            <div className="h-4 w-64 animate-pulse rounded bg-neutral-100" />
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-32 animate-pulse rounded-lg bg-neutral-200" />
            <div className="h-10 w-28 animate-pulse rounded-lg bg-neutral-200" />
            <div className="h-10 w-10 animate-pulse rounded-lg bg-neutral-200" />
          </div>
        </header>
        <div className="flex-1 overflow-y-auto bg-neutral-50/50 p-8">
          <div className="mx-auto max-w-[1400px] space-y-8">
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-36 animate-pulse rounded-xl border border-neutral-200 bg-white"
                  style={{ animationDelay: `${i * 80}ms` }}
                />
              ))}
            </div>
            <div className="grid gap-8 xl:grid-cols-[1fr_400px]">
              <div className="h-96 animate-pulse rounded-xl border border-neutral-200 bg-white" />
              <div className="h-96 animate-pulse rounded-xl border border-neutral-200 bg-white" />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
