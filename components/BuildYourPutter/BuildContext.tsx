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
};

export type BuildContextType = {
  selections: BuildSelections;
  setSelection: (step: Step, value: string) => void;
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
  const [subscribed, setSubscribed] = useState(false);
  const searchParams = useSearchParams();

  const setSelection = (step: Step, value: string) => {
    setSelections((prev) => ({...prev, [step]: value}));
  };

  useEffect(() => {
    const headshapeParam = searchParams.get("headshape");
    if (headshapeParam && !selections.headshape) {
      setSelection("headshape", headshapeParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <BuildContext.Provider
      value={{selections, setSelection, subscribed, setSubscribed}}>
      {children}
    </BuildContext.Provider>
  );
}
