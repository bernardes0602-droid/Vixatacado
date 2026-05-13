export type UserRole = "guest" | "admin" | "manager" | "seller" | "customer";

export type OrderStatus =
  | "quote_sent"
  | "review"
  | "confirmed"
  | "invoiced"
  | "separation"
  | "sent"
  | "transport"
  | "delivered"
  | "cancelled";

export type Product = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  sku: string;
  internalCode: string;
  manufacturerCode: string;
  category: string;
  subcategory: string;
  brand: string;
  automaker: string;
  model: string;
  yearStart: number;
  yearEnd: number;
  applications: string[];
  crossReferences: string[];
  specifications: Record<string, string>;
  dimensions: {
    weightKg: number;
    heightCm: number;
    widthCm: number;
    lengthCm: number;
  };
  stock: number;
  price: number;
  promoPrice?: number;
  featured: boolean;
  novelty: boolean;
  bestSeller: boolean;
  priority: number;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  image: string;
  gallery: string[];
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Customer = {
  id: string;
  name: string;
  company: string;
  document: string;
  phone: string;
  email: string;
  password: string;
  status: "pending" | "approved" | "blocked";
  sellerId?: string;
  city: string;
  segment: string;
};

export type TestLogin = {
  id: string;
  label: string;
  role: Exclude<UserRole, "guest">;
  login: string;
  password: string;
  target: string;
  customerId?: string;
};

export type Seller = {
  id: string;
  name: string;
  phone: string;
  email: string;
  managerId?: string;
};

export type Order = {
  id: string;
  customerId: string;
  sellerId: string;
  status: OrderStatus;
  total: number;
  freight: number;
  carrier: string;
  trackingCode: string;
  trackingUrl: string;
  deliveryEstimate: string;
  createdAt: string;
  items: Array<{
    sku: string;
    name: string;
    quantity: number;
    price: number;
  }>;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  status: "draft" | "published";
  image: string;
};

export type Banner = {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  image: string;
  active: boolean;
  order: number;
};

export type Policy = {
  slug: string;
  title: string;
  summary: string;
  sections: Array<{
    heading: string;
    text: string;
  }>;
};
