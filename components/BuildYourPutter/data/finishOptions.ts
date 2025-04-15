import {BuildOption} from "../types";

export const finishes: (BuildOption & {material: "carbon" | "stainless"})[] = [
  {
    id: "Satin Carbon",
    label: "Satin",
    image: "/build/finishes/satin_carbon.png",
    material: "carbon",
  },
  {
    id: "Torched Oil Quench",
    label: "Torched Oil Quench (+$100)",
    image: "/build/finishes/torched_oil_quench.png",
    material: "carbon",
  },
  {
    id: "japanese-brown",
    label: "Japanese Brown Oxide (+$100)",
    image: "/build/finishes/japanese_brown.png",
    material: "carbon",
  },
  {
    id: "black-oxide",
    label: "Black Oxide (+$100)",
    image: "/build/finishes/black_oxide.png",
    material: "carbon",
  },
  {
    id: "satin-stainless",
    label: "Satin",
    image: "/build/finishes/satin_stainless.png",
    material: "stainless",
  },
  {
    id: "torched-gold",
    label: "Torched Gold (+$100)",
    image: "/build/finishes/torched_gold.png",
    material: "stainless",
  },
];
