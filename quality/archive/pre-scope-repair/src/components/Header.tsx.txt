"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, ChevronRight, Menu, Search, Sparkles, Sprout, X } from "lucide-react";
import { guidePages } from "@/data/pages";
import { navItems, site } from "@/data/site";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === "Escape") {
        setSearchOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return guidePages.slice(0, 7);
    return guidePages
      .filter((page) => `${page.title} ${page.description}`.toLowerCase().includes(normalized))
      .slice(0, 9);
  }, [query]);

  return (
    <>
      <header className="site-header">
        <div className="page-shell flex h-16 items-center justify-between gap-3">
          <Link href="/" className="brand-lockup" aria-label="Worm Capitalist Guide home">
            <span className="brand-mark"><Sprout className="h-5 w-5" /></span>
            <span className="min-w-0">
              <span className="brand-name">Worm Capitalist</span>
              <span className="brand-kicker">Demo guide</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={`nav-link ${pathname === item.href ? "active" : ""}`}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href={site.officialUrl} target="_blank" rel="noopener noreferrer" className="header-official">
              Official game <ArrowUpRight className="h-4 w-4" />
            </a>
            <button type="button" onClick={() => setSearchOpen(true)} className="header-action" aria-label="Search the guide" title="Search the guide">
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Search</span>
            </button>
            <button type="button" onClick={() => setMenuOpen((open) => !open)} className="icon-button xl:hidden" aria-label="Toggle navigation" aria-expanded={menuOpen}>
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {menuOpen ? (
          <div className="mobile-menu xl:hidden">
            <div className="page-shell grid gap-2 sm:grid-cols-2">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="mobile-nav-link">
                  {item.label}<ChevronRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </header>

      {searchOpen ? (
        <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Guide search">
          <div className="search-dialog">
            <div className="search-field-row">
              <Search className="h-5 w-5 shrink-0 text-lilac-700" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search upgrades, rebirth, automation..." className="search-field" autoFocus />
              <button type="button" onClick={() => setSearchOpen(false)} className="icon-button border-0" aria-label="Close search"><X className="h-5 w-5" /></button>
            </div>
            <div className="search-results">
              {results.length ? results.map((page) => (
                <Link key={page.slug} href={`/${page.slug}/`} onClick={() => setSearchOpen(false)} className="search-result">
                  <span className="search-result-icon"><Sparkles className="h-4 w-4" /></span>
                  <span className="min-w-0">
                    <strong>{page.title}</strong>
                    <small>{page.description}</small>
                  </span>
                  <ChevronRight className="ml-auto h-4 w-4 shrink-0" />
                </Link>
              )) : <p className="search-empty">No matching guide page.</p>}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
