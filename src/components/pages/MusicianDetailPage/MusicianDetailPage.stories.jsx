import { musiciansData } from '../../../mocks/musicians';
import { MusicianDetailPage } from './MusicianDetailPage';

export default {
  title: 'Pages/MusicianDetailPage',
  component: MusicianDetailPage,
  parameters: { layout: 'fullscreen' },
};

const elena = musiciansData.find((m) => m.id === 'm5');
const related = musiciansData.filter((m) => m.id !== 'm5').slice(0, 4);

export const ElenaRostova = {
  args: {
    musician: elena,
    relatedMusicians: related,
    isDark: false,
  },
};

export const MarcusJohnson = {
  args: {
    musician: musiciansData[0],
    relatedMusicians: musiciansData.slice(1, 5),
    isDark: false,
  },
};

export const EmberQuartet = {
  args: {
    musician: musiciansData.find((m) => m.id === 'm7'),
    relatedMusicians: musiciansData.filter((m) => m.services?.wedding).slice(0, 4),
    isDark: false,
  },
};
