const NUTRITION_ROWS = [
  { key: 'calories', label: 'Calories', unit: '' },
  { key: 'totalFat', label: 'Total Fat', unit: 'g' },
  { key: 'saturatedFat', label: 'Saturated Fat', unit: 'g' },
  { key: 'sodium', label: 'Sodium', unit: 'mg' },
  { key: 'totalCarbs', label: 'Total Carbohydrates', unit: 'g' },
  { key: 'fiber', label: 'Dietary Fiber', unit: 'g' },
  { key: 'sugar', label: 'Total Sugars', unit: 'g' },
  { key: 'protein', label: 'Protein', unit: 'g' },
]

export default function NutritionTable({ nutrition }) {
  if (!nutrition) return null
  return (
    <table className="nutrition-table" aria-label="Nutrition facts per serving">
      <caption>Nutrition Facts <span>(per serving / person)</span></caption>
      <tbody>
        {NUTRITION_ROWS.map((row) => (
          <tr key={row.key}>
            <th scope="row">{row.label}</th>
            <td>
              {nutrition[row.key]}
              {row.unit}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
