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
    <form onSubmit={submit} className='flex flex-col gap-4'>
      <label htmlFor='name' className='flex flex-col'>
        Name
        <input
          type='text'
          id='name'
          name='name'
          autoComplete='name'
          className='bg-primary border border-primary'
          required
        />
      </label>
      <label htmlFor='email' className='flex flex-col'>
        Email
        <input
          type='email'
          id='email'
          name='email'
          autoComplete='email'
          className='bg-primary border border-primary'
          required
        />
      </label>
      <label htmlFor='message' className='flex flex-col'>
        Message
        <textarea
          id='message'
          name='message'
          autoComplete='off'
          className='bg-primary border border-primary'
          required
        />
      </label>
      <button>Send</button>
      {responseMessage && <p>{responseMessage}</p>}
    </form>
  )
}
