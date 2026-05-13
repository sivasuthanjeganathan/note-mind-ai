type AppHeaderProps = {
  totalNotes: number
}

export function AppHeader({ totalNotes }: AppHeaderProps) {
  return (
    <header className="mb-8 flex flex-col gap-3 border-b border-slate-800 pb-6">
      <p className="text-sm font-medium text-cyan-300">
        Full-stack AI Notes App
      </p>

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">NoteMind AI</h1>

          <p className="mt-2 max-w-2xl text-slate-300">
            Create, organize, search, and later enhance your notes with AI
            summaries, flashcards, and quizzes.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-300">
          Total notes:{' '}
          <span className="font-semibold text-white">{totalNotes}</span>
        </div>
      </div>
    </header>
  )
}