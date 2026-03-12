import { useState, useEffect } from 'react';
import { Typography } from '../../ui/Typography/Typography';
import { RatingStars } from '../../ui/RatingStars/RatingStars';
import styles from './TestimonialCarousel.module.css';

const TESTIMONIALS = [
  {
    id: 't1',
    quote: 'I found the most incredible jazz pianist for my restaurant launch in under 10 minutes. The audio previews made all the difference.',
    name: 'Sophie Laurent',
    role: 'Restaurant Owner, Paris',
    avatar: 'https://i.pravatar.cc/80?img=1',
    rating: 5,
  },
  {
    id: 't2',
    quote: 'Elena\'s string quartet made our wedding ceremony honestly magical. Every guest commented on how beautiful the music was.',
    name: 'James & Amara O.',
    role: 'Newlyweds, London',
    avatar: 'https://i.pravatar.cc/80?img=9',
    rating: 5,
  },
  {
    id: 't3',
    quote: 'As a producer shipping beats, this platform connected me with a vocalist who nailed my track in a single take. Mind-blowing.',
    name: 'Tyler Eason',
    role: 'Independent Producer, Atlanta',
    avatar: 'https://i.pravatar.cc/80?img=53',
    rating: 5,
  },
  {
    id: 't4',
    quote: 'Devon taught me everything I know about synthesis. The online lesson format and direct messaging made it so easy to keep learning.',
    name: 'Arno B.',
    role: 'Music Student, Berlin',
    avatar: 'https://i.pravatar.cc/80?img=25',
    rating: 5,
  },
];

export function TestimonialCarousel({ autoPlayMs = 4000, className = '', ...props }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % TESTIMONIALS.length);
    }, autoPlayMs);
    return () => clearInterval(timer);
  }, [autoPlayMs]);

  const current = TESTIMONIALS[active];

  return (
    <section
      className={[styles.section, className].filter(Boolean).join(' ')}
      aria-label="Customer testimonials"
      {...props}
    >
      <div className={styles.inner}>
        <div className={styles.header}>
          <Typography as="h2" variant="heading2" className={styles.title}>
            What our community says
          </Typography>
        </div>

        <div className={styles.card} aria-live="polite" aria-atomic="true">
          <div className={styles.quoteDecor} aria-hidden="true">"</div>
          <Typography as="blockquote" variant="body" className={styles.quote}>
            {current.quote}
          </Typography>
          <div className={styles.author}>
            <img src={current.avatar} alt="" className={styles.avatar} loading="lazy" />
            <div>
              <Typography as="p" variant="label" className={styles.authorName}>{current.name}</Typography>
              <Typography as="p" variant="caption" className={styles.authorRole}>{current.role}</Typography>
            </div>
            <div className={styles.stars}>
              <RatingStars rating={current.rating} size="sm" showCount={false} />
            </div>
          </div>
        </div>

        {/* Dot navigation */}
        <div className={styles.dots} role="tablist" aria-label="Testimonials navigation">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.id}
              className={[styles.dot, i === active ? styles.dotActive : ''].filter(Boolean).join(' ')}
              onClick={() => setActive(i)}
              role="tab"
              aria-selected={i === active}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialCarousel;
