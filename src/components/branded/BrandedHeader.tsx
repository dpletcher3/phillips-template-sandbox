import PhillipsLockup from './PhillipsLockup';

/**
 * BrandedHeader — sticky frosted site header.
 *
 * Sits below {@link BrandedTopBar}. Holds the Phillips lockup, a search
 * input, and a hamburger menu icon. The frosted-glass effect uses
 * `backdrop-filter: blur` over a 92%-opacity white surface; both vendor
 * prefixes are emitted for Safari support.
 *
 * No menu state is wired up at this layer — the hamburger is presentational.
 * A page-level wrapper can attach interaction (e.g. open a slide-out nav)
 * by listening to clicks on `[data-branded-menu]`.
 *
 * Server component (no hooks). Stays at z-index 50 so a page-level
 * sub-navigation can layer beneath at z-index 40.
 *
 * @example
 *   <BrandedHeader />
 *   <BrandedHeader homeHref="/branded" searchPlaceholder="Search products…" />
 */
interface BrandedHeaderProps {
  /** Where the lockup links to. @default '/' */
  homeHref?: string;
  /** Search input placeholder. @default 'Search…' */
  searchPlaceholder?: string;
  /** ARIA label for the search input. @default 'Search' */
  searchAriaLabel?: string;
  className?: string;
}

export default function BrandedHeader({
  homeHref = '/',
  searchPlaceholder = 'Search…',
  searchAriaLabel = 'Search',
  className,
}: BrandedHeaderProps) {
  return (
    <header
      className={`border-b border-branded-gray-200 ${className ?? ''}`}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'saturate(140%) blur(10px)',
        WebkitBackdropFilter: 'saturate(140%) blur(10px)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '0 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '84px',
        }}
      >
        <a href={homeHref} aria-label="Phillips Corporation home" style={{ display: 'inline-block', textDecoration: 'none' }}>
          <PhillipsLockup height={40} />
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <SearchInput placeholder={searchPlaceholder} ariaLabel={searchAriaLabel} />
          <button
            type="button"
            aria-label="Open menu"
            data-branded-menu
            className="text-branded-gray-700 hover:text-branded-red hover:bg-branded-gray-100 rounded-branded-sm"
            style={{
              width: '42px',
              height: '42px',
              border: 'none',
              background: 'transparent',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background 0.15s ease, color 0.15s ease',
            }}
          >
            <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

/**
 * Search input with leading icon, wrapped in a `<form>` so that pressing
 * Enter dispatches a bubbling submit event. The form is intentionally
 * un-handled here — a parent client component (e.g. {@link BrandedNav})
 * intercepts the bubbling event with `onSubmit` + `preventDefault` and
 * forwards the value. With no parent handler, the form falls back to the
 * standard browser GET behavior (`?q=…` against the current URL).
 */
function SearchInput({ placeholder, ariaLabel }: { placeholder: string; ariaLabel: string }) {
  return (
    <form
      action=""
      method="get"
      role="search"
      style={{ position: 'relative', display: 'inline-block' }}
    >
      <svg
        viewBox="0 0 24 24"
        width={18}
        height={18}
        fill="none"
        stroke="var(--branded-gray-500)"
        strokeWidth={2}
        strokeLinecap="round"
        aria-hidden="true"
        style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
      >
        <circle cx={11} cy={11} r={7} />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        type="search"
        name="q"
        placeholder={placeholder}
        aria-label={ariaLabel}
        className="border border-branded-gray-200 bg-branded-gray-50 text-branded-gray-700 placeholder:text-branded-gray-400 focus:border-branded-red focus:bg-branded-white focus:outline-none"
        style={{
          width: '320px',
          height: '42px',
          borderRadius: '24px',
          padding: '0 18px 0 42px',
          fontFamily: 'var(--font-montserrat), system-ui, sans-serif',
          fontSize: '14px',
          transition: 'border-color 0.18s ease, background-color 0.18s ease',
        }}
      />
    </form>
  );
}
