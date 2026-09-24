export const COURSES = [
  {
    id: 'cs-101',
    title: 'Full-Stack Web Development Masterclass',
    category: 'Web Development',
    level: 'Beginner',
    duration: '12 Weeks',
    durationCategory: 'Long',
    price: 299,
    discountPrice: 199,
    rating: 4.9,
    reviewsCount: 342,
    studentsEnrolled: 2450,
    featured: true,
    popular: true,
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
    videoTrailer: 'https://www.w3schools.com/html/mov_bbb.mp4',
    instructor: {
      name: 'Dr. Sarah Jenkins',
      title: 'Senior Software Architect & Ex-Google Lead',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
      rating: 4.95,
      coursesCount: 8,
      studentsCount: 14500,
      bio: 'Dr. Sarah has over 15 years of industry experience leading distributed engineering teams and building high-scale web platforms.'
    },
    description: 'Master modern full-stack web development from scratch. Build real-world production web applications using React, Node.js, Express, PostgreSQL, and Tailwind CSS.',
    objectives: [
      'Build responsive, mobile-first web applications using React 18 & Tailwind CSS',
      'Design RESTful APIs and modern GraphQL backends with Node.js and Express',
      'Deploy full-stack applications to cloud environments with CI/CD pipelines',
      'Implement authentication, security best practices, and database optimization'
    ],
    requirements: [
      'Basic understanding of computers and browser navigation',
      'No prior programming experience required — we start from the absolute basics!',
      'A PC or Mac with at least 8GB RAM and internet access'
    ],
    certificateAvailable: true,
    syllabus: [
      {
        moduleTitle: 'Module 1: Modern Frontend Foundations',
        lessons: [
          { title: 'Introduction to HTML5 & Semantic Web', duration: '25 mins', type: 'video', preview: true },
          { title: 'Tailwind CSS Layout & Utility Classes', duration: '40 mins', type: 'video', preview: true },
          { title: 'CSS Flexbox & Grid Cheat Sheet', duration: '15 mins', type: 'pdf' },
          { title: 'Frontend Basics Assessment', duration: '20 mins', type: 'quiz' }
        ]
      },
      {
        moduleTitle: 'Module 2: Interactive React Applications',
        lessons: [
          { title: 'React Core Components, Props & State', duration: '45 mins', type: 'video', preview: false },
          { title: 'Hooks deep dive (useState, useEffect, useContext)', duration: '50 mins', type: 'video', preview: false },
          { title: 'Building a Dynamic E-Commerce Cart Project', duration: '60 mins', type: 'assignment' },
          { title: 'React State Management Quiz', duration: '20 mins', type: 'quiz' }
        ]
      },
      {
        moduleTitle: 'Module 3: Backend API & Database Architecture',
        lessons: [
          { title: 'Node.js Event Loop & Express Server Setup', duration: '35 mins', type: 'video', preview: false },
          { title: 'Database Design with PostgreSQL & Prisma ORM', duration: '55 mins', type: 'video', preview: false },
          { title: 'JWT Authentication & Security Best Practices', duration: '40 mins', type: 'pdf' }
        ]
      }
    ],
    quiz: {
      title: 'Sample Web Development Quiz',
      questions: [
        {
          id: 1,
          question: 'Which Hook in React is primarily used for handling side effects like data fetching?',
          options: ['useState', 'useEffect', 'useMemo', 'useRef'],
          correctAnswer: 1,
          explanation: 'useEffect is designed to handle asynchronous side-effects, DOM updates, and subscriptions in React components.'
        },
        {
          id: 2,
          question: 'What does CSS Tailwind @apply directive allow you to do?',
          options: ['Apply external JS plugins', 'Inline utility classes into custom CSS rules', 'Import fonts', 'Compile Python code'],
          correctAnswer: 1,
          explanation: '@apply lets you inline existing Tailwind utility classes into custom CSS classes.'
        },
        {
          id: 3,
          question: 'Which HTTP method is idempotent and recommended for updating existing resource data?',
          options: ['POST', 'PUT', 'CONNECT', 'TRACE'],
          correctAnswer: 1,
          explanation: 'PUT operations are idempotent, meaning multiple identical requests result in the same state.'
        }
      ]
    },
    faqs: [
      { question: 'Do I get lifetime access to course materials?', answer: 'Yes! Once enrolled, you enjoy unlimited lifetime access to all videos, project source code, and future course updates.' },
      { question: 'Is there a money-back guarantee?', answer: 'We offer a 100% 30-day money-back refund guarantee if you are not fully satisfied.' }
    ]
  },
  {
    id: 'cs-102',
    title: 'Modern Next.js 14 & React 19 Full-Stack Architecture',
    category: 'Web Development',
    level: 'Intermediate',
    duration: '10 Weeks',
    durationCategory: 'Medium',
    price: 329,
    discountPrice: 219,
    rating: 4.93,
    reviewsCount: 275,
    studentsEnrolled: 1890,
    featured: true,
    popular: true,
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    videoTrailer: 'https://www.w3schools.com/html/mov_bbb.mp4',
    instructor: {
      name: 'Dr. Sarah Jenkins',
      title: 'Senior Software Architect & Ex-Google Lead',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
      rating: 4.95,
      coursesCount: 8,
      studentsCount: 14500,
      bio: 'Dr. Sarah has over 15 years of industry experience leading distributed engineering teams.'
    },
    description: 'Master Next.js App Router, Server Actions, SSR, ISR, Turbopack, and Tailwind CSS. Build enterprise web apps with OAuth 2.0 authentication.',
    objectives: [
      'Build server-rendered Next.js 14 App Router applications',
      'Implement Server Actions for seamless client-server mutations',
      'Optimize Web Vitals, dynamic caching, and global CDN deployments'
    ],
    requirements: ['Solid JavaScript ES6+ fundamentals'],
    certificateAvailable: true,
    syllabus: [],
    quiz: null,
    faqs: []
  },
  {
    id: 'ai-201',
    title: 'Applied AI & Machine Learning Specialization',
    category: 'Artificial Intelligence',
    level: 'Intermediate',
    duration: '10 Weeks',
    durationCategory: 'Medium',
    price: 499,
    discountPrice: 349,
    rating: 4.95,
    reviewsCount: 512,
    studentsEnrolled: 3100,
    featured: true,
    popular: true,
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80',
    videoTrailer: 'https://www.w3schools.com/html/mov_bbb.mp4',
    instructor: {
      name: 'Prof. Marcus Vance',
      title: 'AI Researcher & Director of Intelligence Lab',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      rating: 4.98,
      coursesCount: 5,
      studentsCount: 18900,
      bio: 'Prof. Vance specializes in Deep Neural Networks, Large Language Models, and Computer Vision algorithm deployment.'
    },
    description: 'Build and deploy cutting-edge Machine Learning models using Python, PyTorch, Scikit-Learn, Hugging Face Transformers, and MLOps platforms.',
    objectives: [
      'Master Supervised & Unsupervised Machine Learning algorithms with Scikit-Learn',
      'Build Neural Networks and Convolutional Architectures with PyTorch',
      'Fine-tune Large Language Models (LLMs) and build Retrieval-Augmented Generation (RAG) applications',
      'Deploy scalable ML models to AWS/GCP with Docker and FastAPI'
    ],
    requirements: [
      'Basic Python programming knowledge (loops, functions, data structures)',
      'Basic linear algebra fundamentals'
    ],
    certificateAvailable: true,
    syllabus: [],
    quiz: null,
    faqs: []
  },
  {
    id: 'ai-202',
    title: 'Generative AI Engineering & Multi-Agent Systems',
    category: 'Artificial Intelligence',
    level: 'Advanced',
    duration: '8 Weeks',
    durationCategory: 'Medium',
    price: 549,
    discountPrice: 399,
    rating: 4.97,
    reviewsCount: 388,
    studentsEnrolled: 2150,
    featured: true,
    popular: true,
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    videoTrailer: 'https://www.w3schools.com/html/mov_bbb.mp4',
    instructor: {
      name: 'Prof. Marcus Vance',
      title: 'AI Researcher & Director of Intelligence Lab',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      rating: 4.98,
      coursesCount: 5,
      studentsCount: 18900,
      bio: 'Prof. Vance specializes in Deep Neural Networks and Autonomous Agents.'
    },
    description: 'Build autonomous AI agents using LangChain, CrewAI, AutoGen, and OpenAI APIs. Implement vector embeddings, Pinecone, and function calling.',
    objectives: [
      'Architect autonomous multi-agent workflows for enterprise tasks',
      'Implement semantic search with Pinecone & Chroma vector databases',
      'Deploy local LLM inference engines with Llama 3 and vLLM'
    ],
    requirements: ['Intermediate Python proficiency'],
    certificateAvailable: true,
    syllabus: [],
    quiz: null,
    faqs: []
  },
  {
    id: 'ds-301',
    title: 'Data Science & Advanced Analytics Bootcamp',
    category: 'Data Science',
    level: 'Beginner',
    duration: '8 Weeks',
    durationCategory: 'Medium',
    price: 349,
    discountPrice: 249,
    rating: 4.88,
    reviewsCount: 289,
    studentsEnrolled: 1820,
    featured: true,
    popular: false,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    videoTrailer: 'https://www.w3schools.com/html/mov_bbb.mp4',
    instructor: {
      name: 'Elena Rostova',
      title: 'Principal Data Scientist at FinTech Solutions',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
      rating: 4.91,
      coursesCount: 4,
      studentsCount: 9800,
      bio: 'Elena has led analytics teams across banking and retail e-commerce, visualizing multi-terabyte datasets.'
    },
    description: 'Transform raw data into actionable strategic insights. Learn Pandas, SQL, Tableau, Matplotlib, Seaborn, and Predictive Modeling.',
    objectives: [
      'Perform data wrangling and cleaning on complex real-world datasets',
      'Write advanced SQL queries, window functions, and database joins',
      'Create executive dashboards using Tableau & Power BI'
    ],
    requirements: ['No prior experience needed. Basic mathematical intuition is helpful.'],
    certificateAvailable: true,
    syllabus: [],
    quiz: null,
    faqs: []
  },
  {
    id: 'ux-401',
    title: 'UI/UX Design Masterclass & Product Strategy',
    category: 'UI/UX Design',
    level: 'Beginner',
    duration: '6 Weeks',
    durationCategory: 'Medium',
    price: 249,
    discountPrice: 179,
    rating: 4.92,
    reviewsCount: 198,
    studentsEnrolled: 1450,
    featured: true,
    popular: true,
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop&q=80',
    videoTrailer: 'https://www.w3schools.com/html/mov_bbb.mp4',
    instructor: {
      name: 'David Kim',
      title: 'Lead Product Designer at DesignStudio',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
      rating: 4.89,
      coursesCount: 3,
      studentsCount: 6700,
      bio: 'David has created award-winning mobile & web experiences for Fortune 500 tech companies.'
    },
    description: 'Learn wireframing, interactive prototyping, user research methodologies, design systems, and Figma component libraries.',
    objectives: [
      'Conduct user interviews, persona mapping, and usability testing',
      'Create high-fidelity interactive prototypes in Figma',
      'Build scalable design systems with autolayout and design tokens'
    ],
    requirements: ['Figma free account installed on your laptop'],
    certificateAvailable: true,
    syllabus: [],
    quiz: null,
    faqs: []
  },
  {
    id: 'cs-501',
    title: 'Cybersecurity & Ethical Hacking Professional',
    category: 'Cybersecurity',
    level: 'Advanced',
    duration: '14 Weeks',
    durationCategory: 'Long',
    price: 599,
    discountPrice: 429,
    rating: 4.96,
    reviewsCount: 410,
    studentsEnrolled: 1950,
    featured: true,
    popular: true,
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80',
    videoTrailer: 'https://www.w3schools.com/html/mov_bbb.mp4',
    instructor: {
      name: 'Alex Thorne',
      title: 'Certified Ethical Hacker & Defense Specialist',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      rating: 4.97,
      coursesCount: 6,
      studentsCount: 12100,
      bio: 'Alex consults with leading financial organizations to audit network infrastructure and patch vulnerabilities.'
    },
    description: 'Master penetration testing, network defense, threat hunting, web application auditing, and incident response handling.',
    objectives: [
      'Perform vulnerability assessment using Wireshark, Nmap, and Metasploit',
      'Audit web application security against OWASP Top 10 vulnerabilities',
      'Implement zero-trust enterprise security architectures'
    ],
    requirements: ['Solid understanding of networking concepts (TCP/IP, DNS, OSI model)'],
    certificateAvailable: true,
    syllabus: [],
    quiz: null,
    faqs: []
  },
  {
    id: 'cs-502',
    title: 'Cloud Network Defense & Threat Intelligence Specialist',
    category: 'Cybersecurity',
    level: 'Intermediate',
    duration: '10 Weeks',
    durationCategory: 'Medium',
    price: 499,
    discountPrice: 349,
    rating: 4.94,
    reviewsCount: 310,
    studentsEnrolled: 1620,
    featured: true,
    popular: true,
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80',
    videoTrailer: 'https://www.w3schools.com/html/mov_bbb.mp4',
    instructor: {
      name: 'Alex Thorne',
      title: 'Certified Ethical Hacker & Defense Specialist',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      rating: 4.97,
      coursesCount: 6,
      studentsCount: 12100,
      bio: 'Alex consults with leading financial organizations to audit network infrastructure.'
    },
    description: 'Learn SOC monitoring, SIEM log analysis with Splunk, intrusion detection systems, malware analysis, and cloud firewall rules.',
    objectives: [
      'Deploy Splunk & Elastic SIEM dashboards for security log analysis',
      'Configure AWS Security Groups, IAM policies, and VPC Network ACLs'
    ],
    requirements: ['Basic Linux command line knowledge'],
    certificateAvailable: true,
    syllabus: [],
    quiz: null,
    faqs: []
  },
  {
    id: 'cloud-701',
    title: 'Cloud Native DevOps & Kubernetes Masterclass',
    category: 'Cloud Computing',
    level: 'Intermediate',
    duration: '10 Weeks',
    durationCategory: 'Medium',
    price: 449,
    discountPrice: 299,
    rating: 4.91,
    reviewsCount: 260,
    studentsEnrolled: 1780,
    featured: true,
    popular: true,
    thumbnail: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&auto=format&fit=crop&q=80',
    videoTrailer: 'https://www.w3schools.com/html/mov_bbb.mp4',
    instructor: {
      name: 'Vikram Patel',
      title: 'Principal DevOps Architect at CloudScale',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
      rating: 4.94,
      coursesCount: 4,
      studentsCount: 8900,
      bio: 'Vikram specializes in Kubernetes cluster orchestration, Terraform infrastructure-as-code, and GitOps.'
    },
    description: 'Master Docker containerization, Kubernetes cluster management, Helm charts, Terraform IaC, and GitHub Actions CI/CD pipelines.',
    objectives: [
      'Containerize microservices with Docker and multi-stage builds',
      'Manage production Kubernetes (EKS/GKE) clusters with Helm & ArgoCD'
    ],
    requirements: ['Basic Linux system administration skills'],
    certificateAvailable: true,
    syllabus: [],
    quiz: null,
    faqs: []
  },
  {
    id: 'biz-601',
    title: 'Digital Marketing & Growth Hacking Executive',
    category: 'Business',
    level: 'Beginner',
    duration: '4 Weeks',
    durationCategory: 'Short',
    price: 199,
    discountPrice: 129,
    rating: 4.79,
    reviewsCount: 156,
    studentsEnrolled: 1100,
    featured: false,
    popular: false,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    videoTrailer: 'https://www.w3schools.com/html/mov_bbb.mp4',
    instructor: {
      name: 'Jessica Taylor',
      title: 'Chief Marketing Officer at ScaleUp Media',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
      rating: 4.82,
      coursesCount: 5,
      studentsCount: 8400,
      bio: 'Jessica has scaled multi-million dollar ad campaigns across Meta, Google, TikTok, and SEO channels.'
    },
    description: 'Learn SEO, PPC ads, funnel optimization, email automation, content strategy, and digital brand building.',
    objectives: [
      'Execute high-converting Google Ads and Meta ad campaigns',
      'Optimize websites for organic search engines (Technical & On-page SEO)'
    ],
    requirements: ['Basic social media familiarity'],
    certificateAvailable: true,
    syllabus: [],
    quiz: null,
    faqs: []
  },
  {
    id: 'bc-801',
    title: 'Blockchain Architecture, Solidity & Web3 Smart Contracts',
    category: 'Web Development',
    level: 'Intermediate',
    duration: '10 Weeks',
    durationCategory: 'Medium',
    price: 499,
    discountPrice: 349,
    rating: 4.96,
    reviewsCount: 312,
    studentsEnrolled: 1650,
    featured: true,
    popular: true,
    thumbnail: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop&q=80',
    videoTrailer: 'https://www.w3schools.com/html/mov_bbb.mp4',
    instructor: {
      name: 'Elena Chen',
      title: 'Senior Blockchain Architect & Web3 Protocol Lead',
      avatar: 'https://images.unsplash.com/photo-1580894732473-b24d7cb0f19c?w=400&auto=format&fit=crop&q=80',
      rating: 4.94,
      coursesCount: 3,
      studentsCount: 7800,
      bio: 'Elena has engineered DeFi protocols and smart contract infrastructure securing over $50M in TVL.'
    },
    description: 'Master Ethereum Virtual Machine (EVM), Solidity programming, Hardhat, Ethers.js, and decentralized dApp frontend architecture.',
    objectives: [
      'Write gas-optimized, secure Solidity smart contracts and ERC standards (ERC-20, ERC-721)',
      'Conduct security audits against reentrancy, integer overflows, and front-running vulnerabilities',
      'Build end-to-end full-stack Web3 dApps integrating MetaMask and IPFS storage'
    ],
    requirements: ['Solid JavaScript or TypeScript fundamentals'],
    certificateAvailable: true,
    syllabus: [],
    quiz: null,
    faqs: []
  },
  {
    id: 'mob-901',
    title: 'Cross-Platform Mobile App Development with Flutter & Dart',
    category: 'Web Development',
    level: 'Beginner',
    duration: '8 Weeks',
    durationCategory: 'Medium',
    price: 379,
    discountPrice: 249,
    rating: 4.92,
    reviewsCount: 220,
    studentsEnrolled: 1420,
    featured: true,
    popular: false,
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80',
    videoTrailer: 'https://www.w3schools.com/html/mov_bbb.mp4',
    instructor: {
      name: 'Liam Gallagher',
      title: 'Principal Mobile Engineer at AppCraft Studio',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
      rating: 4.9,
      coursesCount: 4,
      studentsCount: 6500,
      bio: 'Liam has shipped top-rated iOS and Android applications with over 5 million combined downloads.'
    },
    description: 'Build native iOS and Android apps from a single codebase using Flutter 3 and Dart. Master Riverpod state management and Firebase integration.',
    objectives: [
      'Design fluid, native-feel UI animations and responsive mobile layouts with Flutter',
      'Implement global state management using Riverpod and BLoC pattern',
      'Integrate Firebase Authentication, Cloud Firestore, and push notification services'
    ],
    requirements: ['Basic programming concepts (OOP principles are helpful)'],
    certificateAvailable: true,
    syllabus: [],
    quiz: null,
    faqs: []
  },
  {
    id: 'qc-1001',
    title: 'Quantum Computing Algorithms & Qiskit Programming',
    category: 'Artificial Intelligence',
    level: 'Advanced',
    duration: '6 Weeks',
    durationCategory: 'Medium',
    price: 599,
    discountPrice: 449,
    rating: 4.98,
    reviewsCount: 185,
    studentsEnrolled: 980,
    featured: true,
    popular: true,
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=80',
    videoTrailer: 'https://www.w3schools.com/html/mov_bbb.mp4',
    instructor: {
      name: 'Dr. Aris Thorne',
      title: 'Quantum Research Fellow & Theoretical Physicist',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
      rating: 4.97,
      coursesCount: 2,
      studentsCount: 3400,
      bio: 'Dr. Thorne investigates quantum teleportation circuits, Shor algorithm optimizations, and NISQ-era quantum simulators.'
    },
    description: 'Explore quantum mechanics principles, qubits, quantum gates, entanglement, and write quantum algorithms using IBM Qiskit.',
    objectives: [
      'Construct quantum circuits with Hadamard, CNOT, and Phase shift gates',
      'Implement Grover search algorithm and Quantum Fourier Transform (QFT)',
      'Run quantum circuits on simulated backends and real IBM Quantum cloud hardware'
    ],
    requirements: ['Linear algebra (matrices, vectors) and intermediate Python skills'],
    certificateAvailable: true,
    syllabus: [],
    quiz: null,
    faqs: []
  },
  {
    id: 'game-1101',
    title: 'Unreal Engine 5 & C++ AAA Game Development Masterclass',
    category: 'UI/UX Design',
    level: 'Intermediate',
    duration: '12 Weeks',
    durationCategory: 'Long',
    price: 499,
    discountPrice: 329,
    rating: 4.95,
    reviewsCount: 295,
    studentsEnrolled: 1880,
    featured: true,
    popular: true,
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
    videoTrailer: 'https://www.w3schools.com/html/mov_bbb.mp4',
    instructor: {
      name: 'Mateo Rossi',
      title: 'Technical Director & AAA Game Programmer',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
      rating: 4.93,
      coursesCount: 3,
      studentsCount: 9200,
      bio: 'Mateo has worked on commercial console and PC titles, specializing in Unreal C++ gameplay systems and Lumen lighting.'
    },
    description: 'Master Unreal Engine 5, C++ gameplay architecture, Blueprint visual scripting, Nanite virtualized geometry, Lumen real-time lighting, and physics simulation.',
    objectives: [
      'Program responsive player controllers, combat systems, and AI behavior trees in C++',
      'Harness UE5 Lumen global illumination and Nanite geometry for photorealistic scenes',
      'Optimize game performance with Unreal Insights profiling tools and package for Steam release'
    ],
    requirements: ['Basic C++ programming experience or strong OOP background'],
    certificateAvailable: true,
    syllabus: [],
    quiz: null,
    faqs: []
  },
  {
    id: 'iot-1201',
    title: 'Embedded Systems, IoT & Autonomous Robotics Engineering',
    category: 'Data Science',
    level: 'Advanced',
    duration: '10 Weeks',
    durationCategory: 'Medium',
    price: 529,
    discountPrice: 389,
    rating: 4.91,
    reviewsCount: 174,
    studentsEnrolled: 1120,
    featured: false,
    popular: true,
    thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80',
    videoTrailer: 'https://www.w3schools.com/html/mov_bbb.mp4',
    instructor: {
      name: 'Dr. Kenji Sato',
      title: 'Chief Robotics Scientist at CyberDyne Systems',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&auto=format&fit=crop&q=80',
      rating: 4.92,
      coursesCount: 4,
      studentsCount: 5600,
      bio: 'Dr. Sato develops micro-controller firmware, ROS2 autonomous navigation stacks, and real-time sensor fusion systems.'
    },
    description: 'Learn embedded C/C++, ESP32 microcontroller programming, ROS2 (Robot Operating System), LiDAR sensor fusion, and MQTT cloud telemetry.',
    objectives: [
      'Write real-time firmware for ESP32 and ARM Cortex microcontrollers',
      'Implement autonomous robot mapping and pathfinding using ROS2 & SLAM',
      'Transmit real-time telemetry sensor data to AWS IoT Core and build dashboard monitors'
    ],
    requirements: ['C/C++ basics and familiarity with electronic components'],
    certificateAvailable: true,
    syllabus: [],
    quiz: null,
    faqs: []
  },
  {
    id: 'cloud-702',
    title: 'AWS & Azure Multi-Cloud Solutions Architect Certification',
    category: 'Cloud Computing',
    level: 'Advanced',
    duration: '12 Weeks',
    durationCategory: 'Long',
    price: 549,
    discountPrice: 399,
    rating: 4.96,
    reviewsCount: 380,
    studentsEnrolled: 2300,
    featured: true,
    popular: true,
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    videoTrailer: 'https://www.w3schools.com/html/mov_bbb.mp4',
    instructor: {
      name: 'Priya Nair',
      title: 'Enterprise Multi-Cloud Enterprise Architect',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop&q=80',
      rating: 4.95,
      coursesCount: 5,
      studentsCount: 16200,
      bio: 'Priya advises Fortune 100 enterprises on high-availability cloud migration, disaster recovery, and serverless architectures.'
    },
    description: 'Comprehensive preparation for AWS Solutions Architect Associate & Azure Solutions Architect Expert. Design fault-tolerant, secure, scalable cloud ecosystems.',
    objectives: [
      'Design high-availability multi-region cloud architectures across AWS and Azure',
      'Implement serverless event-driven systems with AWS Lambda and Azure Functions',
      'Configure enterprise identity federation, encryption-at-rest, and hybrid cloud networking'
    ],
    requirements: ['Foundational IT infrastructure or networking experience'],
    certificateAvailable: true,
    syllabus: [],
    quiz: null,
    faqs: []
  }
];

export const FACULTY = [
  {
    id: 1,
    name: 'Dr. Sarah Jenkins',
    role: 'Head of Computer Science & Web Architecture',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    experience: '15+ Years',
    specialization: 'Full-Stack Engineering, Cloud Architecture',
    rating: 4.95,
    bio: 'Former Tech Lead at Google. Passionate about empowering students with industry-relevant full-stack software development skills.',
    coursesTaught: ['Full-Stack Web Development Masterclass', 'Modern Next.js 14 Full-Stack']
  },
  {
    id: 2,
    name: 'Prof. Marcus Vance',
    role: 'Director of AI & Neural Systems Lab',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&auto=format&fit=crop&q=80',
    experience: '12+ Years',
    specialization: 'Deep Learning, NLP, Generative AI',
    rating: 4.98,
    bio: 'Stanford PhD alum conducting groundbreaking research on Large Language Model optimization and Computer Vision applications.',
    coursesTaught: ['Applied AI & Machine Learning', 'Generative AI & LLM Engineering']
  },
  {
    id: 3,
    name: 'Elena Rostova',
    role: 'Lead Data Science Instructor',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    experience: '10+ Years',
    specialization: 'Big Data Analytics, SQL, Predictive Modeling',
    rating: 4.91,
    bio: 'Data Science strategist with background in quantitative finance and predictive analytics for international banking platforms.',
    coursesTaught: ['Data Science & Advanced Analytics Bootcamp']
  },
  {
    id: 4,
    name: 'Alex Thorne',
    role: 'Chief Cybersecurity Auditor',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
    experience: '14+ Years',
    specialization: 'Penetration Testing, Ethical Hacking',
    rating: 4.97,
    bio: 'Certified Security Specialist who has trained over 10,000 security professionals and audited enterprise networks.',
    coursesTaught: ['Cybersecurity & Ethical Hacking Professional', 'Cloud Network Defense']
  }
];

export const UPCOMING_BATCHES = [
  {
    id: 'b-101',
    courseId: 'cs-101',
    courseTitle: 'Full-Stack Web Development Masterclass',
    startDate: 'October 15, 2026',
    schedule: 'Mon & Wed (6:00 PM - 8:30 PM EST)',
    mode: 'Live Hybrid',
    totalSeats: 30,
    availableSeats: 4,
    instructor: 'Dr. Sarah Jenkins'
  },
  {
    id: 'b-201',
    courseId: 'ai-201',
    courseTitle: 'Applied AI & Machine Learning Specialization',
    startDate: 'November 1, 2026',
    schedule: 'Tue & Thu (7:00 PM - 9:30 PM EST)',
    mode: 'Online Interactive',
    totalSeats: 25,
    availableSeats: 2,
    instructor: 'Prof. Marcus Vance'
  },
  {
    id: 'b-301',
    courseId: 'ds-301',
    courseTitle: 'Data Science & Advanced Analytics Bootcamp',
    startDate: 'November 10, 2026',
    schedule: 'Saturdays (10:00 AM - 4:00 PM EST)',
    mode: 'Weekend Intensive',
    totalSeats: 35,
    availableSeats: 9,
    instructor: 'Elena Rostova'
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Michael Chang',
    role: 'Software Engineer at Amazon',
    course: 'Full-Stack Web Development',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
    quote: 'The hands-on project curriculum at Academy completely changed my career trajectory. Within 2 months of graduation, I landed my dream role!',
    rating: 5,
    salaryIncrease: '+140% Salary Hike'
  },
  {
    id: 2,
    name: 'Sophia Martinez',
    role: 'AI Research Associate at OpenAI',
    course: 'Applied AI & ML Specialization',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
    quote: 'The depth of knowledge from Prof. Vance and real GPU lab projects gave me the technical confidence to crack complex AI interviews.',
    rating: 5,
    salaryIncrease: 'Placed at OpenAI'
  },
  {
    id: 3,
    name: 'David Reynolds',
    role: 'Data Analyst at Microsoft',
    course: 'Data Science Bootcamp',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80',
    quote: 'From learning basic SQL queries to delivering executive dashboards, the mentorship support was unparalleled.',
    rating: 5,
    salaryIncrease: '+95% Career Boost'
  },
  {
    id: 4,
    name: 'Aisha Patel',
    role: 'SOC Security Analyst at CrowdStrike',
    course: 'Cybersecurity Specialization',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&auto=format&fit=crop&q=80',
    quote: 'The ethical hacking penetration testing labs were identical to real enterprise environments. I felt 100% prepared on day one.',
    rating: 5,
    salaryIncrease: '+110% Salary Hike'
  }
];

export const ACHIEVEMENTS_STATS = [
  { metric: '15,000+', label: 'Graduated Alumni', description: 'Working across 500+ leading tech hubs' },
  { metric: '96.4%', label: 'Career Placement Rate', description: 'Hired within 180 days of course graduation' },
  { metric: '48+', label: 'Industry Specialized Courses', description: 'Curated by senior tech executives' },
  { metric: '$115,000', label: 'Average Graduate Salary', description: 'Across software & AI job disciplines' }
];

export const AFFILIATIONS = [
  { name: 'Google Cloud Partner', category: 'Cloud' },
  { name: 'AWS EdTech Academy', category: 'Cloud' },
  { name: 'Microsoft Learn Partner', category: 'Software' },
  { name: 'CompTIA Authorized Partner', category: 'Cybersecurity' },
  { name: 'Cisco Networking Academy', category: 'Infrastructure' },
  { name: 'IBM SkillsBuild Alliance', category: 'AI & Data' },
  { name: 'Meta Tech Education Partner', category: 'Frontend' },
  { name: 'NVIDIA Deep Learning Institute', category: 'AI & ML' },
  { name: 'Oracle Academy Member', category: 'Database' },
  { name: 'Salesforce Trailhead Academic', category: 'CRM' }
];

export const UPCOMING_EVENTS = [
  {
    id: 'ev-1',
    title: 'Future of Generative AI & Autonomous Agents Webinar',
    date: 'October 28, 2026',
    time: '4:00 PM EST',
    duration: '90 Mins',
    speaker: 'Prof. Marcus Vance',
    speakerRole: 'Director of AI & Neural Systems Lab',
    category: 'Webinar',
    location: 'Live on Zoom & Q&A',
    seatsLeft: '180+ Registered',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&auto=format&fit=crop&q=80',
    description: 'Discover how multi-agent frameworks are revolutionizing enterprise automation, local LLM fine-tuning, and tool-augmented reasoning.',
    takeaways: ['Multi-agent orchestration architectures', 'Prompt routing & autonomous tool-calling', 'Local model deployment with Ollama']
  },
  {
    id: 'ev-2',
    title: 'Hands-on Workshop: Microservices & Docker Containerization',
    date: 'November 04, 2026',
    time: '10:00 AM - 1:00 PM EST',
    duration: '3 Hours (Lab)',
    speaker: 'Dr. Sarah Jenkins',
    speakerRole: 'Head of Computer Science & Web Architecture',
    category: 'Workshop',
    location: 'Campus Lab 2 & Virtual Stream',
    seatsLeft: '8 Seats Left',
    image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=600&auto=format&fit=crop&q=80',
    description: 'A code-along interactive workshop where every participant builds, containerizes, and deploys a distributed multi-service app with Docker Compose.',
    takeaways: ['Containerizing Node & Python microservices', 'Docker Compose network orchestration', 'Zero-downtime rolling updates']
  },
  {
    id: 'ev-3',
    title: 'Academy Hackathon 2026: Build for Social Impact',
    date: 'November 15-17, 2026',
    time: '48-Hour Hybrid Event',
    duration: '48 Hours',
    speaker: 'Academy Tech & Venture Board',
    speakerRole: 'Industry Judges & Mentors',
    category: 'Hackathon',
    location: 'Main Auditorium & Discord',
    seatsLeft: 'Open Registration',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=80',
    description: 'Compete for $50,000 in cash prizes, cloud credits, and direct incubator funding for your innovative open-source applications.',
    takeaways: ['$50,000 Total Prize Pool', 'Mentorship from senior Silicon Valley engineers', 'Direct investor pitch opportunities']
  },
  {
    id: 'ev-4',
    title: 'Live Demo Class: Zero-Day Ethical Hacking & Penetration Testing',
    date: 'November 22, 2026',
    time: '5:30 PM - 7:00 PM EST',
    duration: '90 Mins',
    speaker: 'David Chen',
    speakerRole: 'Lead Security Researcher & OSCP Trainer',
    category: 'Demo Class',
    location: 'Cyber Range Simulator (Online)',
    seatsLeft: '14 Seats Left',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80',
    description: 'Watch a live red-team penetration test against a simulated corporate environment, followed by defensive blue-team hardening techniques.',
    takeaways: ['Live vulnerability discovery with Wireshark & Burp', 'Exploiting SQL injection & buffer overflows', 'Setting up automated IDS/IPS rules']
  },
  {
    id: 'ev-5',
    title: 'Career Seminar: FAANG System Design & Tech Resume Teardown',
    date: 'December 02, 2026',
    time: '2:00 PM - 4:00 PM EST',
    duration: '2 Hours',
    speaker: 'Elena Rostova',
    speakerRole: 'Staff Systems Engineer & Hiring Mentor',
    category: 'Career Seminar',
    location: 'Nexus Studio & Zoom',
    seatsLeft: '22 Seats Left',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&auto=format&fit=crop&q=80',
    description: 'Interactive session covering high-throughput distributed system interview questions and live resume feedback to pass automated ATS filters.',
    takeaways: ['Designing scalable systems (Caching, Sharding, CDNs)', 'Resume teardowns that land interviews', 'Navigating salary negotiations']
  },
  {
    id: 'ev-6',
    title: 'Design Systems Workshop: From Figma Variables to React Tokens',
    date: 'December 09, 2026',
    time: '11:00 AM - 1:30 PM EST',
    duration: '2.5 Hours (Lab)',
    speaker: 'Maya Lin',
    speakerRole: 'Principal Product Designer',
    category: 'Workshop',
    location: 'Design Lab & Google Meet',
    seatsLeft: '11 Seats Left',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80',
    description: 'Bridge the gap between design and engineering. Build scalable multi-theme Figma design tokens and map them seamlessly to Tailwind CSS.',
    takeaways: ['Figma token management & variables', 'Automated token export to GitHub', 'Accessible WCAG contrast compliance']
  }
];

export const BLOG_POSTS = [
  {
    id: 'b-1',
    title: 'Top 10 Full-Stack Developer Trends to Watch in 2027',
    category: 'Web Tech',
    date: 'Sep 18, 2026',
    readTime: '6 min read',
    author: 'Dr. Sarah Jenkins',
    authorRole: 'Lead Instructor & Ex-Staff Architect',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80',
    snippet: 'Explore serverless edge runtimes, React Server Components, and AI-driven code synthesis transforming modern web architectures.',
    content: `
### The New Frontier of Full-Stack Web Development

As software engineering scales past traditional client-server models, 2027 brings a fundamental paradigm shift in how we conceive, build, and deploy production applications.

#### 1. React Server Components (RSC) & Streaming SSR
Zero-bundle-size server components have matured from experimental prototypes into industry production standards. By executing heavy dependencies exclusively on high-performance edge nodes, client devices receive pre-rendered HTML streams alongside minimal hydration footprints.

#### 2. AI-Synthesized Code & LLM-Driven Compilers
Engineers are no longer writing boilerplate glue code manually. AI coding agents now integrate directly into IDE test runners and continuous integration pipelines, automatically writing unit tests, detecting edge-case regressions, and suggesting architecture refactors before pull requests land.

#### 3. Distributed Edge Databases & Local-First Sync
The era of centralized monolithic databases is giving way to CRDT-backed (Conflict-free Replicated Data Types) offline-first clients that synchronize bidirectionally with distributed edge databases like Turso, Cloudflare D1, and Neon Serverless Postgres.

#### Key Takeaways:
- Master server components and edge computing primitives.
- Learn prompt engineering, deterministic function calling, and agentic workflows.
- Invest in local-first data stores and client-side encryption.
    `
  },
  {
    id: 'b-2',
    title: 'How to Build a RAG Pipeline with Vector Databases in Python',
    category: 'AI & Data',
    date: 'Sep 12, 2026',
    readTime: '10 min read',
    author: 'Prof. Marcus Vance',
    authorRole: 'Chief AI Scientist & ML Instructor',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&auto=format&fit=crop&q=80',
    snippet: 'Step-by-step guide to index private corporate documents and query them with low-latency similarity search.',
    content: `
### Practical Retrieval-Augmented Generation (RAG) in Enterprise AI

While Large Language Models are brilliant generalist reasoning engines, they cannot access internal company knowledge bases, proprietary schemas, or private PDFs without fine-tuning or retrieval.

#### The Three Core Pillars of RAG:

1. **Document Chunking & Vector Embeddings:**
   Break raw PDFs and markdown documents into semantically meaningful chunks (typically 500-1000 tokens with a 10% overlap). Convert each chunk into a high-dimensional vector using state-of-the-art embedding models like \`text-embedding-3-small\`.

2. **Vector Indexing & Hybrid Search:**
   Store embeddings inside vector databases such as Pinecone, Qdrant, or Chroma. Combine cosine similarity vector matching with BM25 keyword search (hybrid search) to achieve the highest retrieval accuracy.

3. **Context Injection & Prompt Grounding:**
   Retrieve the top-K most relevant chunks and pass them into the system prompt of your LLM. Force the model to reference source chunks directly to eliminate hallucinations completely.

\`\`\`python
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings

# Step 1: Initialize Embeddings
embeddings = OpenAIEmbeddings(model="text-embedding-3-small")

# Step 2: Index documents
vector_db = Chroma.from_documents(chunks, embeddings, persist_directory="./chroma_db")

# Step 3: Low-latency similarity lookup
query = "What is the refund policy for active cohorts?"
relevant_docs = vector_db.similarity_search(query, k=3)
\`\`\`

#### Production Best Practices:
- Always implement reranking models (e.g., Cohere Rerank) after initial vector retrieval.
- Filter chunks using metadata tags such as date, team, and security access level.
    `
  },
  {
    id: 'b-3',
    title: 'Demystifying Agentic AI & Autonomous Multi-Agent Workflows',
    category: 'Generative AI',
    date: 'Sep 08, 2026',
    readTime: '8 min read',
    author: 'Elena Rostova',
    authorRole: 'Principal Data Scientist & GenAI Lead',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    snippet: 'How autonomous LLM agents plan, self-reflect, and execute complex coding workflows using MCP tools and function calling.',
    content: `
### Beyond Chatbots: The Dawn of Autonomous Software Agents

Chatbots wait for humans to prompt them word by word. **AI Agents**, on the other hand, are given a top-level goal (e.g., *"Audit this repository for security vulnerabilities and prepare a GitHub pull request"*), and independently create plans, run terminal commands, debug errors, and verify the output.

#### How Autonomous Agent Loops Function:

- **Perception & Context Retrieval:** The agent gathers codebase context, file contents, and environmental tools.
- **Planning & Tool Execution:** Instead of guessing answers, the agent triggers external tools via structured JSON payloads (MCP servers, bash shells, web scrapers).
- **Self-Correction & Reflection:** When a compiler or test fails, the agent intercepts the stack trace, adjusts its plan, and retries until success is verified.

#### Why Multi-Agent Systems Outperform Single Prompts:
Rather than tasking one prompt with doing architecture, code writing, and testing simultaneously, modern setups deploy specialized personas:
1. **Architect Agent:** Breaks specifications into discrete modular tasks.
2. **Coder Agent:** Writes clean, idiomatic code with typing.
3. **Reviewer / QA Agent:** Runs linters, automated tests, and ensures boundary conditions are covered.
    `
  },
  {
    id: 'b-4',
    title: 'Designing High-Throughput Microservices with Kafka & Go',
    category: 'System Design',
    date: 'Aug 29, 2026',
    readTime: '9 min read',
    author: 'David Miller',
    authorRole: 'Staff Systems Engineer',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
    snippet: 'Architecting fault-tolerant event-driven backends handling 100K+ concurrent requests with zero message loss.',
    content: `
### Building Resilient Backends at Scale

Synchronous HTTP REST calls create brittle cascades of microservice failures. If Payment Service slows down, Order Service hangs, and the user-facing web app times out.

#### The Event-Driven Solution:
By decoupling producer services from consumer services using **Apache Kafka** partitioned log streams, workloads become entirely asynchronous and horizontally scalable.

#### Key Architectural Principles:
1. **At-Least-Once Delivery & Idempotency:**
   Every event consumer must be designed to handle duplicate messages gracefully using unique idempotency keys stored in Redis or PostgreSQL.
2. **Dead Letter Queues (DLQ):**
   Unparseable or corrupted messages are automatically routed to a DLQ topic after 3 failed retries, preventing the entire pipeline from stalling.
3. **Lightweight Go Concurrency:**
   Leveraging Golang goroutines and worker pools allows a single microservice node to process tens of thousands of Kafka messages per second with minuscule memory consumption.
    `
  },
  {
    id: 'b-5',
    title: 'Zero Trust Cloud Architecture: Securing Kubernetes & AWS',
    category: 'Cybersecurity & Cloud',
    date: 'Aug 21, 2026',
    readTime: '7 min read',
    author: 'Aria Chen',
    authorRole: 'Cloud Security Director',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    snippet: 'A pragmatic roadmap to implement mTLS, identity federation, and least-privilege RBAC policies in cloud-native clusters.',
    content: `
### Never Trust, Always Verify: Zero Trust in the Cloud

Traditional perimeter security assumes that anything inside the corporate VPN or VPC is safe. In reality, modern attacks exploit compromised internal credentials to move laterally across clusters.

#### The Zero Trust Security Checklist:

- **Mutual TLS (mTLS) Everywhere:** Enforce cryptographic authentication between all pod-to-pod communications using service meshes like Istio or Linkerd.
- **Short-Lived Ephemeral Credentials:** Never store static AWS IAM access keys in source control or environment variables. Use OpenID Connect (OIDC) identity federation so workloads request 15-minute temporary credentials dynamically.
- **Strict Network Policies:** By default, Kubernetes pods should deny all incoming and outgoing network traffic unless explicitly whitelisted in a \`NetworkPolicy\` manifest.
- **Continuous Automated Vulnerability Scanning:** Scan container base images during CI builds to block critical CVEs before deployment.
    `
  },
  {
    id: 'b-6',
    title: 'From Zero to Junior Dev: Roadmaps, Portfolio Hacks & Interviews',
    category: 'Career & Tech',
    date: 'Aug 14, 2026',
    readTime: '5 min read',
    author: 'Dr. Sarah Jenkins',
    authorRole: 'Lead Instructor & Career Mentor',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80',
    snippet: 'Actionable strategies for non-CS beginners to land high-paying software engineering roles without a 4-year degree.',
    content: `
### Breaking Into Tech: The Modern Self-Taught Engineer Playbook

The tech industry values demonstrated competence far more than pedigree. If you can build, debug, and explain complex software, companies will hire you.

#### The 4-Step Strategy That Works:

1. **Stop Tutorial Hell — Build 2 Big Projects:**
   Instead of following 10 different tutorials and having identical To-Do list apps, build two full-stack applications that solve a real problem (e.g., an automated invoice tracker for freelancers with Stripe & PDF generation).

2. **Document Your Architectural Thinking:**
   Add comprehensive READMEs with architecture flowcharts, database schema diagrams, and explanations of why you chose PostgreSQL over MongoDB.

3. **Master Git & Clean Commits:**
   Employers inspect GitHub commit histories. Avoid single commits labeled "updates". Write atomic, conventional commits (\`feat:\`, \`fix:\`, \`refactor:\`).

4. **Network Through Open Source:**
   Contribute bug fixes and documentation to small, active open-source libraries. It immediately proves you can collaborate with real engineering teams.
    `
  }
];

export const FAQS = [
  {
    id: 'faq-1',
    category: 'Courses',
    question: 'What courses does Nexus Academy offer?',
    answer: 'Nexus Academy offers immersive industry-led programs across high-demand tech fields, including Full-Stack Web Development (React, Node.js, Next.js), Artificial Intelligence & Neural Systems, Data Science & Machine Learning, Cloud Architecture & DevOps, Cybersecurity Defense & Ethical Hacking, and UI/UX Product Design Systems.'
  },
  {
    id: 'faq-2',
    category: 'Admissions',
    question: 'How can I enroll in a course?',
    answer: 'You can enroll directly by navigating to any course in our Course Catalogue and clicking "Enroll Now". If you are a new student, you will be prompted to log in or create your student account. Once confirmed, the course is immediately added to your "My Enrolled Courses" dashboard with instant access to learning materials.'
  },
  {
    id: 'faq-3',
    category: 'Certifications',
    question: 'Do you provide certificates after course completion?',
    answer: 'Yes! Upon successfully completing all modules, laboratory projects, and the capstone assessment, you receive an official, cryptographically verifiable Nexus Academy Certificate of Completion. You can preview sample certificates, share them on LinkedIn, or download official PDF credentials.'
  },
  {
    id: 'faq-4',
    category: 'Admissions & Fees',
    question: 'Is there any financial assistance or installment plans?',
    answer: 'We provide flexible, zero-interest monthly installment plans (split across 3, 6, or 12 months) to ensure quality technical education is accessible to everyone. You can speak with our admissions advisors during your counseling call to set up a personalized payment schedule.'
  },
  {
    id: 'faq-5',
    category: 'Career Support',
    question: 'Do you provide placement or career support?',
    answer: 'Yes, comprehensive career placement support is integrated into every bootcamp. This includes dedicated 1-on-1 resume teardowns, mock technical and system design interviews, GitHub portfolio polishing, and direct recruitment introductions with our 500+ global hiring partners.'
  },
  {
    id: 'faq-6',
    category: 'General',
    question: 'Are the classes online or offline?',
    answer: 'We provide flexible learning modes: Live Interactive Virtual Classes conducted over Zoom/Google Meet with screen sharing and pair programming, and In-Person Cohorts at our New York Innovation Campus. All sessions are recorded and archived for on-demand review.'
  },
  {
    id: 'faq-7',
    category: 'General',
    question: 'Can I attend a demo class before enrolling?',
    answer: 'Absolutely. We host regular live demo classes, open houses, and weekend code workshops (such as our Zero-Day Ethical Hacking and Design Systems labs). You can register for a free seat in our Events & Webinars section to experience our teaching methodology firsthand.'
  },
  {
    id: 'faq-8',
    category: 'General',
    question: 'How can I contact the academy?',
    answer: 'You can reach us through our Contact Page by submitting an online inquiry, emailing admissions@nexusacademy.edu, or calling our toll-free admissions line at +1 (800) 555-NEXUS. Our admissions counselors are available Monday through Saturday.'
  },
  {
    id: 'faq-9',
    category: 'Admissions',
    question: 'Can I change my enrolled course later?',
    answer: 'Yes. If you decide to transition to a different tech specialization within the first two weeks of your cohort kickoff, our academic advisors can help transfer your enrollment, credits, and schedule without additional penalty.'
  },
  {
    id: 'faq-10',
    category: 'Courses',
    question: 'What is the duration of the courses?',
    answer: 'Course durations range from intensive 8-week bootcamps to comprehensive 12-week and 24-week professional masterclasses, depending on whether you choose full-time weekday schedules or part-time weekend tracks.'
  }
];

export const GALLERY_IMAGES = [
  { title: 'Interactive Coding Lab', category: 'Campus', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80' },
  { title: 'AI Research Workshop', category: 'Labs', image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80' },
  { title: 'Annual Graduation Ceremony', category: 'Events', image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&auto=format&fit=crop&q=80' },
  { title: 'Hackathon Collaboration Space', category: 'Campus', image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=80' }
];

export const CAREER_OPENINGS = [
  { id: 'c-1', title: 'Senior Full-Stack Instructor (React & Node)', type: 'Full-Time', location: 'New York / Remote', department: 'Academics' },
  { id: 'c-2', title: 'AI & Data Science Curriculum Developer', type: 'Full-Time', location: 'Remote', department: 'Curriculum & Research' }
];
