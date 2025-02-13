"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { HomeIcon, MailIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/seperator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export type IconProps = React.HTMLAttributes<SVGElement>;

const Icons = {
  email: (props: IconProps) => <MailIcon {...props} />,
  home: (props: IconProps) => <HomeIcon {...props} />,
};

const DATA = {
  navbar: [
    { href: "#", icon: Icons.home, label: "Home" },
  ],
  contact: {
    social: {
      Email: {
        name: "Send Email",
        url: "mailto:muhiutw9@gmail.com",
        icon: Icons.email,
      },
    },
  },
};

export function CustomDock() {
  const { resolvedTheme, setTheme } = useTheme();
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1050);
    };
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
          {/* ✅ Fix: Pass mouseX & mouseY props to DockIcon */}
          {DATA.navbar.map((item, index) => (
            <DockIcon key={index} mouseX={undefined} mouseY={undefined}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12 rounded-full"
                    )}
                  >
                    <item.icon className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}

          <Separator orientation={!isMobile ? "horizontal" : "vertical"} />

          {Object.entries(DATA.contact.social).map(([name, social]) => (
            <DockIcon key={name} mouseX={undefined} mouseY={undefined}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={social.url}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12 rounded-full"
                    )}
                  >
                    <social.icon className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{name}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}

          <Separator orientation={!isMobile ? "horizontal" : "vertical"} />

          <DockIcon mouseX={undefined} mouseY={undefined}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-12 rounded-full flex items-center justify-center"
                >
                  {resolvedTheme === "light" ? (
                    <Moon
                      className="h-[1.2rem] w-[1.2rem] "
                      onClick={() => setTheme("dark")}
                    />
                  ) : (
                    <Sun
                      className="h-[1.2rem] w-[1.2rem] "
                      onClick={() => setTheme("light")}
                    />
                  )}
                  <span className="sr-only">Toggle theme</span>
                </Button>
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
