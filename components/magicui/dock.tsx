"use client";

import React, { useRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, MotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string;
  magnification?: number;
  distance?: number;
  direction?: "top" | "middle" | "bottom";
  children: React.ReactNode;
  orientation?: "horizontal" | "vertical";
}

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

const dockVariants = cva(
  "mx-auto w-max mt-8 h-[58px] p-2 flex gap-2 rounded-2xl shadow-md border border-slate-200 supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 backdrop-blur-md dark:border-slate-800 bg-white/10 dark:bg-black/10"
);

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      magnification = DEFAULT_MAGNIFICATION,
      distance = DEFAULT_DISTANCE,
      direction = "bottom",
      orientation = "horizontal",
      ...props
    },
    ref
  ) => {
    // ✅ Hooks must be defined at the top level
    const mouseX = useSpring(Infinity);
    const mouseY = useSpring(Infinity);

    const renderChildren = () => {
      return React.Children.map(children, (child) => {
        if (React.isValidElement<DockIconProps>(child)) {
          return React.cloneElement(child, {
            mouseX,
            mouseY,
            magnification,
            distance,
          } as Partial<DockIconProps>);
        }
        return child;
      });
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e) => {
          mouseX.set(e.clientX);
          mouseY.set(e.clientY);
        }}
        onMouseLeave={() => {
          mouseX.set(Infinity);
          mouseY.set(Infinity);
        }}
        {...props}
        className={cn(dockVariants({ className }), {
          "items-start": direction === "top",
          "items-center": direction === "middle",
          "items-end": direction === "bottom",
          "flex-col h-max": orientation === "vertical",
          "flex-row": orientation === "horizontal",
        })}
      >
        {renderChildren()}
      </motion.div>
    );
  }
);
Dock.displayName = "Dock";

export interface DockIconProps {
  size?: number;
  magnification?: number;
  distance?: number;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  className?: string;
  children?: React.ReactNode;
  orientation?: "horizontal" | "vertical";
}

const DockIcon = ({
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  mouseX,
  mouseY,
  className,
  children,
  ...props
}: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // ✅ Hooks always run at the top level
  const distanceHeightCalc = useTransform(mouseY, (val) => {
    const bounds = ref.current?.getBoundingClientRect();
    return bounds ? val - bounds.y - bounds.height / 2 : 0;
  });

  const distanceWidthCalc = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect();
    return bounds ? val - bounds.x - bounds.width / 2 : 0;
  });

  const heightSync = useTransform(
    distanceHeightCalc,
    [-distance, 0, distance],
    [40, magnification, 40]
  );

  const widthSync = useTransform(
    distanceWidthCalc,
    [-distance, 0, distance],
    [40, magnification, 40]
  );

  const height = useSpring(heightSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ height, width }}
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

DockIcon.displayName = "DockIcon";

export { Dock, DockIcon, dockVariants };
