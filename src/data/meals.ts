export interface Meal {
  id: string;
  name: string;
  chefName: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  tags: string[];
  imageUrl: string;
}

export const sampleMeals: Meal[] = [
  {
    id: '1',
    name: "Mama's Classic Lasagna",
    chefName: "Maria G.",
    description: "Layers of rich meat sauce, creamy ricotta, and melted mozzarella baked to perfection.",
    price: 250,
    rating: 4.9,
    reviews: 124,
    tags: ["Italian", "Comfort Food", "Contains Dairy"],
    imageUrl: "/image1.jpg"
  },
  {
    id: '2',
    name: "Spicy Thai Basil Chicken",
    chefName: "Chef Niran",
    description: "Authentic Pad Kra Pao with minced chicken, holy basil, and a fried egg over jasmine rice.",
    price: 280,
    rating: 4.8,
    reviews: 89,
    tags: ["Thai", "Spicy", "Dairy-Free"],
    imageUrl: "/image2.jpg"
  },
  {
    id: '3',
    name: "Ragi Mudde and Naati Koli saaru",
    chefName: "Sarah V.",
    description: "Relishing the heart of Karnataka: the rustic duo of wholesome Ragi Mudde and fiery, authentic Nati Koli Saaru.",
    price: 200,
    rating: 4.7,
    reviews: 56,
    tags: ["Healthy", "spicy"],
    imageUrl: "/image3.jpg"
  },
  {
    id: '4',
    name: "Authentic Chicken Tikka Masala",
    chefName: "Raj P.",
    description: "Tender chicken marinated in yogurt and spices, served in a creamy tomato curry with naan.",
    price: 350,
    rating: 5.0,
    reviews: 210,
    tags: ["Indian", "Halal", "Spicy"],
    imageUrl: "/image4.jpg"
  },
  {
    id: '5',
    name: "Homestyle Mac & Cheese",
    chefName: "Auntie Jen",
    description: "Ultra-creamy four-cheese blend baked with a crispy breadcrumb topping.",
    price: 180,
    rating: 4.6,
    reviews: 42,
    tags: ["Vegetarian", "Comfort Food"],
    imageUrl: "/image5.jpg"
  }
];
