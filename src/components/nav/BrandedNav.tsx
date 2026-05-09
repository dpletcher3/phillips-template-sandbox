'use client';

import { useCallback, useMemo } from 'react';
import BrandedTopBar from '@/components/branded/BrandedTopBar';
import BrandedHeader from '@/components/branded/BrandedHeader';
import Subnav, { type SubnavItem } from '@/components/branded/Subnav';

/**
 * BrandedNav — top-of-page chrome for the Branded template family.
 *
 * Composes the foundation primitives:
 *   • {@link BrandedTopBar} — 32px gray utility row with country selector
 *   • {@link BrandedHeader} — 84px sticky frosted header with Phillips
 *     lockup, search input, and hamburger button
 *   • {@link Subnav}        — optional 52px sticky page sub-navigation
 *
 * Mirrors `public/nav-samples/branded.html` 1:1 visually.
 *
 * Active-state behavior matches `SimpleNav` / `StrongNav`: the top-level
 * menu items are uniform (no item is highlighted as "current page").
 * Active state lives only in the {@link Subnav} via the per-item `active`
 * flag, which renders the 3px red underline on the matching link.
 *
 * Wiring search and menu interactions
 * -----------------------------------
 * `BrandedHeader` is a server component whose search input lives inside a
 * plain `<form>` and whose hamburger carries `data-branded-menu`. This
 * client wrapper attaches `onSubmit` and `onClick` listeners to a
 * containing `<div>` and uses event delegation:
 *
 *   • A submit bubbling out of the search form is intercepted, default
 *     navigation is prevented, and the trimmed query value is passed to
 *     `onSearchSubmit`.
 *   • A click that originated on (or inside) the hamburger button — i.e.
 *     `event.target.closest('[data-branded-menu]')` is non-null — fires
 *     `onMenuClick`.
 *
 * Both handlers default to no-ops, so consumers can render `<BrandedNav />`
 * with no props and get a fully presentational nav.
 *
 * The `menuItems` prop is reserved for an off-canvas drawer that the
 * hamburger triggers (the Branded references hide the standard menu spine
 * behind the hamburger rather than rendering it horizontally). The list is
 * also serialized onto a `data-branded-nav-menu` attribute so a future
 * drawer component can read it without a re-render.
 *
 * @example Basic, no sub-nav
 *   <BrandedNav />
 *
 * @example Detail page with a sticky sub-nav
 *   <BrandedNav
 *     showSubnav
 *     subnavItems={[
 *       { label: 'Application Support', href: '#application-support' },
 *       { label: 'Training',            href: '#training' },
 *       { label: 'Automation & Robotics', href: '#automation', active: true },
 *       { label: 'Contact Us',          href: '#contact' },
 *     ]}
 *     onSearchSubmit={(q) => router.push(`/search?q=${encodeURIComponent(q)}`)}
 *     onMenuClick={() => setDrawerOpen(true)}
 *   />
 */

const NOOP = () => {};

/** Default menu spine, mirrors NAV_ITEMS in `src/lib/constants.ts`. */
const DEFAULT_MENU_ITEMS: readonly BrandedMenuItem[] = [
  { id: 'ima',       label: "I'm a…",              href: '#' },
  { id: 'solutions', label: 'Solutions',            href: '#' },
  { id: 'brands',    label: 'Brands',               href: '#' },
  { id: 'education', label: 'Training & Education', href: '#' },
  { id: 'resources', label: 'Resources',            href: '#' },
  { id: 'about',     label: 'About',                href: '#' },
];

interface BrandedSubnavItem {
  label: string;
  href: string;
  /** Mark exactly one item as active to receive the red underline. */
  active?: boolean;
}

interface BrandedMenuItem {
  /** Stable identifier (used by future drawer integrations). */
  id: string;
  label: string;
  href: string;
}

interface BrandedNavProps {
  /** Where the Phillips lockup links to. @default '/' */
  homeHref?: string;
  /** Country shown in the top bar selector. @default 'USA' */
  country?: string;
  /**
   * Standard menu spine — currently reserved for the off-canvas drawer
   * that the hamburger button opens. Not rendered horizontally in the
   * header (the Branded references intentionally hide the menu).
   * @default the 6 items from NAV_ITEMS in src/lib/constants.ts
   */
  menuItems?: readonly BrandedMenuItem[];
  /** Render the secondary sub-navigation below the header. @default false */
  showSubnav?: boolean;
  /** Items for the sub-navigation (only used when `showSubnav` is true). */
  subnavItems?: BrandedSubnavItem[];
  /** Search input placeholder. @default 'Search…' */
  searchPlaceholder?: string;
  /** Called with the trimmed search value when the search form submits. */
  onSearchSubmit?: (value: string) => void;
  /** Called when the hamburger icon is clicked. */
  onMenuClick?: () => void;
  /** Override class on the wrapping div (e.g. for spacing/positioning). */
  className?: string;
}

export default function BrandedNav({
  homeHref = '/',
  country = 'USA',
  menuItems = DEFAULT_MENU_ITEMS,
  showSubnav = false,
  subnavItems = [],
  searchPlaceholder = 'Search…',
  onSearchSubmit = NOOP,
  onMenuClick = NOOP,
  className,
}: BrandedNavProps) {
  /** Serialized for future drawer integration — read via the data attribute. */
  const menuJson = useMemo(() => JSON.stringify(menuItems), [menuItems]);

  /** Convert the user-friendly subnav shape to {@link Subnav}'s primitive shape. */
  const { items, activeId } = useMemo(() => {
    const mapped: SubnavItem[] = subnavItems.map((it, i) => ({
      id: it.href || `subnav-${i}`,
      label: it.label,
      href: it.href,
    }));
    const active = subnavItems.find((it) => it.active);
    return { items: mapped, activeId: active?.href };
  }, [subnavItems]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLDivElement>) => {
      e.preventDefault();
      const form = e.target as HTMLElement;
      const input =
        form instanceof HTMLFormElement
          ? (form.querySelector('input[type="search"]') as HTMLInputElement | null)
          : null;
      onSearchSubmit(input?.value.trim() ?? '');
    },
    [onSearchSubmit],
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-branded-menu]')) {
        onMenuClick();
      }
    },
    [onMenuClick],
  );

  return (
    <div
      className={className}
      data-branded-nav-menu={menuJson}
      onSubmit={handleSubmit}
      onClick={handleClick}
    >
      <BrandedTopBar country={country} />
      <BrandedHeader homeHref={homeHref} searchPlaceholder={searchPlaceholder} />
      {showSubnav && items.length > 0 && <Subnav items={items} activeId={activeId} />}
    </div>
  );
}

export type { BrandedNavProps, BrandedSubnavItem, BrandedMenuItem };
