export type CoffeeCategory = "Espresso" | "Milk Base" | "Non-Coffee";

export interface CoffeeItem {
  readonly id: string;
  readonly name: string;
  readonly price: number;
  readonly category: CoffeeCategory;
  readonly rating: number;
  readonly description: string;
}

export const MENU_BIDHENG: readonly CoffeeItem[] = [
  {
    id: "1",
    name: "Kopi Tubruk Bidheng",
    price: 10000,
    category: "Espresso",
    rating: 4.8,
    description:
      "Kopi hitam tradisional khas Bidheng dengan biji kopi pilihan lokal asli Tubruk yang pekat, mantap, dan membangkitkan jiwa begadang para koder.",
  },
  {
    id: "2",
    name: "Es Kopi Susu Aren",
    price: 18000,
    category: "Milk Base",
    rating: 4.6,
    description:
      "Perpaduan espresso sigap, fresh milk creamy, dan manisnya gula aren murni yang pas di lidah buat nemenin ngoding seharian.",
  },
  {
    id: "3",
    name: "Matcha Latte",
    price: 20000,
    category: "Non-Coffee",
    rating: 4.3,
    description:
      "Bubuk matcha premium berpadu susu lembut dengan aroma khas yang menenangkan pikiran setelah pusing debugging error.",
  },
  {
    id: "4",
    name: "Americano Classic",
    price: 15000,
    category: "Espresso",
    rating: 4.7,
    description:
      "Espresso dengan tambahan air panas yang ringan, bersih, dan cocok dinikmati kapan saja.",
  },
];

export const MENU_CATEGORIES = [
  "All",
  "Espresso",
  "Milk Base",
  "Non-Coffee",
] as const;

export type MenuCategory = (typeof MENU_CATEGORIES)[number];
