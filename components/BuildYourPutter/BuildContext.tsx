"use client";

import {createContext, useContext, useState, ReactNode} from "react";

type BuildSelections = {
  material: string | null;
  headshape: string | null;
  finish: string | null;
  face: string | null;
  neck: string | null;
  alignment: string | null;
};

type BuildContextType = {
  selections: BuildSelections;
  updateSelection: (step: keyof BuildSelections, value: string) => void;
};

const BuildContext = createContext<BuildContextType | undefined>(undefined);

export function useBuild() {
  const context = useContext(BuildContext);
  if (!context) {
    throw new Error("useBuild must be used within a BuildProvider");
  }
  return context;
}

export function BuildProvider({children}: {children: ReactNode}) {
  const [selections, setSelections] = useState<BuildSelections>({
    material: null,
    headshape: null,
    finish: null,
    face: null,
    neck: null,
    alignment: null,
  });

  const updateSelection = (step: keyof BuildSelections, value: string) => {
    setSelections((prev) => ({
      ...prev,
      [step]: value,
    }));
  };

  return (
    <BuildContext.Provider value={{selections, updateSelection}}>
      {children}
    </BuildContext.Provider>
  );
}
