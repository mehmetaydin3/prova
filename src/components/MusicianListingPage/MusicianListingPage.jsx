import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { Typography } from '../Typography/Typography';
import { MusicianGrid } from '../MusicianGrid/MusicianGrid';
import { Button } from '../Button/Button';
import styles from './MusicianListingPage.module.css';

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

const PRICE_RANGES = [
  { value: 'all', label: 'All Prices' },
  { value: 'low', label: 'Under $50' },
  { value: 'mid', label: '$50 – $150' },
  { value: 'high', label: 'Over $150' },
];

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export function MusicianListingPage({
  musicians: musiciansProp = [],
  onBook,
  onContact,
  className = '',
  ...props
}) {
  const [search, setSearch] = useState('');
  const [serviceType, setServiceType] = useState('all');
  const [genre, setGenre] = useState('All Genres');
  const [instrument, setInstrument] = useState('All Instruments');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');

  // API state
  const [apiMusicians, setApiMusicians] = useState(null); // null = not yet fetched
  const [loading, setLoading] = useState(false);
  const [apiAvailable, setApiAvailable] = useState(true);

  const debouncedSearch = useDebounce(search, 300);
  const abortRef = useRef(null);

  const fetchMusicians = useCallback(async (filters) => {
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.q) params.set('q', filters.q);
      if (filters.genre !== 'All Genres') params.set('genre', filters.genre);
      if (filters.instrument !== 'All Instruments') params.set('instrument', filters.instrument);
      if (filters.service !== 'all') params.set('service', filters.service);
      if (filters.sortBy) params.set('sortBy', filters.sortBy);
      params.set('limit', '50');

      const res = await fetch(`${API_BASE}/api/musicians?${params}`, { signal: controller.signal });
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      setApiMusicians(data.musicians);
      setApiAvailable(true);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setApiAvailable(false);
        setApiMusicians(null);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMusicians({
      q: debouncedSearch,
      genre,
      instrument,
      service: serviceType,
      sortBy,
    });
  }, [debouncedSearch, genre, instrument, serviceType, sortBy, fetchMusicians]);

  // If API is unavailable, fall back to client-side filtering on prop data
  const filteredMusicians = useMemo(() => {
    if (apiAvailable && apiMusicians !== null) return apiMusicians;

    return musiciansProp.filter((m) => {
      const q = search.toLowerCase();
      const matchesSearch = !q ||
        m.name.toLowerCase().includes(q) ||
        m.tagline?.toLowerCase().includes(q) ||
        m.genres?.some((g) => g.toLowerCase().includes(q)) ||
        m.skills?.some((s) => s.toLowerCase().includes(q));

      const matchesService = serviceType === 'all' || m.services?.[serviceType];
      const matchesGenre = genre === 'All Genres' || m.genres?.includes(genre);
      const matchesInstrument = instrument === 'All Instruments' || m.skills?.includes(instrument);

      let matchesPrice = true;
      if (priceRange === 'low') matchesPrice = m.startingPrice < 50;
      else if (priceRange === 'mid') matchesPrice = m.startingPrice >= 50 && m.startingPrice <= 150;
      else if (priceRange === 'high') matchesPrice = m.startingPrice > 150;

      return matchesSearch && matchesService && matchesGenre && matchesInstrument && matchesPrice;
    });
  }, [apiAvailable, apiMusicians, musiciansProp, search, serviceType, genre, instrument, priceRange]);

  // Price filtering is client-side only (keep it simple, API could support it too)
  const displayMusicians = useMemo(() => {
    if (!apiAvailable || apiMusicians === null) return filteredMusicians;
    if (priceRange === 'all') return filteredMusicians;
    return filteredMusicians.filter((m) => {
      if (priceRange === 'low') return m.startingPrice < 50;
      if (priceRange === 'mid') return m.startingPrice >= 50 && m.startingPrice <= 150;
      if (priceRange === 'high') return m.startingPrice > 150;
      return true;
    });
  }, [filteredMusicians, priceRange, apiAvailable, apiMusicians]);

  const clearFilters = () => {
    setSearch('');
    setServiceType('all');
    setGenre('All Genres');
    setInstrument('All Instruments');
    setPriceRange('all');
  };

  const hasActiveFilters = search || serviceType !== 'all' || genre !== 'All Genres' || instrument !== 'All Instruments' || priceRange !== 'all';

  return (
    <div className={[styles.page, className].filter(Boolean).join(' ')} {...props}>
      <header className={styles.header}>
        <Typography as="h1" variant="display" className={styles.title}>
          Find Your Sound
        </Typography>
        <Typography variant="body" className={styles.description}>
          Discover and hire world-class musicians for remote sessions, live events, or private lessons.
        </Typography>
      </header>

      <div className={styles.container}>
        {/* Sidebar Filters */}
        <aside className={styles.sidebar}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Search</label>
            <input
              type="search"
              className={styles.input}
              placeholder="Search by name, genre, instrument…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search musicians"
            />
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Instrument</label>
            <select
              className={styles.select}
              value={instrument}
              onChange={(e) => setInstrument(e.target.value)}
              aria-label="Filter by instrument"
            >
              {INSTRUMENTS.map((i) => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Genre</label>
            <select
              className={styles.select}
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              aria-label="Filter by genre"
            >
              {GENRES.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Service Type</label>
            <select
              className={styles.select}
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              aria-label="Filter by service type"
            >
              {SERVICE_TYPES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Price Range</label>
            <select
              className={styles.select}
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              aria-label="Filter by price range"
            >
              {PRICE_RANGES.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
          </div>

          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} style={{ marginTop: 'auto' }}>
              Clear All Filters
            </Button>
          )}
        </aside>

        {/* Main Results */}
        <main className={styles.main}>
          <div className={styles.resultsHeader}>
            <div className={styles.resultCount} aria-live="polite">
              {loading
                ? 'Searching…'
                : <>Showing <span className={styles.countBold}>{displayMusicians.length}</span> musicians</>
              }
            </div>
            
            <div className={styles.sortContainer}>
              <Typography variant="caption" className={styles.sortLabel}>Sort by</Typography>
              <select 
                className={styles.sortSelect}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="recommended">Recommended</option>
                <option value="topRated">Top Rated</option>
                <option value="mostReviewed">Most Reviewed</option>
                <option value="priceLow">Lowest Price</option>
                <option value="fastestResponse">Fastest Response</option>
              </select>
            </div>

            {!apiAvailable && (
              <span className={styles.offlineNote}>Showing local results</span>
            )}
          </div>

          <MusicianGrid
            musicians={displayMusicians}
            loading={loading}
            onBook={onBook}
            onContact={onContact}
          />
        </main>
      </div>
    </div>
  );
}

export default MusicianListingPage;
