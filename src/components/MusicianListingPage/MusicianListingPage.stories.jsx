import { MusicianListingPage } from './MusicianListingPage';
import { musiciansData } from '../../mocks/musicians';

export default {
  title: 'Pages/MusicianListingPage',
  component: MusicianListingPage,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    onBook: { action: 'booked' },
    onContact: { action: 'contacted' },
  },
};

export const Default = {
  args: {
    musicians: musiciansData,
  },
};

export const Empty = {
  args: {
    musicians: [],
  },
};
