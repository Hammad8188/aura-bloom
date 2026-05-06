import { useEffect, useMemo, useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  Code2, Globe, Mail, Phone, MapPin, Linkedin, Monitor, ExternalLink, Layers, Brush, FileText, ShoppingCart, Award, GraduationCap, ArrowRight, BadgeCheck, Terminal, Download, ArrowUpRight, ArrowLeft, ArrowDown, Grid2X2, List
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
    category: "Business",
    period: "2025",
    icon: Globe,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1400&q=80",
    summary: "A responsive service website with clear service pages, quick WhatsApp contact, and mobile-first navigation.",
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
    category: "E-commerce",
    period: "2025",
    icon: ShoppingCart,
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1400&q=80",
    summary: "A WooCommerce storefront shaped around structured product browsing, responsive layouts, and smoother shopping flow.",
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
    category: "Healthcare",
    period: "2025",
    icon: Monitor,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd6d6fd0d?auto=format&fit=crop&w=1400&q=80",
    summary: "A clean healthcare site focused on patient readability, service discovery, accessibility, and responsive structure.",
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
    category: "E-commerce",
    period: "2025",
    icon: ShoppingCart,
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1400&q=80",
    summary: "An electronics commerce experience with organized product listings, custom layouts, and practical UI enhancements.",
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
    category: "Service Sites",
    period: "2025",
    icon: Layers,
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1400&q=80",
    summary: "A modern Elementor service site tuned for clear presentation, fast browsing, and cross-device polish.",
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
    <motion.div className="flex items-center gap-4 mb-12" variants={itemFadeIn}>
      {Icon && <Icon className="w-5 h-5 text-primary" />}
      <h2 className="font-serif text-3xl md:text-4xl text-foreground">{children}</h2>
      <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent ml-4" />
    </motion.div>
  );
}

function SkillsView({ onNavigateHome }: { onNavigateHome: (id: string) => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent ${scrolled ? "bg-background/80 backdrop-blur-xl border-border/50 py-4" : "bg-transparent py-6"}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex items-center justify-between h-20">
          <button onClick={() => onNavigateHome("hero")} className="font-bold text-lg tracking-tight">
            SMI.
          </button>
          <div className="hidden md:flex items-center gap-8">
            {["About", "Experience", "Projects", "Skills", "Education", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => onNavigateHome(item.toLowerCase())}
                className="label-caps text-muted-foreground hover:text-foreground transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
          <Button onClick={() => onNavigateHome("contact")} className="bg-primary text-primary-foreground hover:bg-primary/90 label-caps">
            Get in Touch
          </Button>
        </div>
      </motion.nav>

      <main>
        {/* Hero Section */}
        <section className="mx-auto max-w-[1440px] px-4 pb-16 pt-36 md:px-8 md:pb-24 md:pt-44 relative border-b border-border/60">
          <button
            onClick={() => onNavigateHome("skills")}
            className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </button>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 relative z-10">
              <motion.h1 
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="font-serif text-5xl leading-[1.1] text-primary mb-8 md:text-7xl tracking-tight"
              >
                Engineering Digital<br/>Excellence.
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                className="text-lg text-muted-foreground max-w-2xl leading-relaxed"
              >
                Specialized web solutions crafted for high-performance, scalability, and uncompromising aesthetic quality. I don't just build websites; I engineer robust digital architectures.
              </motion.p>
            </div>
          </div>
          <div className="absolute right-0 top-0 w-1/3 h-full border-l border-border/60 opacity-20 pointer-events-none hidden lg:block"></div>
        </section>

        {/* Services Grid */}
        <section className="mx-auto max-w-[1440px] px-4 py-20 md:px-8 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-border/60">
            {skillCategories.map((category, index) => {
              const isLastRow = index >= skillCategories.length - (skillCategories.length % 2 === 0 ? 2 : 1);
              const isEven = index % 2 === 0;
              
              let desc = "";
              if (category.title === "Frontend Development") desc = "Building responsive, accessible, and performant user interfaces using modern web technologies. Strong foundation in semantic HTML, CSS architecture, and vanilla JavaScript alongside React.js.";
              if (category.title === "CMS & Page Builders") desc = "Deep expertise in WordPress ecosystem, including theme customization, plugin management, Elementor, and WooCommerce.";
              if (category.title === "Design & Tools") desc = "Crafting clean UI/UX with Figma, Canva, and VS Code. SEO-aware and performance-focused workflows.";
              if (category.title === "Office & Productivity") desc = "Proficient in Microsoft Office suite and modern version control with Git and GitHub for collaborative development.";

              return (
                <div key={category.title} className={`p-8 md:p-12 ${!isLastRow ? 'border-b border-border/60' : ''} ${isEven ? 'md:border-r border-border/60' : ''} border-b md:border-b-0 bg-card/10 hover:bg-card/40 transition-colors duration-300 group`}>
                  <div className="mb-8">
                    <category.icon className="w-12 h-12 text-primary/70 group-hover:text-primary transition-colors" />
                  </div>
                  <h2 className="font-serif text-3xl text-primary mb-4">{category.title}</h2>
                  <p className="text-base text-muted-foreground mb-8 leading-relaxed">
                    {desc}
                  </p>
                  <div className="border-t border-border/60 pt-6">
                    <span className="label-caps text-muted-foreground block mb-4">Technologies & Tools</span>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map(s => (
                        <span key={s} className="bg-secondary/40 text-foreground text-xs font-medium py-1.5 px-3 border border-border/60">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 md:px-8 max-w-[1440px] mx-auto border-t border-border/60 text-center">
          <h2 className="font-serif text-4xl text-primary mb-8">Ready to architect your digital presence?</h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Discuss your project requirements with technical experts who understand the nuances of high-end digital execution.
          </p>
          <button onClick={() => onNavigateHome("contact")} className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground label-caps transition-colors hover:bg-primary/90">
            Initiate Project
          </button>
        </section>
      </main>

      <footer className="w-full border-t border-border/60 bg-card/30 px-4 py-16 md:px-8">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 text-lg font-bold tracking-tighter text-foreground">SMI.</div>
            <p className="label-caps text-muted-foreground">
              © {new Date().getFullYear()} Sahibzada Muhammad Ikhtisham. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap items-start gap-8 md:col-span-3 md:justify-end">
            {["Home", "Projects", "Skills", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => onNavigateHome(item === "Home" ? "hero" : item.toLowerCase())}
                className="label-caps text-muted-foreground transition-colors hover:text-primary"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

function AllWorkView({ onNavigateHome }: { onNavigateHome: (id: string) => void }) {
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = useMemo(
    () => ["All Projects", ...Array.from(new Set(projects.map((project) => project.category)))],
    []
  );

  const filteredProjects = useMemo(
    () =>
      activeCategory === "All Projects"
        ? projects
        : projects.filter((project) => project.category === activeCategory),
    [activeCategory]
  );

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent ${scrolled ? "bg-background/80 backdrop-blur-xl border-border/50 py-4" : "bg-transparent py-6"}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex items-center justify-between h-20">
          <button onClick={() => onNavigateHome("hero")} className="font-bold text-lg tracking-tight">
            SMI.
          </button>
          <div className="hidden md:flex items-center gap-8">
            {["About", "Experience", "Projects", "Skills", "Education", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => onNavigateHome(item.toLowerCase())}
                className="label-caps text-muted-foreground hover:text-foreground transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
          <Button onClick={() => onNavigateHome("contact")} className="bg-primary text-primary-foreground hover:bg-primary/90 label-caps">
            Get in Touch
          </Button>
        </div>
      </motion.nav>

      <main>
        <section className="mx-auto max-w-[1440px] border-b border-border/60 px-4 pb-16 pt-36 md:px-8 md:pb-24 md:pt-44">
          <button
            onClick={() => onNavigateHome("projects")}
            className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to portfolio
          </button>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <p className="label-caps mb-5 text-primary">Complete Project Archive</p>
            <h1 className="font-serif text-5xl leading-tight text-foreground md:text-7xl">
              Selected Works
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              A complete collection of WordPress, WooCommerce, and responsive web projects built with practical UI detail, performance awareness, and clear user journeys.
            </p>
          </motion.div>
        </section>

        <section className="mx-auto flex max-w-[1440px] flex-col gap-6 border-b border-border/60 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const isActive = category === activeCategory;

              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`label-caps border px-4 py-3 transition-colors ${
                    isActive
                      ? "border-primary text-primary"
                      : "border-border/70 text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <span className="label-caps">View</span>
            <button
              onClick={() => setViewMode("grid")}
              aria-pressed={viewMode === "grid"}
              aria-label="Show projects in grid view"
              className={`transition-colors hover:text-primary ${viewMode === "grid" ? "text-primary" : ""}`}
            >
              <Grid2X2 className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              aria-pressed={viewMode === "list"}
              aria-label="Show projects in list view"
              className={`transition-colors hover:text-primary ${viewMode === "list" ? "text-primary" : ""}`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-4 py-20 md:px-8 md:py-28">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 gap-x-8 gap-y-20 md:grid-cols-2">
              {filteredProjects.map((project, i) => (
                <motion.article
                  key={project.name}
                  custom={i}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  className={`group cursor-pointer ${i % 2 === 1 ? "md:mt-24" : ""}`}
                >
                  <div className="relative mb-6 aspect-[4/3] overflow-hidden border border-border/70 bg-card">
                    <img
                      src={project.image}
                      alt={`${project.name} project visual`}
                      className="h-full w-full object-cover opacity-75 grayscale transition-all duration-500 group-hover:scale-[1.02] group-hover:grayscale-0 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-background/45 transition-colors duration-300 group-hover:bg-background/10" />
                    <span className="label-caps absolute left-4 top-4 bg-primary px-3 py-2 text-primary-foreground">
                      {project.category}
                    </span>
                  </div>
                  <div className="flex flex-col gap-3 border-t border-border/70 pt-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="label-caps mb-2 text-muted-foreground">{project.period}</p>
                        <h2 className="font-serif text-2xl text-foreground md:text-3xl">{project.name}</h2>
                      </div>
                      <ArrowUpRight className="mt-2 h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span key={tech} className="label-caps bg-secondary/70 px-2 py-1 text-muted-foreground">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                      {project.summary}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="divide-y divide-border/70 border-y border-border/70">
              {filteredProjects.map((project, i) => (
                <motion.article
                  key={project.name}
                  custom={i}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  className="group grid gap-6 py-8 md:grid-cols-[320px_1fr] md:items-center"
                >
                  <div className="relative aspect-[4/3] overflow-hidden border border-border/70 bg-card">
                    <img
                      src={project.image}
                      alt={`${project.name} project visual`}
                      className="h-full w-full object-cover opacity-70 grayscale transition-all duration-500 group-hover:scale-[1.02] group-hover:grayscale-0 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-background/40 transition-colors duration-300 group-hover:bg-background/10" />
                  </div>
                  <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-start">
                    <div>
                      <p className="label-caps mb-3 text-primary">{project.category} / {project.period}</p>
                      <h2 className="font-serif text-2xl text-foreground md:text-3xl">{project.name}</h2>
                      <p className="mt-3 max-w-3xl text-muted-foreground">{project.summary}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span key={tech} className="label-caps bg-secondary/70 px-2 py-1 text-muted-foreground">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ArrowUpRight className="hidden h-6 w-6 text-muted-foreground transition-colors group-hover:text-primary md:block" />
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          <div className="mt-20 flex flex-col items-center justify-center gap-4 text-center">
            <p className="label-caps text-muted-foreground">
              Showing {filteredProjects.length} of {projects.length} projects
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-2 border border-border/70 px-8 py-4 text-foreground transition-colors hover:bg-card label-caps"
            >
              Back to Top
              <ArrowDown className="h-4 w-4 rotate-180" />
            </button>
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-border/60 bg-card/30 px-4 py-16 md:px-8">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 text-lg font-bold tracking-tighter text-foreground">SMI.</div>
            <p className="label-caps text-muted-foreground">
              © {new Date().getFullYear()} Sahibzada Muhammad Ikhtisham. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap items-start gap-8 md:col-span-3 md:justify-end">
            {["Home", "Projects", "Skills", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => onNavigateHome(item === "Home" ? "hero" : item.toLowerCase())}
                className="label-caps text-muted-foreground transition-colors hover:text-primary"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}



/* ─────────────── MAIN APP ─────────────── */

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [showAllWork, setShowAllWork] = useState(false);
  const [showSkills, setShowSkills] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const openAllWork = () => {
    setShowAllWork(true);
    setShowSkills(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openSkills = () => {
    setShowSkills(true);
    setShowAllWork(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateHome = (id: string) => {
    if (id === "skills") {
      openSkills();
      return;
    }
    setShowAllWork(false);
    setShowSkills(false);
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  if (showAllWork) {
    return <AllWorkView onNavigateHome={navigateHome} />;
  }

  if (showSkills) {
    return <SkillsView onNavigateHome={navigateHome} />;
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* ─── NAVBAR ─── */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent ${scrolled ? "bg-background/80 backdrop-blur-xl border-border/50 py-4" : "bg-transparent py-6"}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex items-center justify-between h-20">
          <button onClick={() => scrollTo("hero")} className="font-bold text-lg tracking-tight">
            SMI.
          </button>
          <div className="hidden md:flex items-center gap-8">
            {["About", "Experience", "Projects", "Skills", "Education", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => item === "Skills" ? openSkills() : scrollTo(item.toLowerCase())}
                className="label-caps text-muted-foreground hover:text-foreground transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
          <Button onClick={() => scrollTo("contact")} className="bg-primary text-primary-foreground hover:bg-primary/90 label-caps">
            Get in Touch
          </Button>
        </div>
      </motion.nav>

      {/* ─── HERO ─── */}
      <section id="hero" className="relative px-4 md:px-6 min-h-screen flex items-center justify-center pt-20 pb-20 section-border overflow-hidden">
        {/* Background Animation */}
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

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center gap-8">
          <motion.h1
            className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.1] tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Building modern responsive websites with <span className="text-primary">pixel-perfect design</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Front-End Developer | WordPress Developer | UI/UX Designer. I design and develop modern, responsive websites using HTML, CSS, JavaScript, and WordPress.
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button onClick={() => scrollTo("projects")} className="bg-primary text-primary-foreground hover:bg-primary/90 label-caps py-6 px-8">
              View Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={() => scrollTo("contact")} className="border-border/60 text-foreground hover:bg-card label-caps py-6 px-8">
              Contact Me
            </Button>
            <Button variant="outline" className="border-border/60 text-foreground hover:bg-card label-caps py-6 px-8" asChild>
              <a href="/assets/Sahibzada.CV.pdf" download>
                <Download className="mr-2 h-4 w-4" /> Download CV
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="py-24 px-4 md:px-6 section-border">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <SectionTitle icon={Globe}>About Me</SectionTitle>
            <motion.div variants={itemFadeIn}>
              <Card className="border border-border/50 bg-card/40">
                <CardContent className="p-8 md:p-10">
                  <p className="text-muted-foreground leading-relaxed text-lg mb-4">
                    Dedicated and detail-oriented <strong className="text-foreground">Front-End Developer</strong> and <strong className="text-foreground">WordPress Developer</strong> with practical experience in designing, developing, and maintaining modern, responsive websites.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Skilled in <span className="text-primary font-medium">HTML, CSS, JavaScript</span>, and WordPress customization, including theme configuration and page-building tools such as Elementor. Demonstrates strong problem-solving abilities, a commitment to high-quality code, and the capacity to deliver reliable web solutions.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Adaptable, organized, and focused on continuous professional development within the field of web technologies. Seeking a Front-End or WordPress Developer role to contribute to innovative web projects.
                  </p>

                  <div className="flex flex-wrap gap-2 mt-8">
                    {["Immediate Availability", "Relocation Possible"].map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary border-primary/20 label-caps">
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
      <section id="experience" className="py-24 px-4 md:px-6 section-border">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <SectionTitle icon={Award}>Work Experience</SectionTitle>
            <div className="space-y-8">
              {experiences.map((exp, i) => (
                <motion.div key={exp.role} custom={i} variants={fadeInUp}>
                  <Card className="border border-border/50 bg-card/40">
                    <CardContent className="p-8">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                            <exp.icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-foreground">{exp.role}</h3>
                            <p className="text-sm text-muted-foreground">{exp.company} — {exp.location}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 w-fit label-caps">
                          {exp.period}
                        </Badge>
                      </div>
                      <ul className="space-y-3">
                        {exp.points.map((point) => (
                          <li key={point} className="flex items-start gap-3 text-muted-foreground text-sm leading-relaxed">
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
      <section id="projects" className="py-24 px-4 md:px-6 section-border">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <div className="flex justify-between items-end mb-16">
              <div className="flex items-center gap-4">
                <Terminal className="w-5 h-5 text-primary" />
                <h2 className="font-serif text-3xl md:text-4xl text-foreground">Featured Projects</h2>
              </div>
              <button
                onClick={openAllWork}
                className="label-caps text-primary hover:text-foreground transition-colors cursor-pointer flex items-center gap-2"
              >
                All Work <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {projects.map((project, i) => (
                <motion.div key={project.name} custom={i} variants={fadeInUp} className={`group cursor-pointer ${i % 2 === 1 ? 'md:mt-24' : ''}`}>
                  <div className="project-visual mb-6 flex items-center justify-center">
                    <project.icon className="project-icon" />
                  </div>
                  <div className="border-t border-border pt-4 flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-serif text-2xl text-foreground mb-2">{project.name}</h3>
                      <p className="text-sm text-muted-foreground">{project.tech.join(' / ')}</p>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <ul className="space-y-2">
                    {project.points.slice(0, 3).map((p) => (
                      <li key={p} className="flex items-start gap-2 text-muted-foreground text-sm leading-relaxed">
                        <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SKILLS ─── */}
      <section id="skills" className="py-24 px-4 md:px-6 section-border">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <div className="flex justify-between items-end mb-16">
              <div className="flex items-center gap-4">
              <Code2 className="w-5 h-5 text-primary" />
              <h2 className="font-serif text-3xl md:text-4xl text-foreground">Core Competencies</h2>
              </div>
              <button
                onClick={openSkills}
                className="label-caps text-primary hover:text-foreground transition-colors cursor-pointer flex items-center gap-2"
              >
                Detailed Skills <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Frontend - large */}
              <motion.div className="md:col-span-8 bento-card min-h-[320px]" variants={itemFadeIn}>
                <div>
                  <Code2 className="w-8 h-8 text-primary mb-6" />
                  <h3 className="font-serif text-2xl text-foreground mb-4">Frontend Development</h3>
                  <p className="text-muted-foreground leading-relaxed max-w-xl">
                    Building responsive, accessible, and performant user interfaces using modern web technologies. Strong foundation in semantic HTML, CSS architecture, and vanilla JavaScript alongside React.js.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 mt-8">
                  {skillCategories[0].skills.map(s => (
                    <span key={s} className="bg-secondary/40 text-foreground text-xs font-medium py-2 px-4 border border-border/60">{s}</span>
                  ))}
                </div>
              </motion.div>

              {/* CMS - small */}
              <motion.div className="md:col-span-4 bento-card" variants={itemFadeIn}>
                <div>
                  <Globe className="w-6 h-6 text-primary mb-6" />
                  <h3 className="font-serif text-xl text-foreground mb-4">CMS & Page Builders</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Deep expertise in WordPress ecosystem, including theme customization, plugin management, Elementor, and WooCommerce.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-6">
                  {skillCategories[1].skills.slice(0, 4).map(s => (
                    <span key={s} className="bg-secondary/40 text-foreground text-xs font-medium py-1.5 px-3 border border-border/60">{s}</span>
                  ))}
                </div>
              </motion.div>

              {/* Design - small */}
              <motion.div className="md:col-span-4 bento-card" variants={itemFadeIn}>
                <div>
                  <Brush className="w-6 h-6 text-primary mb-6" />
                  <h3 className="font-serif text-xl text-foreground mb-4">Design & Tools</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Crafting clean UI/UX with Figma, Canva, and VS Code. SEO-aware and performance-focused workflows.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-6">
                  {skillCategories[2].skills.slice(0, 4).map(s => (
                    <span key={s} className="bg-secondary/40 text-foreground text-xs font-medium py-1.5 px-3 border border-border/60">{s}</span>
                  ))}
                </div>
              </motion.div>

              {/* Office - large */}
              <motion.div className="md:col-span-8 border border-border/50 bg-card/40 p-8 md:p-10 flex items-center justify-between min-h-[200px]" variants={itemFadeIn}>
                <div className="max-w-md">
                  <h3 className="font-serif text-xl text-foreground mb-4">Office & Productivity</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Proficient in Microsoft Office suite and modern version control with Git and GitHub for collaborative development.
                  </p>
                </div>
                <FileText className="w-12 h-12 text-border/80 opacity-50" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── EDUCATION & CERTIFICATIONS ─── */}
      <section id="education" className="py-24 px-4 md:px-6 section-border">
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
                <Card className="border border-border/50 bg-card/40 h-full">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <GraduationCap className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold text-foreground">Education</h3>
                    </div>
                    <p className="font-medium text-foreground">{education.degree}</p>
                    <p className="text-sm text-muted-foreground mb-1">{education.school}</p>
                    <p className="text-sm text-muted-foreground mb-4">{education.period}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      <span className="text-primary font-medium">Coursework:</span> {education.coursework}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemFadeIn}>
                <Card className="border border-border/50 bg-card/40 h-full">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <BadgeCheck className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold text-foreground">Certifications</h3>
                    </div>
                    <div className="space-y-4">
                      {certifications.map((cert) => (
                        <div key={cert.title} className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-medium text-foreground leading-tight">{cert.title}</p>
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
                <Card className="border border-border/50 bg-card/40 h-full">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <Globe className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold text-foreground">Languages</h3>
                    </div>
                    <div className="space-y-4">
                      {languages.map((language) => (
                        <div key={language.name} className="flex items-start justify-between gap-3">
                          <span className="text-sm font-medium text-foreground">{language.name}</span>
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
      <section id="contact" className="py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <SectionTitle icon={Mail}>Get In Touch</SectionTitle>
            <motion.div variants={itemFadeIn}>
              <Card className="border border-border/50 bg-card/40">
                <CardContent className="p-10 md:p-16 text-center">
                  <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-4">Let's Build Something Together</h3>
                  <p className="text-muted-foreground max-w-lg mx-auto mb-10 leading-relaxed">
                    I'm currently open to new opportunities in Front-End and WordPress Development. Whether you have a project in mind or just want to connect, feel free to reach out.
                  </p>

                  <div className="flex flex-wrap justify-center gap-4 mb-10">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 label-caps py-6 px-8" asChild>
                      <a href={`mailto:${contact.email}`}>
                        <Mail className="w-4 h-4 mr-2" />
                        Email Me
                      </a>
                    </Button>
                    <Button variant="outline" className="border-border/60 text-foreground hover:bg-card label-caps py-6 px-8" asChild>
                      <a href={`https://${contact.linkedin}`} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="w-4 h-4 mr-2" />
                        LinkedIn
                      </a>
                    </Button>
                    <Button variant="outline" className="border-border/60 text-foreground hover:bg-card label-caps py-6 px-8" asChild>
                      <a href="/assets/Sahibzada.CV.pdf" download>
                        <Download className="w-4 h-4 mr-2" />
                        Download CV
                      </a>
                    </Button>
                  </div>

                  <Separator className="my-8 bg-border/40" />

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
      <footer className="w-full bg-background border-t border-border/40 py-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="font-bold text-lg tracking-tighter text-foreground mb-4">SMI.</div>
            <p className="text-muted-foreground text-sm opacity-80">
              © {new Date().getFullYear()} Sahibzada Muhammad Ikhtisham. All rights reserved.
            </p>
          </div>
          <div className="md:col-span-3 flex md:justify-end items-end">
            <ul className="flex flex-wrap gap-8 label-caps text-muted-foreground">
              <li><a href={`https://${contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">LinkedIn</a></li>
              <li><a href={`mailto:${contact.email}`} className="hover:text-foreground transition-colors">Email</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
