import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md border border-transparent text-sm font-medium whitespace-nowrap transition-colors outline-none select-none focus-visible:border-alm-accent focus-visible:ring-2 focus-visible:ring-alm-accent/30 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-alm-accent text-[oklch(0.13_0.015_245)] hover:bg-alm-accent/80",
        outline:
          "border-[oklch(0.295_0.020_245)] bg-transparent text-alm-ink-dim hover:text-alm-ink hover:border-[oklch(0.4_0.020_245)]",
        secondary:
          "bg-alm-surface-2 text-alm-ink-dim hover:bg-alm-surface hover:text-alm-ink",
        ghost:
          "text-alm-ink-dim hover:bg-alm-surface-2 hover:text-alm-ink",
        destructive:
          "bg-red-900/30 text-red-400 hover:bg-red-900/50",
        link:
          "text-alm-accent underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-3.5",
        xs:      "h-6 px-2.5 text-xs",
        sm:      "h-8 px-3 text-xs",
        lg:      "h-10 px-4",
        icon:    "size-9",
        "icon-xs": "size-6",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
