import { useState } from 'react';
import { NavBar } from '../../features/NavBar/NavBar';
import { HeroBanner } from '../../features/HeroBanner/HeroBanner';
import { CategoryExplorer } from '../../features/CategoryExplorer/CategoryExplorer';
import { FeaturedMusicianRow } from '../../features/FeaturedMusicianRow/FeaturedMusicianRow';
import { DiversityBanner } from '../../features/DiversityBanner/DiversityBanner';
import { HowItWorks } from '../../features/HowItWorks/HowItWorks';
import { TestimonialCarousel } from '../../features/TestimonialCarousel/TestimonialCarousel';
import { Footer } from '../../features/Footer/Footer';
import { BookingDrawer } from '../../features/BookingDrawer/BookingDrawer';
import styles from './HomePage.module.css';

export function HomePage({
  musicians = [],
  isDark = false,
  onThemeToggle,
  className = '',
  ...props
}) {
  const handleBook = (musician) => {
    window.location.href = `/musician/${musician.id}`;
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
    </div>
  );
}

export default HomePage;
