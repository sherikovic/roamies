import { useState } from 'react'
import { sendEmail } from 'util/api'

export const Contact = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState('')

  const submitEmail = async () => {
    const res = await sendEmail({ email, name, msg: message })
    if (res.ok) {
      setSuccess(res.getJson.message)
      setName('')
      setEmail('')
      setMessage('')
    } else {
      setSuccess('An error occured!')
    }
  }

  return (
    <div
      id="contact"
      className="flex flex-col items-center justify-center py-32 gap-5 lg:max-w-[600px] self-center max-w-full w-full p-7 lg:w-[600px]"
    >
      <p className="text-off-white lg:text-4xl text-center text-xl">Contact Us</p>
      <div className="flex items-center justify-center gap-5 lg:gap-7 w-full flex-col lg:flex-row">
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
      <button onClick={submitEmail} className="bg-[#214189] p-2 rounded-lg w-full">
        Send
      </button>
      {success !== '' && <p className="text-off-white text-center">{success}</p>}
    </div>
  )
}
