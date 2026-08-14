import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Menu, X, ArrowRight, ArrowUpRight, Check,
  Globe, LayoutTemplate, ShoppingCart, Zap, Layers, RefreshCw, Sparkles, Wrench,
  Github, Linkedin, Mail, MessageCircle, Send, Loader2, CheckCircle2,
  Quote, Plus, Minus, ShieldCheck, Gauge, Braces,
  MonitorSmartphone, ExternalLink, ChevronLeft, Rocket, FileCode2,
  MessagesSquare, PenTool, PartyPopper, CircleDot,
} from "lucide-react";

/* ============================================================
   CONTENT — edit these arrays to update site content
   ============================================================ */

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "how-it-works", label: "How It Works" },
  { id: "portfolio", label: "Portfolio" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

const SERVICES = [
  {
    icon: Globe,
    title: "Business Websites",
    desc: "Professional, credible websites for businesses and local companies that want to look as good as they perform.",
  },
  {
    icon: LayoutTemplate,
    title: "Portfolio Websites",
    desc: "Personal portfolios for professionals, designers, and freelancers who need their work to speak for itself.",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Websites",
    desc: "Online stores and product-based websites built to make browsing and buying simple.",
  },
  {
    icon: Zap,
    title: "Landing Pages",
    desc: "Focused, conversion-oriented pages for products, services, and campaigns that need to perform.",
  },
  {
    icon: Layers,
    title: "Full-Stack Web Applications",
    desc: "Complete applications — frontend, backend, APIs, and databases — built to handle real logic, not just pages.",
  },
  {
    icon: RefreshCw,
    title: "Website Redesign",
    desc: "Modernizing outdated websites with better structure, performance, and a design that fits today.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Websites",
    desc: "Websites and apps with AI functionality baked in — smart search, assistants, automation, API integrations.",
  },
  {
    icon: Wrench,
    title: "Maintenance & Improvements",
    desc: "Bug fixes, new features, and performance tuning for websites that already exist and need care.",
  },
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Share Your Idea",
    desc: "Tell me what you want to build — through the project brief or a quick message. No technical language required.",
    icon: PenTool,
  },
  {
    number: "02",
    title: "Discuss Requirements",
    desc: "We talk through features, design direction, and scope together, so we're aligned before anything is built.",
    icon: MessagesSquare,
  },
  {
    number: "03",
    title: "Development",
    desc: "I design and build your website, sharing progress along the way so there are no surprises.",
    icon: FileCode2,
  },
  {
    number: "04",
    title: "Launch",
    desc: "Your website goes live — tested, responsive, and ready for real visitors.",
    icon: Rocket,
  },
];

// Replace these with real projects as they become available. Keep the same
// shape { title, category, description, tech, demoUrl, codeUrl, placeholder }.
const PORTFOLIO_PROJECTS = [
  {
    title: "Business Website — Slot 01",
    category: "Business Websites",
    description: "Reserved for a business website case study: the brief, the build, and the result.",
    tech: ["React", "Tailwind CSS"],
    demoUrl: "",
    codeUrl: "",
    placeholder: true,
  },
  {
    title: "Web Application — Slot 02",
    category: "Web Applications",
    description: "Reserved for a full-stack application build with a real backend and database.",
    tech: ["React", "Flask", "REST API"],
    demoUrl: "",
    codeUrl: "",
    placeholder: true,
  },
  {
    title: "AI Project — Slot 03",
    category: "AI Projects",
    description: "Reserved for a project that integrates AI functionality or a third-party AI API.",
    tech: ["Python", "AI/ML API"],
    demoUrl: "",
    codeUrl: "",
    placeholder: true,
  },
  {
    title: "E-Commerce Website — Slot 04",
    category: "Business Websites",
    description: "Reserved for an online store build — product catalog, cart, and checkout flow.",
    tech: ["React", "Firebase"],
    demoUrl: "",
    codeUrl: "",
    placeholder: true,
  },
];

const PORTFOLIO_FILTERS = ["All", "Websites", "Web Applications", "AI Projects", "Business Websites"];

const SKILLS = [
  "HTML", "CSS", "JavaScript", "React", "Python", "Flask",
  "REST APIs", "Databases", "Git", "GitHub", "AI/ML Integration",
];

const WHY_POINTS = [
  { icon: Braces, title: "Custom Solutions", desc: "Every build starts from your requirements, not a recycled template." },
  { icon: Zap, title: "Modern Development", desc: "Current tools and practices, not outdated approaches held together with patches." },
  { icon: MonitorSmartphone, title: "Responsive Websites", desc: "Your site works properly on phones, tablets, and desktops — not just the demo screen." },
  { icon: Gauge, title: "Performance Focused", desc: "Fast loading and smooth interaction, built in from the start rather than fixed later." },
  { icon: MessagesSquare, title: "Clear Communication", desc: "You'll know what's happening at each stage — no disappearing for weeks at a time." },
  { icon: Layers, title: "Scalable Architecture", desc: "Code that's structured to grow with your project instead of needing a rebuild." },
  { icon: Sparkles, title: "AI Integration", desc: "Practical AI features and API integrations where they genuinely add value." },
  { icon: ShieldCheck, title: "Post-Launch Support", desc: "Launch day isn't the finish line — support continues after your site goes live." },
];

const TECHNOLOGIES = [
  "HTML5", "CSS3", "JavaScript", "React", "Python", "Flask",
  "Node.js", "REST APIs", "Firebase", "SQL", "Git", "GitHub",
];

const FAQS = [
  {
    q: "What type of websites do you build?",
    a: "Business websites, portfolios, online stores, landing pages, and full-stack web applications — from a single page to a complete product with a backend and database.",
  },
  {
    q: "How much does a website cost?",
    a: "It depends on scope — a landing page costs far less than a full web application. Share your requirements in the project brief and you'll get a clear estimate based on what you actually need.",
  },
  {
    q: "How long does development take?",
    a: "Simple sites can take a few days; larger applications take longer. Timeline is discussed and agreed on before development starts, based on your deadline and the project scope.",
  },
  {
    q: "Can you build an e-commerce website?",
    a: "Yes — online stores with product listings, a shopping cart, and a checkout flow are part of what I build.",
  },
  {
    q: "Can you redesign an existing website?",
    a: "Yes. I can rebuild an outdated site with a modern design, better performance, and cleaner code while keeping the content and purpose intact.",
  },
  {
    q: "Can you add AI features?",
    a: "Yes — from AI-powered search and chat assistants to API integrations with AI services, depending on what your project needs.",
  },
  {
    q: "Do you provide maintenance?",
    a: "Yes. After launch, I'm available for bug fixes, new features, and general upkeep so your site keeps working the way it should.",
  },
  {
    q: "How can I start a project?",
    a: "Use the \"Start Your Project\" form on this page, or reach out directly on WhatsApp or email. Either way, I'll follow up to discuss the details.",
  },
];

const WEBSITE_TYPES = [
  { value: "Business Website", icon: Globe },
  { value: "Portfolio", icon: LayoutTemplate },
  { value: "E-Commerce", icon: ShoppingCart },
  { value: "Landing Page", icon: Zap },
  { value: "Web Application", icon: Layers },
  { value: "AI Website", icon: Sparkles },
  { value: "Other", icon: CircleDot },
];

const BUDGET_RANGES = ["Under $100", "$100 – $250", "$250 – $500", "$500 – $1,000", "$1,000+"];

const FEATURE_OPTIONS = [
  "Contact Form", "Admin Dashboard", "User Accounts / Login", "Payment Integration",
  "Blog / CMS", "Booking / Scheduling", "AI Chat or Search", "Multi-language Support",
  "SEO Setup", "Database", "API Integration", "Analytics",
];

const WHATSAPP_NUMBER = "923121634432";
const EMAIL_ADDRESS = "salmanahmad5962@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/salmanahmad-tech";
const GITHUB_URL = "https://github.com/salmanahmad5962-sketch";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

/* ============================================================
   GLOBAL STYLES
   ============================================================ */

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

    html, body, #root {
      background: #1a0f0d;
      background-image:
        radial-gradient(ellipse 60% 50% at 15% 0%, rgba(251,146,60,0.16), transparent 60%),
        radial-gradient(ellipse 60% 50% at 100% 100%, rgba(244,63,94,0.14), transparent 60%);
      background-attachment: fixed;
    }

    .sa-root {
      font-family: 'Inter', system-ui, sans-serif;
      background: transparent;
      color: #f8f1ee;
      -webkit-font-smoothing: antialiased;
    }
    .sa-root .font-display { font-family: 'Space Grotesk', 'Inter', sans-serif; }
    .sa-root .font-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }

    .sa-root ::selection { background: #fb923c; color: #1a0f0d; }

    .sa-root *:focus-visible {
      outline: 2px solid #fb923c;
      outline-offset: 2px;
      border-radius: 4px;
    }

    .sa-root .glass {
      background: rgba(40, 21, 18, 0.72);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
    }

    .sa-root .grid-fade {
      background-image:
        linear-gradient(to right, rgba(251,191,145,0.08) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(251,191,145,0.08) 1px, transparent 1px);
      background-size: 44px 44px;
      -webkit-mask-image: radial-gradient(ellipse 60% 50% at 50% 0%, #000 40%, transparent 100%);
      mask-image: radial-gradient(ellipse 60% 50% at 50% 0%, #000 40%, transparent 100%);
    }

    .sa-root .text-gradient {
      background: linear-gradient(90deg, #fdba74, #fb7185 55%, #fde68a);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .sa-root .glow-blob {
      filter: blur(90px);
      opacity: 0.35;
    }

    @keyframes sa-blink { 0%, 45% { opacity: 1; } 50%, 100% { opacity: 0; } }
    .sa-root .sa-cursor { animation: sa-blink 1s step-end infinite; }

    @keyframes sa-float {
      0%, 100% { transform: translateY(0px) rotate(var(--r, 0deg)); }
      50% { transform: translateY(-14px) rotate(var(--r, 0deg)); }
    }
    .sa-root .sa-float { animation: sa-float 6s ease-in-out infinite; }
    .sa-root .sa-float-slow { animation: sa-float 9s ease-in-out infinite; }

    @keyframes sa-pulse-ring {
      0% { box-shadow: 0 0 0 0 rgba(52,211,153,0.5); }
      100% { box-shadow: 0 0 0 8px rgba(52,211,153,0); }
    }
    .sa-root .sa-pulse { animation: sa-pulse-ring 2s ease-out infinite; }

    @keyframes sa-marquee {
      from { transform: translateX(0); }
      to { transform: translateX(-50%); }
    }
    .sa-root .sa-marquee-track { animation: sa-marquee 28s linear infinite; }
    .sa-root .sa-marquee-wrap:hover .sa-marquee-track { animation-play-state: paused; }

    .sa-root .sa-scrollbar::-webkit-scrollbar { height: 6px; width: 6px; }
    .sa-root .sa-scrollbar::-webkit-scrollbar-thumb { background: #5c3a30; border-radius: 999px; }

    .sa-root input[type="text"],
    .sa-root input[type="email"],
    .sa-root input[type="tel"],
    .sa-root textarea,
    .sa-root select {
      background: #221513;
      border: 1px solid #4a2e27;
      color: #f8f1ee;
    }
    .sa-root input::placeholder, .sa-root textarea::placeholder { color: #93695d; }
    .sa-root input:focus, .sa-root textarea:focus, .sa-root select:focus {
      border-color: #fb923c;
      box-shadow: 0 0 0 3px rgba(251,146,60,0.18);
    }

    @media (prefers-reduced-motion: reduce) {
      .sa-root *, .sa-root *::before, .sa-root *::after {
        animation-duration: 0.001ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.001ms !important;
        scroll-behavior: auto !important;
      }
    }
  `}</style>
);

/* ============================================================
   LIVE BACKGROUND — animated particle network (canvas)
   ============================================================ */

const ParticleBackground = () => {
  const canvasRef = React.useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0, height = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles = [];
    let mouse = { x: -9999, y: -9999 };
    let rafId = null;
    let running = true;

    // Theme colors pulled from the site's own palette (indigo / fuchsia / amber)
    const COLORS = ["251,146,60", "244,63,94", "252,211,77"]; // orange-400, rose-500, amber-300

    const setup = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = prefersReduced ? 0 : Math.min(90, Math.floor((width * height) / 16000));
      particles = Array.from({ length: density }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
    };

    const step = () => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);

      // update + draw particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // gentle attraction toward cursor
        const dx = mouse.x - p.x, dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 140) {
          p.x -= dx * 0.0018;
          p.y -= dy * 0.0018;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, 0.55)`;
        ctx.fill();
      }

      // connecting lines
      const maxDist = 120;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < maxDist) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(214,168,140,${0.14 * (1 - d / maxDist)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      rafId = requestAnimationFrame(step);
    };

    const onResize = () => setup();
    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    const onVisibility = () => {
      running = document.visibilityState === "visible";
      if (running) rafId = requestAnimationFrame(step);
      else if (rafId) cancelAnimationFrame(rafId);
    };

    setup();
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("visibilitychange", onVisibility);

    if (!prefersReduced) {
      rafId = requestAnimationFrame(step);
    } else {
      // Static single render for reduced-motion users
      step();
      running = false;
    }

    return () => {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-20 h-full w-full pointer-events-none"
    />
  );
};

/* ============================================================
   SMALL REUSABLE PIECES
   ============================================================ */

const Eyebrow = ({ children, tone = "indigo" }) => {
  const tones = {
    indigo: "text-orange-300 border-orange-500/30 bg-orange-500/10",
    amber: "text-amber-300 border-amber-500/30 bg-amber-500/10",
    emerald: "text-rose-300 border-rose-500/30 bg-rose-500/10",
  };
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-mono tracking-wide ${tones[tone]}`}
    >
      {children}
    </span>
  );
};

const Reveal = ({ children, delay = 0, y = 22, className = "" }) => {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? {} : { opacity: 0, y }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const SectionHeading = ({ eyebrow, title, desc, tone, center = false }) => (
  <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
    <Reveal>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
    </Reveal>
    <Reveal delay={0.08}>
      <h2 className="font-display mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-stone-50">
        {title}
      </h2>
    </Reveal>
    {desc && (
      <Reveal delay={0.14}>
        <p className="mt-4 text-stone-400 text-base sm:text-lg leading-relaxed">{desc}</p>
      </Reveal>
    )}
  </div>
);

const PrimaryButton = ({ children, onClick, href, type = "button", className = "", icon: Icon = ArrowRight }) => {
  const classes = `group inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-3.5 text-sm font-semibold text-stone-950 shadow-lg shadow-amber-500/20 transition-all duration-200 hover:bg-amber-300 hover:shadow-amber-400/30 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-amber-300 min-h-[44px] cursor-pointer ${className}`;
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        <Icon className="h-4 w-4 transition-transform duration-200 group-hover:transtone-x-0.5" />
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
      <Icon className="h-4 w-4 transition-transform duration-200 group-hover:transtone-x-0.5" />
    </button>
  );
};

const SecondaryButton = ({ children, onClick, href, className = "" }) => {
  const classes = `group inline-flex items-center justify-center gap-2 rounded-xl border border-stone-700 bg-stone-900/60 px-6 py-3.5 text-sm font-semibold text-stone-200 transition-all duration-200 hover:border-stone-500 hover:bg-stone-800/80 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-stone-400 min-h-[44px] cursor-pointer ${className}`;
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
};

/* ============================================================
   NAVIGATION
   ============================================================ */

const Nav = ({ activeSection, scrollTo }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id) => {
    setOpen(false);
    scrollTo(id);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-stone-800/80" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 py-4">
        <button
          onClick={() => handleNav("home")}
          className="font-mono text-lg font-semibold text-stone-50 cursor-pointer"
          aria-label="Go to home"
        >
          <span className="text-orange-400">&lt;</span>Salman
          <span className="text-orange-400"> /&gt;</span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                activeSection === link.id
                  ? "text-stone-50 bg-stone-800/70"
                  : "text-stone-400 hover:text-stone-100 hover:bg-stone-800/40"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="hidden md:block">
          <PrimaryButton onClick={() => handleNav("brief")} className="px-5 py-2.5 text-sm">
            Start Your Project
          </PrimaryButton>
        </div>

        <button
          className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-lg border border-stone-700 text-stone-200 cursor-pointer"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden glass border-b border-stone-800/80 overflow-hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`cursor-pointer rounded-lg px-4 py-3 text-left text-sm font-medium min-h-[44px] ${
                    activeSection === link.id
                      ? "text-stone-50 bg-stone-800/70"
                      : "text-stone-400 hover:text-stone-100"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <PrimaryButton onClick={() => handleNav("brief")} className="mt-2 w-full">
                Start Your Project
              </PrimaryButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

/* ============================================================
   HERO
   ============================================================ */

const HeroVisual = () => {
  const codeLines = [
    { c1: "#fb923c", t1: "type", c2: "#f8f1ee", t2: " ", c3: "#fb7185", t3: "\"Business site" },
    { c1: "#fb7185", t1: "with online store\"", c2: "", t2: "", c3: "", t3: "" },
    { c1: "#fb923c", t1: "budget", c2: "#f8f1ee", t2: " ", c3: "#fde68a", t3: "$250 – $500" },
    { c1: "#fb923c", t1: "deadline", c2: "#f8f1ee", t2: " ", c3: "#fde68a", t3: "3 weeks" },
  ];
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div className="sa-float relative rounded-2xl border border-stone-700/80 bg-stone-900/90 shadow-2xl shadow-black/40" style={{ "--r": "-2deg" }}>
        <div className="flex items-center gap-2 border-b border-stone-800 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
          <span className="ml-3 font-mono text-xs text-stone-500">brief.md</span>
        </div>
        <div className="px-5 py-5 font-mono text-[13px] leading-7">
          {codeLines.map((l, i) => (
            <div key={i}>
              <span style={{ color: l.c1 || "#f8f1ee" }}>{l.t1}</span>
              <span style={{ color: l.c2 }}>{l.t2}</span>
              <span style={{ color: l.c3 }}>{l.t3}</span>
            </div>
          ))}
          <span className="sa-cursor text-orange-400">▍</span>
        </div>
      </div>

      <div
        className="sa-float-slow absolute -bottom-8 -right-4 sm:-right-10 w-56 sm:w-64 rounded-xl border border-stone-700/80 bg-stone-900/95 shadow-2xl shadow-black/40"
        style={{ "--r": "3deg" }}
      >
        <div className="flex items-center gap-1.5 border-b border-stone-800 px-3 py-2.5">
          <Globe className="h-3 w-3 text-stone-500" />
          <span className="font-mono text-[10px] text-stone-500">yoursite.com</span>
        </div>
        <div className="space-y-2 p-3">
          <div className="h-2.5 w-2/3 rounded bg-gradient-to-r from-orange-400 to-rose-300" />
          <div className="h-1.5 w-full rounded bg-stone-700" />
          <div className="h-1.5 w-5/6 rounded bg-stone-700" />
          <div className="flex gap-1.5 pt-1">
            <div className="h-6 w-14 rounded bg-amber-400/90" />
            <div className="h-6 w-14 rounded border border-stone-600" />
          </div>
        </div>
      </div>

      <div className="absolute -left-6 top-1/3 hidden sm:flex sa-float items-center gap-1.5 rounded-full border border-stone-700 bg-stone-900/90 px-3 py-1.5 shadow-lg" style={{ "--r": "0deg", animationDelay: "1.2s" }}>
        <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
        <span className="font-mono text-[11px] text-stone-300">React + Flask</span>
      </div>
    </div>
  );
};

const Hero = ({ scrollTo }) => {
  const reduceMotion = useReducedMotion();
  return (
    <section id="home" className="relative overflow-hidden pt-32 sm:pt-40 pb-24 sm:pb-32">
      <div
        className="pointer-events-none absolute inset-0 -z-20 bg-cover bg-center opacity-[0.22] mix-blend-luminosity"
        style={{ backgroundImage: "url('/images/mockup-devices.jpg')" }}
      />
      <div className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-b from-[#1a0f0d] via-[#1a0f0d]/85 to-[#1a0f0d]" />
      <div className="grid-fade pointer-events-none absolute inset-0 -z-10" />
      <div className="glow-blob pointer-events-none absolute -top-24 left-1/4 -z-10 h-72 w-72 rounded-full bg-orange-600" />
      <div className="glow-blob pointer-events-none absolute top-10 right-0 -z-10 h-72 w-72 rounded-full bg-rose-600" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-5 sm:px-8 lg:grid-cols-2 lg:gap-8">
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, y: 24 }}
          animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1.5">
            <span className="sa-pulse h-2 w-2 rounded-full bg-rose-400" />
            <span className="font-mono text-xs text-rose-300">Available for new projects</span>
          </div>

          <h1 className="font-display mt-6 text-4xl sm:text-5xl lg:text-[3.4rem] font-bold leading-[1.1] tracking-tight text-stone-50">
            Tell me what you're building.
            <br />
            <span className="text-gradient">I'll turn it into a website that works.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-stone-400 leading-relaxed">
            I'm Salman Ahmad, a web and software developer. I design and build modern
            websites and full-stack applications — you bring the idea, I handle the code,
            design, and everything that connects them.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <PrimaryButton onClick={() => scrollTo("brief")}>Start Your Project</PrimaryButton>
            <SecondaryButton onClick={() => scrollTo("portfolio")}>View My Work</SecondaryButton>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-xs text-stone-500">
            <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-rose-400" /> Custom-built, no templates</span>
            <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-rose-400" /> Direct communication</span>
            <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-rose-400" /> Support after launch</span>
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, scale: 0.94 }}
          animate={reduceMotion ? {} : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  );
};

/* ============================================================
   SERVICES
   ============================================================ */

const Services = () => (
  <section id="services" className="relative py-24 sm:py-32 border-t border-stone-800/60">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <SectionHeading
        eyebrow="// 01 — services"
        title="What I can build for you"
        desc="From a single page to a complete product — pick a starting point, or describe something in between."
      />

      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {SERVICES.map((s, i) => (
          <Reveal key={s.title} delay={(i % 4) * 0.06}>
            <div className="group h-full rounded-2xl border border-stone-800 bg-stone-900/50 p-6 transition-all duration-300 hover:border-orange-500/40 hover:bg-stone-900">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 text-orange-300 transition-colors duration-300 group-hover:bg-orange-500/20">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display mt-5 text-base font-semibold text-stone-50">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-400">{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ============================================================
   HOW IT WORKS
   ============================================================ */

const HowItWorks = ({ scrollTo }) => (
  <section id="how-it-works" className="relative py-24 sm:py-32 border-t border-stone-800/60">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <SectionHeading
        eyebrow="// 02 — process"
        title="How a project comes together"
        desc="Four steps, start to finish. You're never left wondering what's happening next."
        tone="amber"
      />

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 relative">
        <div className="hidden lg:block absolute top-11 left-0 right-0 h-px bg-gradient-to-r from-transparent via-stone-700 to-transparent" />
        {PROCESS_STEPS.map((step, i) => (
          <Reveal key={step.number} delay={i * 0.1} className="relative">
            <div className="relative z-10 flex flex-col">
              <div className="flex h-[88px] w-[88px] items-center justify-center rounded-2xl border border-stone-700 bg-stone-950 shadow-lg shadow-black/30">
                <step.icon className="h-7 w-7 text-amber-300" />
              </div>
              <span className="font-mono mt-5 text-xs text-stone-500">{step.number}</span>
              <h3 className="font-display mt-1 text-lg font-semibold text-stone-50">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-400 max-w-xs">{step.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.3} className="mt-14 text-center">
        <SecondaryButton onClick={() => scrollTo("brief")}>
          Start with step one <ArrowRight className="h-4 w-4" />
        </SecondaryButton>
      </Reveal>
    </div>
  </section>
);

/* ============================================================
   PROJECT BRIEF (multi-step form) — the core conversion element
   ============================================================ */

const initialBriefState = {
  name: "", email: "", whatsapp: "", company: "",
  websiteType: "", budget: "", deadline: "",
  description: "", features: [],
};

const StepDot = ({ index, current, label }) => {
  const state = index < current ? "done" : index === current ? "active" : "todo";
  return (
    <div className="flex flex-1 items-center gap-2">
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-mono text-xs transition-colors duration-300 ${
          state === "done"
            ? "border-rose-400 bg-rose-400 text-stone-950"
            : state === "active"
            ? "border-orange-400 bg-orange-500/20 text-orange-200"
            : "border-stone-700 text-stone-500"
        }`}
      >
        {state === "done" ? <Check className="h-4 w-4" /> : index + 1}
      </div>
      <span className={`hidden sm:block text-xs font-medium ${state === "todo" ? "text-stone-600" : "text-stone-300"}`}>
        {label}
      </span>
    </div>
  );
};

const FieldLabel = ({ htmlFor, children, required }) => (
  <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-stone-300">
    {children} {required && <span className="text-amber-400">*</span>}
  </label>
);

const FieldError = ({ children }) =>
  children ? <p className="mt-1.5 text-xs text-red-400">{children}</p> : null;

const ProjectBrief = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(initialBriefState);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const stepLabels = ["Contact", "Project", "Details", "Review"];

  const update = (field, value) => {
    setData((d) => ({ ...d, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const toggleFeature = (feature) => {
    setData((d) => ({
      ...d,
      features: d.features.includes(feature)
        ? d.features.filter((f) => f !== feature)
        : [...d.features, feature],
    }));
  };

  const validateStep = (s) => {
    const e = {};
    if (s === 0) {
      if (!data.name.trim()) e.name = "Please enter your name.";
      if (!data.email.trim()) e.email = "Please enter your email.";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = "Please enter a valid email address.";
      if (!data.whatsapp.trim()) e.whatsapp = "Please enter a WhatsApp number.";
    }
    if (s === 1) {
      if (!data.websiteType) e.websiteType = "Please choose a website type.";
      if (!data.budget) e.budget = "Please choose a budget range.";
    }
    if (s === 2) {
      if (!data.description.trim()) e.description = "Please describe your project.";
      else if (data.description.trim().length < 15) e.description = "A little more detail helps — a sentence or two is great.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, 3));
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const buildMessage = () => {
    const lines = [
      "New project request",
      "",
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `WhatsApp: ${data.whatsapp}`,
      data.company ? `Company: ${data.company}` : null,
      `Website type: ${data.websiteType}`,
      `Budget: ${data.budget}`,
      data.deadline ? `Deadline: ${data.deadline}` : null,
      "",
      `Description: ${data.description}`,
      data.features.length ? `Features: ${data.features.join(", ")}` : null,
    ].filter(Boolean);
    return lines.join("\n");
  };

  const handleSubmit = () => {
    if (!validateStep(2)) { setStep(2); return; }
    setSubmitting(true);
    window.setTimeout(() => {
      const text = encodeURIComponent(buildMessage());
      window.open(`${WHATSAPP_URL}?text=${text}`, "_blank", "noopener,noreferrer");
      setSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  const reset = () => {
    setData(initialBriefState);
    setErrors({});
    setStep(0);
    setSubmitted(false);
  };

  return (
    <section id="brief" className="relative py-24 sm:py-32 border-t border-stone-800/60">
      <div className="glow-blob pointer-events-none absolute top-0 right-1/4 -z-10 h-72 w-72 rounded-full bg-orange-700" />
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="// 03 — start a project"
          title="Tell me about your project"
          desc="A few quick questions so I understand what you need. Takes about two minutes."
          center
          tone="emerald"
        />

        <Reveal delay={0.15} className="mt-12">
          <div className="rounded-3xl border border-stone-800 bg-stone-900/60 p-6 sm:p-10 shadow-2xl shadow-black/30">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center py-10 text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-500/15">
                    <PartyPopper className="h-8 w-8 text-rose-400" />
                  </div>
                  <h3 className="font-display mt-6 text-2xl font-bold text-stone-50">
                    Project Request Received 🚀
                  </h3>
                  <p className="mt-3 max-w-sm text-stone-400">
                    Thanks for sharing your idea. I've opened WhatsApp with your details filled
                    in — send it across and I'll review your requirements and get back to you soon.
                  </p>
                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <PrimaryButton href={`${WHATSAPP_URL}?text=${encodeURIComponent(buildMessage())}`} icon={ArrowUpRight}>
                      Open WhatsApp again
                    </PrimaryButton>
                    <SecondaryButton onClick={reset}>Submit another project</SecondaryButton>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="mb-8 flex items-center gap-1">
                    {stepLabels.map((label, i) => (
                      <React.Fragment key={label}>
                        <StepDot index={i} current={step} label={label} />
                        {i < stepLabels.length - 1 && <div className="h-px w-4 sm:w-8 bg-stone-800 shrink-0" />}
                      </React.Fragment>
                    ))}
                  </div>
                  <p className="mb-6 font-mono text-xs text-stone-500">Step {step + 1} of 4</p>

                  <AnimatePresence mode="wait">
                    {step === 0 && (
                      <motion.div
                        key="s0"
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -16 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-5"
                      >
                        <div>
                          <FieldLabel htmlFor="name" required>Your name</FieldLabel>
                          <input
                            id="name" type="text" value={data.name}
                            onChange={(e) => update("name", e.target.value)}
                            placeholder="e.g. Ayesha Khan"
                            className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                            aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined}
                          />
                          <div id="name-err"><FieldError>{errors.name}</FieldError></div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-5">
                          <div>
                            <FieldLabel htmlFor="email" required>Email address</FieldLabel>
                            <input
                              id="email" type="email" value={data.email}
                              onChange={(e) => update("email", e.target.value)}
                              placeholder="you@email.com"
                              className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                              aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined}
                            />
                            <div id="email-err"><FieldError>{errors.email}</FieldError></div>
                          </div>
                          <div>
                            <FieldLabel htmlFor="whatsapp" required>WhatsApp number</FieldLabel>
                            <input
                              id="whatsapp" type="tel" value={data.whatsapp}
                              onChange={(e) => update("whatsapp", e.target.value)}
                              placeholder="+92 3XX XXXXXXX"
                              className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                              aria-invalid={!!errors.whatsapp} aria-describedby={errors.whatsapp ? "wa-err" : undefined}
                            />
                            <div id="wa-err"><FieldError>{errors.whatsapp}</FieldError></div>
                          </div>
                        </div>
                        <div>
                          <FieldLabel htmlFor="company">Company / business name (optional)</FieldLabel>
                          <input
                            id="company" type="text" value={data.company}
                            onChange={(e) => update("company", e.target.value)}
                            placeholder="e.g. Khan Bakers"
                            className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                          />
                        </div>
                      </motion.div>
                    )}

                    {step === 1 && (
                      <motion.div
                        key="s1"
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -16 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-6"
                      >
                        <div>
                          <FieldLabel required>What type of website do you need?</FieldLabel>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                            {WEBSITE_TYPES.map((t) => (
                              <button
                                key={t.value} type="button" onClick={() => update("websiteType", t.value)}
                                className={`flex min-h-[44px] items-center gap-2 rounded-xl border px-3 py-3 text-sm font-medium transition-colors duration-200 cursor-pointer ${
                                  data.websiteType === t.value
                                    ? "border-orange-400 bg-orange-500/15 text-orange-100"
                                    : "border-stone-800 bg-stone-950/50 text-stone-400 hover:border-stone-600"
                                }`}
                              >
                                <t.icon className="h-4 w-4 shrink-0" /> {t.value}
                              </button>
                            ))}
                          </div>
                          <FieldError>{errors.websiteType}</FieldError>
                        </div>

                        <div>
                          <FieldLabel required>What's your budget?</FieldLabel>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                            {BUDGET_RANGES.map((b) => (
                              <button
                                key={b} type="button" onClick={() => update("budget", b)}
                                className={`min-h-[44px] rounded-xl border px-3 py-3 text-sm font-medium transition-colors duration-200 cursor-pointer ${
                                  data.budget === b
                                    ? "border-amber-400 bg-amber-400/15 text-amber-200"
                                    : "border-stone-800 bg-stone-950/50 text-stone-400 hover:border-stone-600"
                                }`}
                              >
                                {b}
                              </button>
                            ))}
                          </div>
                          <FieldError>{errors.budget}</FieldError>
                        </div>

                        <div>
                          <FieldLabel htmlFor="deadline">Expected deadline (optional)</FieldLabel>
                          <input
                            id="deadline" type="text" value={data.deadline}
                            onChange={(e) => update("deadline", e.target.value)}
                            placeholder="e.g. within 3 weeks, or a specific date"
                            className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                          />
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        key="s2"
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -16 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-6"
                      >
                        <div>
                          <FieldLabel htmlFor="description" required>Describe your project</FieldLabel>
                          <textarea
                            id="description" rows={5} value={data.description}
                            onChange={(e) => update("description", e.target.value)}
                            placeholder="What is this website for, who's it for, and what should it do?"
                            className="w-full resize-none rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                            aria-invalid={!!errors.description} aria-describedby={errors.description ? "desc-err" : undefined}
                          />
                          <div id="desc-err"><FieldError>{errors.description}</FieldError></div>
                        </div>
                        <div>
                          <FieldLabel>Required features (optional)</FieldLabel>
                          <div className="flex flex-wrap gap-2">
                            {FEATURE_OPTIONS.map((f) => {
                              const active = data.features.includes(f);
                              return (
                                <button
                                  key={f} type="button" onClick={() => toggleFeature(f)}
                                  className={`min-h-[38px] rounded-full border px-3.5 py-2 text-xs font-medium transition-colors duration-200 cursor-pointer ${
                                    active
                                      ? "border-rose-400 bg-rose-400/15 text-rose-200"
                                      : "border-stone-800 bg-stone-950/50 text-stone-400 hover:border-stone-600"
                                  }`}
                                >
                                  {active && <Check className="mr-1 inline h-3 w-3" />}
                                  {f}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div
                        key="s3"
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -16 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-4"
                      >
                        <p className="text-sm text-stone-400">
                          Quick check before this goes out — you can go back and edit anything.
                        </p>
                        <dl className="divide-y divide-stone-800 rounded-xl border border-stone-800 overflow-hidden">
                          {[
                            ["Name", data.name], ["Email", data.email], ["WhatsApp", data.whatsapp],
                            ["Company", data.company || "—"], ["Website type", data.websiteType],
                            ["Budget", data.budget], ["Deadline", data.deadline || "—"],
                            ["Features", data.features.length ? data.features.join(", ") : "—"],
                          ].map(([k, v]) => (
                            <div key={k} className="flex justify-between gap-4 px-4 py-2.5 text-sm">
                              <dt className="text-stone-500">{k}</dt>
                              <dd className="text-right text-stone-200">{v}</dd>
                            </div>
                          ))}
                          <div className="px-4 py-2.5 text-sm">
                            <dt className="text-stone-500 mb-1">Description</dt>
                            <dd className="text-stone-200">{data.description}</dd>
                          </div>
                        </dl>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="mt-9 flex items-center justify-between gap-3">
                    {step > 0 ? (
                      <SecondaryButton onClick={back} className="px-5 py-3">
                        <ChevronLeft className="h-4 w-4" /> Back
                      </SecondaryButton>
                    ) : <span />}

                    {step < 3 ? (
                      <PrimaryButton onClick={next} className="px-6 py-3">Continue</PrimaryButton>
                    ) : (
                      <PrimaryButton onClick={handleSubmit} className="px-6 py-3" icon={submitting ? Loader2 : Send}>
                        {submitting ? "Sending…" : "Send Project Request"}
                      </PrimaryButton>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

/* ============================================================
   PORTFOLIO
   ============================================================ */

const Portfolio = () => {
  const [filter, setFilter] = useState("All");
  const filtered = useMemo(
    () => (filter === "All" ? PORTFOLIO_PROJECTS : PORTFOLIO_PROJECTS.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <section id="portfolio" className="relative py-24 sm:py-32 border-t border-stone-800/60">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <SectionHeading
            eyebrow="// 04 — portfolio"
            title="Work in progress"
            desc="This section is structured to hold real case studies — each slot below is a clearly marked placeholder, ready to be replaced with a shipped project."
          />
          <Reveal delay={0.1} className="flex flex-wrap gap-2">
            {PORTFOLIO_FILTERS.map((f) => (
              <button
                key={f} onClick={() => setFilter(f)}
                className={`min-h-[38px] cursor-pointer rounded-full border px-4 py-2 text-xs font-medium font-mono transition-colors duration-200 ${
                  filter === f
                    ? "border-orange-400 bg-orange-500/15 text-orange-200"
                    : "border-stone-800 text-stone-500 hover:border-stone-600 hover:text-stone-300"
                }`}
              >
                {f}
              </button>
            ))}
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filtered.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.08}>
              <div className="group relative overflow-hidden rounded-2xl border border-dashed border-stone-700 bg-stone-900/40 p-6 h-full flex flex-col">
                <div className="absolute top-4 right-4 rounded-full border border-stone-700 bg-stone-950/80 px-2.5 py-1 font-mono text-[10px] text-stone-500">
                  placeholder
                </div>
                <div className="mb-5 flex h-32 items-center justify-center rounded-xl border border-stone-800 bg-stone-950/60">
                  <FileCode2 className="h-9 w-9 text-stone-700" />
                </div>
                <span className="font-mono text-[11px] text-orange-300">{p.category}</span>
                <h3 className="font-display mt-1.5 text-lg font-semibold text-stone-100">{p.title}</h3>
                <p className="mt-2 text-sm text-stone-400 leading-relaxed flex-1">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span key={t} className="rounded-md bg-stone-800/80 px-2 py-1 font-mono text-[10px] text-stone-400">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex gap-4 text-sm text-stone-600">
                  <span className="inline-flex items-center gap-1.5"><ExternalLink className="h-3.5 w-3.5" /> Demo coming soon</span>
                  <span className="inline-flex items-center gap-1.5"><Github className="h-3.5 w-3.5" /> Code coming soon</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   ABOUT
   ============================================================ */

const About = () => (
  <section id="about" className="relative py-24 sm:py-32 border-t border-stone-800/60 overflow-hidden">
    <div
      className="pointer-events-none absolute inset-0 -z-20 bg-cover bg-center opacity-[0.18] mix-blend-luminosity"
      style={{ backgroundImage: "url('/images/tech-render.jpg')" }}
    />
    <div className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-b from-[#1a0f0d] via-[#1a0f0d]/90 to-[#1a0f0d]" />
    <div className="mx-auto max-w-7xl px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <Reveal>
        <div className="relative mx-auto w-full max-w-sm">
          <div
            className="aspect-square rounded-3xl border border-stone-800 bg-cover bg-center flex items-center justify-center relative overflow-hidden"
            style={{ backgroundImage: "url('/images/tech-render.jpg')" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 via-stone-950/70 to-stone-950/90" />
            <span className="relative font-display text-7xl font-bold text-stone-50/90 drop-shadow-lg">SA</span>
          </div>
          <div className="sa-float absolute -bottom-5 -left-5 rounded-xl border border-stone-700 bg-stone-900 px-4 py-3 shadow-xl" style={{ "--r": "-1deg" }}>
            <span className="font-mono text-xs text-rose-300">git commit -m "shipped"</span>
          </div>
        </div>
      </Reveal>

      <div>
        <Eyebrow>// 05 — about</Eyebrow>
        <h2 className="font-display mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-stone-50">
          Salman Ahmad
        </h2>
        <p className="mt-2 font-mono text-sm text-orange-300">Web Developer / Software Developer</p>
        <p className="mt-6 text-stone-400 leading-relaxed">
          I build modern, practical digital products — websites that look right and
          applications that actually work. My approach is straightforward: understand
          what you need, then build it cleanly, without unnecessary complexity.
        </p>
        <p className="mt-4 text-stone-400 leading-relaxed">
          I work across the stack — from interfaces people interact with, to the backend
          logic and databases running behind them — so a project doesn't have to be split
          across different people to get done properly.
        </p>

        <div className="mt-8">
          <p className="mb-3 text-sm font-medium text-stone-300">Technical skills</p>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((s) => (
              <span key={s} className="rounded-full border border-stone-800 bg-stone-900/60 px-3.5 py-1.5 font-mono text-xs text-stone-300">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ============================================================
   WHY WORK WITH ME
   ============================================================ */

const WhyWorkWithMe = () => (
  <section className="relative py-24 sm:py-32 border-t border-stone-800/60">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <SectionHeading
        eyebrow="// 06 — why me"
        title="Why work with me"
        desc="A few things you can expect from working together, not just a list of buzzwords."
        tone="amber"
      />
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {WHY_POINTS.map((w, i) => (
          <Reveal key={w.title} delay={(i % 4) * 0.06}>
            <div className="h-full rounded-2xl border border-stone-800 bg-stone-900/40 p-6">
              <w.icon className="h-6 w-6 text-amber-300" />
              <h3 className="font-display mt-4 text-base font-semibold text-stone-50">{w.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-400">{w.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ============================================================
   TECHNOLOGIES (marquee)
   ============================================================ */

const Technologies = () => {
  const loopItems = [...TECHNOLOGIES, ...TECHNOLOGIES];
  return (
    <section className="relative py-20 border-t border-stone-800/60 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="// 07 — technologies" title="Tools I build with" tone="indigo" center />
      </div>
      <div className="sa-marquee-wrap mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="sa-marquee-track flex w-max gap-4">
          {loopItems.map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="flex items-center gap-2 whitespace-nowrap rounded-xl border border-stone-800 bg-stone-900/60 px-5 py-3 font-mono text-sm text-stone-300"
            >
              <Braces className="h-4 w-4 text-orange-400" /> {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   TESTIMONIALS (placeholder / empty state)
   ============================================================ */

const Testimonials = () => (
  <section className="relative py-24 sm:py-32 border-t border-stone-800/60">
    <div className="mx-auto max-w-3xl px-5 sm:px-8 text-center">
      <SectionHeading eyebrow="// 08 — testimonials" title="What clients say" center tone="emerald" />
      <Reveal delay={0.15} className="mt-12">
        <div className="rounded-3xl border border-dashed border-stone-700 bg-stone-900/30 px-8 py-14">
          <Quote className="mx-auto h-8 w-8 text-stone-700" />
          <p className="mt-5 text-stone-400">
            Client testimonials will appear here once projects are completed. This space is
            reserved for real feedback — nothing has been added yet.
          </p>
        </div>
      </Reveal>
    </div>
  </section>
);

/* ============================================================
   FAQ
   ============================================================ */

const FaqItem = ({ item, isOpen, onClick, index }) => (
  <div className="border-b border-stone-800">
    <h3>
      <button
        onClick={onClick}
        className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left min-h-[44px]"
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${index}`}
      >
        <span className="font-medium text-stone-100">{item.q}</span>
        {isOpen ? <Minus className="h-4 w-4 shrink-0 text-orange-300" /> : <Plus className="h-4 w-4 shrink-0 text-stone-500" />}
      </button>
    </h3>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          id={`faq-panel-${index}`}
          role="region"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <p className="pb-5 text-sm leading-relaxed text-stone-400">{item.a}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section id="faq" className="relative py-24 sm:py-32 border-t border-stone-800/60">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeading eyebrow="// 09 — faq" title="Common questions" center tone="indigo" />
        <Reveal delay={0.12} className="mt-12">
          <div>
            {FAQS.map((item, i) => (
              <FaqItem
                key={item.q} item={item} index={i}
                isOpen={openIndex === i}
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

/* ============================================================
   CONTACT
   ============================================================ */

const ContactCard = ({ icon: Icon, label, value, href }) => (
  <a
    href={href} target="_blank" rel="noopener noreferrer"
    className="group flex items-center gap-4 rounded-2xl border border-stone-800 bg-stone-900/50 p-5 transition-all duration-200 hover:border-orange-500/40 hover:bg-stone-900 cursor-pointer"
  >
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-300">
      <Icon className="h-5 w-5" />
    </div>
    <div className="min-w-0">
      <p className="text-xs text-stone-500">{label}</p>
      <p className="truncate text-sm font-medium text-stone-200">{value}</p>
    </div>
    <ArrowUpRight className="ml-auto h-4 w-4 text-stone-600 transition-all duration-200 group-hover:text-orange-300 group-hover:transtone-x-0.5 group-hover:-transtone-y-0.5" />
  </a>
);

const ContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success

  const update = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim()) e.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Please enter a valid email address.";
    if (!form.subject.trim()) e.subject = "Please add a subject.";
    if (!form.message.trim()) e.message = "Please write a message.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    window.setTimeout(() => {
      const subject = encodeURIComponent(form.subject);
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
      window.open(`mailto:${EMAIL_ADDRESS}?subject=${subject}&body=${body}`, "_blank");
      setStatus("success");
    }, 800);
  };

  if (status === "success") {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-stone-800 bg-stone-900/50 p-10 text-center">
        <CheckCircle2 className="h-10 w-10 text-rose-400" />
        <h3 className="font-display mt-4 text-lg font-semibold text-stone-50">Message ready to send</h3>
        <p className="mt-2 text-sm text-stone-400">
          Your email app should have opened with everything filled in — just hit send.
        </p>
        <button
          onClick={() => { setStatus("idle"); setForm({ name: "", email: "", subject: "", message: "" }); }}
          className="mt-6 cursor-pointer text-sm font-medium text-orange-300 hover:text-orange-200"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5 rounded-2xl border border-stone-800 bg-stone-900/50 p-6 sm:p-8">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <FieldLabel htmlFor="c-name" required>Name</FieldLabel>
          <input id="c-name" type="text" value={form.name} onChange={(e) => update("name", e.target.value)}
            className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors" placeholder="Your name"
            aria-invalid={!!errors.name} />
          <FieldError>{errors.name}</FieldError>
        </div>
        <div>
          <FieldLabel htmlFor="c-email" required>Email</FieldLabel>
          <input id="c-email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)}
            className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors" placeholder="you@email.com"
            aria-invalid={!!errors.email} />
          <FieldError>{errors.email}</FieldError>
        </div>
      </div>
      <div>
        <FieldLabel htmlFor="c-subject" required>Subject</FieldLabel>
        <input id="c-subject" type="text" value={form.subject} onChange={(e) => update("subject", e.target.value)}
          className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors" placeholder="What's this about?"
          aria-invalid={!!errors.subject} />
        <FieldError>{errors.subject}</FieldError>
      </div>
      <div>
        <FieldLabel htmlFor="c-message" required>Message</FieldLabel>
        <textarea id="c-message" rows={4} value={form.message} onChange={(e) => update("message", e.target.value)}
          className="w-full resize-none rounded-xl px-4 py-3 text-sm outline-none transition-colors" placeholder="Write your message…"
          aria-invalid={!!errors.message} />
        <FieldError>{errors.message}</FieldError>
      </div>
      <PrimaryButton type="submit" className="w-full sm:w-auto" icon={status === "loading" ? Loader2 : Send}>
        {status === "loading" ? "Sending…" : "Send Message"}
      </PrimaryButton>
    </form>
  );
};

const Contact = () => (
  <section id="contact" className="relative py-24 sm:py-32 border-t border-stone-800/60">
    <div className="glow-blob pointer-events-none absolute bottom-0 left-1/3 -z-10 h-72 w-72 rounded-full bg-amber-500" />
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <SectionHeading eyebrow="// 10 — contact" title="Let's build your website" desc="Reach out directly, or send a message below — whichever's easier for you." center />

      <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <Reveal className="space-y-4">
          <ContactCard icon={MessageCircle} label="WhatsApp" value="0312 1634432" href={WHATSAPP_URL} />
          <ContactCard icon={Mail} label="Email" value={EMAIL_ADDRESS} href={`mailto:${EMAIL_ADDRESS}`} />
          <ContactCard icon={Linkedin} label="LinkedIn" value="linkedin.com/in/salmanahmad-tech" href={LINKEDIN_URL} />
          <ContactCard icon={Github} label="GitHub" value="github.com/salmanahmad5962-sketch" href={GITHUB_URL} />
        </Reveal>
        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </div>
  </section>
);

/* ============================================================
   FOOTER
   ============================================================ */

const Footer = ({ scrollTo }) => (
  <footer className="relative border-t border-stone-800/60 py-14">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div>
          <p className="font-mono text-lg font-semibold text-stone-50">
            <span className="text-orange-400">&lt;</span>SALMAN AHMAD<span className="text-orange-400"> /&gt;</span>
          </p>
          <p className="mt-1.5 text-sm text-stone-500">Web Developer • Software Developer</p>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {NAV_LINKS.map((l) => (
            <button key={l.id} onClick={() => scrollTo(l.id)} className="cursor-pointer text-sm text-stone-400 hover:text-stone-100 transition-colors">
              {l.label}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          {[
            { icon: MessageCircle, href: WHATSAPP_URL, label: "WhatsApp" },
            { icon: Mail, href: `mailto:${EMAIL_ADDRESS}`, label: "Email" },
            { icon: Linkedin, href: LINKEDIN_URL, label: "LinkedIn" },
            { icon: Github, href: GITHUB_URL, label: "GitHub" },
          ].map((s) => (
            <a
              key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-stone-800 text-stone-400 transition-colors duration-200 hover:border-stone-600 hover:text-stone-100 cursor-pointer"
            >
              <s.icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      <div className="mt-10 border-t border-stone-800/60 pt-6 text-center text-xs text-stone-600">
        © 2026 Salman Ahmad. All rights reserved.
      </div>
    </div>
  </footer>
);

/* ============================================================
   APP
   ============================================================ */

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const sectionIds = useMemo(() => ["home", "services", "how-it-works", "brief", "portfolio", "about", "contact"], []);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveSection((prev) => {
              if (id === "brief") return prev === "how-it-works" || prev === "portfolio" ? "how-it-works" : prev;
              return sectionIds.includes(id) ? id : prev;
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sectionIds]);

  return (
    <div className="sa-root min-h-screen">
      <GlobalStyles />
      <ParticleBackground />
      <Nav activeSection={activeSection} scrollTo={scrollTo} />
      <main>
        <Hero scrollTo={scrollTo} />
        <Services />
        <HowItWorks scrollTo={scrollTo} />
        <ProjectBrief />
        <Portfolio />
        <About />
        <WhyWorkWithMe />
        <Technologies />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer scrollTo={scrollTo} />
    </div>
  );
}
