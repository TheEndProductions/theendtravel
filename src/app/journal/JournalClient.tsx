'use client';
import { useState } from 'react';
import BookShelf from '@/components/journal/BookShelf';
import JournalBook from '@/components/journal/JournalBook';
import type { JournalEntry } from '@/components/journal/types';

const JOURNALS: JournalEntry[] = [
  {
    id: 'give-me-your-hand',
    title: "Give Me Your Hand & I'll Give You My Mind.",
    author: 'Ethan Fox',
    location: 'Wasatch Mountains, Utah',
    date: '2025',
    coverColor: '#5C3A1E',
    spineColor: '#4A2E16',
    pages: [
      {
        type: 'text',
        content: `Everyone wants to be happy, and it seems that very few people feel like they really are. I ask myself why this is & why is it so hard to achieve for some people, or rather hard to wrap your head around. It's really just all about perspective, your intentions with your happiness. Why do you even yearn for it? What do you see at the end of the tunnel? The perceived "journey" to being happy isn't a journey at all, not a physical one, you can do it right where you are right now. How do you see the world? What lens do you see the "good & bad" things in your life? How quickly are you willing to conform to the negative things, thoughts & feelings & how long are you able to believe in yourself while faced with these things?`,
      },
      {
        type: 'text',
        content: `I believe that no matter what, if you never stop doing a little bit, small steps, no matter the obstacles in your way, no matter the time it takes you will get there, this is a rule for a physical goal but also can be applied to really anything.\n\nHappiness takes consistent attention to upkeep, but once you know how you uniquely feel happy its as easy as reminding yourself. It's inevitable to fall out of but very possible to get back. As you take these small steps you begin to just figure it out, as with anything else in my life I just "figure it out". This means you ask questions, in fact question everything, as with any form of research you must keep asking questions and be solution oriented. With this posture you have no walls, no enemies, no regret. Knowing is half the battle, after you know, you do.`,
      },
      {
        type: 'text',
        content: `Answer the questions that you ask yourself, then after that ask why it was the answer. There is no point in knowing an answer if you don't understand why it's your answer. Only then is it a complete thought. Ask your mind & your body when it feels most happy, most upset, most stressed & most euphoric. Then ask why. Get every angle.\n\nMost people look for happiness & fulfillment outside of themselves in things or other people, some search for it in money or recognition. Although you may find some laying around, it's temporary & it doesn't belong to you. You find it here & there but these are finite, false peaks that if hooked as your main source the longer you are the longer it'll take to get back to yourself.`,
      },
      {
        type: 'text',
        content: `It's ok to use some of these things as tools to help you be & do what you love. But at the end of it all it's you, you have always been and always will be your infinite source. The source never runs out but just as life constantly changes & we are always growing, over time you can develop different ways to tap into this source. Our bodies & minds are consistently changing over the courses of our lives.\n\nFor example your skin cells replaces itself every 2-4 weeks, stomach lining every 2-5 days, Red Blood Cells every 120 days, Liver 150 days, even your skeleton every 10 years. The only thing that doesn't is the neurons in your Cerebral Cortex, this doesn't renew because it's responsible for storing information and would effectively be like wiping a hard drive if it were renewed.`,
      },
      {
        type: 'text',
        content: `But there is one very important exception to this in your brain. It's the Hippocampus, the neurons in your Hippocampus are constantly being produced because its responsible for handling the continuous stream of information into memories that we create every second of everyday. It grows and advances because we live, we are conscious and experiencing, therefore we need more to process our lives. The Hippocampus never completes its developmental process from birth to the day you die.`,
      },
    ],
  },
];

export default function JournalClient() {
  const [openJournal, setOpenJournal] = useState<JournalEntry | null>(null);

  if (openJournal) {
    return <JournalBook journal={openJournal} onClose={() => setOpenJournal(null)} />;
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A' }}>
      <section style={{ padding: '160px 24px 40px', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: '#C4530A', textTransform: 'uppercase', letterSpacing: '0.25em' }}>Journal</div>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(32px, 6vw, 52px)', fontWeight: 600, color: '#F5F2ED', margin: 0, lineHeight: 1.15 }}>Words From The Road</h1>
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '17px', color: '#D4CFC7', lineHeight: 1.8, margin: 0, maxWidth: '480px' }}>Handwritten reflections, travel stories, and thoughts from the journey. Pull a journal from the shelf.</p>
          <div style={{ width: '40px', height: '1px', background: 'rgba(245,242,237,0.15)', marginTop: '8px' }} />
        </div>
      </section>

      <section style={{ padding: '40px 24px 120px' }}>
        <BookShelf journals={JOURNALS} onSelect={(j) => setOpenJournal(j)} />
      </section>

      <section style={{ padding: '0 24px 100px', textAlign: 'center' }}>
        <div style={{ maxWidth: '500px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: '#8B7355', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Share Your Story</div>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '24px', fontWeight: 600, color: '#F5F2ED', margin: 0 }}>Write Your Own</h2>
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '15px', color: '#D4CFC7', lineHeight: 1.7, margin: 0 }}>Have a story from the road? Submit your journal entry and it could end up on the shelf.</p>
          <a href="/community/submit" style={{ display: 'inline-flex', alignItems: 'center', height: '44px', padding: '0 24px', borderRadius: '6px', background: '#C4530A', color: '#F5F2ED', fontSize: '14px', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, textDecoration: 'none' }}>Submit a Journal Entry</a>
        </div>
      </section>
    </div>
  );
}
