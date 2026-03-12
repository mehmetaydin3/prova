import { useState } from 'react';
import styles from './SearchFilterBar.module.css';

const API_BASE = 'http://localhost:5001';

const GENRES = ['All Genres', 'Hip-Hop', 'Pop', 'R&B', 'Jazz', 'Classical', 'Electronic', 'Afrobeats', 'Flamenco', 'World Music', 'Ambient', 'Rock', 'Soul', 'Gospel', 'Blues', 'Latin', 'Indian Classical', 'Fusion', 'Cinematic', 'Experimental'];
const INSTRUMENTS = ['All Instruments', 'Guitar', 'Piano', 'Violin', 'Viola', 'Cello', 'Drums', 'Percussion', 'Vocals', 'Synthesizer', 'Bass', 'Saxophone', 'Trumpet', 'Mixing', 'Mastering', 'Sound Design', 'Ableton Live', 'Beat Making', 'Film Scoring'];
const SERVICE_TYPES = [
  { value: 'all', label: 'All Services' },
  { value: 'tracks', label: 'Remote Session' },
  { value: 'teach', label: 'Teaching' },
  { value: 'inPerson', label: 'In-Person Gig' },
  { value: 'wedding', label: 'Wedding' },
  { value: 'online', label: 'Online Lessons' },
];
const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'price_asc', label: 'Price: Low → High' },
  { value: 'price_desc', label: 'Price: High → Low' },
  { value: 'reviews', label: 'Most Reviews' },
];

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
    <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const FilterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M4 6h16M7 12h10M10 18h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const SparkleIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2l2.4 7.6H22l-6.4 4.6 2.4 7.6L12 17.2 5.9 22l2.4-7.6L2 9.6h7.6z"/>
  </svg>
);

export function SearchFilterBar({
  onFilterChange,
  initialFilters = {},
  resultCount,
  className = '',
  ...props
}) {
  const [search, setSearch] = useState(initialFilters.search || '');
  const [serviceType, setServiceType] = useState(initialFilters.serviceType || 'all');
  const [genre, setGenre] = useState(initialFilters.genre || 'All Genres');
  const [instrument, setInstrument] = useState(initialFilters.instrument || 'All Instruments');
  const [onlineOnly, setOnlineOnly] = useState(initialFilters.onlineOnly || false);
  const [sortBy, setSortBy] = useState(initialFilters.sortBy || 'featured');
  const [isParsing, setIsParsing] = useState(false);
  const [nlInterpretation, setNlInterpretation] = useState(null);

  const notify = (updates) => {
    onFilterChange?.({ search, serviceType, genre, instrument, onlineOnly, sortBy, ...updates });
  };

  const handleSearch = (val) => { setSearch(val); setNlInterpretation(null); notify({ search: val }); };
  const handleService = (val) => { setServiceType(val); notify({ serviceType: val }); };
  const handleGenre = (val) => { setGenre(val); notify({ genre: val }); };
  const handleInstrument = (val) => { setInstrument(val); notify({ instrument: val }); };
  const handleOnline = (val) => { setOnlineOnly(val); notify({ onlineOnly: val }); };
  const handleSort = (val) => { setSortBy(val); notify({ sortBy: val }); };

  const clearAll = () => {
    setSearch(''); setServiceType('all'); setGenre('All Genres'); setInstrument('All Instruments'); setOnlineOnly(false); setSortBy('featured'); setNlInterpretation(null);
    onFilterChange?.({ search: '', serviceType: 'all', genre: 'All Genres', instrument: 'All Instruments', onlineOnly: false, sortBy: 'featured' });
  };

  // Natural language parsing: triggered on Enter when query has multiple words
  const handleKeyDown = async (e) => {
    if (e.key !== 'Enter') return;
    const query = search.trim();
    if (!query || !query.includes(' ')) return; // single words go through as plain text search

    setIsParsing(true);
    try {
      const res = await fetch(`${API_BASE}/api/search/parse`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      if (!res.ok) return;
      const parsed = await res.json();

      // Apply parsed filters
      const newSearch = parsed.q ?? '';
      const newGenre = parsed.genre ?? 'All Genres';
      const newInstrument = parsed.instrument ?? 'All Instruments';
      const newService = parsed.service ?? 'all';
      const newSortBy = parsed.sortBy ?? 'featured';

      setSearch(newSearch);
      setGenre(newGenre);
      setInstrument(newInstrument);
      setServiceType(newService);
      setSortBy(newSortBy);

      // Build human-readable interpretation summary
      const parts = [];
      if (newGenre !== 'All Genres') parts.push(newGenre);
      if (newInstrument !== 'All Instruments') parts.push(newInstrument);
      if (newService !== 'all') parts.push(SERVICE_TYPES.find(s => s.value === newService)?.label ?? newService);
      if (newSortBy !== 'featured') parts.push(SORT_OPTIONS.find(o => o.value === newSortBy)?.label ?? newSortBy);
      setNlInterpretation(parts.length > 0 ? parts.join(' · ') : null);

      onFilterChange?.({ search: newSearch, serviceType: newService, genre: newGenre, instrument: newInstrument, onlineOnly, sortBy: newSortBy });
    } catch (_) {
      // On failure, fall back to plain text search
    } finally {
      setIsParsing(false);
    }
  };

  const hasActiveFilters = search !== '' || serviceType !== 'all' || genre !== 'All Genres' || instrument !== 'All Instruments' || onlineOnly;

  return (
    <div
      className={[styles.bar, className].filter(Boolean).join(' ')}
      role="search"
      aria-label="Filter musicians"
      {...props}
    >
      <div className={styles.inner}>
        {/* Search input */}
        <div className={[styles.searchField, isParsing ? styles.searchParsing : ''].filter(Boolean).join(' ')}>
          {isParsing ? <span className={styles.parsingSpinner} aria-hidden="true" /> : <SearchIcon />}
          <input
            type="search"
            className={styles.searchInput}
            placeholder='Try "jazz pianist for a wedding" or search by name…'
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Search musicians — supports natural language"
          />
          <span className={styles.nlHint} title="Supports natural language — press Enter to parse">
            <SparkleIcon />
          </span>
        </div>

        {/* Divider */}
        <div className={styles.divider} aria-hidden="true" />

        {/* Service type */}
        <div className={styles.filterGroup}>
          <FilterIcon />
          <select
            className={styles.select}
            value={serviceType}
            onChange={(e) => handleService(e.target.value)}
            aria-label="Filter by service type"
          >
            {SERVICE_TYPES.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        {/* Instrument */}
        <div className={styles.filterGroup}>
          <select
            className={styles.select}
            value={instrument}
            onChange={(e) => handleInstrument(e.target.value)}
            aria-label="Filter by instrument"
          >
            {INSTRUMENTS.map((i) => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>

        {/* Genre */}
        <div className={styles.filterGroup}>
          <select
            className={styles.select}
            value={genre}
            onChange={(e) => handleGenre(e.target.value)}
            aria-label="Filter by genre"
          >
            {GENRES.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>

        {/* Online only toggle */}
        <label className={styles.toggle}>
          <input
            type="checkbox"
            className={styles.toggleInput}
            checked={onlineOnly}
            onChange={(e) => handleOnline(e.target.checked)}
          />
          <span className={[styles.toggleTrack, onlineOnly ? styles.toggleOn : ''].filter(Boolean).join(' ')}>
            <span className={styles.toggleThumb} />
          </span>
          <span className={styles.toggleLabel}>Available now</span>
        </label>

        {/* Sort */}
        <div className={styles.filterGroup} style={{ marginLeft: 'auto' }}>
          <select
            className={styles.select}
            value={sortBy}
            onChange={(e) => handleSort(e.target.value)}
            aria-label="Sort results"
          >
            {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        {hasActiveFilters && (
          <button className={styles.clearBtn} onClick={clearAll} aria-label="Clear all filters">
            Clear
          </button>
        )}
      </div>

      {/* Natural language interpretation badge */}
      {nlInterpretation && (
        <div className={styles.nlBadgeRow}>
          <span className={styles.nlBadge}>
            <SparkleIcon />
            {nlInterpretation}
          </span>
        </div>
      )}

      {resultCount != null && (
        <div className={styles.resultCount} aria-live="polite">
          <span className={styles.count}>{resultCount}</span> musicians found
        </div>
      )}
    </div>
  );
}

export default SearchFilterBar;
