import decor from '../../assets/decor_3.svg'
import { Calendar } from '../../components/Calendar/Calendar'
import { useInView } from '../../hooks/useInView'
import { wedding } from '../../data/wedding'
import './Invitation.scss'

export function Invitation() {
  const { ref: copyRef, isInView: copyVisible } = useInView<HTMLDivElement>({
    threshold: 0.2,
  })
  const { ref: calendarRef, isInView: calendarVisible } =
    useInView<HTMLDivElement>({
      threshold: 0.25,
    })

  return (
    <section className="invitation">
      <div
        ref={copyRef}
        className={[
          'invitation__reveal',
          'invitation__copy',
          copyVisible ? 'invitation__reveal--visible' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <h2 className="invitation__heading">
          <span>Дорогие наши</span>
          <span>друзья и родные!</span>
        </h2>

        <p className="invitation__text">
          <span>Вы получили эту ссылку,</span>
          <span>а значит, мы спешим сообщить</span>
          <span>вам важную новость!</span>
        </p>

        <h2 className="invitation__heading">Мы женимся!</h2>

        <p className="invitation__text">
          <span>И мы очень хотим разделить</span>
          <span>с вами этот счастливый праздник.</span>
        </p>

        <p className="invitation__details">
          <span>Ждем вас на нашей свадьбе!</span>
          <span>Начало в {wedding.startTime}</span>
        </p>
      </div>

      <div
        ref={calendarRef}
        className={[
          'invitation__reveal',
          'invitation__calendar',
          calendarVisible ? 'invitation__reveal--visible' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <Calendar
          year={2026}
          monthIndex={8}
          monthLabel="Сентябрь"
          highlightDay={Number(wedding.dateDisplay.day)}
        />
      </div>

      <div className="invitation__decor">
        <img
          className="invitation__decor-img"
          src={decor}
          alt=""
          aria-hidden
        />
      </div>
    </section>
  )
}
