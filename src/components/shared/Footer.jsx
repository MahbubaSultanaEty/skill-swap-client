"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Mail,
} from "lucide-react";
import { LogoGithub, LogoLinkedin } from "@gravity-ui/icons";
import { usePathname } from "next/navigation";

export default function Footer() {
  const quickLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Browse Tasks",
      href: "/tasks",
    },
    {
      name: "Browse Freelancers",
      href: "/freelancers",
    },
  ];

  const accountLinks = [
    {
      name: "Dashboard",
      href: "/dashboard/client",
    },
    {
      name: "Profile",
      href: "/profile",
    },
    {
      name: "Login",
      href: "/login",
    },
  ];

   const pathname = usePathname()
  if(pathname.includes('dashboard') || pathname.includes('auth')){
    return null;
  }

  return (
    <footer className=" border-t-4 border-[#22c55e] bg-[#205c37] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo & About */}
          <div>
            <Image
              src="/footer-logo.png"
              alt="SkillSwap"
              width={180}
              height={60}
              className="mb-4"
            />

            <p className="text-sm leading-7 text-green-100">
              Connect with skilled freelancers,
              post micro-tasks, collaborate
              efficiently, and get work done
              faster with SkillSwap.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              Quick Links
            </h3>

            <div className="space-y-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-green-100 transition hover:text-green-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Account */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              Account
            </h3>

            <div className="space-y-3">
              {accountLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-green-100 transition hover:text-green-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              Contact
            </h3>

            <div className="space-y-4">
              <a
                href="mailto:support@skillswap.com"
                className="flex items-center gap-2 text-green-100 hover:text-green-300"
              >
                <Mail size={18} />
                support@skillswap.com
              </a>

              <div className="flex items-center gap-4 pt-2">
                {/* X */}
                <a
                  href="#"
                  className="rounded-full border border-green-500 p-2 transition hover:bg-green-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.847h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.153h7.594l5.243 6.932z" />
                  </svg>
                </a>

                <a
                  href="#"
                  className="rounded-full border border-green-500 p-2 transition hover:bg-green-600"
                >
                  <LogoGithub size={18} />
                </a>

                <a
                  href="#"
                  className="rounded-full border border-green-500 p-2 transition hover:bg-green-600"
                >
                  <LogoLinkedin size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-green-700 pt-6">
          <div className="flex flex-col items-center justify-between gap-3 text-sm text-green-100 md:flex-row">
            <p>
              © {new Date().getFullYear()} SkillSwap.
              All rights reserved.
            </p>

            <p>
              Built for freelancers & clients.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}