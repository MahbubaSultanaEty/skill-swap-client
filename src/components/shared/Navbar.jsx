"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, Users, Info, LayoutDashboard, LogOut, Menu, X, ChevronDown, User } from "lucide-react";


const navLinks = [
  { icon: Search, name: "Browse Tasks", href: "/tasks" },
  { icon: Users, name: "Freelancers", href: "/freelancers" },
  { icon: Info, name: "How It Works", href: "/how-it-works" },
];

export default function Navbar() {
  const pathname = usePathname();
//   const { data: session } = authClient.useSession();
  const user = {};

  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };

  const dashboardHref =
    user?.role === "admin" ? "/dashboard/admin" :
    user?.role === "freelancer" ? "/dashboard/freelancer" :
    "/dashboard/client";

  return (
    <>
      <style>{`
        .navbar { position: sticky; top: 0; z-index: 50; width: 100%; background: rgba(248,250,248,0.95); backdrop-filter: blur(10px); border-bottom: 1px solid #dcfce7; }
        .navbar-inner { max-width: 1280px; margin: 0 auto; height: 64px; display: flex; align-items: center; justify-content: space-between; padding: 0 24px; }
        .nav-middle { display: none; }
        .nav-auth { display: none; }
        .nav-hamburger { display: flex; }
        .nav-mobile { display: block; border-top: 1px solid #dcfce7; background: #fff; padding: 8px 16px 12px; }
        @media (min-width: 768px) {
          .nav-middle { display: flex; align-items: center; gap: 4px; list-style: none; margin: 0; padding: 0; }
          .nav-auth { display: flex; align-items: center; gap: 8px; }
          .nav-hamburger { display: none; }
          .nav-mobile { display: none; }
        }
        .nav-link { display: flex; align-items: center; gap: 6px; padding: 8px 14px; border-radius: 8px; font-size: 13.5px; font-weight: 500; text-decoration: none; color: #6b7280; transition: all 0.15s; }
        .nav-link:hover { background: #f0fdf4; color: #15803d; }
        .nav-link.active { background: #dcfce7; color: #15803d; }
        .dropdown { position: absolute; right: 0; top: calc(100% + 8px); width: 210px; background: #fff; border: 1px solid #dcfce7; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.12); padding: 6px; z-index: 9999; }
        .dropdown-item { display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 8px; font-size: 13px; font-weight: 500; text-decoration: none; color: #374151; transition: background 0.15s; background: none; border: none; cursor: pointer; width: 100%; }
        .dropdown-item:hover { background: #f0fdf4; color: #15803d; }
        .dropdown-item.danger { color: #ef4444; }
        .dropdown-item.danger:hover { background: #fef2f2; }
        .divider { height: 1px; background: #f0fdf4; margin: 4px 0; }
      `}</style>

      <header className="navbar">
        <nav className="navbar-inner">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 no-underline shrink-0">
            <Image src="/logo.png" alt="SkillSwap" width={36} height={36} className="rounded-lg" />
           <span style={{ color: "#14532d" }} className="text-[17px] font-semibold tracking-tight">
  SkillSwap
</span>
          </Link>

          {/* Middle nav */}
          <ul className="nav-middle">
            {navLinks.map(({ icon: Icon, name, href }) => (
              <li key={href}>
                    <Link href={href} className={`nav-link ${pathname === href ? "active" : ""}`}>
                        <Icon size={15} strokeWidth={2} />                      
                  {name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right */}
          <div className="flex items-center gap-2">
            {user ? (
              <div style={{ position: "relative" }} ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((p) => !p)}
                  className="flex items-center gap-1.5 rounded-xl border border-green-200 bg-green-950 px-2 py-1.5 shadow-sm cursor-pointer hover:border-green-400 transition-all"
                >
                  {user.image ? (
                    <Image src={user.image} alt={user.name ?? ""} width={30} height={30} className="rounded-full object-cover" />
                  ) : (
                    <div className="flex size-7 items-center justify-center rounded-full bg-green-800  text-[13px] font-semibold text-green">
                      {user.name?.[0]?.toUpperCase() ?? "U"}
                    </div>
                  )}
                  <ChevronDown size={13} color="green" className={`text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {dropdownOpen && (
                  <div className="dropdown">
                    <div className="px-3 py-2">
                      <p className="text-[13px] font-semibold text-gray-800 truncate">{user.name}</p>
                      <p className="text-[11px] text-gray-400 truncate">{user.email}</p>
                    </div>
                    <div className="divider" />
                    <Link href={dashboardHref} className="dropdown-item">
                      <LayoutDashboard size={15} /> Dashboard
                    </Link>
                    <Link href={`/dashboard/${user?.role}/profile`} className="dropdown-item">
                      <User size={15} /> profile
                    </Link>
                    <div className="divider" />
                    <button onClick={handleLogout} className="dropdown-item danger">
                      <LogOut size={15} /> Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="nav-auth">
                <Link href="/login" className="rounded-lg border border-green-200 px-4 py-2 text-[13.5px] font-medium text-green-800 no-underline hover:bg-green-50 hover:border-green-400 transition-all">
                  Log in
                </Link>
                <Link href="/register" className="rounded-lg bg-green-700 px-4 py-2 text-[13.5px] font-medium text-white no-underline hover:bg-green-800 transition-colors shadow-sm">
                  Sign up
                </Link>
              </div>
            )}

            <button
              onClick={() => setMobileOpen((p) => !p)}
              className="nav-hamburger rounded-lg p-2 border-none bg-transparent text-gray-500 cursor-pointer hover:bg-green-50 hover:text-green-800 transition-colors"
            >
              {mobileOpen ? <X size={20} color="#14532d" /> : <Menu size={20} color="#14532d" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="nav-mobile">
            {navLinks.map(({ icon: Icon, name, href }) => (
              <Link key={href} href={href} className={`nav-link ${pathname === href ? "active" : ""}`} style={{ marginBottom: 2 }}>
                <Icon size={16} /> {name}
              </Link>
            ))}
            {!user && (
              <div className="flex gap-2 mt-3 pt-3 border-t border-green-50">
                <Link href="/login" className="flex-1 text-center rounded-lg border border-green-200 py-2 text-[13.5px] font-medium text-green-800 no-underline">Log in</Link>
                <Link href="/register" className="flex-1 text-center rounded-lg bg-green-700 py-2 text-[13.5px] font-medium text-white no-underline">Sign up</Link>
              </div>
            )}
          </div>
        )}
      </header>
    </>
  );
}