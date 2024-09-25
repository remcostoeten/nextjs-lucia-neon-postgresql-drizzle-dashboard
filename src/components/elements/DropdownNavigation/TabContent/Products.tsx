import { ArrowRightIcon } from "lucide-react";
import React from "react";

interface ProductLink {
  name: string;
  href: string;
}

interface ProductCategory {
  name: string;
  links: ProductLink[];
}

const productCategories: ProductCategory[] = [
  {
    name: "Config",
    links: [
      { name: "Theme colors", href: "/design-system/tailwind-colors" },
      { name: "Color tool", href: "/design-system/color-tool" },
    ],
  },
  {
    name: "Showcase",
    links: [
      { name: "Hash & UUID", href: "/design-system/hash" },
      { name: "Spotlight cards", href: "/design-system/card-spotlight" },
      { name: "Ripple", href: "/design-system/ripple" },
    ],
  },
  {
    name: "Components",
    links: [
      { name: "Tag input", href: "/design-system/tag-input" },
      { name: "Edit form", href: "/design-system/edit-action" },
      { name: "Confetti", href: "/design-system/confetti" },
    ],
  },
];

const ProductCategory: React.FC<ProductCategory> = ({ name, links }) => (
  <div>
    <h3 className="mb-2 text-sm text-white font-medium">{name}</h3>
    {links.map((link, index) => (
      <a
        key={index}
        href={link.href}
        className={`block text-sm text-neutral-400 ${
          index !== links.length - 1 ? "mb-1" : ""
        }`}
      >
        {link.name}
      </a>
    ))}
  </div>
);

const Products: React.FC = () => {
  return (
    <div>
      <div className="flex gap-4">
        {productCategories.map((category, index) => (
          <ProductCategory key={index} {...category} />
        ))}
      </div>
      <button className=" mt-4 flex items-center gap-1 text-sm text-indigo-300">
        <span>View more</span>
        <ArrowRightIcon />
      </button>
    </div>
  );
};

export default Products;
