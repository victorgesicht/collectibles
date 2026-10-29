import { ArrowLeftIcon } from '../components/Icons'

export default function NotFoundPage() {
  return (
    <div className="container-page flex min-h-[60vh] items-center py-16">
      <div className="w-full max-w-2xl">
        <p className="eyebrow">404 / Not in the catalogue</p>
        <h1 className="display mt-4 text-5xl leading-[0.98] text-parchment sm:text-6xl">
          This record is{' '}
          <span className="italic text-brass-light">off the shelf.</span>
        </h1>
        <p className="mt-5 max-w-md font-sans text-sm leading-7 text-muted">
          The page you asked for is not in the index. It may have been traded,
          moved or never accessioned in the first place.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#/" className="btn-primary">
            <ArrowLeftIcon className="h-3.5 w-3.5" />
            Back to the index
          </a>
          <a href="#/binder" className="btn-secondary">
            Check your binder
          </a>
        </div>
      </div>
    </div>
  )
}
