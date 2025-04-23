import {ReactNode} from "react";

export const stepDescriptions: Record<
  "material" | "headshape" | "finish" | "face" | "neck" | "alignment",
  {
    body: ReactNode;
    bullets?: ReactNode[];
  }
> = {
  material: {
    body: <></>,
    bullets: [
      <span key="carbon">
        <strong>Carbon</strong> – softer feel, more finish options, will
        age(patina) over time
      </span>,
      <span key="stainless">
        <strong>Stainless</strong> – clickier feel, shinier, resists rust
        forever
      </span>,
    ],
  },
  headshape: {
    body: (
      <>
        What fits your eye. There’s no <em>correct</em> shape here—just what
        makes you feel locked in at address. Some frame the ball tighter, others
        give you room. Trust your gut.
      </>
    ),
  },
  finish: {
    body: (
      <>
        All style, no rules. Finish won’t affect your stroke—but it{" "}
        <em>will</em> affect how cool it looks in your bag. Go with whatever
        fits <em>your</em> story.
      </>
    ),
  },
  face: {
    body: (
      <>
        Feel lives here. Face milling controls feedback —{" "}
        <strong>more milling</strong> gives you a <strong>softer feel</strong>,{" "}
        <strong>less milling</strong> gives you a <strong>firmer click</strong>.
        Subtle? Sure. But <em>you'll notice</em>.
      </>
    ),
  },
  neck: {
    body: (
      <>
        This one's about <strong>toe hang</strong>,{" "}
        <strong>face balance</strong>, and choosing a setup that matches your
        stroke.
      </>
    ),
    bullets: [
      <span key="plumbers">
        <strong>Plumbers Neck</strong> – traditional setup with some toe hang.
        Ideal for slight arc strokes.
      </span>,
      <span key="flowneck">
        <strong>Flowneck</strong> – more toe hang. Lets the face open and close
        more through the stroke. Arcy boys only.
      </span>,
      <span key="longneck">
        <strong>Longneck</strong> – more face-balanced. Better for
        straight-back, straight-through putting. Quiet hands, steady path.
      </span>,
    ],
  },
  alignment: {
    body: (
      <>
        Dot? Line? Nothing at all? Alignment is all <em>personal</em>. This is
        what helps you aim, commit, and roll it how you see it. Want laser
        focus? Go line. Want clean vibes? Go blank. Nobody's judging.
      </>
    ),
  },
};
