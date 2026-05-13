import type { Note } from '../types/note'
import { NoteCard } from './NoteCard'
import { SearchBar } from './SearchBar'
import type { FormEvent } from 'react'

type NotesListProps = {
  notes: Note[]
  isLoading: boolean
  searchQuery: string
  onSearchQueryChange: (value: string) => void
  onSearch: (event: FormEvent<HTMLFormElement>) => void
  onEdit: (note: Note) => void
  onDelete: (id: number) => void
}

export function NotesList({
  notes,
  isLoading,
  searchQuery,
  onSearchQueryChange,
  onSearch,
  onEdit,
  onDelete,
}: NotesListProps) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-semibold">Your Notes</h2>

          <p className="mt-2 text-sm text-slate-400">
            Search and manage notes stored in PostgreSQL.
          </p>
        </div>

        <SearchBar
          searchQuery={searchQuery}
          onSearchQueryChange={onSearchQueryChange}
          onSearch={onSearch}
        />
      </div>

      {isLoading && (
        <p className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm text-slate-400">
          Loading...
        </p>
      )}

      {!isLoading && notes.length === 0 && (
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-8 text-center">
          <p className="text-lg font-semibold">No notes found.</p>

          <p className="mt-2 text-sm text-slate-400">
            Create your first note using the form.
          </p>
        </div>
      )}

      <div className="grid gap-4">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  )
}