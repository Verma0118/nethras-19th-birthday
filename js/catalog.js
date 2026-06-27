/* eslint-disable no-unused-vars */
const CATALOG = {
  brand: 'Nethraflix',

  profile: {
    name: 'Nethra',
    avatar: 'images/profile.jpg',
  },

  lockedProfile: {
    name: 'Aarav',
    avatar: 'images/aarav.jpg',
  },

  hero: {
    id: 'hero',
    title: 'Us: The Series',
    tagline: 'Happy 19th birthday, my favorite person. Press play on our story.',
    image: 'images/hero.jpg',
    caption:
      'Every season with you has been my favorite. Here\'s to season 19 — and every one after.',
    meta: '2019–2026 · Romance · ★★★★★ · 19 Seasons',
  },

  rows: [
    {
      id: 'greatest-hits',
      title: 'Our Greatest Hits',
      shows: [
        {
          id: 'gh-01',
          title: 'Pilot Episode',
          image: 'images/greatest-hits/01.jpg',
          caption: 'Replace this with your caption — the moment that started it all.',
          meta: 'S1 E1 · Origin Story · ★★★★★',
        },
        {
          id: 'gh-02',
          title: 'The Laugh Track',
          image: 'images/greatest-hits/02.jpg',
          caption: 'You laughing is my favorite sound in the world.',
          meta: 'S2 E4 · Comedy · ★★★★★',
        },
        {
          id: 'gh-03',
          title: 'Late Night Talks',
          image: 'images/greatest-hits/03.jpg',
          caption: 'The conversations I never want to end.',
          meta: 'S3 E7 · Drama · ★★★★★',
        },
        {
          id: 'gh-04',
          title: 'Main Character Energy',
          image: 'images/greatest-hits/04.jpg',
          caption: 'You, being effortlessly amazing.',
          meta: 'S4 E2 · Feel-good · ★★★★★',
        },
        {
          id: 'gh-05',
          title: 'Season Finale',
          image: 'images/greatest-hits/05.jpg',
          caption: 'Every ending with you feels like a new beginning.',
          meta: 'S5 E10 · Romance · ★★★★★',
        },
      ],
    },
    {
      id: 'date-nights',
      title: 'Date Nights',
      shows: [
        {
          id: 'dn-01',
          title: 'Coffee Run Chronicles',
          image: 'images/date-nights/01.jpg',
          caption: 'Two drinks, one table, hours that felt like minutes.',
          meta: '2024 · Cozy · ★★★★★',
        },
        {
          id: 'dn-02',
          title: 'Dinner & A Story',
          image: 'images/date-nights/02.jpg',
          caption: 'The food was great. You were better.',
          meta: '2024 · Romance · ★★★★★',
        },
        {
          id: 'dn-03',
          title: 'Sunset Special',
          image: 'images/date-nights/03.jpg',
          caption: 'Golden hour, but you were the glow.',
          meta: '2025 · Limited Series · ★★★★★',
        },
        {
          id: 'dn-04',
          title: 'Rainy Day Rescue',
          image: 'images/date-nights/04.jpg',
          caption: 'Bad weather, perfect company.',
          meta: '2025 · Comfort · ★★★★★',
        },
        {
          id: 'dn-05',
          title: 'The Sequel',
          image: 'images/date-nights/05.jpg',
          caption: 'We said we\'d come back. We always do.',
          meta: '2026 · Coming soon · ★★★★★',
        },
      ],
    },
    {
      id: 'travel',
      title: 'Travel & Adventures',
      shows: [
        {
          id: 'tr-01',
          title: 'Road Trip Redux',
          image: 'images/travel/01.jpg',
          caption: 'Windows down, playlist on, you beside me.',
          meta: 'Adventure · ★★★★★',
        },
        {
          id: 'tr-02',
          title: 'New City, Same Us',
          image: 'images/travel/02.jpg',
          caption: 'Every place is better when you\'re there.',
          meta: 'Travel · ★★★★★',
        },
        {
          id: 'tr-03',
          title: 'Lost & Found',
          image: 'images/travel/03.jpg',
          caption: 'We took a wrong turn and found a perfect moment.',
          meta: 'Documentary · ★★★★★',
        },
        {
          id: 'tr-04',
          title: 'Mountain Views',
          image: 'images/travel/04.jpg',
          caption: 'The view was incredible. I was looking at you.',
          meta: 'Nature · ★★★★★',
        },
        {
          id: 'tr-05',
          title: 'Postcard Moment',
          image: 'images/travel/05.jpg',
          caption: 'If I could mail one feeling, it\'d be this.',
          meta: 'Memoir · ★★★★★',
        },
      ],
    },
    {
      id: 'favorites',
      title: 'My Favorite Photos of You',
      shows: [
        {
          id: 'fp-01',
          title: 'That Smile',
          image: 'images/favorites/01.jpg',
          caption: 'The one that stops me mid-sentence every time.',
          meta: 'Portrait · ★★★★★',
        },
        {
          id: 'fp-02',
          title: 'Candid Queen',
          image: 'images/favorites/02.jpg',
          caption: 'You didn\'t know I took this. I couldn\'t not.',
          meta: 'Candid · ★★★★★',
        },
        {
          id: 'fp-03',
          title: 'Eyes On You',
          image: 'images/favorites/03.jpg',
          caption: 'My whole world in one frame.',
          meta: 'Romance · ★★★★★',
        },
        {
          id: 'fp-04',
          title: 'Golden Girl',
          image: 'images/favorites/04.jpg',
          caption: 'Light hits you different. So does everything else.',
          meta: 'Aesthetic · ★★★★★',
        },
        {
          id: 'fp-05',
          title: 'The Look',
          image: 'images/favorites/05.jpg',
          caption: 'This photo lives in my head rent-free.',
          meta: 'Classic · ★★★★★',
        },
      ],
    },
    {
      id: 'why-i-love-you',
      title: 'Why I Love You',
      shows: [
        {
          id: 'wl-01',
          title: 'Your Kindness',
          image: 'images/why-i-love-you/01.jpg',
          caption: 'The way you care about people — including me — is everything.',
          meta: 'Character Study · ★★★★★',
        },
        {
          id: 'wl-02',
          title: 'Your Humor',
          image: 'images/why-i-love-you/02.jpg',
          caption: 'Nobody makes me laugh like you do.',
          meta: 'Comedy Special · ★★★★★',
        },
        {
          id: 'wl-03',
          title: 'Your Strength',
          image: 'images/why-i-love-you/03.jpg',
          caption: 'You handle hard things with so much grace.',
          meta: 'Inspirational · ★★★★★',
        },
        {
          id: 'wl-04',
          title: 'Your Heart',
          image: 'images/why-i-love-you/04.jpg',
          caption: 'Big, warm, and somehow still all mine.',
          meta: 'Romance · ★★★★★',
        },
        {
          id: 'letter',
          title: 'A Letter For You',
          image: 'images/letter-cover.jpg',
          caption: 'Open this one last. I wrote it for today.',
          meta: 'Special · ★★★★★ · 1 Letter',
          isLetter: true,
        },
      ],
    },
  ],

  letter: {
    title: 'For Nethra, on your 19th',
    body: [
      'Nethra,',
      '',
      'I made you this little Netflix because you\'re the only thing I ever want to binge — every moment, every memory, every version of you.',
      '',
      'Nineteen looks incredible on you. I\'m so lucky I get a front-row seat to your life.',
      '',
      'Thank you for the laughs, the late nights, the patience, and for being exactly who you are.',
      '',
      'Happy birthday. I love you more than any caption on this site could say.',
    ],
  },
};
