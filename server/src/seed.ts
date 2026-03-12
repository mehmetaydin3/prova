import { getDb } from './db.js';

const musiciansData = [
  {
    id: 'm1',
    name: 'Marcus Johnson',
    tagline: 'Grammy-nominated hip-hop producer & beatmaker',
    bio: 'With over a decade of crafting beats for platinum-selling artists, Marcus brings an unmatched ear for groove and sonic texture.',
    avatarSrc: 'https://i.pravatar.cc/150?img=12',
    coverSrc: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=75&auto=format',
    location: 'Atlanta, GA',
    online: true,
    tier: 'pro',
    badges: ['pro', 'topRated', 'fastResponder'],
    genres: ['Hip-Hop', 'Trap', 'R&B'],
    instruments: ['Beat Making', 'Mixing', 'Sampling'],
    ensembleType: 'solo',
    languages: ['English'],
    rating: 4.9,
    reviewCount: 214,
    responseTime: '< 1 hr',
    completedGigs: 312,
    startingPrice: 75,
    currency: 'USD',
    services: { tracks: true, teach: false, inPerson: false, wedding: false, online: true },
    audioSample: { src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', duration: '2:34', title: 'Late Night Vibes' },
  },
  {
    id: 'm2',
    name: 'Sofia Chen',
    tagline: 'Mixing & Mastering Engineer — 10+ years',
    bio: 'Sofia has mixed and mastered records that have charted globally. Her meticulous ear and industry-standard workflow have made her a go-to for independent and major-label artists alike.',
    avatarSrc: 'https://i.pravatar.cc/150?img=47',
    coverSrc: 'https://images.unsplash.com/photo-1516280440502-a2f0088cb395?w=800&q=75&auto=format',
    location: 'Los Angeles, CA',
    online: true,
    tier: 'verified',
    badges: ['verified', 'topRated', 'fastResponder'],
    genres: ['Pop', 'R&B', 'Soul'],
    instruments: ['Mixing', 'Mastering', 'Dolby Atmos'],
    ensembleType: 'solo',
    languages: ['English', 'Mandarin'],
    rating: 5.0,
    reviewCount: 389,
    responseTime: '< 2 hrs',
    completedGigs: 501,
    startingPrice: 120,
    currency: 'USD',
    services: { tracks: true, teach: true, inPerson: false, wedding: false, online: true },
    audioSample: { src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', duration: '3:02', title: 'Pop Ballad Mix' },
  },
  {
    id: 'm3',
    name: 'Aaliyah Rivera',
    tagline: 'Soulful vocalist & songwriter for hire',
    bio: 'Aaliyah brings raw emotional depth to every session. From smooth R&B hooks to powerful gospel-inspired belts.',
    avatarSrc: 'https://i.pravatar.cc/150?img=34',
    coverSrc: 'https://images.unsplash.com/photo-1598387993441-a364f854cfd6?w=800&q=75&auto=format',
    location: 'New York, NY',
    online: false,
    tier: 'none',
    badges: ['new'],
    genres: ['R&B', 'Soul', 'Gospel'],
    instruments: ['Vocals', 'Songwriting', 'Harmonies'],
    ensembleType: 'solo',
    languages: ['English', 'Spanish'],
    rating: 4.6,
    reviewCount: 18,
    responseTime: '< 4 hrs',
    completedGigs: 22,
    startingPrice: 45,
    currency: 'USD',
    services: { tracks: true, teach: false, inPerson: true, wedding: true, online: false },
    audioSample: { src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', duration: '1:58', title: 'Soulful Hook Demo' },
  },
  {
    id: 'm4',
    name: 'Devon Miles',
    tagline: 'Electronic producer & synthesis expert',
    bio: 'Devon has performed across the underground techno circuit in Europe and teaches synthesis, sound design, and Ableton Live online.',
    avatarSrc: 'https://i.pravatar.cc/150?img=11',
    coverSrc: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d84?w=800&q=75&auto=format',
    location: 'Berlin, Germany',
    online: false,
    tier: 'none',
    badges: [],
    genres: ['Electronic', 'Techno', 'Ambient'],
    instruments: ['Synthesizer', 'Sound Design', 'Ableton Live', 'Modular'],
    ensembleType: 'solo',
    languages: ['English', 'German'],
    rating: 4.8,
    reviewCount: 112,
    responseTime: '< 6 hrs',
    completedGigs: 145,
    startingPrice: 60,
    currency: 'EUR',
    services: { tracks: false, teach: true, inPerson: false, wedding: false, online: true },
    audioSample: null,
  },
  {
    id: 'm5',
    name: 'Elena Rostova',
    tagline: 'Classical violinist — studio sessions & live events',
    bio: 'A graduate of the Royal College of Music, Elena performs at weddings, private events, and corporate functions.',
    avatarSrc: 'https://i.pravatar.cc/150?img=5',
    coverSrc: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&q=75&auto=format',
    location: 'London, UK',
    online: true,
    tier: 'pro',
    badges: ['pro', 'fastResponder'],
    genres: ['Classical', 'Acoustic', 'Pop', 'Cinematic'],
    instruments: ['Violin', 'String Arrangements', 'Sight Reading'],
    ensembleType: 'duo',
    languages: ['English', 'Russian'],
    rating: 4.9,
    reviewCount: 87,
    responseTime: '< 3 hrs',
    completedGigs: 203,
    startingPrice: 100,
    currency: 'GBP',
    services: { tracks: true, teach: true, inPerson: true, wedding: true, online: true },
    audioSample: { src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', duration: '1:45', title: 'String Quartet Cover' },
  },
  {
    id: 'm6',
    name: 'John Doe',
    tagline: 'Jazz guitarist, composer & tutor',
    bio: 'John has gigged the Chicago jazz circuit for 15 years and now offers one-on-one guitar lessons and music theory courses.',
    avatarSrc: 'https://i.pravatar.cc/150?img=60',
    coverSrc: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=75&auto=format',
    location: 'Chicago, IL',
    online: false,
    tier: 'none',
    badges: [],
    genres: ['Jazz', 'Blues', 'Bossa Nova'],
    instruments: ['Guitar', 'Music Theory', 'Composition'],
    ensembleType: 'solo',
    languages: ['English'],
    rating: 4.4,
    reviewCount: 34,
    responseTime: '< 12 hrs',
    completedGigs: 58,
    startingPrice: 50,
    currency: 'USD',
    services: { tracks: false, teach: true, inPerson: true, wedding: false, online: false },
    audioSample: null,
  },
  {
    id: 'm7',
    name: 'The Ember Quartet',
    tagline: 'Award-winning string quartet for weddings & events',
    bio: 'Four conservatoire-trained musicians delivering refined string performances for weddings, galas, and corporate events.',
    avatarSrc: 'https://i.pravatar.cc/150?img=8',
    coverSrc: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&q=75&auto=format',
    location: 'Edinburgh, UK',
    online: false,
    tier: 'pro',
    badges: ['pro', 'topRated'],
    genres: ['Classical', 'Pop Crossover', 'Cinema'],
    instruments: ['Violin', 'Viola', 'Cello', 'String Quartet'],
    ensembleType: 'quartet',
    languages: ['English', 'French'],
    rating: 5.0,
    reviewCount: 178,
    responseTime: '< 8 hrs',
    completedGigs: 312,
    startingPrice: 800,
    currency: 'GBP',
    services: { tracks: false, teach: false, inPerson: true, wedding: true, online: false },
    audioSample: { src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', duration: '2:10', title: 'Wedding Ceremony Set' },
  },
  {
    id: 'm8',
    name: 'Priya Sharma',
    tagline: 'Indian classical & fusion vocalist — recording & lessons',
    bio: 'Trained in Hindustani classical music and experienced in cross-genre fusion, Priya offers remote vocal sessions and online lessons.',
    avatarSrc: 'https://i.pravatar.cc/150?img=48',
    coverSrc: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=75&auto=format',
    location: 'Mumbai, India',
    online: true,
    tier: 'verified',
    badges: ['verified'],
    genres: ['Indian Classical', 'Fusion', 'World Music'],
    instruments: ['Vocals', 'Raga', 'Improvisation'],
    ensembleType: 'solo',
    languages: ['English', 'Hindi', 'Punjabi'],
    rating: 4.8,
    reviewCount: 63,
    responseTime: '< 4 hrs',
    completedGigs: 94,
    startingPrice: 40,
    currency: 'USD',
    services: { tracks: true, teach: true, inPerson: false, wedding: false, online: true },
    audioSample: { src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', duration: '2:22', title: 'Raga Bhairavi Demo' },
  },
  {
    id: 'm9',
    name: 'Kofi Asante',
    tagline: 'Afrobeats session drummer & live performer',
    bio: 'Kofi brings the afrobeats rhythmic energy to any project. Available for studio sessions, live gig hire, and online drum lessons.',
    avatarSrc: 'https://i.pravatar.cc/150?img=52',
    coverSrc: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=800&q=75&auto=format',
    location: 'Accra, Ghana',
    online: true,
    tier: 'pro',
    badges: ['pro'],
    genres: ['Afrobeats', 'Highlife', 'Afro-Fusion'],
    instruments: ['Drums', 'Percussion', 'Live Performance'],
    ensembleType: 'solo',
    languages: ['English', 'Twi'],
    rating: 4.9,
    reviewCount: 55,
    responseTime: '< 3 hrs',
    completedGigs: 88,
    startingPrice: 65,
    currency: 'USD',
    services: { tracks: true, teach: true, inPerson: true, wedding: false, online: true },
    audioSample: { src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', duration: '1:50', title: 'Afrobeats Groove Session' },
  },
  {
    id: 'm10',
    name: 'Maria & Luis Duo',
    tagline: 'Flamenco guitar & vocals duo for events & weddings',
    bio: 'A passionate Flamenco duo based in Seville, bringing the fire and passion of authentic Spanish flamenco to weddings and corporate functions.',
    avatarSrc: 'https://i.pravatar.cc/150?img=38',
    coverSrc: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&q=75&auto=format',
    location: 'Seville, Spain',
    online: false,
    tier: 'verified',
    badges: ['verified'],
    genres: ['Flamenco', 'Spanish Classical', 'Latin'],
    instruments: ['Guitar', 'Vocals', 'Dance'],
    ensembleType: 'duo',
    languages: ['Spanish', 'English'],
    rating: 4.7,
    reviewCount: 42,
    responseTime: '< 12 hrs',
    completedGigs: 76,
    startingPrice: 500,
    currency: 'EUR',
    services: { tracks: false, teach: false, inPerson: true, wedding: true, online: false },
    audioSample: { src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', duration: '2:05', title: 'Flamenco Showcase' },
  },
  {
    id: 'm11',
    name: 'Jade Williams',
    tagline: 'Piano teacher & jazz pianist — all ages welcome',
    bio: 'Jade has been teaching piano for 12 years, specialising in beginner adults and children.',
    avatarSrc: 'https://i.pravatar.cc/150?img=44',
    coverSrc: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=75&auto=format',
    location: 'Toronto, Canada',
    online: true,
    tier: 'verified',
    badges: ['verified', 'topRated'],
    genres: ['Jazz', 'Classical', 'Pop'],
    instruments: ['Piano', 'Music Theory', 'Sight Reading', 'Exam Prep'],
    ensembleType: 'solo',
    languages: ['English', 'French'],
    rating: 4.9,
    reviewCount: 201,
    responseTime: '< 2 hrs',
    completedGigs: 480,
    startingPrice: 55,
    currency: 'CAD',
    services: { tracks: false, teach: true, inPerson: true, wedding: false, online: true },
    audioSample: null,
  },
  {
    id: 'm12',
    name: 'RezSynth',
    tagline: 'Experimental / ambient producer — soundtrack & sync',
    bio: 'RezSynth specialises in cinematic ambient production for sync licensing, film, and games.',
    avatarSrc: 'https://i.pravatar.cc/150?img=26',
    coverSrc: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&q=75&auto=format',
    location: 'Portland, OR',
    online: true,
    tier: 'none',
    badges: ['new'],
    genres: ['Ambient', 'Experimental', 'Cinematic', 'Electronic'],
    instruments: ['Synthesizer', 'Sound Design', 'Film Scoring', 'Ableton Live'],
    ensembleType: 'solo',
    languages: ['English'],
    rating: 4.7,
    reviewCount: 12,
    responseTime: '< 5 hrs',
    completedGigs: 15,
    startingPrice: 90,
    currency: 'USD',
    services: { tracks: true, teach: false, inPerson: false, wedding: false, online: true },
    audioSample: { src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3', duration: '3:15', title: 'Liminal Space (Preview)' },
  },
];

async function seed() {
  const db = await getDb();

  // Clear existing seed data
  await db.run('DELETE FROM musicians');
  await db.run('DELETE FROM services');

  for (const m of musiciansData) {
    // Map current mock data to new schema
    const musicianId = m.id;
    
    // Insert Musician
    await db.run(
      `INSERT INTO musicians (
        id, name, headline, bio, location, timezone, languages, instruments,
        genres, skills, ratingAverage, ratingCount, completedJobs, responseTime,
        gallery, audioSamples, videoSamples, badges, avatarSrc, coverSrc,
        tier, startingPrice, currency
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        musicianId,
        m.name,
        m.tagline, // headline
        m.bio,
        m.location,
        'UTC-5', // timezone
        JSON.stringify(m.languages),
        JSON.stringify(m.instruments),
        JSON.stringify(m.genres),
        JSON.stringify(m.instruments), // skills
        m.rating, // ratingAverage
        m.reviewCount, // ratingCount
        m.completedGigs, // completedJobs
        m.responseTime,
        JSON.stringify([]), // gallery
        JSON.stringify(m.audioSample ? [m.audioSample] : []), // audioSamples
        JSON.stringify([]), // videoSamples
        JSON.stringify(m.badges),
        m.avatarSrc,
        m.coverSrc,
        m.tier,
        m.startingPrice,
        m.currency,
      ]
    );

    // Insert Services for each musician based on their old services bitmask/object
    const services = [];
    if (m.services.tracks) {
      services.push({
        type: 'remote',
        title: 'Remote Session Recording',
        description: 'Professional recording from my home studio.',
      });
    }
    if (m.services.online) {
      services.push({
        type: 'remote',
        title: 'Online Music Lessons',
        description: 'One-on-one virtual coaching.',
      });
    }
    if (m.services.teach) {
      services.push({
        type: 'in-person',
        title: 'In-Person Lessons',
        description: 'Private lessons at my studio or your location.',
      });
    }
    if (m.services.wedding || m.services.inPerson) {
      services.push({
        type: 'in-person',
        title: 'Live Performance / Event',
        description: 'High-energy performance for your event.',
      });
    }

    for (const s of services) {
      const serviceId = `s-${musicianId}-${s.type}-${Math.random().toString(36).substr(2, 5)}`;
      await db.run(
        `INSERT INTO services (
          id, musicianId, serviceType, title, description, deliverables,
          startingPrice, priceType, turnaroundTime, revisionsIncluded,
          tags, deliveryMode
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          serviceId,
          musicianId,
          s.type,
          s.title,
          s.description,
          JSON.stringify(['High-quality audio files', 'Professional performance']),
          m.startingPrice,
          'starting',
          '3 days',
          2,
          JSON.stringify(m.genres),
          s.type === 'remote' ? 'remote' : 'in-person',
        ]
      );
    }
  }

  console.log(`Seeded ${musiciansData.length} musicians and their services.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
