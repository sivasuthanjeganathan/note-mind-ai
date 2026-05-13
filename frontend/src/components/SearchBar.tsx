import type { FormEvent } from 'react'

type SearchBarProps = {
  searchQuery: string
  onSearchQueryChange: (value: string) => void
  onSearch: (event: FormEvent<HTMLFormElement>) => void
}

export function SearchBar({
  searchQuery,
  onSearchQueryChange,
  onSearch,
}: SearchBarProps) {
  return (
    <form onSubmit={onSearch} className="flex gap-2">
      <input
        value={searchQuery}
        onChange={(event) => onSearchQueryChange(event.target.value)}
        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 md:w-64"
        placeholder="Search title/content..."
      />

      <button
        type="submit"
        className="rounded-xl border border-slate-700 px-4 py-3 font-semibold text-slate-200 transition hover:bg-slate-800"
      >
        Search
      </button>
    </form>
  )
}