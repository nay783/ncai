export function PageHero({ label, title, body }: { label: string; title: string; body?: string }) {
  return (
    <section className="on-dark relative overflow-hidden pb-[clamp(3.5rem,8vw,7rem)] pt-[clamp(9rem,18vw,14rem)]">
      <div className="wrap relative">
        <p className="label">{label}</p>
        <h1 className="type-mega mt-6 max-w-[14ch]">{title}</h1>
        {body ? <p className="muted type-lead mt-8 max-w-[44ch]">{body}</p> : null}
      </div>
    </section>
  );
}
