"use client";

import * as LuIcons from "react-icons/lu";
import * as FaIcons from "react-icons/fa6";
import * as SiIcons from "react-icons/si";
import { Code2 } from "lucide-react";

interface SanityIcon {
  name?: string;
  provider?: string;
}

interface DynamicIconProps {
  icon?: SanityIcon;
  className?: string;
}

export function DynamicIcon({ icon, className = "size-4 text-purple-400" }: DynamicIconProps) {
  if (!icon?.name) {
    return <Code2 className={className} />;
  }

  const iconName = icon.name;
  const provider = icon.provider;

  let IconComponent: React.ElementType | undefined;

  if (provider === "lu") {
    IconComponent = (LuIcons as Record<string, React.ElementType>)[iconName];
  } else if (provider === "fa") {
    IconComponent = (FaIcons as Record<string, React.ElementType>)[iconName];
  } else if (provider === "si") {
    IconComponent = (SiIcons as Record<string, React.ElementType>)[iconName];
  }

  if (!IconComponent) {
    return <Code2 className={className} />;
  }

  return <IconComponent className={className} />;
}