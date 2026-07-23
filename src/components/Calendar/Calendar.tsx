import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import heart from '../../assets/heart.png'
import './Calendar.scss'

const WEEKDAYS = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'] as const

type CalendarDay = {
  day: number
  outside: boolean
}

function buildMonthDays(year: number, monthIndex: number): CalendarDay[] {
  const firstDay = new Date(year, monthIndex, 1)
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()
  const daysInPrevMonth = new Date(year, monthIndex, 0).getDate()

  const startOffset = (firstDay.getDay() + 6) % 7

  const cells: CalendarDay[] = []

  for (let i = startOffset - 1; i >= 0; i -= 1) {
    cells.push({ day: daysInPrevMonth - i, outside: true })
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({ day, outside: false })
  }

  const trailing = (7 - (cells.length % 7)) % 7
  for (let day = 1; day <= trailing; day += 1) {
    cells.push({ day, outside: true })
  }

  return cells
}

type StampTarget = {
  x: number
  y: number
  size: number
}

type CalendarProps = {
  year: number
  monthIndex: number
  monthLabel: string
  highlightDay?: number
}

export function Calendar({
  year,
  monthIndex,
  monthLabel,
  highlightDay,
}: CalendarProps) {
  const days = buildMonthDays(year, monthIndex)
  const rootRef = useRef<HTMLDivElement>(null)
  const highlightRef = useRef<HTMLSpanElement>(null)
  const [stamp, setStamp] = useState<StampTarget | null>(null)
  const [heartLanded, setHeartLanded] = useState(false)

  useEffect(() => {
    const root = rootRef.current
    if (!root || highlightDay == null) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return

        const cell = highlightRef.current
        if (!cell) return

        const rect = cell.getBoundingClientRect()
        const size = window.matchMedia('(min-width: 768px)').matches ? 48 : 42
        const reducedMotion = window.matchMedia(
          '(prefers-reduced-motion: reduce)',
        ).matches

        if (reducedMotion) {
          setHeartLanded(true)
        } else {
          setStamp({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
            size,
          })
        }
        observer.disconnect()
      },
      { threshold: 0.45 },
    )

    observer.observe(root)
    return () => observer.disconnect()
  }, [highlightDay])

  return (
    <div ref={rootRef} className="calendar">
      <div className="calendar__header">
        <span className="calendar__month">{monthLabel}</span>
        <span className="calendar__year">{year}</span>
      </div>

      <div className="calendar__weekdays">
        {WEEKDAYS.map((weekday) => (
          <span key={weekday} className="calendar__weekday">
            {weekday}
          </span>
        ))}
      </div>

      <div className="calendar__grid">
        {days.map((cell, index) => {
          const isHighlight = !cell.outside && cell.day === highlightDay

          return (
            <span
              key={`${cell.day}-${index}`}
              ref={isHighlight ? highlightRef : undefined}
              className={[
                'calendar__day',
                cell.outside ? 'calendar__day--outside' : '',
                isHighlight ? 'calendar__day--highlight' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {cell.day}
              {isHighlight && heartLanded ? (
                <img
                  className="calendar__heart calendar__heart--settled"
                  src={heart}
                  alt=""
                  aria-hidden
                />
              ) : null}
            </span>
          )
        })}
      </div>

      {stamp && !heartLanded
        ? createPortal(
            <img
              className="calendar-heart-stamp"
              src={heart}
              alt=""
              aria-hidden
              style={{
                left: stamp.x,
                top: stamp.y,
                width: stamp.size,
              }}
              onAnimationEnd={() => setHeartLanded(true)}
            />,
            document.body,
          )
        : null}
    </div>
  )
}
