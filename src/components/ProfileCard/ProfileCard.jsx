import { Avatar } from '../Avatar/Avatar';
import { Badge } from '../Badge/Badge';
import { Tag } from '../Tag/Tag';
import { RatingStars } from '../RatingStars/RatingStars';
import { AudioPreview } from '../AudioPreview/AudioPreview';
import { Button } from '../Button/Button';
import { Typography } from '../Typography/Typography';
import styles from './ProfileCard.module.css';

const CURRENCY_SYMBOLS = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  CAD: 'CA$',
};

function LocationIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M6 1C4.067 1 2.5 2.567 2.5 4.5c0 2.625 3.5 6.5 3.5 6.5S9.5 7.125 9.5 4.5C9.5 2.567 7.933 1 6 1Zm0 4.75a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ProfileCard({
  musician = {},
  onBook,
  onContact,
  className = '',
  ...props
}) {
  const {
    name = 'Unknown Musician',
    tagline = '',
    avatarSrc,
    location = '',
    online = false,
    tier = 'none',
    badges = [],
    genres = [],
    skills = [],
    rating = 0,
    reviewCount = 0,
    startingPrice,
    currency = 'USD',
    audioSample,
  } = musician;

  const currencySymbol = CURRENCY_SYMBOLS[currency] || currency;

  return (
    <article
      className={[styles.card, className].filter(Boolean).join(' ')}
      aria-label={`Profile card for ${name}`}
      {...props}
    >
      {/* Header: Avatar + identity info */}
      <div className={styles.header}>
        <Avatar
          src={avatarSrc}
          name={name}
          size="lg"
          online={online}
          tier={tier}
        />

        <div className={styles.identity}>
          <div className={styles.nameRow}>
            <Typography as="h3" variant="heading3" className={styles.name}>
              {name}
            </Typography>
            {online && (
              <span className={styles.onlineLabel} aria-label="Available now">
                Available
              </span>
            )}
          </div>

          {tagline && (
            <Typography variant="bodySmall" className={styles.tagline}>
              {tagline}
            </Typography>
          )}

          {location && (
            <div className={styles.location}>
              <LocationIcon />
              <Typography as="span" variant="caption">
                {location}
              </Typography>
            </div>
          )}

          {badges.length > 0 && (
            <div className={styles.badgeRow} aria-label="Badges">
              {badges.map((variant) => (
                <Badge key={variant} variant={variant} size="sm" />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Audio sample */}
      {audioSample && (
        <div className={styles.audioSection}>
          <AudioPreview
            src={audioSample.src}
            duration={audioSample.duration}
            title={audioSample.title || `${name} — Sample`}
            waveformData={audioSample.waveformData}
          />
        </div>
      )}

      {/* Genre + Skill tags */}
      {(genres.length > 0 || skills.length > 0) && (
        <div className={styles.tagsSection} aria-label="Genres and skills">
          {genres.map((g) => (
            <Tag key={g} label={g} variant="genre" />
          ))}
          {skills.map((s) => (
            <Tag key={s} label={s} variant="skill" />
          ))}
        </div>
      )}

      {/* Footer: Rating + Price + Buttons */}
      <div className={styles.footer}>
        <div className={styles.footerLeft}>
          <RatingStars
            rating={rating}
            reviewCount={reviewCount}
            size="sm"
            showCount={reviewCount > 0}
          />
          {startingPrice != null && (
            <Typography as="span" variant="caption" className={styles.price}>
              From{' '}
              <strong className={styles.priceAmount}>
                {currencySymbol}{startingPrice}
              </strong>
              /hr
            </Typography>
          )}
        </div>

        <div className={styles.footerActions}>
          <Button
            variant="ghost"
            size="sm"
            onClick={onContact}
            aria-label={`Contact ${name}`}
          >
            Contact
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={onBook}
            aria-label={`Book a session with ${name}`}
          >
            Book
          </Button>
        </div>
      </div>
    </article>
  );
}

export default ProfileCard;
