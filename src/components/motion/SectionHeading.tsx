import Reveal from './Reveal'

type Props = {
  eyebrow: string
  title: React.ReactNode
  intro?: React.ReactNode
  align?: 'left' | 'center'
  theme?: 'dark' | 'light'
  className?: string
  /** index/counter shown faintly to the right, e.g. "01 / 06" */
  counter?: string
}

/**
 * Consistent section heading: monospace eyebrow, Clash Display title, lead intro.
 */
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  theme = 'dark',
  className = '',
  counter,
}: Props) {
  const isCenter = align === 'center'
  const titleColor = theme === 'dark' ? 'text-white' : 'text-ink-900'
  const introColor = theme === 'dark' ? 'text-white/60' : 'text-ink-900/60'
  const eyebrowClass = theme === 'dark' ? 'eyebrow-red' : 'eyebrow-on-light'

  return (
    <Reveal
      stagger=".sh-item"
      className={`flex flex-col ${isCenter ? 'items-center text-center mx-auto max-w-3xl' : 'items-start'} ${className}`}
    >
      <div className={`sh-item flex w-full items-center gap-4 ${isCenter ? 'justify-center' : 'justify-between'}`}>
        <span className={eyebrowClass}>{eyebrow}</span>
        {counter && !isCenter && (
          <span className="font-mono text-[11px] tracking-[0.2em] text-white/25">{counter}</span>
        )}
      </div>
      <h2 className={`sh-item display-2 ${titleColor} mt-5 max-w-4xl text-balance`}>{title}</h2>
      {intro && (
        <p className={`sh-item lead ${introColor} mt-6 max-w-2xl`}>{intro}</p>
      )}
    </Reveal>
  )
}
