export interface Brand {
  name: string;
  /** Logo in /public/images/brands/ (256×256 PNG on white). */
  logo: string;
}

const fileSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/** The brands we service — keep in sync with the logo files in /public/images/brands/. */
const NAMES = [
  "MG", "Mercedes-Benz", "BMW", "Audi", "Maserati", "Lamborghini", "Jaguar", "Ferrari", "Bentley", "Chrysler",
  "Changan", "Fiat", "Ford", "Genesis", "GMC", "Honda", "Infiniti", "Land Rover", "Lincoln", "Lotus",
  "Maybach", "Mercury", "Mini", "Mitsubishi", "Peugeot", "Renault", "Rolls-Royce", "Subaru", "Volvo", "McLaren",
  "Aston Martin", "Cadillac", "Hummer", "Dodge", "Nissan", "Hyundai", "Chevrolet", "Kia", "Toyota", "Jeep",
  "Suzuki", "Mazda", "Volkswagen", "Porsche",
];

export const brands: Brand[] = NAMES.map((name) => ({ name, logo: `/images/brands/${fileSlug(name)}.png` }));
