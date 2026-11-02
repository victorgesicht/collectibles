import { ArrowLeftIcon, ArrowRightIcon } from '../components/Icons'

export default function NotFoundPage() {
  return (
    <div className="container-page flex min-h-[60vh] items-center py-16">
      <div className="w-full max-w-2xl">
        <p className="eyebrow">404 · Page not found</p>
        <h1 className="display mt-4 text-5xl leading-[0.98] text-parchment sm:text-6xl">
          This page wandered{' '}
          <span className="text-brass">off the shelf.</span>
        </h1>
        <p className="mt-5 max-w-md text-base leading-7 text-muted">
          The page you asked for is not here. It may have moved, sold out or
          never existed in this demo store.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#/" className="btn-primary">
            <ArrowLeftIcon className="h-4 w-4" />
            Back to the shop
          </a>
          <a href="#/binder" className="btn-secondary">
            Check saved items
            <ArrowRightIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
