export const CATEGORIES = [
  { slug: 'grande', label: 'Tortas Grandes' },
  { slug: 'chica', label: 'Tortas Chicas' },
  { slug: 'mini', label: 'Tortas Minis' },
  { slug: 'alfajores', label: 'Alfajores' },
  { slug: 'brownies', label: 'Brownies' },
  { slug: 'desayuno', label: 'Desayuno' },
  { slug: 'navidad', label: 'Especial Navidad', hiddenFromNav: true, disabled: true },
  { slug: 'dia-de-la-madre', label: 'Especial Día de la Madre', hiddenFromNav: true, disabled: true },
];

export const categoryToTitle = new Map(CATEGORIES.map(c => [c.slug, c.label]));
export const NAV_CATEGORIES = CATEGORIES.filter(c => !c.hiddenFromNav);
export const DISABLED_CATEGORIES = CATEGORIES.filter(c => c.disabled).map(c => c.slug);
