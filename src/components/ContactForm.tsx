import { type FormEvent, useState } from 'react'
import { Toaster, toast } from 'sonner'

export default function Form() {
  const [responseMessage, setResponseMessage] = useState('')
  const [statusMessage, setStatusMessage] = useState(400)

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const response = await fetch('/api/contact', {
      method: 'POST',
      body: formData
    })
    const data = await response.json()
    setStatusMessage(response.status)
    if (data.message) {
      setResponseMessage(data.message)
    }
    form.reset() // Limpia el formulario
  }

  return (
    <form
      onSubmit={submit}
      className='mx-auto flex max-w-[65ch] flex-col gap-4'
    >
      <label
        htmlFor='name'
        className='flex flex-col'
      >
        <input
          type='text'
          id='name'
          name='name'
          placeholder='Nombre'
          autoComplete='name'
          className='h-12 rounded-lg border border-primary bg-primary p-2'
          required
        />
      </label>
      <label
        htmlFor='email'
        className='flex flex-col'
      >
        <input
          type='email'
          id='email'
          name='email'
          placeholder='Email'
          autoComplete='email'
          className='h-12 rounded-lg border border-primary bg-primary p-2'
          required
        />
      </label>
      <label
        htmlFor='message'
        className='flex flex-col'
      >
        <textarea
          id='message'
          name='message'
          autoComplete='off'
          placeholder='Mensaje'
          className='h-48 resize-none rounded-lg border border-primary bg-primary p-2'
          required
        />
      </label>
      <button className='h-12 w-full rounded-lg border border-primary transition hover:bg-hover'>
        Enviar
      </button>
      <Toaster />
      <div className='hidden'>
        {statusMessage === 200 ? toast.success(responseMessage) : toast.error(responseMessage)}
      </div>
    </form>
  )
}
