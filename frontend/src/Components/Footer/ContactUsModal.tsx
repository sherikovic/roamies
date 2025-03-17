import { sendEmail } from 'util/api'
import { useEffect, useState } from 'react'
import { colors } from 'constants/colors'
import {
  Header,
  CloseButton,
  HeaderSection,
  HeaderPrimary,
  HeaderSecondary,
  ScrollContent,
} from './styles'
import { motion } from 'motion/react'
import { getIsMobile } from 'util/util'

const ContactUsModal = ({ closeModal }: { closeModal: () => void }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState('')
  const [isMobile, setIsMobile] = useState(getIsMobile())

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(getIsMobile())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
    form: '',
  })

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      message: '',
      form: '',
    }

    let isValid = true

    // Name validation
    if (!name.trim()) {
      newErrors.name = 'Name is required'
      isValid = false
    } else if (name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
      isValid = false
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
      newErrors.email = 'Email is required'
      isValid = false
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email format'
      isValid = false
    }

    // Message validation
    if (!message.trim()) {
      newErrors.message = 'Message is required'
      isValid = false
    } else if (message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const submitEmail = async () => {
    if (!validateForm()) return
    try {
      const res = await sendEmail({ email, name, msg: message })
      // if (res.ok) {
      setSuccess(res.getJson.message)
      setName('')
      setEmail('')
      setMessage('')
      setErrors({ ...errors, form: '' })
      // }
    } catch {
      setErrors({ ...errors, form: 'Failed to send message. Please try again.' })
    }
  }

  useEffect(() => {
    const textarea = document.querySelector('textarea')
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }, [message])

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(''), 5000)
      return () => clearTimeout(timer)
    }
  }, [success])

  return (
    <>
      <Header isMobile={isMobile}>
        <CloseButton onClick={closeModal}>
          <motion.svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke={colors.onSurfaceVariant}
            whileHover={{ stroke: colors.background }}
            transition={{ duration: 0.15, ease: 'easeInOut' }}
          >
            <path strokeWidth="2" d="M18 6L6 18M6 6l12 12" />
          </motion.svg>
        </CloseButton>
        <HeaderSection>
          <HeaderPrimary>Contact Us</HeaderPrimary>
          <HeaderSecondary>We&apos;ll get back to you within 24 hours</HeaderSecondary>
        </HeaderSection>
      </Header>

      <ScrollContent
        isMobile={isMobile}
        data-lenis-prevent="true"
        className="py-16 gap-8 max-w-4xl w-full px-4 mx-auto"
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="block text-sm poppins-medium transition-all text-textSecondary">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value.trimStart())
                setErrors((prev) => ({ ...prev, name: '' }))
              }}
              type="text"
              autoComplete="name"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.name ? 'border-error' : 'border-surfaceVariant'
              } focus:border-primary focus:ring-2 focus:ring-primary/40 hover:border-primary transition-all outline-none poppins-regular text-textSecondary lg:text-base text-sm`}
            />
            {errors.name && (
              <p className="poppins-light text-error text-xs flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {errors.name}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-sm poppins-medium text-textSecondary">Email</label>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value.trimStart())
                setErrors((prev) => ({ ...prev, email: '' }))
              }}
              type="email"
              autoComplete="email"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.email ? 'border-error' : 'border-surfaceVariant'
              } focus:border-primary focus:ring-2 focus:ring-primary/40 hover:border-primary transition-all outline-none poppins-regular text-textSecondary lg:text-base text-sm`}
            />
            {errors.email && (
              <p className="poppins-light text-error text-xs flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className="w-full space-y-1">
          <label className="block text-sm poppins-medium text-textSecondary">Message</label>
          <textarea
            value={message}
            onChange={(e) => {
              setMessage(e.target.value.trimStart())
              setErrors((prev) => ({ ...prev, message: '' }))
            }}
            rows={4}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.message ? 'border-error' : 'border-surfaceVariant'
            } focus:border-primary focus:ring-2 focus:ring-primary/40 hover:border-primary transition-all outline-none resize-none poppins-regular text-textSecondary lg:text-base text-sm overflow-y-auto`}
          />
          {errors.message && (
            <p className="poppins-light text-error text-xs flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {errors.message}
            </p>
          )}
        </div>

        {errors.form && (
          <div className="w-full p-3 bg-surface rounded-lg border border-error flex items-center gap-2">
            <svg
              className="w-5 h-5 text-error"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="poppins-regular text-error lg:text-sm text-xs">{errors.form}</span>
          </div>
        )}

        <button
          onClick={submitEmail}
          className="w-full bg-primary text-white py-3 px-6 rounded-lg poppins-medium hover:bg-[#002147] transition-colors shadow-sm hover:shadow-md"
        >
          Send Message
        </button>

        {success && (
          <div className="mt-4 p-3 w-full bg-surface rounded-lg border border-surfaceVariant flex items-center gap-2">
            <svg
              className="w-5 h-5 text-textPrimary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="poppins-regular text-textPrimary text-sm">{success}</span>
          </div>
        )}
      </ScrollContent>
    </>
  )
}

export default ContactUsModal
