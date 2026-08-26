import { MIN_PORTIONS, MAX_PORTIONS } from '../data/menu.js'

export default function PortionMeter({ totalPortions }) {
  const isBelowMin = totalPortions < MIN_PORTIONS
  const isAboveMax = totalPortions > MAX_PORTIONS
  const isValid = !isBelowMin && !isAboveMax && totalPortions > 0

  let statusText
  if (totalPortions === 0) {
    statusText = `Add items to build an order of ${MIN_PORTIONS}–${MAX_PORTIONS} people.`
  } else if (isBelowMin) {
    statusText = `Add ${MIN_PORTIONS - totalPortions} more serving${
      MIN_PORTIONS - totalPortions === 1 ? '' : 's'
    } to reach the ${MIN_PORTIONS}-person minimum.`
  } else if (isAboveMax) {
    statusText = `Remove ${totalPortions - MAX_PORTIONS} serving${
      totalPortions - MAX_PORTIONS === 1 ? '' : 's'
    } — orders can serve at most ${MAX_PORTIONS} people.`
  } else {
    statusText = `This order serves ${totalPortions} people, within the allowed ${MIN_PORTIONS}–${MAX_PORTIONS} range.`
  }

  const percent = Math.min(100, (totalPortions / MAX_PORTIONS) * 100)

  return (
    <div className="portion-meter" role="group" aria-labelledby="portion-meter-heading">
      <h2 id="portion-meter-heading" className="portion-meter__heading">
        Order size
      </h2>
      <div
        className="portion-meter__bar"
        role="img"
        aria-label={`${totalPortions} of ${MAX_PORTIONS} maximum servings`}
      >
        <div className="portion-meter__fill" style={{ width: `${percent}%` }} />
        <div
          className="portion-meter__min-marker"
          style={{ left: `${(MIN_PORTIONS / MAX_PORTIONS) * 100}%` }}
        />
      </div>
      <p className={isValid ? 'portion-meter__status is-valid' : 'portion-meter__status is-invalid'}>
        <strong>{totalPortions}</strong> serving{totalPortions === 1 ? '' : 's'} total.{' '}
        {statusText}
      </p>
    </div>
  )
}
