import { commonsImage } from './images'

// -----------------------------------------------------------------------
// Dish catalog
// -----------------------------------------------------------------------
// Every dish below is a distinct, reusable menu item. Each day of the week
// draws its 10-item menu (5 protein, 3 vegetarian, 2 sides) from these
// pools — see buildMenuForDate() below. Prices are per-person servings.

export const CATEGORIES = [
  { id: 'protein', label: 'Protein', blurb: 'Slow-cooked, roasted, and pan-seared mains' },
  { id: 'vegetarian', label: 'Vegetarian', blurb: 'Meat-free mains packed with flavor' },
  { id: 'side', label: 'Sides', blurb: 'Comforting classics to round out the table' },
]

export const DISHES = [
  // ---------------------------------------------------------------- PROTEIN
  {
    id: 'grilled-chicken-breast',
    name: 'Herb-Grilled Chicken Breast',
    category: 'protein',
    price: 12.5,
    image: commonsImage('Grilled Chicken Breasts (28905381261).jpg'),
    description:
      'Boneless chicken breast marinated in lemon, garlic, and fresh herbs, then grilled and sliced for easy serving.',
    ingredients: ['Chicken breast', 'Olive oil', 'Lemon juice', 'Garlic', 'Rosemary', 'Thyme', 'Sea salt', 'Black pepper'],
    nutrition: { servingSize: '1 serving (5 oz)', calories: 231, proteinG: 38, carbsG: 1, fatG: 8, satFatG: 1.5, sodiumMg: 340, fiberG: 0, sugarG: 0 },
  },
  {
    id: 'roasted-pork-tenderloin',
    name: 'Rosemary Roasted Pork Tenderloin',
    category: 'protein',
    price: 13,
    image: commonsImage('Seared and roasted Pork Tenderloin in Cast Iron Skillet.jpg'),
    description:
      'Seared and oven-roasted pork tenderloin rubbed with rosemary and cracked pepper, rested and sliced into medallions.',
    ingredients: ['Pork tenderloin', 'Rosemary', 'Garlic', 'Olive oil', 'Cracked pepper', 'Sea salt', 'Pan drippings'],
    nutrition: { servingSize: '1 serving (5 oz)', calories: 210, proteinG: 34, carbsG: 1, fatG: 7, satFatG: 2, sodiumMg: 300, fiberG: 0, sugarG: 0 },
  },
  {
    id: 'beef-meatloaf',
    name: 'Classic Beef Meatloaf',
    category: 'protein',
    price: 11.5,
    image: commonsImage('MeatloafWithSauce.jpg'),
    description:
      'A homestyle beef meatloaf with breadcrumbs, onion, and a tangy tomato glaze baked right on top.',
    ingredients: ['Ground beef', 'Breadcrumbs', 'Egg', 'Onion', 'Ketchup', 'Brown sugar', 'Worcestershire sauce', 'Garlic powder'],
    nutrition: { servingSize: '1 slice (6 oz)', calories: 340, proteinG: 24, carbsG: 14, fatG: 21, satFatG: 8, sodiumMg: 620, fiberG: 1, sugarG: 7 },
  },
  {
    id: 'beef-stew',
    name: 'Hearty Beef Stew',
    category: 'protein',
    price: 12,
    image: commonsImage('Beef stew 2.jpg'),
    description:
      'Tender beef chunks slow-simmered with carrots, potatoes, and corn in a rich savory broth.',
    ingredients: ['Beef chuck', 'Potatoes', 'Carrots', 'Corn', 'Green beans', 'Beef broth', 'Tomato paste', 'Bay leaf'],
    nutrition: { servingSize: '1 bowl (10 oz)', calories: 320, proteinG: 26, carbsG: 24, fatG: 12, satFatG: 4, sodiumMg: 560, fiberG: 4, sugarG: 5 },
  },
  {
    id: 'pulled-pork',
    name: 'Slow-Cooked Pulled Pork',
    category: 'protein',
    price: 12.5,
    image: commonsImage('Pulled pork sandwich.jpg'),
    description:
      'Pork shoulder braised for hours until fork-tender, shredded and tossed in a peppery pan gravy.',
    ingredients: ['Pork shoulder', 'Black pepper', 'Brown sugar', 'Cider vinegar', 'Onion', 'Garlic', 'Pan gravy'],
    nutrition: { servingSize: '1 serving (6 oz)', calories: 360, proteinG: 30, carbsG: 8, fatG: 22, satFatG: 8, sodiumMg: 480, fiberG: 0, sugarG: 6 },
  },
  {
    id: 'baked-salmon',
    name: 'Lemon Dill Baked Salmon',
    category: 'protein',
    price: 14,
    image: commonsImage('Baked salmon with dill and lemon.jpg'),
    description:
      'Fresh salmon fillets baked with fresh dill and lemon slices for a light, bright finish.',
    ingredients: ['Salmon fillet', 'Fresh dill', 'Lemon', 'Olive oil', 'Garlic', 'Sea salt', 'Black pepper'],
    nutrition: { servingSize: '1 fillet (6 oz)', calories: 290, proteinG: 34, carbsG: 2, fatG: 16, satFatG: 3, sodiumMg: 260, fiberG: 0, sugarG: 0 },
  },
  {
    id: 'chicken-curry',
    name: 'Homestyle Chicken Curry',
    category: 'protein',
    price: 12.75,
    image: commonsImage('Chicken Curry 9.jpg'),
    description:
      'Bone-in chicken simmered in a fragrant tomato-onion curry with warm spices and fresh cilantro.',
    ingredients: ['Chicken', 'Onion', 'Tomato', 'Garlic', 'Ginger', 'Garam masala', 'Turmeric', 'Cilantro'],
    nutrition: { servingSize: '1 serving (8 oz)', calories: 310, proteinG: 27, carbsG: 10, fatG: 18, satFatG: 4, sodiumMg: 540, fiberG: 2, sugarG: 4 },
  },
  {
    id: 'beef-lasagna',
    name: 'Meaty Beef Lasagna',
    category: 'protein',
    price: 12.25,
    image: commonsImage('Meaty Lasagna 8of8 (8736299782).jpg'),
    description:
      'Layers of pasta, seasoned ground beef, ricotta, and mozzarella baked until bubbly and golden.',
    ingredients: ['Lasagna noodles', 'Ground beef', 'Ricotta cheese', 'Mozzarella', 'Parmesan', 'Marinara sauce', 'Egg', 'Basil'],
    nutrition: { servingSize: '1 slice (8 oz)', calories: 410, proteinG: 27, carbsG: 30, fatG: 20, satFatG: 10, sodiumMg: 680, fiberG: 2, sugarG: 6 },
  },
  {
    id: 'fried-chicken',
    name: 'Golden Fried Chicken',
    category: 'protein',
    price: 12,
    image: commonsImage('Fried-Chicken-Set.jpg'),
    description:
      'Buttermilk-brined chicken pieces coated in a seasoned crust and fried until deeply golden and crisp.',
    ingredients: ['Chicken pieces', 'Buttermilk', 'Flour', 'Paprika', 'Garlic powder', 'Cayenne pepper', 'Frying oil'],
    nutrition: { servingSize: '2 pieces (7 oz)', calories: 430, proteinG: 29, carbsG: 16, fatG: 27, satFatG: 6, sodiumMg: 560, fiberG: 1, sugarG: 0 },
  },
  {
    id: 'shrimp-scampi',
    name: 'Garlic Butter Shrimp Scampi',
    category: 'protein',
    price: 14.5,
    image: commonsImage('Shrimp Scampi (6434894099).jpg'),
    description:
      'Plump shrimp sautéed in a garlicky white-wine butter sauce, served over a bed of rice.',
    ingredients: ['Shrimp', 'Butter', 'Garlic', 'White wine', 'Lemon juice', 'Parsley', 'Rice'],
    nutrition: { servingSize: '1 serving (6 oz)', calories: 320, proteinG: 24, carbsG: 20, fatG: 16, satFatG: 8, sodiumMg: 470, fiberG: 1, sugarG: 1 },
  },

  // ------------------------------------------------------------ VEGETARIAN
  {
    id: 'chickpea-curry',
    name: 'Chickpea Masala Curry',
    category: 'vegetarian',
    price: 10,
    image: commonsImage('Chickpea curry.jpg'),
    description:
      'Chickpeas simmered in a spiced tomato gravy with onions, ginger, and garam masala.',
    ingredients: ['Chickpeas', 'Tomato', 'Onion', 'Garlic', 'Ginger', 'Garam masala', 'Cumin', 'Cilantro'],
    nutrition: { servingSize: '1 serving (8 oz)', calories: 260, proteinG: 11, carbsG: 38, fatG: 8, satFatG: 1, sodiumMg: 480, fiberG: 10, sugarG: 6 },
  },
  {
    id: 'eggplant-parmesan',
    name: 'Eggplant Parmesan',
    category: 'vegetarian',
    price: 10.5,
    image: commonsImage('Melanzane alla Parmigiana.jpg'),
    description:
      'Breaded eggplant slices layered with marinara and melted parmesan and mozzarella, baked until golden.',
    ingredients: ['Eggplant', 'Breadcrumbs', 'Marinara sauce', 'Mozzarella', 'Parmesan', 'Basil', 'Olive oil'],
    nutrition: { servingSize: '1 serving (7 oz)', calories: 300, proteinG: 13, carbsG: 22, fatG: 18, satFatG: 7, sodiumMg: 520, fiberG: 5, sugarG: 7 },
  },
  {
    id: 'vegetable-stir-fry',
    name: 'Garden Vegetable Stir-Fry',
    category: 'vegetarian',
    price: 9.5,
    image: commonsImage('Stir fried mixed vegetables.jpg'),
    description:
      'A colorful medley of cabbage, carrot, and garden vegetables quickly stir-fried with garlic and soy.',
    ingredients: ['Cabbage', 'Carrot', 'Bell pepper', 'Snap peas', 'Garlic', 'Soy sauce', 'Sesame oil'],
    nutrition: { servingSize: '1 serving (7 oz)', calories: 150, proteinG: 4, carbsG: 20, fatG: 6, satFatG: 1, sodiumMg: 420, fiberG: 5, sugarG: 8 },
  },
  {
    id: 'stuffed-bell-peppers',
    name: 'Stuffed Bell Peppers',
    category: 'vegetarian',
    price: 10.75,
    image: commonsImage('Stuffed Bell Pepper 1 2013-07-22.jpg'),
    description:
      'Sweet bell peppers filled with seasoned rice, black beans, corn, and cheddar, baked until tender.',
    ingredients: ['Bell peppers', 'Rice', 'Black beans', 'Corn', 'Cheddar cheese', 'Onion', 'Cumin', 'Tomato'],
    nutrition: { servingSize: '1 pepper (8 oz)', calories: 270, proteinG: 10, carbsG: 42, fatG: 7, satFatG: 3, sodiumMg: 390, fiberG: 7, sugarG: 9 },
  },
  {
    id: 'eggplant-lasagna',
    name: 'Baked Eggplant Lasagna',
    category: 'vegetarian',
    price: 11,
    image: commonsImage('Eggplant Lasagna (Vegitarian) (6 of 6).jpg'),
    description:
      'A hearty vegetarian lasagna swapping noodles for roasted eggplant, layered with ricotta and marinara.',
    ingredients: ['Eggplant', 'Ricotta cheese', 'Mozzarella', 'Marinara sauce', 'Spinach', 'Parmesan', 'Basil'],
    nutrition: { servingSize: '1 slice (8 oz)', calories: 320, proteinG: 16, carbsG: 20, fatG: 19, satFatG: 10, sodiumMg: 560, fiberG: 5, sugarG: 8 },
  },
  {
    id: 'stuffed-shells',
    name: 'Three-Cheese Stuffed Shells',
    category: 'vegetarian',
    price: 10.5,
    image: commonsImage('Stuffed shells 002.jpg'),
    description:
      'Jumbo pasta shells filled with ricotta, mozzarella, and parmesan, baked in a bright marinara sauce.',
    ingredients: ['Pasta shells', 'Ricotta cheese', 'Mozzarella', 'Parmesan', 'Marinara sauce', 'Egg', 'Parsley'],
    nutrition: { servingSize: '4 shells (8 oz)', calories: 350, proteinG: 17, carbsG: 34, fatG: 16, satFatG: 9, sodiumMg: 600, fiberG: 3, sugarG: 7 },
  },
  {
    id: 'mushroom-risotto',
    name: 'Wild Mushroom & Leek Risotto',
    category: 'vegetarian',
    price: 11.5,
    image: commonsImage('Mushroom and Leek Risotto (49535206656).jpg'),
    description:
      'Creamy arborio rice slow-simmered with vegetable stock, sautéed wild mushrooms, and tender leeks.',
    ingredients: ['Arborio rice', 'Wild mushrooms', 'Leek', 'Vegetable stock', 'Parmesan', 'White wine', 'Butter'],
    nutrition: { servingSize: '1 serving (8 oz)', calories: 340, proteinG: 9, carbsG: 46, fatG: 12, satFatG: 6, sodiumMg: 470, fiberG: 3, sugarG: 3 },
  },
  {
    id: 'black-bean-tacos',
    name: 'Sweet Potato & Black Bean Tacos',
    category: 'vegetarian',
    price: 9.75,
    image: commonsImage('Roasted sweet potato + black bean tacos (7784822910).jpg'),
    description:
      'Soft tortillas filled with roasted sweet potato, black beans, and a squeeze of lime crema.',
    ingredients: ['Corn tortillas', 'Sweet potato', 'Black beans', 'Lime', 'Sour cream', 'Cilantro', 'Cumin'],
    nutrition: { servingSize: '2 tacos (7 oz)', calories: 290, proteinG: 8, carbsG: 48, fatG: 8, satFatG: 3, sodiumMg: 360, fiberG: 9, sugarG: 6 },
  },

  // ------------------------------------------------------------------ SIDES
  {
    id: 'mashed-potatoes',
    name: 'Garlic Mashed Potatoes',
    category: 'side',
    price: 4,
    image: commonsImage('MashedPotatoes.jpg'),
    description: 'Buttery mashed potatoes whipped smooth with roasted garlic and cream.',
    ingredients: ['Potatoes', 'Butter', 'Cream', 'Roasted garlic', 'Sea salt', 'Chives'],
    nutrition: { servingSize: '1 side (5 oz)', calories: 210, proteinG: 3, carbsG: 28, fatG: 9, satFatG: 6, sodiumMg: 320, fiberG: 2, sugarG: 2 },
  },
  {
    id: 'rice-pilaf',
    name: 'Savory Rice Pilaf',
    category: 'side',
    price: 3.75,
    image: commonsImage('Riz pilaf au riz rouge de Camargue.jpg'),
    description: 'Fluffy rice toasted with onion and simmered in seasoned broth for a savory finish.',
    ingredients: ['Rice', 'Onion', 'Vegetable broth', 'Butter', 'Bay leaf', 'Black pepper'],
    nutrition: { servingSize: '1 side (5 oz)', calories: 190, proteinG: 4, carbsG: 36, fatG: 4, satFatG: 2, sodiumMg: 280, fiberG: 1, sugarG: 1 },
  },
  {
    id: 'green-beans',
    name: 'Buttered Green Beans',
    category: 'side',
    price: 3.5,
    image: commonsImage('Prinzessbohnen Butter Schweinsbach.jpg'),
    description: 'Crisp-tender green beans tossed in butter with a touch of garlic and cracked pepper.',
    ingredients: ['Green beans', 'Butter', 'Garlic', 'Sea salt', 'Black pepper'],
    nutrition: { servingSize: '1 side (4 oz)', calories: 90, proteinG: 2, carbsG: 8, fatG: 6, satFatG: 4, sodiumMg: 180, fiberG: 3, sugarG: 3 },
  },
  {
    id: 'coleslaw',
    name: 'Creamy Coleslaw',
    category: 'side',
    price: 3.5,
    image: commonsImage("Bowl'o'Coleslaw modified.jpg"),
    description: 'Crunchy shredded cabbage and carrot tossed in a tangy, creamy dressing.',
    ingredients: ['Cabbage', 'Carrot', 'Mayonnaise', 'Apple cider vinegar', 'Sugar', 'Celery seed'],
    nutrition: { servingSize: '1 side (4 oz)', calories: 160, proteinG: 1, carbsG: 12, fatG: 12, satFatG: 2, sodiumMg: 210, fiberG: 2, sugarG: 8 },
  },
  {
    id: 'mac-and-cheese',
    name: 'Baked Mac & Cheese',
    category: 'side',
    price: 4.25,
    image: commonsImage('Macaroni and cheese (3).jpg'),
    description: 'Elbow pasta baked in a rich, three-cheese sauce until golden and bubbly on top.',
    ingredients: ['Pasta', 'Cheddar cheese', 'Mozzarella', 'Milk', 'Butter', 'Flour', 'Breadcrumbs'],
    nutrition: { servingSize: '1 side (6 oz)', calories: 320, proteinG: 12, carbsG: 30, fatG: 17, satFatG: 10, sodiumMg: 460, fiberG: 1, sugarG: 4 },
  },
  {
    id: 'cornbread',
    name: 'Skillet Cornbread',
    category: 'side',
    price: 3.25,
    image: commonsImage('Skillet cornbread 1.jpg'),
    description: 'A lightly sweet cornbread baked in a cast-iron skillet for a crisp golden crust.',
    ingredients: ['Cornmeal', 'Flour', 'Buttermilk', 'Egg', 'Butter', 'Honey', 'Baking powder'],
    nutrition: { servingSize: '1 wedge (3 oz)', calories: 220, proteinG: 4, carbsG: 30, fatG: 9, satFatG: 5, sodiumMg: 300, fiberG: 1, sugarG: 8 },
  },
  {
    id: 'dinner-rolls',
    name: 'Fresh-Baked Dinner Rolls',
    category: 'side',
    price: 3,
    image: commonsImage('Dinner rolls - Massachusetts.jpg'),
    description: 'Soft, pillowy dinner rolls baked fresh with a lightly golden crust.',
    ingredients: ['Flour', 'Yeast', 'Milk', 'Butter', 'Sugar', 'Egg', 'Sea salt'],
    nutrition: { servingSize: '2 rolls (3 oz)', calories: 240, proteinG: 6, carbsG: 40, fatG: 6, satFatG: 3, sodiumMg: 320, fiberG: 2, sugarG: 5 },
  },
  {
    id: 'garlic-bread',
    name: 'Toasted Garlic Bread',
    category: 'side',
    price: 3.25,
    image: commonsImage('Garlic bread - on plate, ready to eat.jpg'),
    description: 'Crusty bread brushed with garlic butter and toasted until golden at the edges.',
    ingredients: ['French bread', 'Butter', 'Garlic', 'Parsley', 'Parmesan'],
    nutrition: { servingSize: '2 slices (3 oz)', calories: 230, proteinG: 5, carbsG: 28, fatG: 11, satFatG: 6, sodiumMg: 360, fiberG: 1, sugarG: 2 },
  },
  {
    id: 'collard-greens',
    name: 'Southern Collard Greens',
    category: 'side',
    price: 3.75,
    image: commonsImage('Collard greens on a stovetop.jpg'),
    description: 'Collard greens braised low and slow with smoked seasoning until deeply tender.',
    ingredients: ['Collard greens', 'Smoked turkey', 'Onion', 'Garlic', 'Apple cider vinegar', 'Red pepper flakes'],
    nutrition: { servingSize: '1 side (5 oz)', calories: 110, proteinG: 6, carbsG: 9, fatG: 5, satFatG: 1.5, sodiumMg: 380, fiberG: 4, sugarG: 2 },
  },
  {
    id: 'roasted-root-vegetables',
    name: 'Honey Roasted Root Vegetables',
    category: 'side',
    price: 4,
    image: commonsImage('Neon root veggies (roasted beets, turnips, rutabaga, carrots and onions) (6893015819).jpg'),
    description: 'Beets, turnips, carrots, and onions roasted with olive oil and a touch of honey.',
    ingredients: ['Beets', 'Turnips', 'Carrots', 'Onion', 'Olive oil', 'Honey', 'Thyme'],
    nutrition: { servingSize: '1 side (5 oz)', calories: 150, proteinG: 2, carbsG: 24, fatG: 5, satFatG: 1, sodiumMg: 150, fiberG: 4, sugarG: 12 },
  },
]

export const DISH_BY_ID = Object.fromEntries(DISHES.map((d) => [d.id, d]))

const POOLS = {
  protein: DISHES.filter((d) => d.category === 'protein'),
  vegetarian: DISHES.filter((d) => d.category === 'vegetarian'),
  side: DISHES.filter((d) => d.category === 'side'),
}

export const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const COUNTS = { protein: 5, vegetarian: 3, side: 2 }

/**
 * Deterministically picks `count` distinct items from `pool`, starting at a
 * rotating offset derived from the day of week, so each day of the week has
 * a fixed, unique-but-repeatable 10-item menu.
 */
function pickForDay(pool, dayIndex, count) {
  const size = pool.length
  const offset = (dayIndex * 3) % size
  const picked = []
  for (let i = 0; i < count; i++) {
    picked.push(pool[(offset + i) % size])
  }
  return picked
}

/** Builds the fixed 10-item menu (5 protein / 3 vegetarian / 2 side) for a given day of week. */
export function getMenuForDayOfWeek(dayIndex) {
  return {
    protein: pickForDay(POOLS.protein, dayIndex, COUNTS.protein),
    vegetarian: pickForDay(POOLS.vegetarian, dayIndex, COUNTS.vegetarian),
    side: pickForDay(POOLS.side, dayIndex, COUNTS.side),
  }
}

/** Builds the menu for a specific calendar date (a JS Date, or ISO date string). */
export function getMenuForDate(date) {
  const d = typeof date === 'string' ? new Date(`${date}T00:00:00`) : date
  return getMenuForDayOfWeek(d.getDay())
}

/** Returns true if a dish id is part of the menu for the given date. */
export function isDishAvailableOnDate(dishId, date) {
  const menu = getMenuForDate(date)
  return [...menu.protein, ...menu.vegetarian, ...menu.side].some((d) => d.id === dishId)
}
