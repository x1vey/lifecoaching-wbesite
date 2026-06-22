import type { BlogPost } from '../types'

export const posts: BlogPost[] = [
  {
    id: 'post-1',
    slug: '5-morning-habits-for-a-healthier-you',
    title: '5 Morning Habits for a Healthier You',
    excerpt:
      'How you start your morning sets the tone for the entire day. Discover five simple habits that can transform your energy, focus, and overall wellbeing.',
    content: `
Starting your day with intention is one of the most powerful things you can do for your health. Here are five morning habits that my most successful clients swear by.

## 1. Hydrate Before Caffeine

Before reaching for your coffee, drink a full glass of water. After 7–8 hours of sleep, your body is naturally dehydrated. Rehydrating first thing jumpstarts your metabolism and improves mental clarity.

## 2. Move Your Body for 10 Minutes

You don't need a full workout. A 10-minute walk, gentle yoga flow, or even some light stretching gets your blood moving and releases endorphins that set a positive tone for the day.

## 3. Eat a Protein-Rich Breakfast

Protein stabilizes blood sugar and keeps you satiated longer. Aim for at least 20–30g of protein in your first meal to avoid the mid-morning energy crash.

## 4. Practice Gratitude

Spend two minutes writing down three things you're grateful for. This simple practice rewires your brain toward positivity and resilience over time.

## 5. Set a Daily Intention

Before diving into emails and tasks, ask yourself: "What would make today a great day?" This keeps you focused on what truly matters rather than reacting to everything that comes your way.

Start with just one of these habits and build from there. Small, consistent actions create lasting change.
    `.trim(),
    coverImageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=450&fit=crop',
    coverImageAlt: 'Person doing morning yoga at sunrise',
    publishedAt: '2024-03-15T08:00:00Z',
    author: 'Coach Alex',
  },
  {
    id: 'post-2',
    slug: 'understanding-stress-and-your-body',
    title: 'Understanding Stress and Your Body',
    excerpt:
      'Chronic stress is one of the biggest obstacles to wellness. Learn how stress affects your body and discover evidence-based strategies to manage it effectively.',
    content: `
Stress is a natural part of life, but when it becomes chronic, it can wreak havoc on your health. Understanding the stress response is the first step to managing it.

## The Stress Response

When you perceive a threat, your body releases cortisol and adrenaline. Your heart rate increases, digestion slows, and your muscles tense. This "fight or flight" response was designed for short-term survival, not the constant low-grade stress of modern life.

## How Chronic Stress Affects You

- **Sleep disruption**: Elevated cortisol interferes with melatonin production
- **Weight gain**: Cortisol promotes fat storage, especially around the abdomen
- **Immune suppression**: Chronic stress makes you more susceptible to illness
- **Mood changes**: Prolonged stress depletes neurotransmitters linked to happiness

## Evidence-Based Stress Management

**Breathwork**: The 4-7-8 breathing technique activates the parasympathetic nervous system within minutes.

**Movement**: Even a 20-minute walk reduces cortisol levels measurably.

**Sleep hygiene**: Prioritizing 7–9 hours of quality sleep is non-negotiable for stress recovery.

**Connection**: Social support is one of the strongest buffers against stress. Invest in your relationships.

The goal isn't to eliminate stress — it's to build resilience so you can recover from it faster.
    `.trim(),
    coverImageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&h=450&fit=crop',
    coverImageAlt: 'Person meditating peacefully in nature',
    publishedAt: '2024-02-28T08:00:00Z',
    author: 'Coach Alex',
  },
  {
    id: 'post-3',
    slug: 'the-truth-about-nutrition-myths',
    title: 'The Truth About Common Nutrition Myths',
    excerpt:
      'From "carbs are bad" to "you need to detox," nutrition is full of myths. Let\'s separate fact from fiction so you can make informed choices about what you eat.',
    content: `
The nutrition world is full of conflicting advice. Here's what the science actually says about some of the most persistent myths.

## Myth 1: Carbs Are Bad for You

Carbohydrates are your body's preferred fuel source. The issue isn't carbs themselves — it's the type and quantity. Whole grains, legumes, fruits, and vegetables are all carbohydrates and are associated with better health outcomes.

## Myth 2: You Need to Detox

Your liver and kidneys are sophisticated detoxification systems that work 24/7. No juice cleanse or supplement can improve on what your body already does naturally. Focus on supporting these organs with adequate hydration, fiber, and limiting alcohol.

## Myth 3: Eating Fat Makes You Fat

Dietary fat is essential for hormone production, brain function, and absorbing fat-soluble vitamins. Healthy fats from avocados, nuts, olive oil, and fatty fish are associated with reduced inflammation and better cardiovascular health.

## Myth 4: You Must Eat Every 2–3 Hours

Meal timing matters far less than total food quality and quantity. Some people thrive on three meals a day; others prefer smaller, more frequent eating. Find what works for your body and lifestyle.

## The Bottom Line

Sustainable nutrition is about eating mostly whole, minimally processed foods, staying hydrated, and enjoying food without guilt. There's no one-size-fits-all approach.
    `.trim(),
    coverImageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=450&fit=crop',
    coverImageAlt: 'Colorful array of healthy whole foods',
    publishedAt: '2024-02-10T08:00:00Z',
    author: 'Coach Alex',
  },
]
