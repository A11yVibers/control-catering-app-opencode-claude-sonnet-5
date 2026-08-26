/**
 * Renders content that is visually hidden but still available to
 * assistive technology — used to give extra context to link/button
 * accessible names (e.g. SC 2.4.9 Link Purpose (Link Only)) without
 * cluttering the visible UI.
 */
export default function VisuallyHidden({ children, as: Tag = 'span' }) {
  return <Tag className="visually-hidden">{children}</Tag>
}
