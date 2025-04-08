import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | Charlie Fox',
  description: 'Get in touch with Charlie Fox for design, development, and creative solutions.',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
