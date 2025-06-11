"use client";

import {createContext, useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";

export type Step =
  | "overview"
  | "material"
  | "headshape"
  | "finish"
  | "face"
  | "neck"
  | "alignment"
  | "review";

type BuildSelections = {
  [key in Step]?: string;
} & {
  length?: string;
  dexterity?: string;
};

export type BuildContextType = {
  selections: BuildSelections;
  setSelection: (step: keyof BuildSelections, value: string) => void;
  subscribed: boolean;
  setSubscribed: (v: boolean) => void;
};

export const BuildContext = createContext<BuildContextType>({
  selections: {},
  setSelection: () => {},
  subscribed: false,
  setSubscribed: () => {},
});

export function BuildProvider({children}: {children: React.ReactNode}) {
  const [selections, setSelections] = useState<BuildSelections>({});
  const [subscribed, setSubscribed] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("emailSubscribed") === "true";
    }
    return false;
  });

  const searchParams = useSearchParams();

  const setSelection = (step: keyof BuildSelections, value: string) => {
    setSelections((prev) => ({...prev, [step]: value}));
  };

  useEffect(() => {
    const isSubbed = localStorage.getItem("subscribed") === "true";
    setSubscribed(isSubbed);
  }, []);

  useEffect(() => {
    const headshapeParam = searchParams.get("headshape");
    if (headshapeParam && !selections.headshape) {
      setSelection("headshape", headshapeParam);
    }
  }, [searchParams]);

  return (
    <BuildContext.Provider
      value={{selections, setSelection, subscribed, setSubscribed}}>
      {children}
    </BuildContext.Provider>
  );
}
