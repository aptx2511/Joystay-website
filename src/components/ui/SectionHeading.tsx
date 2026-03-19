interface SectionHeadingProps {
  tag?: string;
  title: string;
  titleItalic?: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  tag,
  title,
  titleItalic,
  subtitle,
  center = false,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={center ? "text-center" : ""}>
      {tag && (
        <span className={`section-tag mb-4 block ${light ? "text-joy-green-light" : ""}`}>
          {tag}
        </span>
      )}
      <h2 className={`font-serif text-display-lg font-light leading-tight text-balance
        ${light ? "text-white" : "text-joy-ink"}`}>
        {title}
        {titleItalic && (
          <>
            {" "}
            <em className={`italic font-light not-italic
              ${light ? "text-joy-green-light" : "text-joy-green"}`}
              style={{ fontStyle: "italic" }}>
              {titleItalic}
            </em>
          </>
        )}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base leading-relaxed max-w-xl
          ${center ? "mx-auto" : ""}
          ${light ? "text-white/60" : "text-joy-muted"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
