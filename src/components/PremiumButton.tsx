"use client";

import React from "react";
import Link from "next/link";

export type PremiumButtonVariant = "primary" | "outline" | "ghost" | "accent";
export type PremiumButtonSize = "sm" | "md" | "lg";

const sizeClasses: Record<PremiumButtonSize, string> = {
  sm: "px-4 py-2 text-xs sm:text-sm",
  md: "px-6 py-2.5 text-sm sm:text-base",
  lg: "px-8 py-3.5 text-base sm:text-lg",
};

const variantClasses: Record<PremiumButtonVariant, string> = {
  primary: "premium-btn premium-btn-primary",
  outline: "premium-btn premium-btn-outline",
  ghost: "premium-btn premium-btn-ghost",
  accent: "premium-btn premium-btn-accent",
};

type CommonProps = {
  variant?: PremiumButtonVariant;
  size?: PremiumButtonSize;
  className?: string;
  children: React.ReactNode;
};

type ButtonProps = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type LinkProps = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

export type PremiumButtonProps = ButtonProps | LinkProps;

function mergeClasses(...parts: (string | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

export default function PremiumButton(props: PremiumButtonProps) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = mergeClasses(variantClasses[variant], sizeClasses[size], className);

  const content = (
    <>
      <span className="premium-btn-glow" aria-hidden />
      <span className="premium-btn-shine" aria-hidden />
      <span className="relative z-10 inline-flex items-center justify-center gap-2">{children}</span>
    </>
  );

  if ("href" in props && props.href) {
    const { href, target, rel, onClick } = props;
    const isExternal = href.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          target={target ?? "_blank"}
          rel={rel ?? "noopener noreferrer"}
          className={classes}
          onClick={onClick}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }

  const { type = "button", disabled, onClick, ...rest } = props as ButtonProps;
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={classes} {...rest}>
      {content}
    </button>
  );
}
