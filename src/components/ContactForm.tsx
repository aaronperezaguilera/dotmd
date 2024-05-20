import { type FormEvent, useState } from 'react'

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
          className='bg-primary border border-primary h-12 rounded-lg p-2 dark:hover:bg-secondary transition'
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
          className='bg-primary border border-primary h-12 rounded-lg p-2 dark:hover:bg-secondary transition'
          required
        />
      </label>
      <label htmlFor='message' className='flex flex-col'>
        <textarea
          id='message'
          name='message'
          placeholder='Mensaje'
          autoComplete='off'
          className='bg-primary border border-primary h-48 resize-none rounded-lg p-2 dark:hover:bg-secondary transition'
          required
        />
      </label>
      <button className='flex w-full grow items-center justify-center rounded-lg border bg-[#f8f8f8] py-2 transition dark:border-primary dark:bg-secondary dark:hover:bg-hover'>
        Send
      </button>
      {responseMessage && <p>{responseMessage}</p>}
    </form>
  )
}
