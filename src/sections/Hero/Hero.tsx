import decor from '../../assets/decor.svg'
import { wedding } from '../../data/wedding'
import { useCountdown } from '../../hooks/useCountdown'
import './Hero.scss'

const pad = (value: number) => String(value).padStart(2, '0')

export function Hero() {
  const { days, hours, minutes, seconds } = useCountdown(wedding.date)

  return (
    <section className="hero">
      <div className="hero__decor">
        <img className="hero__decor-img" src={decor} alt="" aria-hidden />
      </div>

      <div className="hero__content">
        <h1 className="hero__names">
          <span>{wedding.names.first}</span>
          <span>{wedding.names.second}</span>
        </h1>
        <p className="hero__date">{wedding.dateLabel}</p>

        <div className="hero__timer" aria-label="До свадьбы осталось">
          <div className="hero__timer-item">
            <span className="hero__timer-value">{pad(days)}</span>
            <span className="hero__timer-label">дней</span>
          </div>
          <div className="hero__timer-item">
            <span className="hero__timer-value">{pad(hours)}</span>
            <span className="hero__timer-label">часов</span>
          </div>
          <div className="hero__timer-item">
            <span className="hero__timer-value">{pad(minutes)}</span>
            <span className="hero__timer-label">минут</span>
          </div>
          <div className="hero__timer-item">
            <span className="hero__timer-value">{pad(seconds)}</span>
            <span className="hero__timer-label">секунд</span>
          </div>
        </div>
      </div>
    </section>
  )
}
