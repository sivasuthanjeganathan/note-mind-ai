import type { Note } from '../types/note'

type NoteCardProps = {
  note: Note
  onEdit: (note: Note) => void
  onDelete: (id: number) => void
}

export function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-950 p-5 transition hover:border-slate-700">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div>
          <h3 className="text-xl font-semibold text-white">{note.title}</h3>

          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            {note.subject && (
              <span className="rounded-full bg-cyan-950 px-3 py-1 text-cyan-300">
                {note.subject}
              </span>
            )}

            {note.tags && (
              <span className="rounded-full bg-slate-800 px-3 py-1 text-slate-300">
                {note.tags}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(note)}
            className="rounded-lg border border-slate-700 px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(note.id)}
            className="rounded-lg border border-red-900 px-3 py-2 text-sm font-medium text-red-300 transition hover:bg-red-950"
          >
            Delete
          </button>
        </div>
      </div>

      <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-slate-300">
        {note.content}
      </p>

      <p className="mt-4 text-xs text-slate-500">
        Last updated: {new Date(note.updatedAt).toLocaleString()}
      </p>
    </article>
  )
}