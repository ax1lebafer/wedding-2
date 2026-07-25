import decorBottom from '../../assets/decor_2.svg'
import { useInView } from '../../hooks/useInView'
import './DressCode.scss'

export function DressCode() {
  const { ref: headingRef, isInView: headingVisible } =
    useInView<HTMLHeadingElement>({ threshold: 0.4 })
  const { ref: textRef, isInView: textVisible } =
    useInView<HTMLParagraphElement>({ threshold: 0.25 })

  return (
    <section className="dress-code">
      <h2
        ref={headingRef}
        className={[
          'dress-code__heading',
          'dress-code__reveal',
          headingVisible ? 'dress-code__reveal--visible' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        Дресс-код
      </h2>

      <p
        ref={textRef}
        className={[
          'dress-code__text',
          'dress-code__reveal',
          textVisible ? 'dress-code__reveal--visible' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
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
