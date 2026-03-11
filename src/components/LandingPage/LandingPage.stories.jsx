import { LandingPage } from './LandingPage';
import { musiciansData } from '../../mocks/musicians';

export default {
  title: 'Pages/LandingPage',
  component: LandingPage,
  parameters: {
    layout: 'fullscreen',
  },
};

export const Default = {
  args: {
    heroProps: {
      headline: "The Premium Network for Modern Musicians.",
      subheadline: "Connect, collaborate, and create with the world's most talented independent artists, producers, and engineers.",
      metadata: ["12,000+ Creators", "Global Community", "Verified Pros"],
      imageSrc: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80",
    },
    contextProps: {
      text: "Finding the right sound shouldn't require compromising your vision. We built a design system and platform that treats musicians like the professionals they are, providing clear, immersive discovery.",
      pullQuote: "I don't know what guidance applies to me anymore. I just want to find a cellist who gets my vibe.",
    },
    primaryFeatureProps: {
      title: "Audio First Discovery",
      description: "Our platform ensures the work speaks for itself. Immersive audio previews with waveform data allow you to hear exactly what a musician brings to the table before you ever look at their resume.",
      imageSrc: "https://images.unsplash.com/photo-1516280440502-a2f0088cb395?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    },
    secondaryFeatureProps: {
      title: "Clear, Transparent Pricing",
      description: "No more endless DMs just to find out if someone is in your budget. Verified pros display their starting rates upfront, allowing you to book sessions confidently.",
      imageSrc: "https://images.unsplash.com/photo-1621619856624-42fd193a0661?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    },
    metricsProps: {
      metrics: [
        { value: "4.9/5", label: "Average Rating" },
        { value: "24hrs", label: "Typical Response" },
        { value: "10k+", label: "Tracks Delivered" },
      ]
    },
    listingProps: {
      musicians: musiciansData
    }
  },
};
