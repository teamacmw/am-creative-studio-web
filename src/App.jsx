import React, { useState, useEffect, useRef } from "react";
import {
  ArrowUpRight, Star, Sparkles, Zap, Heart, CheckCircle2,
  Send, Bug, Lightbulb, Shield, Mail, ChevronRight, ChevronLeft,
  Sun, Moon, Lock, Headphones, Watch, Flame, Calendar, Layers,
  Download, Play, Pause, Music, TrendingUp, Volume2,
} from "lucide-react";

const css = `
  * { box-sizing: border-box; margin: 0; padding: 0; }

  [data-theme="dark"] {
    --bg: #0a0a0b;
    --bg-1: #111114;
    --bg-2: #17171b;
    --ink: #f5f5f0;
    --ink-dim: #a1a19b;
    --ink-mute: #6b6b66;
    --line: rgba(245,245,240,0.08);
    --line-2: rgba(245,245,240,0.16);
    --accent: #d4ff3d;
    --accent-ink: #0a0a0b;
    --nav-bg: rgba(10,10,11,0.85);
    --grid: rgba(245,245,240,0.05);
    --glow: rgba(212,255,61,0.07);
    --phone-bezel-1: #2a2a2e;
    --phone-bezel-2: #1a1a1c;
    --phone-screen: #0a0a0b;
  }
  [data-theme="light"] {
    --bg: #f5f2ea;
    --bg-1: #ede9de;
    --bg-2: #e2ddd0;
    --ink: #18181b;
    --ink-dim: #57534e;
    --ink-mute: #9a958c;
    --line: rgba(24,24,27,0.09);
    --line-2: rgba(24,24,27,0.18);
    --accent: #4a6b00;
    --accent-ink: #f5f2ea;
    --nav-bg: rgba(245,242,234,0.85);
    --grid: rgba(24,24,27,0.045);
    --glow: rgba(74,107,0,0.06);
    --phone-bezel-1: #2a2a2e;
    --phone-bezel-2: #1a1a1c;
    --phone-screen: #0a0a0b;
  }

  .shell {
    min-height: 100vh;
    background: var(--bg);
    color: var(--ink);
    font-family: 'Bricolage Grotesque', ui-sans-serif, system-ui, -apple-system, sans-serif;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
    position: relative;
    transition: background 0.5s ease, color 0.5s ease;
  }
  .serif { font-family: 'Instrument Serif', 'Iowan Old Style', Georgia, serif; font-style: italic; font-weight: 400; letter-spacing: -0.01em; }
  .mono { font-family: 'JetBrains Mono', ui-monospace, Menlo, monospace; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; }

  .atmosphere {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background-image:
      radial-gradient(ellipse 80% 50% at 50% -10%, var(--glow), transparent 60%),
      linear-gradient(var(--grid) 1px, transparent 1px),
      linear-gradient(90deg, var(--grid) 1px, transparent 1px);
    background-size: auto, 64px 64px, 64px 64px;
    transition: background-image 0.5s ease;
  }

  .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.9s cubic-bezier(0.2,0.8,0.2,1), transform 0.9s cubic-bezier(0.2,0.8,0.2,1); }
  .reveal.in { opacity: 1; transform: translateY(0); }

  @keyframes rise { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
  .rise { animation: rise 1s cubic-bezier(0.2,0.8,0.2,1) both; }

  @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }

  @keyframes pulse-ring { 0%, 100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.05); } }
  .pulse-ring { animation: pulse-ring 3s ease-in-out infinite; }

  @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
  .float { animation: float 6s ease-in-out infinite; }

  @keyframes wave-bar { 0%, 100% { transform: scaleY(0.4); } 50% { transform: scaleY(1); } }

  .btn-primary {
    background: var(--accent); color: var(--accent-ink);
    padding: 14px 22px; border: none; border-radius: 999px;
    font-family: inherit; font-weight: 600; font-size: 14px;
    cursor: pointer; display: inline-flex; align-items: center; gap: 8px;
    transition: transform 0.3s, box-shadow 0.3s, background 0.4s, color 0.4s;
  }
  .btn-primary:hover { transform: translateY(-2px); }
  .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

  .btn-ghost {
    background: transparent; color: var(--ink);
    padding: 14px 22px; border: 1px solid var(--line-2); border-radius: 999px;
    font-family: inherit; font-weight: 500; font-size: 14px;
    cursor: pointer; display: inline-flex; align-items: center; gap: 8px;
    transition: background 0.3s, border-color 0.3s, color 0.4s;
  }
  .btn-ghost:hover { background: var(--bg-1); border-color: var(--accent); }

  .back-btn {
    display: inline-flex; align-items: center; gap: 6px;
    color: var(--ink-dim); background: none; border: none;
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;
    cursor: pointer; padding: 8px 0; margin-bottom: 40px;
    transition: color 0.3s, transform 0.3s;
  }
  .back-btn:hover { color: var(--accent); transform: translateX(-4px); }

  .card {
    padding: 32px 28px;
    border: 1px solid var(--line);
    background: var(--bg-1);
    border-radius: 20px;
    transition: border-color 0.4s, transform 0.4s, background 0.4s;
    cursor: pointer;
  }
  .card:hover { border-color: var(--line-2); transform: translateY(-4px); }
  .card .arrow { transition: transform 0.4s; }
  .card:hover .arrow { transform: translate(4px, -4px); }
  .card.coming { cursor: pointer; opacity: 0.85; }
  .card.coming:hover { opacity: 1; }

  .field {
    width: 100%; background: var(--bg-1); color: var(--ink);
    border: 1px solid var(--line); border-radius: 12px;
    padding: 14px 16px; font-family: inherit; font-size: 15px;
    transition: border-color 0.3s, background 0.4s, color 0.4s;
  }
  .field:focus { outline: none; border-color: var(--accent); background: var(--bg-2); }
  .field::placeholder { color: var(--ink-mute); }
  textarea.field { resize: vertical; min-height: 140px; }

  .chip {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 8px 14px; border: 1px solid var(--line-2);
    border-radius: 999px; background: var(--bg-1);
    font-size: 12px; color: var(--ink-dim);
    cursor: pointer; font-family: inherit;
    transition: background 0.3s, color 0.3s, border-color 0.3s;
  }
  .chip:hover { border-color: var(--ink-dim); }
  .chip.active { background: var(--accent); color: var(--accent-ink); border-color: var(--accent); }

  .topnav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    padding: 20px 32px; display: flex; justify-content: space-between; align-items: center;
    background: var(--nav-bg);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--line);
    transition: background 0.5s ease, border-color 0.5s ease;
  }
  .topnav .link { color: var(--ink-dim); font-size: 14px; cursor: pointer; background: none; border: none; font-family: inherit; padding: 0; transition: color 0.3s; }
  .topnav .link:hover, .topnav .link.active { color: var(--ink); }

  .toggle {
    width: 38px; height: 38px; border-radius: 999px;
    border: 1px solid var(--line-2); background: var(--bg-1);
    color: var(--ink); cursor: pointer;
    display: inline-flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    transition: color 0.3s, border-color 0.3s, background 0.4s;
  }
  .toggle:hover { color: var(--accent); border-color: var(--accent); }

  .logo-box {
    width: 34px; height: 34px; border-radius: 9px;
    background: var(--accent); color: var(--accent-ink);
    display: flex; align-items: center; justify-content: center;
    transition: background 0.4s, color 0.4s;
  }

  .icon-slot {
    width: 56px; height: 56px; border-radius: 14px;
    background: var(--bg-2); border: 1px solid var(--line-2);
    display: flex; align-items: center; justify-content: center;
    color: var(--accent);
    transition: background 0.4s, border-color 0.4s, color 0.4s;
  }
  .icon-slot.lg { width: 76px; height: 76px; border-radius: 18px; }

  .container { max-width: 1280px; margin: 0 auto; padding: 0 32px; position: relative; z-index: 2; }
  .section { padding: 120px 0; position: relative; }
  .accent { color: var(--accent); transition: color 0.4s; }
  .dim { color: var(--ink-dim); }
  .mute { color: var(--ink-mute); }
  .line-b { border-bottom: 1px solid var(--line); }
  .line-t { border-top: 1px solid var(--line); }

  .grid-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 40px; }
  .grid-apps { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; }
  .grid-testi { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
  .grid-footer { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 60px; }
  .grid-two { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

  .nav-right { display: flex; gap: 16px; align-items: center; }
  .nav-links { display: flex; gap: 32px; align-items: center; }

  /* ---- Scroll progress bar (app detail) ---- */
  .scroll-bar {
    position: fixed; top: 73px; left: 0; right: 0;
    height: 2px; background: transparent; z-index: 99;
    pointer-events: none;
  }
  .scroll-bar-fill {
    height: 100%; background: var(--accent);
    transform-origin: 0 0;
    transition: transform 0.1s linear;
    box-shadow: 0 0 12px var(--accent);
  }

  /* ---- App detail hero stats ---- */
  .stat-band-detail {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    padding: 40px 0;
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
    margin-top: 60px;
  }

  /* ---- Sticky scroll showcase ---- */
  .scroll-showcase {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 80px;
    margin-top: 100px;
    position: relative;
  }
  .scroll-showcase-content { display: flex; flex-direction: column; gap: 0; }
  .scroll-showcase-phone-wrap { position: relative; }
  .scroll-phone-sticky {
    position: sticky;
    top: 130px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 200px);
    min-height: 620px;
  }

  .feature-block {
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 40px 0;
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .feature-block.dim-out { opacity: 0.25; }
  .feature-block .label-num {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.15em;
    color: var(--accent);
    margin-bottom: 18px;
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }
  .feature-block .label-num::before {
    content: '';
    width: 28px; height: 1px;
    background: var(--accent);
  }

  /* ---- Bento ---- */
  .bento {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-top: 60px;
  }
  .bento-card {
    background: var(--bg-1);
    border: 1px solid var(--line);
    border-radius: 24px;
    padding: 32px;
    min-height: 220px;
    display: flex;
    flex-direction: column;
    transition: border-color 0.4s, transform 0.5s cubic-bezier(0.2,0.8,0.2,1), background 0.4s, opacity 0.8s ease;
    position: relative;
    overflow: hidden;
    opacity: 0;
    transform: translateY(40px);
  }
  .bento-card.in { opacity: 1; transform: translateY(0); }
  .bento-card:hover { border-color: var(--line-2); transform: translateY(-6px); }
  .bento-card.wide { grid-column: span 2; }
  .bento-card.featured { background: var(--bg-2); }

  /* ---- iPhone frame ---- */
  .phone-outer {
    width: 290px;
    height: 600px;
    background: linear-gradient(145deg, var(--phone-bezel-1) 0%, var(--phone-bezel-2) 100%);
    border-radius: 50px;
    padding: 14px;
    box-shadow:
      0 50px 100px -25px rgba(0,0,0,0.6),
      0 0 0 1px rgba(255,255,255,0.06),
      inset 0 0 0 1px rgba(255,255,255,0.04);
    position: relative;
    flex-shrink: 0;
  }
  .phone-inner {
    width: 100%;
    height: 100%;
    background: var(--phone-screen);
    border-radius: 38px;
    overflow: hidden;
    position: relative;
  }
  .phone-island {
    position: absolute;
    top: 12px; left: 50%;
    transform: translateX(-50%);
    width: 110px; height: 30px;
    background: #000;
    border-radius: 16px;
    z-index: 30;
  }
  .phone-content {
    position: absolute;
    inset: 0;
    color: #f5f5f0;
    font-family: 'Bricolage Grotesque', ui-sans-serif, sans-serif;
  }
  .phone-content .serif { font-family: 'Instrument Serif', 'Iowan Old Style', Georgia, serif; }
  .phone-content .mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }

  /* Crossfade screens */
  .screen-stack { position: relative; width: 100%; height: 100%; padding-top: 56px; }
  .screen-frame {
    position: absolute; inset: 56px 0 0 0;
    transition: opacity 0.7s ease, transform 0.9s cubic-bezier(0.2,0.8,0.2,1);
    pointer-events: none;
  }
  .screen-frame.active { opacity: 1; transform: scale(1); pointer-events: auto; }
  .screen-frame.inactive { opacity: 0; transform: scale(0.94); }

  /* Animated number */
  .anim-num { display: inline-block; font-variant-numeric: tabular-nums; }

  @media (max-width: 1024px) {
    .scroll-showcase {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    .scroll-phone-sticky {
      position: relative;
      top: auto;
      height: auto;
      min-height: 0;
      order: -1;
    }
    .feature-block { min-height: 0; padding: 60px 0; }
    .bento { grid-template-columns: 1fr 1fr; }
    .stat-band-detail { grid-template-columns: 1fr; gap: 20px; }
  }
  @media (max-width: 900px) {
    .grid-testi { grid-template-columns: 1fr; }
    .grid-footer { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 768px) {
    .topnav { padding: 16px 20px; }
    .container { padding: 0 20px; }
    .section { padding: 80px 0; }
    .nav-links { display: none !important; }
    .grid-two { grid-template-columns: 1fr; }
    .grid-footer { grid-template-columns: 1fr; }
    .bento { grid-template-columns: 1fr; }
    .bento-card.wide { grid-column: span 1; }
    .scroll-bar { top: 65px; }
  }
`;

// ====================== DATA ======================

const APPS = [
  {
    id: "flowki",
    name: "Flowki",
    tag: "Productivity",
    desc: "A focus timer that breathes with your energy, not the clock.",
    longDesc: "Flowki turns deep work into something you can feel. Sessions adapt to your rhythm, breaks know when you actually need them, and the whole thing gets out of the way the moment you find your flow.",
    icon: Zap,
    stat: "4.9 ★ · 14K users",
    rating: 4.9,
    users: 14,
    usersSuffix: "K",
    version: 2.3,
    status: "live",
    narrative: [
      {
        label: "01 / Adaptive",
        title: "Sessions that breathe with you",
        desc: "Flowki listens to how you work and adapts session lengths in real time. No more arbitrary 25-minute Pomodoros that fight your rhythm — just sessions shaped to the way your brain actually focuses today.",
      },
      {
        label: "02 / Soundscapes",
        title: "Sounds with character",
        desc: "Twelve hand-recorded ambient tracks made by people who care about sound, not algorithms. None of them are rain on a roof. All of them are designed to disappear into the background.",
      },
      {
        label: "03 / Insights",
        title: "Streaks without shame",
        desc: "Miss a day? Flowki tells you why it doesn't matter — with the data to back it up. The opposite of the punishing-streak app. Habits should support you, not haunt you.",
      },
    ],
    features: [
      { icon: Heart, title: "Sessions that breathe", desc: "Adaptive timers that match your rhythm." },
      { icon: Watch, title: "Apple Watch native", desc: "Start sessions from your wrist with subtle haptic check-ins." },
      { icon: Headphones, title: "Hand-made soundscapes", desc: "12 ambient tracks recorded by people, not algorithms." },
      { icon: Flame, title: "Forgiving streaks", desc: "Track progress without the punishing daily-streak guilt.", wide: true },
    ],
    testimonial: { name: "Maya R.", handle: "@mayamakes", rating: 5, quote: "Flowki is the first focus app I've actually kept past week one. It breathes with me instead of counting at me." },
  },
  {
    id: "moment",
    name: "Moment",
    tag: "Daily Life",
    desc: "A slow journal for people who hate journaling apps.",
    longDesc: "Moment is a place to keep what mattered today, in your words, in any form. No prompts, no streaks, no nudges. Just a quiet page that's been waiting for you.",
    icon: Sparkles,
    stat: "4.8 ★ · 8K users",
    rating: 4.8,
    users: 8,
    usersSuffix: "K",
    version: 1.4,
    status: "live",
    narrative: [
      {
        label: "01 / Quiet by design",
        title: "A journal that doesn't judge",
        desc: "No streak counters. No daily reminders. No prompts demanding you reflect on three things you're grateful for. Just a beautiful page, and the time you decide to give it.",
      },
      {
        label: "02 / On This Day",
        title: "Memory, in its own time",
        desc: "Moment quietly resurfaces past entries when they matter most — not on schedule, but when the season, weather, or context matches. Memory should feel like a gift, not a notification.",
      },
      {
        label: "03 / Calendar",
        title: "A year, at a glance",
        desc: "See your year as a constellation of moments — not as an unbroken streak to defend. The pattern that emerges is yours. The empty days are part of it too.",
      },
    ],
    features: [
      { icon: Sparkles, title: "No prompts, no nudges", desc: "Open it when you want. Skip it when you don't." },
      { icon: Lock, title: "End-to-end encrypted", desc: "Your moments live on your device. Sync is fully encrypted." },
      { icon: Calendar, title: "On This Day", desc: "Past moments resurface at the right time." },
      { icon: Layers, title: "Markdown native", desc: "Write naturally. Headings, lists, links — all just work.", wide: true },
    ],
    testimonial: { name: "Jordan K.", handle: "@jkdesigns", rating: 5, quote: "Moment turned journaling from homework into a small daily pleasure. The typography alone is worth the download." },
  },
  {
    id: "project03",
    name: "Project 03",
    tag: "Health",
    desc: "Something we're not ready to talk about. Yet.",
    icon: Heart,
    stat: "Coming 2026",
    status: "coming",
  },
];

const STATS = [
  { value: "2", label: "Live apps" },
  { value: "22K+", label: "Active users" },
  { value: "4.85", label: "Avg. rating" },
  { value: "14", label: "Countries" },
];

// ====================== HOOKS ======================

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) { el.classList.add("in"); io.disconnect(); } },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) { setInView(true); io.disconnect(); } },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useCounter(target, trigger, duration = 1600) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = null;
    let frame;
    const step = (ts) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, trigger, duration]);
  return value;
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handler = () => {
      const top = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docH > 0 ? Math.min(Math.max(top / docH, 0), 1) : 0);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, []);
  return progress;
}

function useActiveSection(refs) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const handler = () => {
      const center = window.innerHeight * 0.45;
      let best = 0;
      let bestDist = Infinity;
      refs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const c = r.top + r.height / 2;
        const d = Math.abs(c - center);
        if (d < bestDist) { bestDist = d; best = i; }
      });
      setActive(best);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, [refs]);
  return active;
}

// ====================== ANIMATED NUMBER ======================

function AnimatedNumber({ value, format, trigger }) {
  const v = useCounter(value, trigger);
  return <span className="anim-num">{format ? format(v) : Math.round(v)}</span>;
}

// ====================== LOGO + NAV ======================

function MonogramSVG({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" aria-hidden="true">
      <path d="M 14 48 L 40 14 L 66 48 M 25 40 L 55 40"
        stroke="currentColor" strokeWidth="7" strokeLinecap="square" strokeLinejoin="miter" />
      <path d="M 14 66 L 14 53 L 40 66 L 66 53 L 66 66"
        stroke="currentColor" strokeWidth="7" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
}

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div className="logo-box"><MonogramSVG size={22} /></div>
      <div style={{ lineHeight: 1 }}>
        <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em" }}>AM Creative Studio</div>
        <div className="mono mute" style={{ fontSize: 9, marginTop: 3 }}>iOS · Since 2025</div>
      </div>
    </div>
  );
}

function Nav({ route, setRoute, theme, setTheme, clearApp }) {
  const go = (id) => { clearApp(); setRoute(id); window.scrollTo(0, 0); };
  const link = (id, label) => (
    <button key={id} className={"link " + (route === id ? "active" : "")} onClick={() => go(id)}>{label}</button>
  );
  const ThemeIcon = theme === "dark" ? Sun : Moon;
  return (
    <div className="topnav">
      <button onClick={() => go("home")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
        <Logo />
      </button>
      <div className="nav-right">
        <div className="nav-links">
          {link("home", "Work")}
          {link("feedback", "Feedback")}
          {link("contact", "Contact")}
          {link("privacy", "Privacy")}
          <button className="btn-primary" onClick={() => go("contact")} style={{ padding: "10px 18px", fontSize: 13 }}>
            Collaborate <ArrowUpRight size={14} />
          </button>
        </div>
        <button className="toggle" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme" title="Toggle theme">
          <ThemeIcon size={16} strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );
}

// ====================== HOMEPAGE ======================

function Hero({ setRoute }) {
  return (
    <div className="section" style={{ paddingTop: 200, paddingBottom: 80 }}>
      <div className="container">
        <div className="mono rise dim" style={{ marginBottom: 28, animationDelay: "0.1s" }}>
          ◆ Independent iOS studio · Est. 2025 · San Francisco
        </div>
        <h1 style={{ fontSize: "clamp(48px, 9vw, 132px)", lineHeight: 0.92, letterSpacing: "-0.03em", fontWeight: 500, maxWidth: 1100 }}>
          <span className="rise" style={{ display: "inline-block", animationDelay: "0.2s" }}>Small apps,</span>{" "}
          <span className="rise" style={{ display: "inline-block", animationDelay: "0.35s" }}>built</span>{" "}
          <span className="serif rise accent" style={{ display: "inline-block", animationDelay: "0.5s" }}>obsessively</span>{" "}
          <span className="rise" style={{ display: "inline-block", animationDelay: "0.65s" }}>for iPhone.</span>
        </h1>
        <p className="rise dim" style={{ marginTop: 40, maxWidth: 580, fontSize: 20, lineHeight: 1.5, animationDelay: "0.8s" }}>
          AM Creative Studio is a year-old iOS studio shipping a small family of
          apps across productivity, daily life, and health — designed with restraint,
          shipped with care, sharpened every week.
        </p>
        <div className="rise" style={{ marginTop: 44, display: "flex", gap: 14, flexWrap: "wrap", animationDelay: "0.95s" }}>
          <button className="btn-primary" onClick={() => { const el = document.getElementById("apps"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}>
            See the apps <ChevronRight size={16} />
          </button>
          <button className="btn-ghost" onClick={() => { setRoute("contact"); window.scrollTo(0, 0); }}>
            Work with us <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

function StatsBand() {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal line-t line-b" style={{ padding: "80px 0" }}>
      <div className="container">
        <div className="mono mute" style={{ marginBottom: 40 }}>/ 001 — by the numbers</div>
        <div className="grid-stats">
          {STATS.map((s, i) => (
            <div key={i} style={{ borderLeft: "1px solid var(--line-2)", paddingLeft: 20 }}>
              <div className="serif accent" style={{ fontSize: "clamp(48px, 6vw, 80px)", lineHeight: 1 }}>{s.value}</div>
              <div className="dim" style={{ marginTop: 10, fontSize: 14 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AppsGrid({ openApp }) {
  const ref = useReveal();
  return (
    <div id="apps" ref={ref} className="reveal section">
      <div className="container">
        <div style={{ marginBottom: 60 }}>
          <div className="mono mute" style={{ marginBottom: 20 }}>/ 002 — the catalogue</div>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1, letterSpacing: "-0.02em", fontWeight: 500, maxWidth: 720 }}>
            Three apps. <span className="serif accent">One philosophy.</span>
          </h2>
          <p className="dim" style={{ marginTop: 20, fontSize: 16, maxWidth: 540 }}>
            Two shipped, one almost ready. Tap any card to learn more.
          </p>
        </div>
        <div className="grid-apps">
          {APPS.map((app) => {
            const Icon = app.icon;
            const isComing = app.status === "coming";
            return (
              <div key={app.id} className={"card" + (isComing ? " coming" : "")} onClick={() => openApp(app)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 40 }}>
                  <div className="icon-slot"><Icon size={24} strokeWidth={1.5} /></div>
                  {isComing
                    ? <span className="mute"><Lock size={18} /></span>
                    : <span className="arrow dim"><ArrowUpRight size={20} /></span>}
                </div>
                <div className="mono accent" style={{ marginBottom: 10 }}>{app.tag}</div>
                <h3 className="serif" style={{ fontSize: 36, lineHeight: 1, marginBottom: 12 }}>{app.name}</h3>
                <p className="dim" style={{ fontSize: 15, lineHeight: 1.5, marginBottom: 28 }}>{app.desc}</p>
                <div className="line-t mute" style={{ paddingTop: 20, fontSize: 13 }}>{app.stat}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Testimonials() {
  const ref = useReveal();
  const items = APPS.filter(a => a.testimonial).map(a => ({ ...a.testimonial, app: a.name }));
  return (
    <div ref={ref} className="reveal section line-t line-b" style={{ background: "var(--bg-1)" }}>
      <div className="container">
        <div className="mono mute" style={{ marginBottom: 20 }}>/ 003 — what people say</div>
        <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1, letterSpacing: "-0.02em", fontWeight: 500, maxWidth: 820, marginBottom: 60 }}>
          Kind words from the <span className="serif accent">App Store</span>.
        </h2>
        <div className="grid-testi">
          {items.map((t, i) => (
            <div key={i} className="card" style={{ background: "var(--bg)", padding: 36, cursor: "default" }}>
              <div className="accent" style={{ display: "flex", gap: 4, marginBottom: 16 }}>
                {Array.from({ length: t.rating }).map((_, j) => (<Star key={j} size={14} fill="currentColor" />))}
              </div>
              <p className="serif" style={{ fontSize: 24, lineHeight: 1.4, marginBottom: 24, fontStyle: "italic" }}>{'"' + t.quote + '"'}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13 }}>
                <div>
                  <div>{t.name}</div>
                  <div className="mute">{t.handle}</div>
                </div>
                <div className="mono accent">{t.app}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CTA({ setRoute }) {
  const ref = useReveal();
  const go = (id) => { setRoute(id); window.scrollTo(0, 0); };
  return (
    <div ref={ref} className="reveal section">
      <div className="container" style={{ textAlign: "center" }}>
        <div className="mono mute" style={{ marginBottom: 24 }}>/ 004 — let's talk</div>
        <h2 style={{ fontSize: "clamp(44px, 7vw, 96px)", lineHeight: 0.95, letterSpacing: "-0.03em", fontWeight: 500, maxWidth: 900, margin: "0 auto 40px" }}>
          Have an idea?<br />
          <span className="serif accent">We're listening.</span>
        </h2>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn-primary" onClick={() => go("contact")}>Start a conversation <ArrowUpRight size={14} /></button>
          <button className="btn-ghost" onClick={() => go("feedback")}>Send feedback</button>
        </div>
      </div>
    </div>
  );
}

function Home({ setRoute, openApp }) {
  return (
    <>
      <Hero setRoute={setRoute} />
      <StatsBand />
      <AppsGrid openApp={openApp} />
      <Testimonials />
      <CTA setRoute={setRoute} />
    </>
  );
}

// ====================== PHONE FRAME ======================

function PhoneFrame({ children }) {
  return (
    <div className="phone-outer">
      <div className="phone-inner">
        <div className="phone-island" />
        <div className="phone-content">{children}</div>
      </div>
    </div>
  );
}

// ====================== FLOWKI SCREENS ======================

function FlowkiTimer() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", padding: "0 20px 24px",
      background: "radial-gradient(ellipse at top, rgba(212,255,61,0.12), transparent 60%)" }}>
      <div className="mono" style={{ color: "#a1a19b", fontSize: 9, marginTop: 4 }}>DEEP WORK · SESSION 02</div>
      <div style={{ position: "relative", marginTop: 36 }}>
        <svg width="180" height="180" viewBox="0 0 180 180">
          <circle cx="90" cy="90" r="80" fill="none" stroke="rgba(245,245,240,0.07)" strokeWidth="2" />
          <circle cx="90" cy="90" r="80" fill="none" stroke="#d4ff3d" strokeWidth="2.5"
            strokeDasharray="502" strokeDashoffset="140"
            transform="rotate(-90 90 90)" strokeLinecap="round" />
        </svg>
        <div className="pulse-ring" style={{ position: "absolute", inset: 14, borderRadius: "50%", background: "radial-gradient(circle, rgba(212,255,61,0.18) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div className="serif" style={{ fontSize: 64, lineHeight: 1, color: "#d4ff3d" }}>23</div>
          <div className="mono" style={{ fontSize: 9, color: "#a1a19b", marginTop: 4 }}>MIN LEFT</div>
        </div>
      </div>
      <div style={{ marginTop: 32, fontSize: 14, textAlign: "center", letterSpacing: "-0.01em" }}>Writing the new pricing page</div>
      <div className="mono" style={{ fontSize: 9, color: "#6b6b66", marginTop: 6 }}>FLOW STATE · 12 MIN IN</div>
      <div style={{ marginTop: "auto", display: "flex", gap: 14 }}>
        <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(245,245,240,0.06)", border: "1px solid rgba(245,245,240,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#f5f5f0" }}>
          <Pause size={16} />
        </div>
        <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#d4ff3d", display: "flex", alignItems: "center", justifyContent: "center", color: "#0a0a0b" }}>
          <CheckCircle2 size={18} strokeWidth={2.5} />
        </div>
      </div>
    </div>
  );
}

function FlowkiSounds() {
  const sounds = [
    { name: "Library at dusk", playing: true },
    { name: "Forest creek" },
    { name: "Distant city" },
    { name: "Vinyl warmth" },
    { name: "Late night cafe" },
    { name: "Mountain wind" },
  ];
  return (
    <div style={{ height: "100%", padding: "8px 18px 20px" }}>
      <div className="mono" style={{ color: "#6b6b66", fontSize: 9 }}>SOUNDSCAPES · 12</div>
      <div className="serif" style={{ fontSize: 36, lineHeight: 1, marginTop: 4, color: "#f5f5f0" }}>
        Listen<span style={{ color: "#d4ff3d" }}>.</span>
      </div>

      {/* now playing */}
      <div style={{ marginTop: 22, padding: 14, border: "1px solid rgba(212,255,61,0.3)", borderRadius: 14,
        background: "linear-gradient(135deg, rgba(212,255,61,0.08), transparent)" }}>
        <div className="mono" style={{ color: "#d4ff3d", fontSize: 9, display: "flex", alignItems: "center", gap: 6 }}>
          <Volume2 size={9} /> NOW PLAYING
        </div>
        <div style={{ fontSize: 14, marginTop: 6, color: "#f5f5f0" }}>Library at dusk</div>
        {/* fake waveform */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 2, marginTop: 12, height: 24 }}>
          {Array.from({ length: 28 }).map((_, i) => (
            <div key={i} style={{
              flex: 1,
              background: "#d4ff3d",
              borderRadius: 1,
              height: "100%",
              transformOrigin: "bottom",
              animation: `wave-bar ${0.6 + (i % 5) * 0.15}s ease-in-out ${i * 0.04}s infinite`,
              opacity: 0.4 + (i % 4) * 0.15,
            }} />
          ))}
        </div>
      </div>

      {/* sound list */}
      <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 4 }}>
        {sounds.slice(1).map((s, i) => (
          <div key={i} style={{ padding: "10px 12px", display: "flex", alignItems: "center", justifyContent: "space-between",
            borderBottom: "1px solid rgba(245,245,240,0.05)" }}>
            <div style={{ fontSize: 12, color: "#f5f5f0" }}>{s.name}</div>
            <Music size={11} color="#6b6b66" />
          </div>
        ))}
      </div>
    </div>
  );
}

function FlowkiInsights() {
  const days = [40, 75, 55, 90, 70, 30, 85];
  const labels = ["M", "T", "W", "T", "F", "S", "S"];
  return (
    <div style={{ height: "100%", padding: "8px 18px 20px" }}>
      <div className="mono" style={{ color: "#6b6b66", fontSize: 9 }}>WEEK 14 · INSIGHTS</div>
      <div className="serif" style={{ fontSize: 36, lineHeight: 1, marginTop: 4, color: "#f5f5f0" }}>
        4h 12m<span style={{ color: "#d4ff3d" }}>.</span>
      </div>
      <div className="mono" style={{ color: "#6b6b66", fontSize: 9, marginTop: 4 }}>FOCUSED THIS WEEK</div>

      {/* bar chart */}
      <div style={{ marginTop: 24, display: "flex", alignItems: "flex-end", gap: 8, height: 100 }}>
        {days.map((h, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{
              width: "100%",
              height: `${h}%`,
              background: i === 3 ? "#d4ff3d" : "rgba(212,255,61,0.25)",
              borderRadius: 4,
              transition: "height 0.6s ease",
            }} />
            <div className="mono" style={{ fontSize: 8, color: "#6b6b66" }}>{labels[i]}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 24, padding: 14, background: "rgba(245,245,240,0.04)", borderRadius: 12, border: "1px solid rgba(245,245,240,0.06)" }}>
        <div className="mono" style={{ fontSize: 9, color: "#d4ff3d", marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}>
          <TrendingUp size={9} /> INSIGHT
        </div>
        <div style={{ fontSize: 11, lineHeight: 1.5, color: "#a1a19b" }}>
          You focus best between 9 and 11 in the morning. Your Thursdays are your strongest day this month.
        </div>
      </div>

      <div className="mono" style={{ marginTop: 18, fontSize: 9, color: "#6b6b66", textAlign: "center" }}>
        STREAK · 12 DAYS · NO SHAME ◆
      </div>
    </div>
  );
}

// ====================== MOMENT SCREENS ======================

function MomentToday() {
  const cardStyle = { padding: "12px 14px", border: "1px solid rgba(245,245,240,0.08)", borderRadius: 14, background: "rgba(245,245,240,0.025)" };
  return (
    <div style={{ height: "100%", padding: "8px 18px 20px", overflow: "hidden" }}>
      <div className="mono" style={{ color: "#6b6b66", fontSize: 9 }}>WEDNESDAY · APR 8</div>
      <div className="serif" style={{ fontSize: 44, lineHeight: 1, marginTop: 4, color: "#f5f5f0" }}>
        Today<span style={{ color: "#d4ff3d" }}>.</span>
      </div>
      <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={cardStyle}>
          <div className="mono" style={{ color: "#d4ff3d", fontSize: 9 }}>07:42 · MORNING</div>
          <div style={{ fontSize: 12, marginTop: 6, lineHeight: 1.45, color: "#f5f5f0" }}>
            Walked the dog before the rain came in. Sky was that strange green-grey color again.
          </div>
        </div>
        <div style={cardStyle}>
          <div className="mono" style={{ color: "#d4ff3d", fontSize: 9 }}>11:15 · COFFEE</div>
          <div style={{ fontSize: 12, marginTop: 6, lineHeight: 1.45, color: "#f5f5f0" }}>
            J brought up the Tokyo idea again. Maybe September?
          </div>
        </div>
        <div style={cardStyle}>
          <div className="mono" style={{ color: "#d4ff3d", fontSize: 9 }}>15:30 · DESK</div>
          <div style={{ fontSize: 12, marginTop: 6, lineHeight: 1.45, color: "#f5f5f0" }}>
            Finally cracked the layout problem. It was the gap, not the grid.
          </div>
        </div>
        <div style={{ padding: "12px 14px", border: "1px dashed rgba(245,245,240,0.18)", borderRadius: 14, color: "#6b6b66", fontSize: 12, textAlign: "center" }}>
          + Add a moment
        </div>
      </div>
    </div>
  );
}

function MomentRecall() {
  return (
    <div style={{ height: "100%", padding: "8px 22px 20px", display: "flex", flexDirection: "column",
      background: "radial-gradient(ellipse at top, rgba(212,255,61,0.06), transparent 50%)" }}>
      <div className="mono" style={{ color: "#d4ff3d", fontSize: 9, marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
        ◆ ON THIS DAY
      </div>
      <div className="mono" style={{ color: "#6b6b66", fontSize: 9, marginTop: 4 }}>ONE YEAR AGO · APR 8 2025</div>

      <div style={{ marginTop: 38, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div className="serif" style={{ fontSize: 22, lineHeight: 1.4, color: "#f5f5f0", fontStyle: "italic" }}>
          "First day at the new place. The light through the kitchen window at 4pm is going to make me very happy."
        </div>
        <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 28, height: 1, background: "#d4ff3d" }} />
          <div className="mono" style={{ fontSize: 9, color: "#a1a19b" }}>YOU · 16:14</div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 16, borderTop: "1px solid rgba(245,245,240,0.06)" }}>
        <div className="mono" style={{ fontSize: 9, color: "#6b6b66" }}>365 DAYS LATER</div>
        <ChevronRight size={14} color="#6b6b66" />
      </div>
    </div>
  );
}

function MomentCalendar() {
  // 5 weeks of dots: filled = entry exists
  const weeks = [
    [1, 1, 0, 1, 1, 1, 1],
    [1, 0, 1, 1, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 0],
    [1, 1, 0, 1, 2, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];
  return (
    <div style={{ height: "100%", padding: "8px 18px 20px" }}>
      <div className="mono" style={{ color: "#6b6b66", fontSize: 9 }}>APRIL 2026 · A YEAR IN MOMENTS</div>
      <div className="serif" style={{ fontSize: 36, lineHeight: 1, marginTop: 4, color: "#f5f5f0" }}>
        24<span style={{ fontSize: 22, color: "#6b6b66" }}> / 30</span>
      </div>
      <div className="mono" style={{ color: "#6b6b66", fontSize: 9, marginTop: 4 }}>DAYS THIS MONTH</div>

      {/* dot grid */}
      <div style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 8 }}>
        {weeks.map((week, wi) => (
          <div key={wi} style={{ display: "flex", gap: 8, justifyContent: "space-between" }}>
            {week.map((d, di) => (
              <div key={di} style={{
                width: 24, height: 24, borderRadius: 6,
                background: d === 2 ? "#d4ff3d" : d === 1 ? "rgba(212,255,61,0.35)" : "rgba(245,245,240,0.04)",
                border: d === 0 ? "1px solid rgba(245,245,240,0.06)" : "none",
                boxShadow: d === 2 ? "0 0 12px rgba(212,255,61,0.4)" : "none",
              }} />
            ))}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 22, display: "flex", justifyContent: "space-between", fontSize: 10 }}>
        <div>
          <div className="serif accent" style={{ fontSize: 18 }}>12</div>
          <div className="mono mute" style={{ fontSize: 8, marginTop: 2 }}>STREAK</div>
        </div>
        <div>
          <div className="serif accent" style={{ fontSize: 18 }}>284</div>
          <div className="mono mute" style={{ fontSize: 8, marginTop: 2 }}>THIS YEAR</div>
        </div>
        <div>
          <div className="serif accent" style={{ fontSize: 18 }}>1.4y</div>
          <div className="mono mute" style={{ fontSize: 8, marginTop: 2 }}>JOURNALING</div>
        </div>
      </div>
    </div>
  );
}

function LockedScreen() {
  return (
    <div style={{
      height: "100%", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", padding: "0 24px 24px",
      background: "radial-gradient(ellipse at center, rgba(212,255,61,0.08), transparent 70%)"
    }}>
      <div className="mono" style={{ color: "#6b6b66", fontSize: 9, marginBottom: 28 }}>PROJECT 03 / HEALTH</div>
      <div className="float" style={{
        width: 64, height: 64, borderRadius: 16,
        background: "rgba(245,245,240,0.04)",
        border: "1px solid rgba(245,245,240,0.1)",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 28,
        backdropFilter: "blur(20px)",
      }}>
        <Lock size={22} strokeWidth={1.5} color="#d4ff3d" />
      </div>
      <div className="serif" style={{ fontSize: 48, color: "#d4ff3d", lineHeight: 1 }}>
        Soon<span style={{ color: "#f5f5f0" }}>.</span>
      </div>
      <div className="mono" style={{ color: "#6b6b66", fontSize: 9, marginTop: 12 }}>SHIPPING 2026</div>
      <div style={{ marginTop: 28, padding: "10px 16px", border: "1px solid rgba(245,245,240,0.1)", borderRadius: 999, fontSize: 11, color: "#a1a19b" }}>
        Get notified →
      </div>
    </div>
  );
}

// ====================== APP DETAIL ======================

const SCREEN_MAP = {
  flowki: [FlowkiTimer, FlowkiSounds, FlowkiInsights],
  moment: [MomentToday, MomentRecall, MomentCalendar],
};

function ScrollShowcase({ app }) {
  const featureRefs = useRef([]);
  const active = useActiveSection(featureRefs);
  const screens = SCREEN_MAP[app.id] || [];

  return (
    <div className="scroll-showcase">
      <div className="scroll-showcase-content">
        {app.narrative.map((feat, i) => (
          <div
            key={i}
            ref={(el) => (featureRefs.current[i] = el)}
            className={"feature-block " + (active === i ? "" : "dim-out")}
          >
            <div className="label-num">{feat.label}</div>
            <h3 className="serif" style={{ fontSize: "clamp(36px, 4.5vw, 56px)", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: 24 }}>
              {feat.title}
            </h3>
            <p className="dim" style={{ fontSize: 18, lineHeight: 1.6, maxWidth: 440 }}>
              {feat.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="scroll-showcase-phone-wrap">
        <div className="scroll-phone-sticky">
          <PhoneFrame>
            <div className="screen-stack">
              {screens.map((Screen, i) => (
                <div key={i} className={"screen-frame " + (active === i ? "active" : "inactive")}>
                  <Screen />
                </div>
              ))}
            </div>
          </PhoneFrame>
        </div>
      </div>
    </div>
  );
}

function StaggerBento({ features }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="bento">
      {features.map((f, i) => {
        const FIcon = f.icon;
        return (
          <div
            key={i}
            className={"bento-card " + (f.wide ? "wide featured " : "") + (visible ? "in" : "")}
            style={{ transitionDelay: visible ? `${i * 120}ms` : "0ms" }}
          >
            <div className="icon-slot" style={{ marginBottom: 24 }}>
              <FIcon size={22} strokeWidth={1.5} />
            </div>
            <h3 className="serif" style={{ fontSize: f.wide ? 32 : 24, lineHeight: 1.05, marginBottom: 12 }}>{f.title}</h3>
            <p className="dim" style={{ fontSize: f.wide ? 16 : 14, lineHeight: 1.5 }}>{f.desc}</p>
          </div>
        );
      })}
    </div>
  );
}

function StatTriple({ rating, users, usersSuffix, version }) {
  const [ref, inView] = useInView(0.3);
  return (
    <div ref={ref} className="stat-band-detail">
      <div>
        <div className="serif accent" style={{ fontSize: "clamp(48px, 6vw, 72px)", lineHeight: 1 }}>
          <AnimatedNumber value={rating} format={(v) => v.toFixed(1)} trigger={inView} />
        </div>
        <div className="mono mute" style={{ marginTop: 8 }}>App Store rating</div>
      </div>
      <div>
        <div className="serif accent" style={{ fontSize: "clamp(48px, 6vw, 72px)", lineHeight: 1 }}>
          <AnimatedNumber value={users} format={(v) => Math.round(v) + usersSuffix} trigger={inView} />
        </div>
        <div className="mono mute" style={{ marginTop: 8 }}>Active users</div>
      </div>
      <div>
        <div className="serif accent" style={{ fontSize: "clamp(48px, 6vw, 72px)", lineHeight: 1 }}>
          v<AnimatedNumber value={version} format={(v) => v.toFixed(1)} trigger={inView} />
        </div>
        <div className="mono mute" style={{ marginTop: 8 }}>Latest version</div>
      </div>
    </div>
  );
}

function AppDetail({ app, onBack, openApp }) {
  if (app.status === "coming") return <ComingSoonDetail app={app} onBack={onBack} />;

  const Icon = app.icon;
  const otherApps = APPS.filter(a => a.id !== app.id);

  return (
    <div className="section" style={{ paddingTop: 140 }}>
      <div className="container">
        <button className="back-btn" onClick={onBack}>
          <ChevronLeft size={14} /> Back to work
        </button>

        {/* Hero */}
        <div className="rise">
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 32 }}>
            <div className="icon-slot lg"><Icon size={32} strokeWidth={1.5} /></div>
            <div>
              <div className="mono accent">{app.tag}</div>
              <h1 className="serif" style={{ fontSize: "clamp(64px, 10vw, 140px)", lineHeight: 0.9, letterSpacing: "-0.03em" }}>
                {app.name}<span className="accent">.</span>
              </h1>
            </div>
          </div>
          <p style={{ fontSize: 24, lineHeight: 1.4, color: "var(--ink)", maxWidth: 720, marginTop: 24, fontWeight: 300 }}>
            {app.desc}
          </p>
          <p className="dim" style={{ fontSize: 18, lineHeight: 1.6, maxWidth: 640, marginTop: 24 }}>
            {app.longDesc}
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 36 }}>
            <button className="btn-primary"><Download size={14} /> Download on App Store</button>
            <button className="btn-ghost"><Play size={14} /> Watch demo</button>
          </div>
        </div>

        {/* Animated stat band */}
        <StatTriple rating={app.rating} users={app.users} usersSuffix={app.usersSuffix} version={app.version} />

        {/* Sticky scroll showcase */}
        <ScrollShowcase app={app} />

        {/* Bento with stagger */}
        <div style={{ marginTop: 140 }}>
          <div className="mono mute" style={{ marginBottom: 16 }}>/ what else is inside</div>
          <h2 style={{ fontSize: "clamp(32px, 4.5vw, 56px)", lineHeight: 1, letterSpacing: "-0.02em", fontWeight: 500, maxWidth: 720 }}>
            The <span className="serif accent">small details</span>.
          </h2>
          <StaggerBento features={app.features} />
        </div>

        {/* Testimonial */}
        {app.testimonial && (
          <div className="reveal" ref={useReveal()} style={{ marginTop: 100, padding: 48, background: "var(--bg-1)", border: "1px solid var(--line)", borderRadius: 24, maxWidth: 820 }}>
            <div className="accent" style={{ display: "flex", gap: 4, marginBottom: 20 }}>
              {Array.from({ length: app.testimonial.rating }).map((_, j) => (<Star key={j} size={16} fill="currentColor" />))}
            </div>
            <p className="serif" style={{ fontSize: 28, lineHeight: 1.4, marginBottom: 24 }}>
              "{app.testimonial.quote}"
            </p>
            <div style={{ fontSize: 14 }}>
              <div>{app.testimonial.name}</div>
              <div className="mute">{app.testimonial.handle}</div>
            </div>
          </div>
        )}

        {/* Other apps */}
        <div className="reveal" ref={useReveal()} style={{ marginTop: 120 }}>
          <div className="mono mute" style={{ marginBottom: 24 }}>/ keep exploring</div>
          <div className="grid-two">
            {otherApps.map(other => {
              const OIcon = other.icon;
              const isComing = other.status === "coming";
              return (
                <div key={other.id} className={"card" + (isComing ? " coming" : "")} onClick={() => { openApp(other); window.scrollTo(0, 0); }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <div className="icon-slot"><OIcon size={22} strokeWidth={1.5} /></div>
                    {isComing
                      ? <span className="mute"><Lock size={16} /></span>
                      : <span className="arrow dim"><ArrowUpRight size={18} /></span>}
                  </div>
                  <div className="mono accent" style={{ marginBottom: 6 }}>{other.tag}</div>
                  <h3 className="serif" style={{ fontSize: 28, lineHeight: 1, marginBottom: 8 }}>{other.name}</h3>
                  <p className="dim" style={{ fontSize: 14, lineHeight: 1.5 }}>{other.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function ComingSoonDetail({ app, onBack }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const submit = () => {
    if (!email) return;
    setSent(true);
    setEmail("");
  };
  return (
    <div className="section" style={{ paddingTop: 140 }}>
      <div className="container">
        <button className="back-btn" onClick={onBack}>
          <ChevronLeft size={14} /> Back to work
        </button>

        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 80, alignItems: "center", marginTop: 40 }}>
          <div className="rise">
            <div className="mono accent" style={{ marginBottom: 20 }}>◆ {app.tag} · Project 03</div>
            <h1 style={{ fontSize: "clamp(64px, 10vw, 140px)", lineHeight: 0.88, letterSpacing: "-0.03em", fontWeight: 500, marginBottom: 32 }}>
              Something <span className="serif accent">is coming.</span>
            </h1>
            <p className="dim" style={{ fontSize: 20, lineHeight: 1.5, maxWidth: 540, marginBottom: 36 }}>
              We're not ready to talk about it yet. What we can say: it lives in the
              health space, it's been in the works since spring, and it's the most
              technically ambitious thing the studio has ever attempted.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 36 }}>
              <div>
                <div className="serif accent" style={{ fontSize: 44, lineHeight: 1 }}>2026</div>
                <div className="mono mute" style={{ marginTop: 6 }}>Shipping</div>
              </div>
              <div style={{ borderLeft: "1px solid var(--line-2)", paddingLeft: 16 }}>
                <div className="serif accent" style={{ fontSize: 44, lineHeight: 1 }}>—</div>
                <div className="mono mute" style={{ marginTop: 6 }}>TBA</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", maxWidth: 480 }}>
              <input className="field" type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} style={{ flex: 1, minWidth: 200 }} />
              <button className="btn-primary" onClick={submit}>{sent ? "On the list ✓" : "Notify me"}</button>
            </div>
            {sent && <div className="accent" style={{ marginTop: 16, fontSize: 14 }}>You'll be the first to know when it ships.</div>}
          </div>
          <div className="float">
            <PhoneFrame><div style={{paddingTop: 56, height: "100%"}}><LockedScreen /></div></PhoneFrame>
          </div>
        </div>

        <div style={{ marginTop: 100, padding: 36, background: "var(--bg-1)", border: "1px solid var(--line)", borderRadius: 20 }}>
          <div className="mono mute" style={{ marginBottom: 16 }}>/ what we will say</div>
          <p className="serif" style={{ fontSize: 24, lineHeight: 1.5 }}>
            "It's the kind of app that could only exist now — and the kind of thing
            we've been quietly building toward since the studio started."
          </p>
        </div>
      </div>
    </div>
  );
}

// ====================== SUBPAGES ======================

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [status, setStatus] = useState("idle");
  const submit = async () => {
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 900));
    setStatus("sent");
    setForm({ name: "", email: "", company: "", message: "" });
  };
  return (
    <div className="section" style={{ paddingTop: 160 }}>
      <div className="container" style={{ maxWidth: 880 }}>
        <div className="mono mute" style={{ marginBottom: 24 }}>◆ Contact · Collaboration</div>
        <h1 style={{ fontSize: "clamp(48px, 8vw, 104px)", lineHeight: 0.95, letterSpacing: "-0.03em", fontWeight: 500, marginBottom: 30 }}>
          Let's make <span className="serif accent">something</span> together.
        </h1>
        <p className="dim" style={{ fontSize: 18, lineHeight: 1.5, maxWidth: 600, marginBottom: 60 }}>
          AM Creative Studio takes on a small number of partnership, licensing, and custom-app projects each year. Tell us about yours.
        </p>
        <div style={{ display: "grid", gap: 20, maxWidth: 640 }}>
          <div className="grid-two">
            <div>
              <label className="mono mute" style={{ display: "block", marginBottom: 10 }}>Name</label>
              <input className="field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ada Lovelace" />
            </div>
            <div>
              <label className="mono mute" style={{ display: "block", marginBottom: 10 }}>Email</label>
              <input className="field" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" />
            </div>
          </div>
          <div>
            <label className="mono mute" style={{ display: "block", marginBottom: 10 }}>Company (optional)</label>
            <input className="field" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Acme Inc." />
          </div>
          <div>
            <label className="mono mute" style={{ display: "block", marginBottom: 10 }}>What's on your mind?</label>
            <textarea className="field" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us about the project, timeline, and anything relevant..." />
          </div>
          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            <button onClick={submit} className="btn-primary" disabled={status === "sending"}>
              {status === "sending" ? "Sending..." : status === "sent" ? "Sent ✓" : "Send message"}
              {status === "idle" && <Send size={14} />}
            </button>
            {status === "sent" && <span className="accent" style={{ fontSize: 14 }}>Thanks — we'll reply within 2 business days.</span>}
          </div>
        </div>
        <div className="line-t" style={{ marginTop: 80, paddingTop: 40, display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          <div>
            <div className="mono mute" style={{ marginBottom: 8 }}>Direct email</div>
            <div style={{ fontSize: 16 }}>hello@amcreative.studio</div>
          </div>
          <div>
            <div className="mono mute" style={{ marginBottom: 8 }}>Press</div>
            <div style={{ fontSize: 16 }}>press@amcreative.studio</div>
          </div>
          <div>
            <div className="mono mute" style={{ marginBottom: 8 }}>Response time</div>
            <div style={{ fontSize: 16 }}>~ 48 hours</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Feedback() {
  const [type, setType] = useState("crash");
  const liveApps = APPS.filter(a => a.status === "live");
  const [form, setForm] = useState({ app: liveApps[0].name, email: "", device: "", iosVersion: "", message: "" });
  const [status, setStatus] = useState("idle");
  const submit = async () => {
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 900));
    setStatus("sent");
    setForm({ app: liveApps[0].name, email: "", device: "", iosVersion: "", message: "" });
  };
  const tabs = [
    { id: "crash", label: "Report a crash", icon: Bug },
    { id: "suggestion", label: "Suggest a feature", icon: Lightbulb },
    { id: "other", label: "Something else", icon: Sparkles },
  ];
  return (
    <div className="section" style={{ paddingTop: 160 }}>
      <div className="container" style={{ maxWidth: 880 }}>
        <div className="mono mute" style={{ marginBottom: 24 }}>◆ Feedback · Crash reports · Suggestions</div>
        <h1 style={{ fontSize: "clamp(48px, 8vw, 104px)", lineHeight: 0.95, letterSpacing: "-0.03em", fontWeight: 500, marginBottom: 30 }}>
          Help us <span className="serif accent">sharpen</span> the apps.
        </h1>
        <p className="dim" style={{ fontSize: 18, lineHeight: 1.5, maxWidth: 600, marginBottom: 50 }}>
          Every bug report and suggestion is read by an actual human at AM Creative Studio — usually within the day. Thank you for taking the time.
        </p>
        <div style={{ display: "flex", gap: 10, marginBottom: 40, flexWrap: "wrap" }}>
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button key={t.id} onClick={() => setType(t.id)} className={"chip " + (type === t.id ? "active" : "")} style={{ padding: "10px 16px", fontSize: 13 }}>
                <Icon size={14} /> {t.label}
              </button>
            );
          })}
        </div>
        <div style={{ display: "grid", gap: 20 }}>
          <div className="grid-two">
            <div>
              <label className="mono mute" style={{ display: "block", marginBottom: 10 }}>App</label>
              <select className="field" value={form.app} onChange={(e) => setForm({ ...form, app: e.target.value })}>
                {liveApps.map((a) => <option key={a.name} value={a.name}>{a.name}</option>)}
              </select>
            </div>
            <div>
              <label className="mono mute" style={{ display: "block", marginBottom: 10 }}>Email (optional)</label>
              <input className="field" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="If you want a reply" />
            </div>
          </div>
          {type === "crash" && (
            <div className="grid-two">
              <div>
                <label className="mono mute" style={{ display: "block", marginBottom: 10 }}>Device</label>
                <input className="field" value={form.device} onChange={(e) => setForm({ ...form, device: e.target.value })} placeholder="iPhone 15 Pro" />
              </div>
              <div>
                <label className="mono mute" style={{ display: "block", marginBottom: 10 }}>iOS Version</label>
                <input className="field" value={form.iosVersion} onChange={(e) => setForm({ ...form, iosVersion: e.target.value })} placeholder="iOS 18.2" />
              </div>
            </div>
          )}
          <div>
            <label className="mono mute" style={{ display: "block", marginBottom: 10 }}>
              {type === "crash" ? "What happened?" : type === "suggestion" ? "What would you love to see?" : "Tell us more"}
            </label>
            <textarea className="field" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder={type === "crash" ? "Steps to reproduce, if possible..." : "The more detail, the better."} />
          </div>
          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            <button onClick={submit} className="btn-primary" disabled={status === "sending"}>
              {status === "sending" ? "Sending..." : status === "sent" ? "Received ✓" : "Submit feedback"}
              {status === "idle" && <Send size={14} />}
            </button>
            {status === "sent" && <span className="accent" style={{ fontSize: 14 }}>Thank you — we really mean it.</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

function Privacy() {
  const sections = [
    { h: "01 — What we collect", p: "AM Creative Studio collects the minimum data required for each app to function. For most apps this means: anonymized usage analytics, crash logs, and — if you create an account — your email address. We never collect contacts, photos, location, or health data unless an app explicitly asks for it and you grant permission in iOS." },
    { h: "02 — How we use it", p: "Data is used solely to operate, maintain, and improve our apps. Aggregated, anonymized usage patterns help us decide what to build next. We do not sell data. We do not share data with advertisers. We do not build user profiles for marketing." },
    { h: "03 — Health data", p: "Health-related data stays on-device whenever possible. When cloud sync is enabled, it is end-to-end encrypted and only accessible by you. We never look at your individual health records, and they are never used for training, analytics, or any other purpose." },
    { h: "04 — Third parties", p: "We use a small set of privacy-respecting providers: Apple for App Store distribution and crash reporting, and a backend provider for account sync. Each is bound by a data processing agreement." },
    { h: "05 — Your rights", p: "You can request a copy of your data, ask us to delete it, or export it at any time — just email privacy@amcreative.studio. We honor GDPR, CCPA, and the Apple App Tracking Transparency framework." },
    { h: "06 — Changes to this policy", p: "If we make material changes, we'll notify users in-app and update the 'last revised' date below. Continued use of the apps after changes constitutes acceptance of the revised policy." },
  ];
  return (
    <div className="section" style={{ paddingTop: 160 }}>
      <div className="container" style={{ maxWidth: 820 }}>
        <div className="mono mute" style={{ marginBottom: 24 }}>◆ Legal · Data Privacy</div>
        <h1 style={{ fontSize: "clamp(44px, 7vw, 88px)", lineHeight: 0.95, letterSpacing: "-0.03em", fontWeight: 500, marginBottom: 28 }}>
          Privacy, <span className="serif accent">plainly stated</span>.
        </h1>
        <p className="dim" style={{ fontSize: 18, lineHeight: 1.5, maxWidth: 640, marginBottom: 60 }}>
          We believe privacy policies should be readable by humans, not just lawyers. Here's ours — in plain English. Last revised: April 2026.
        </p>
        <div style={{ display: "grid", gap: 36 }}>
          {sections.map((s) => (
            <div key={s.h} className="line-b" style={{ paddingBottom: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <span className="accent"><Shield size={18} /></span>
                <h2 className="mono" style={{ fontSize: 13 }}>{s.h}</h2>
              </div>
              <p className="dim" style={{ fontSize: 16, lineHeight: 1.65 }}>{s.p}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 60, padding: 28, background: "var(--bg-1)", border: "1px solid var(--line)", borderRadius: 16, display: "flex", gap: 16, alignItems: "center" }}>
          <span className="accent"><Mail size={22} /></span>
          <div>
            <div style={{ fontSize: 15, marginBottom: 4 }}>Questions about your data?</div>
            <div className="dim" style={{ fontSize: 14 }}>Email privacy@amcreative.studio — a real human will reply.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer({ setRoute, clearApp }) {
  const go = (id) => { clearApp(); setRoute(id); window.scrollTo(0, 0); };
  const columns = [
    { title: "Studio", links: [["Work", "home"], ["Contact", "contact"]] },
    { title: "Support", links: [["Feedback", "feedback"], ["Privacy", "privacy"]] },
    { title: "Apps", links: APPS.map((a) => [a.name, "home"]) },
  ];
  return (
    <div className="line-t" style={{ padding: "60px 0 40px", position: "relative", zIndex: 2 }}>
      <div className="container">
        <div className="grid-footer">
          <div>
            <Logo />
            <p className="dim" style={{ fontSize: 14, maxWidth: 320, lineHeight: 1.6, marginTop: 20 }}>
              An independent iOS studio building small, obsessively-crafted apps for productivity, daily life, and health.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <div className="mono mute" style={{ marginBottom: 16 }}>{col.title}</div>
              {col.links.map((pair) => (
                <button key={pair[0]} onClick={() => go(pair[1])} className="dim"
                  style={{ display: "block", background: "none", border: "none", fontFamily: "inherit", fontSize: 14, marginBottom: 10, cursor: "pointer", padding: 0, textAlign: "left" }}>
                  {pair[0]}
                </button>
              ))}
            </div>
          ))}
        </div>
        <div className="line-t mute" style={{ paddingTop: 30, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16, fontSize: 13 }}>
          <div>© 2026 AM Creative Studio · Made with care in San Francisco</div>
          <div className="mono">v1.0.0 · build 2026.04</div>
        </div>
      </div>
    </div>
  );
}

// ====================== APP ROOT ======================

function ScrollProgressBar({ visible }) {
  const progress = useScrollProgress();
  if (!visible) return null;
  return (
    <div className="scroll-bar">
      <div className="scroll-bar-fill" style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}

export default function App() {
  const [route, setRoute] = useState("home");
  const [theme, setTheme] = useState("dark");
  const [selectedApp, setSelectedApp] = useState(null);

  const openApp = (app) => { setSelectedApp(app); window.scrollTo(0, 0); };
  const clearApp = () => setSelectedApp(null);

  let page;
  if (selectedApp) {
    page = <AppDetail app={selectedApp} onBack={clearApp} openApp={openApp} />;
  } else if (route === "contact") page = <Contact />;
  else if (route === "feedback") page = <Feedback />;
  else if (route === "privacy") page = <Privacy />;
  else page = <Home setRoute={setRoute} openApp={openApp} />;

  return (
    <div data-theme={theme} className="shell">
      <style>{css}</style>
      <div className="atmosphere" />
      <Nav route={route} setRoute={setRoute} theme={theme} setTheme={setTheme} clearApp={clearApp} />
      <ScrollProgressBar visible={!!selectedApp} />
      <div style={{ position: "relative", zIndex: 2 }}>{page}</div>
      <Footer setRoute={setRoute} clearApp={clearApp} />
    </div>
  );
}
