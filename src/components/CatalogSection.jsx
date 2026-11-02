import { useDeferredValue, useMemo, useState } from 'react'
import { CATALOG, CATEGORIES, getCategory } from '../data/catalog'
import ItemCard from './ItemCard'
import { CloseIcon, SearchIcon, SparklesIcon } from './Icons'

const SORT_OPTIONS = [
  { value: 'curated', label: 'Featured first' },
  { value: 'newest', label: 'Newest first' },
  { value: 'value-high', label: 'Price: high to low' },
  { value: 'value-low', label: 'Price: low to high' },
  { value: 'title', label: 'Name: A to Z' },
]

const CATEGORY_COUNTS = CATEGORIES.reduce((counts, category) => {
  counts[category.id] = CATALOG.filter(
    (item) => item.category === category.id,
  ).length
  return counts
}, {})

function sortItems(items, sort) {
  const sorted = [...items]

  if (sort === 'newest') {
    sorted.sort((left, right) => new Date(right.added) - new Date(left.added))
  }

  if (sort === 'value-high') {
    sorted.sort((left, right) => right.value - left.value)
  }

  if (sort === 'value-low') {
    sorted.sort((left, right) => left.value - right.value)
  }

  if (sort === 'title') {
    sorted.sort((left, right) => left.title.localeCompare(right.title))
  }

  return sorted
}

export default function CatalogSection() {
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('curated')
  const deferredQuery = useDeferredValue(query)

  const filteredItems = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase()

    const matching = CATALOG.filter((item) => {
      const matchesCategory =
        category === 'all' || item.category === category

      if (!matchesCategory) return false
      if (!normalizedQuery) return true

      const categoryLabel = getCategory(item.category)?.label ?? ''
      const searchText = [
        item.title,
        item.issue,
        item.subtitle,
        item.maker,
        item.condition,
        item.gradeNote,
        item.ref,
        categoryLabel,
        ...item.tags,
      ]
        .join(' ')
        .toLowerCase()

      return searchText.includes(normalizedQuery)
    })

    return sortItems(matching, sort)
  }, [category, deferredQuery, sort])

  const hasActiveFilters =
    category !== 'all' || query.trim() !== '' || sort !== 'curated'

  const resetFilters = () => {
    setCategory('all')
    setQuery('')
    setSort('curated')
  }

  return (
    <section id="index" className="container-page scroll-mt-32 py-16 lg:py-24">
      <div className="flex flex-col gap-8 border-b border-ink/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow">
            <SparklesIcon className="h-4 w-4" />
            Demo drop 01
          </p>
          <h2 className="display mt-3 max-w-xl text-4xl leading-[1.05] text-parchment sm:text-5xl">
            Find your next upgrade.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted">
            A small, honest demo catalogue. Every price is illustrative, every
            product is labelled, and nothing gets charged.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-bold text-muted">
          <span>
            <span className="text-parchment">{CATALOG.length}</span> products
          </span>
          <span className="h-4 w-px bg-ink/15" aria-hidden="true" />
          <span>
            <span className="text-parchment">{CATEGORIES.length}</span>{' '}
            departments
          </span>
          <span className="h-4 w-px bg-ink/15" aria-hidden="true" />
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-sage" />
            Quiet checkout on
          </span>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div
            className="-mx-1 flex max-w-full flex-wrap gap-2"
            role="group"
            aria-label="Filter by department"
          >
            <button
              type="button"
              onClick={() => setCategory('all')}
              aria-pressed={category === 'all'}
              className={`rounded-full border-2 px-4 py-2 text-sm font-bold transition-colors ${
                category === 'all'
                  ? 'border-brass bg-brass text-white'
                  : 'border-ink/10 bg-ink-900 text-muted hover:border-brass/40 hover:text-parchment'
              }`}
            >
              All
              <span
                className={`ml-2 text-xs ${category === 'all' ? 'text-white/75' : 'text-muted'}`}
              >
                {CATALOG.length}
              </span>
            </button>

            {CATEGORIES.map((entry) => (
              <button
                key={entry.id}
                type="button"
                onClick={() => setCategory(entry.id)}
                aria-pressed={category === entry.id}
                className={`rounded-full border-2 px-4 py-2 text-sm font-bold transition-colors ${
                  category === entry.id
                    ? 'border-brass bg-brass text-white'
                    : 'border-ink/10 bg-ink-900 text-muted hover:border-brass/40 hover:text-parchment'
                }`}
              >
                {entry.label}
                <span
                  className={`ml-2 text-xs ${category === entry.id ? 'text-white/75' : 'text-muted'}`}
                >
                  {CATEGORY_COUNTS[entry.id]}
                </span>
              </button>
            ))}
          </div>

          <div className="flex w-full items-center gap-3 sm:w-auto">
            <label htmlFor="catalog-search" className="sr-only">
              Search the catalogue
            </label>
            <div className="relative flex-1 sm:w-72 sm:flex-none">
              <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                id="catalog-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search chairs, GPUs, Macs…"
                className="field !py-2.5 pl-10 pr-10 text-sm"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-muted transition-colors hover:bg-ink-800 hover:text-parchment"
                  aria-label="Clear search"
                >
                  <CloseIcon className="h-4 w-4" />
                </button>
              )}
            </div>

            <label htmlFor="catalog-sort" className="sr-only">
              Sort the catalogue
            </label>
            <select
              id="catalog-sort"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="field w-full !py-2.5 text-sm sm:w-auto"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-4 border-t border-ink/10 pt-4 text-sm text-muted">
          <p aria-live="polite">
            Showing{' '}
            <span className="font-bold text-parchment">
              {filteredItems.length}
            </span>{' '}
            of {CATALOG.length} demo products
          </p>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="font-bold text-brass transition-colors hover:text-brass-dark"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {filteredItems.length > 0 ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="mt-8 flex flex-col items-center rounded-3xl border border-dashed border-brass/30 bg-ink-900/60 px-6 py-20 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-brass/10 text-brass">
            <SearchIcon className="h-6 w-6" />
          </span>
          <h3 className="display mt-5 text-3xl text-parchment">
            Nothing matches that yet.
          </h3>
          <p className="mt-2 max-w-sm text-base leading-7 text-muted">
            Try a different department or a shorter search. The demo shelf is
            small and friendly.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="btn-secondary mt-6"
          >
            Clear the filters
          </button>
        </div>
      )}
    </section>
  )
}
