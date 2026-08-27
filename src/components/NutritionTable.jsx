export default function NutritionTable({ nutrition }) {
  if (!nutrition) return null
  const rows = [
    ['Calories', `${nutrition.caloriesG ?? nutrition.calories}`],
    ['Total Fat', `${nutrition.fatG} g`],
    ['Saturated Fat', `${nutrition.satFatG} g`],
    ['Sodium', `${nutrition.sodiumMg} mg`],
    ['Total Carbohydrate', `${nutrition.carbsG} g`],
    ['Dietary Fiber', `${nutrition.fiberG} g`],
    ['Total Sugars', `${nutrition.sugarG} g`],
    ['Protein', `${nutrition.proteinG} g`],
  ]
  return (
    <div className="nutrition-facts">
      <h3 className="nutrition-facts__title">Nutrition Facts</h3>
      <p className="nutrition-facts__serving">Serving size: {nutrition.servingSize}</p>
      <table className="nutrition-facts__table">
        <tbody>
          {rows.map(([label, value]) => (
            <tr key={label}>
              <th scope="row">{label}</th>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="nutrition-facts__footnote">
        Values are approximate estimates per serving and may vary slightly by preparation.
      </p>
    </div>
  )
}
