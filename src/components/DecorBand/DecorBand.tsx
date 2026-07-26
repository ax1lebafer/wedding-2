import decor from '../../assets/decor.svg'
import './DecorBand.scss'

type DecorBandProps = {
  className?: string
}

export function DecorBand({ className }: DecorBandProps) {
  return (
    <div className={['decor-band', className].filter(Boolean).join(' ')}>
      <img className="decor-band__img" src={decor} alt="" aria-hidden />
    </div>
  )
}
