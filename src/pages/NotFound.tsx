import { ButtonLink } from '../components/Button'

export function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-site flex-col items-center justify-center px-5 py-20 text-center">
      <span className="text-[19px] font-extrabold uppercase tracking-[0.3em] text-neon-red text-glow-red">
        [ ERROR ]
      </span>
      <h1 className="mt-4 text-6xl font-extrabold tracking-tight text-neon-red text-glow-red sm:text-8xl">
        404
      </h1>
      <p className="mt-4 text-sm font-bold uppercase tracking-[0.2em] text-neon-lemon">
        PAGE NOT FOUND
      </p>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-text-secondary">
        The route you requested does not exist or has been moved.
      </p>
      <div className="mt-8">
        <ButtonLink to="/">BACK TO HOME</ButtonLink>
      </div>
    </div>
  )
}
