"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { HomeIcon, MailIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/seperator"; // ✅ Fixed Import Path
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { Moon, Sun, Github, Linkedin } from "lucide-react";
import { useTheme } from "next-themes";

export type IconProps = React.HTMLAttributes<SVGElement>;

const DATA = {
  navbar: [{ href: "#", icon: HomeIcon, label: "Home" }],
  contact: {
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/Teresamuhiu",
        icon: Github, // ✅ Directly use Lucide icons
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/teresamuhiu/",
        icon: Linkedin,
      },
      Email: {
        name: "Email",
        url: "mailto:muhiutw9@gmail.com",
        icon: MailIcon,
      },
    },
  },
};

// ✅ FIXED: Theme Toggle Hydration Error
const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-[1.2rem] w-[1.2rem]" />; // Placeholder

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-12 rounded-full flex items-center justify-center"
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
    >
      {resolvedTheme === "light" ? <Moon className="size-6" /> : <Sun className="size-6" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export function CustomDock() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1050);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={
        !isMobile
          ? "fixed left-40 top-0 bottom-0 w-24 flex items-center"
          : "fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center"
      }
    >
      <TooltipProvider>
        <Dock direction="middle" orientation={isMobile ? "horizontal" : "vertical"}>
          {/* ✅ Navigation Icons */}
          {DATA.navbar.map((item) => (
            <DockIcon key={item.label}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "size-12 rounded-full")}
                  >
                    <item.icon className="size-6" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}

          <Separator orientation={!isMobile ? "horizontal" : "vertical"} />

          {/* ✅ FIXED: Social Icons - Directly Render SVG */}
          {Object.entries(DATA.contact.social).map(([name, social]) => (
            <DockIcon key={name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "size-12 rounded-full")}
                  >
                    <social.icon className="size-6" /> {/* ✅ Directly Render Icons */}
                  </a>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{name}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}

          <Separator orientation={!isMobile ? "horizontal" : "vertical"} />

          {/* ✅ FIXED: Theme Toggle */}
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <ThemeToggle />
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Theme</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        </Dock>
      </TooltipProvider>
    </div>
  );
}
