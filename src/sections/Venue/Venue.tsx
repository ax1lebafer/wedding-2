import decor from '../../assets/decor_3.svg'
import { wedding } from '../../data/wedding'
import './Venue.scss'

const { lon, lat } = wedding.venue.coords

const mapSrc = `https://yandex.ru/map-widget/v1/?ll=${lon}%2C${lat}&z=16.5&pt=${lon}%2C${lat}%2Cpm2rdm&lang=ru_RU`

const mapHref = `https://yandex.ru/maps/?ll=${lon}%2C${lat}&z=17&pt=${lon}%2C${lat}%2Cpm2rdm`

export function Venue() {
  return (
    <section className="venue">
      <h2 className="venue__heading">{wedding.venue.title}</h2>

      <p className="venue__address">
        {wedding.venue.lines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </p>

      <div className="venue__map-wrap">
        <iframe
          className="venue__map"
          src={mapSrc}
          title="Карта места проведения"
          loading="lazy"
          allowFullScreen
        />
      </div>

      <a
        className="venue__route"
        href={mapHref}
        target="_blank"
        rel="noopener noreferrer"
      >
        Построить маршрут
      </a>

      <div className="venue__decor">
        <img
          className="venue__decor-img"
          src={decor}
          alt=""
          aria-hidden
        />
      </div>
    </section>
  )
}
