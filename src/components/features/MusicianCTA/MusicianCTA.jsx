import styles from './MusicianCTA.module.css';

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BENEFITS = [
  'Set your own rates — no race to the bottom',
  'Accept or decline any request, freely',
  'Get discovered by clients worldwide',
  'Zero commission on your first three bookings',
];

const STATS = [
  { value: '2,400+', label: 'Active musicians' },
  { value: '$2.4M+', label: 'Paid to musicians' },
  { value: '190+', label: 'Countries' },
];

export function MusicianCTA({ className = '', ...props }) {
  return (
    <section
      className={[styles.section, className].filter(Boolean).join(' ')}
      aria-label="For musicians"
      {...props}
    >
      <div className={styles.inner}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>For musicians</span>

          <h2 className={styles.title}>
            Turn your talent into a career.
          </h2>

          <p className={styles.desc}>
            Join thousands of professional musicians already earning through Prova.
            Create your profile in minutes, define your services, and start receiving
            bookings from clients around the world.
          </p>

          <ul className={styles.benefits} role="list">
            {BENEFITS.map((b) => (
              <li key={b} className={styles.benefit}>
                <span className={styles.checkIcon}><CheckIcon /></span>
                {b}
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <a href="/auth" className={styles.ctaBtn}>
              Join as a musician →
            </a>
            <a href="/musicians" className={styles.secondaryLink}>
              See who's already here
            </a>
          </div>
        </div>

        <div className={styles.statsPanel}>
          {STATS.map((s) => (
            <div key={s.label} className={styles.stat}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}

          <div className={styles.avatarStack} aria-hidden="true">
            {[12, 47, 34, 11, 5, 60].map((img, i) => (
              <img
                key={i}
                src={`https://i.pravatar.cc/64?img=${img}`}
                alt=""
                className={styles.stackAvatar}
                style={{ zIndex: 6 - i }}
                loading="lazy"
              />
            ))}
            <span className={styles.stackLabel}>and 2,394 others</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MusicianCTA;
