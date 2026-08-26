// Static image data for menu items.
// All photographs are hotlinked from Wikimedia Commons (a free-media
// repository) using their stable "Special:FilePath" derived thumbnail
// URLs. No images are generated or stored in this repository; each
// entry below records the exact source, author and licence for
// attribution (shown on the About page's "Image credits" section).
//
// SC 1.1.1 (Non-text Content): every image below has a matching
// human-authored `alt` description supplied in `menu.js`/`imageCredit`.

const IMAGES = {
  'chicken-breast': {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Grilled_Chicken_Breasts_%2828905381261%29.jpg/500px-Grilled_Chicken_Breasts_%2828905381261%29.jpg',
    title: 'Grilled Chicken Breasts',
    author: 'Sharon Chen',
    license: 'CC BY 2.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Grilled_Chicken_Breasts_(28905381261).jpg',
  },
  'butter-chicken': {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Chicken_makhani.jpg/500px-Chicken_makhani.jpg',
    title: 'Chicken Makhani (Butter Chicken)',
    author: 'stu_spivack',
    license: 'CC BY-SA 2.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Chicken_makhani.jpg',
  },
  'beef-stew': {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Beef_stew_2.jpg/500px-Beef_stew_2.jpg',
    title: 'Beef Stew',
    author: '3steph14',
    license: 'CC BY-SA 4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Beef_stew_2.jpg',
  },
  'grilled-salmon': {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Grilled_plated_salmon_fillet.jpg/500px-Grilled_plated_salmon_fillet.jpg',
    title: 'Grilled Plated Salmon Fillet',
    author: 'DanaTentis',
    license: 'CC0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Grilled_plated_salmon_fillet.jpg',
  },
  'pulled-pork': {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Pulled_pork_007.jpg/500px-Pulled_pork_007.jpg',
    title: 'Pulled Pork',
    author: 'Christian Geischeder',
    license: 'CC BY 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Pulled_pork_007.jpg',
  },
  'swedish-meatballs': {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Swedish_meatballs_with_egg_noodles.jpg/500px-Swedish_meatballs_with_egg_noodles.jpg',
    title: 'Swedish Meatballs with Egg Noodles',
    author: 'RandomKatze',
    license: 'CC0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Swedish_meatballs_with_egg_noodles.jpg',
  },
  'roast-turkey': {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Cooked_turkey_breast_-_November_2023_-_Sarah_Stierch.jpg/500px-Cooked_turkey_breast_-_November_2023_-_Sarah_Stierch.jpg',
    title: 'Cooked Turkey Breast',
    author: 'Missvain',
    license: 'CC BY 4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Cooked_turkey_breast_-_November_2023_-_Sarah_Stierch.jpg',
  },
  'bbq-ribs': {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/BBQ_RIBS_pork_side_ribs.jpg/500px-BBQ_RIBS_pork_side_ribs.jpg',
    title: 'BBQ Pork Side Ribs',
    author: 'WorldwrestlingfederationVKM',
    license: 'CC BY-SA 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:BBQ_RIBS_pork_side_ribs.jpg',
  },
  'shrimp-scampi': {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Shrimp_Scampi_%286434894099%29.jpg/500px-Shrimp_Scampi_%286434894099%29.jpg',
    title: 'Shrimp Scampi',
    author: 'Phil Whitehouse',
    license: 'CC BY 2.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Shrimp_Scampi_(6434894099).jpg',
  },
  'lamb-curry': {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Mutton_Curry_%2844786%29.jpg/500px-Mutton_Curry_%2844786%29.jpg',
    title: 'Mutton Curry',
    author: 'Gaurav Dhwaj Khadka',
    license: 'CC BY-SA 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Mutton_Curry_(44786).jpg',
  },
  'paneer-tikka': {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Paneer_tikka_1.jpg/500px-Paneer_tikka_1.jpg',
    title: 'Paneer Tikka',
    author: 'Srikoundinya66',
    license: 'CC BY-SA 4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Paneer_tikka_1.jpg',
  },
  'chana-masala': {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Chana_Masala_-_Mohammed_-_Spice_Of_Life_2024-05-27.jpg/500px-Chana_Masala_-_Mohammed_-_Spice_Of_Life_2024-05-27.jpg',
    title: 'Chana Masala',
    author: 'Andy Li',
    license: 'CC0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Chana_Masala_-_Mohammed_-_Spice_Of_Life_2024-05-27.jpg',
  },
  'veg-stir-fry': {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Stir_Fry_Vegetables_in_Pan.jpg/500px-Stir_Fry_Vegetables_in_Pan.jpg',
    title: 'Stir-Fry Vegetables in Pan',
    author: 'Alabama Extension',
    license: 'CC0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Stir_Fry_Vegetables_in_Pan.jpg',
  },
  'eggplant-parm': {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Melanzane_alla_Parmigiana.jpg/500px-Melanzane_alla_Parmigiana.jpg',
    title: 'Melanzane alla Parmigiana',
    author: 'Blue Lotus (Flickr)',
    license: 'CC BY 2.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Melanzane_alla_Parmigiana.jpg',
  },
  'mushroom-risotto': {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Mushroom_Risotto_%284789415965%29.jpg/500px-Mushroom_Risotto_%284789415965%29.jpg',
    title: 'Mushroom Risotto',
    author: 'Katrin Gilger',
    license: 'CC BY-SA 2.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Mushroom_Risotto_(4789415965).jpg',
  },
  'lentil-dal': {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Dal_soup_%28Indian_lentil_dish%29.jpg/500px-Dal_soup_%28Indian_lentil_dish%29.jpg',
    title: 'Dal Soup (Indian Lentil Dish)',
    author: 'Pelican',
    license: 'CC BY-SA 2.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Dal_soup_(Indian_lentil_dish).jpg',
  },
  'caprese-salad': {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Insalata_caprese.jpg/500px-Insalata_caprese.jpg',
    title: 'Insalata Caprese',
    author: 'Pantone801',
    license: 'CC BY-SA 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Insalata_caprese.jpg',
  },
  'veg-curry': {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Mixed_vegetable_curry_1.jpg/500px-Mixed_vegetable_curry_1.jpg',
    title: 'Mixed Vegetable Curry',
    author: 'Dolon Prova',
    license: 'CC BY-SA 4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Mixed_vegetable_curry_1.jpg',
  },
  'rice-pilaf': {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Peas_Pilaf_And_Basmati_Rice_-_The_Indismart_Hotel_-_Salt_Lake_City_-_Kolkata_2023-09-10_5203.jpg/500px-Peas_Pilaf_And_Basmati_Rice_-_The_Indismart_Hotel_-_Salt_Lake_City_-_Kolkata_2023-09-10_5203.jpg',
    title: 'Peas Pilaf and Basmati Rice',
    author: 'Biswarup Ganguly',
    license: 'CC BY 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Peas_Pilaf_And_Basmati_Rice_-_The_Indismart_Hotel_-_Salt_Lake_City_-_Kolkata_2023-09-10_5203.jpg',
  },
  'garlic-naan': {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Garlic_Naan.JPG/500px-Garlic_Naan.JPG',
    title: 'Garlic Naan',
    author: 'Durvankur Patil',
    license: 'CC BY-SA 4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Garlic_Naan.JPG',
  },
  'roasted-potatoes': {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Roasted_potatoes_in_bowl.jpg/500px-Roasted_potatoes_in_bowl.jpg',
    title: 'Roasted Potatoes in a Bowl',
    author: 'Punker1999',
    license: 'CC0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Roasted_potatoes_in_bowl.jpg',
  },
  'garden-salad': {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Salad_%284%29.jpg/500px-Salad_%284%29.jpg',
    title: 'Garden Salad',
    author: 'Poecus',
    license: 'Public domain',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Salad_(4).jpg',
  },
  'garlic-bread': {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Garlic_bread_-_on_plate%2C_ready_to_eat.jpg/500px-Garlic_bread_-_on_plate%2C_ready_to_eat.jpg',
    title: 'Garlic Bread, Ready to Eat',
    author: 'Infrogmation of New Orleans',
    license: 'CC BY-SA 2.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Garlic_bread_-_on_plate,_ready_to_eat.jpg',
  },
  'steamed-veg': {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Liat_Portal_for_Foodie_Disorder_-_Steamed_Broccoli.jpg/500px-Liat_Portal_for_Foodie_Disorder_-_Steamed_Broccoli.jpg',
    title: 'Steamed Broccoli',
    author: 'HaJunkiyada',
    license: 'CC BY-SA 4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Liat_Portal_for_Foodie_Disorder_-_Steamed_Broccoli.jpg',
  },
}

export default IMAGES
