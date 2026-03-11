import { useState } from 'react';
import { Button } from '../Button/Button';
import styles from './NavBar.module.css';

const MusicNoteIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M9 18V5l12-2v13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="2"/>
    <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
    <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const NAV_LINKS = [
  { label: 'Find Musicians', href: '#' },
  { label: 'For Weddings', href: '#' },
  { label: 'Teaching', href: '#' },
  { label: 'How It Works', href: '#' },
];

export function NavBar({
  isDark = false,
  onThemeToggle,
  onLogin,
  onSignUp,
  className = '',
  ...props
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className={[styles.nav, className].filter(Boolean).join(' ')}
      aria-label="Main navigation"
      {...props}
    >
      <div className={styles.inner}>
        {/* Logo */}
        <a href="#" className={styles.logo} aria-label="Musiq Home">
          <span className={styles.logoIcon}><MusicNoteIcon /></span>
          <span className={styles.logoText}>musiq</span>
        </a>

        {/* Desktop nav links */}
        <ul className={styles.navLinks} role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a href={link.href} className={styles.navLink}>{link.label}</a>
            </li>
          ))}
        </ul>

        {/* Desktop search */}
        <div className={styles.searchWrap}>
          <SearchIcon />
          <input
            type="search"
            placeholder="Search musicians…"
            className={styles.searchInput}
            aria-label="Search musicians"
          />
        </div>

        {/* Desktop actions */}
        <div className={styles.actions}>
          <button
            className={styles.themeToggle}
            onClick={onThemeToggle}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Light mode' : 'Dark mode'}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
          <Button variant="ghost" size="sm" onClick={onLogin}>Log in</Button>
          <Button variant="primary" size="sm" onClick={onSignUp}>Get Started</Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={styles.mobileMenu} role="dialog" aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
          <div className={styles.mobileDivider} />
          <div className={styles.mobileActions}>
            <Button variant="ghost" size="md" fullWidth onClick={onLogin}>Log in</Button>
            <Button variant="primary" size="md" fullWidth onClick={onSignUp}>Get Started</Button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
