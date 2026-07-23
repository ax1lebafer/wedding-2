import decor from '../../assets/decor.svg'
import { wedding } from '../../data/wedding'
import { useCountdown } from '../../hooks/useCountdown'
import './Hero.scss'

export function Hero() {
  const { days, hours, minutes, seconds } = useCountdown(wedding.date);

  return (
    <section className="hero">
      <div className="hero__decor">
        <img className="hero__decor-img" src={decor} alt="" aria-hidden />
      </div>

      <div className="hero__content">
        <h1 className="hero__names">
          <span style={{ marginBottom: '15px' }}>{wedding.names.first}</span>
          <span>{wedding.names.second}</span>
        </h1>

        <div className="hero__date">
          <div className="hero__date-row">
            <span className="hero__date-side">{wedding.dateDisplay.month}</span>
            <span className="hero__date-day">{wedding.dateDisplay.day}</span>
            <span className="hero__date-side">{wedding.dateDisplay.year}</span>
          </div>
          <span className="hero__date-weekday">
            {wedding.dateDisplay.weekday}
          </span>
        </div>

        <div className="hero__timer">
          <p className="hero__timer-title">До свадьбы осталось</p>
          <div className="hero__timer-grid">
            <div className="hero__timer-item">
              <span className="hero__timer-value">{days}</span>
              <span className="hero__timer-label">дней</span>
            </div>
            <div className="hero__timer-item">
              <span className="hero__timer-value">{hours}</span>
              <span className="hero__timer-label">часов</span>
            </div>
            <div className="hero__timer-item">
              <span className="hero__timer-value">{minutes}</span>
              <span className="hero__timer-label">минут</span>
            </div>
            <div className="hero__timer-item">
              <span className="hero__timer-value">{seconds}</span>
              <span className="hero__timer-label">секунд</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
