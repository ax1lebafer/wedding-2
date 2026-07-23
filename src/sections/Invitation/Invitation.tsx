import { wedding } from '../../data/wedding'
import './Invitation.scss'

export function Invitation() {
  return (
    <section className="invitation">
      <h2 className="invitation__heading">
        <span>Дорогие наши</span>
        <span>друзья и родные!</span>
      </h2>

      <p className="invitation__text">
        <span>Вы получили эту ссылку,</span>
        <span>а значит, мы спешим сообщить</span>
        <span>вам важную новость!</span>
      </p>

      <h2 className="invitation__heading">
        Мы женимся!
      </h2>

      <p className="invitation__text">
        <span>И мы очень хотим разделить</span>
        <span>с вами этот счастливый праздник.</span>
      </p>

      <p className="invitation__details">
        <span>Ждем вас на нашей свадьбе!</span>
        <span>Начало в {wedding.startTime}</span>
      </p>
    </section>
  )
}
