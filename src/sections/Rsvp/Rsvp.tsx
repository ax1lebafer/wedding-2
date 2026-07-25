import { useState } from 'react'
import type { FormEvent } from 'react'
import { useInView } from '../../hooks/useInView'
import './Rsvp.scss'

const ATTENDANCE_OPTIONS = [
  'Да, обязательно приду',
  'К сожалению, не смогу',
  'Затрудняюсь ответить, сообщу позже',
] as const

type Attendance = (typeof ATTENDANCE_OPTIONS)[number]
type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

function formatSubmittedAt(date: Date) {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`
}

export function Rsvp() {
  const [name, setName] = useState('')
  const [attendance, setAttendance] = useState<Attendance | ''>('')
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const { ref: headingRef, isInView: headingVisible } =
    useInView<HTMLHeadingElement>({ threshold: 0.4 })
  const { ref: cardRef, isInView: cardVisible } = useInView<HTMLFormElement>({
    threshold: 0.2,
  })
  const { ref: organizerRef, isInView: organizerVisible } =
    useInView<HTMLDivElement>({ threshold: 0.2 })

  const canSubmit =
    name.trim().length > 0 && attendance !== '' && status !== 'loading'

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!canSubmit || !attendance) return

    const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL as string | undefined
    if (!scriptUrl) {
      setStatus('error')
      setErrorMessage('Форма ещё не настроена. Добавьте VITE_GOOGLE_SCRIPT_URL.')
      return
    }

    setStatus('loading')
    setErrorMessage('')

    const payload = {
      name: name.trim(),
      attendance,
      submittedAt: formatSubmittedAt(new Date()),
    }

    try {
      // text/plain избегает CORS preflight к Apps Script
      const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const result = (await response.json()) as { result?: string }
      if (result.result !== 'success') {
        throw new Error('Unexpected response')
      }

      setStatus('success')
      setName('')
      setAttendance('')
    } catch {
      setStatus('error')
      setErrorMessage('Не удалось отправить ответ. Попробуйте ещё раз.')
    }
  }

  return (
    <section className="rsvp">
      <h2
        ref={headingRef}
        className={[
          'rsvp__heading',
          'rsvp__reveal',
          headingVisible ? 'rsvp__reveal--visible' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        Анкета гостя
      </h2>

      <form
        ref={cardRef}
        className={[
          'rsvp__card',
          'rsvp__reveal',
          cardVisible ? 'rsvp__reveal--visible' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        onSubmit={handleSubmit}
      >
        <p className="rsvp__lead">Пожалуйста, подтвердите свое присутствие</p>

        <label className="rsvp__field">
          <span className="rsvp__sr-only">Ваше Имя и Фамилия</span>
          <input
            className="rsvp__input"
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Ваше Имя и Фамилия"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              if (status === 'success' || status === 'error') setStatus('idle')
            }}
            disabled={status === 'loading'}
            required
          />
        </label>

        <fieldset className="rsvp__fieldset">
          <legend className="rsvp__question">
            Вы сможете присутствовать на торжестве?
          </legend>

          <div className="rsvp__options">
            {ATTENDANCE_OPTIONS.map((option) => (
              <label key={option} className="rsvp__option">
                <input
                  className="rsvp__radio"
                  type="radio"
                  name="attendance"
                  value={option}
                  checked={attendance === option}
                  onChange={() => {
                    setAttendance(option)
                    if (status === 'success' || status === 'error') {
                      setStatus('idle')
                    }
                  }}
                  disabled={status === 'loading'}
                  required
                />
                <span className="rsvp__option-text">{option}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <button
          className="rsvp__submit"
          type="submit"
          disabled={!canSubmit}
        >
          {status === 'loading' ? 'Отправка…' : 'Ответить'}
        </button>

        {status === 'success' ? (
          <p className="rsvp__message rsvp__message--success" role="status">
            Спасибо! Ваш ответ записан
          </p>
        ) : null}

        {status === 'error' ? (
          <p className="rsvp__message rsvp__message--error" role="alert">
            {errorMessage}
          </p>
        ) : null}
      </form>

      <div
        ref={organizerRef}
        className={[
          'rsvp__organizer',
          'rsvp__reveal',
          organizerVisible ? 'rsvp__reveal--visible' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="rsvp__organizer-text">
          <p>По всем вопросам обращаться к организатору.</p>
          <p>
            Если в последние дни ваши планы не позволяют вам присутствовать на
            торжестве, просьба сообщить нашему организатору.
          </p>
          <p>
            А также если у вас есть сюрприз или творческий номер для молодоженов
            также сообщите организатору.
          </p>
        </div>

        <a className="rsvp__organizer-btn" href="tel:+79376367249">
          Анна +7 (937) 636-72-49
        </a>

        <p className="rsvp__deadline">
          Просьба до 1 сентября подтвердить присутствие
        </p>
      </div>
    </section>
  )
}
