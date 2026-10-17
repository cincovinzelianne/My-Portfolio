import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  Check,
  Code2,
  ExternalLink,
  Facebook,
  Github,
  Layers3,
  Maximize2,
  Mail,
  Menu,
  PenTool,
  Rocket,
  X,
} from "lucide-react";

const email = "cinco.vinzelianne@llcc.edu.ph";
const navigation = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Stack", href: "#stack" },
  { label: "Work", href: "#work" },
];
const skills = [
  { name: "HTML", logo: "/tech-logos/html5.svg", color: "#f97316" },
  { name: "CSS", logo: "/tech-logos/css3.svg", color: "#38bdf8" },
  { name: "JavaScript", logo: "/tech-logos/javascript.svg", color: "#facc15" },
  { name: "TypeScript", logo: "/tech-logos/typescript.svg", color: "#60a5fa" },
  { name: "React", logo: "/tech-logos/react.svg", color: "#38bdf8" },
  { name: "PHP", logo: "/tech-logos/php.svg", color: "#a78bfa" },
  { name: "Laravel", logo: "/tech-logos/laravel.svg", color: "#fb7185" },
  { name: "Node.js", logo: "/tech-logos/nodejs.svg", color: "#86efac" },
  { name: "MySQL", logo: "/tech-logos/mysql.svg", color: "#38bdf8" },
  { name: "PostgreSQL", logo: "/tech-logos/postgresql.svg", color: "#60a5fa" },
  { name: "Redis", logo: "/tech-logos/redis.svg", color: "#f87171" },
  { name: "Docker", logo: "/tech-logos/docker.svg", color: "#38bdf8" },
  { name: "Tailwind CSS", logo: "/tech-logos/tailwindcss.svg", color: "#22d3ee" },
  { name: "Bootstrap", logo: "/tech-logos/bootstrap.svg", color: "#c084fc" },
  { name: "MS Power Automate", logo: "/tech-logos/power-automate.png", color: "#818cf8" },
  { name: "Git", logo: "/tech-logos/git.svg", color: "#fb923c" },
  { name: "GitHub", logo: "/tech-logos/github.svg", color: "#f8fafc" },
  { name: "Supabase", logo: "/tech-logos/supabase.svg", color: "#4ade80" },
];
const services = [
  {
    number: "01",
    title: "Web design & development",
    description:
      "From a clear first impression to the details behind every click, I build custom websites that feel considered and work beautifully.",
    icon: PenTool,
  },
  {
    number: "02",
    title: "Responsive web experiences",
    description:
      "Thoughtful layouts and reliable interactions that make your website feel right on every screen, from desktop to mobile.",
    icon: Layers3,
  },
  {
    number: "03",
    title: "Ongoing support",
    description:
      "Practical updates, maintenance, and technical help to keep your site useful, up to date, and running smoothly.",
    icon: Rocket,
  },
];
const process = [
  ["01", "Understand", "We get clear on the audience, goals, and what success should look like."],
  ["02", "Shape", "I turn the brief into an approachable visual direction and a considered experience."],
  ["03", "Build", "I bring it to life with responsive, carefully crafted code and a polished finish."],
];
const socials = [
  {
    label: "GitHub",
    href: "https://github.com/cincovinzelianne",
    icon: Github,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/cinco.vinzelianne",
    icon: Facebook,
  },
];

gsap.registerPlugin(ScrollTrigger);

function Reveal({ children, className = "", ...attributes }) {
  return (
    <div className={`gsap-reveal ${className}`} {...attributes}>
      {children}
    </div>
  );
}

function SectionIntro({ eyebrow, title, description, dark = false, className = "" }) {
  return (
    <div className={`mb-12 max-w-2xl md:mb-16 ${dark ? "text-white" : ""} ${className}`}>
      <p className={`eyebrow mb-4 ${dark ? "text-lime" : ""}`}>{eyebrow}</p>
      <h2 className="font-display text-4xl font-bold leading-[1.1] tracking-[-0.055em] sm:text-5xl md:text-6xl">
        {title}
      </h2>
      <p className={`mt-5 max-w-xl text-base leading-7 md:text-lg ${dark ? "text-white/65" : "text-muted"}`}>
        {description}
      </p>
    </div>
  );
}

function TechStackCarousel() {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const activeRef = useRef(skills.length);
  const touchStartRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(skills.length);
  const [inView, setInView] = useState(false);
  const reduceMotion = useReducedMotion();
  const slides = [...skills, ...skills, ...skills];

  const getOffset = useCallback((index) => {
    const viewport = viewportRef.current;
    const card = trackRef.current?.querySelector(`[data-carousel-index="${index}"]`);
    if (!viewport || !card) return 0;
    return viewport.clientWidth / 2 - (card.offsetLeft + card.offsetWidth / 2);
  }, []);

  const moveTo = useCallback((index, instant = false) => {
    const track = trackRef.current;
    if (!track) return;
    activeRef.current = index;
    setActiveIndex(index);
    gsap.killTweensOf(track);
    gsap.to(track, {
      x: getOffset(index),
      duration: instant || reduceMotion ? 0 : 1.1,
      ease: "none",
      overwrite: true,
      onComplete: () => {
        const count = skills.length;
        const normalized = index < count ? index + count : index >= count * 2 ? index - count : index;
        if (normalized !== index) {
          gsap.set(track, { x: getOffset(normalized) });
          activeRef.current = normalized;
          setActiveIndex(normalized);
        }
      },
    });
  }, [getOffset, reduceMotion]);

  const step = useCallback((direction) => {
    const count = skills.length;
    let current = activeRef.current;

    if (direction > 0 && current >= count * 2 - 1) {
      current -= count;
      gsap.set(trackRef.current, { x: getOffset(current) });
      activeRef.current = current;
      setActiveIndex(current);
    } else if (direction < 0 && current <= count) {
      current += count;
      gsap.set(trackRef.current, { x: getOffset(current) });
      activeRef.current = current;
      setActiveIndex(current);
    }

    const next = current + direction;
    moveTo(next);
  }, [getOffset, moveTo]);

  function selectSlide(index) {
    const count = skills.length;
    const currentGroup = Math.floor(activeRef.current / count);
    let target = currentGroup * count + index;
    if (target - activeRef.current > count / 2) target -= count;
    if (activeRef.current - target > count / 2) target += count;
    while (target < 0) target += count;
    while (target >= count * 3) target -= count;
    moveTo(target);
  }

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return undefined;

    gsap.set(track, { x: getOffset(activeRef.current) });
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.12 },
    );
    observer.observe(viewport);
    const resize = () => gsap.set(track, { x: getOffset(activeRef.current) });
    window.addEventListener("resize", resize);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
      gsap.killTweensOf(track);
    };
  }, [getOffset]);

  useEffect(() => {
    if (!inView || reduceMotion) return undefined;
    step(1);
    const timer = window.setInterval(() => step(1), 1100);
    return () => window.clearInterval(timer);
  }, [inView, reduceMotion, step]);

  function handleKeyDown(event) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    }
  }

  return (
    <div className="tech-carousel relative">
      <div
        ref={viewportRef}
        className="tech-carousel-viewport"
        role="region"
        aria-label="Technology stack carousel"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onTouchStart={(event) => {
          touchStartRef.current = event.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          if (touchStartRef.current === null) return;
          const distance = event.changedTouches[0].clientX - touchStartRef.current;
          if (Math.abs(distance) > 44) step(distance < 0 ? 1 : -1);
          touchStartRef.current = null;
        }}
      >
        <div ref={trackRef} className="tech-carousel-track">
          {slides.map((technology, virtualIndex) => {
            const isActive = virtualIndex === activeIndex;
            const distance = Math.abs(virtualIndex - activeIndex);
            return (
              <button
                key={`${technology.name}-${virtualIndex}`}
                type="button"
                data-carousel-index={virtualIndex}
                aria-label={`${technology.name}${isActive ? ", current slide" : ", go to slide"}`}
                aria-current={isActive ? "true" : undefined}
                tabIndex={virtualIndex >= skills.length && virtualIndex < skills.length * 2 ? 0 : -1}
                onClick={() => selectSlide(virtualIndex % skills.length)}
                className={`tech-carousel-card group ${isActive ? "is-active" : ""}`}
                style={{
                  "--tech-accent": technology.color,
                  opacity: isActive ? 1 : Math.max(0.48, 1 - distance * 0.13),
                  transform: `scale(${isActive ? 1 : Math.max(0.88, 1 - distance * 0.035)})`,
                }}
              >
                <img className="tech-card-logo" src={technology.logo} alt={`${technology.name} logo`} draggable="false" />
                <span className="tech-card-name">{technology.name}</span>
                <span className="sr-only">Technology {virtualIndex % skills.length + 1} of {skills.length}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="tech-carousel-controls">
        <button
          type="button"
          className="tech-carousel-control"
          aria-label="Previous technology"
          onClick={() => step(-1)}
        >
          <ArrowRight className="rotate-180" size={17} />
        </button>
        <div className="tech-carousel-pagination" aria-live="polite">
          <span>{String(activeIndex % skills.length + 1).padStart(2, "0")}</span>
          <span className="tech-carousel-pagination-track"><span style={{ width: `${((activeIndex % skills.length + 1) / skills.length) * 100}%` }} /></span>
          <span>{String(skills.length).padStart(2, "0")}</span>
        </div>
        <button
          type="button"
          className="tech-carousel-control"
          aria-label="Next technology"
          onClick={() => step(1)}
        >
          <ArrowRight size={17} />
        </button>
      </div>
    </div>
  );
}

function App() {
  const appRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [activeSection, setActiveSection] = useState("home");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        const progress = appRef.current?.querySelector("[data-scroll-progress]");
        if (progress) {
          gsap.set(progress, { scaleX: 0, transformOrigin: "left center" });
          ScrollTrigger.create({
            start: 0,
            end: "max",
            onUpdate: (trigger) => gsap.set(progress, { scaleX: trigger.progress }),
          });
        }

        gsap.fromTo(
          gsap.utils.toArray(".gsap-hero-intro", appRef.current),
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.14,
            delay: 0.12,
            ease: "power3.out",
          },
        );

        gsap.fromTo(
          gsap.utils.toArray("[data-hero-line]", appRef.current),
          { yPercent: 115, autoAlpha: 0, filter: "blur(10px)" },
          {
            yPercent: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 1.1,
            stagger: 0.13,
            delay: 0.18,
            ease: "power4.out",
          },
        );

        const hero = appRef.current?.querySelector("#home");
        const portrait = appRef.current?.querySelector(".portrait-card");
        const heroOrb = appRef.current?.querySelector("[data-hero-orb]");
        if (hero && portrait && heroOrb) {
          const heroMotion = gsap.timeline({
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: 0.7,
            },
          });
          heroMotion
            .to(portrait, { yPercent: -13, rotation: 2.5, scale: 0.96, ease: "none" }, 0)
            .to(heroOrb, { yPercent: 35, xPercent: -12, scale: 1.18, ease: "none" }, 0);
        }

        gsap.utils
          .toArray(".gsap-reveal:not(.gsap-hero-intro):not(.gsap-pin)", appRef.current)
          .forEach((element) => {
            gsap.fromTo(
              element,
              { autoAlpha: 0, y: 38 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: element,
                  start: "top 88%",
                  toggleActions: "play none none reverse",
                },
              },
            );
          });

        const serviceCards = gsap.utils.toArray("[data-service-card]", appRef.current);
        if (serviceCards.length) {
          gsap.fromTo(
            serviceCards,
            { autoAlpha: 0, y: 70, rotateX: 9, transformPerspective: 900 },
            {
              autoAlpha: 1,
              y: 0,
              rotateX: 0,
              duration: 0.85,
              stagger: 0.16,
              ease: "power3.out",
              scrollTrigger: {
                trigger: serviceCards[0].parentElement,
                start: "top 78%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }

        const skillChips = gsap.utils.toArray("[data-carousel-intro]", appRef.current);
        if (skillChips.length) {
          gsap.fromTo(
            skillChips,
            { autoAlpha: 0, y: 36 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.75,
              ease: "power3.out",
              scrollTrigger: {
                trigger: "#stack",
                start: "top 68%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }

        const processSteps = gsap.utils.toArray("[data-process-step]", appRef.current);
        if (processSteps.length) {
          gsap.fromTo(
            processSteps,
            { autoAlpha: 0.3, x: 30 },
            {
              autoAlpha: 1,
              x: 0,
              duration: 0.55,
              stagger: 0.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: processSteps[0].parentElement,
                start: "top 78%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }

        const workSection = appRef.current?.querySelector("#work");
        const projectImage = appRef.current?.querySelector("[data-scroll-parallax]");
        if (projectImage && workSection) {
          gsap.fromTo(
            projectImage,
            { yPercent: 10, scale: 1.2, transformOrigin: "center center" },
            {
              yPercent: -10,
              scale: 1.08,
              ease: "none",
              scrollTrigger: {
                trigger: workSection,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            },
          );
          gsap.fromTo(
            projectImage.closest(".project-image"),
            { clipPath: "inset(8% 8% 8% 8% round 28px)" },
            {
              clipPath: "inset(0% 0% 0% 0% round 0px)",
              ease: "none",
              scrollTrigger: {
                trigger: workSection,
                start: "top 85%",
                end: "center center",
                scrub: 0.7,
              },
            },
          );
        }

        const featureTags = gsap.utils.toArray("[data-feature-tag]", appRef.current);
        if (featureTags.length && workSection) {
          gsap.fromTo(
            featureTags,
            { autoAlpha: 0, y: 16 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.35,
              stagger: 0.07,
              ease: "power2.out",
              scrollTrigger: {
                trigger: workSection,
                start: "top 55%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }

        const contactDecoration = appRef.current?.querySelector("[data-contact-decoration]");
        const contact = appRef.current?.querySelector("#contact");
        if (contactDecoration && contact) {
          gsap.to(contactDecoration, {
            rotation: 32,
            scale: 1.15,
            ease: "none",
            scrollTrigger: {
              trigger: contact,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        }

        media.add("(min-width: 1024px)", () => {
          const processCard = appRef.current?.querySelector("[data-process-card]");
          if (!processCard) return undefined;

          const pin = ScrollTrigger.create({
            trigger: processCard,
            start: "top 112px",
            end: () => `+=${Math.round(window.innerHeight * 0.65)}`,
            pin: processCard,
            pinSpacing: true,
            invalidateOnRefresh: true,
          });

          return () => pin.kill();
        });
      }, appRef.current);

      return () => context.revert();
    });

    return () => media.revert();
  }, []);

  useEffect(() => {
    const sections = ["home", "about", "services", "stack", "work", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!notice) return undefined;
    const timeout = window.setTimeout(() => setNotice(""), 3000);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  useEffect(() => {
    document.body.style.overflow = menuOpen || lightboxImage ? "hidden" : "";
    if (!menuOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const closeOnDesktop = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeOnDesktop);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeOnDesktop);
      document.body.style.overflow = "";
    };
  }, [lightboxImage, menuOpen]);

  useEffect(() => {
    if (!lightboxImage) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setLightboxImage(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [lightboxImage]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setNotice("Email address copied to clipboard.");
    } catch {
      setNotice("Copy unavailable — please email me directly.");
    }
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <div
      ref={appRef}
      className="min-h-screen overflow-hidden bg-paper text-ink selection:bg-lime selection:text-ink"
    >
      <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/[0.06] bg-paper/90 backdrop-blur-xl">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12"
        >
          <a
            href="#home"
            onClick={closeMenu}
            className="group flex items-center gap-3"
            aria-label="Vinze Lianne Cinco, home"
          >
            <img
              src="/pic/pic.jpeg"
              alt=""
              className="h-10 w-10 rounded-full object-cover object-[50%_22%] ring-2 ring-white transition-transform group-hover:rotate-[-8deg]"
            />
            <span className="leading-tight">
              <span className="block font-display text-sm font-extrabold tracking-[-0.03em]">
                Vinze Lianne Cinco
              </span>
              <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
                Developer & designer
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-6 lg:flex xl:gap-8">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`nav-link ${activeSection === item.href.slice(1) ? "nav-link-active" : ""}`}
              >
                {item.label}
              </a>
            ))}
            <a href={`mailto:${email}?subject=Let%E2%80%99s%20work%20together`} className="button-dark !min-h-11 !px-5">
              Let&apos;s talk <ArrowUpRight size={16} />
            </a>
          </div>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-line lg:hidden"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>
      {createPortal(
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-navigation"
              className="mobile-menu-panel fixed inset-x-0 bottom-0 top-[76px] z-[70] overflow-y-auto overscroll-contain bg-paper px-5 pb-8 pt-6 sm:px-8 lg:hidden"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
            >
              <nav aria-label="Mobile navigation" className="mx-auto flex min-h-full max-w-xl flex-col">
                <p className="eyebrow mb-4 px-1">Explore the portfolio</p>
                <div className="flex flex-col">
                  {navigation.map((item, index) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={closeMenu}
                      className={`mobile-nav-link flex min-h-[68px] items-center justify-between border-b border-line py-4 font-display text-[clamp(1.6rem,7vw,2.25rem)] font-bold tracking-[-0.055em] transition-colors hover:text-[#638747] ${
                        activeSection === item.href.slice(1) ? "text-[#638747]" : ""
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className="font-sans text-xs font-medium tracking-normal text-muted">0{index + 1}</span>
                    </a>
                  ))}
                </div>
                <a
                  href={`mailto:${email}`}
                  onClick={closeMenu}
                  className="button-dark mt-7 w-full"
                >
                  Start a conversation <ArrowUpRight size={17} />
                </a>
                <p className="mt-auto pt-8 text-center text-xs text-muted">
                  Thoughtful design. Solid code.
                </p>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
      <div
        aria-hidden="true"
        className="fixed inset-x-0 top-[76px] z-[60] h-[2px] origin-left bg-[#8fb65c]"
        data-scroll-progress
        style={{ transform: "scaleX(0)" }}
      />

      <main>
        <section
          id="home"
          className="hero-grid relative mx-auto grid min-h-[760px] max-w-7xl items-center gap-12 px-5 pb-20 pt-32 sm:px-8 md:min-h-[820px] md:grid-cols-[1.12fr_0.88fr] md:gap-8 md:pb-24 md:pt-32 lg:px-12"
        >
          <div
            data-hero-orb
            className="absolute -right-40 top-20 -z-0 h-[460px] w-[460px] rounded-full bg-moss/65 blur-[100px]"
          />
          <div className="relative z-10 max-w-2xl">
            <Reveal className="gsap-hero-intro">
              <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line bg-white/80 px-4 py-2 text-xs font-semibold tracking-wide text-muted shadow-sm">
                <span className="h-2 w-2 rounded-full bg-[#92c85b] shadow-[0_0_0_4px_rgba(146,200,91,0.15)]" />
                PORTFOLIO <span className="text-line">/</span> 2026
              </div>
              <h1 className="font-display text-[clamp(3.5rem,8vw,7.25rem)] font-extrabold leading-[0.91] tracking-[-0.085em]">
                <span className="hero-title-line"><span data-hero-line>Thoughtful</span></span>
                <span className="hero-title-line"><span data-hero-line>design.</span></span>
                <span className="hero-title-line relative w-fit">
                  <span data-hero-line className="relative z-10">Solid code.</span>
                  <span className="absolute bottom-[0.05em] left-0 -z-0 h-[0.22em] w-full -rotate-1 rounded-sm bg-lime" />
                </span>
              </h1>
              <p className="mt-8 max-w-lg text-lg leading-8 text-muted sm:text-xl">
                I&apos;m <strong className="font-semibold text-ink">Vinze Lianne Cinco</strong> —
                an aspiring full-stack developer and UI/UX designer creating digital experiences
                that feel as good as they work.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a href="#work" className="button-dark">
                  Explore my work <ArrowDownRight size={17} />
                </a>
                <a
                  href="/My%20Resume.pdf"
                  download="Vinze-Lianne-Cinco-Resume.pdf"
                  className="button-light"
                >
                  View résumé <ArrowDown size={16} />
                </a>
              </div>
              <div className="mt-10 flex items-center gap-4">
                <div className="flex -space-x-2">
                  {socials.map(({ label, href, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Visit my ${label} profile`}
                      className="grid h-10 w-10 place-items-center rounded-full border-[3px] border-paper bg-white text-ink transition hover:-translate-y-1 hover:bg-lime"
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                  <a
                    href={`mailto:${email}`}
                    aria-label="Email me"
                    className="grid h-10 w-10 place-items-center rounded-full border-[3px] border-paper bg-white text-ink transition hover:-translate-y-1 hover:bg-lime"
                  >
                    <Mail size={16} />
                  </a>
                </div>
                <span className="text-xs font-medium text-muted">A little internet, a lot of ideas.</span>
              </div>
            </Reveal>
          </div>

          <Reveal className="gsap-hero-intro relative z-10 mx-auto w-full max-w-[440px]">
            <div className="portrait-card relative mx-auto aspect-[0.83] max-h-[560px] overflow-hidden rounded-[42%_42%_28px_28px] bg-[#e7e9df] p-3 sm:rounded-[44%_44%_32px_32px]">
              <div className="absolute inset-3 overflow-hidden rounded-[42%_42%_22px_22px] sm:rounded-[44%_44%_26px_26px]">
                <img
                  src="/pic/pic.jpeg"
                  alt="Portrait of Vinze Lianne Cinco"
                  className="h-full w-full object-cover object-[50%_22%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-white/10" />
              </div>
              <div className="absolute left-0 top-[15%] grid h-12 w-12 place-items-center rounded-full bg-lime text-ink shadow-card sm:h-14 sm:w-14">
                <Asterisk size={27} strokeWidth={1.7} />
              </div>
              <div className="absolute -right-2 bottom-[20%] rounded-full border border-white/60 bg-white/85 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-ink shadow-card backdrop-blur-sm sm:right-0 sm:text-xs">
                Design · Develop · Deliver
              </div>
            </div>
            <div className="absolute -bottom-5 -left-3 rounded-2xl border border-white/80 bg-white/90 px-4 py-3 shadow-card backdrop-blur sm:-left-10 sm:px-5 sm:py-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted">My approach</p>
              <p className="mt-1 font-display text-sm font-bold tracking-tight sm:text-base">
                Curious by nature. <span className="text-[#638747]">Built with care.</span>
              </p>
            </div>
          </Reveal>
          <a
            href="#about"
            className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted transition hover:text-ink md:flex"
          >
            Scroll to explore <ArrowDown size={14} />
          </a>
        </section>

        <section id="about" className="relative scroll-mt-24 border-y border-line bg-white py-24 md:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 md:grid-cols-[0.75fr_1.25fr] md:gap-20 lg:px-12">
            <Reveal>
              <p className="eyebrow mb-4">A little about me</p>
              <h2 className="font-display text-4xl font-bold leading-tight tracking-[-0.06em] sm:text-5xl">
                Good work starts with <span className="text-[#739451]">good questions.</span>
              </h2>
            </Reveal>
            <Reveal>
              <p className="text-lg leading-8 text-muted">
                I enjoy bringing ideas to life on the web — thinking through how something should
                look, then building the details that make it useful. My focus is on clear design,
                responsive development, and making the experience feel effortless for the people
                using it.
              </p>
              <p className="mt-5 text-lg leading-8 text-muted">
                Whether it&apos;s a personal portfolio, a business website, or a custom web
                application, I bring curiosity, care, and a steady eye for the little things to
                every project.
              </p>
              <a
                href={`mailto:${email}?subject=Tell%20me%20about%20your%20work`}
                className="link-arrow mt-7"
              >
                A little more about what I do <ArrowRight size={17} />
              </a>
            </Reveal>
          </div>
        </section>

        <section id="services" className="scroll-mt-24 px-5 py-24 sm:px-8 md:py-32 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionIntro
                eyebrow="What I can help with"
                title={<>A good idea deserves a great digital home.</>}
                description="Custom, practical web solutions — thoughtfully designed around your goals, audience, and next steps."
              />
            </Reveal>
            <div className="grid gap-4 md:grid-cols-3">
              {services.map(({ number, title, description, icon: Icon }) => (
                <Reveal key={number}>
                  <article data-service-card className="service-card group flex h-full min-h-[278px] flex-col rounded-3xl border border-line bg-white p-7 transition duration-300 hover:-translate-y-1.5 hover:border-[#cad9c1] hover:shadow-card sm:p-8">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-xs font-bold tracking-[0.14em] text-muted/70">
                        {number}
                      </span>
                      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-moss/65 text-ink transition group-hover:rotate-[-7deg] group-hover:bg-lime">
                        <Icon size={20} strokeWidth={1.7} />
                      </span>
                    </div>
                    <h3 className="mt-8 font-display text-xl font-bold tracking-[-0.04em] sm:text-2xl">
                      {title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="stack" className="stack-section scroll-mt-24 bg-ink px-0 py-24 text-white sm:py-28 md:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionIntro
                eyebrow="Built with the right tools"
                title={<>Tech <span className="text-cyan-400">Stack</span></>}
                description="A growing toolkit for shaping thoughtful, high-performance digital experiences."
                dark
                className="mx-auto px-5 text-center sm:px-8"
              />
            </Reveal>
            <Reveal data-carousel-intro>
              <TechStackCarousel />
            </Reveal>
            <Reveal data-process-card className="gsap-pin mx-auto mt-16 max-w-2xl px-5 sm:px-8 md:mt-20">
              <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.055] p-7 sm:p-10">
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-lime/10 blur-3xl" />
                <div className="relative">
                  <div className="mb-8 flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-lime text-ink">
                      <Code2 size={20} />
                    </span>
                    <div>
                      <p className="text-sm font-bold">From idea to launch</p>
                      <p className="mt-1 text-xs text-white/50">A simple, collaborative process</p>
                    </div>
                  </div>
                  <div className="space-y-0">
                    {process.map(([number, title, description], index) => (
                      <div
                        key={number}
                        data-process-step
                        className={`grid grid-cols-[42px_1fr] gap-4 py-5 ${index < process.length - 1 ? "border-b border-white/10" : ""}`}
                      >
                        <span className="pt-0.5 text-xs font-semibold tracking-wider text-lime/80">
                          {number}
                        </span>
                        <div>
                          <h3 className="font-display text-base font-bold">{title}</h3>
                          <p className="mt-1.5 text-sm leading-6 text-white/55">{description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="work" className="scroll-mt-24 px-5 py-24 sm:px-8 md:py-32 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionIntro
                eyebrow="Selected work"
                title={<>Projects made to matter.</>}
                description="A selection of digital experiences built to make information more useful, connected, and accessible."
              />
            </Reveal>
            <Reveal>
              <article className="project-card overflow-hidden rounded-[28px] border border-line bg-white shadow-sm transition duration-300 hover:shadow-card md:grid md:grid-cols-[1.12fr_0.88fr]">
                <button
                  type="button"
                  className="project-image group relative block min-h-[280px] w-full cursor-zoom-in overflow-hidden bg-[#172f5f] text-left md:min-h-[470px]"
                  onClick={() => setLightboxImage({
                    src: "/pic/llcc_site.png",
                    alt: "Screenshot of the Lapu-Lapu City College website",
                    title: "Lapu-Lapu City College",
                  })}
                  aria-label="View full image: Lapu-Lapu City College website screenshot"
                >
                  <img
                    src="/pic/llcc_site.png"
                    alt="Screenshot of the Lapu-Lapu City College website"
                    className="absolute inset-0 h-full w-full scale-[1.12] object-cover object-top"
                    data-scroll-parallax
                    loading="lazy"
                  />
                  <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-ink/75 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-white backdrop-blur">
                    <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                    Live website
                  </span>
                  <span className="absolute bottom-5 right-5 grid h-12 w-12 place-items-center rounded-full bg-lime text-ink opacity-0 shadow-lg transition duration-300 group-hover:opacity-100">
                    <Maximize2 size={19} />
                  </span>
                </button>
                <div className="flex flex-col justify-center p-7 sm:p-10 md:p-12">
                  <div className="mb-7 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#739451]">
                    <span>Featured project</span>
                    <span className="h-px w-8 bg-[#c8d5c0]" />
                    <span>Education</span>
                  </div>
                  <h3 className="font-display text-3xl font-extrabold leading-tight tracking-[-0.06em] sm:text-4xl">
                    Lapu-Lapu City College
                  </h3>
                  <p className="mt-5 text-sm leading-7 text-muted sm:text-base">
                    An official college website that brings the institution&apos;s identity,
                    programs, campus life, and announcements together in one accessible digital
                    home.
                  </p>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {["Laravel", "MySQL", "Tailwind CSS", "React", "TypeScript"].map((tech) => (
                      <span
                        key={tech}
                        data-feature-tag
                        className="rounded-full bg-[#f0f3ed] px-3 py-1.5 text-[11px] font-semibold text-[#59645c]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href="https://llcc.edu.ph/"
                    target="_blank"
                    rel="noreferrer"
                    className="button-dark mt-9 self-start"
                  >
                    Visit live site <ExternalLink size={15} />
                  </a>
                </div>
              </article>
            </Reveal>
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <Reveal>
                <article className="project-card h-full overflow-hidden rounded-[28px] border border-line bg-white shadow-sm transition duration-300 hover:shadow-card">
                  <button
                    type="button"
                    className="group relative flex h-[300px] w-full cursor-zoom-in items-center justify-center overflow-hidden bg-[#f2f6fb] text-left sm:h-[360px]"
                    onClick={() => setLightboxImage({
                      src: "/project-images/clinic-inventory.png",
                      alt: "Clinic Inventory System dashboard showing clinic operations and stock monitoring",
                      title: "Clinic Inventory System",
                    })}
                    aria-label="View full image: Clinic Inventory System"
                  >
                    <img
                      src="/project-images/clinic-inventory.png"
                      alt="Clinic Inventory System dashboard showing clinic operations and stock monitoring"
                      className="h-full w-full object-contain"
                      loading="lazy"
                    />
                    <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/90 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#356bb5] shadow-sm backdrop-blur">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#4386df]" />
                      Ongoing development
                    </span>
                    <span className="absolute bottom-5 right-5 grid h-11 w-11 place-items-center rounded-full bg-white/95 text-ink opacity-0 shadow-lg transition duration-300 group-hover:opacity-100">
                      <Maximize2 size={18} />
                    </span>
                  </button>
                  <div className="p-7 sm:p-9">
                    <div className="mb-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#739451]">
                      <span>Featured project</span>
                      <span className="h-px w-8 bg-[#c8d5c0]" />
                      <span>Clinic operations</span>
                    </div>
                    <h3 className="font-display text-2xl font-extrabold leading-tight tracking-[-0.06em] sm:text-3xl">
                      Clinic Inventory System
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-muted">
                      A desktop application designed to digitize manual clinic logbooks and
                      streamline medicine inventory management. It features stock monitoring,
                      medicine batch and expiration tracking, employee ID-based medicine requests,
                      request history and frequency monitoring, and analytics to identify medicine
                      demand trends. The system aims to improve record accuracy, simplify clinic
                      operations, and support safer, more efficient inventory management.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {["C#", "ASP.NET Core", "React.js", "Tailwind CSS", "MySQL"].map((tech) => (
                        <span
                          key={tech}
                          data-feature-tag
                          className="rounded-full bg-[#f0f3ed] px-3 py-1.5 text-[11px] font-semibold text-[#59645c]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
              <Reveal>
                <article className="project-card h-full overflow-hidden rounded-[28px] border border-line bg-white shadow-sm transition duration-300 hover:shadow-card">
                  <button
                    type="button"
                    className="group relative flex h-[300px] w-full cursor-zoom-in items-center justify-center overflow-hidden bg-[#edf5fc] text-left sm:h-[360px]"
                    onClick={() => setLightboxImage({
                      src: "/project-images/knowles-connect.png",
                      alt: "Knowles Connect digital bulletin board displayed on a screen",
                      title: "Knowles Connect — Digital Interactive Bulletin Board",
                    })}
                    aria-label="View full image: Knowles Connect digital bulletin board"
                  >
                    <img
                      src="/project-images/knowles-connect.png"
                      alt="Knowles Connect digital bulletin board displayed on a screen"
                      className="h-full w-full object-contain"
                      loading="lazy"
                    />
                    <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/90 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#356bb5] shadow-sm backdrop-blur">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#4386df]" />
                      Developed during OJT
                    </span>
                    <span className="absolute bottom-5 right-5 grid h-11 w-11 place-items-center rounded-full bg-white/95 text-ink opacity-0 shadow-lg transition duration-300 group-hover:opacity-100">
                      <Maximize2 size={18} />
                    </span>
                  </button>
                  <div className="p-7 sm:p-9">
                    <div className="mb-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#739451]">
                      <span>Featured project</span>
                      <span className="h-px w-8 bg-[#c8d5c0]" />
                      <span>Digital workplace solution</span>
                    </div>
                    <h3 className="font-display text-2xl font-extrabold leading-tight tracking-[-0.06em] sm:text-3xl">
                      Knowles Connect
                      <span className="mt-1 block text-lg font-semibold tracking-[-0.03em] text-muted sm:text-xl">
                        Digital Interactive Bulletin Board
                      </span>
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-muted">
                      Knowles Connect was developed during my On-the-Job Training (OJT) at Knowles
                      Electronics Philippines to replace paper-based announcements with a
                      centralized, interactive display. It features dynamic content publishing and
                      real-time updates for company announcements, upcoming events, featured memos,
                      compensation and benefits (CompBen), and employee awards and recognition.
                      The system aims to improve workplace communication, streamline information
                      sharing, and give employees convenient access to important company updates.
                    </p>
                    <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                      Tech stack
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {["PHP", "Laravel", "React.js", "Custom CSS", "PostgreSQL via Supabase", "Docker", "Redis"].map((tech) => (
                        <span
                          key={tech}
                          data-feature-tag
                          className="rounded-full bg-[#f0f3ed] px-3 py-1.5 text-[11px] font-semibold text-[#59645c]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {["OJT project", "Knowles Electronics Philippines", "Digital workplace"].map((detail) => (
                        <span
                          key={detail}
                          data-feature-tag
                          className="rounded-full bg-[#f0f3ed] px-3 py-1.5 text-[11px] font-semibold text-[#59645c]"
                        >
                          {detail}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 px-5 pb-20 sm:px-8 md:pb-28 lg:px-12">
          <Reveal>
            <div className="contact-panel relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-lime px-7 py-14 sm:px-12 sm:py-16 md:px-16 md:py-20">
              <div className="absolute -right-20 -top-36 h-96 w-96 rounded-full border border-ink/[0.08]" />
              <div className="absolute -right-4 -top-20 h-64 w-64 rounded-full border border-ink/[0.08]" />
              <div className="relative z-10 max-w-3xl">
                <p className="eyebrow">Have a good one in mind?</p>
                <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.07em] sm:text-5xl md:text-7xl">
                  Let&apos;s make
                  <br className="hidden sm:block" /> something meaningful.
                </h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-ink/70 md:text-lg">
                  Have a project, a question, or just want to say hello? I&apos;d love to hear what
                  you&apos;re working on.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href={`mailto:${email}?subject=Let%E2%80%99s%20work%20together`} className="button-dark">
                    <Mail size={16} /> Send me an email <ArrowUpRight size={16} />
                  </a>
                  <button type="button" onClick={copyEmail} className="button-outline">
                    Copy email <span className="hidden sm:inline">address</span>
                  </button>
                </div>
              </div>
              <Asterisk data-contact-decoration className="absolute bottom-7 right-8 hidden rotate-12 text-ink/10 sm:block md:bottom-10 md:right-12" size={110} strokeWidth={1} />
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-line bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-7 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
          <a href="#home" className="font-display text-sm font-extrabold tracking-tight">
            Vinze Lianne Cinco<span className="text-[#739451]">.</span>
          </a>
          <p className="text-xs text-muted">© {new Date().getFullYear()} Vinze Lianne Cinco. Made with care.</p>
          <div className="flex items-center gap-4">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit my ${label} profile`}
                className="text-muted transition hover:text-ink"
              >
                <Icon size={17} />
              </a>
            ))}
            <a href={`mailto:${email}`} aria-label="Email me" className="text-muted transition hover:text-ink">
              <Mail size={17} />
            </a>
          </div>
        </div>
      </footer>

      {createPortal(
        <AnimatePresence>
          {lightboxImage && (
            <motion.div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-md sm:p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setLightboxImage(null)}
            >
              <motion.section
                role="dialog"
                aria-modal="true"
                aria-label={`Full image: ${lightboxImage.title}`}
                className="relative flex max-h-full w-full max-w-7xl flex-col items-center"
                initial={{ opacity: 0, scale: 0.97, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 8 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setLightboxImage(null)}
                  aria-label="Close full image"
                  className="absolute -top-3 right-0 z-10 grid h-11 w-11 translate-y-[-100%] place-items-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 sm:right-0"
                >
                  <X size={20} />
                </button>
                <img
                  src={lightboxImage.src}
                  alt={lightboxImage.alt}
                  className="max-h-[calc(100dvh-7rem)] max-w-full rounded-xl object-contain shadow-2xl"
                />
                <p className="mt-4 text-center text-sm font-medium text-white/80">
                  {lightboxImage.title}
                </p>
              </motion.section>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}

      <AnimatePresence>
        {notice && (
          <motion.div
            role="status"
            aria-live="polite"
            className="fixed bottom-5 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-white shadow-card"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
          >
            {notice.startsWith("Email") ? <Check size={16} className="text-lime" /> : <Mail size={16} className="text-lime" />}
            {notice}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
