import { useEffect, useRef, useState } from 'react'
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
  const [animateHeart, setAnimateHeart] = useState(false)

  useEffect(() => {
    const root = rootRef.current
    if (!root || highlightDay == null) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        setAnimateHeart(true)
        observer.disconnect()
      },
      { threshold: 0.45 },
    )

    observer.observe(root)
    return () => observer.disconnect()
  }, [highlightDay])

  return (
    <div
      ref={rootRef}
      className={
        animateHeart ? 'calendar calendar--heart-animate' : 'calendar'
      }
    >
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
              className={[
                'calendar__day',
                cell.outside ? 'calendar__day--outside' : '',
                isHighlight ? 'calendar__day--highlight' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {cell.day}
              {isHighlight ? (
                <img
                  className="calendar__heart"
                  src={heart}
                  alt=""
                  aria-hidden
                />
              ) : null}
            </span>
          )
        })}
      </div>
    </div>
  )
}
