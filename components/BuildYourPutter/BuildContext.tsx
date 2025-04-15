"use client";

import {createContext, useState} from "react";

type Step = "material" | "headshape" | "finish" | "face" | "neck" | "alignment";

type BuildSelections = {
  [key in Step]?: string;
};

type BuildContextType = {
  selections: BuildSelections;
  setSelection: (step: Step, value: string) => void;
};

export const BuildContext = createContext<BuildContextType>({
  selections: {},
  setSelection: () => {},
});

export function BuildProvider({children}: {children: React.ReactNode}) {
  const [selections, setSelections] = useState<BuildSelections>({});

  const setSelection = (step: Step, value: string) => {
    setSelections((prev) => ({...prev, [step]: value}));
  };

  return (
    <BuildContext.Provider value={{selections, setSelection}}>
      {children}
    </BuildContext.Provider>
  );
}
