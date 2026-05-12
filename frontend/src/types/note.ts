export type Note = {
  id: number
  title: string
  content: string
  subject: string | null
  tags: string | null
  createdAt: string
  updatedAt: string
}

export type CreateNoteRequest = {
  title: string
  content: string
  subject: string
  tags: string
}

export type UpdateNoteRequest = {
  title: string
  content: string
  subject: string
  tags: string
}