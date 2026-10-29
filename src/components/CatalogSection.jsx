import { useDeferredValue, useMemo, useState } from 'react'
import { CATALOG, CATEGORIES, getCategory } from '../data/catalog'
import ItemCard from './ItemCard'
import { CloseIcon, SearchIcon } from './Icons'

const SORT_OPTIONS = [
  { value: 'curated', label: "Curator's order" },
  { value: 'newest', label: 'Recently accessioned' },
  { value: 'value-high', label: 'Value: high to low' },
  { value: 'value-low', label: 'Value: low to high' },
  { value: 'title', label: 'Title: A to Z' },
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
    <section id="index" className="container-page scroll-mt-24 py-16 lg:py-24">
      <div className="flex flex-col gap-8 border-b border-parchment/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow">The index / Vol. 01</p>
          <h2 className="display mt-4 max-w-xl text-4xl leading-[1.05] text-parchment sm:text-5xl">
            On the shelf.
          </h2>
          <p className="mt-4 max-w-lg font-sans text-sm leading-7 text-muted">
            Every piece is catalogued, graded and open to conversation. Filter
            the stacks, then open a record to see the full condition notes.
          </p>
        </div>

        <div className="flex items-center gap-6 font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
          <span>
            <span className="text-parchment">
              {String(CATALOG.length).padStart(2, '0')}
            </span>{' '}
            pieces
          </span>
          <span className="h-4 w-px bg-parchment/15" aria-hidden="true" />
          <span>
            <span className="text-parchment">04</span> departments
          </span>
          <span className="h-4 w-px bg-parchment/15" aria-hidden="true" />
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-sage" />
            Open
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
              className={`border px-3.5 py-2 font-mono text-[9px] uppercase tracking-[0.16em] transition-colors ${
                category === 'all'
                  ? 'border-brass bg-brass text-ink-950'
                  : 'border-parchment/15 text-muted hover:border-brass/50 hover:text-parchment'
              }`}
            >
              All
              <span className="ml-2">
                {String(CATALOG.length).padStart(2, '0')}
              </span>
            </button>

            {CATEGORIES.map((entry) => (
              <button
                key={entry.id}
                type="button"
                onClick={() => setCategory(entry.id)}
                aria-pressed={category === entry.id}
                className={`border px-3.5 py-2 font-mono text-[9px] uppercase tracking-[0.16em] transition-colors ${
                  category === entry.id
                    ? 'border-brass bg-brass text-ink-950'
                    : 'border-parchment/15 text-muted hover:border-brass/50 hover:text-parchment'
                }`}
              >
                {entry.label}
                <span className="ml-2">
                  {String(CATEGORY_COUNTS[entry.id]).padStart(2, '0')}
                </span>
              </button>
            ))}
          </div>

          <div className="flex w-full items-center gap-3 sm:w-auto">
            <label htmlFor="catalog-search" className="sr-only">
              Search the catalog
            </label>
            <div className="relative flex-1 sm:w-64 sm:flex-none">
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
              <input
                id="catalog-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search titles, makers, tags"
                className="field !py-2.5 pl-9 pr-9 font-mono text-[10px] uppercase tracking-[0.08em]"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center text-muted transition-colors hover:text-parchment"
                  aria-label="Clear search"
                >
                  <CloseIcon className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <label htmlFor="catalog-sort" className="sr-only">
              Sort the catalog
            </label>
            <select
              id="catalog-sort"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="field w-full !py-2.5 font-mono text-[10px] uppercase tracking-[0.06em] sm:w-auto"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-parchment/[0.07] pt-4">
          <p
            className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted"
            aria-live="polite"
          >
            Showing{' '}
            <span className="text-parchment">{filteredItems.length}</span> of{' '}
            {CATALOG.length} records
          </p>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="font-mono text-[9px] uppercase tracking-[0.16em] text-brass transition-colors hover:text-brass-light"
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
        <div className="mt-8 flex flex-col items-center border border-dashed border-parchment/15 px-6 py-20 text-center">
          <SearchIcon className="h-6 w-6 text-brass/70" />
          <h3 className="mt-5 font-display text-2xl text-parchment">
            Nothing on this shelf.
          </h3>
          <p className="mt-2 max-w-sm font-sans text-sm leading-6 text-muted">
            Try a different department or a broader search. The catalogue is
            always changing.
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
