import * as React from 'react'

interface EmailTemplateProps {
  email: string
  message: string
}

export default function EmailTemplate({ email, message }: EmailTemplateProps) {
  // Convert line breaks in message to HTML paragraphs
  const formattedMessage = message.split('\n').map((line, i) =>
    line ? (
      <p key={i} style={{ margin: '12px 0' }}>
        {line}
      </p>
    ) : (
      <br key={i} />
    ),
  )

  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        backgroundColor: '#121212',
        color: '#ffffff',
        padding: '20px',
        borderRadius: '10px',
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          marginBottom: '30px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          paddingBottom: '20px',
        }}
      >
        <h1
          style={{
            color: '#FFF94D',
            fontSize: '28px',
            fontWeight: 700,
            margin: 0,
          }}
        >
          New Contact Message
        </h1>
      </div>

      <div
        style={{
          marginBottom: '24px',
          padding: '20px',
          backgroundColor: 'rgba(255,255,255,0.05)',
          borderRadius: '8px',
          borderLeft: '4px solid #FFF94D',
        }}
      >
        <h2
          style={{
            fontSize: '18px',
            color: '#999',
            marginTop: 0,
            marginBottom: '8px',
            fontWeight: 500,
          }}
        >
          From:
        </h2>
        <p
          style={{
            fontSize: '18px',
            margin: 0,
            color: '#fff',
          }}
        >
          {email}
        </p>
      </div>

      <div
        style={{
          marginBottom: '30px',
          padding: '20px',
          backgroundColor: 'rgba(255,255,255,0.05)',
          borderRadius: '8px',
        }}
      >
        <h2
          style={{
            fontSize: '18px',
            color: '#999',
            marginTop: 0,
            marginBottom: '16px',
            fontWeight: 500,
          }}
        >
          Message:
        </h2>
        <div
          style={{
            fontSize: '16px',
            lineHeight: '1.6',
            color: '#eee',
          }}
        >
          {formattedMessage}
        </div>
      </div>

      <div
        style={{
          textAlign: 'center',
          fontSize: '14px',
          color: '#999',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '20px',
        }}
      >
        <p>This message was sent from the contact form on your website.</p>
        <p>Reply directly to this email to respond to {email}.</p>
        <p style={{ marginTop: '20px', fontSize: '13px', color: '#777' }}>
          © {new Date().getFullYear()} Charlie Fox
        </p>
      </div>
    </div>
  )
}
