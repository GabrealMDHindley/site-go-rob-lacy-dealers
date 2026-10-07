// Per-word heading reveal (Train & Scale's KineticText), server-rendered.
// `text` may contain *starred* words or *starred phrases*, rendered in the gold gradient.
export default function Kinetic({ as: Tag = "h2", text, className = "", delay = 0, id }) {
  const words = text.split(" ");
  let open = false;
  const gold = words.map((w) => {
    const starts = w.startsWith("*");
    const ends = w.replace(/[.,!?—]+$/, "").endsWith("*") && (!starts || w.length > 1);
    if (starts) open = true;
    const g = open;
    if (ends) open = false;
    return g;
  });
  return (
    <Tag id={id} className={`kinetic ${className}`} style={{ "--d": `${delay}ms` }}>
      <span className="sr-only">{text.replace(/\*/g, "")}</span>
      {words.map((w, i) => {
        const clean = w.replace(/\*/g, "");
        return (
          <span key={i} aria-hidden="true">
            <span className={`kw${gold[i] ? " gold-text" : ""}`} style={{ "--i": i }}>{clean}</span>
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </Tag>
  );
}
