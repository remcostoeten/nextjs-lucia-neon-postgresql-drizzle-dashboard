const prefix = "/design-system";

export const designSystemItems = [
  { href: "/notice", label: "Notice block", alias: "Notice block" },

].map((item) => ({ ...item, href: `${prefix}${item.href}` }));
