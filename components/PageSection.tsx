import {ReactNode} from "react";

export default function PageSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div style={{padding: "2rem", fontFamily: "monospace"}}>
      <h1 style={{marginBottom: "2rem"}}>{title}</h1>
      {children}
    </div>
  );
}
