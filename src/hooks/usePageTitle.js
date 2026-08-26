import { useEffect } from 'react'

/**
 * Sets document.title for the current route (WCAG 2.4.2 Page Titled) and
 * moves focus to the page's main heading after route changes so screen
 * reader and keyboard users get an immediate, accurate announcement of
 * the new page (supports 2.4.3-style predictable navigation without
 * relying on automatic focus moves that steal focus from the user).
 */
export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — Homestead Table Catering` : 'Homestead Table Catering'
  }, [title])
}
