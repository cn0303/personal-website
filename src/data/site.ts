// Site content: shared copy/data for Chandran's personal website.
// Projects are evidence for the larger narrative, not the narrative itself.

export const site = {
  name: 'Chandran Nandkumar',
  shortName: 'Chandran',
  role: 'Robotics & AI Engineer',
  company: 'Incoming Rapid Prototyping Engineer at Lely',
  location: 'Netherlands',
  // TODO: swap custom domain at deploy.
  email: 'chandran-nandkumar@gmail.com',
  resume: '/Chandran-Nandkumar-Resume.pdf',
  links: {
    linkedin: 'https://www.linkedin.com/in/chandran-nandkumar',
    github: 'https://github.com/cn0303',
    huggingface: 'https://huggingface.co/cn0303',
    lelab: 'https://github.com/huggingface/leLab',
    hackster: 'https://www.hackster.io/chandran0303cn',
    unspool: 'https://unspool.xyz',
  },
  tagline: 'Building toward interpretable, steerable embodied AI.',
  lede:
    'Professionally, I build real robotics systems. Independently, I am betting on the missing layer around embodied foundation models: interpretability, steerability, and reliability for robots that have to work outside clean lab conditions.',
};

// The "bets": what Chandran is building toward outside any one employer.
export const bets = [
  {
    n: '01',
    title: 'Classical reliability, foundation-model flexibility',
    body:
      'Classical robotics gives industry repeatability and fine-grained control in structured environments. VLAs and world models promise adaptability in messy environments. The interesting bridge is keeping the control and reliability while gaining the generality.',
  },
  {
    n: '02',
    title: 'Interpretability is only half the job',
    body:
      'It is not enough to know what a robot policy is doing. I care about whether we can expose useful handles inside the task - stages, failure modes, uncertainty, operator intent - and use them to steer the behavior without throwing away end-to-end learning.',
  },
  {
    n: '03',
    title: 'Reliability comes from supervision loops',
    body:
      'For embodied AI to work repeatedly in unstructured environments, humans need ways to inspect, intervene, correct, and trust the system. The long-term goal is robot autonomy that can be understood and steered well enough to become dependable.',
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
  links?: { label: string; href: string }[];
};

// Work / case studies: evidence for the trustworthy embodied intelligence story.
export const projects: Project[] = [
  {
    slug: 'alpine-valley-berry-harvesting',
    title: 'Alpine Valley: Berry-Harvesting VLA',
    year: '2026',
    context: 'Founder in Residence / Latent Robotics',
    oneLiner: 'Tried building an agri-robotics company, then found the deeper problem: controllable embodied AI.',
    summary:
      'At Alpine Valley, I worked on autonomous berry harvesting with SO-101 robot arms, SmolVLA, teleoperation datasets, HG-DAGGER, MuJoCo/RL experiments, foundation stereo, and end-to-end VLA training. The application was strawberry picking, but the pivot was technical: modern robot foundation models need better interpretability, steerability, and validation before they can become reliable deployment systems.',
    highlights: [
      'Fine-tuned SmolVLA on roughly 450 episodes for a physical test setup',
      'Demonstrated over 90% picking success on a fake-plant setup with silicon stems and plastic strawberries',
      'Explored teleoperation, policy training, HG-DAGGER, RL/MuJoCo, and classical decomposition around the learned policy',
      'Came away focused less on agriculture itself and more on steerable, reliable embodied AI',
    ],
    tags: ['VLA', 'Robot Learning', 'Teleoperation', 'Founder in Residence'],
    links: [
      {
        label: 'LinkedIn overview',
        href: 'https://www.linkedin.com/feed/update/urn:li:activity:7471295438575554561/',
      },
    ],
  },
  {
    slug: 'vla-interpretability-strawberry',
    title: 'VLA Interpretability for Strawberry Picking',
    year: '2026',
    context: 'Hugging Face technical blog',
    oneLiner: 'A supervision layer around a SmolVLA policy, built to make the rollout easier to inspect and steer.',
    summary:
      'After the berry-harvesting work, I wrote up the interpretability layer: unsupervised stage discovery, a left-to-right HMM, Viterbi smoothing, VLA hidden-feature probing, and a live rollout HUD. The point was not only to make the policy understandable, but to search for handles that could eventually make black-box robot behavior more steerable.',
    highlights: [
      'Used task stages as an interpretable structure over a learned manipulation policy',
      'Compared runtime signals from proprioception and VLA hidden representations',
      'Built the supervision layer as an observer first, not a controller',
      'Framed metrics carefully as evidence for observability, not finished scientific proof',
    ],
    tags: ['Interpretability', 'Steerability', 'SmolVLA', 'Robot Learning'],
    link: {
      label: 'Read the Hugging Face blog',
      href: 'https://huggingface.co/blog/cn0303/strawberry-pick-interpretability',
    },
    links: [
      {
        label: 'LinkedIn post',
        href: 'https://www.linkedin.com/feed/update/urn:li:activity:7465793781058113536/',
      },
    ],
  },
  {
    slug: 'lelab-open-source',
    title: 'Hugging Face LeLab Contributions',
    year: '2026',
    context: 'Open-source robotics tooling',
    oneLiner: 'My first serious open-source robotics contributions.',
    summary:
      'I have started contributing to LeLab, Hugging Face\'s browser UI around LeRobot workflows. The work spans bug fixes, features, setup, and usability improvements around robotics experimentation. I see this as part of the same thesis: if embodied AI is going to spread, the tooling has to make robots easier to configure, inspect, and iterate on.',
    highlights: [
      'Around six PRs merged, with more ongoing',
      'Contributed to bug fixes, features, robot setup, and workflow usability',
      'Open-source contribution, not employment or official affiliation with Hugging Face',
      'A practical entry point into the tooling layer around embodied AI',
    ],
    tags: ['Open Source', 'LeLab', 'LeRobot', 'Robotics Tooling'],
    link: { label: 'View LeLab', href: 'https://github.com/huggingface/leLab' },
  },
  {
    slug: 'fitcheck-hardware-understanding',
    title: 'FitCheck',
    year: '2026',
    context: 'Build Small Hackathon / Hugging Face Space',
    oneLiner: 'A hardware-understanding tool for deciding what AI workloads a machine can realistically run.',
    summary:
      'FitCheck came from the same instinct outside robotics: make complex systems easier to reason about. The project helps users connect a hardware setup to likely AI workloads, exposing memory, inference, quantization, and deployment constraints in a more approachable way.',
    highlights: [
      'Built a Hugging Face Space and technical writeup for the Build Small Hackathon',
      'Focused on memory limits, inference constraints, quantization, and practical deployment tradeoffs',
      'A non-robotics example of reducing cognitive friction around AI systems',
    ],
    tags: ['Hardware', 'AI Deployment', 'Hugging Face Space', 'Technical Writing'],
    link: {
      label: 'Read the FitCheck blog',
      href: 'https://huggingface.co/blog/build-small-hackathon/fitcheck',
    },
  },
  {
    slug: 'multi-llm-hri-thesis',
    title: 'Multi-LLM Interface for Supermarket Robots',
    year: '2024-2025',
    context: 'TU Delft MSc Robotics / Frontiers',
    oneLiner: 'A hierarchical conversational interface for helping people interact with service robots.',
    summary:
      'My master\'s work studied human-robot interaction through a multi-LLM conversational system for supermarket robots. It combined intent classification, retrieval-augmented generation, fine-tuning, speech interaction, and robot navigation integration. Looking back, it was an early version of the same question: how do humans supervise and communicate with robotic systems they cannot fully inspect?',
    highlights: [
      'Designed hierarchical routing between language models for different user intents',
      'Combined RAG, fine-tuning, query classification, and spoken interaction',
      'Connected language output to robot navigation and service-robot behavior',
      'Published in Frontiers in Robotics and AI in 2025',
    ],
    tags: ['HRI', 'LLM', 'RAG', 'Service Robots'],
    link: {
      label: 'Read the Frontiers paper',
      href: 'https://www.frontiersin.org/journals/robotics-and-ai/articles/10.3389/frobt.2025.1576348/full',
    },
  },
  {
    slug: 'forgis-physical-ai',
    title: 'Vision-Guided Pick-and-Place',
    year: '2025',
    context: 'FORGIS Physical AI Hackathon / Zurich',
    oneLiner: 'A fast prototype connecting vision, manipulation, calibration, and operator oversight.',
    summary:
      'At FORGIS, we built a vision-guided manipulation demo with a Dobot Nova 5: detect a pipe, pick it up, and place it into a box. We demoed it to Massimo Banzi, co-founder of Arduino. It was a compact example of the work I enjoy: build the perception-action loop, make the state legible, and get the robot to do the thing.',
    highlights: [
      'Trained an instance-segmentation model for pipe detection',
      'Calibrated global-to-robot frame transforms for grasping',
      'Executed grasp and placement behavior on a Dobot Nova 5',
      'Demoed the final system live and won 1st place',
    ],
    tags: ['Manipulation', 'Computer Vision', 'AR/XR', 'Rapid Prototyping'],
    award: '1st place',
    links: [
      {
        label: 'LinkedIn post',
        href: 'https://www.linkedin.com/feed/update/urn:li:activity:7434728207108440064/',
      },
    ],
  },
  {
    slug: 'hyrox-ar-coach',
    title: 'Hyrox AR Coach',
    year: '2025',
    context: 'Snap x 3EALITY Hackathon',
    oneLiner: 'An AR fitness prototype with a burpee counter, coaching flow, and final pitch.',
    summary:
      'At the Snap x 3EALITY hackathon, I helped build an AR fitness prototype for Hyrox-style workouts. My main contribution was the burpee counter; I also worked with the team on the settings and product flow, then pitched the prototype at the end. It is supporting evidence rather than the center of my thesis: fast, camera-facing prototypes around feedback, embodiment, and human interaction.',
    highlights: [
      'Built the burpee counter for the AR workout flow',
      'Contributed to settings and product flow with the team',
      'Pitched the final prototype',
      'A fast rep in camera-based interaction and human-facing feedback loops',
    ],
    tags: ['AR/XR', 'Computer Vision', 'Human-AI Interaction', 'Rapid Prototyping'],
    links: [
      {
        label: 'LinkedIn post',
        href: 'https://www.linkedin.com/feed/update/urn:li:activity:7406096263215030272/',
      },
      {
        label: 'Devpost',
        href: 'https://devpost.com/software/hyrox-ar',
      },
    ],
  },
  {
    slug: 'telosia-elderly-care-robot',
    title: 'Telosia Elderly-Care Robot',
    year: '2025',
    context: 'Junction Hackathon / Helsinki',
    oneLiner: 'A social robot prototype for elder-care assistance, built as a fast HRI proof of concept.',
    summary:
      'At Junction, I worked on an elderly-care robot concept and made the public project site. It belongs here as another rapid HRI prototype: taking a human problem, shaping the robot interaction, making the story legible, and getting a presentable demo together under hackathon constraints.',
    highlights: [
      'Built the public Telosia project site',
      'Worked on the care-robot concept, pitch, and HRI framing with the team',
      'Used the hackathon as a compressed test of robotics storytelling and prototyping',
      'Part of the broader run of physical AI and human-robot interface projects',
    ],
    tags: ['HRI', 'Social Robots', 'Rapid Prototyping', 'Robotics'],
    links: [
      {
        label: 'LinkedIn post',
        href: 'https://www.linkedin.com/feed/update/urn:li:activity:7397665161005932544/',
      },
      {
        label: 'Project site',
        href: 'https://www.telosia-robotics.com/',
      },
    ],
  },
  {
    slug: 'unspool',
    title: 'Unspool',
    year: '2024',
    context: 'Solo product / iOS + Android',
    oneLiner: 'A voice journaling app I designed, built, shipped, and got through both app stores myself.',
    summary:
      'Unspool was not a robotics project, and it did not become a huge consumer product. But it was important because I built the full thing end-to-end: voice capture, AI reflection, mood analysis, authentication, privacy, encryption, cloud sync, App Store review, and Play Store review. It proved I could take an idea all the way to a shipped product.',
    highlights: [
      'Designed and built the app single-handedly',
      'Shipped across iOS and Android with under 100 early users',
      'Combined voice capture, AI reflection, mood analysis, auth, and encrypted storage',
      'Another expression of the same interest: AI interfaces that reduce cognitive friction',
    ],
    tags: ['Voice', 'Human-AI Interaction', 'Mobile', 'Product'],
    link: { label: 'unspool.xyz', href: 'https://unspool.xyz' },
    links: [
      {
        label: 'LinkedIn launch',
        href: 'https://www.linkedin.com/feed/update/urn:li:activity:7423511496837734400/',
      },
    ],
  },
  {
    slug: 'early-mechatronics-writing',
    title: 'Early Mechatronics Projects & Writing',
    year: '2018-2022',
    context: 'Hackster / independent projects',
    oneLiner: 'Early robotics and mechatronics projects that collectively crossed 100k+ views.',
    summary:
      'Before the current embodied-AI direction became clear, I spent a lot of time building and writing about robotics and mechatronics projects. Those early posts were scrappier, but they were also proof that I liked making technical work public and useful for other people.',
    highlights: [
      'Published early robotics and mechatronics projects on Hackster',
      'Reached 100k+ cumulative views across the account',
      'Built the habit of documenting technical work in public',
    ],
    tags: ['Mechatronics', 'Technical Writing', 'Early Work'],
    link: { label: 'View Hackster', href: 'https://www.hackster.io/chandran0303cn' },
  },
];

export type TimelineEntry = {
  year: string;
  title: string;
  org?: string;
  body?: string;
  kind: 'education' | 'work' | 'award' | 'project' | 'research';
  link?: { label: string; href: string };
};

// Journey / timeline: first-person version of the convergence.
export const timeline: TimelineEntry[] = [
  {
    year: '2018-2022',
    title: 'I started with mechanical engineering',
    org: 'NITK Surathkal',
    body:
      'I came into robotics through mechanical engineering, powertrains, mechatronics, and the feeling that robots were the place where hardware, software, control, and people all met. I also started writing and publishing technical projects early, which later became a real habit.',
    kind: 'education',
  },
  {
    year: '2021',
    title: 'I published my first robotics paper independently',
    org: 'IEEE ICDTMRA',
    body:
      'This one was not a polished lab pipeline. I wrote and published a TurtleBot3 localization and navigation paper with two juniors, without a professor driving the work. It was scrappy, but it mattered because it made research feel like something I could initiate myself.',
    kind: 'research',
    link: {
      label: 'View IEEE paper',
      href: 'https://ieeexplore.ieee.org/abstract/document/9687937',
    },
  },
  {
    year: '2018-2022',
    title: 'I kept building and writing in public',
    org: 'Hackster',
    body:
      'My early Hackster projects were mechatronics-heavy and imperfect, but they crossed 100k+ cumulative views. That was one of the first signals that documenting technical work could create real surface area around what I was learning.',
    kind: 'project',
    link: { label: 'View Hackster', href: 'https://www.hackster.io/chandran0303cn' },
  },
  {
    year: '2022-2024',
    title: 'Robotics became HRI at TU Delft',
    org: 'MSc Robotics',
    body:
      'At TU Delft, I finished the robotics master\'s early, took extra coursework, and kept getting pulled toward human-robot interaction. The question was already forming: if robots are complex, how do people actually understand and work with them?',
    kind: 'education',
  },
  {
    year: '2024-2025',
    title: 'My thesis turned that into language interfaces',
    org: 'TU Delft / Frontiers',
    body:
      'For my master\'s work, I built a hierarchical multi-LLM conversational interface for supermarket robots. It used intent classification, RAG, fine-tuning, speech interaction, and robot navigation. It was HRI, but it was also an early version of my current obsession: making robot behavior easier for humans to supervise.',
    kind: 'research',
    link: {
      label: 'Read the Frontiers paper',
      href: 'https://www.frontiersin.org/journals/robotics-and-ai/articles/10.3389/frobt.2025.1576348/full',
    },
  },
  {
    year: '2024',
    title: 'I shipped Unspool end-to-end',
    org: 'Solo product',
    body:
      'Unspool was a voice journaling app, not robotics. Still, it mattered: I designed it, coded it, added auth/privacy/cloud sync, and got it through both app stores. It taught me the difference between having an idea and actually shipping the thing.',
    kind: 'project',
    link: { label: 'Visit Unspool', href: 'https://unspool.xyz' },
  },
  {
    year: '2024-2026',
    title: 'Qafka gave me real deployment instincts',
    org: 'Robotics & AI Engineer',
    body:
      'At Qafka, there was a robot, a hard physical problem, and an outcome to deliver. Without the usual academic padding, I had to make perception, control, state machines, embedded actuation, and safety logic work together. That changed how I think about robotics: reliability lives at the interfaces.',
    kind: 'work',
  },
  {
    year: '2025',
    title: 'I used hackathons as fast robotics labs',
    org: 'FORGIS / Snap / Junction',
    body:
      'The hackathons were not the identity, but they were useful reps. I built and pitched pieces of systems quickly: a Dobot pick-and-place demo, an AR Hyrox coach, and an elderly-care robot. They trained speed, taste, and the habit of getting a physical prototype to actually move.',
    kind: 'award',
  },
  {
    year: '2026',
    title: 'Alpine Valley became the pivot',
    org: 'Founder in Residence',
    body:
      'I tried building Latent Robotics around berry harvesting. We built a lot: SO-101 arms, teleoperation data, SmolVLA policies, HG-DAGGER, RL/MuJoCo experiments, and a fully automated fake-plant picking setup. But the sharper realization was not "I am an agri-tech founder." It was that embodied foundation models need interpretability and steerability before they can be trusted in the real world.',
    kind: 'work',
  },
  {
    year: '2026',
    title: 'The interpretability blog made the bet explicit',
    org: 'Hugging Face',
    body:
      'The strawberry-pick interpretability post was where the direction clicked: can we build observability layers around black-box robot policies, infer task stages, probe hidden representations, and eventually create handles for steering behavior?',
    kind: 'research',
    link: {
      label: 'Read the blog',
      href: 'https://huggingface.co/blog/cn0303/strawberry-pick-interpretability',
    },
  },
  {
    year: '2026',
    title: 'I started contributing to LeLab',
    org: 'Hugging Face open source',
    body:
      'LeLab became my first serious open-source robotics contribution path. The work is practical - bug fixes, features, setup, usability - but that is exactly why it matters. Better embodied-AI tooling makes experimentation easier to inspect and repeat.',
    kind: 'project',
    link: { label: 'View LeLab', href: 'https://github.com/huggingface/leLab' },
  },
  {
    year: 'Aug 2026',
    title: 'Next chapter: Lely',
    org: 'Rapid Prototyping Engineer',
    body:
      'At Lely, the role is broader than my independent research bet: rapid prototyping across electronics, software, AI/ML, mechanical systems, sensor fusion, and integrated prototypes. It is the professional next chapter; the interpretability and steerability thesis continues through my own research, writing, and open-source work.',
    kind: 'work',
  },
];

export const skills = {
  focus: [
    'Interpretable & Steerable Embodied AI',
    'Robot Learning & VLAs',
    'Real-world Robotics Reliability',
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
    'Policy supervision loops',
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

// Where I've worked, studied, competed, and contributed.
// `logo` entries have a monochrome SVG in /public/logos; the rest render as wordmarks.
export const affiliations: { name: string; logo?: string }[] = [
  { name: 'Qafka Robotics' },
  { name: 'Lely' },
  { name: 'TU Delft' },
  { name: 'NITK Surathkal' },
  { name: 'Hugging Face', logo: '/logos/huggingface.svg' },
  { name: 'Alpine Valley' },
  { name: 'Arduino', logo: '/logos/arduino.svg' },
  { name: 'Snap', logo: '/logos/snapchat.svg' },
  { name: 'IEEE', logo: '/logos/ieee.svg' },
  { name: 'Frontiers' },
  { name: 'Junction' },
];

// Per-project media. cover/gallery are filenames under src/assets/projects/<slug>/
// (resolved + optimized by Astro <Image>). video/poster are paths under /public.
export type ProjectMedia = {
  cover?: string;
  coverFit?: 'cover' | 'contain';
  gallery?: string[];
  video?: string;
  poster?: string;
};
export const projectMedia: Record<string, ProjectMedia> = {
  'alpine-valley-berry-harvesting': {
    cover: 'cover.png',
    video: '/media/irl-pickup.mp4',
    poster: '/media/irl-pickup-poster.png',
    gallery: ['g1.png', 'g2.png', 'g3.png', 'g4.png', 'g5.png'],
  },
  'vla-interpretability-strawberry': {
    cover: 'cover.png',
    video: '/media/brainmap.mp4',
    poster: '/media/brainmap-poster.png',
    gallery: ['fig1.png', 'fig2.png', 'fig3.png', 'fig4.png', 'fig5.png', 'fig6.png'],
  },
  'lelab-open-source': { cover: 'cover.png' },
  'fitcheck-hardware-understanding': { cover: 'cover.png' },
  'multi-llm-hri-thesis': { cover: 'cover.png', coverFit: 'contain' },
  'forgis-physical-ai': { cover: 'cover.png', video: '/media/forgis-demo.mp4', poster: '/media/forgis-poster.png' },
  'hyrox-ar-coach': { cover: 'cover.png' },
  'telosia-elderly-care-robot': { cover: 'cover.png', coverFit: 'contain', gallery: ['g1.png'] },
  unspool: { cover: 'cover.png' },
  'early-mechatronics-writing': { cover: 'cover.png' },
};
