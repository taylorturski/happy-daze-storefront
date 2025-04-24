export type ProductDescription = {
  title: string;
  html: string;
};

const productDescriptions: Record<string, ProductDescription> = {
  trebek: {
    title: "Trebek",
    html: `
      <p>
      Our take on the most timeless blade in golf. If you’ve ever gamed a Newport or an Anser, this is the silhouette.</p>
      <ul>
        <li>Classic heel-toe weighted blade</li>
        <li>Medium toe hang (depending on neck) — built for slight arc strokes</li>
        <li>Basically every major champion in the 90s used this shape</li>
        <li>You’ll hit one putt and go “oh yeah, that’s the one”</li>
      </ul>

      <p><strong>Note:</strong><br />
      Every putter ships <strong>fully built</strong> — cut to your length, with grip and headcover included.</p>
    `,
  },

  carman: {
    title: "Carman",
    html: `
      <p>
      A wider-bodied blade for players who want a little more beef behind the ball. It’s stable, sleek, and sits like a weapon behind your line.</p>
      <ul>
        <li>Fuller body design adds forgiveness and mass</li>
        <li>Tour-inspired silhouette with a modern touch</li>
        <li>Stays square through impact like it knows your tempo</li>
        <li>The kind of putter that earns a nickname</li>
      </ul>

      <p><strong>Note:</strong><br />
      Every putter ships <strong>fully built</strong> — cut to your length, with grip and headcover included.</p>
    `,
  },

  wesley: {
    title: "Wesley",
    html: `
      <p>
      A rounded, compact almost-mallet feel that’s still a straight blade. If you like a round look but want all the feel of a blade, Wesley's the one.</p>
      <ul>
        <li>Rounded shape with perimeter weighting</li>
        <li>Extremely balanced at address</li>
        <li>Looks like a blade, feels like a blade</li>
        <li>Pairs well with flownecks and long flownecks</li>
        <li>Named after someone you probably wouldn’t bet against</li>
      </ul>

      <p><strong>Note:</strong><br />
      Every putter ships <strong>fully built</strong> — cut to your length, with grip and headcover included.</p>
    `,
  },

  "the-local-snapback": {
    title: "The Local Snapback",
    html: `
      <p>
      A classic unstructured 5-panel hat. No frills, just the right fit. Embroidered with our staple Happy Daze badge.</p>
      <ul>
        <li>5-panel construction with low crown</li>
        <li>Adjustable snapback for one-size-fits-most</li>
        <li>Unstructured fit — lays low, looks better broken in</li>
        <li>Custom Happy Daze embroidery (by us, by hand, jk)</li>
        <li>Worn by at least 3 guys who claim to have shot 68 once</li>
        <li>Guaranteed to get you a nod at the local muni</li>
      </ul>
    `,
  },
};

export default productDescriptions;
