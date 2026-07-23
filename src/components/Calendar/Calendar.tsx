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

  // JS: 0 = Sunday … 6 = Saturday → Monday-first index
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
}

export function Calendar({ year, monthIndex, monthLabel }: CalendarProps) {
  const days = buildMonthDays(year, monthIndex)

  return (
    <div className="calendar">
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
        {days.map((cell, index) => (
          <span
            key={`${cell.day}-${index}`}
            className={
              cell.outside
                ? 'calendar__day calendar__day--outside'
                : 'calendar__day'
            }
          >
            {cell.day}
          </span>
        ))}
      </div>
    </div>
  )
}
