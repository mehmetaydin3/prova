import { useState } from 'react';
import { NavBar } from '../NavBar/NavBar';
import { MusicianDetailHero } from '../MusicianDetailHero/MusicianDetailHero';
import { AudioPreview } from '../AudioPreview/AudioPreview';
import { ServicePackages } from '../ServicePackages/ServicePackages';
import { ReviewList } from '../ReviewList/ReviewList';
import { FeaturedMusicianRow } from '../FeaturedMusicianRow/FeaturedMusicianRow';
import { BookingDrawer } from '../BookingDrawer/BookingDrawer';
import { Footer } from '../Footer/Footer';
import styles from './MusicianDetailPage.module.css';

export function MusicianDetailPage({
  musician = {},
  relatedMusicians = [],
  isDark = false,
  onThemeToggle,
  className = '',
  ...props
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className={[styles.page, className].filter(Boolean).join(' ')} {...props}>
      <NavBar isDark={isDark} onThemeToggle={onThemeToggle} />

      <main>
        <MusicianDetailHero
          musician={musician}
          onBook={() => setDrawerOpen(true)}
          onContact={() => {}}
        />

        {/* Bio section */}
        {musician.bio && (
          <div className={styles.section}>
            <p className={styles.bio}>{musician.bio}</p>
          </div>
        )}

        {/* Audio sample */}
        {musician.audioSample && (
          <div className={styles.section}>
            <AudioPreview
              src={musician.audioSample.src}
              title={musician.audioSample.title}
              duration={musician.audioSample.duration}
            />
          </div>
        )}

        {/* Service packages */}
        {musician.packages?.length > 0 && (
          <ServicePackages
            packages={musician.packages}
            currency={musician.currency}
            onSelect={() => setDrawerOpen(true)}
          />
        )}

        {/* Reviews */}
        <ReviewList
          reviews={musician.reviews || []}
          rating={musician.rating}
          reviewCount={musician.reviewCount}
        />

        {/* Related musicians */}
        {relatedMusicians.length > 0 && (
          <FeaturedMusicianRow
            musicians={relatedMusicians}
            title="You might also like"
            onBook={(m) => {}}
          />
        )}
      </main>

      <Footer />

      <BookingDrawer
        isOpen={drawerOpen}
        musician={musician}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
}

export default MusicianDetailPage;
