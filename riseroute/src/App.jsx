import { useState, useEffect, useRef } from "react";

const ROLES = [
  {
    id: "swe",
    title: "Software Engineer",
    icon: "⚙️",
    color: "#00f5d4",
    shadow: "0 0 40px rgba(0,245,212,0.3)",
    desc: "Build robust systems, APIs & scalable software solutions",
    tags: ["C++", "Java", "DSA", "System Design"],
    playlists: [
      {
        title: "CS50 – Harvard's Intro to Computer Science",
        channel: "Harvard OpenCourseWare",
        url: "https://www.youtube.com/playlist?list=PLhQjrBD2T380Xnv_v683p6UjiKJZe13ki",
        views: "8M+ views",
        thumb: "https://i.ytimg.com/vi/8mAITcNt710/hqdefault.jpg",
      },
      {
        title: "Data Structures & Algorithms – Full Course",
        channel: "freeCodeCamp",
        url: "https://www.youtube.com/watch?v=8hly31xKli0",
        views: "5M+ views",
        thumb: "https://i.ytimg.com/vi/8hly31xKli0/hqdefault.jpg",
      },
      {
        title: "System Design for Beginners to Advanced",
        channel: "Gaurav Sen",
        url: "https://www.youtube.com/playlist?list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX",
        views: "3M+ views",
        thumb: "https://i.ytimg.com/vi/xpDnVSmNFX0/hqdefault.jpg",
      },
    ],
    certifications: [
      {
        name: "Oracle Certified Professional Java SE",
        org: "Oracle",
        url: "https://education.oracle.com/java-se-17-developer/pexam_1Z0-829",
        level: "Professional",
        badge: "🏅",
      },
      {
        name: "AWS Certified Developer – Associate",
        org: "Amazon Web Services",
        url: "https://aws.amazon.com/certification/certified-developer-associate/",
        level: "Associate",
        badge: "☁️",
      },
      {
        name: "Google Associate Android Developer",
        org: "Google",
        url: "https://developers.google.com/certification/associate-android-developer",
        level: "Associate",
        badge: "🤖",
      },
    ],
    jobs: [
      { title: "Software Engineer @ Google", url: "https://careers.google.com/jobs/results/?q=software+engineer", salary: "₹18~45 LPA" },
      { title: "SDE @ Amazon", url: "https://www.amazon.jobs/en/job_categories/software-development", salary: "₹20~50 LPA" },
      { title: "SWE @ LinkedIn", url: "https://careers.linkedin.com/", salary: "₹15~40 LPA" },
      { title: "Engineer @ TCS/Infosys", url: "https://www.tcs.com/careers", salary: "₹3.5~8 LPA" },
    ],
  },
  {
    id: "aiml",
    title: "AI / ML Engineer",
    icon: "🧠",
    color: "#f72585",
    shadow: "0 0 40px rgba(247,37,133,0.3)",
    desc: "Design intelligent systems, neural networks & generative AI",
    tags: ["Python", "TensorFlow", "ScikitLearn", "LLMs"],
    playlists: [
      {
        title: "Machine Learning Specialization – Andrew Ng",
        channel: "DeepLearning.AI",
        url: "https://www.youtube.com/playlist?list=PLkDaE6sCZn6FNC6YRfRQc_FbeQrF8BwGI",
        views: "12M+ views",
        thumb: "https://i.ytimg.com/vi/vStJoetOxJg/hqdefault.jpg",
      },
      {
        title: "Deep Learning Full Course",
        channel: "Simplilearn",
        url: "https://www.youtube.com/watch?v=aircAruvnKk",
        views: "4M+ views",
        thumb: "https://i.ytimg.com/vi/aircAruvnKk/hqdefault.jpg",
      },
      {
        title: "Generative AI using LangChain",
        channel: "CampusX",
        url: "https://youtube.com/playlist?list=PLKnIA16_RmvaTbihpo4MtzVm4XOQa0ER0&si=yc8u2hmZU1lbUxuz",
        views: "3M+ views",
        thumb:"https://i.ytimg.com/vi/pSVk-5WemQ0/hqdefault.jpg",
      },
    ],
    certifications: [
      {
        name: "Google TensorFlow Developer Certificate",
        org: "Google",
        url: "https://www.tensorflow.org/certificate",
        level: "Professional",
        badge: "🧠",
      },
      {
        name: "AWS Certified Machine Learning – Specialty",
        org: "Amazon Web Services",
        url: "https://aws.amazon.com/certification/certified-machine-learning-specialty/",
        level: "Specialty",
        badge: "☁️",
      },
      {
        name: "Professional Machine Learning Engineer",
        org: "Google Cloud",
        url: "https://cloud.google.com/certification/machine-learning-engineer",
        level: "Professional",
        badge: "🏆",
      },
    ],
    jobs: [
      { title: "ML Engineer @ OpenAI", url: "https://openai.com/careers", salary: "$150K~250K" },
      { title: "AI Researcher @ Google DeepMind", url: "https://careers.google.com/jobs/results/?q=machine+learning", salary: "₹30~80 LPA" },
      { title: "Data Scientist @ Flipkart", url: "https://www.flipkartcareers.com/", salary: "₹15~40 LPA" },
      { title: "ML Engineer @ Fractal Analytics", url: "https://fractal.ai/careers/", salary: "₹12~30 LPA" },
    ],
  },
  {
    id: "fullstack",
    title: "Full Stack Developer",
    icon: "🌐",
    color: "#7b2fff",
    shadow: "0 0 40px rgba(123,47,255,0.3)",
    desc: "Master frontend + backend, build end-to-end web apps",
    tags: ["React", "Node.js", "MongoDB", "TypeScript"],
    playlists: [
      {
        title: "Full Stack Web Dev Bootcamp 2024",
        channel: "Traversy Media",
        url: "https://www.youtube.com/watch?v=nu_pCVPKzTk",
        views: "7M+ views",
        thumb: "https://i.ytimg.com/vi/nu_pCVPKzTk/hqdefault.jpg",
      },
      {
        title: "MERN Stack Full Course – Project Based",
        channel: "JavaScript Mastery",
        url: "https://www.youtube.com/watch?v=O3BUHwfHf84",
        views: "3M+ views",
        thumb: "https://i.ytimg.com/vi/O3BUHwfHf84/hqdefault.jpg",
      },
      {
        title: "React + Node.js Full Stack App 2024",
        channel: "Academind",
        url: "https://www.youtube.com/watch?v=7CqJlxBYj-M",
        views: "2M+ views",
        thumb: "https://i.ytimg.com/vi/7CqJlxBYj-M/hqdefault.jpg",
      },
    ],
    certifications: [
      {
        name: "Meta Front-End Developer Certificate",
        org: "Meta",
        url: "https://www.coursera.org/professional-certificates/meta-front-end-developer",
        level: "Professional",
        badge: "📘",
      },
      {
        name: "MongoDB Node.js Developer Path Certificate",
        org: "MongoDB",
        url: "https://learn.mongodb.com/catalog",
        level: "Professional",
        badge: "🍃",
      },
      {
        name: "freeCodeCamp Full Stack Certification",
        org: "freeCodeCamp",
        url: "https://www.freecodecamp.org/learn/",
        level: "Free Certificate",
        badge: "🎓",
      },
    ],
    jobs: [
      { title: "Full Stack Dev @ Razorpay", url: "https://razorpay.com/jobs/", salary: "₹12~30 LPA" },
      { title: "SDE @ Swiggy", url: "https://careers.swiggy.com/", salary: "₹15~35 LPA" },
      { title: "Full Stack Engineer @ Zomato", url: "https://www.zomato.com/careers", salary: "₹12~28 LPA" },
      { title: "React Developer @ Toptal", url: "https://www.toptal.com/developers/join", salary: "$80K~140K" },
    ],
  },
  {
    id: "datascience",
    title: "Data Scientist",
    icon: "📊",
    color: "#ff9f1c",
    shadow: "0 0 40px rgba(255,159,28,0.3)",
    desc: "Extract insights from data using statistics & visualization",
    tags: ["Python", "SQL", "Pandas", "Power BI"],
    playlists: [
      {
        title: "Data Science Full Course 2024",
        channel: "Ken Jee",
        url: "https://www.youtube.com/watch?v=ua-CiDNNj30",
        views: "6M+ views",
        thumb: "https://i.ytimg.com/vi/ua-CiDNNj30/hqdefault.jpg",
      },
      {
        title: "Python Full Course For Beginners To Advanced",
        channel: "Shreyians AI School",
        url: "https://youtu.be/_aWbUudZ5Yo",
        views: "700K+ views",
        thumb: "https://img.youtube.com/vi/_aWbUudZ5Yo/hqdefault.jpg",
      },
      {
        title: "SQL for Data Analysis Full Course",
        channel: "Alex The Analyst",
        url: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
        views: "3M+ views",
        thumb: "https://i.ytimg.com/vi/HXV3zeQKqGY/hqdefault.jpg",
      },
    ],
    certifications: [
      {
        name: "Cisco Certified CyberOps Associate",
        org: "Cisco",
        url: "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/cyberops-associate.html",
        level: "Professional",
        badge: "🔷",
      },
      {
        name: "Google Data Analytics Certificate 2026",
        org: "Google",
        url: "https://www.coursera.org/professional-certificates/google-data-analytics",
        level: "Professional",
        badge: "📊",
      },
      {
        name: "Microsoft Azure Data Scientist Associate",
        org: "Microsoft",
        url: "https://learn.microsoft.com/en-us/certifications/azure-data-scientist/",
        level: "Associate",
        badge: "🪟",
      },
    ],
    jobs: [
      { title: "Data Scientist @ CRED", url: "https://careers.cred.club/", salary: "₹15~35 LPA" },
      { title: "Analyst @ McKinsey & Company", url: "https://www.mckinsey.com/careers", salary: "₹18~50 LPA" },
      { title: "Data Engineer @ PhonePe", url: "https://careers.phonepe.com/", salary: "₹12~30 LPA" },
      { title: "BI Analyst @ Deloitte", url: "https://www2.deloitte.com/in/en/careers.html", salary: "₹8~20 LPA" },
    ],
  },
  {
    id: "cybersec",
    title: "Cybersecurity Expert",
    icon: "🔐",
    color: "#06d6a0",
    shadow: "0 0 40px rgba(6,214,160,0.3)",
    desc: "Protect systems, networks & data from digital attacks",
    tags: ["Ethical Hacking", "OWASP", "Kali Linux", "Pentesting"],
    playlists: [
      {
        title: "Ethical Hacking Full Course 2024",
        channel: "freeCodeCamp",
        url: "https://www.youtube.com/watch?v=3Kq1MIfTWCE",
        views: "9M+ views",
        thumb: "https://i.ytimg.com/vi/3Kq1MIfTWCE/hqdefault.jpg",
      },
      {
        title: "CompTIA Security+ Full Course",
        channel: "Professor Messer",
        url: "https://www.youtube.com/watch?v=qiQR5rTSshw",
        views: "5M+ views",
        thumb: "https://i.ytimg.com/vi/qiQR5rTSshw/hqdefault.jpg",
      },
      {
        title: "Cybersecurity Full Course 2026",
        channel: "Simplilearn",
        url: "https://youtu.be/TYG005runIk",
        views: "10k+ views",
        thumb: "https://img.youtube.com/vi/TYG005runIk/hqdefault.jpg",
      },
    ],
    certifications: [
      {
        name: "Certified Penetration Testing Specialist (CPTS)",
        org: "Hack The Box",
        url: "https://academy.hackthebox.com/preview/certifications/htb-certified-penetration-testing-specialist",
        level: "Professional",
        badge: "💀",
      },
      {
        name: "Pre-Security (Cyber Security) Certification For 2026",
        org: "Try Hack Me",
        url: "https://tryhackme.com/certification/pre-security",
        level: "Beginner",
        badge: "🟢",
      },
      {
        name: "Splunk Enterprise Certified Admin 2026",
        org: "Splunk",
        url: "https://www.splunk.com/en_us/training/certification-track/splunk-enterprise-certified-admin.html",
        level: "Intermediate",
        badge: "🟠",
      },
    ],
    jobs: [
      { title: "Security Analyst @ Wipro CyberSec", url: "https://careers.wipro.com/", salary: "₹8~20 LPA" },
      { title: "Penetration Tester @ HackerOne", url: "https://www.hackerone.com/company/jobs", salary: "$90K~160K" },
      { title: "SOC Analyst @ IBM Security", url: "https://www.ibm.com/employment/", salary: "₹10~25 LPA" },
      { title: "InfoSec Engineer @ Paytm", url: "https://paytm.com/careers", salary: "₹12~28 LPA" },
    ],
  },
  {
    id: "clouddevops",
    title: "Cloud & DevOps",
    icon: "☁️",
    color: "#4cc9f0",
    shadow: "0 0 40px rgba(76,201,240,0.3)",
    desc: "Automate deployments, manage cloud infra & CI/CD pipelines",
    tags: ["AWS", "Docker", "Kubernetes", "Terraform"],
    playlists: [
      {
        title: "AWS Certified Solutions Architect – Full Course",
        channel: "freeCodeCamp",
        url: "https://www.youtube.com/watch?v=Ia-UEYYR44s",
        views: "11M+ views",
        thumb: "https://i.ytimg.com/vi/Ia-UEYYR44s/hqdefault.jpg",
      },
      {
        title: "Docker & Kubernetes Complete Course",
        channel: "TechWorld with Nana",
        url: "https://www.youtube.com/watch?v=3c-iBn73dDE",
        views: "6M+ views",
        thumb: "https://i.ytimg.com/vi/3c-iBn73dDE/hqdefault.jpg",
      },
      {
        title: "DevOps Roadmap 2024 – Zero to Hero",
        channel: "KodeKloud",
        url: "https://www.youtube.com/watch?v=j5Zsa_eOXeY",
        views: "4M+ views",
        thumb: "https://i.ytimg.com/vi/j5Zsa_eOXeY/hqdefault.jpg",
      },
    ],
    certifications: [
      {
        name: "AWS Certified Solutions Architect – Associate",
        org: "Amazon Web Services",
        url: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
        level: "Associate",
        badge: "☁️",
      },
      {
        name: "Certified Kubernetes Administrator (CKA)",
        org: "CNCF",
        url: "https://www.cncf.io/certification/cka/",
        level: "Professional",
        badge: "⚓",
      },
      {
        name: "Google Cloud Professional DevOps Engineer",
        org: "Google Cloud",
        url: "https://cloud.google.com/certification/cloud-devops-engineer",
        level: "Professional",
        badge: "🔧",
      },
    ],
    jobs: [
      { title: "DevOps Engineer @ Microsoft Azure", url: "https://careers.microsoft.com/", salary: "₹15~40 LPA" },
      { title: "Cloud Architect @ Accenture", url: "https://www.accenture.com/in-en/careers", salary: "₹18~50 LPA" },
      { title: "SRE @ Netflix", url: "https://jobs.netflix.com/", salary: "$130K~220K" },
      { title: "Cloud Engineer @ HCL Tech", url: "https://www.hcltech.com/careers", salary: "₹8~20 LPA" },
    ],
  },
];

const TABS = ["🗺️ Roadmap", "▶️ Playlists", "🏆 Certifications", "💼 Apply Now", "📈 Market Scope"];

export default function RiseRoute() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [aiContent, setAiContent] = useState({ roadmap: "", market: "" });
  const [loading, setLoading] = useState(false);
  const [particles, setParticles] = useState([]);
  const [animIn, setAnimIn] = useState(false);
  const resultRef = useRef(null);

  useEffect(() => {
    const p = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 20 + 10,
      opacity: Math.random() * 0.5 + 0.1,
    }));
    setParticles(p);
    setTimeout(() => setAnimIn(true), 100);
  }, []);

  const fetchAIContent = async (role) => {
  setLoading(true);
  setAiContent({ roadmap: "", market: "" });

  const ANTHROPIC_API_KEY = "sk-ant-xxxx"; // 🔑 paste your key here

  const callClaude = async (content) => {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true", // ← this is the magic line
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{ role: "user", content }],
      }),
    });
    const data = await res.json();
    return data.content?.[0]?.text || "Unable to generate content.";
  };

  try {
    const [roadmap, market] = await Promise.all([
      callClaude(`Create a detailed, structured learning roadmap for becoming a ${role.title}. 
Format it as clear phases (Phase 1, Phase 2, etc.) with specific skills, tools, and milestones for each phase. 
Make it actionable, realistic, and include estimated timeframes. Use emojis for visual appeal. Keep it under 600 words.`),

      callClaude(`Analyze the current market scope and industry demand for ${role.title} in 2025-2026. 
Cover: salary trends (India + Global), top hiring companies, in-demand skills, future outlook, remote work opportunities, and career growth paths. 
Use emojis and make it engaging. Keep it under 500 words.`),
    ]);

    setAiContent({ roadmap, market });
  } catch (e) {
    console.error(e);
    setAiContent({
      roadmap: "⚠️ Could not load AI roadmap. Please check your API key.",
      market: "⚠️ Could not load market analysis. Please check your API key.",
    });
  }

  setLoading(false);
};

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setActiveTab(0);
    fetchAIContent(role);
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleBack = () => {
    setSelectedRole(null);
    setAiContent({ roadmap: "", market: "" });
  };

  const role = selectedRole;
  
  //logo links
const ORG_LOGOS = {
  "Google":               "https://www.google.com/s2/favicons?domain=google.com&sz=64",
  "Google Cloud":         "https://www.google.com/s2/favicons?domain=cloud.google.com&sz=64",
  "Amazon Web Services":  "https://www.google.com/s2/favicons?domain=aws.amazon.com&sz=64",
  "Microsoft":            "https://www.google.com/s2/favicons?domain=microsoft.com&sz=64",
  "HashiCorp":            "https://www.google.com/s2/favicons?domain=hashicorp.com&sz=64",
  "Linux Foundation":     "https://www.google.com/s2/favicons?domain=linuxfoundation.org&sz=64",
  "CNCF":                 "https://www.google.com/s2/favicons?domain=cncf.io&sz=64",
  "Oracle":               "https://www.google.com/s2/favicons?domain=oracle.com&sz=64",
  "Meta":                 "https://www.google.com/s2/favicons?domain=meta.com&sz=64",
  "freeCodeCamp":         "https://www.google.com/s2/favicons?domain=freecodecamp.com&sz=64",
  "MongoDB":              "https://www.google.com/s2/favicons?domain=mongodb.com&sz=64",
  "Hack The Box":         "https://www.google.com/s2/favicons?domain=hackthebox.com&sz=64",
  "Try Hack Me":          "https://www.google.com/s2/favicons?domain=tryhackme.com&sz=64",
  "Splunk":               "https://www.google.com/s2/favicons?domain=splunk.com&sz=64",
  "Cisco":                "https://www.google.com/s2/favicons?domain=cisco.com&sz=64",
};

  return (
    <div style={{
      minHeight: "100vh",
      background: "#050a0f",
      fontFamily: "'Sora', 'DM Sans', system-ui, sans-serif",
      color: "#e8eaf0",
      position: "relative",
    }}>
      {/* Import fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 1; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200vh); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        @keyframes particleDrift {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-20px) rotate(360deg); opacity: 0; }
        }
        @keyframes typeIn {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .role-card {
          transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .role-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .role-card:hover {
          transform: translateY(-8px) scale(1.02);
        }
        .role-card:hover::before { opacity: 1; }

        .tab-btn {
          transition: all 0.25s ease;
          cursor: pointer;
          white-space: nowrap;
        }
        .tab-btn:hover { opacity: 0.85; transform: translateY(-1px); }

        .playlist-card {
          transition: all 0.25s ease;
          cursor: pointer;
        }
        .playlist-card:hover { transform: translateX(6px); }

        .cert-card, .job-card {
          transition: all 0.25s ease;
          cursor: pointer;
        }
        .cert-card:hover, .job-card:hover { transform: translateY(-3px); }

        .apply-btn {
          transition: all 0.2s ease;
          cursor: pointer;
          display: inline-block;
        }
        .apply-btn:hover { transform: scale(1.05); filter: brightness(1.15); }

        .shimmer-text {
          background: linear-gradient(90deg, #fff 25%, #a8b0c8 50%, #fff 75%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        .grid-bg {
          background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: gridMove 8s linear infinite;
        }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0f1a; }
        ::-webkit-scrollbar-thumb { background: #2a3550; border-radius: 3px; }
      `}</style>

      {/* Grid background */}
      <div className="grid-bg" style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
      }} />

      {/* Floating particles */}
      {particles.map(p => (
        <div key={p.id} style={{
          position: "fixed",
          left: `${p.x}%`,
          bottom: 0,
          width: `${p.size}px`,
          height: `${p.size}px`,
          borderRadius: "50%",
          background: "#4cc9f0",
          opacity: p.opacity,
          pointerEvents: "none",
          zIndex: 0,
          animation: `particleDrift ${p.speed}s linear infinite`,
          animationDelay: `${Math.random() * p.speed}s`,
        }} />
      ))}

      {/* Ambient glows */}
      <div style={{
        position: "fixed", top: "20%", left: "10%", width: "400px", height: "400px",
        background: "radial-gradient(circle, rgba(123,47,255,0.12) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0, animation: "glowPulse 4s ease-in-out infinite",
      }} />
      <div style={{
        position: "fixed", bottom: "20%", right: "10%", width: "500px", height: "500px",
        background: "radial-gradient(circle, rgba(0,245,212,0.08) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0, animation: "glowPulse 6s ease-in-out infinite 2s",
      }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>

        {/* NAVBAR */}
        <nav style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "20px 40px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          backdropFilter: "blur(20px)",
          background: "rgba(5,10,15,0.8)",
          position: "sticky", top: 0, zIndex: 100,
        }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }} onClick={handleBack}>
          <svg width="36" height="36" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="rr-g1" x1="0" y1="0" x2="72" y2="72" gradientUnits="userSpaceOnUse">
                <stop offset="0%"   stopColor="#c084fc"/>
                <stop offset="45%"  stopColor="#f472b6"/>
                <stop offset="100%" stopColor="#818cf8"/>
              </linearGradient>
              <linearGradient id="rr-g2" x1="0" y1="0" x2="72" y2="72" gradientUnits="userSpaceOnUse">
                <stop offset="0%"   stopColor="#7c3aed"/>
                <stop offset="100%" stopColor="#be185d"/>
              </linearGradient>
            </defs>
              <rect width="72" height="72" rx="20" fill="url(#rr-g2)" opacity=".18"/>
              <rect width="72" height="72" rx="20" fill="none" stroke="url(#rr-g1)" strokeWidth="1.4" opacity=".55"/>
              <text x="7" y="52" fontFamily="Georgia, serif" fontSize="42" fontWeight="700" fill="url(#rr-g1)">R</text>
              <text x="30" y="52" fontFamily="Georgia, serif" fontSize="42" fontWeight="700" fill="url(#rr-g1)" opacity=".65">R</text>
              <circle cx="60" cy="14" r="5" fill="#f472b6"/>
              <circle cx="60" cy="14" r="9" fill="#f472b6" opacity=".18"/>
          </svg>
            <span style={{
              fontSize: "22px", fontWeight: "800", letterSpacing: "-0.5px",
              background: "linear-gradient(135deg, #fff 30%, #7b2fff)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>RiseRoute</span>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            {["Explore", "Roadmaps", "Careers"].map(item => (
              <button key={item} style={{
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
                color: "#a8b0c8", padding: "8px 16px", borderRadius: "8px",
                fontSize: "13px", fontWeight: "600", cursor: "pointer", fontFamily: "inherit",
              }}>{item}</button>
            ))}
          </div>
        </nav>

        {/* HERO */}
        {!selectedRole && (
          <div style={{
            textAlign: "center", padding: "80px 40px 60px",
            animation: animIn ? "fadeSlideUp 0.8s ease forwards" : "none",
            opacity: animIn ? 1 : 0,
          }}>
            {/* Badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(123,47,255,0.15)", border: "1px solid rgba(123,47,255,0.4)",
              borderRadius: "100px", padding: "6px 16px", marginBottom: "32px",
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#7b2fff", display: "inline-block", animation: "pulse-ring 1.5s ease-out infinite" }} />
              <span style={{ fontSize: "12px", color: "#a78bfa", fontWeight: "600", letterSpacing: "1px" }}>CAREER NAVIGATOR</span>
            </div>

            <h1 style={{
              fontSize: "clamp(44px, 7vw, 82px)", fontWeight: "800",
              lineHeight: "1.05", letterSpacing: "-2px", marginBottom: "24px",
            }}>
              <span className="shimmer-text">Your Path to</span>
              <br />
              <span style={{
                background: "linear-gradient(135deg, #7b2fff 0%, #f72585 50%, #4cc9f0 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>Tech Excellence</span>
            </h1>

            <p style={{
              fontSize: "18px", color: "#8892a4", maxWidth: "560px", margin: "0 auto 16px",
              lineHeight: "1.7", fontWeight: "300",
            }}>
              Select your dream career below. Get an AI-generated roadmap,
              curated YouTube playlists, top certifications & real job openings — instantly.
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginTop: "32px", flexWrap: "wrap" }}>
              {["🎯 6 Career Tracks", "🧠 AI Roadmaps", "▶️ Best Playlists", "📈 Market Insights"].map(item => (
                <span key={item} style={{
                  fontSize: "13px", color: "#6b7899", fontWeight: "500",
                  display: "flex", alignItems: "center", gap: "6px",
                }}>{item}</span>
              ))}
            </div>

            {/* Arrow */}
            <div style={{ marginTop: "48px", animation: "float 2s ease-in-out infinite", fontSize: "24px" }}>↓</div>
          </div>
        )}

        {/* ROLE CARDS GRID */}
        {!selectedRole && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "20px",
            padding: "0 40px 80px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}>
            {ROLES.map((r, i) => (
              <div
                key={r.id}
                className="role-card"
                onClick={() => handleRoleSelect(r)}
                style={{
                  background: "linear-gradient(145deg, rgba(15,20,35,0.9) 0%, rgba(10,15,25,0.95) 100%)",
                  border: `1px solid rgba(255,255,255,0.08)`,
                  borderRadius: "20px",
                  padding: "28px",
                  animation: `fadeSlideUp 0.6s ease forwards ${i * 0.08}s`,
                  opacity: 0,
                }}
              >
                {/* Top row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                  <div style={{
                    width: "56px", height: "56px", borderRadius: "16px",
                    background: `linear-gradient(135deg, ${r.color}22, ${r.color}44)`,
                    border: `1px solid ${r.color}44`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "26px",
                    boxShadow: r.shadow,
                  }}>{r.icon}</div>
                  <div style={{
                    background: `${r.color}18`, border: `1px solid ${r.color}33`,
                    borderRadius: "100px", padding: "4px 12px",
                    fontSize: "11px", color: r.color, fontWeight: "700", letterSpacing: "0.5px",
                  }}>EXPLORE →</div>
                </div>

                <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "8px", color: "#f0f2f8" }}>{r.title}</h3>
                <p style={{ fontSize: "14px", color: "#6b7899", lineHeight: "1.6", marginBottom: "20px" }}>{r.desc}</p>

                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {r.tags.map(tag => (
                    <span key={tag} style={{
                      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "6px", padding: "4px 10px",
                      fontSize: "12px", color: "#8892a4", fontWeight: "500",
                      fontFamily: "'DM Mono', monospace",
                    }}>{tag}</span>
                  ))}
                </div>

                {/* Bottom bar */}
                <div style={{
                  marginTop: "20px", paddingTop: "16px",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  <span style={{ fontSize: "12px", color: "#4a5568" }}>
                    {r.playlists.length} playlists • {r.certifications.length} certs
                  </span>
                  <div style={{
                    width: "32px", height: "32px", borderRadius: "50%",
                    background: `${r.color}22`, border: `1px solid ${r.color}44`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "14px", color: r.color,
                  }}>→</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* RESULTS SECTION */}
        {selectedRole && (
          <div ref={resultRef} style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 40px 80px" }}>
            {/* Back + Header */}
            <div style={{
              display: "flex", alignItems: "center", gap: "20px", marginBottom: "36px",
              animation: "fadeSlideUp 0.5s ease forwards",
            }}>
              <button onClick={handleBack} style={{
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px", padding: "10px 18px", color: "#a8b0c8",
                fontSize: "14px", fontWeight: "600", cursor: "pointer", fontFamily: "inherit",
                display: "flex", alignItems: "center", gap: "8px",marginTop:"-40px"
            
              }}>← Back</button>

              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "32px" }}>{role.icon}</span>
                  <div>
                    <h2 style={{
                      fontSize: "28px", fontWeight: "800", letterSpacing: "-0.5px",
                      background: `linear-gradient(135deg, #fff, ${role.color})`,
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    }}>{role.title}</h2>
                    <p style={{ fontSize: "13px", color: "#6b7899" }}>{role.desc}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* TABS */}
            <div style={{
              display: "flex", gap: "6px", marginBottom: "32px",
              overflowX: "auto", paddingBottom: "4px",
            }}>
              {TABS.map((tab, i) => (
                <button
                  key={tab}
                  className="tab-btn"
                  onClick={() => setActiveTab(i)}
                  style={{
                    padding: "10px 20px", borderRadius: "12px", fontSize: "14px", fontWeight: "600",
                    fontFamily: "inherit", cursor: "pointer",
                    background: activeTab === i
                      ? `linear-gradient(135deg, ${role.color}33, ${role.color}11)`
                      : "rgba(255,255,255,0.04)",
                    border: activeTab === i
                      ? `1px solid ${role.color}66`
                      : "1px solid rgba(255,255,255,0.06)",
                    color: activeTab === i ? role.color : "#6b7899",
                  }}
                >{tab}</button>
              ))}
            </div>

            {/* TAB CONTENT */}
            <div style={{ animation: "fadeSlideUp 0.4s ease forwards", minHeight: "400px" }}>

              {/* ROADMAP */}
              {activeTab === 0 && (
                <div style={{
                  background: "rgba(15,20,35,0.8)", border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "20px", padding: "36px",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
                    <div style={{
                      width: "44px", height: "44px", borderRadius: "12px",
                      background: `${role.color}22`, border: `1px solid ${role.color}44`,
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px",
                    }}>🗺️</div>
                    <div>
                      <h3 style={{ fontSize: "20px", fontWeight: "700" }}>AI-Generated Roadmap</h3>
                      <p style={{ fontSize: "13px", color: "#6b7899" }}>Powered by Claude AI • Personalized for {role.title}</p>
                    </div>
                    {loading && (
                      <div style={{
                        marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px",
                        color: role.color, fontSize: "13px",
                      }}>
                        <span style={{ animation: "blink 1s ease infinite" }}>⚡</span> Generating...
                      </div>
                    )}
                  </div>
                  {loading ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      {[100, 80, 90, 70, 85].map((w, i) => (
                        <div key={i} style={{
                          height: "16px", borderRadius: "8px",
                          background: "rgba(255,255,255,0.06)",
                          width: `${w}%`,
                          animation: "glowPulse 1.5s ease infinite",
                          animationDelay: `${i * 0.2}s`,
                        }} />
                      ))}
                    </div>
                  ) : (
                    <div style={{
                      fontSize: "15px", lineHeight: "1.9", color: "#c8d0e0",
                      whiteSpace: "pre-wrap", fontFamily: "inherit",
                    }}>{aiContent.roadmap}</div>
                  )}
                </div>
              )}

              {/* PLAYLISTS */}
              {activeTab === 1 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ marginBottom: "8px" }}>
                    <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "4px" }}>▶️ Curated YouTube Playlists</h3>
                    <p style={{ fontSize: "13px", color: "#6b7899" }}>Handpicked top-rated courses for {role.title}</p>
                  </div>
                  {role.playlists.map((pl, i) => (
                    <a key={i} href={pl.url} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                      <div className="playlist-card" style={{
                        background: "rgba(15,20,35,0.8)", border: "1px solid rgba(255,255,255,0.07)",
                        borderRadius: "16px", padding: "20px", display: "flex", gap: "20px", alignItems: "center",
                      }}>
                        <div style={{
                        width: "120px", height: "72px", borderRadius: "10px",
                        flexShrink: 0, overflow: "hidden", position: "relative",
                        border: `1px solid ${role.color}22`,
                        background: `linear-gradient(135deg, ${role.color}22, #0a0f1a)`,
                      }}>
                        <img
                              src={pl.thumb}
                              alt={pl.title}
                              onError={(e) => { e.target.style.display = "none"; }}
                              style={{
                                  width: "100%", height: "100%",
                                  objectFit: "cover", display: "block",
                                  borderRadius: "10px",
                           }}
                        />
                        {/* Play button overlay */}
                        <div style={{
                          position: "absolute", inset: 0,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          background: "rgba(0,0,0,0.3)",
                          borderRadius: "10px",
                          fontSize: "20px",
                          }}>▶️</div>
                        </div>
                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "6px", color: "#f0f2f8" }}>{pl.title}</h4>
                          <p style={{ fontSize: "13px", color: "#6b7899", marginBottom: "8px" }}>📺 {pl.channel}</p>
                          <span style={{
                            fontSize: "12px", color: role.color,
                            background: `${role.color}15`, border: `1px solid ${role.color}33`,
                            borderRadius: "6px", padding: "3px 10px",
                          }}>🔥 {pl.views}</span>
                        </div>
                        <div style={{
                          color: role.color, fontSize: "20px", flexShrink: 0,
                          opacity: 0.7,
                        }}>→</div>
                      </div>
                    </a>
                  ))}
                </div>
              )}

              {/* CERTIFICATIONS */}
              {activeTab === 2 && (
                <div>
                  <div style={{ marginBottom: "24px" }}>
                    <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "4px" }}>🏆 Top Certifications</h3>
                    <p style={{ fontSize: "13px", color: "#6b7899" }}>Industry-recognized credentials for {role.title}</p>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
                    {role.certifications.map((cert, i) => (
                      <a key={i} href={cert.url} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                        <div className="cert-card" style={{
                          background: "rgba(15,20,35,0.8)", border: "1px solid rgba(255,255,255,0.07)",
                          borderRadius: "16px", padding: "24px",
                        }}>
                          <div style={{ marginBottom: "12px", height: "36px", display: "flex", alignItems: "center" }}>
                         {ORG_LOGOS[cert.org] ? (
                        <img
                            src={ORG_LOGOS[cert.org]}
                            alt={cert.org}
                            style={{
                                height: "32px",
                                width: "32px",
                                objectFit: "contain",
                                borderRadius: "6px",
                                background: "#fff",
                                padding: "4px",
                            }}
                          onError={(e) => {
                             e.target.style.display = "none";
                            e.target.nextSibling.style.display = "block";
                            }}
                             />
                          ) : null}
                                  {/* Fallback emoji shown if logo fails to load */}
                                  <span
                                  style={{
                                  fontSize: "28px",
                                  display: ORG_LOGOS[cert.org] ? "none" : "block",
                                  }}
                                  >
                                {cert.badge}
                            </span>
                          </div>
                          <h4 style={{ fontSize: "15px", fontWeight: "700", marginBottom: "8px", color: "#f0f2f8", lineHeight: "1.4" }}>{cert.name}</h4>
                          <p style={{ fontSize: "12px", color: "#6b7899", marginBottom: "12px" }}>🏢 {cert.org}</p>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{
                              fontSize: "11px", fontWeight: "700",
                              color: role.color, background: `${role.color}15`,
                              border: `1px solid ${role.color}33`, borderRadius: "6px",
                              padding: "3px 10px", letterSpacing: "0.5px",
                            }}>{cert.level.toUpperCase()}</span>
                            <span style={{ fontSize: "12px", color: role.color }}>Get Certified →</span>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* JOBS */}
              {activeTab === 3 && (
                <div>
                  <div style={{ marginBottom: "24px" }}>
                    <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "4px" }}>💼 Apply for Jobs</h3>
                    <p style={{ fontSize: "13px", color: "#6b7899" }}>Live openings & top companies hiring {role.title}s</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    {role.jobs.map((job, i) => (
                      <div key={i} className="job-card" style={{
                        background: "rgba(15,20,35,0.8)", border: "1px solid rgba(255,255,255,0.07)",
                        borderRadius: "16px", padding: "22px 28px",
                        display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px",
                        flexWrap: "wrap",
                      }}>
                        <div>
                          <h4 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "6px", color: "#f0f2f8" }}>{job.title}</h4>
                          <span style={{
                            fontSize: "13px", color: "#06d6a0",
                            fontFamily: "'DM Mono', monospace", fontWeight: "500",
                          }}>💰 {job.salary}</span>
                        </div>
                        <a href={job.url} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                          <button className="apply-btn" style={{
                            padding: "10px 24px", borderRadius: "12px", fontSize: "14px",
                            fontWeight: "700", fontFamily: "inherit", cursor: "pointer",
                            background: `linear-gradient(135deg, ${role.color}, ${role.color}aa)`,
                            border: "none", color: "#050a0f",
                            boxShadow: `0 4px 20px ${role.color}44`,
                          }}>Apply Now ↗</button>
                        </a>
                      </div>
                    ))}
                  </div>

                  {/* Also check */}
                  <div style={{
                    marginTop: "24px", padding: "20px 24px",
                    background: "rgba(123,47,255,0.1)", border: "1px solid rgba(123,47,255,0.25)",
                    borderRadius: "16px",
                  }}>
                    <p style={{ fontSize: "14px", color: "#a78bfa", fontWeight: "600", marginBottom: "12px" }}>🔍 Also explore on:</p>
                    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                      {[
                        ["LinkedIn Jobs", "https://www.linkedin.com/jobs/"],
                        ["Naukri.com", "https://www.naukri.com/"],
                        ["Indeed", "https://www.indeed.co.in/"],
                        ["Internshala", "https://internshala.com/"],
                        ["AngelList", "https://angel.co/jobs"],
                      ].map(([name, url]) => (
                        <a key={name} href={url} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                          <span style={{
                            fontSize: "13px", padding: "6px 14px",
                            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "8px", color: "#c8d0e0", cursor: "pointer",
                          }}>{name} ↗</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* MARKET SCOPE */}
              {activeTab === 4 && (
                <div style={{
                  background: "rgba(15,20,35,0.8)", border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "20px", padding: "36px",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
                    <div style={{
                      width: "44px", height: "44px", borderRadius: "12px",
                      background: `${role.color}22`, border: `1px solid ${role.color}44`,
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px",
                    }}>📈</div>
                    <div>
                      <h3 style={{ fontSize: "20px", fontWeight: "700" }}>Market Scope & Industry Demand</h3>
                      <p style={{ fontSize: "13px", color: "#6b7899" }}>AI Analysis • 2025–2026 Outlook for {role.title}</p>
                    </div>
                    {loading && (
                      <div style={{ marginLeft: "auto", color: role.color, fontSize: "13px" }}>
                        <span style={{ animation: "blink 1s ease infinite" }}>⚡</span> Analyzing...
                      </div>
                    )}
                  </div>

                  {loading ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      {[90, 75, 85, 60, 80, 70].map((w, i) => (
                        <div key={i} style={{
                          height: "16px", borderRadius: "8px",
                          background: "rgba(255,255,255,0.06)",
                          width: `${w}%`,
                          animation: "glowPulse 1.5s ease infinite",
                          animationDelay: `${i * 0.15}s`,
                        }} />
                      ))}
                    </div>
                  ) : (
                    <div style={{
                      fontSize: "15px", lineHeight: "1.9", color: "#c8d0e0",
                      whiteSpace: "pre-wrap", fontFamily: "inherit",
                    }}>{aiContent.market}</div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* FOOTER */}
        <footer style={{
          textAlign: "center", padding: "40px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          color: "#3a4560", fontSize: "13px",
        }}>
          <p>🚀 <strong style={{ color: "#6b7899" }}>RiseRoute</strong> — AI-Powered Career Navigation for Tomorrow's Tech Leaders</p>
          <p style={{ marginTop: "8px" }}>Built by RiseRoute Team</p>
        </footer>
      </div>
    </div>
  );
}
