import React, { useId, useState } from "react";

type Direction = "top" | "right" | "bottom" | "left";

export interface TooltipProps {
  message: React.ReactNode;
  direction?: Direction;
  className?: string;
  ariaLabel?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  message,
  direction = "top",
  className = "",
  ariaLabel,
}) => {
  const id = useId();
  const [open, setOpen] = useState(false);

  const base = {
    container: {
      display: "inline-block",
      position: "relative" as const,
    },
    button: {
      width: 28,
      height: 28,
      borderRadius: 6,
      border: "1px solid #ccc",
      background: "#fff",
      cursor: "pointer",
      padding: 0,
      lineHeight: "28px",
      textAlign: "center" as const,
      fontWeight: 700,
    },
    tooltip: {
      position: "absolute" as const,
      padding: "8px 10px",
      background: "#222",
      color: "#fff",
      fontSize: 13,
      borderRadius: 6,
      whiteSpace: "nowrap" as const,
      opacity: open ? 1 : 0,
      pointerEvents: "none" as const,
      transition: "opacity 150ms ease, transform 150ms ease",
      zIndex: 1000,
      transformOrigin: "center",
    },
    arrow: {
      position: "absolute" as const,
      width: 10,
      height: 10,
      background: "#222",
      transform: "rotate(45deg)",
    },
  };

  const placements: Record<
    Direction,
    {
      tooltip: React.CSSProperties;
      arrow: React.CSSProperties;
    }
  > = {
    top: {
      tooltip: {
        left: "50%",
        bottom: "calc(100% + 8px)",
        transform: open ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(4px)",
      },
      arrow: {
        left: "50%",
        bottom: -5,
        transform: "translateX(-50%) rotate(45deg)",
      },
    },
    bottom: {
      tooltip: {
        left: "50%",
        top: "calc(100% + 8px)",
        transform: open ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(-4px)",
      },
      arrow: {
        left: "50%",
        top: -5,
        transform: "translateX(-50%) rotate(45deg)",
      },
    },
    left: {
      tooltip: {
        right: "calc(100% + 8px)",
        top: "50%",
        transform: open ? "translateY(-50%) translateX(0)" : "translateY(-50%) translateX(4px)",
      },
      arrow: {
        right: -5,
        top: "50%",
        transform: "translateY(-50%) rotate(45deg)",
      },
    },
    right: {
      tooltip: {
        left: "calc(100% + 8px)",
        top: "50%",
        transform: open ? "translateY(-50%) translateX(0)" : "translateY(-50%) translateX(-4px)",
      },
      arrow: {
        left: -5,
        top: "50%",
        transform: "translateY(-50%) rotate(45deg)",
      },
    },
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  };

  return (
    <span style={base.container} className={className}>
      <button
        type="button"
        aria-describedby={id}
        aria-label={ariaLabel ?? "More information"}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={onKeyDown}
        style={base.button}
      >
        ?
      </button>

      <div
        id={id}
        role="tooltip"
        style={{ ...base.tooltip, ...placements[direction].tooltip }}
      >
        <div style={{ ...placements[direction].arrow, ...base.arrow }} />
        {message}
      </div>
    </span>
  );
}

export default Tooltip;