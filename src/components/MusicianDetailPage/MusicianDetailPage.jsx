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

/**
 * Normalize a musician object so it works whether it comes from mock data or
 * the live API. Key differences to bridge:
 *
 * - API returns `services[]` with {title, startingPrice, turnaroundTime,
 *   revisionsIncluded, deliverables}; UI expects `packages[]` with
 *   {name, price, delivery, revisions, features}.
 * - API uses `headline` (aliased to `tagline` in the route, but handle both).
 * - API uses `completedJobs`; hero reads `completedGigs`.
 * - API uses `remoteAvailable`; hero reads `online`.
 */
function normalizeMusician(m) {
  if (!m || typeof m !== 'object') return {};

  const packages =
    Array.isArray(m.packages) && m.packages.length > 0
      ? m.packages
      : (Array.isArray(m.services) ? m.services : []).map((s) => ({
          name: s.title,
          price: s.startingPrice,
          delivery: s.turnaroundTime || '—',
          revisions: s.revisionsIncluded ?? 0,
          features:
            Array.isArray(s.deliverables) && s.deliverables.length > 0
              ? s.deliverables
              : [s.description].filter(Boolean),
        }));

  return {
    ...m,
    tagline: m.tagline || m.headline,
    completedGigs: m.completedGigs ?? m.completedJobs,
    online: m.online ?? Boolean(m.remoteAvailable),
    packages,
  };
}

export function MusicianDetailPage({
  musician = {},
  relatedMusicians = [],
  isDark = false,
  onThemeToggle,
  className = '',
  ...props
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const m = normalizeMusician(musician);

  return (
    <div className={[styles.page, className].filter(Boolean).join(' ')} {...props}>
      <NavBar isDark={isDark} onThemeToggle={onThemeToggle} />

      <main>
        <MusicianDetailHero
          musician={m}
          onBook={() => setDrawerOpen(true)}
          onContact={() => {}}
        />

        {/* Bio section */}
        {m.bio && (
          <div className={styles.section}>
            <p className={styles.bio}>{m.bio}</p>
          </div>
        )}

        {/* Audio sample */}
        {m.audioSample && (
          <div className={styles.section}>
            <AudioPreview
              src={m.audioSample.src}
              title={m.audioSample.title}
              duration={m.audioSample.duration}
            />
          </div>
        )}

        {/* Service packages */}
        {m.packages?.length > 0 && (
          <ServicePackages
            packages={m.packages}
            currency={m.currency}
            onSelect={() => setDrawerOpen(true)}
          />
        )}

        {/* Reviews */}
        <ReviewList
          reviews={m.reviews || []}
          rating={m.rating}
          reviewCount={m.reviewCount}
        />

        {/* Related musicians */}
        {relatedMusicians.length > 0 && (
          <FeaturedMusicianRow
            musicians={relatedMusicians}
            title="You might also like"
            onBook={() => {}}
          />
        )}
      </main>

      <Footer />

      <BookingDrawer
        isOpen={drawerOpen}
        musician={m}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
}

export default MusicianDetailPage;
