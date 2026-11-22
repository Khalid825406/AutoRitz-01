/**
 * Areas we serve, grouped by region, with map coordinates.
 * Coordinates are approximate neighbourhood centres — fine-tune any pin by editing [lat, lng].
 */

export type LatLng = [number, number];

export interface ServiceArea {
  name: string;
  region: string;
  position: LatLng;
}

export const DUBAI_CENTER: LatLng = [25.2048, 55.2708];

const REGION_AREAS: Record<string, Record<string, LatLng>> = {
  "Central Dubai": {
    "Al Jaddaf": [25.2185, 55.326],
    "Al Quoz": [25.153, 55.242],
    "Al Quoz 1": [25.158, 55.23],
    "Al Quoz 2": [25.142, 55.225],
    "Al Quoz 3": [25.172, 55.245],
    "Al Safa": [25.183, 55.242],
    "Al Satwa": [25.224, 55.273],
    "Al Wasl": [25.2, 55.255],
    "Business Bay": [25.185, 55.265],
    "City Walk": [25.207, 55.262],
    DIFC: [25.213, 55.282],
    "Downtown Dubai": [25.195, 55.278],
    "Dubai Creek Harbour": [25.2, 55.345],
    "Dubai Design District": [25.187, 55.297],
    "Dubai Healthcare City": [25.231, 55.322],
    Jumeirah: [25.21, 55.255],
    Karama: [25.244, 55.305],
    "La Mer": [25.229, 55.255],
    "Oud Metha": [25.237, 55.315],
    "Ras Al Khor": [25.18, 55.35],
    "Umm Suqeim": [25.155, 55.21],
    "Al Manara": [25.143, 55.215],
    "Al Mankhool": [25.25, 55.292],
    "Bur Dubai": [25.255, 55.297],
    "Pearl Jumeirah": [25.24, 55.26],
    "Sobha Hartland": [25.178, 55.31],
    // Location to confirm — placed on the creek's west bank (Bur Dubai side).
    "West Bank": [25.258, 55.3],
    Zabeel: [25.225, 55.295],
  },
  "Marina & Al Barsha": {
    "Al Barsha": [25.11, 55.2],
    "Al Barsha 1": [25.115, 55.195],
    "Al Barsha 2": [25.1, 55.21],
    "Al Barsha 3": [25.095, 55.195],
    "Al Barsha South": [25.07, 55.23],
    "Al Furjan": [25.03, 55.15],
    "Al Sufouh": [25.11, 55.17],
    "Barsha Heights": [25.097, 55.178],
    "Discovery Gardens": [25.04, 55.14],
    "Dubai Marina": [25.08, 55.14],
    "Emirates Hills": [25.07, 55.17],
    JBR: [25.078, 55.133],
    "Jumeirah Lakes Towers (JLT)": [25.07, 55.145],
    "Jumeirah Golf Estates": [25.02, 55.2],
    "Bluewaters Island": [25.08, 55.12],
    "The Gardens": [25.04, 55.13],
    "Palm Jumeirah": [25.112, 55.138],
    "The Greens": [25.095, 55.17],
    "The Lakes": [25.065, 55.165],
    "The Springs": [25.055, 55.18],
  },
  "Dubailand & South": {
    "Al Barari": [25.1, 55.32],
    "Arabian Ranches": [25.055, 55.27],
    "Damac Hills": [25.023, 55.25],
    "Damac Hills 2": [24.97, 55.34],
    "Damac Lagoons": [25.0, 55.24],
    "Dubai Hills": [25.105, 55.245],
    "Dubai Production City": [25.04, 55.19],
    "Dubai Silicon Oasis": [25.12, 55.38],
    "Dubai South": [24.89, 55.16],
    "Dubai Sports City": [25.04, 55.22],
    "Dubai Studio City": [25.042, 55.245],
    "International City": [25.165, 55.41],
    "Jumeirah Village Circle": [25.06, 55.21],
    "Jumeirah Village Triangle": [25.05, 55.19],
    Liwan: [25.09, 55.38],
    Arjan: [25.062, 55.235],
    "Green Community Village": [24.99, 55.165],
    "Tilal Al Ghaf": [25.015, 55.225],
    "Wadi Al Safa": [25.075, 55.3],
    "Town Square": [24.995, 55.295],
  },
  "Deira & East Dubai": {
    "Al Awir": [25.17, 55.55],
    "Al Mizhar": [25.23, 55.43],
    "Al Nahda": [25.29, 55.37],
    "Al Qusais": [25.28, 55.385],
    "Al Twar": [25.265, 55.38],
    "Al Warqa": [25.19, 55.41],
    Deira: [25.27, 55.31],
    "Dubai Festival City": [25.22, 55.355],
    Mirdif: [25.22, 55.42],
    Muhaisnah: [25.26, 55.41],
    "Nad Al Hamar": [25.2, 55.38],
    "Nad Al Sheba": [25.16, 55.31],
    "Al Hamriya": [25.265, 55.315],
    "Al Mamzar": [25.295, 55.345],
    "Al Rashidiya": [25.225, 55.39],
    Warsan: [25.16, 55.41],
  },
};

export const REGIONS = Object.keys(REGION_AREAS);

export const SERVICE_AREAS: ServiceArea[] = Object.entries(REGION_AREAS)
  .flatMap(([region, areas]) => Object.entries(areas).map(([name, position]) => ({ name, region, position })))
  .sort((a, b) => a.name.localeCompare(b.name));

export const POPULAR_AREAS = [
  "Dubai Marina",
  "Palm Jumeirah",
  "Jumeirah Lakes Towers (JLT)",
  "Dubai Hills",
  "Jumeirah",
  "Al Barsha",
  "Business Bay",
  "Downtown Dubai",
  "DIFC",
  "Mirdif",
];
