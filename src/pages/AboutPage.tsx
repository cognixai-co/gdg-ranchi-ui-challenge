import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { sampleTimeline, samplePartnerCampuses } from '../data/communityData';
import {
  Asterisk,
  ArrowRight,
  Cpu,
  Layers,
  Smartphone,
  Terminal,
  Globe,
  Compass,
  Heart,
  Plus
} from 'lucide-react';

const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children,
  delay = 0,
  className = ''
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-shown={shown}
      className={`cx-reveal ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Accent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="cx-accent">{children}</span>
);

const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="cx-mono flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.14em] text-[#121212]/55">
    <Asterisk className="w-3 h-3 text-[#0b7a3f]" strokeWidth={1.6} />
    {children}
  </p>
);

const SectionHeading: React.FC<{ eyebrow: string; children: React.ReactNode }> = ({
  eyebrow,
  children
}) => (
  <Reveal className="mx-auto max-w-3xl text-center">
    <Eyebrow>{eyebrow}</Eyebrow>
    <h2 className="mt-5 text-4xl font-normal leading-[1.05] tracking-[-0.03em] text-[#121212] sm:text-5xl lg:text-[56px]">
      {children}
    </h2>
  </Reveal>
);

const Button: React.FC<{
  to: string;
  children: React.ReactNode;
  variant?: 'primary' | 'outline';
}> = ({ to, children, variant = 'outline' }) => (
  <Link
    to={to}
    className={`cx-btn ${variant === 'primary' ? 'cx-btn-primary' : 'cx-btn-outline'}`}
  >
    <span className="relative z-10 flex items-center gap-2">
      {children}
      <ArrowRight className="cx-arrow h-4 w-4" strokeWidth={1.6} />
    </span>
  </Link>
);

const stats = [
  { value: '2018', label: 'Founded' },
  { value: '5,000+', label: 'Developers upskilled' },
  { value: '450+', label: 'DevFest attendees' },
  { value: '₹0', label: 'Cost to join' }
];

const tracks = [
  {
    icon: Cpu,
    name: 'AI & Machine Learning',
    detail: 'Gemini API, Vertex AI, TensorFlow, and building agents with multimodal models.'
  },
  {
    icon: Layers,
    name: 'Google Cloud & DevOps',
    detail: 'Cloud Run, Kubernetes, BigQuery, and certification study groups.'
  },
  {
    icon: Smartphone,
    name: 'Flutter & Dart',
    detail: 'Cross-platform apps for Android, iOS, and Web with Firebase.'
  },
  {
    icon: Terminal,
    name: 'Android & Kotlin',
    detail: 'Jetpack Compose, coroutines, and modern architecture patterns.'
  },
  {
    icon: Globe,
    name: 'Modern Web',
    detail: 'React, TypeScript, Core Web Vitals, PWA, and WebGPU.'
  },
  {
    icon: Compass,
    name: 'Career & Open Source',
    detail: 'Portfolio reviews, interview prep, and first-talk coaching.'
  }
];

const faqs = [
  {
    q: 'Are GDG Ranchi events free to attend?',
    a: 'Yes. Every meetup, workshop, study jam, and DevFest session is completely free. We are a volunteer community supported by Google for Developers and local sponsors.'
  },
  {
    q: 'Do I need to be a computer science student to join?',
    a: 'No. The community welcomes working engineers, freelancers, designers, product managers, and complete beginners taking their first steps in programming.'
  },
  {
    q: 'How do I register for upcoming meetups?',
    a: 'RSVPs open two to three weeks before each event on our Events page. Seats are allotted on a first-come, first-served basis due to venue capacity.'
  },
  {
    q: 'Can I become a speaker?',
    a: 'Yes. We encourage first-time and seasoned speakers alike. Submit your topic through the contact form and our technical team will follow up.'
  }
];

const values = [
  'Be respectful and inclusive of differing viewpoints and experiences.',
  'Gracefully accept constructive criticism.',
  'Focus on what is best for the overall developer community.',
  'Zero tolerance for harassment at our venues or online channels.'
];

export const AboutPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number>(0);

  return (
    <div className="cx-root w-full">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-24 sm:pb-28 sm:pt-32">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow>GDG Ranchi</Eyebrow>
          <h1 className="mt-6 text-5xl font-normal leading-[1.03] tracking-[-0.04em] text-[#121212] sm:text-6xl lg:text-7xl">
            A Developer Community Built In Ranchi, For <Accent>Every Builder.</Accent>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-[1.75] text-[#121212]/60 sm:text-lg">
            Google Developer Group Ranchi is a volunteer-run community founded in 2018. We bring the events and
            education usually reserved for metro tech hubs to the heart of Jharkhand, free for everyone.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button to="/events" variant="primary">
              See Upcoming Events
            </Button>
            <Button to="/team">Meet The Team</Button>
          </div>
        </Reveal>

        {/* Stats tray */}
        <Reveal delay={120} className="mx-auto mt-16 max-w-5xl">
          <div className="cx-tray">
            <div className="grid grid-cols-2 gap-[6px] lg:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="cx-card px-5 py-6">
                  <div
                    className="text-3xl font-normal tracking-[-0.02em] text-[#121212]"
                    style={{ fontVariantNumeric: 'tabular-nums' }}
                  >
                    {s.value}
                  </div>
                  <div className="cx-mono mt-2 text-[11px] uppercase tracking-[0.1em] text-[#121212]/55">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <SectionHeading eyebrow="Our Mission">
          One Mission, One <Accent>Horizon.</Accent>
        </SectionHeading>
        <Reveal delay={80} className="mx-auto mt-14 max-w-5xl">
          <div className="cx-tray">
            <div className="grid grid-cols-1 gap-[6px] md:grid-cols-2">
              <div className="cx-card p-8">
                <div className="cx-mono text-[11px] uppercase tracking-[0.14em] text-[#0b7a3f]">
                  Mission
                </div>
                <h3 className="mt-3 text-2xl font-normal tracking-[-0.02em] text-[#121212]">
                  Learning Without Barriers
                </h3>
                <p className="mt-4 text-base leading-[1.75] text-[#121212]/60">
                  Build a collaborative, inclusive environment where programmers, developers, and designers
                  learn with Google developer tools, open source technology, and modern software engineering
                  practice.
                </p>
                <p className="mt-4 text-base leading-[1.75] text-[#121212]/60">
                  Free monthly meetups, hands-on cloud labs with mentorship, and direct connections between
                  students and industry professionals.
                </p>
              </div>
              <div className="cx-card p-8">
                <div className="cx-mono text-[11px] uppercase tracking-[0.14em] text-[#0b7a3f]">
                  Vision 2026
                </div>
                <h3 className="mt-3 text-2xl font-normal tracking-[-0.02em] text-[#121212]">
                  Ranchi As A Tech Hub
                </h3>
                <p className="mt-4 text-base leading-[1.75] text-[#121212]/60">
                  Establish Ranchi as a prominent technology hub in Eastern India. Nurture homegrown startups,
                  support Women Techmakers in STEM, and help local developers become creators of global digital
                  solutions rather than only consumers.
                </p>
                <p className="mt-4 text-base leading-[1.75] text-[#121212]/60">
                  5,000+ active developers upskilled, open-source contributions from Jharkhand, and a thriving
                  campus ambassador network.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Journey */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <SectionHeading eyebrow="Our Journey">
          From Four Founders To <Accent>DevFest.</Accent>
        </SectionHeading>
        <Reveal delay={80} className="mx-auto mt-14 max-w-5xl">
          <div className="cx-tray">
            <div className="cx-card px-6 sm:px-8">
              {sampleTimeline.map((item, idx) => (
                <div
                  key={idx}
                  className={`grid grid-cols-1 gap-2 py-6 sm:grid-cols-[140px_1fr_auto] sm:gap-6 ${
                    idx !== sampleTimeline.length - 1 ? 'border-b border-black/5' : ''
                  }`}
                >
                  <div className="cx-mono text-sm text-[#0b7a3f]">{item.year}</div>
                  <div className="min-w-0">
                    <h3 className="text-base font-medium text-[#121212]">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-[1.75] text-[#121212]/60">{item.description}</p>
                  </div>
                  <div className="cx-mono hidden text-[11px] uppercase tracking-[0.1em] text-[#121212]/40 sm:block">
                    {item.badge}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Tracks */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <SectionHeading eyebrow="What We Build">
          Six Tracks, One <Accent>Community.</Accent>
        </SectionHeading>
        <Reveal delay={80} className="mx-auto mt-14 max-w-6xl">
          <div className="cx-tray">
            <div className="grid grid-cols-1 gap-[6px] sm:grid-cols-2 lg:grid-cols-3">
              {tracks.map((t) => (
                <div key={t.name} className="cx-card p-7">
                  <t.icon className="h-4 w-4 text-[#121212]/40" strokeWidth={1.6} />
                  <h3 className="mt-5 text-lg font-medium text-[#121212]">{t.name}</h3>
                  <p className="mt-2 text-sm leading-[1.75] text-[#121212]/60">{t.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Women Techmakers */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <SectionHeading eyebrow="Women Techmakers">
          Visibility, Community, And <Accent>Resources.</Accent>
        </SectionHeading>
        <Reveal delay={80} className="mx-auto mt-14 max-w-5xl">
          <div className="cx-tray">
            <div className="cx-card overflow-hidden">
              <div className="p-8 sm:p-10">
                <div className="flex items-center gap-2 text-[#0b7a3f]">
                  <Heart className="h-4 w-4 fill-[#0b7a3f]" strokeWidth={1.6} />
                  <span className="cx-mono text-[11px] uppercase tracking-[0.14em]">WTM Ranchi</span>
                </div>
                <h3 className="mt-4 max-w-2xl text-2xl font-normal tracking-[-0.02em] text-[#121212] sm:text-3xl">
                  Mentorship, panels, and the annual International Women's Day summit.
                </h3>
                <p className="mt-4 max-w-2xl text-base leading-[1.75] text-[#121212]/60">
                  Every meetup stays open to everyone, with diversity scholarships and speaker tracks for women
                  in tech. WTM Ranchi runs dedicated mentorship cohorts and connects members with female
                  engineering leaders.
                </p>
                <div className="mt-8">
                  <Button to="/team">Meet WTM Ambassadors</Button>
                </div>
              </div>
              <div className="cx-dither h-20 w-full opacity-70" aria-hidden="true" />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Campus network */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <SectionHeading eyebrow="Campus Network">
          Where We <Accent>Show Up.</Accent>
        </SectionHeading>
        <Reveal delay={80} className="mx-auto mt-14 max-w-5xl">
          <div className="cx-tray">
            <div className="cx-card overflow-x-auto">
              <table className="w-full text-sm" style={{ fontVariantNumeric: 'tabular-nums' }}>
                <caption className="sr-only">Partner campuses of GDG Ranchi</caption>
                <thead>
                  <tr className="border-b border-black/5">
                    <th
                      scope="col"
                      className="cx-mono px-6 py-4 text-left text-[11px] uppercase tracking-[0.1em] text-[#121212]/55"
                    >
                      Campus
                    </th>
                    <th
                      scope="col"
                      className="cx-mono px-6 py-4 text-left text-[11px] uppercase tracking-[0.1em] text-[#121212]/55"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="cx-mono px-6 py-4 text-left text-[11px] uppercase tracking-[0.1em] text-[#121212]/55"
                    >
                      Location
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {samplePartnerCampuses.map((c) => (
                    <tr key={c.name} className="border-b border-black/5 last:border-b-0">
                      <th scope="row" className="whitespace-nowrap px-6 py-4 text-left font-medium text-[#121212]">
                        {c.name}
                      </th>
                      <td className="whitespace-nowrap px-6 py-4 text-[#121212]/60">{c.type}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-[#121212]/60">{c.city}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Community values */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <SectionHeading eyebrow="Community Values">
          A Harassment-Free <Accent>Space.</Accent>
        </SectionHeading>
        <Reveal delay={80} className="mx-auto mt-14 max-w-3xl">
          <div className="cx-tray">
            <div className="cx-card p-8 sm:p-10">
              <p className="text-base leading-[1.75] text-[#121212]/60">
                GDG Ranchi provides a welcoming experience for everyone regardless of gender, orientation,
                disability, appearance, race, ethnicity, or religion.
              </p>
              <ul className="mt-6 space-y-3">
                {values.map((v) => (
                  <li key={v} className="flex items-start gap-3 text-sm leading-[1.75] text-[#121212]/70">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#0b7a3f]" />
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <SectionHeading eyebrow="Questions">
          Before You <Accent>Join.</Accent>
        </SectionHeading>
        <Reveal delay={80} className="mx-auto mt-14 max-w-3xl">
          <div className="cx-tray">
            <div className="cx-card px-6 sm:px-8">
              {faqs.map((f, i) => (
                <div key={i} className={i !== faqs.length - 1 ? 'border-b border-black/5' : ''}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                    aria-expanded={openFaq === i}
                  >
                    <span className="text-base font-medium text-[#121212]">{f.q}</span>
                    <Plus
                      className={`h-4 w-4 shrink-0 text-[#121212]/40 transition-transform duration-200 ${
                        openFaq === i ? 'rotate-45' : ''
                      }`}
                      strokeWidth={1.6}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-200 ${
                      openFaq === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-5 text-sm leading-[1.75] text-[#121212]/60">{f.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-8 sm:pb-32">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-normal leading-[1.05] tracking-[-0.03em] text-[#121212] sm:text-5xl lg:text-[56px]">
            Ready To Build Something <Accent>With Us?</Accent>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-[1.75] text-[#121212]/60">
            Join over 5,000 developers from Ranchi who learn, ship, and speak at GDG events. It costs nothing.
          </p>
          <div className="mt-9 flex justify-center">
            <Button to="/events" variant="primary">
              Check Out Upcoming Events
            </Button>
          </div>
        </Reveal>
      </section>
    </div>
  );
};
