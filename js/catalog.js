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
    showId: 'us-the-series',
    tagline: 'Happy 19th birthday. Six months in, and you\'re already my favorite story.',
    meta: '6 Months, Romance, ★★★★★',
  },

  rows: [
    {
      id: 'our-story',
      title: 'Our Story',
      shows: ['us-the-series', 'first-adventures'],
    },
    {
      id: 'favorites',
      title: 'My Favorite Photos of You',
      shows: ['that-smile', 'facetime-favorites'],
    },
    {
      id: 'for-you',
      title: 'For You',
      shows: ['why-i-love-you', 'letter'],
    },
  ],

  shows: {
    'us-the-series': {
      id: 'us-the-series',
      title: 'Us: The Series',
      meta: 'Limited Series, Romance, ★★★★★, 2 Episodes',
      synopsis: 'Six months of us. Every moment worth replaying.',
      poster: 'images/shows/01-a.jpg',
      scenes: [
        {
          image: 'images/shows/01-a.jpg',
          caption: 'Replace this. The moment that started it all.',
        },
        {
          image: 'images/shows/01-b.jpg',
          caption: 'And the ones after that made it even better.',
        },
      ],
    },
    'first-adventures': {
      id: 'first-adventures',
      title: 'First Adventures',
      meta: 'Adventure, ★★★★★, 2 Episodes',
      synopsis: 'Every place is better when you\'re there.',
      poster: 'images/shows/02-a.jpg',
      scenes: [
        {
          image: 'images/shows/02-a.jpg',
          caption: 'Windows down, playlist on, you beside me.',
        },
        {
          image: 'images/shows/02-b.jpg',
          caption: 'We took a wrong turn and found a perfect moment.',
        },
      ],
    },
    'that-smile': {
      id: 'that-smile',
      title: 'That Smile',
      meta: 'Portrait, ★★★★★, 2 Episodes',
      synopsis: 'The one that stops me mid-sentence every time.',
      poster: 'images/shows/03-a.jpg',
      scenes: [
        {
          image: 'images/shows/03-a.jpg',
          caption: 'You didn\'t know I took this. I couldn\'t not.',
        },
        {
          image: 'images/shows/03-b.jpg',
          caption: 'My whole world in one frame.',
        },
      ],
    },
    'facetime-favorites': {
      id: 'facetime-favorites',
      title: 'FaceTime Favorites',
      meta: 'FaceTime, Romance, ★★★★★, 13 Episodes',
      synopsis: 'Every call, every screenshot, every time your face lit up my screen.',
      poster: 'images/shows/facetime/01.jpg',
      loop: false,
      scenes: [
        {
          image: 'images/shows/facetime/01.jpg',
          caption: 'This smile is why I never let a call go to voicemail.',
        },
        {
          image: 'images/shows/facetime/02.jpg',
          caption: 'Yes, I looked like this on FaceTime. No, I don\'t regret it.',
        },
        {
          image: 'images/shows/facetime/03.jpg',
          caption: 'My favorite face to see on my screen.',
        },
        {
          image: 'images/shows/facetime/04.jpg',
          caption: 'The pout that somehow made me fall harder.',
        },
        {
          image: 'images/shows/facetime/05.jpg',
          caption: 'You have no idea how cute you are when you do this.',
        },
        {
          image: 'images/shows/facetime/06.jpg',
          caption: 'Caught you being perfectly you.',
        },
        {
          image: 'images/shows/facetime/07.jpg',
          caption: 'Nobody makes me laugh on a call like you do.',
        },
        {
          image: 'images/shows/facetime/08.jpg',
          caption: 'I screenshot moments like this and keep them forever.',
        },
        {
          image: 'images/shows/facetime/09.jpg',
          caption: 'Late night calls I never wanted to hang up on.',
        },
        {
          image: 'images/shows/facetime/10.jpg',
          caption: 'Cozy calls that made the distance feel smaller.',
        },
        {
          image: 'images/shows/facetime/11.jpg',
          caption: 'Even half your face is my whole favorite view.',
        },
        {
          image: 'images/shows/facetime/12.jpg',
          caption: 'Blurry, chaotic, perfect. Just like us.',
        },
        {
          image: 'images/shows/facetime/13.jpg',
          caption: 'Six months of calls, and I\'d answer every single one again.',
        },
      ],
    },
    'why-i-love-you': {
      id: 'why-i-love-you',
      title: 'Why I Love You',
      meta: 'Romance, ★★★★★, 2 Episodes',
      synopsis: 'A few of the million reasons.',
      poster: 'images/shows/05-a.jpg',
      scenes: [
        {
          image: 'images/shows/05-a.jpg',
          caption: 'The way you care about people, including me, is everything.',
        },
        {
          image: 'images/shows/05-b.jpg',
          caption: 'Nobody makes me laugh like you do.',
        },
      ],
    },
    letter: {
      id: 'letter',
      title: 'A Letter For You',
      meta: 'Special, ★★★★★',
      synopsis: 'Open this one last. I wrote it for today.',
      poster: 'images/letter-cover.jpg',
      isLetter: true,
      scenes: [],
    },
  },

  letter: {
    title: 'For Nethra, on your 19th',
    body: [
      'Nethra,',
      '',
      'I made you this little Netflix because you\'re the only thing I ever want to binge. Every moment, every memory, every version of you.',
      '',
      'Six months in, and I already feel like the luckiest person alive. Nineteen looks incredible on you.',
      '',
      'Thank you for the laughs, the late nights, the patience, and for being exactly who you are.',
      '',
      'Happy birthday. I love you more than any caption on this site could say.',
    ],
  },

  loader: {
    messages: [
      'Gathering your cutest memories...',
      'Sprinkling a little magic...',
      'Getting everything just right...',
      'Almost ready for you, Nethra...',
    ],
    welcome: 'Welcome to Nethraflix ♥',
  },
};
