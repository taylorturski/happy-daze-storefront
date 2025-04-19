"use client";

import {createContext, useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";

export type Step =
  | "material"
  | "headshape"
  | "finish"
  | "face"
  | "neck"
  | "alignment";

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
  const searchParams = useSearchParams();

  const setSelection = (step: Step, value: string) => {
    setSelections((prev) => ({...prev, [step]: value}));
  };

  useEffect(() => {
    const headshapeParam = searchParams.get("headshape");
    if (headshapeParam && !selections.headshape) {
      setSelection("headshape", headshapeParam);
    }
  }, [searchParams, selections.headshape]);

  return (
    <BuildContext.Provider value={{selections, setSelection}}>
      {children}
    </BuildContext.Provider>
  );
}
