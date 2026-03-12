import { useState } from 'react';
import { Button } from '../../ui/Button/Button';
import { NavBar } from '../../features/NavBar/NavBar';
import { MusicianDetailHero } from '../../features/MusicianDetailHero/MusicianDetailHero';
import { AudioPreview } from '../../ui/AudioPreview/AudioPreview';
import { ServicePackages } from '../../features/ServicePackages/ServicePackages';
import { ReviewList } from '../../features/ReviewList/ReviewList';
import { FeaturedMusicianRow } from '../../features/FeaturedMusicianRow/FeaturedMusicianRow';
import { BookingDrawer } from '../../features/BookingDrawer/BookingDrawer';
import { HowItWorks } from '../../features/HowItWorks/HowItWorks';
import { Footer } from '../../features/Footer/Footer';
import { Typography } from '../../ui/Typography/Typography';
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
  const [selectedServiceIdx, setSelectedServiceIdx] = useState(0);
  const [friendshipStatus, setFriendshipStatus] = useState('none');

  // Normalize API field names to the canonical shape expected by child components.
  // API uses headline/ratingAverage/ratingCount/completedJobs/audioSamples[];
  // mocks use tagline/rating/reviewCount/completedGigs/audioSample.
  // This adapter is additive — mock data passes through unchanged.
  const m = {
    ...musician,
    tagline:       musician.tagline      ?? musician.headline     ?? '',
    rating:        musician.rating       ?? musician.ratingAverage ?? 0,
    reviewCount:   musician.reviewCount  ?? musician.ratingCount   ?? 0,
    completedGigs: musician.completedGigs ?? musician.completedJobs ?? null,
    audioSample:   musician.audioSample  ?? musician.audioSamples?.[0] ?? null,
  };

  // Adapt API services shape or fall back to mock packages for Storybook compatibility.
  const rawServices = Array.isArray(m.services) ? m.services : [];
  const services = rawServices.length > 0
    ? rawServices.map(s => ({
        name: s.title,
        price: s.startingPrice,
        delivery: s.turnaroundTime,
        revisions: s.revisionsIncluded ?? null,
        features: Array.isArray(s.deliverables) ? s.deliverables : [],
      }))
    : (m.packages || []);

  const handleFriendAction = () => {
    if (friendshipStatus === 'none') setFriendshipStatus('pending');
    else if (friendshipStatus === 'pending') setFriendshipStatus('friends');
    else setFriendshipStatus('none');
  };

  return (
    <div className={[styles.page, className].filter(Boolean).join(' ')} {...props}>
      <NavBar isDark={isDark} onThemeToggle={onThemeToggle} />

      <main>
        <MusicianDetailHero
          musician={m}
          onBook={() => setDrawerOpen(true)}
          onContact={() => {}}
          friendshipStatus={friendshipStatus}
          onFriendAction={handleFriendAction}
        />

        <div className={styles.grid}>
          <div className={styles.content}>
            {/* About section */}
            <section className={styles.section}>
              <Typography as="h2" className={styles.sectionTitle}>About the Musician</Typography>
              {m.bio && <p className={styles.bio}>{m.bio}</p>}
            </section>

            {/* Media section — uses first item from audioSamples[] or legacy audioSample */}
            {m.audioSample && (
              <section className={styles.section}>
                <Typography as="h2" className={styles.sectionTitle}>Featured Media</Typography>
                <AudioPreview
                  src={m.audioSample.src}
                  title={m.audioSample.title}
                  duration={m.audioSample.duration}
                />
              </section>
            )}

            {/* How it works / Process */}
            <section className={styles.section}>
              <HowItWorks />
            </section>

            {/* Reviews — individual review cards deferred until reviews API exists;
                rating summary block uses real ratingAverage/ratingCount from API */}
            <section className={styles.section}>
              <ReviewList
                reviews={m.reviews || []}
                rating={m.rating}
                reviewCount={m.reviewCount}
              />
            </section>
          </div>

          <aside className={styles.sidebar}>
            {/* Service packages */}
            {services.length > 0 && (
              <ServicePackages
                packages={services}
                currency={m.currency}
                onSelect={(pkg) => {
                  const idx = services.indexOf(pkg);
                  if (idx !== -1) setSelectedServiceIdx(idx);
                  setDrawerOpen(true);
                }}
              />
            )}
            {/* Network section deferred — no friends/connections API yet */}
          </aside>
        </div>

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

      {/* Sticky CTA Bar */}
      <div className={styles.stickyBar}>
        <div className={styles.stickyBarContent}>
          <div className={styles.stickyBarInfo}>
            <span className={styles.stickyBarPrice}>
              {m.currency || '$'}{m.startingPrice || '0'}
            </span>
            <span className={styles.stickyBarLabel}>Starting price</span>
          </div>
          <div className={styles.stickyBarActions}>
            <Button variant="ghost" onClick={() => {}}>Message</Button>
            <Button variant="primary" onClick={() => setDrawerOpen(true)}>Book Now</Button>
          </div>
        </div>
      </div>

      <BookingDrawer
        isOpen={drawerOpen}
        musician={m}
        initialSelectedPkg={selectedServiceIdx}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
}

export default MusicianDetailPage;
