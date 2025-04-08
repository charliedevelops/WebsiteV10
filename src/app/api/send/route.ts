import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import EmailTemplate from '@/components/email-template'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { email, message } = await req.json()

    if (!email || !message) {
      return NextResponse.json({ error: 'Email and message are required' }, { status: 400 })
    }

    const { data, error } = await resend.emails.send({
      from: 'Website Contact <hi@charliefox.dev>', // This can't be changed until you verify a domain
      to: ['charlie.fox2030@gmail.com'],
      subject: `New Contact Form Message`,
      replyTo: email,
      react: EmailTemplate({ email, message }),
    })

    if (error) {
      console.error('Error sending email:', error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
