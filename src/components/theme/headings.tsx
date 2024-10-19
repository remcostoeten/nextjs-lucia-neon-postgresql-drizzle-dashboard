import React from 'react';
import { twMerge } from 'tailwind-merge';
import { motion, Variants } from 'framer-motion';

interface HProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode;
    spanGradient?: boolean;
    spacingY?: number;
    color?: string;
    fadeIn?: boolean;
}

const fadeInVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
};

const H: React.FC<HProps & { [key: string]: any }> = ({
    children,
    spanGradient = true,
    spacingY = 0,
    color,
    fadeIn = false,
    className,
    ...props
}) => {
    const level = Object.keys(props).find(key => /^[1-6]$/.test(key));
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;

    const gradientClasses = spanGradient
        ? 'bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent'
        : '';

    const colorClass = color ? `text-${color}` : '';
    const spacingClass = `my-${spacingY}`;

    const headingClasses = twMerge(
        'font-bold',
        gradientClasses,
        colorClass,
        spacingClass,
        className
    );

    const MotionTag = motion(Tag);

    const headingContent = spanGradient ? <span>{children}</span> : children;

    return fadeIn ? (
        <MotionTag
            className={headingClasses}
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.5 }}
            {...props}
        >
            {headingContent}
        </MotionTag>
    ) : (
        <Tag className={headingClasses} {...props}>
            {headingContent}
        </Tag>
    );
};

export default H;

// Example Usage and Documentation:
/*
  # H Component (Concise Heading)

  A flexible and customizable heading component for Next.js applications with a concise API.

  ## Features:
  - Concise syntax for heading levels (H 1, H 2, etc.)
  - Semantic HTML structure (h1-h6)
  - Optional gradient text effect
  - Customizable vertical spacing
  - Custom color option
  - Additional class and prop spreading
  - Optional fade-in animation using Framer Motion

  ## Props:
  - 1, 2, 3, 4, 5, or 6: Use one of these numbers as a prop to set the heading level.
  - children: ReactNode - Required. The content of the heading.
  - spanGradient: boolean - Optional. Applies a gradient effect to the text. Default: true.
  - spacingY: number - Optional. Sets vertical margin (my-{value}). Default: 0.
  - color: string - Optional. Sets text color using Tailwind classes (e.g., 'blue-500').
  - fadeIn: boolean - Optional. Enables fade-in animation. Default: false.
  - className: string - Optional. Additional CSS classes.
  - ...props: Any additional props are spread to the heading element.

  ## Examples:

  1. Basic usage:
     <H 1>Welcome to My Website</H>

  2. With gradient disabled and custom color:
     <H 2 spanGradient={false} color="blue-500">About Us</H>

  3. With custom spacing and fade-in animation:
     <H 3 spacingY={4} fadeIn={true}>Our Services</H>

  4. With custom className and additional props:
     <H 4 className="text-center" id="contact-section">Contact Us</H>

  5. Combining multiple options:
     <H 2
       spanGradient={true}
       color="indigo-600"
       spacingY={6}
       fadeIn={true}
       className="text-xl md:text-2xl lg:text-3xl"
     >
       Featured Products
     </H>

  Note: Make sure to have Tailwind CSS and Framer Motion installed and configured in your project.
*/
