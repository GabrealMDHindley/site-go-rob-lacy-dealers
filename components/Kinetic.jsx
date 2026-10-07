// Per-word heading reveal (Train & Scale's KineticText), server-rendered.
// `text` may contain *starred* words, which render in the gold gradient.
export default function Kinetic({ as: Tag = "h2", text, className = "", delay = 0, id }) {
  const words = text.split(" ");
  return (
    <Tag id={id} className={`kinetic ${className}`} style={{ "--d": `${delay}ms` }} aria-label={text.replace(/\*/g, "")}>
      {words.map((w, i) => {
        const gold = w.startsWith("*") && w.replace(/[.,!?—]+$/, "").endsWith("*");
        const clean = w.replace(/\*/g, "");
        return (
          <span key={i} aria-hidden="true">
            <span className={`kw${gold ? " gold-text" : ""}`} style={{ "--i": i }}>{clean}</span>
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </Tag>
  );
}
