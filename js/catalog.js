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
      shows: ['letter'],
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
      title: 'Our Places',
      meta: 'Adventure, Romance, ★★★★★, 23 Episodes',
      synopsis: 'Every dumb date, dorm night, and random adventure with chikki.',
      poster: 'images/shows/places/06.jpg',
      fit: 'contain',
      loop: false,
      scenes: [
        { image: 'images/shows/places/01.jpg', caption: 'Flowers in the dorm. Chikki in pajama pants like the bouquet was not a big deal.' },
        { image: 'images/shows/places/02.jpg', caption: 'Booth date. I tried to look serious. Chikki was not buying it.' },
        { image: 'images/shows/places/03.jpg', caption: 'Fancy at night. Chikki looked like a whole movie. I just stood there.' },
        { image: 'images/shows/places/04.jpg', caption: 'I did bunny ears behind her head. She acted shocked. We both know she started it.' },
        { image: 'images/shows/places/05.jpg', caption: 'Dressed up for hours. Photo ended up in a hallway that smells like laundry.' },
        { image: 'images/shows/places/06.jpg', caption: 'Garden date. Chikki matched the flowers on purpose. I wore white and hoped for the best.' },
        { image: 'images/shows/places/07.jpg', caption: 'Mirror pic. Chikki had the fit. I had the phone. Fair trade.' },
        { image: 'images/shows/places/08.jpg', caption: 'Took chikki to see a Dalek. She was unimpressed. I was having the time of my life.' },
        { image: 'images/shows/places/09.jpg', caption: 'Freezing on campus. Chikki stuck her tongue out. I briefly pretended I did not know her.' },
        { image: 'images/shows/places/10.jpg', caption: 'Skincare night. Chikki looked glowing. I looked like a shaving cream incident.' },
        { image: 'images/shows/places/11.jpg', caption: 'Nice restaurant. Good food. Better view sitting across from chikki.' },
        { image: 'images/shows/places/12.jpg', caption: 'CHICAGO on the shirt. Chikki laughing at something stupid I said. Peak us.' },
        { image: 'images/shows/places/13.jpg', caption: 'Alma Mater at midnight. Two Illinois kids being annoying on campus. Zero regrets.' },
        { image: 'images/shows/places/14.jpg', caption: 'Holi. Chikki was yellow. I was pink. Both of us were a mess and still smiling.' },
        { image: 'images/shows/places/15.jpg', caption: 'Ice skating. I held chikki up. She politely ignored that I was struggling.' },
        { image: 'images/shows/places/16.jpg', caption: 'Biaggi\'s. Too much bread. Chikki still said yes to dessert. Legend.' },
        { image: 'images/shows/places/17.jpg', caption: 'Chikki at the Mexican place looking way too cute. I may have eaten half the chips before she sat down.' },
        { image: 'images/shows/places/18.jpg', caption: 'Made chikki stop for a photo at the Mosaic browser plaque. She humored my nerd moment. I love her.' },
        { image: 'images/shows/places/19.jpg', caption: 'Late campus walk. Hoodie weather. Chikki looking cute. Me making a face for no reason.' },
        { image: 'images/shows/places/20.jpg', caption: 'Stitch sweater. Tongues out. Maturity level: zero. Fun level: max.' },
        { image: 'images/shows/places/21.jpg', caption: 'Atomic Wings. Chikki yelling at the camera. I pointed at her like she was not obviously the best part.' },
        { image: 'images/shows/places/22.jpg', caption: 'Observatory night. Stars above. Chikki right next to me. Pretty solid deal if you ask me.' },
        { image: 'images/shows/places/23.jpg', caption: 'Mall Christmas tree. Chikki on my shoulder. Black Friday chaos behind us. Still my favorite.' },
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
      title: 'My FaceTime Baby',
      meta: 'FaceTime, Romance, ★★★★★, 13 Episodes',
      synopsis: 'Every FaceTime screenshot of chikki that I refused to delete.',
      poster: 'images/shows/facetime/01.jpg',
      fit: 'contain',
      loop: false,
      scenes: [
        {
          image: 'images/shows/facetime/01.jpg',
          caption: 'Chikki smiling on call. I screenshot it like a creep. No regrets.',
        },
        {
          image: 'images/shows/facetime/02.jpg',
          caption: 'Yes I looked like this on FaceTime. Chikki still answered. That\'s love.',
        },
        {
          image: 'images/shows/facetime/03.jpg',
          caption: 'My favorite notification: chikki calling.',
        },
        {
          image: 'images/shows/facetime/04.jpg',
          caption: 'The pout. Works every time. I am weak.',
        },
        {
          image: 'images/shows/facetime/05.jpg',
          caption: 'Chikki doing the face. I had to save evidence.',
        },
        {
          image: 'images/shows/facetime/06.jpg',
          caption: 'Caught her mid-laugh. Best kind of screenshot.',
        },
        {
          image: 'images/shows/facetime/07.jpg',
          caption: 'Nobody makes me laugh on a call like chikki does.',
        },
        {
          image: 'images/shows/facetime/08.jpg',
          caption: 'Blurry but cute. Very on brand for us.',
        },
        {
          image: 'images/shows/facetime/09.jpg',
          caption: 'Late night call. Neither of us wanted to hang up first.',
        },
        {
          image: 'images/shows/facetime/10.jpg',
          caption: 'Cozy call. Chikki in bed. Me pretending I was not also in bed.',
        },
        {
          image: 'images/shows/facetime/11.jpg',
          caption: 'Half her face. Still my whole favorite view.',
        },
        {
          image: 'images/shows/facetime/12.jpg',
          caption: 'Chaotic, blurry, perfect. Just like our calls.',
        },
        {
          image: 'images/shows/facetime/13.jpg',
          caption: 'Six months of calls with chikki. I\'d pick up every single one.',
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
      wide: true,
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
