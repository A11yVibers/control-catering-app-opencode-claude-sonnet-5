// Utility for building stable, directly-embeddable Wikimedia Commons image
// URLs. Using Special:FilePath keeps the reference human-readable while
// resolving (via redirect) to a fixed, specific media file — no random or
// generated imagery.
export function commonsImage(filename, width = 800) {
  const encoded = encodeURIComponent(filename)
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encoded}?width=${width}`
}

export const IMAGE_CREDITS = [
  { dish: 'Herb-Grilled Chicken Breast', file: 'Grilled Chicken Breasts (28905381261).jpg', author: 'Sharon Chen', license: 'CC BY 2.0' },
  { dish: 'Rosemary Roasted Pork Tenderloin', file: 'Seared and roasted Pork Tenderloin in Cast Iron Skillet.jpg', author: 'Taylorderek', license: 'CC BY 4.0' },
  { dish: 'Classic Beef Meatloaf', file: 'MeatloafWithSauce.jpg', author: 'Renee Comet (photographer)', license: 'Public domain' },
  { dish: 'Hearty Beef Stew', file: 'Beef stew 2.jpg', author: '3steph14', license: 'CC BY-SA 4.0' },
  { dish: 'Slow-Cooked Pulled Pork', file: 'Pulled pork sandwich.jpg', author: 'jeffreyw', license: 'CC BY 2.0' },
  { dish: 'Lemon Dill Baked Salmon', file: 'Baked salmon with dill and lemon.jpg', author: 'MOs810', license: 'CC BY-SA 3.0' },
  { dish: 'Homestyle Chicken Curry', file: 'Chicken Curry 9.jpg', author: 'Gaurav Dhwaj Khadka', license: 'CC BY-SA 4.0' },
  { dish: 'Meaty Beef Lasagna', file: 'Meaty Lasagna 8of8 (8736299782).jpg', author: 'Breville USA', license: 'CC BY 2.0' },
  { dish: 'Golden Fried Chicken', file: 'Fried-Chicken-Set.jpg', author: 'Evan-Amos', license: 'CC0' },
  { dish: 'Garlic Butter Shrimp Scampi', file: 'Shrimp Scampi (6434894099).jpg', author: 'Phil Whitehouse', license: 'CC BY 2.0' },
  { dish: 'Chickpea Masala Curry', file: 'Chickpea curry.jpg', author: 'Gaurav Dhwaj Khadka', license: 'CC BY-SA 4.0' },
  { dish: 'Eggplant Parmesan', file: 'Melanzane alla Parmigiana.jpg', author: 'Flickr user "Blue Lotus"', license: 'CC BY 2.0' },
  { dish: 'Garden Vegetable Stir-Fry', file: 'Stir fried mixed vegetables.jpg', author: 'CNEcija12345', license: 'CC BY-SA 4.0' },
  { dish: 'Stuffed Bell Peppers', file: 'Stuffed Bell Pepper 1 2013-07-22.jpg', author: 'Fastily', license: 'CC BY-SA 3.0' },
  { dish: 'Baked Eggplant Lasagna', file: 'Eggplant Lasagna (Vegitarian) (6 of 6).jpg', author: 'Wheeler Cowperthwaite', license: 'CC BY 2.0' },
  { dish: 'Three-Cheese Stuffed Shells', file: 'Stuffed shells 002.jpg', author: 'Adam S. Keck', license: 'CC BY 4.0' },
  { dish: 'Wild Mushroom & Leek Risotto', file: 'Mushroom and Leek Risotto (49535206656).jpg', author: 'spurekar', license: 'CC BY 2.0' },
  { dish: 'Sweet Potato & Black Bean Tacos', file: 'Roasted sweet potato + black bean tacos (7784822910).jpg', author: 'Karen and Brad Emerson', license: 'CC BY 2.0' },
  { dish: 'Garlic Mashed Potatoes', file: 'MashedPotatoes.jpg', author: 'Renee Comet (photographer)', license: 'Public domain' },
  { dish: 'Savory Rice Pilaf', file: 'Riz pilaf au riz rouge de Camargue.jpg', author: 'Véronique Pagnier', license: 'CC BY-SA 3.0' },
  { dish: 'Buttered Green Beans', file: 'Prinzessbohnen Butter Schweinsbach.jpg', author: 'Benreis', license: 'CC BY-SA 4.0' },
  { dish: 'Creamy Coleslaw', file: "Bowl'o'Coleslaw modified.jpg", author: 'Wikimedia Commons contributor', license: 'CC BY-SA 2.0' },
  { dish: 'Baked Mac & Cheese', file: 'Macaroni and cheese (3).jpg', author: '@joefoodie', license: 'CC BY 2.0' },
  { dish: 'Skillet Cornbread', file: 'Skillet cornbread 1.jpg', author: 'Sherurcij', license: 'Attribution' },
  { dish: 'Fresh-Baked Dinner Rolls', file: 'Dinner rolls - Massachusetts.jpg', author: 'Daderot', license: 'CC0' },
  { dish: 'Toasted Garlic Bread', file: 'Garlic bread - on plate, ready to eat.jpg', author: 'Infrogmation of New Orleans', license: 'CC BY-SA 2.0' },
  { dish: 'Southern Collard Greens', file: 'Collard greens on a stovetop.jpg', author: 'Nolabob', license: 'CC BY-SA 4.0' },
  { dish: 'Honey Roasted Root Vegetables', file: 'Neon root veggies (roasted beets, turnips, rutabaga, carrots and onions) (6893015819).jpg', author: 'Gloria Cabada-Leman', license: 'CC BY 2.0' },
  { dish: 'About page photo', file: 'Roast chicken.jpg', author: 'Wikimedia Commons contributor', license: 'CC BY-SA 3.0' },
]
