export const prerender = false

import type { APIRoute } from 'astro'
import sendGrid from '@sendgrid/mail'
sendGrid.setApiKey(import.meta.env.SENDGRID_API_KEY)

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData()
  const name = data.get('name')?.toString() ?? ''
  const email = data.get('email')?.toString() ?? ''
  const message = data.get('message')?.toString() ?? ''
  // Validate the data - you'll probably want to do more than this
  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({
        message: 'Missing required fields'
      }),
      { status: 400 }
    )
  }
  // Do something with the data, then return a success response

  try {
    // TODO: Do not forget to do validation and error handling over received data from your contact form.

    // Sending email
    const msg = {
      to: 'aaron@dotmd.io', // Change to your recipient
      from: 'aaron@dotmd.io', // Change to your verified sender
      replyTo: { email: email, name: name },
      subject: `Contact form submission from ${name}`,
      text: message
    }

    const notification = {
      to: email, // Change to your recipient
      from: 'aaron@dotmd.io', // Change to your verified sender
      replyTo: { email: email, name: name },
      subject: `Contact form submission from ${name}`,
      text: 'Tu mensaje ha sido recibido. Gracias por contactarme.'
    }

    await sendGrid
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        return new Response(
          JSON.stringify({
            message: error
          }),
          { status: 400 }
        )
      })

    await sendGrid
      .send(notification)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        return new Response(
          JSON.stringify({
            message: error
          }),
          { status: 400 }
        )
      })
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: error
      }),
      { status: 400 }
    )
  }

  return new Response(
    JSON.stringify({
      message: 'Tu mensaje ha sido enviado.'
    }),
    { status: 200 }
  )
}
