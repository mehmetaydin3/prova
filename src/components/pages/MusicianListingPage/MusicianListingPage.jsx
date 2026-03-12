import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { Typography } from '../../ui/Typography/Typography';
import { MusicianGrid } from '../../features/MusicianGrid/MusicianGrid';
import { Button } from '../../ui/Button/Button';
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
  const [locationSearch, setLocationSearch] = useState('');
  const [availability, setAvailability] = useState('all');
  const [minRating, setMinRating] = useState(0);
  const [serviceType, setServiceType] = useState('all');
  const [genre, setGenre] = useState('All Genres');
  const [instrument, setInstrument] = useState('All Instruments');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

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
      if (filters.q) params.set('vibe', filters.q);
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
    let result = apiAvailable && apiMusicians !== null ? apiMusicians : musiciansProp;

    return result.filter((m) => {
      const q = search.toLowerCase();
      // Client-side fallback should also be "vibe-like" by checking genres/skills
      const matchesSearch = !q ||
        m.name.toLowerCase().includes(q) ||
        m.tagline?.toLowerCase().includes(q) ||
        m.genres?.some((g) => g.toLowerCase().includes(q)) ||
        m.skills?.some((s) => s.toLowerCase().includes(q)) ||
        m.bio?.toLowerCase().includes(q);

      const loc = locationSearch.toLowerCase();
      const matchesLocation = !loc || m.location?.toLowerCase().includes(loc);

      const matchesAvailability = availability === 'all' || (availability === 'online' && m.online);
      const matchesRating = minRating === 0 || m.rating >= minRating;

      const matchesService = serviceType === 'all' || m.services?.[serviceType];
      const matchesGenre = genre === 'All Genres' || m.genres?.includes(genre);
      const matchesInstrument = instrument === 'All Instruments' || m.skills?.includes(instrument);

      let matchesPrice = true;
      if (priceRange === 'low') matchesPrice = m.startingPrice < 50;
      else if (priceRange === 'mid') matchesPrice = m.startingPrice >= 50 && m.startingPrice <= 150;
      else if (priceRange === 'high') matchesPrice = m.startingPrice > 150;

      return matchesSearch && matchesLocation && matchesAvailability && matchesRating && matchesService && matchesGenre && matchesInstrument && matchesPrice;
    });
  }, [apiAvailable, apiMusicians, musiciansProp, search, locationSearch, availability, minRating, serviceType, genre, instrument, priceRange]);

  const displayMusicians = filteredMusicians;

  const clearFilters = () => {
    setSearch('');
    setLocationSearch('');
    setAvailability('all');
    setMinRating(0);
    setServiceType('all');
    setGenre('All Genres');
    setInstrument('All Instruments');
    setPriceRange('all');
  };

  const hasActiveFilters = search || locationSearch || availability !== 'all' || minRating !== 0 || serviceType !== 'all' || genre !== 'All Genres' || instrument !== 'All Instruments' || priceRange !== 'all';

  const activeFilters = useMemo(() => {
    const list = [];
    if (genre !== 'All Genres') list.push({ id: 'genre', label: `Genre: ${genre}`, onRemove: () => setGenre('All Genres') });
    if (instrument !== 'All Instruments') list.push({ id: 'instrument', label: `Skill: ${instrument}`, onRemove: () => setInstrument('All Instruments') });
    if (serviceType !== 'all') {
      const label = SERVICE_TYPES.find(s => s.value === serviceType)?.label;
      list.push({ id: 'serviceType', label: `Service: ${label}`, onRemove: () => setServiceType('all') });
    }
    if (locationSearch) list.push({ id: 'location', label: `Location: ${locationSearch}`, onRemove: () => setLocationSearch('') });
    if (availability !== 'all') list.push({ id: 'availability', label: 'Online Only', onRemove: () => setAvailability('all') });
    if (minRating > 0) list.push({ id: 'rating', label: `${minRating}+ Stars`, onRemove: () => setMinRating(0) });
    if (priceRange !== 'all') {
      const label = PRICE_RANGES.find(p => p.value === priceRange)?.label;
      list.push({ id: 'price', label: `Price: ${label}`, onRemove: () => setPriceRange('all') });
    }
    return list;
  }, [genre, instrument, serviceType, locationSearch, availability, minRating, priceRange]);

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
        {/* Top Bar: Search & Drawer Toggle */}
        <div className={styles.topBar}>
          <div className={styles.searchBar}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Search by name, vibe, or style..."
              className={styles.searchInput}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button 
            variant="outline" 
            onClick={() => setIsFilterDrawerOpen(true)}
            className={styles.filterButton}
          >
            Filters {hasActiveFilters && `(${activeFilters.length})`}
          </Button>
        </div>

        {/* Active Filters Row */}
        <div className={styles.activeFiltersRow}>
          {activeFilters.map(filter => (
            <div key={filter.id} className={styles.chip}>
              <span className={styles.chipLabel}>{filter.label}</span>
              <button className={styles.removeChip} onClick={filter.onRemove}>×</button>
            </div>
          ))}
          {activeFilters.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear All
            </Button>
          )}
        </div>

        {/* Filter Drawer */}
        <div 
          className={[styles.drawerOverlay, isFilterDrawerOpen ? styles.drawerOverlayOpen : ''].join(' ')} 
          onClick={() => setIsFilterDrawerOpen(false)}
        />
        <aside className={[styles.drawer, isFilterDrawerOpen ? styles.drawerOpen : ''].join(' ')}>
          <header className={styles.drawerHeader}>
            <Typography variant="heading3">Refine Search</Typography>
            <button className={styles.closeButton} onClick={() => setIsFilterDrawerOpen(false)}>×</button>
          </header>
          
          <div className={styles.drawerContent}>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Instrument / Skill</label>
              <select
                className={styles.select}
                value={instrument}
                onChange={(e) => setInstrument(e.target.value)}
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
              >
                {SERVICE_TYPES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Location</label>
              <input
                type="text"
                className={styles.input}
                placeholder="City, Country..."
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
              />
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Availability</label>
              <select
                className={styles.select}
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
              >
                <option value="all">Any Availability</option>
                <option value="online">Available Now</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Minimum Rating</label>
              <select
                className={styles.select}
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
              >
                <option value="0">Any Rating</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4.0">4.0+ Stars</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Price Range</label>
              <select
                className={styles.select}
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              >
                {PRICE_RANGES.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
              </select>
            </div>
          </div>

          <footer className={styles.drawerFooter}>
            <Button variant="primary" fullWidth onClick={() => setIsFilterDrawerOpen(false)}>
              Show Results
            </Button>
            <Button variant="ghost" onClick={clearFilters}>
              Reset
            </Button>
          </footer>
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
