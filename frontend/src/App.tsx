import { useEffect, useMemo, useState } from 'react'
import './App.css'
import {
  createNote,
  deleteNote,
  getAllNotes,
  searchNotes,
  updateNote,
} from './api/notesApi'
import type { CreateNoteRequest, Note, UpdateNoteRequest } from './types/note'

const emptyForm = {
  title: '',
  content: '',
  subject: '',
  tags: '',
}

function App() {
  const [notes, setNotes] = useState<Note[]>([])
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [formData, setFormData] = useState<CreateNoteRequest>(emptyForm)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const isEditing = selectedNote !== null

  const sortedNotes = useMemo(() => {
    return [...notes].sort((a, b) => {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    })
  }, [notes])

  async function loadNotes() {
    try {
      setIsLoading(true)
      setError('')

      const data = await getAllNotes()
      setNotes(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load notes')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    let isCancelled = false

    async function loadInitialNotes() {
      try {
        const data = await getAllNotes()

        if (!isCancelled) {
          setNotes(data)
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load notes')
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false)
        }
      }
    }

    void loadInitialNotes()

    return () => {
      isCancelled = true
    }
    }, [])

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      setIsLoading(true)
      setError('')
      setMessage('')

      if (isEditing) {
        const request: UpdateNoteRequest = {
          title: formData.title,
          content: formData.content,
          subject: formData.subject,
          tags: formData.tags,
        }

        await updateNote(selectedNote.id, request)
        setMessage('Note updated successfully.')
      } else {
        await createNote(formData)
        setMessage('Note created successfully.')
      }

      setFormData(emptyForm)
      setSelectedNote(null)
      await loadNotes()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save note')
    } finally {
      setIsLoading(false)
    }
  }

  function handleEdit(note: Note) {
    setSelectedNote(note)

    setFormData({
      title: note.title,
      content: note.content,
      subject: note.subject ?? '',
      tags: note.tags ?? '',
    })

    setMessage('')
    setError('')
  }

  async function handleDelete(id: number) {
    try {
      setIsLoading(true)
      setError('')
      setMessage('')

      await deleteNote(id)

      if (selectedNote?.id === id) {
        setSelectedNote(null)
        setFormData(emptyForm)
      }

      setMessage('Note deleted successfully.')
      await loadNotes()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete note')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      setIsLoading(true)
      setError('')
      setMessage('')

      if (searchQuery.trim() === '') {
        await loadNotes()
        return
      }

      const results = await searchNotes(searchQuery)
      setNotes(results)
      setMessage(`Found ${results.length} matching note(s).`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed')
    } finally {
      setIsLoading(false)
    }
  }

  function handleCancelEdit() {
    setSelectedNote(null)
    setFormData(emptyForm)
    setMessage('')
    setError('')
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto max-w-7xl px-6 py-8">
        <header className="mb-8 flex flex-col gap-3 border-b border-slate-800 pb-6">
          <p className="text-sm font-medium text-cyan-300">
            Full-stack AI Notes App
          </p>

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                NoteMind AI
              </h1>
              <p className="mt-2 max-w-2xl text-slate-300">
                Create, organize, search, and later enhance your notes with AI
                summaries, flashcards, and quizzes.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-300">
              Total notes:{' '}
              <span className="font-semibold text-white">{notes.length}</span>
            </div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
            <h2 className="text-2xl font-semibold">
              {isEditing ? 'Update Note' : 'Create Note'}
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              {isEditing
                ? 'Edit the selected note and save changes.'
                : 'Add a new study note to your collection.'}
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  {isLoading
                    ? 'Saving...'
                    : isEditing
                      ? 'Update Note'
                      : 'Create Note'}
                </button>

                {isEditing && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-slate-200 transition hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

            {message && (
              <div className="mt-5 rounded-xl border border-emerald-800 bg-emerald-950/40 p-4 text-sm text-emerald-300">
                {message}
              </div>
            )}

            {error && (
              <div className="mt-5 rounded-xl border border-red-800 bg-red-950/40 p-4 text-sm text-red-300">
                {error}
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
            <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h2 className="text-2xl font-semibold">Your Notes</h2>
                <p className="mt-2 text-sm text-slate-400">
                  Search and manage notes stored in PostgreSQL.
                </p>
              </div>

              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
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
            </div>

            {isLoading && (
              <p className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm text-slate-400">
                Loading...
              </p>
            )}

            {!isLoading && sortedNotes.length === 0 && (
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-8 text-center">
                <p className="text-lg font-semibold">No notes found.</p>
                <p className="mt-2 text-sm text-slate-400">
                  Create your first note using the form.
                </p>
              </div>
            )}

            <div className="grid gap-4">
              {sortedNotes.map((note) => (
                <article
                  key={note.id}
                  className="rounded-2xl border border-slate-800 bg-slate-950 p-5 transition hover:border-slate-700"
                >
                  <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {note.title}
                      </h3>

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
                        onClick={() => handleEdit(note)}
                        className="rounded-lg border border-slate-700 px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(note.id)}
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
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}

export default App