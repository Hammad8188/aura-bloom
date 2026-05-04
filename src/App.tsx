import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import {
  Code2, Blocks, Server, Mail, Phone, MapPin, Github, Linkedin, ChevronDown, Cpu, Globe, Shield, Database, Terminal, FileCode, Vote, ShoppingCart, Award, GraduationCap, Languages, Sparkles, ArrowRight
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

/* ─────────────── DATA ─────────────── */

const experiences = [
  {
    role: "Backend Developer",
    company: "SAT Software House",
    location: "Swabi, Pakistan",
    period: "Nov 2025 – Present",
    icon: Server,
    points: [
      "Architected backend services in Node.js & Express.js supporting 3 role-based modules for the HIRE Expert platform.",
      "Engineered modular REST APIs with JWT auth and RBAC, maintaining 100% uptime across all integrations.",
      "Structured MongoDB schemas and middleware, reducing API response errors by 40%.",
      "Collaborated with frontend teams to define API contracts and accelerate feature delivery by 30%."
    ]
  },
  {
    role: "Blockchain Developer Intern",
    company: "Octaloop Technologies",
    location: "Lahore, Pakistan",
    period: "Jun 2024 – Aug 2024",
    icon: Blocks,
    points: [
      "Developed and deployed 4 Solidity smart contracts on Ethereum testnets covering token, escrow, and voting use cases.",
      "Co-built 2 internal blockchain tools integrating ethers.js and Web3.js with Node.js backends.",
      "Authored and validated Solidity contracts in Hardhat; reduced bugs by 50% via Mocha & Chai unit tests."
    ]
  }
];

const projects = [
  {
    name: "Qryptum Blockchain",
    tagline: "Proof of Data (PoD) Consensus",
    period: "Jan 2024 – May 2024",
    icon: Cpu,
    tech: ["Solidity", "Lattice Cryptography", "AI Validation", "DRC-20", "Node.js"],
    points: [
      "Designed a next-gen blockchain with a novel PoD consensus, processing verification 3x faster than PoW.",
      "Engineered quantum-resistant security via lattice-based cryptographic primitives.",
      "Introduced DRC-20 Data Contracts enabling 100% on-chain data integrity with AI-driven validation."
    ]
  },
  {
    name: "NFT Marketplace",
    tagline: "Auction & Direct Sales Platform",
    period: "Oct 2023 – Dec 2023",
    icon: ShoppingCart,
    tech: ["Solidity", "ERC-721", "ethers.js", "Node.js", "Express.js", "MetaMask"],
    points: [
      "Built a decentralised NFT marketplace supporting auction and direct sales with 50+ concurrent listings.",
      "Streamlined ownership transfers via gas-optimised ERC-721 contracts, cutting costs by 25%.",
      "Delivered a React.js frontend with MetaMask integration, reducing onboarding to under 2 minutes."
    ]
  },
  {
    name: "Escrow Marketplace",
    tagline: "Decentralised Escrow Smart Contracts",
    period: "Aug 2023 – Sep 2023",
    icon: Shield,
    tech: ["Solidity", "Hardhat", "JavaScript", "Node.js", "Mocha", "Chai"],
    points: [
      "Deployed a trustless P2P escrow marketplace with zero intermediaries for buyers and sellers.",
      "Developed on-chain dispute-safe fund-release flows covering 5 edge-case scenarios.",
      "Wrote 15+ Hardhat deployment scripts and unit tests achieving 90%+ code coverage."
    ]
  },
  {
    name: "Decentralised Voting System",
    tagline: "Final Year Project",
    period: "Jan 2024 – Jun 2024",
    icon: Vote,
    tech: ["Solidity", "Web3.js", "React.js", "Truffle", "Ganache", "Node.js"],
    points: [
      "Designed a tamper-proof voting system on Ethereum registering 100+ test voters with zero discrepancies.",
      "Smart contracts manage voter registration, ballot casting, and automated tallying across 3 categories.",
      "Built a React.js & Web3.js frontend delivering real-time updates with <500ms latency."
    ]
  },
  {
    name: "ERC-20 Token Contract",
    tagline: "Custom Token with Advanced Features",
    period: "Jul 2023 – Aug 2023",
    icon: FileCode,
    tech: ["Solidity", "OpenZeppelin", "Hardhat"],
    points: [
      "Deployed a production-ready ERC-20 token with minting, burning, and pausable functionality.",
      "Extended OpenZeppelin with 3 custom access roles and enforced RBAC through 10+ test scenarios."
    ]
  },
  {
    name: "BSC Smart Contract Dashboard",
    tagline: "Blockchain & REST API Integration",
    period: "May 2023 – Jun 2023",
    icon: Database,
    tech: ["Node.js", "Express.js", "ethers.js", "BscScan API"],
    points: [
      "Built a REST API fetching live smart contract deployment data from BSC, processing 200+ calls/session.",
      "Engineered error handling and rate-limit management, reducing failed requests by 60%."
    ]
  }
];

const skillCategories = [
  {
    title: "Blockchain",
    icon: Blocks,
    skills: ["Solidity", "Smart Contracts", "Ethereum", "BSC", "ERC-20", "ERC-721", "DeFi", "NFT", "OpenZeppelin", "ethers.js", "Web3.js", "Hardhat", "Truffle", "Ganache", "MetaMask"]
  },
  {
    title: "Backend",
    icon: Server,
    skills: ["Node.js", "Express.js", "REST API", "MongoDB", "Mongoose", "JWT Auth", "RBAC", "Middleware"]
  },
  {
    title: "Frontend",
    icon: Code2,
    skills: ["React.js", "HTML", "CSS", "JavaScript", "TypeScript", "Tailwind CSS"]
  },
  {
    title: "Tools & Testing",
    icon: Terminal,
    skills: ["Git", "GitHub", "Postman", "Mocha", "Chai", "VS Code", "npm", "Hardhat"]
  }
];

const education = {
  degree: "Bachelor of Science in Software Engineering",
  school: "Islamia College University, Peshawar",
  period: "Sep 2020 – Aug 2024",
  coursework: "Data Structures & Algorithms, Cryptography, Distributed Systems, Database Systems, Web Engineering, OOP, Software Project Management"
};

const languages = [
  { name: "English", level: "Professional Working Proficiency" },
  { name: "Urdu", level: "Native Proficiency" },
  { name: "Pashto", level: "Native Proficiency" }
];

const contact = {
  phone: "+92 339 0017132",
  email: "me.hammadkhan.dev@gmail.com",
  linkedin: "linkedin.com/in/hammadkhan63100",
  github: "github.com/hammad63100",
  location: "Islamabad, Pakistan"
};

const heroImageUrl =
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80";

const heroStats = [
  { value: "6+", label: "Smart contracts" },
  { value: "3+", label: "REST APIs" },
  { value: "90%+", label: "Test coverage" }
];

const heroTechStack = ["Solidity", "Node.js", "Express", "MongoDB", "Web3"];

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
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
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
    { icon: Shield, title: "Secure", detail: "Audited flows", className: "-left-3 top-12" },
    { icon: Database, title: "Backend", detail: "API ready", className: "-right-2 top-1/2" },
    { icon: Blocks, title: "Web3", detail: "On-chain logic", className: "left-8 -bottom-5" }
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
            <p><span className="text-primary">status</span> contracts verified</p>
            <p><span className="text-primary">api</span> latency below 500ms</p>
            <p><span className="text-primary">chain</span> data integrity enabled</p>
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
            HK.
          </button>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            {["About", "Experience", "Projects", "Skills", "Contact"].map((item) => (
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
            <a href={`https://${contact.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <Github className="w-5 h-5" />
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
              Building secure Web3 systems with
              <span className="gradient-text"> production-grade backend logic</span>
            </motion.h1>

            <motion.p
              className="mb-4 text-lg font-medium text-foreground/90 md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Blockchain Developer | Smart Contract Engineer | Backend Developer
            </motion.p>

            <motion.p
              className="mx-auto mb-8 max-w-2xl text-muted-foreground/85 leading-relaxed lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              I design Solidity contracts, role-based APIs, and scalable Node.js services that move from prototype to production with clear architecture and strong reliability.
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
              <Button variant="ghost" className="text-muted-foreground hover:text-primary" asChild>
                <a href={`https://${contact.github}`} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
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
                    Results-driven <strong className="text-foreground">Blockchain Developer</strong> and <strong className="text-foreground">Backend Developer</strong> with a Bachelor of Science in Software Engineering from Islamia College University, Peshawar (2024).
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Delivered <span className="text-primary font-medium">6+ production-grade Solidity smart contracts</span> on Ethereum and Binance Smart Chain covering DeFi, NFT, ERC-20, ERC-721, and escrow use cases. Built <span className="text-primary font-medium">3+ scalable REST APIs</span> using Node.js and Express.js, serving multi-role platforms with thousands of potential users.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Proficient in the full Web3 development stack including ethers.js, Web3.js, Hardhat, Truffle, Ganache, OpenZeppelin, and MetaMask. Seeking a Blockchain or Backend Developer role to contribute to innovative Web3 projects.
                  </p>

                  <div className="flex flex-wrap gap-2 mt-6">
                    {["Immediate Availability", "Open to Remote", "Relocation Possible"].map((tag) => (
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
            <SectionTitle icon={Cpu}>Technical Skills</SectionTitle>
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

          {/* Education & Languages */}
          <motion.div
            className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={itemFadeIn}>
              <Card className="gradient-border hover-lift">
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
              <Card className="gradient-border hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Languages className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Languages</h3>
                  </div>
                  <div className="space-y-3">
                    {languages.map((lang) => (
                      <div key={lang.name} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{lang.name}</span>
                        <Badge variant="secondary" className="text-xs bg-secondary/60">{lang.level}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
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
                    I'm currently open to new opportunities in Blockchain and Backend Development. Whether you have a project in mind or just want to connect, feel free to reach out.
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
                      <a href={`https://${contact.github}`} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
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
          <p>© {new Date().getFullYear()} Hammad Khan. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href={`https://${contact.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <Github className="w-5 h-5" />
            </a>
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
