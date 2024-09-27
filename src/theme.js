export default {
  primitive: {
    borderRadius: {
      none: "0",
      xs: "2px",
      sm: "4px",
      md: "6px",
      lg: "8px",
      xl: "12px",
    },
    emerald: {
      50: "#ecfdf5",
      100: "#d1fae5",
      200: "#a7f3d0",
      300: "#6ee7b7",
      400: "#34d399",
      500: "#10b981",
      600: "#059669",
      700: "#047857",
      800: "#065f46",
      900: "#064e3b",
      950: "#022c22",
    },
    // ... other color definitions
    slate: {
      50: "#f8fafc",
      100: "#f1f5f9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b",
      600: "#475569",
      700: "#334155",
      800: "#1e293b",
      900: "#0f172a",
      950: "#020617",
    },
    gray: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
      950: "#030712",
    },
  },
  semantic: {
    transitionDuration: "0.2s",
    focusRing: {
      width: "1px",
      style: "solid",
      color: "{primary.color}",
      offset: "2px",
      shadow: "none",
    },
    disabledOpacity: "0.6",
    iconSize: "1rem",
    anchorGutter: "2px",
    primary: {
      50: "red",
      100: "red",
      200: "red",
      300: "red",
      400: "red",
      500: "red",
      600: "red",
      700: "red",
      800: "{emerald.800}",
      900: "{emerald.900}",
      950: "{emerald.950}",
    },
    formField: {
      paddingX: "0.75rem",
      paddingY: "0.5rem",
      borderRadius: "{borderRadius.md}",
      focusRing: {
        width: "0",
        style: "none",
        color: "transparent",
        offset: "0",
        shadow: "none",
      },
      transitionDuration: "{transitionDuration}",
    },
    list: {
      padding: "0.25rem 0.25rem",
      gap: "2px",
      header: {
        padding: "0.5rem 0.75rem 0.25rem 0.75rem",
      },
      option: {
        padding: "0.5rem 0.75rem",
        borderRadius: "{borderRadius.sm}",
      },
      optionGroup: {
        padding: "0.5rem 0.75rem",
        fontWeight: "600",
      },
    },
    content: {
      borderRadius: "{borderRadius.md}",
    },
    mask: {
      transitionDuration: "0.15s",
    },
    navigation: {
      list: {
        padding: "0.25rem 0.25rem",
        gap: "2px",
      },
      item: {
        padding: "0.5rem 0.75rem",
        borderRadius: "{borderRadius.sm}",
      },
    },
    // Add more component customizations here...
  },
  component: {
    accordion,
    // Include other components here...
  },
};
