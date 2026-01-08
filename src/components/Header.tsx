import React from "react";
import { NavLink } from "react-router-dom";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `font-medium transition-colors ${
      isActive ? "text-[#0A0D12]" : "text-[#717680] hover:text-[#0A0D12]"
    }`;

  return (
    <header className="bg-background-primary sticky top-0 border-b border-b-border-secondary z-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-21">
          {/* Logo */}
          <div className="shrink-0">
            <img src="/logo.png" alt="Pokémon" className="h-10" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-xl">
            <NavLink to="/wiki" className={navClass}>
              Wiki
            </NavLink>
            <NavLink to="/about" className={navClass}>
              About
            </NavLink>
            <NavLink to="/games" className={navClass}>
              Games
            </NavLink>
            <NavLink to="/events" className={navClass}>
              Events
            </NavLink>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button className="px-4 py-2.5 text-foreground hover:text-brand-200 font-medium transition-colors">
              Sign in
            </button>
            <button className="px-4 py-2.5 bg-brand-200 text-accent-foreground rounded-sm font-medium hover:opacity-90 transition-opacity">
              Register
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <NavLink to="/wiki" className={navClass}>
                Wiki
              </NavLink>
              <NavLink to="/about" className={navClass}>
                About
              </NavLink>
              <NavLink to="/games" className={navClass}>
                Games
              </NavLink>
              <NavLink to="/events" className={navClass}>
                Events
              </NavLink>
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <button className="px-4 py-2 text-foreground hover:text-accent font-medium transition-colors bg-background-tertiary border border-border-secondary rounded-sm">
                  Sign in
                </button>
                <button className="px-4 py-2.5 bg-brand-200 text-accent-foreground rounded-sm font-medium hover:opacity-90 transition-opacity">
                  Register
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
