import { Typography } from '../Typography/Typography';
import { MusicianSection } from '../MusicianSection/MusicianSection';
import styles from './MusicianListingPage.module.css';

export function MusicianListingPage({
  musicians = [],
  onBook,
  onContact,
  className = '',
  ...props
}) {
  // Filter musicians based on their services
  const trackMusicians = musicians.filter((m) => m.services?.tracks);
  const teachingMusicians = musicians.filter((m) => m.services?.teach);
  const inPersonMusicians = musicians.filter((m) => m.services?.inPerson);

  return (
    <div className={[styles.page, className].filter(Boolean).join(' ')} {...props}>
      <header>
        <Typography as="h1" variant="display" className={styles.title}>
          Musicians Directory
        </Typography>
        <Typography variant="body" className={styles.description}>
          Find the perfect musician for your next project, lesson, or event.
        </Typography>
      </header>

      <div className={styles.sections}>
        <MusicianSection
          title="Available to send you finished tracks"
          description="Producers, composers, and vocalists ready to deliver high-quality stems and mixes."
          musicians={trackMusicians}
          onBook={onBook}
          onContact={onContact}
        />

        <MusicianSection
          title="Available to teach"
          description="Experienced instructors ready to help you master an instrument or production tool."
          musicians={teachingMusicians}
          onBook={onBook}
          onContact={onContact}
        />

        <MusicianSection
          title="Available in person to perform"
          description="Local talent ready to grace your stage or private event."
          musicians={inPersonMusicians}
          onBook={onBook}
          onContact={onContact}
        />
      </div>
    </div>
  );
}

export default MusicianListingPage;
