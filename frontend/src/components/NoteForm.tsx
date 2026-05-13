import type { ChangeEvent, FormEvent } from 'react'
import type { CreateNoteRequest } from '../types/note'
import { StatusMessage } from './StatusMessage'

type NoteFormProps = {
  formData: CreateNoteRequest
  isEditing: boolean
  isLoading: boolean
  message: string
  error: string
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onCancelEdit: () => void
}

export function NoteForm({
  formData,
  isEditing,
  isLoading,
  message,
  error,
  onChange,
  onSubmit,
  onCancelEdit,
}: NoteFormProps) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
      <h2 className="text-2xl font-semibold">
        {isEditing ? 'Update Note' : 'Create Note'}
      </h2>

      <p className="mt-2 text-sm text-slate-400">
        {isEditing
          ? 'Edit the selected note and save changes.'
          : 'Add a new study note to your collection.'}
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Title
          </label>

          <input
            id="title"
            name="title"
            value={formData.title}
            onChange={onChange}
            required
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400"
            placeholder="Example: Operating Systems Notes"
          />
        </div>

        <div>
          <label
            htmlFor="subject"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Subject
          </label>

          <input
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={onChange}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400"
            placeholder="Example: Operating Systems"
          />
        </div>

        <div>
          <label
            htmlFor="tags"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Tags
          </label>

          <input
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={onChange}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400"
            placeholder="Example: os,exam,important"
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Content
          </label>

          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={onChange}
            required
            rows={8}
            className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400"
            placeholder="Write your note content here..."
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? 'Saving...' : isEditing ? 'Update Note' : 'Create Note'}
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-slate-200 transition hover:bg-slate-800"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {message && <StatusMessage type="success" message={message} />}
      {error && <StatusMessage type="error" message={error} />}
    </section>
  )
}