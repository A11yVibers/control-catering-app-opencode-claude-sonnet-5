export default function SkipLink() {
  // With HashRouter, the URL fragment *is* the route, so a native
  // in-page anchor jump to "#main-content" would be interpreted as a
  // navigation to a "/main-content" route instead of scrolling/focusing
  // within the current page. Intercept the click and focus the main
  // region directly instead, while keeping a real href for no-JS/SSR
  // fallback semantics.
  function handleClick(event) {
    event.preventDefault()
    const target = document.getElementById('main-content')
    if (target) {
      target.focus()
      target.scrollIntoView()
    }
  }

  return (
    <a className="skip-link" href="#main-content" onClick={handleClick}>
      Skip to main content
    </a>
  )
}
