import decorBottom from '../../assets/decor_2.svg'
import './DressCode.scss'

export function DressCode() {
  return (
    <section className="dress-code">
      <h2 className="dress-code__heading">Дресс-код</h2>

      <p className="dress-code__text">
        Самое главное для нас – это ваше присутствие и радость в этот
        особенный день! Мы хотим, чтобы вы чувствовали себя максимально
        комфортно и непринужденно. Поэтому будем счастливы видеть вас в
        любой одежде, в которой вам будет удобно танцевать и веселиться
        вместе с нами! Дресс-код не предусмотрен, главное – хорошее
        настроение!
      </p>

      <div className="dress-code__decor">
        <img
          className="dress-code__decor-img"
          src={decorBottom}
          alt=""
          aria-hidden
        />
      </div>
    </section>
  )
}
