import { useState } from 'react';
import { BookingDrawer } from './BookingDrawer';
import { Button } from '../../ui/Button/Button';
import { musiciansData } from '../../../mocks/musicians';

export default {
  title: 'Booking/BookingDrawer',
  component: BookingDrawer,
  parameters: { layout: 'fullscreen' },
};

export const Interactive = {
  render: () => {
    const [open, setOpen] = useState(false);
    const musician = musiciansData[0];
    return (
      <div style={{ padding: '40px', minHeight: '100vh', background: 'var(--color-surface-default)' }}>
        <Button variant="primary" size="lg" onClick={() => setOpen(true)}>
          Open Booking Drawer
        </Button>
        <BookingDrawer
          isOpen={open}
          musician={musician}
          onClose={() => setOpen(false)}
        />
      </div>
    );
  },
};

export const WithWeddingQuartet = {
  render: () => {
    const [open, setOpen] = useState(false);
    const musician = musiciansData.find((m) => m.id === 'm7');
    return (
      <div style={{ padding: '40px', minHeight: '100vh', background: 'var(--color-surface-default)' }}>
        <Button variant="primary" size="lg" onClick={() => setOpen(true)}>
          Book The Ember Quartet
        </Button>
        <BookingDrawer
          isOpen={open}
          musician={musician}
          onClose={() => setOpen(false)}
        />
      </div>
    );
  },
};
