'use client'

import { useEffect, useState } from 'react'

type AuthView = 'login' | 'signup'

export type LoginFormValues = {
  email: string
  password: string
}

export type SignupFormValues = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

type AuthModalProps = {
  isOpen: boolean
  initialView?: AuthView
  onClose: () => void
  onLoginSubmit?: (values: LoginFormValues) => Promise<void> | void
  onSignupSubmit?: (values: SignupFormValues) => Promise<void> | void
}

const LOGIN_INITIAL: LoginFormValues = {
  email: '',
  password: '',
}

const SIGNUP_INITIAL: SignupFormValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export default function AuthModal({
  isOpen,
  initialView = 'signup',
  onClose,
  onLoginSubmit,
  onSignupSubmit,
}: AuthModalProps): React.JSX.Element | null {
  const [view, setView] = useState<AuthView>(initialView)
  const [loginValues, setLoginValues] = useState<LoginFormValues>(LOGIN_INITIAL)
  const [signupValues, setSignupValues] = useState<SignupFormValues>(SIGNUP_INITIAL)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!isOpen) return

    setView(initialView)
    setErrorMessage(null)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [initialView, isOpen, onClose])

  if (!isOpen) {
    return null
  }

  const resetError = (): void => setErrorMessage(null)

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    resetError()

    if (!loginValues.email || !loginValues.password) {
      setErrorMessage('Please enter your email and password.')
      return
    }

    try {
      setIsSubmitting(true)
      await onLoginSubmit?.(loginValues)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to sign in.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSignupSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    resetError()

    if (!signupValues.name || !signupValues.email || !signupValues.password) {
      setErrorMessage('Please complete all required fields.')
      return
    }

    if (signupValues.password !== signupValues.confirmPassword) {
      setErrorMessage('Passwords do not match.')
      return
    }

    try {
      setIsSubmitting(true)
      await onSignupSubmit?.(signupValues)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to create account.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const panelTitle = view === 'signup' ? 'Create Account' : 'Welcome Back'
  const panelDescription =
    view === 'signup'
      ? 'Set up your account to save preferences and prepare for future checkout features.'
      : 'Sign in to continue to your account and manage your profile.'

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="auth-modal-title">
      <button
        type="button"
        className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label="Close authentication modal"
      />

      <div className="relative w-full max-w-[960px] overflow-hidden rounded-[2px] border border-black/10 bg-white text-black shadow-[0_30px_120px_rgba(0,0,0,0.18)]">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 h-9 w-9 border border-black/15 bg-white text-xs tracking-[0.2em] text-black/70 transition-colors hover:bg-black hover:text-white"
          aria-label="Close"
        >
          X
        </button>

        <div className="grid min-h-[560px] grid-cols-1 md:grid-cols-[0.95fr_1.05fr]">
          <section className="relative border-b border-black/8 bg-gradient-to-b from-[#fafafa] to-[#f1f1f1] p-6 md:border-b-0 md:border-r md:border-black/8 md:p-10">
            <div className="flex h-full flex-col justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-black/45">Account Access</p>
                <h2 id="auth-modal-title" className="mt-4 text-[28px] leading-[1.05] tracking-tight md:text-[36px]">
                  {panelTitle}
                </h2>
                <p className="mt-4 max-w-[34ch] text-[13px] leading-6 text-black/65">{panelDescription}</p>
              </div>

              <div className="mt-8 border border-black/10 bg-white p-4">
                <p className="text-[10px] uppercase tracking-[0.24em] text-black/45">Integration Ready</p>
                <p className="mt-3 text-[12px] leading-5 text-black/70">
                  Form submission is callback-based, so you can connect Supabase auth and profile storage without replacing this UI.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 pt-16 md:p-10 md:pt-20">
            <div className="mb-6 grid grid-cols-2 border border-black/10 bg-[#f3f3f3] p-[4px]">
              <button
                type="button"
                onClick={() => {
                  setView('login')
                  resetError()
                }}
                className={`h-10 text-[11px] uppercase tracking-[0.24em] transition-colors ${
                  view === 'login' ? 'bg-white text-black shadow-sm' : 'text-black/55 hover:text-black'
                }`}
              >
                Log In
              </button>
              <button
                type="button"
                onClick={() => {
                  setView('signup')
                  resetError()
                }}
                className={`h-10 text-[11px] uppercase tracking-[0.24em] transition-colors ${
                  view === 'signup' ? 'bg-white text-black shadow-sm' : 'text-black/55 hover:text-black'
                }`}
              >
                Join
              </button>
            </div>

            {errorMessage ? (
              <div className="mb-5 border border-black/10 bg-black/[0.03] px-4 py-3 text-[12px] text-black/80">
                {errorMessage}
              </div>
            ) : null}

            {view === 'login' ? (
              <form className="space-y-4" onSubmit={handleLoginSubmit}>
                <Field
                  label="Email"
                  type="email"
                  autoComplete="email"
                  value={loginValues.email}
                  onChange={(value) => setLoginValues((prev) => ({ ...prev, email: value }))}
                />
                <Field
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  value={loginValues.password}
                  onChange={(value) => setLoginValues((prev) => ({ ...prev, password: value }))}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 h-12 w-full border border-black bg-black text-[11px] uppercase tracking-[0.26em] text-white transition-colors hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? 'Processing...' : 'Log In'}
                </button>

                <p className="pt-2 text-center text-[12px] text-black/55">
                  New here?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setView('signup')
                      resetError()
                    }}
                    className="underline underline-offset-4 transition-opacity hover:opacity-75"
                  >
                    Create an account
                  </button>
                </p>
              </form>
            ) : (
              <form className="space-y-4" onSubmit={handleSignupSubmit}>
                <Field
                  label="Full Name"
                  autoComplete="name"
                  value={signupValues.name}
                  onChange={(value) => setSignupValues((prev) => ({ ...prev, name: value }))}
                />
                <Field
                  label="Email"
                  type="email"
                  autoComplete="email"
                  value={signupValues.email}
                  onChange={(value) => setSignupValues((prev) => ({ ...prev, email: value }))}
                />
                <Field
                  label="Password"
                  type="password"
                  autoComplete="new-password"
                  value={signupValues.password}
                  onChange={(value) => setSignupValues((prev) => ({ ...prev, password: value }))}
                />
                <Field
                  label="Confirm Password"
                  type="password"
                  autoComplete="new-password"
                  value={signupValues.confirmPassword}
                  onChange={(value) => setSignupValues((prev) => ({ ...prev, confirmPassword: value }))}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 h-12 w-full border border-black bg-black text-[11px] uppercase tracking-[0.26em] text-white transition-colors hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? 'Processing...' : 'Create Account'}
                </button>

                <p className="pt-2 text-center text-[12px] text-black/55">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setView('login')
                      resetError()
                    }}
                    className="underline underline-offset-4 transition-opacity hover:opacity-75"
                  >
                    Sign in
                  </button>
                </p>
              </form>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

type FieldProps = {
  label: string
  value: string
  onChange: (value: string) => void
  type?: React.HTMLInputTypeAttribute
  autoComplete?: string
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  autoComplete,
}: FieldProps): React.JSX.Element {
  const id = `auth-field-${label.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <label className="block">
      <span className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-black/55">{label}</span>
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full border border-black/12 bg-[#fcfcfc] px-4 text-[13px] text-black outline-none placeholder:text-black/25 transition-colors focus:border-black/35"
      />
    </label>
  )
}
