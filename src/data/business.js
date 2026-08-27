export const BUSINESS = {
  name: 'Home Table Catering',
  tagline: 'Homemade meals, made for your table.',
  founded: 2016,
  ownerName: 'Maria Alvarez',
  phone: '(555) 812-3947',
  phoneHref: 'tel:+15558123947',
  email: 'orders@hometablecatering.example',
  emailHref: 'mailto:orders@hometablecatering.example',
  address: '128 Maple Street, Riverside, CA 92501',
  pickupAddress: '128 Maple Street, Riverside, CA 92501 (side kitchen door)',
  hours: [
    { days: 'Monday – Friday', hours: '9:00 AM – 6:00 PM' },
    { days: 'Saturday', hours: '10:00 AM – 4:00 PM' },
    { days: 'Sunday', hours: 'Closed' },
  ],
  pickupWindow: { start: '11:00 AM', end: '5:00 PM' },
  social: [
    { id: 'instagram', label: 'Instagram', href: 'https://instagram.com/hometablecatering', handle: '@hometablecatering' },
    { id: 'facebook', label: 'Facebook', href: 'https://facebook.com/hometablecatering', handle: 'Home Table Catering' },
  ],
  story: [
    "Home Table Catering started in Maria Alvarez's own kitchen in 2016, cooking weekend meals for neighbors who missed home-cooked food. What began as a few trays for friends grew, by word of mouth, into a full weekly menu.",
    "Every dish is still made from scratch in small batches, the same way it always has been — real ingredients, no shortcuts, and recipes passed down from Maria's family kitchen.",
    "Today, Home Table prepares a rotating weekly menu for pickup, so neighbors can order homemade protein, vegetarian, and side dishes for gatherings of any size, from a small family dinner to a larger get-together.",
  ],
}

export const ORDER_RULES = {
  minLeadDays: 2,
  maxLeadDays: 14,
  minGuests: 6,
  maxGuests: 30,
  taxRate: 0.0725,
}
