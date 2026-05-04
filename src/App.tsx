import "./App.css";

const experiences = [
  {
    role: "Backend Developer",
    company: "SAT Software House, Swabi, Pakistan",
    period: "November 2025 – Present",
    points: [
      "Architected and delivered backend services in Node.js and Express.js supporting 3 distinct role-based modules (Customer, Seller, Admin) for the HIRE Expert platform.",
      "Engineered modular REST APIs with JWT authentication and role-based access control (RBAC), maintaining 100% uptime across all panel integrations.",
      "Structured MongoDB schema and middleware pipeline, reducing API response errors by 40% through robust input validation and error handling.",
      "Collaborated cross-functionally with front-end teams to define API contracts and accelerate feature delivery by 30% through clear interface documentation."
    ]
  },
  {
    role: "Blockchain Developer Intern",
    company: "Octaloop Technologies, Lahore, Pakistan",
    period: "June 2024 – August 2024",
    points: [
      "Developed and deployed 4 Solidity smart contracts on Ethereum testnets within a 3-month internship, covering token, escrow, and voting use cases.",
      "Co-built 2 internal blockchain tools integrating ethers.js and Web3.js with Node.js backends at a specialist Blockchain and AI solutions firm.",
      "Authored and validated Solidity smart contracts in Hardhat; reduced bug count by 50% through unit test coverage using Mocha and Chai."
    ]
  }
];

const projects = [
  {
    name: "Qryptum Blockchain – Proof of Data (PoD) Consensus",
    period: "January 2024 – May 2024",
    tech: "Solidity, Lattice-Based Cryptography, AI Validation, DRC-20 Smart Contracts, Node.js",
    points: [
      "Designed a next-generation blockchain using a novel Proof of Data (PoD) consensus mechanism, processing data verification 3x faster than standard Proof of Work.",
      "Engineered quantum-resistant security via lattice-based cryptographic primitives, reducing theoretical attack surface by eliminating elliptic-curve vulnerabilities.",
      "Introduced DRC-20 Data Contracts enabling 100% on-chain data transaction integrity with AI-driven validation across all network nodes."
    ]
  },
  {
    name: "NFT Marketplace – Auction and Direct Sales Platform",
    period: "October 2023 – December 2023",
    tech: "Solidity, ERC-721, ethers.js, Node.js, Express.js, MetaMask",
    points: [
      "Built a full-featured decentralised NFT marketplace supporting both auction and direct sales, handling 50+ concurrent listings in local testing.",
      "Streamlined ownership transfers and royalty flows via gas-optimised ERC-721 smart contracts, cutting average transaction cost by 25% versus baseline.",
      "Delivered a React.js front-end with seamless MetaMask wallet integration, reducing user onboarding time to under 2 minutes."
    ]
  },
  {
    name: "Escrow Marketplace – Decentralised Escrow Smart Contracts",
    period: "August 2023 – September 2023",
    tech: "Solidity, Hardhat, JavaScript, Node.js, Mocha, Chai, Git",
    points: [
      "Deployed a decentralised escrow marketplace enabling trustless peer-to-peer transactions for 2 user roles (buyer and seller) with zero intermediary.",
      "Developed on-chain dispute-safe fund-release flows, covering 5 edge-case transaction scenarios through automated unit tests.",
      "Wrote 15+ Hardhat deployment scripts and unit tests, achieving 90%+ contract code coverage before testnet deployment."
    ]
  },
  {
    name: "Decentralised Voting System – Final Year Project",
    period: "January 2024 – June 2024",
    tech: "Solidity, Web3.js, React.js, Truffle, Ganache, Node.js, Express.js",
    points: [
      "Designed a tamper-proof, transparent voting system on the Ethereum blockchain, successfully registering 100+ test voters with zero data discrepancies.",
      "Smart contracts manage voter registration, ballot casting, and automated result tallying across 3 candidate categories with full on-chain auditability.",
      "Built a React.js and Web3.js front-end delivering real-time vote count updates with under 500ms latency on a local Ganache network."
    ]
  },
  {
    name: "ERC-20 Token Contract – Custom Token with Advanced Features",
    period: "July 2023 – August 2023",
    tech: "Solidity, OpenZeppelin ERC-20, Hardhat",
    points: [
      "Deployed a production-ready ERC-20 token with minting, burning, and pausable functionality, extending the OpenZeppelin library with 3 custom access roles.",
      "Enforced role-based access control (RBAC) for secure token management, preventing unauthorised minting through 10+ unit test scenarios."
    ]
  },
  {
    name: "Blockchain and REST API Integration – BSC Smart Contract Dashboard",
    period: "May 2023 – June 2023",
    tech: "Node.js, Express.js, ethers.js, BscScan API",
    points: [
      "Built a REST API fetching and displaying live smart contract deployment data from Binance Smart Chain (BSC), processing 200+ API calls per session.",
      "Engineered robust error handling and rate-limit management, reducing failed API requests by 60% compared to the initial prototype."
    ]
  }
];

export default function App() {
  return (
    <div className="portfolio">
      <header className="hero section">
        <p className="eyebrow">Blockchain Developer | Smart Contract Developer | Backend Developer</p>
        <h1>HAMMAD KHAN</h1>
        <p className="summary">
          Results-driven Blockchain Developer and Backend Developer with a Bachelor of Science in Software Engineering from Islamia College University, Peshawar (2024). Delivered 6+ production-grade Solidity smart contracts on Ethereum and Binance Smart Chain covering DeFi, NFT, ERC-20, ERC-721, and escrow use cases. Built 3+ scalable REST APIs using Node.js and Express.js, serving multi-role platforms with thousands of potential users. Proficient in the full Web3 development stack including ethers.js, Web3.js, Hardhat, Truffle, Ganache, OpenZeppelin, and MetaMask. Seeking a Blockchain or Backend Developer role in the ecosystem to contribute to innovative Web3 projects.
        </p>
        <div className="contact-grid">
          <span>Phone: +92 339 0017132</span><span>Email: me.hammadkhan.dev@gmail.com</span>
          <span>LinkedIn: linkedin.com/in/hammadkhan63100</span><span>GitHub: github.com/hammad63100</span>
          <span>Location: Islamabad, Pakistan</span><span>Nationality: Pakistani</span>
          <span>Availability: Immediate</span>
        </div>
      </header>

      <section className="section">
        <h2>Work Experience</h2>
        {experiences.map((exp) => (
          <article className="card" key={exp.role}>
            <h3>{exp.role}</h3>
            <p className="meta">{exp.company} • {exp.period}</p>
            <ul>{exp.points.map((p) => <li key={p}>{p}</li>)}</ul>
          </article>
        ))}
      </section>

      <section className="section">
        <h2>Projects</h2>
        {projects.map((project) => (
          <article className="card" key={project.name}>
            <h3>{project.name}</h3>
            <p className="meta">{project.period}</p>
            <p className="tech">Technologies: {project.tech}</p>
            <ul>{project.points.map((p) => <li key={p}>{p}</li>)}</ul>
          </article>
        ))}
      </section>

      <section className="section split">
        <article className="card">
          <h2>Technical Skills</h2>
          <p><strong>Blockchain Development:</strong> Solidity, Smart Contracts, Ethereum, Binance Smart Chain (BSC), ERC-20, ERC-721, ERC-1155, DeFi, NFT, Decentralised Applications (DApps), OpenZeppelin, ethers.js, Web3.js, Hardhat, Truffle, Ganache, MetaMask, Token Development, On-Chain Data Validation</p>
          <p><strong>Backend Development:</strong> Node.js, Express.js, REST API Design, MongoDB, Mongoose ODM, JWT Authentication, Role-Based Access Control (RBAC), Middleware Development, API Integration, JSON</p>
          <p><strong>Frontend Development:</strong> HTML, CSS, JavaScript</p>
          <p><strong>Testing and Tools:</strong> Hardhat, Truffle, Ganache, Mocha, Chai, Postman, Git, GitHub, Visual Studio Code, npm, Microsoft Office Suite</p>
        </article>

        <article className="card">
          <h2>Education</h2>
          <p className="meta">Bachelor of Science in Software Engineering • August 2024</p>
          <p>Islamia College University, Peshawar, Pakistan • September 2020 – August 2024</p>
          <p>Relevant Coursework: Data Structures and Algorithms, Cryptography, Distributed Systems, Database Systems, Web Engineering, Object-Oriented Programming, Software Project Management</p>

          <h2 className="subhead">Languages</h2>
          <ul>
            <li>English – Professional Working Proficiency</li>
            <li>Urdu – Native Proficiency</li>
            <li>Pashto – Native Proficiency</li>
          </ul>
        </article>
      </section>

      <section className="section">
        <article className="card">
          <h2>Portfolio Management Tips</h2>
          <ul>
            <li>Update project metrics and deployment outcomes monthly to keep achievements current.</li>
            <li>Keep GitHub repositories and LinkedIn links active and aligned with the projects listed here.</li>
            <li>Use this page as your live portfolio URL and export it as PDF from the browser for job applications.</li>
          </ul>
        </article>
      </section>
    </div>
  );
}
