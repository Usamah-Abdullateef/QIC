import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cx("mx-auto w-full max-w-7xl px-5 sm:px-8", className)} {...props} />;
}

export function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

const buttonVariants = {
  primary:
    "bg-brand-700 text-paper hover:bg-brand-800 active:bg-brand-900 focus-visible:outline-brand-700",
  secondary:
    "border border-ink/15 text-ink hover:border-ink/30 hover:bg-ink/[0.04] active:bg-ink/[0.07] focus-visible:outline-brand-700",
  gold: "bg-gold-400 text-brand-950 hover:bg-gold-300 active:bg-gold-500 focus-visible:outline-gold-300",
  "outline-light":
    "border border-paper/30 text-paper hover:border-paper/60 hover:bg-paper/10 active:bg-paper/15 focus-visible:outline-gold-300",
};

type ButtonLinkProps = {
  href: string;
  variant?: keyof typeof buttonVariants;
  size?: "md" | "sm";
  children: ReactNode;
  className?: string;
};

/** A link styled as a button. External URLs open in a new tab with an ↗ icon. */
export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  children,
  className,
}: ButtonLinkProps) {
  const external = isExternal(href);
  const classes = cx(
    "group inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2",
    size === "md" ? "h-12 px-6 text-sm" : "h-10 px-5 text-sm",
    buttonVariants[variant],
    className,
  );
  const Icon = external ? ArrowUpRight : ArrowRight;
  const icon = (
    <Icon
      aria-hidden
      className="size-4 transition-transform duration-150 motion-safe:group-hover:translate-x-0.5"
    />
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        {icon}
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
      {icon}
    </Link>
  );
}

/** Understated text link with an arrow, for secondary actions. */
export function ArrowLink({
  href,
  children,
  tone = "dark",
  className,
}: {
  href: string;
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  const external = isExternal(href);
  const classes = cx(
    "group inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4",
    tone === "dark"
      ? "text-brand-700 hover:text-brand-900 focus-visible:outline-brand-700"
      : "text-gold-300 hover:text-gold-200 focus-visible:outline-gold-300",
    className,
  );
  const Icon = external ? ArrowUpRight : ArrowRight;
  const content = (
    <>
      {children}
      <Icon
        aria-hidden
        className="size-4 transition-transform duration-150 motion-safe:group-hover:translate-x-0.5"
      />
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
      {content}
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  ) : (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

export function Eyebrow({
  children,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <p
      className={cx(
        "text-xs font-bold tracking-widest uppercase",
        tone === "dark" ? "text-brand-600" : "text-gold-300",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "dark",
  align = "left",
  as: Heading = "h2",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div
      className={cx(
        "max-w-3xl",
        align === "center" && "mx-auto text-center [&>p:first-child]:justify-center",
        className,
      )}
    >
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <Heading
        className={cx(
          "mt-4 font-display leading-[1.08] tracking-tight text-balance",
          Heading === "h1" ? "text-4xl sm:text-5xl lg:text-6xl" : "text-3xl sm:text-4xl lg:text-5xl",
          tone === "dark" ? "text-ink" : "text-paper",
        )}
      >
        {title}
      </Heading>
      {intro && (
        <p
          className={cx(
            "mt-5 text-lg leading-relaxed text-pretty",
            tone === "dark" ? "text-ink-muted" : "text-paper/75",
            align === "center" && "mx-auto",
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
