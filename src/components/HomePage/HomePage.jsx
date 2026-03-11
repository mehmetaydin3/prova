import { useState } from 'react';
import { NavBar } from '../NavBar/NavBar';
import { HeroBanner } from '../HeroBanner/HeroBanner';
import { CategoryExplorer } from '../CategoryExplorer/CategoryExplorer';
import { FeaturedMusicianRow } from '../FeaturedMusicianRow/FeaturedMusicianRow';
import { DiversityBanner } from '../DiversityBanner/DiversityBanner';
import { HowItWorks } from '../HowItWorks/HowItWorks';
import { TestimonialCarousel } from '../TestimonialCarousel/TestimonialCarousel';
import { Footer } from '../Footer/Footer';
import { BookingDrawer } from '../BookingDrawer/BookingDrawer';
import styles from './HomePage.module.css';

export function HomePage({
  musicians = [],
  isDark = false,
  onThemeToggle,
  className = '',
  ...props
}) {
  const [selectedMusician, setSelectedMusician] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleBook = (musician) => {
    setSelectedMusician(musician);
    setDrawerOpen(true);
  };

  return (
    <div className={[styles.page, className].filter(Boolean).join(' ')} {...props}>
      <NavBar
        isDark={isDark}
        onThemeToggle={onThemeToggle}
      />

      <main>
        <HeroBanner />

        <CategoryExplorer />

        <FeaturedMusicianRow
          musicians={musicians.slice(0, 6)}
          title="Featured This Week"
          subtitle="Handpicked top-rated musicians available for hire now."
          onBook={handleBook}
        />

        <HowItWorks />

        <DiversityBanner />

        <TestimonialCarousel />
      </main>

      <Footer />

      <BookingDrawer
        isOpen={drawerOpen}
        musician={selectedMusician || {}}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
}

export default HomePage;
