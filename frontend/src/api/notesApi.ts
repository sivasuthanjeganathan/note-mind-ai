import type { CreateNoteRequest, Note, UpdateNoteRequest } from '../types/note'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

function getApiUrl(path: string) {
  return `${API_BASE_URL}${path}`
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`)
  }

  return response.json() as Promise<T>
}

export async function getAllNotes(): Promise<Note[]> {
  const response = await fetch(getApiUrl('/api/notes'))
  return handleResponse<Note[]>(response)
}

export async function searchNotes(query: string): Promise<Note[]> {
  const response = await fetch(
    getApiUrl(`/api/notes/search?query=${encodeURIComponent(query)}`),
  )

  return handleResponse<Note[]>(response)
}

export async function createNote(request: CreateNoteRequest): Promise<Note> {
  const response = await fetch(getApiUrl('/api/notes'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })

  return handleResponse<Note>(response)
}

export async function updateNote(
  id: number,
  request: UpdateNoteRequest,
): Promise<Note> {
  const response = await fetch(getApiUrl(`/api/notes/${id}`), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })

  return handleResponse<Note>(response)
}

export async function deleteNote(id: number): Promise<void> {
  const response = await fetch(getApiUrl(`/api/notes/${id}`), {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error(`Delete failed with status ${response.status}`)
  }
}