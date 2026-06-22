import type { CoachingService } from '../types'

export const services: CoachingService[] = [
  {
    id: 'what-is-soundbath',
    title: 'What is a sound bath?',
    description:
      'Sound baths are a therapeutic and meditative experience where you are “bathed” in sound waves. These waves are produced by various sources, including healing instruments such as gongs, singing bowls, percussion, chimes, rattles, tuning forks, and even the human voice itself!',
    benefits: [],
    ctaLabel: 'Upcoming sound events',
    ctaHref: 'https://events.humanitix.com/host/emora-suara-sound',
  },
  {
    id: 'how-it-works',
    title: 'How Do Sound Baths Work?',
    description:
      'In a controlled environment, sound vibrations resonate at specific frequencies that support the body and guide the mind into deeper states of consciousness, promoting healing and inner peace. Through these sounds and vibrations, your mind enters a meditative and relaxed state, whereby your brainwave state is entrained with the frequencies of the instruments from the normal waking state (beta) to a relaxed state (alpha), dream-like state (theta), or even restorative sleep state (delta). As the mind and body relax, the heart rate and blood pressure decrease and breathing becomes deeper. This brings about re-balancing and healing at mental, emotional, and physical levels.',
    benefits: [
      'Lowers baseline stress levels',
      'Facilitates transition into healing parasympathetic state'
    ],
    ctaLabel: 'Learn More',
    ctaHref: 'https://www.emorasuara.com/sound-baths',
  },
  {
    id: 'what-to-expect',
    title: 'What to expect?',
    description:
      'During the sessions, you lie on a comfortable mat with a blanket and pillow. We start with normal breathing or guided meditation to anchor ourselves in the present moment. I use various instruments to create sounds & frequencies where you will feel the vibrations flow through your mind and body. Towards the end of the session, I will hold you in silence and gently guide you back to awareness and slow movement.',
    benefits: [
      'Grounding and anchoring in the present moment',
      'Natural release of emotions',
      'Gentle closure with gratitude'
    ],
    ctaLabel: 'Book a session',
    ctaHref: 'https://events.humanitix.com/host/emora-suara-sound',
  },
]
