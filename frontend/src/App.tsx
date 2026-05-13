import { useEffect, useMemo, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import './App.css'
import {
  createNote,
  deleteNote,
  getAllNotes,
  searchNotes,
  updateNote,
} from './api/notesApi'
import { AppHeader } from './components/AppHeader'
import { NoteForm } from './components/NoteForm'
import { NotesList } from './components/NotesList'
import type { CreateNoteRequest, Note, UpdateNoteRequest } from './types/note'

const emptyForm: CreateNoteRequest = {
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
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
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

  async function handleSearch(event: FormEvent<HTMLFormElement>) {
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
        <AppHeader totalNotes={notes.length} />

        <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
          <NoteForm
            formData={formData}
            isEditing={isEditing}
            isLoading={isLoading}
            message={message}
            error={error}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
            onCancelEdit={handleCancelEdit}
          />

          <NotesList
            notes={sortedNotes}
            isLoading={isLoading}
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            onSearch={handleSearch}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </section>
    </main>
  )
}

export default App