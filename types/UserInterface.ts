export interface UserI {
  id?: string; // UUID or cuid from DB
  firstName: string;
  lastName: string;
  email: string;
  passwordHash?: string; // only if using credentials provider
  image?: string; // avatar/profile picture
  role: "user" | "admin" | "seller"; // simple role system
  provider?: "google" | "facebook" | "credentials"; // auth provider
  createdAt?: Date;
  updatedAt?: Date;
}
export interface UserProfile extends UserI {
  phone?: string;
  address?: string;
  favorites?: string[]; // product IDs the user liked
}
