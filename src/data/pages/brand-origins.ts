/**
 * Home country of every brand in BRAND_PAGES (brands.ts), for the world map on /brands/.
 * `city` is the arc end point on the map (the brand's or the industry's home city).
 */
export interface BrandOrigin {
  country: string;
  city: { name: string; lat: number; lng: number };
  brands: string[];
}

export const BRAND_ORIGINS: BrandOrigin[] = [
  {
    country: "Germany",
    city: { name: "Stuttgart", lat: 48.7758, lng: 9.1829 },
    brands: ["Mercedes", "BMW", "Audi", "Porsche", "Volkswagen", "Maybach"],
  },
  {
    country: "United States",
    city: { name: "Detroit", lat: 42.3314, lng: -83.0458 },
    brands: ["Cadillac", "Chevrolet", "Ford", "GMC", "Jeep", "Dodge", "Chrysler", "Lincoln", "Hummer", "Mercury"],
  },
  {
    country: "United Kingdom",
    city: { name: "Coventry", lat: 52.4068, lng: -1.5197 },
    brands: ["Rolls-Royce", "Bentley", "Land Rover", "Jaguar", "Aston Martin", "McLaren", "Lotus", "Mini"],
  },
  {
    country: "Italy",
    city: { name: "Modena", lat: 44.6471, lng: 10.9252 },
    brands: ["Ferrari", "Lamborghini", "Maserati", "Fiat"],
  },
  {
    country: "France",
    city: { name: "Paris", lat: 48.8566, lng: 2.3522 },
    brands: ["Peugeot", "Renault"],
  },
  {
    country: "Sweden",
    city: { name: "Gothenburg", lat: 57.7089, lng: 11.9746 },
    brands: ["Volvo"],
  },
  {
    country: "Japan",
    city: { name: "Toyota City", lat: 35.0844, lng: 137.1531 },
    brands: ["Toyota", "Lexus", "Nissan", "Infiniti", "Honda", "Mazda", "Mitsubishi", "Subaru", "Suzuki"],
  },
  {
    country: "South Korea",
    city: { name: "Seoul", lat: 37.5665, lng: 126.978 },
    brands: ["Hyundai", "Kia", "Genesis"],
  },
  {
    country: "China",
    city: { name: "Shanghai", lat: 31.2304, lng: 121.4737 },
    brands: ["MG", "Changan"],
  },
];

/** Our workshop — every arc starts here. */
export const DUBAI_WORKSHOP = { lat: 25.2048, lng: 55.2708 };
