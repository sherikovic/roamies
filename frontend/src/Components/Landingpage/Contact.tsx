import React from 'react'

export const Contact = () => {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [message, setMessage] = React.useState('')

  const sendEmail = () => {
    const link = `mailto:sherif.amer@gmail.com` + '&subject=' + '&body=' + message
    window.location.href = link
  }
  return (
    <div
      id="contact"
      className="flex flex-col items-center justify-centerbg-[#0f1012] py-32 gap-5 lg:max-w-[600px] self-center max-w-full w-full p-7 lg:w-[600px]"
    >
      <p className="text-off-white lg:text-4xl text-center text-xl">Contact Us</p>
      <div className="flex items-center justify-center gap-5 lg:gap-7 w-full flex-col lg:flex-row w-full">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name"
          autoComplete="name"
          className="p-3 rounded bg-[rgba(255,255,255,0.10)] border border-[rgba(255,255,255,0.10)] outline-none max-w-full w-full"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          autoComplete="email"
          className="p-3 rounded bg-[rgba(255,255,255,0.10)] border border-[rgba(255,255,255,0.10)] outline-none max-w-full w-full"
        />
      </div>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
        className="p-3 w-full rounded resize-none overflow-hidden bg-[rgba(255,255,255,0.10)] border border-[rgba(255,255,255,0.10)]"
      />
      <button
        onClick={() => {
          sendEmail()
          alert('Message sent!')
          setName('')
          setEmail('')
          setMessage('')
        }}
        className="bg-[#214189] p-2 rounded-lg w-full"
      >
        Send
      </button>
    </div>
  )
}
