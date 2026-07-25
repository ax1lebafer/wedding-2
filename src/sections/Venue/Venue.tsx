import decor from '../../assets/decor_3.svg'
import { useInView } from '../../hooks/useInView'
import { wedding } from '../../data/wedding'
import './Venue.scss'

const { lon, lat } = wedding.venue.coords

const mapSrc = `https://yandex.ru/map-widget/v1/?ll=${lon}%2C${lat}&z=16.5&pt=${lon}%2C${lat}%2Cpm2rdm&lang=ru_RU`

const mapHref = `https://yandex.ru/maps/?rtext=~${lat}%2C${lon}&rtt=auto`

export function Venue() {
  const { ref: headingRef, isInView: headingVisible } =
    useInView<HTMLHeadingElement>({ threshold: 0.4 })
  const { ref: addressRef, isInView: addressVisible } =
    useInView<HTMLParagraphElement>({ threshold: 0.4 })
  const { ref: mapRef, isInView: mapVisible } = useInView<HTMLDivElement>({
    threshold: 0.2,
  })

  return (
    <section className="venue">
      <h2
        ref={headingRef}
        className={[
          'venue__heading',
          'venue__reveal',
          headingVisible ? 'venue__reveal--visible' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {wedding.venue.title}
      </h2>

      <p
        ref={addressRef}
        className={[
          'venue__address',
          'venue__reveal',
          addressVisible ? 'venue__reveal--visible' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {wedding.venue.lines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </p>

      <div
        ref={mapRef}
        className={[
          'venue__map-wrap',
          'venue__reveal',
          mapVisible ? 'venue__reveal--visible' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
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
