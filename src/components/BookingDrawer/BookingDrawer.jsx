import { useState } from 'react';
import { Typography } from '../Typography/Typography';
import { Button } from '../Button/Button';
import styles from './BookingDrawer.module.css';

const API_BASE = import.meta.env?.VITE_API_URL || 'http://localhost:5000';

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CURRENCY_SYMBOLS = { USD: '$', EUR: '€', GBP: '£', CAD: 'CA$' };
const STEPS = ['Details', 'Review', 'Confirm'];

function StepIndicator({ current }) {
  return (
    <div className={styles.steps} aria-label="Checkout steps">
      {STEPS.map((label, i) => (
        <div key={label} className={styles.stepItem}>
          <div className={[styles.stepCircle, i < current ? styles.stepDone : '', i === current ? styles.stepActive : ''].filter(Boolean).join(' ')}>
            {i < current ? '✓' : i + 1}
          </div>
          <span className={[styles.stepLabel, i === current ? styles.stepLabelActive : ''].filter(Boolean).join(' ')}>{label}</span>
          {i < STEPS.length - 1 && <div className={[styles.stepLine, i < current ? styles.stepLineDone : ''].filter(Boolean).join(' ')} aria-hidden="true" />}
        </div>
      ))}
    </div>
  );
}

function DetailsStep({ musician, packages, selectedPkg, onPkgChange, date, onDateChange, brief, onBriefChange, currency }) {
  const sym = CURRENCY_SYMBOLS[currency] || currency;
  return (
    <div className={styles.stepContent}>
      <Typography as="h3" variant="heading3" className={styles.stepTitle}>Select your package</Typography>

      <div className={styles.pkgGrid}>
        {packages.map((pkg, i) => (
          <button
            key={pkg.name}
            className={[styles.pkgCard, selectedPkg === i ? styles.pkgSelected : ''].filter(Boolean).join(' ')}
            onClick={() => onPkgChange(i)}
            aria-pressed={selectedPkg === i}
          >
            <span className={styles.pkgName}>{pkg.name}</span>
            <span className={styles.pkgPrice}>{sym}{pkg.price}</span>
            {pkg.delivery && pkg.delivery !== '—' && (
              <span className={styles.pkgMeta}>{pkg.delivery} delivery</span>
            )}
          </button>
        ))}
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel} htmlFor="booking-date">
          Preferred date / schedule
        </label>
        <input
          id="booking-date"
          type="text"
          className={styles.fieldInput}
          placeholder="e.g. Week of 15 April, or specific date"
          value={date}
          onChange={(e) => onDateChange(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel} htmlFor="booking-brief">
          Your brief
        </label>
        <textarea
          id="booking-brief"
          className={styles.fieldTextarea}
          placeholder="Tell the musician what you need, your genre, references, deadline…"
          rows={4}
          value={brief}
          onChange={(e) => onBriefChange(e.target.value)}
        />
      </div>
    </div>
  );
}

function ReviewStep({ musician, packages, selectedPkg, date, brief, currency }) {
  const pkg = packages[selectedPkg] || packages[0];
  const sym = CURRENCY_SYMBOLS[currency] || currency;
  const platformFee = Math.round(pkg.price * 0.1);
  const total = pkg.price + platformFee;

  return (
    <div className={styles.stepContent}>
      <Typography as="h3" variant="heading3" className={styles.stepTitle}>Review your order</Typography>

      <div className={styles.orderCard}>
        <div className={styles.orderRow}>
          <img src={musician.avatarSrc} alt="" className={styles.orderAvatar} />
          <div>
            <Typography as="p" variant="label" className={styles.orderName}>{musician.name}</Typography>
            <Typography as="p" variant="caption" className={styles.orderTag}>{musician.tagline}</Typography>
          </div>
        </div>

        <div className={styles.orderLines}>
          <div className={styles.orderLine}>
            <span>Package</span>
            <span className={styles.orderLineVal}>{pkg.name}</span>
          </div>
          <div className={styles.orderLine}>
            <span>Price</span>
            <span className={styles.orderLineVal}>{sym}{pkg.price}</span>
          </div>
          {date && (
            <div className={styles.orderLine}>
              <span>Schedule</span>
              <span className={styles.orderLineVal}>{date}</span>
            </div>
          )}
          <div className={styles.orderLine}>
            <span>Platform fee (10%)</span>
            <span className={styles.orderLineVal}>{sym}{platformFee}</span>
          </div>
        </div>

        <div className={styles.orderTotal}>
          <span>Total</span>
          <span className={styles.orderTotalVal}>{sym}{total}</span>
        </div>
      </div>

      {brief && (
        <div className={styles.briefPreview}>
          <Typography as="p" variant="caption" className={styles.briefLabel}>Your brief</Typography>
          <Typography variant="bodySmall" className={styles.briefText}>{brief}</Typography>
        </div>
      )}
    </div>
  );
}

function ConfirmStep({ musician, bookingRef, onMessage, onBack }) {
  return (
    <div className={styles.successContent}>
      <div className={styles.successIcon}><CheckCircleIcon /></div>
      <Typography as="h2" variant="heading2" className={styles.successTitle}>Booking Request Sent!</Typography>
      <Typography variant="body" className={styles.successDesc}>
        Your request has been sent to <strong>{musician.name}</strong>. You'll hear back within their typical response time.
      </Typography>
      <div className={styles.refBox}>
        <Typography variant="caption" className={styles.refLabel}>Booking reference</Typography>
        <code className={styles.refCode}>{bookingRef}</code>
      </div>
      <div className={styles.successActions}>
        <Button variant="primary" size="lg" fullWidth onClick={onMessage}>Message {musician.name}</Button>
        <Button variant="ghost" size="lg" fullWidth onClick={onBack}>Back to search</Button>
      </div>
    </div>
  );
}

export function BookingDrawer({
  isOpen = false,
  musician = {},
  onClose,
  className = '',
  ...props
}) {
  const [step, setStep] = useState(0);
  const [selectedPkg, setSelectedPkg] = useState(1);
  const [date, setDate] = useState('');
  const [brief, setBrief] = useState('');
  const [bookingRef, setBookingRef] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const packages = musician.packages || [];
  const currency = musician.currency || 'USD';

  if (!isOpen) return null;

  const handleNext = () => setStep((s) => Math.min(s + 1, 2));
  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleConfirm = async () => {
    const pkg = packages[selectedPkg] || packages[0];
    setSubmitting(true);
    setSubmitError('');
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
      const body = {
        musicianId: musician.id,
        serviceId: musician.serviceId || undefined,
        packageName: pkg?.name,
        packagePrice: pkg?.price,
        currency,
        scheduledDate: date || undefined,
        brief: brief || undefined,
      };

      if (token) {
        const response = await fetch(`${API_BASE}/api/bookings`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.message || 'Failed to create booking');
        }

        const data = await response.json();
        setBookingRef(data.id.slice(0, 8).toUpperCase());
      } else {
        // Not authenticated — generate a local reference for display
        setBookingRef(`MQ-${Math.random().toString(36).slice(2, 8).toUpperCase()}`);
      }

      setStep(2);
    } catch (err) {
      setSubmitError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={styles.overlay}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={[styles.drawer, isOpen ? styles.drawerOpen : '', className].filter(Boolean).join(' ')}
        role="dialog"
        aria-modal="true"
        aria-label={`Book ${musician.name}`}
        {...props}
      >
        {/* Header */}
        <div className={styles.header}>
          <div>
            <Typography as="h2" variant="heading3" className={styles.drawerTitle}>
              Book a Session
            </Typography>
            {musician.name && (
              <Typography variant="caption" className={styles.drawerSub}>with {musician.name}</Typography>
            )}
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close booking drawer">
            <CloseIcon />
          </button>
        </div>

        {/* Step indicator */}
        {step < 2 && <StepIndicator current={step} />}

        {/* Content */}
        <div className={styles.body}>
          {step === 0 && (
            <DetailsStep
              musician={musician}
              packages={packages}
              selectedPkg={selectedPkg}
              onPkgChange={setSelectedPkg}
              date={date}
              onDateChange={setDate}
              brief={brief}
              onBriefChange={setBrief}
              currency={currency}
            />
          )}
          {step === 1 && (
            <ReviewStep
              musician={musician}
              packages={packages}
              selectedPkg={selectedPkg}
              date={date}
              brief={brief}
              currency={currency}
            />
          )}
          {step === 2 && (
            <ConfirmStep
              musician={musician}
              bookingRef={bookingRef}
              onMessage={onClose}
              onBack={onClose}
            />
          )}
        </div>

        {/* Footer navigation */}
        {step < 2 && (
          <div className={styles.footer}>
            {submitError && (
              <Typography variant="caption" className={styles.errorMsg}>{submitError}</Typography>
            )}
            {step > 0 && (
              <Button variant="ghost" size="lg" onClick={handleBack} disabled={submitting}>Back</Button>
            )}
            <Button
              variant="primary"
              size="lg"
              fullWidth={step === 0}
              onClick={step === 0 ? handleNext : handleConfirm}
              disabled={submitting}
              className={styles.nextBtn}
            >
              {step === 0 ? 'Review Order →' : submitting ? 'Sending…' : 'Confirm & Send →'}
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

export default BookingDrawer;
