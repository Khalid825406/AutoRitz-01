export interface Brand {
  name: string;
  /** Logo file in /public/images/brands/ (svg/png/webp). The brand name is shown until the file exists. */
  logo: string;
}

const slug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const NAMES = [
  "MG", "Mercedes-Benz", "BMW", "Audi", "Maserati", "Lamborghini", "Jaguar", "Ferrari", "Bentley", "Chrysler",
  "Changan", "Fiat", "Ford", "Genesis", "GMC", "Honda", "Infiniti", "Land Rover", "Lincoln", "Lotus",
  "Maybach", "Mercury", "Mini", "Mitsubishi", "Peugeot", "Renault", "Rolls-Royce", "Subaru", "Volvo", "McLaren",
  "Aston Martin", "Cadillac", "Hummer", "Dodge", "Nissan", "Hyundai", "Chevrolet", "Kia", "Toyota", "Jeep",
  "Suzuki", "Mazda", "Volkswagen", "Porsche",
];

export const brands: Brand[] = NAMES.map((name) => ({ name, logo: `/images/brands/${slug(name)}.png` }));
