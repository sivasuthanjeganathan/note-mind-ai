import { useEffect, useState } from 'react'
import './App.css'

type HealthResponse = {
  status: string
  service: string
}

function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

    fetch(`${apiBaseUrl}/api/health`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Backend health check failed')
        }

        return response.json()
      })
      .then((data: HealthResponse) => {
        setHealth(data)
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('Unknown error occurred')
        }
      })
  }, [])

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-3 rounded-full border border-slate-700 px-4 py-1 text-sm text-slate-300">
          Full-stack AI Notes App
        </p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          NoteMind AI
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-300">
          A modern AI-powered notes application built with React, Vite,
          TypeScript, Spring Boot, PostgreSQL, and AI API integration.
        </p>

        <div className="mt-10 w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900 p-6 text-left shadow-xl">
          <h2 className="text-xl font-semibold">Backend Connection Status</h2>

          {health && (
            <div className="mt-4 rounded-xl border border-emerald-800 bg-emerald-950/40 p-4">
              <p className="font-medium text-emerald-300">
                Backend is connected successfully.
              </p>
              <p className="mt-2 text-sm text-slate-300">
                Status: {health.status}
              </p>
              <p className="text-sm text-slate-300">
                Service: {health.service}
              </p>
            </div>
          )}

          {error && (
            <div className="mt-4 rounded-xl border border-red-800 bg-red-950/40 p-4">
              <p className="font-medium text-red-300">
                Backend connection failed.
              </p>
              <p className="mt-2 text-sm text-slate-300">{error}</p>
            </div>
          )}

          {!health && !error && (
            <p className="mt-4 text-sm text-slate-400">
              Checking backend connection...
            </p>
          )}
        </div>
      </section>
    </main>
  )
}

export default App