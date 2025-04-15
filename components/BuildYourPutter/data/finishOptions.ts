import {BuildOption} from "../types";

export const finishes: (BuildOption & {material: "carbon" | "stainless"})[] = [
  {
    id: "satin-carbon",
    label: "Satin (Carbon)",
    image: "/build/finishes/satin_carbon.png",
    material: "carbon",
  },
  {
    id: "oil-quench",
    label: "Torched Oil Quench",
    image: "/build/finishes/torched_oil_quench.png",
    material: "carbon",
  },
  {
    id: "japanese-brown",
    label: "Japanese Brown Oxide",
    image: "/build/finishes/japanese_brown.png",
    material: "carbon",
  },
  {
    id: "black-oxide",
    label: "Black Oxide",
    image: "/build/finishes/black_oxide.png",
    material: "carbon",
  },
  {
    id: "satin-stainless",
    label: "Satin (Stainless)",
    image: "/build/finishes/satin_stainless.png",
    material: "stainless",
  },
  {
    id: "torched-gold",
    label: "Torched Gold",
    image: "/build/finishes/torched_gold.png",
    material: "stainless",
  },
];
