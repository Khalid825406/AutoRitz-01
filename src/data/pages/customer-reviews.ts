/**
 * Reviews from https://ritzautocare.ae/customer-reviews/ — text copied exactly from the original page
 * (fetched via the site's WordPress API), same order. All are 5-star; the original shows no dates or source.
 * Do not edit review wording: these are customers' own words.
 */

const IMG = "/images/pages/customer-reviews";

export interface CustomerReview {
  name: string;
  rating: number;
  /** Paragraphs exactly as written by the customer */
  text: string[];
  photo?: string;
}

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    name: "Anagh Babu",
    rating: 5,
    photo: `${IMG}/anagh-babu.webp`,
    text: [
      "I had been experiencing some issues with my vehicle, which had been checked by two other auto garages without resolution. However, Mr. Vipin took the time to thoroughly examine my vehicle and explain every minute issue with clarity. His professionalism and expertise made a significant difference in my experience.",
      "I was pleased with how quickly I received my vehicle back, and it was well within my budget. Your team's dedication to customer satisfaction is truly commendable.",
    ],
  },
  {
    name: "Laylah Colada",
    rating: 5,
    text: [
      "I had an excellent experience at Ritz Auto Care in Dubai. From start to finish, the service was top-notch. A special shoutout to Vipin, who was professional, knowledgeable, and went above and beyond to ensure my car was repaired perfectly. The team worked efficiently, and the quality of their work was outstanding. If you’re looking for a trustworthy and skilled auto repair shop in Dubai, I highly recommend Ritz Auto Care. Will definitely be coming back for any future car needs!",
    ],
  },
  {
    name: "Badr Fawzy",
    rating: 5,
    photo: `${IMG}/badr-fawzy.webp`,
    text: [
      "I had a great experience with Ritz Auto Garage. They diagnosed the issue quickly and handled the repair in a very professional way. The team was transparent, explained everything clearly, and completed the work on time. My car is running perfectly now. Highly recommended for anyone looking for honest and reliable service in Dubai.",
    ],
  },
  {
    name: "Bostan uddin",
    rating: 5,
    photo: `${IMG}/bostan-uddin.webp`,
    text: [
      "One of the best auto repair workshops in Dubai! RITZ AUTO CARE provides excellent customer service, professional diagnostics, and high-quality workmanship.",
      "The team is knowledgeable, friendly, and transparent about the work required. They handled my car professionally and made sure everything was checked properly before delivery.",
      "Highly recommended for German and American vehicles. If you want quality repairs, honest service, and professional car care, RITZ AUTO CARE is definitely worth visiting! 🚘🔧",
    ],
  },
  {
    name: "Golu",
    rating: 5,
    text: [
      "Excellent service with professional and friendly staff. They diagnosed and fixed my car quickly at a fair price. Highly recommend this garage for reliable and honest automotive repairs.Give it a try guys 😊.",
    ],
  },
  {
    name: "maxsale024",
    rating: 5,
    photo: `${IMG}/maxsale024.webp`,
    text: [
      "I m extremely satisfied with the overall service experience.the staff was professional and friendly and give on time service . My car feels much smoother and better to drive after service .",
    ],
  },
  {
    name: "tahir hussain",
    rating: 5,
    photo: `${IMG}/tahir-hussain.webp`,
    text: [
      "The car service and the mechanical work was excellent with the nominal charges, I feel must comfortable drive. I recommend to reach out to Ritz Auto care car garage for ur future car maintenance thanks.",
    ],
  },
  {
    name: "Raji B",
    rating: 5,
    text: [
      "I have been using the services of Ritz Auto Car garage and they have exceeded my expectations, the prices are reasonable and they are very professional. Completely satisfied with their Service and highly recommend to use their services.",
    ],
  },
];
