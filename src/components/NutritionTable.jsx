function Amount({ value, unit }) {
  return (
    <>
      {value}
      <abbr title={unit === 'g' ? 'grams' : 'milligrams'}>{unit}</abbr>
    </>
  )
}

export default function NutritionTable({ item }) {
  const n = item.nutrition
  const rows = [
    { label: 'Total Fat', value: n.totalFatG, unit: 'g' },
    { label: 'Saturated Fat', value: n.saturatedFatG, unit: 'g', indent: true },
    { label: 'Cholesterol', value: n.cholesterolMg, unit: 'mg' },
    { label: 'Sodium', value: n.sodiumMg, unit: 'mg' },
    { label: 'Total Carbohydrate', value: n.totalCarbsG, unit: 'g' },
    { label: 'Dietary Fiber', value: n.dietaryFiberG, unit: 'g', indent: true },
    { label: 'Sugars', value: n.sugarsG, unit: 'g', indent: true },
    { label: 'Protein', value: n.proteinG, unit: 'g' },
  ]

  return (
    <table className="nutrition-table">
      <caption>
        Nutrition Facts for {item.name}
        <span className="nutrition-table__serving"> — serving size: {n.servingSize}</span>
      </caption>
      <thead>
        <tr>
          <th scope="col">Nutrient</th>
          <th scope="col">Amount per serving</th>
        </tr>
      </thead>
      <tbody>
        <tr className="nutrition-table__calories">
          <th scope="row">Calories</th>
          <td>{n.calories}</td>
        </tr>
        {rows.map((row) => (
          <tr key={row.label} className={row.indent ? 'nutrition-table__indent' : undefined}>
            <th scope="row">{row.label}</th>
            <td>
              <Amount value={row.value} unit={row.unit} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
