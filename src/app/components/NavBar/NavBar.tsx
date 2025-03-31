'use client'

import {
  CalendarIcon,
  NumberedListIcon
} from "@heroicons/react/24/outline";
import Link from "next/link"
import { usePathname } from "next/navigation";
import clsx from 'clsx';

const links = [
  {
    href: "/general",
    label: "Resultaten & Programma",
    icon: CalendarIcon
  },
  {
    href: "/standen/jeugd",
    label: "Standen jeugd",
    icon: NumberedListIcon
  },
  {
    href: "/standen/senioren",
    label: "Standen senioren",
    icon: NumberedListIcon
  }
]

export default function NavBar() {
  const pathname = usePathname();
  return (
    <nav className="">
      <ul className="flex gap-8 font-semibold text-gray-800">
        {links.map((link, index) => {
          const LinkIcon = link.icon;
          return (
            <li key={index}>
              <Link href={link.href} className={clsx("flex gap-2 rounded-full px-3 py-2 border-0 ld:text-base overflow-scroll items-start lg:items-center",
                {
                  "bg-gray-800 border border-gray-800 text-gray-100": pathname === link.href
                }
              )}>
                <LinkIcon className="w-6 mt-1 lg:mt-0" />
                {link.label}
              </Link>
            </li>
          );
        }
        )}
      </ul>
    </nav>
  )
}

export { links }
