import decorBottom from '../../assets/decor_2.svg'
import sborGostey from '../../assets/sbor_gostey.png'
import register from '../../assets/register.png'
import zal from '../../assets/zal.png'
import tort from '../../assets/tort.png'
import finalIcon from '../../assets/final.png'
import './Schedule.scss'

const events = [
  {
    id: 'sbor',
    side: 'left' as const,
    icon: sborGostey,
    title: 'Сбор гостей',
    detail: 'Банкетный зал «Счастье»\n(Саратов, Крайняя улица, 129/4)',
    time: '14:30',
  },
  {
    id: 'register',
    side: 'right' as const,
    icon: register,
    title: 'Выездная регистрация',
    time: '15:00',
  },
  {
    id: 'zal',
    side: 'left' as const,
    icon: zal,
    title: 'Банкетный зал',
    time: '16:00',
  },
  {
    id: 'tort',
    side: 'right' as const,
    icon: tort,
    title: 'Торт',
    time: '20:30',
  },
  {
    id: 'final',
    side: 'left' as const,
    icon: finalIcon,
    title: 'Финал',
    time: '23:00',
  },
]

export function Schedule() {
  return (
    <section className="schedule">
      <h2 className="schedule__heading">План мероприятия</h2>

      <ol className="schedule__timeline">
        {events.map((event) => (
          <li
            key={event.id}
            className={`schedule__item schedule__item--${event.side}`}
          >
            <span className="schedule__dot" aria-hidden />
            <div className="schedule__card">
              <img
                className="schedule__icon"
                src={event.icon}
                alt=""
                aria-hidden
              />
              <p className="schedule__title">{event.title}</p>
              {event.detail ? (
                <p className="schedule__detail">{event.detail}</p>
              ) : null}
              <p className="schedule__time">{event.time}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="schedule__decor">
        <img
          className="schedule__decor-img"
          src={decorBottom}
          alt=""
          aria-hidden
        />
      </div>
    </section>
  )
}
