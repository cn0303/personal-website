// ───────────────────────────────────────────────────────────────
// Site content — single source of truth for copy/data (WORK-04 / TIME-02).
// Seeded from Chandran's LinkedIn; refine freely. Editing here updates pages.
// ───────────────────────────────────────────────────────────────

export const site = {
  name: 'Chandran Nandkumar',
  shortName: 'Chandran',
  role: 'AI & Robotics Engineer',
  company: 'Qafka Robotics',
  location: 'Amsterdam, Netherlands',
  // TODO: swap for real address + custom domain at deploy
  email: 'hello@chandrannandkumar.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/chandran-nandkumar',
    // TODO: add real handles
    github: 'https://github.com/',
    unspool: 'https://unspool.xyz',
  },
  tagline: 'Teaching machines to understand the physical world.',
  lede:
    'AI & Robotics engineer at Qafka Robotics. I work on interpretable embodied AI, human–robot interaction, and control — building robots that learn to act in the messy, unscripted real world.',
};

// The "bets" — what Chandran is building toward (narrative core, NARR-02)
export const bets = [
  {
    n: '01',
    title: 'Interpretable embodied AI',
    body: 'If robots are going to act in the real world, we have to be able to see why. I work on opening up the black box of vision-language-action models — making their internal task structure legible, decodable, and steerable.',
  },
  {
    n: '02',
    title: 'Generality over brittleness',
    body: 'One model that adapts beats a thousand hand-tuned policies. The bet is on systems that learn from real-world contact and recover from their own mistakes — not pipelines that shatter the moment the world changes.',
  },
  {
    n: '03',
    title: 'Robots people can collaborate with',
    body: 'The hard part isn’t the arm — it’s making physical AI understandable and trustworthy to the people around it. Human–robot interaction that is equitable, communicative, and genuinely useful.',
  },
];

export type Project = {
  slug: string;
  title: string;
  year: string;
  context: string;
  oneLiner: string;
  summary: string;
  highlights: string[];
  tags: string[];
  award?: string;
  link?: { label: string; href: string };
};

// Work / case studies (WORK-01..03) — projects as evidence for the story.
export const projects: Project[] = [
  {
    slug: 'strawberry-harvesting',
    title: 'Autonomous Strawberry Harvesting',
    year: '2026',
    context: 'Builder in Residence · Alpine Valley, Vienna',
    oneLiner: 'A robotic policy that picks strawberries autonomously at >90% success.',
    summary:
      'Over a month-long residency, built a system for autonomous strawberry harvesting — a deceptively hard manipulation problem: delicate fruit, hot/humid conditions, unstructured scenes. Explored VLA models, classical robotics, HG-DAgger corrective learning, and Actor-Critic RL in MuJoCo, with a deep focus on interpretability and steerability.',
    highlights: [
      '>90% autonomous picking success on the physical test setup',
      'Robust recovery from mistakes in challenging, unstructured scenes',
      'Trained Vision-Language-Action models + Actor-Critic RL policies (MuJoCo)',
      'HG-DAgger corrective learning; open-source contributions + technical blogs',
    ],
    tags: ['Embodied AI', 'VLA', 'Reinforcement Learning', 'Agritech'],
  },
  {
    slug: 'vla-brain-map',
    title: 'Inside a Robot’s Mind',
    year: '2026',
    context: 'Interpretability research · SmolVLA',
    oneLiner: 'Reading the internal task structure of a vision-language-action model.',
    summary:
      'Fine-tuned Hugging Face’s SmolVLA on just 40 teleoperated demos of an SO-101 arm picking a strawberry, then asked the more interesting question: can we see the task inside the model? Extracted hidden states from the frozen VLM backbone and projected them into a 2D "brain map" that travels through task stages.',
    highlights: [
      'Task stage linearly decodable from frozen hidden states at ~86%',
      'Hidden states separated task stages far better than proprioception alone',
      'Vision mattered most exactly where joint data was weakest',
      'Sparse human labels caught errors that looked clean in unsupervised models',
    ],
    tags: ['Interpretability', 'SmolVLA', 'Teleoperation', 'Robot Learning'],
  },
  {
    slug: 'forgis-physical-ai',
    title: 'Vision-Guided Pick-and-Place',
    year: '2025',
    context: 'FORGIS Physical AI Hackathon · Zurich',
    oneLiner: 'A vision-based robotic system for reliable component pick-and-place, with AR oversight.',
    summary:
      'Built a vision-driven manipulation system that picks up a pipe and places it into a basket reliably, with an AR layer keeping the operator informed. Demoed to Massimo Banzi, co-founder of Arduino.',
    highlights: [
      'Trained an instance-segmentation model for pipe detection',
      'Calibrated global↔robot frame transforms for precise grasping',
      'Executed grasp + hand-off on a Dobot Nova 5',
      'Snap Spectacles AR + Google Gemini for live operator status',
    ],
    tags: ['Computer Vision', 'Manipulation', 'AR/XR'],
    award: '1st place — “Machines that Think”',
  },
  {
    slug: 'supermarket-llm',
    title: 'Equitable LLM Interface for Supermarket Robots',
    year: '2025',
    context: 'Peer-reviewed · Frontiers',
    oneLiner: 'A multi-level conversational interface that handles diverse customer intents, equitably.',
    summary:
      'Research on a multi-level LLM conversational interface for retail service robots — designed to handle a wide range of customer intents while remaining equitable across different users. Published in Frontiers.',
    highlights: [
      'Multi-level intent handling for human–robot interaction',
      'Designed for equity across diverse customer populations',
      'Peer-reviewed publication (Frontiers, 2025)',
    ],
    tags: ['HRI', 'LLM', 'Publication'],
    link: { label: 'Read the paper', href: 'https://www.frontiersin.org/' },
  },
  {
    slug: 'hyrox-ar',
    title: 'Hyrox AR Coach',
    year: '2025',
    context: 'Snap × 3EALITY Hackathon · Amsterdam',
    oneLiner: 'An AR fitness assistant that coaches your form and lets you race your past self.',
    summary:
      'An augmented-reality assistant for Hyrox training, built on Snap Spectacles. Two features: autopilot coaching that checks form and tracks reps, and a "ghost" mode to compete against previously recorded versions of yourself.',
    highlights: [
      'Autopilot coaching: real-time form check + rep tracking',
      '“Ghost” mode — compete against a recorded version of yourself',
      'Built on Snap Spectacles AR',
    ],
    tags: ['AR/XR', 'Computer Vision', 'Product'],
    award: '1st place',
  },
  {
    slug: 'pix-e',
    title: 'PIX-E — Social Companion Robot',
    year: '2025',
    context: 'Junction 2025 · Helsinki',
    oneLiner: 'A companion robot for an aging population — built (and 3D-printed) in 40 hours.',
    summary:
      'For Junction’s aging-population challenge, designed, built, and programmed a fully functioning social companion robot from scratch in 40 hours — including buying a 3D printer on the spot. PIX-E converses to reduce loneliness, motivates physical activity, and facilitates social connection.',
    highlights: [
      'Full robotic prototype designed + built in 40 hours',
      'Natural conversation to reduce loneliness',
      'Activity motivation + community/social connection features',
    ],
    tags: ['HRI', 'Robotics', 'Social Good'],
  },
  {
    slug: 'unspool',
    title: 'Unspool — Voice Journaling App',
    year: '2024',
    context: 'Solo product · iOS + Android',
    oneLiner: 'Talk about your day; curate your own personal autobiography.',
    summary:
      'A voice-based journaling app that lets you speak about your day and build a personal autobiography over time. Designed, built, and shipped end-to-end across both app stores.',
    highlights: [
      'Shipped to both the App Store and Play Store',
      'Voice-first journaling with LLM-curated narrative',
      'Built with Dart + Firebase',
    ],
    tags: ['Mobile', 'Voice', 'Product'],
    link: { label: 'unspool.xyz', href: 'https://unspool.xyz' },
  },
  {
    slug: 'lionhead',
    title: 'Generative AI Job Platform',
    year: '2024',
    context: 'GenAI Engineer · LionHead',
    oneLiner: 'Personalized, skill-based job matching with résumés generated in under a minute.',
    summary:
      'As a generative-AI engineer, helped build LionHead’s platform close to scratch — a one-stop destination for personalized job recommendations using skill-based matching aligned to a person’s ambitions and preferences.',
    highlights: [
      'Skill extraction + information retrieval for matching',
      'LLM-generated tailored résumés in under a minute',
      'Full-stack development of the platform',
    ],
    tags: ['GenAI', 'Full-stack', 'LLM'],
  },
];

export type TimelineEntry = {
  year: string;
  title: string;
  org?: string;
  body?: string;
  kind: 'education' | 'work' | 'award' | 'project' | 'research';
};

// Journey / timeline (TIME-01) — forward chronological arc.
export const timeline: TimelineEntry[] = [
  { year: '2013', title: 'Duke TIP', org: 'Duke University Talent Identification Program', body: 'Selected as one of ~1,700 students from India via the ASSET examination.', kind: 'award' },
  { year: '2018–22', title: 'B.Tech, Mechanical Engineering (Minor: Management)', org: 'NIT Karnataka, Surathkal — 8.12/10', body: 'IEEE NITK Chief Coordinator · Head of the Debate Society · Chief Editor of Pulse · Head of Powertrain, BAJA NITK Racing.', kind: 'education' },
  { year: '2019', title: 'Monocopter', org: 'IEEE NITK', body: 'A single-propeller UAV with a custom airfoil — lighter and lower-power than a quadcopter.', kind: 'project' },
  { year: '2020–22', title: 'Research Intern', org: 'IIT Bombay', body: 'Robotics research, leading to a publication on indoor localization and navigation.', kind: 'research' },
  { year: '2021', title: 'Publication — Turtlebot3 Localization & Navigation', org: 'IEEE ICDTMRA', body: 'Simulation of indoor localization and navigation using real-time object detection.', kind: 'research' },
  { year: '2022', title: 'Product Management Intern', org: 'FluxGen Technologies, Bengaluru', body: 'User research with Ashok Leyland, ITC, Piramal and more; wireframing and ROI analysis for a water-management product.', kind: 'work' },
  { year: '2022–24', title: 'M.Sc. Robotics', org: 'TU Delft', body: 'Embodied AI, control, computer vision, and human–robot interaction.', kind: 'education' },
  { year: '2024', title: 'Generative AI Engineer (Intern)', org: 'LionHead', body: 'Built a personalized, skill-based job-matching platform close to scratch.', kind: 'work' },
  { year: '2024', title: 'Launched Unspool', org: 'iOS + Android', body: 'Shipped a voice-based journaling app across both app stores.', kind: 'project' },
  { year: '2024', title: 'Robotics & AI Engineer', org: 'Qafka Robotics, Delft', body: 'Building production robotics with ROS2 and Docker. (Present)', kind: 'work' },
  { year: '2025', title: 'JunctionX Delft — 4th / 51', org: 'TU Delft challenge', body: 'A privacy-aware pipeline to detect hate/extremist speech in audio with precise timestamps.', kind: 'award' },
  { year: '2025', title: 'PIX-E — Junction 2025', org: 'Helsinki', body: 'A social companion robot for an aging population, built in 40 hours.', kind: 'award' },
  { year: '2025', title: 'Snap × 3EALITY AR Hackathon — 1st', org: 'Amsterdam', body: 'Hyrox AR coach with autopilot form-checking and a ghost-mode race.', kind: 'award' },
  { year: '2025', title: 'Publication — Supermarket Robot LLM Interface', org: 'Frontiers', body: 'An equitable, multi-level LLM conversational interface for diverse customer intents.', kind: 'research' },
  { year: '2025', title: 'FORGIS Physical AI Hackathon — 1st', org: 'Zurich', body: 'Vision-guided pick-and-place with AR oversight; demoed to Arduino’s Massimo Banzi.', kind: 'award' },
  { year: '2026', title: 'Builder in Residence', org: 'Alpine Valley, Vienna', body: 'Autonomous strawberry harvesting + VLA interpretability with a cohort of European builders.', kind: 'work' },
];

export const skills = {
  focus: ['Interpretable Embodied AI', 'Human–Robot Interaction', 'Control Theory', 'Robot Learning'],
  software: ['ROS / ROS2 & Gazebo', 'Python', 'C++ / C', 'Java', 'PyTorch', 'OpenCV', 'MuJoCo', 'Docker', 'MATLAB', 'CATIA', 'Arduino / ESP32'],
  competencies: ['Design & Analysis', 'Robotics Programming', 'Communication & Negotiation', 'Creativity & Innovation', 'Leadership & Management'],
};

export const education = [
  { school: 'TU Delft', degree: 'M.Sc. Robotics', years: '2022 – 2024' },
  { school: 'NIT Karnataka, Surathkal', degree: 'B.Tech, Mechanical Engineering · Minor in Management', years: '2018 – 2022 · 8.12/10' },
];
