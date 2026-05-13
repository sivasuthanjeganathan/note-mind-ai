type StatusMessageProps = {
  type: 'success' | 'error'
  message: string
}

export function StatusMessage({ type, message }: StatusMessageProps) {
  const styles =
    type === 'success'
      ? 'border-emerald-800 bg-emerald-950/40 text-emerald-300'
      : 'border-red-800 bg-red-950/40 text-red-300'

  return (
    <div className={`mt-5 rounded-xl border p-4 text-sm ${styles}`}>
      {message}
    </div>
  )
}