// Site content: shared copy/data for Chandran's personal website.
// Projects are evidence for the larger narrative, not the narrative itself.

export const site = {
  name: 'Chandran Nandkumar',
  shortName: 'Chandran',
  role: 'Robotics & AI Engineer',
  company: 'Incoming Rapid Prototyping Engineer at Lely',
  location: 'Netherlands',
  // TODO: swap for real address + custom domain at deploy.
  email: 'hello@chandrannandkumar.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/chandran-nandkumar',
    // TODO: add real GitHub handle.
    github: 'https://github.com/',
    huggingface: 'https://huggingface.co/cn0303',
    unspool: 'https://unspool.xyz',
  },
  tagline: 'Building trustworthy embodied intelligence.',
  lede:
    'I work on robot learning, real-world autonomy, and the interpretability layers that help humans understand, trust, and supervise embodied AI systems.',
};

// The "bets": what Chandran is building toward.
export const bets = [
  {
    n: '01',
    title: 'Embodied AI needs a human layer',
    body:
      'Foundation models are making robots more flexible, but also harder to reason about. I am interested in the layer between black-box policy and physical deployment: supervision, observability, and trust calibration.',
  },
  {
    n: '02',
    title: 'Reliability is built at the interfaces',
    body:
      'Real robots fail where perception, control, navigation, embedded systems, and operators meet. My work keeps one foot in deployment reality: state machines, safety logic, latency, recovery, and the boring details that make autonomy usable.',
  },
  {
    n: '03',
    title: 'Interpretability should change what humans can do',
    body:
      'The goal is not a prettier dashboard. It is systems that help people understand what a robot is doing, why it might fail, when to intervene, and how to steer complex autonomy without needing to hold the whole model in their head.',
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

// Work / case studies: evidence for the trustworthy embodied intelligence story.
export const projects: Project[] = [
  {
    slug: 'vla-interpretability-strawberry',
    title: 'VLA Interpretability for Strawberry Picking',
    year: '2026',
    context: 'Alpine Valley / Hugging Face blog',
    oneLiner: 'A supervision layer around a SmolVLA-based robot policy, not just a robot picking fruit.',
    summary:
      'Fine-tuned SmolVLA on SO-101 strawberry-picking demonstrations, then built a post-training interpretability stack around the policy. The work combined unsupervised stage discovery, a left-to-right HMM, VLA feature probing, Viterbi smoothing, and a live rollout HUD to make a black-box robot policy more observable during execution.',
    highlights: [
      'Used strawberry picking as a manipulation testbed, not as the core career direction',
      'Built a runtime stage-estimation HUD around the policy rather than changing the controller',
      'Probed hidden representations to ask whether task stage was decodable inside the VLA',
      'Framed accuracy carefully as an internal-consistency signal unless human labels were available',
    ],
    tags: ['VLA', 'Interpretability', 'Robot Learning', 'Teleoperation'],
    link: {
      label: 'Read the Hugging Face blog',
      href: 'https://huggingface.co/blog/cn0303/strawberry-pick-interpretability',
    },
  },
  {
    slug: 'qafka-twistlock-autonomy',
    title: 'Autonomous Twistlock Handling at Qafka',
    year: '2024-2026',
    context: 'Robotics & AI Engineer',
    oneLiner: 'Real-world autonomy for a mobile robot in an industrial port environment.',
    summary:
      'Worked as the sole full-time software engineer on a mobile robot intended for autonomous twistlock handling. The role tied together perception, stereo vision, ROS2, Nav2, control, embedded actuation, safety behavior, and operator-facing recovery logic under physical deployment constraints.',
    highlights: [
      'Built YOLO-based perception for twistlock and corner-cast detection',
      'Worked with depth maps, point clouds, TF transforms, and 3D pose estimation',
      'Integrated ROS2, Nav2, state machines, PID control, and sensor feedback',
      'Implemented ESP32-based actuation logic, pause/resume behavior, and emergency handling',
    ],
    tags: ['ROS2', 'Computer Vision', 'Control', 'Industrial Robotics'],
  },
  {
    slug: 'lelab-open-source',
    title: 'Hugging Face LeLab Contributions',
    year: '2026',
    context: 'Open-source robotics tooling',
    oneLiner: 'Contributing to tools that make embodied AI experimentation easier to set up and understand.',
    summary:
      'Made open-source contributions around Hugging Face robotics tooling, with an emphasis on the practical surfaces that help more people collect data, configure robots, and run embodied AI experiments. This is community contribution work, not employment or official affiliation with Hugging Face.',
    highlights: [
      'Submitted and merged multiple pull requests in the robotics tooling ecosystem',
      'Focused on setup, usability, and experimentation workflows around LeLab-style robotics',
      'Treats tooling as part of the trust problem: people need to see and control the system they are building',
    ],
    tags: ['Open Source', 'Robotics Tooling', 'LeRobot', 'Embodied AI'],
  },
  {
    slug: 'hardware-understanding-space',
    title: 'Hardware Understanding Space',
    year: '2026',
    context: 'Build Small Hackathon / Hugging Face Space',
    oneLiner: 'A tool for reasoning about what AI workloads your hardware can realistically run.',
    summary:
      'Built a Hugging Face Space and technical writeup to help users understand practical hardware limits for AI workloads. The project explored chips, memory bottlenecks, inference constraints, quantization, and deployment tradeoffs, translating low-level constraints into usable decisions.',
    highlights: [
      'Helped users map use cases to realistic local hardware capabilities',
      'Studied memory, inference, quantization, and deployment bottlenecks',
      'Fits the broader theme of reducing cognitive friction around complex AI systems',
    ],
    tags: ['Hardware', 'AI Deployment', 'Hugging Face Space', 'Technical Writing'],
  },
  {
    slug: 'multi-llm-hri-thesis',
    title: 'Multi-LLM Interface for Supermarket Robots',
    year: '2024-2025',
    context: 'TU Delft MSc Robotics / HRI',
    oneLiner: 'A hierarchical conversational interface for helping people interact with service robots.',
    summary:
      'Built a multi-LLM conversational system for supermarket robots, combining query classification, retrieval-augmented generation, fine-tuning, speech and language interfaces, and robot navigation integration. The thesis was an early version of the same question: how do humans work with robotic systems that are too complex to fully reason about?',
    highlights: [
      'Designed hierarchical routing between language models for different user intents',
      'Combined RAG, fine-tuning, query classification, and spoken interaction',
      'Connected language output to robot navigation and service-robot behavior',
      'Supervised by Dr. Luka Peternel at TU Delft',
    ],
    tags: ['HRI', 'LLM', 'RAG', 'Service Robots'],
  },
  {
    slug: 'unspool',
    title: 'Unspool',
    year: '2024',
    context: 'Solo product / iOS + Android',
    oneLiner: 'A voice journaling app for turning spoken reflection into clearer personal narrative.',
    summary:
      'Built and shipped a voice-first journaling app with speech-to-text, LLM-assisted reflection, mood analysis, authentication, privacy, encryption, and cloud sync. It sits outside robotics, but carries the same underlying interest: AI interfaces that help humans clarify messy internal state.',
    highlights: [
      'Shipped across iOS and Android',
      'Combined voice capture, AI reflection, mood analysis, auth, and encrypted storage',
      'Explored how interface design can reduce cognitive friction rather than add another dashboard',
    ],
    tags: ['Voice', 'Human-AI Interaction', 'Mobile', 'Product'],
    link: { label: 'unspool.xyz', href: 'https://unspool.xyz' },
  },
  {
    slug: 'forgis-physical-ai',
    title: 'Vision-Guided Pick-and-Place',
    year: '2025',
    context: 'FORGIS Physical AI Hackathon / Zurich',
    oneLiner: 'A fast prototype connecting vision, manipulation, calibration, and operator oversight.',
    summary:
      'Built a vision-driven manipulation system that picked up a pipe and placed it into a basket, with an AR layer keeping the operator informed. Useful as a compact example of the preferred mode: build the whole perception-action loop, then expose enough state for humans to understand what is happening.',
    highlights: [
      'Trained an instance-segmentation model for pipe detection',
      'Calibrated global-to-robot frame transforms for grasping',
      'Executed grasp and hand-off behavior on a Dobot Nova 5',
      'Used Snap Spectacles AR and Gemini for live operator status',
    ],
    tags: ['Manipulation', 'Computer Vision', 'AR/XR', 'Rapid Prototyping'],
    award: '1st place',
  },
];

export type TimelineEntry = {
  year: string;
  title: string;
  org?: string;
  body?: string;
  kind: 'education' | 'work' | 'award' | 'project' | 'research';
};

// Journey / timeline: the convergence from mechanical systems to trustworthy embodied AI.
export const timeline: TimelineEntry[] = [
  {
    year: '2018-2022',
    title: 'B.Tech, Mechanical Engineering',
    org: 'NITK Surathkal / Minor in Management',
    body:
      'Built the mechanical foundation: robotics, powertrain work, technical writing, leadership, and the habit of seeing software, hardware, and people as one system.',
    kind: 'education',
  },
  {
    year: '2020-2022',
    title: 'Robotics Research Intern',
    org: 'IIT Bombay',
    body:
      'Worked on indoor localization and navigation, leading to a publication on TurtleBot3 simulation with real-time object detection.',
    kind: 'research',
  },
  {
    year: '2022-2024',
    title: 'MSc Robotics',
    org: 'TU Delft',
    body:
      'Completed the program early while taking extra coursework. Focused on control, computer vision, embodied AI, and human-robot interaction.',
    kind: 'education',
  },
  {
    year: '2024',
    title: 'Multi-LLM HRI Thesis',
    org: 'TU Delft / Dr. Luka Peternel',
    body:
      'Built a hierarchical conversational interface for supermarket robots with intent classification, RAG, fine-tuning, speech interaction, and navigation integration.',
    kind: 'research',
  },
  {
    year: '2024',
    title: 'Unspool',
    org: 'Solo product',
    body:
      'Shipped a voice journaling app across iOS and Android, exploring AI interfaces that help people clarify thought rather than simply automate tasks.',
    kind: 'project',
  },
  {
    year: '2024-2026',
    title: 'Robotics & AI Engineer',
    org: 'Qafka Robotics, Delft',
    body:
      'Learned real-world autonomy as the sole full-time software engineer on a mobile twistlock-handling robot: perception, ROS2, control, state machines, embedded actuation, and safety logic.',
    kind: 'work',
  },
  {
    year: '2025',
    title: 'Physical AI and HRI Prototypes',
    org: 'Zurich / Amsterdam / Helsinki hackathons',
    body:
      'Built fast robotics and interface prototypes, including vision-guided pick-and-place, AR coaching, and a social companion robot. Useful proof that rapid prototypes can still expose real system questions.',
    kind: 'award',
  },
  {
    year: '2026',
    title: 'Alpine Valley',
    org: 'Austria',
    body:
      'Spent an intensive robotics-builder residency on SO-101 arms, SmolVLA, teleoperation data, and strawberry-picking policies. The lasting direction was not agriculture; it was observability and supervision for embodied AI.',
    kind: 'work',
  },
  {
    year: '2026',
    title: 'Strawberry Pick Interpretability',
    org: 'Hugging Face technical blog',
    body:
      'Published work on a runtime supervision and interpretability layer around a SmolVLA policy, using stage discovery, HMM smoothing, VLA feature probing, and a live rollout HUD.',
    kind: 'research',
  },
  {
    year: '2026',
    title: 'Open-source Robotics Tooling',
    org: 'Hugging Face LeLab ecosystem',
    body:
      'Started contributing to open-source robotics tooling around setup, data collection, and embodied AI experimentation workflows.',
    kind: 'project',
  },
  {
    year: 'Aug 2026',
    title: 'Rapid Prototyping Engineer',
    org: 'Lely Future Tech Lab, Maassluis',
    body:
      'Next chapter: applying robotics and AI inside a mature industrial robotics environment while keeping personal research, writing, and open-source work independent.',
    kind: 'work',
  },
];

export const skills = {
  focus: [
    'Trustworthy Embodied AI',
    'Robot Learning & VLAs',
    'Interpretability & Supervision',
    'Human-Robot Interaction',
  ],
  software: [
    'ROS / ROS2',
    'Python',
    'C++ / C',
    'PyTorch',
    'OpenCV',
    'MuJoCo',
    'Docker',
    'Nav2',
    'YOLO',
    'Point Clouds',
    'ESP32',
    'RAG / LLM Tooling',
  ],
  competencies: [
    'Real-world robotics integration',
    'Rapid prototyping',
    'Perception-action systems',
    'Safety and recovery logic',
    'Technical writing',
    'Product and interface thinking',
  ],
};

export const education = [
  { school: 'TU Delft', degree: 'MSc Robotics / HRI and embodied AI systems', years: '2022-2024' },
  {
    school: 'NITK Surathkal',
    degree: 'BTech Mechanical Engineering / Minor in Management',
    years: '2018-2022',
  },
];
