import { Sparkle, Star, StarHalf } from "lucide-react";
import Hero from "./components/hero";
import Brand from "./components/brand";
import Products from "./components/products";

export default function Home() {
  return (
    <div className="bg-white">
      <Hero />
      <Brand />
      <Products />
    </div>
  );
}
