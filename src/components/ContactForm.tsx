import { type FormEvent, useState } from 'react'
import { Toaster, toast } from 'sonner'

export default function Form() {
  const [responseMessage, setResponseMessage] = useState('')

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(e.target as HTMLFormElement)
    const response = await fetch('/api/contact', {
      method: 'POST',
      body: formData
    })
    const data = await response.json()
    if (data.message) {
      setResponseMessage(data.message)
      toast.success(data.message)
    }
    form.reset()
  }

  return (
    <form
      onSubmit={submit}
      className='mx-auto flex max-w-[65ch] flex-col gap-4'
    >
      <label htmlFor='name' className='flex flex-col'>
        <input
          type='text'
          id='name'
          name='name'
          placeholder='Nombre'
          autoComplete='name'
          className='dark:bg-primary border dark:border-tertiary h-12 rounded-lg p-2 dark:hover:bg-secondary transition'
          required
        />
      </label>
      <label htmlFor='email' className='flex flex-col'>
        <input
          type='email'
          id='email'
          name='email'
          placeholder='Email'
          autoComplete='email'
          className='dark:bg-primary border dark:border-tertiary h-12 rounded-lg p-2 dark:hover:bg-secondary transition'
          required
        />
      </label>
      <label htmlFor='message' className='flex flex-col'>
        <textarea
          id='message'
          name='message'
          placeholder='Mensaje'
          autoComplete='off'
          className='dark:bg-primary border dark:border-tertiary h-48 resize-none rounded-lg p-2 dark:hover:bg-secondary transition'
          required
        />
      </label>
      <button className='flex w-full grow items-center justify-center rounded-lg border bg-[#f8f8f8] py-2 transition dark:border-tertiary dark:bg-secondary dark:hover:bg-hover'>
        Enviar
      </button>
      <Toaster />
    </form>
  )
}
