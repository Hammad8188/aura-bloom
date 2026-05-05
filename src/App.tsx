import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import {
  Code2, Globe, Mail, Phone, MapPin, Linkedin, ChevronDown, Monitor, Smartphone, ExternalLink, Layers, Brush, FileText, ShoppingCart, Award, GraduationCap, Sparkles, ArrowRight, BadgeCheck, Terminal, Download
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

/* ─────────────── DATA ─────────────── */

const experiences = [
  {
    role: "Web Developer",
    company: "SAT Software House and Institute",
    location: "Swabi, Pakistan",
    period: "Oct 2025 – Present",
    icon: Globe,
    points: [
      "Develop responsive and user-friendly web interfaces using HTML, CSS, and JavaScript.",
      "Build, customize, and maintain WordPress websites, themes, and plugins.",
      "Use Elementor and other page builders to design visually appealing layouts.",
      "Convert UI/UX designs into fully functional web pages.",
      "Optimize website performance, loading speed, and SEO structure.",
      "Ensure cross-browser and cross-device compatibility.",
      "Troubleshoot and fix bugs, errors, and layout issues.",
      "Perform regular website maintenance, security updates, and backups."
    ]
  },
  {
    role: "Internee – PSEB IT Industry Internship",
    company: "Pakistan Software Export Board (PSEB) – SAT Impact Solutions",
    location: "Swabi, Pakistan",
    period: "Oct 2025 – Present",
    icon: Award,
    points: [
      "Selected for a competitive national IT internship program.",
      "Completed a structured 6-month internship in a software/IT environment.",
      "Gained hands-on experience in web development, software tools, and workplace processes."
    ]
  }
];

const projects = [
  {
    name: "Khor Khuwair Pest Control Website",
    tagline: "Business Website with WhatsApp Integration",
    period: "2025",
    icon: Globe,
    tech: ["WordPress", "Elementor", "HTML", "CSS", "WhatsApp API"],
    points: [
      "Designed and developed a responsive business website using WordPress and Elementor.",
      "Implemented custom HTML/CSS for UI enhancement and layout customization.",
      "Integrated WhatsApp API/Chat feature to improve customer communication.",
      "Structured service pages with clear navigation for improved User Experience (UX).",
      "Optimized for mobile responsiveness, accessibility, and performance."
    ]
  },
  {
    name: "ClenchX Sports E-commerce Website",
    tagline: "WooCommerce Sports Store",
    period: "2025",
    icon: ShoppingCart,
    tech: ["WordPress", "WooCommerce", "Elementor", "Responsive Design"],
    points: [
      "Built an e-commerce platform using WordPress (WooCommerce) and Elementor.",
      "Designed structured product pages, categories, and navigation system.",
      "Applied responsive design principles for seamless mobile experience.",
      "Enhanced UI using custom styling and layout improvements.",
      "Improved user journey for product browsing and interaction."
    ]
  },
  {
    name: "Jamal Medical Center Website",
    tagline: "Healthcare Website",
    period: "2025",
    icon: Monitor,
    tech: ["WordPress", "Responsive Design", "Accessibility"],
    points: [
      "Designed and developed a healthcare website using WordPress.",
      "Structured pages for medical services, departments, and contact information.",
      "Created a clean and accessible layout for improved patient usability.",
      "Ensured responsive design across all devices.",
      "Focused on readability, accessibility, and clear information delivery."
    ]
  },
  {
    name: "Ideal Tech Hub E-commerce Website",
    tagline: "Electronics E-commerce Store",
    period: "2025",
    icon: ShoppingCart,
    tech: ["WordPress", "WooCommerce", "Custom Layouts", "UI Enhancements"],
    points: [
      "Developed a responsive e-commerce website using WordPress and WooCommerce.",
      "Created organized product listings for electronics and computer accessories.",
      "Implemented custom layouts and UI enhancements.",
      "Ensured mobile optimization and smooth navigation.",
      "Focused on usability, performance, and a user-friendly shopping experience."
    ]
  },
  {
    name: "The Home Techie Website",
    tagline: "Service Presentation Website",
    period: "2025",
    icon: Layers,
    tech: ["WordPress", "Elementor", "CSS", "Performance"],
    points: [
      "Developed a modern website using WordPress and Elementor.",
      "Designed an intuitive and clean UI/UX for effective service presentation.",
      "Customized layouts using Elementor and CSS.",
      "Ensured cross-browser and cross-device compatibility.",
      "Focused on performance optimization and fast loading speed."
    ]
  }
];

const skillCategories = [
  {
    title: "Frontend Development",
    icon: Code2,
    skills: ["HTML5", "CSS3", "JavaScript", "React.js", "Responsive Design", "Cross-Browser Compatibility"]
  },
  {
    title: "CMS & Page Builders",
    icon: Globe,
    skills: ["WordPress", "Elementor", "WooCommerce", "Theme Customization", "Plugin Management", "Page Builders"]
  },
  {
    title: "Design & Tools",
    icon: Brush,
    skills: ["VS Code", "Canva", "Figma", "UI/UX Design", "SEO", "Performance Optimization"]
  },
  {
    title: "Office & Productivity",
    icon: FileText,
    skills: ["Microsoft Excel", "Microsoft Word", "Microsoft PowerPoint", "Git", "GitHub"]
  }
];

const education = {
  degree: "Bachelor of Computer Science (Software)",
  school: "Abdul Wali Khan University Mardan",
  period: "Sep 2020 – Jul 2024",
  coursework: "Software and applications development and analysis, EQF Level 6"
};

const languages = [
  { name: "Pashto", level: "Native Proficiency" },
  { name: "English", level: "C2 (Listening/Reading), C1 (Speaking/Writing)" },
  { name: "Urdu", level: "C2 (Understanding/Speaking), C1 (Writing)" }
];

const contact = {
  phone: "+92 345 2477020",
  email: "s.m.ikhtisham@gmail.com",
  linkedin: "www.linkedin.com/in/sahibzada-muhammad-ikhtisham-99292628a/",
  location: "Islamabad, Pakistan"
};

const heroImageUrl =
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80";

const heroStats = [
  { value: "5+", label: "Websites built" },
  { value: "6+", label: "Months experience" },
  { value: "100%", label: "Client satisfaction" }
];

const heroTechStack = ["HTML5", "CSS3", "JavaScript", "WordPress", "React.js"];

const certifications = [
  {
    title: "HTML and CSS in depth",
    provider: "Coursera",
    date: "Aug 2023",
    link: "https://coursera.org/verify/X329HFVFHAEC"
  },
  {
    title: "Design, Format, and Presentation in Microsoft PowerPoint",
    provider: "Coursera",
    date: "Aug 2023",
    link: "https://coursera.org/verify/SB692M5BPT4V"
  },
  {
    title: "IELTS Listening and Speaking Sections Skills Mastery",
    provider: "Coursera",
    date: "Aug 2023",
    link: "https://coursera.org/verify/ET5PNY3NYEDX"
  }
];

/* ─────────────── ANIMATION VARIANTS ─────────────── */

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" }
  })
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 }
  }
};

const itemFadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

/* ─────────────── COMPONENTS ─────────────── */

function SectionTitle({ children, icon: Icon }: { children: React.ReactNode; icon?: React.ComponentType<{ className?: string }> }) {
  return (
    <motion.div
      className="flex items-center gap-3 mb-8"
      variants={itemFadeIn}
    >
      {Icon && <Icon className="w-6 h-6 text-primary" />}
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{children}</h2>
      <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent ml-4" />
    </motion.div>
  );
}

function HeroBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="hero-grid" />
      <motion.div
        className="hero-scanline top-28"
        animate={{ x: ["-30%", "120%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="hero-scanline bottom-32 opacity-40"
        animate={{ x: ["120%", "-30%"] }}
        transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-background via-background/70 to-transparent" />
    </div>
  );
}

function HeroVisual() {
  const floatingCards = [
    { icon: Smartphone, title: "Responsive", detail: "Mobile-first", className: "-left-3 top-12" },
    { icon: Globe, title: "WordPress", detail: "CMS expert", className: "-right-2 top-1/2" },
    { icon: Brush, title: "UI/UX", detail: "Pixel-perfect", className: "left-8 -bottom-5" }
  ];

  return (
    <motion.div
      className="relative mx-auto mt-12 w-full max-w-[500px] lg:mt-0 lg:ml-auto"
      initial={{ opacity: 0, x: 40, rotate: 1 }}
      animate={{ opacity: 1, x: 0, rotate: 0 }}
      transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
    >
      <motion.figure
        className="hero-photo-frame"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <img
          src={heroImageUrl}
          alt="Developer workstation with code on a laptop screen"
          className="h-full w-full object-cover"
        />
        <div className="hero-image-sheen" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-primary/10" />
        <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-white/10 bg-background/75 p-4 shadow-2xl backdrop-blur-md">
          <div className="mb-3 flex items-center gap-2 text-primary">
            <Terminal className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase">deploy.log</span>
          </div>
          <div className="space-y-2 font-mono text-xs text-muted-foreground">
            <p><span className="text-primary">status</span> WordPress build ready</p>
            <p><span className="text-primary">layout</span> responsive across devices</p>
            <p><span className="text-primary">seo</span> page structure optimized</p>
          </div>
        </div>
      </motion.figure>

      {floatingCards.map((card, index) => (
        <motion.div
          key={card.title}
          className={`hero-code-card hidden sm:flex ${card.className}`}
          initial={{ opacity: 0, y: 16, scale: 0.92 }}
          animate={{
            opacity: 1,
            y: [0, index % 2 === 0 ? -8 : 8, 0],
            scale: 1
          }}
          transition={{
            opacity: { duration: 0.4, delay: 0.9 + index * 0.12 },
            scale: { duration: 0.4, delay: 0.9 + index * 0.12 },
            y: { duration: 4 + index, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <card.icon className="h-4 w-4 text-primary" />
          <span>
            <strong>{card.title}</strong>
            <small>{card.detail}</small>
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ─────────────── MAIN APP ─────────────── */

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground noise-bg">
      {/* ─── NAVBAR ─── */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass py-3" : "bg-transparent py-5"}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="font-bold text-lg tracking-tight hover:text-primary transition-colors">
            SMI.
          </button>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            {["About", "Experience", "Projects", "Skills", "Education", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="hover:text-primary transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a href={`https://${contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </motion.nav>

      {/* ─── HERO ─── */}
      <section id="hero" ref={heroRef} className="relative min-h-screen overflow-hidden px-4 pb-20 pt-28 md:pt-32">
        <HeroBackdrop />

        <motion.div
          className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm font-medium border-primary/30 text-primary bg-primary/5 backdrop-blur">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                Available for hire
              </Badge>
            </motion.div>

            <motion.h1
              className="mb-5 text-4xl font-bold leading-tight md:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Building modern responsive websites with
              <span className="gradient-text"> pixel-perfect design</span>
            </motion.h1>

            <motion.p
              className="mb-4 text-lg font-medium text-foreground/90 md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Front-End Developer | WordPress Developer | UI/UX Designer
            </motion.p>

            <motion.p
              className="mx-auto mb-8 max-w-2xl text-muted-foreground/85 leading-relaxed lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              I design and develop modern, responsive websites using HTML, CSS, JavaScript, and WordPress. From UI/UX design to fully functional web pages, I deliver reliable web solutions with clean code and strong attention to detail.
            </motion.p>

            <motion.div
              className="mb-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button onClick={() => scrollTo("projects")} className="bg-primary text-primary-foreground hover:bg-primary/90 glow group">
                View Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" onClick={() => scrollTo("contact")} className="border-primary/30 hover:bg-primary/10 hover:text-primary">
                <Mail className="w-4 h-4 mr-2" />
                Contact Me
              </Button>
              <Button variant="outline" className="border-primary/30 hover:bg-primary/10 hover:text-primary" asChild>
                <a href="/assets/Sahibzada.CV.pdf" download>
                  <Download className="w-4 h-4 mr-2" />
                  Download CV
                </a>
              </Button>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 gap-3 sm:grid-cols-3"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {heroStats.map((stat) => (
                <motion.div key={stat.label} className="hero-metric-pill" variants={itemFadeIn}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.75 }}
            >
              {heroTechStack.map((tech) => (
                <Badge key={tech} variant="secondary" className="bg-secondary/70 text-foreground/85 border border-border/40">
                  {tech}
                </Badge>
              ))}
            </motion.div>
          </div>

          <HeroVisual />
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <SectionTitle icon={Globe}>About Me</SectionTitle>
            <motion.div variants={itemFadeIn}>
              <Card className="gradient-border hover-lift">
                <CardContent className="p-6 md:p-8">
                  <p className="text-muted-foreground leading-relaxed text-lg mb-4">
                    Dedicated and detail-oriented <strong className="text-foreground">Front-End Developer</strong> and <strong className="text-foreground">WordPress Developer</strong> with practical experience in designing, developing, and maintaining modern, responsive websites.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Skilled in <span className="text-primary font-medium">HTML, CSS, JavaScript</span>, and WordPress customization, including theme configuration and page-building tools such as Elementor. Demonstrates strong problem-solving abilities, a commitment to high-quality code, and the capacity to deliver reliable web solutions.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Adaptable, organized, and focused on continuous professional development within the field of web technologies. Seeking a Front-End or WordPress Developer role to contribute to innovative web projects.
                  </p>

                  <div className="flex flex-wrap gap-2 mt-6">
                    {["Immediate Availability", "Relocation Possible"].map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── EXPERIENCE ─── */}
      <section id="experience" className="py-24 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <SectionTitle icon={Award}>Work Experience</SectionTitle>
            <div className="space-y-6">
              {experiences.map((exp, i) => (
                <motion.div key={exp.role} custom={i} variants={fadeInUp}>
                  <Card className="gradient-border hover-lift">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <exp.icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{exp.role}</h3>
                            <p className="text-sm text-muted-foreground">{exp.company} — {exp.location}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 w-fit">
                          {exp.period}
                        </Badge>
                      </div>
                      <ul className="space-y-2 ml-1">
                        {exp.points.map((point) => (
                          <li key={point} className="flex items-start gap-2 text-muted-foreground text-sm leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── PROJECTS ─── */}
      <section id="projects" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <SectionTitle icon={Terminal}>Featured Projects</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, i) => (
                <motion.div key={project.name} custom={i} variants={fadeInUp}>
                  <Card className="gradient-border hover-lift h-full flex flex-col">
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <project.icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold leading-tight">{project.name}</h3>
                            <p className="text-xs text-muted-foreground">{project.tagline}</p>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-muted-foreground mb-3">{project.period}</p>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tech.slice(0, 5).map((t) => (
                          <Badge key={t} variant="secondary" className="text-[10px] bg-secondary/60">
                            {t}
                          </Badge>
                        ))}
                        {project.tech.length > 5 && (
                          <Badge variant="secondary" className="text-[10px] bg-secondary/60">+{project.tech.length - 5}</Badge>
                        )}
                      </div>

                      <ul className="space-y-2 mt-auto">
                        {project.points.map((p) => (
                          <li key={p} className="flex items-start gap-2 text-muted-foreground text-sm leading-relaxed">
                            <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SKILLS ─── */}
      <section id="skills" className="py-24 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <SectionTitle icon={Code2}>Technical Skills</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skillCategories.map((cat, i) => (
                <motion.div key={cat.title} custom={i} variants={fadeInUp}>
                  <Card className="gradient-border hover-lift h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                          <cat.icon className="w-4 h-4 text-primary" />
                        </div>
                        <h3 className="font-semibold">{cat.title}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {cat.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="border-primary/20 text-foreground bg-primary/5 hover:bg-primary/10 transition-colors">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── EDUCATION & CERTIFICATIONS ─── */}
      <section id="education" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <SectionTitle icon={GraduationCap}>Education & Certifications</SectionTitle>
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <motion.div variants={itemFadeIn}>
                <Card className="gradient-border hover-lift h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <GraduationCap className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold">Education</h3>
                    </div>
                    <p className="font-medium text-foreground">{education.degree}</p>
                    <p className="text-sm text-muted-foreground mb-1">{education.school}</p>
                    <p className="text-sm text-muted-foreground mb-3">{education.period}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      <span className="text-primary font-medium">Coursework:</span> {education.coursework}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemFadeIn}>
                <Card className="gradient-border hover-lift h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <BadgeCheck className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold">Certifications</h3>
                    </div>
                    <div className="space-y-3">
                      {certifications.map((cert) => (
                        <div key={cert.title} className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-sm font-medium leading-tight">{cert.title}</p>
                            <p className="text-xs text-muted-foreground">{cert.provider} · {cert.date}</p>
                          </div>
                          <a href={cert.link} target="_blank" rel="noopener noreferrer" className="shrink-0 hover:text-primary transition-colors">
                            <ExternalLink className="w-4 h-4 text-muted-foreground" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemFadeIn}>
                <Card className="gradient-border hover-lift h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Globe className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold">Languages</h3>
                    </div>
                    <div className="space-y-3">
                      {languages.map((language) => (
                        <div key={language.name} className="flex items-start justify-between gap-3">
                          <span className="text-sm font-medium">{language.name}</span>
                          <span className="text-right text-xs text-muted-foreground">{language.level}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <SectionTitle icon={Mail}>Get In Touch</SectionTitle>
            <motion.div variants={itemFadeIn}>
              <Card className="gradient-border glow">
                <CardContent className="p-8 md:p-12 text-center">
                  <h3 className="text-2xl font-bold mb-3">Let's Build Something Together</h3>
                  <p className="text-muted-foreground max-w-lg mx-auto mb-8">
                    I'm currently open to new opportunities in Front-End and WordPress Development. Whether you have a project in mind or just want to connect, feel free to reach out.
                  </p>

                  <div className="flex flex-wrap justify-center gap-4 mb-8">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 glow" asChild>
                      <a href={`mailto:${contact.email}`}>
                        <Mail className="w-4 h-4 mr-2" />
                        Email Me
                      </a>
                    </Button>
                    <Button variant="outline" className="border-primary/30 hover:bg-primary/10 hover:text-primary" asChild>
                      <a href={`https://${contact.linkedin}`} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="w-4 h-4 mr-2" />
                        LinkedIn
                      </a>
                    </Button>
                    <Button variant="outline" className="border-primary/30 hover:bg-primary/10 hover:text-primary" asChild>
                      <a href="/assets/Sahibzada.CV.pdf" download>
                        <Download className="w-4 h-4 mr-2" />
                        Download CV
                      </a>
                    </Button>
                  </div>

                  <Separator className="my-6 bg-border/50" />

                  <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-primary" />
                      <span>{contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{contact.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary" />
                      <span>{contact.email}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-8 px-4 border-t border-border/30">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Sahibzada Muhammad Ikhtisham. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href={`https://${contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href={`mailto:${contact.email}`} className="hover:text-primary transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
