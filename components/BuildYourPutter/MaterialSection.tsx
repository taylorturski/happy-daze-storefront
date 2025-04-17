"use client";

import {useContext} from "react";
import {BuildContext} from "./BuildContext";
import {materials} from "./data/materials";
import {BuildOption} from "./types";

export default function MaterialSection() {
  const {selections, setSelection} = useContext(BuildContext);
  const selected = selections.material;

  return (
    <section className="p-8 border-t border-white">
      <h2 className="text-2xl font-bold uppercase mb-4">
        Steel Type & Pricing
      </h2>
      <p className="mb-6 max-w-2xl">
        We offer two types of steel: <strong>Carbon</strong> and{" "}
        <strong>Stainless</strong>. Carbon steel gives you more finish options —
        but can patina over time. Stainless stays bright and resists rust.
        Torched finishes cost +$100.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {materials.map((option: BuildOption) => (
          <div
            key={option.id}
            onClick={() => setSelection("material", option.id)}
            className={`cursor-pointer border-2 ${
              selected === option.id ? "border-green-500" : "border-white"
            }`}>
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={option.image}
                alt={option.label}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="p-4">
              <p className="text-lg font-bold">{option.label}</p>
              <ul className="text-sm mt-2">
                {option.id === "carbon" && (
                  <>
                    <li>
                      Available finishes: Satin, Gun Blue, Oil Quench, Japanese
                      Brown Oxide
                    </li>
                    <li>+ $100 for custom finish</li>
                  </>
                )}
                {option.id === "stainless" && (
                  <>
                    <li>Available finishes: Satin, Torched Gold</li>
                    <li>+ $100 for torched finish</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
