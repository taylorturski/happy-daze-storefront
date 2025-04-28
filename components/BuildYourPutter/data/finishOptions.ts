import {BuildOption} from "../types";

export const finishes: (BuildOption & {material: "carbon" | "stainless"})[] = [
  {
    id: "Satin Carbon",
    label: "Satin",
    image: "/builder/finish/satin-carbon.JPG",
    material: "carbon",
  },
  {
    id: "Torched Oil Quench",
    label: "Torched Oil Quench (+$100)",
    image: "/builder/finish/torched-oil-quench.jpg",
    material: "carbon",
  },
  {
    id: "Japanese Brown Oxide",
    label: "Japanese Brown Oxide (+$100)",
    image: "/builder/finish/japanese-brown-oxide.JPG",
    material: "carbon",
  },
  {
    id: "Black Oxide",
    label: "Black Oxide (+$100)",
    image: "/builder/finish/black-oxide.JPG",
    material: "carbon",
  },
  {
    id: "Satin Stainless",
    label: "Satin",
    image: "/builder/finish/satin-stainless.JPG",
    material: "stainless",
  },
  {
    id: "Torched Gold",
    label: "Torched Gold (+$100)",
    image: "/builder/finish/torched-gold.jpg",
    material: "stainless",
  },
];
