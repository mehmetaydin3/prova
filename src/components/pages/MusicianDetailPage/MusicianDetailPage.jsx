import { useState } from 'react';
import { NavBar } from '../../features/NavBar/NavBar';
import { MusicianDetailHero } from '../../features/MusicianDetailHero/MusicianDetailHero';
import { AudioPreview } from '../../ui/AudioPreview/AudioPreview';
import { ServicePackages } from '../../features/ServicePackages/ServicePackages';
import { ReviewList } from '../../features/ReviewList/ReviewList';
import { FeaturedMusicianRow } from '../../features/FeaturedMusicianRow/FeaturedMusicianRow';
import { BookingDrawer } from '../../features/BookingDrawer/BookingDrawer';
import { HowItWorks } from '../../features/HowItWorks/HowItWorks';
import { Footer } from '../../features/Footer/Footer';
import { NetworkSection } from '../../features/NetworkSection/NetworkSection';
import { Typography } from '../../ui/Typography/Typography';
import { musiciansData } from '../../../mocks/musicians';
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
  const [friendshipStatus, setFriendshipStatus] = useState('none');

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
          musician={musician}
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
              {musician.bio && <p className={styles.bio}>{musician.bio}</p>}
            </section>

            {/* Media section */}
            {musician.audioSample && (
              <section className={styles.section}>
                <Typography as="h2" className={styles.sectionTitle}>Featured Media</Typography>
                <AudioPreview
                  src={musician.audioSample.src}
                  title={musician.audioSample.title}
                  duration={musician.audioSample.duration}
                />
              </section>
            )}

            {/* How it works / Process */}
            <section className={styles.section}>
              <HowItWorks />
            </section>

            {/* Reviews */}
            <section className={styles.section}>
              <ReviewList
                reviews={musician.reviews || []}
                rating={musician.rating}
                reviewCount={musician.reviewCount}
              />
            </section>
          </div>

          <aside className={styles.sidebar}>
            {/* Service packages */}
            {musician.packages?.length > 0 && (
              <ServicePackages
                packages={musician.packages}
                currency={musician.currency}
                onSelect={() => setDrawerOpen(true)}
              />
            )}

            {/* Network section */}
            <div className={styles.section}>
              <Typography as="h3" variant="heading3">Musical Network</Typography>
              <NetworkSection 
                friends={musiciansData.filter(m => musician.friends?.includes(m.id))} 
              />
            </div>
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
              {musician.currency || '$'}{musician.startingPrice || '0'}
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
        musician={musician}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
}

export default MusicianDetailPage;
