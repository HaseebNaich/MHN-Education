import { CurriculumTopic, AcademicLevel } from '../types';

export const LEVEL_OPTIONS: { id: AcademicLevel; label: string; category: string }[] = [
  { id: 'grade-1-5', label: 'Grade 1–5 (Primary)', category: 'School' },
  { id: 'grade-6-8', label: 'Grade 6–8 (Middle School)', category: 'School' },
  { id: 'matric-9-10', label: 'Matric (Class 9 & 10)', category: 'Board Exams' },
  { id: 'fsc-pre-eng', label: 'FSC Pre-Engineering', category: 'Board Exams' },
  { id: 'fsc-pre-med', label: 'FSC Pre-Medical', category: 'Board Exams' },
  { id: 'ics', label: 'ICS (Computer Science)', category: 'Board Exams' },
  { id: 'icom', label: 'I.Com (Commerce)', category: 'Board Exams' },
  { id: 'dae', label: 'DAE (Diploma of Assoc. Eng.)', category: 'College' },
  { id: 'o-level', label: 'O-Level (IGCSE)', category: 'Board Exams' },
  { id: 'a-level', label: 'A-Level (Cambridge/Edexcel)', category: 'Board Exams' },
  { id: 'bs-se', label: 'BS Software Engineering', category: 'Software Engineering' },
  { id: 'bs-cs', label: 'BS Computer Science', category: 'Computer Science' },
  { id: 'bs-ai', label: 'BS Artificial Intelligence', category: 'Computer Science' },
  { id: 'bs-ds', label: 'BS Data Science', category: 'Computer Science' },
  { id: 'bs-cyber', label: 'BS Cyber Security', category: 'Computer Science' },
  { id: 'bs-math', label: 'BS Mathematics', category: 'Mathematics' },
  { id: 'bs-eng', label: 'BS Engineering (EE/ME/Civil)', category: 'Higher Ed' },
  { id: 'masters', label: 'Master\'s & Ph.D. Level', category: 'Higher Ed' },
  { id: 'competitive-exams', label: 'Competitive Exams (ECAT, MDCAT, NTS, GRE)', category: 'Competitive' },
];

export const CURRICULUM_TOPICS: CurriculumTopic[] = [
  // 1. BS SE / BS CS - Software Engineering & SDLC
  {
    id: 'sdlc-agile-scrum',
    title: 'Software Development Life Cycle (SDLC) & Agile Scrum Methodology',
    subject: 'Software Engineering',
    level: 'bs-se',
    levelLabel: 'BS Software Engineering',
    category: 'Software Engineering',
    estimatedMinutes: 25,
    summary: 'Master the fundamental engineering frameworks for designing, building, testing, and delivering scalable software using Waterfall, Agile, and Scrum.',
    sections: {
      introduction: 'Software Engineering transforms code into predictable, high-quality products. SDLC describes the step-by-step process of engineering software systems from initial requirements gathering to deployment and maintenance.',
      basicConcepts: '• Requirement Analysis: Defining client needs & producing SRS.\n• System Design: Architectural blueprints & UML diagrams.\n• Implementation: Writing modular code following solid software principles.\n• Testing: Verification (unit testing, integration) & Validation (UAT).\n• Maintenance: Corrective, Adaptive, and Perfective updates.',
      intermediateExplanation: 'Agile Software Development prioritizes iterative delivery over monolithic releases. The Agile Manifesto emphasizes individuals and interactions, working software, customer collaboration, and responding to change.\n\nScrum is an operational framework within Agile featuring defined roles (Product Owner, Scrum Master, Development Team), events (Sprints, Daily Standup, Sprint Review, Retrospective), and artifacts (Product Backlog, Sprint Backlog, Increment).',
      advancedExplanation: 'In modern enterprise software engineering, CI/CD pipelines (Continuous Integration / Continuous Deployment) automate testing and deployment steps of SDLC. Velocity tracking, burndown charts, and WIP (Work In Progress) limits maintain team efficiency without burnout.',
      applications: [
        'Managing distributed software development teams across multi-tenant cloud platforms.',
        'Sprinting to deliver MVP (Minimum Viable Product) features to real users within 2-week iterations.',
        'Reducing software failure rates by automated regression test suites embedded into git workflows.'
      ],
      examples: [
        {
          title: 'Scrum Sprint Breakdown Example',
          detail: 'A fintech startup plans a 14-day Sprint. Day 1: Sprint Planning to commit to 30 Story Points. Daily: 15-min standup answering: What did I do yesterday? What will I do today? Are there any blockers? Day 14: Sprint Review demo for stakeholders & Retrospective.'
        }
      ],
      diagramFlowchart: `[ Requirements ] ---> [ System Design ] ---> [ Sprint Backlog ]
                             |
                             v
                    [ 2-Week Sprint Cycle ]
                    |--> [ Code & Build ]
                    |--> [ Automated Tests ]
                    |--> [ Peer Review ]
                    v
             [ Deployable Increment ] ---> [ Retrospective ]`,
      practiceQuestions: [
        'Differentiate clearly between Agile and Waterfall methodologies. When is Waterfall preferred over Agile?',
        'Explain the responsibilities of a Scrum Master vs a Product Owner in a software squad.'
      ],
      mcqs: [
        {
          question: 'Which Scrum event is dedicated to team self-reflection and continuous process improvement?',
          options: ['Sprint Review', 'Sprint Retrospective', 'Daily Standup', 'Backlog Grooming'],
          answerIndex: 1,
          explanation: 'The Sprint Retrospective occurs at the end of every sprint for the team to inspect how the last sprint went with regards to people, relationships, process, and tools.'
        },
        {
          question: 'What is the primary output of the Requirements Analysis phase in classic SDLC?',
          options: ['Source Code', 'Software Requirement Specification (SRS)', 'UML Deployment Diagram', 'Executable Binary'],
          answerIndex: 1,
          explanation: 'The SRS document outlines all functional and non-functional software requirements.'
        }
      ],
      interviewQuestions: [
        {
          question: 'How do you handle scope creep during an active Sprint?',
          answer: 'The Product Owner guards the Sprint Backlog. Unplanned user stories are logged in the Product Backlog for prioritization in future sprints rather than altering active sprint commitments, unless it is a critical severity production hotfix.'
        }
      ],
      assignments: [
        'Draft an SRS document outline for an online food delivery mobile application.',
        'Create a Sprint Backlog with 5 user stories complete with acceptance criteria and Fibonacci story point estimations.'
      ],
      revisionNotes: [
        'SDLC Phases: Requirements -> Design -> Coding -> Testing -> Deployment -> Maintenance',
        'Scrum Roles: Product Owner (What), Scrum Master (How process works), Dev Team (Building)',
        'Scrum Events: Sprint Planning, Daily Scrum (15 mins), Sprint Review, Retrospective'
      ]
    }
  },

  // 2. BS CS / BS AI - Data Structures & Algorithms
  {
    id: 'dsa-trees-graphs',
    title: 'Binary Search Trees, AVL Trees & Graph Algorithms (Dijkstra & BFS/DFS)',
    subject: 'Computer Science',
    level: 'bs-cs',
    levelLabel: 'BS Computer Science',
    category: 'Computer Science',
    estimatedMinutes: 30,
    summary: 'Explore non-linear data structures, balanced tree traversal, graph representations, and shortest path algorithms with algorithm complexities.',
    sections: {
      introduction: 'Trees and Graphs are essential non-linear data structures used to model hierarchical systems, social networks, network routing, and decision pathways in computer science.',
      basicConcepts: '• Binary Search Tree (BST): A binary tree where left child < node < right child.\n• Search Complexity: Average O(log N), Worst-case O(N) for skewed trees.\n• Graph: A set of Vertices (V) and Edges (E), directed or undirected, weighted or unweighted.\n• Adjacency Matrix vs Adjacency List: Space tradeoff O(V^2) vs O(V + E).',
      intermediateExplanation: 'To maintain O(log N) search performance, Self-Balancing Trees like AVL Trees perform rotational balance checks whenever the balance factor (Height(Left) - Height(Right)) exceeds [-1, 0, 1]. Rotations include Single Left (RR), Single Right (LL), Left-Right (LR), and Right-Left (RL).\n\nGraph Traversals:\n- Breadth-First Search (BFS): Uses a Queue (FIFO) to traverse level-by-level. Complexity: O(V + E).\n- Depth-First Search (DFS): Uses a Stack (LIFO) or recursion to explore deeply before backtracking.',
      advancedExplanation: 'Dijkstra\'s Shortest Path Algorithm finds the minimum weight distance from a single source node to all other nodes in a weighted graph with non-negative edge weights using a Min-Priority Queue. Time complexity: O((V + E) log V).',
      applications: [
        'Google Maps & GPS routing software calculating fastest transit routes (Dijkstra / A* Search).',
        'Database indexing algorithms utilizing B-Trees / AVL Trees for logarithmic query speed.',
        'Social network recommendation engines using BFS to discover degree-2 connected friends.'
      ],
      examples: [
        {
          title: 'BFS Traversal Trace',
          detail: 'Graph nodes: A connected to B, C. B connected to D. Queue init: [A]. Visit A, enqueue B, C. Queue: [B, C]. Dequeue B, enqueue D. Queue: [C, D]. Visit C, then D. Traversal order: A -> B -> C -> D.'
        }
      ],
      diagramFlowchart: `         [ 10 ]               AVL Tree Rotation (Right Rotation):
        /      \\                   [ 30 ]           [ 20 ]
     [ 5 ]    [ 15 ]              /                /      \\
    /     \\                      [ 20 ]   --->   [ 10 ]  [ 30 ]
  [2]     [7]                   /
                              [ 10 ]`,
      practiceQuestions: [
        'Perform an In-Order traversal on a BST. Prove why In-Order traversal on a BST yields sorted elements.',
        'Compare Dijkstra\'s Algorithm with Bellman-Ford Algorithm when negative edge weights are present.'
      ],
      mcqs: [
        {
          question: 'What is the worst-case time complexity of searching an element in an unbalanced Binary Search Tree?',
          options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
          answerIndex: 2,
          explanation: 'In the worst case, a BST degenerates into a linked list (skewed tree), making search time linear O(N).'
        },
        {
          question: 'Which data structure is internally utilized to execute Breadth-First Search (BFS)?',
          options: ['Stack', 'Queue', 'Heap', 'Hash Map'],
          answerIndex: 1,
          explanation: 'BFS explores graph nodes in level-order fashion, which relies on a First-In First-Out (FIFO) Queue.'
        }
      ],
      interviewQuestions: [
        {
          question: 'How do you detect a cycle in a Directed Graph?',
          answer: 'Using DFS with three color states (White = unvisited, Gray = visiting/in recursion stack, Black = visited). If a Gray node is encountered during DFS traversal, a back-edge exists, indicating a cycle.'
        }
      ],
      assignments: [
        'Implement an AVL tree insertion algorithm in Python or C++ with automatic height updating and single/double rotations.',
        'Trace Dijkstra\'s algorithm manually on a weighted 6-vertex graph step-by-step.'
      ],
      revisionNotes: [
        'BST In-Order Traversal yields strictly sorted keys.',
        'AVL Balance Factor = Height(Left Subtree) - Height(Right Subtree). Must be in {-1, 0, 1}.',
        'BFS uses Queue (FIFO); DFS uses Stack / Recursion (LIFO).',
        'Dijkstra uses Priority Queue for non-negative weighted graphs: O((V+E) log V).'
      ]
    }
  },

  // 3. Mathematics - Calculus (Derivatives & Integration)
  {
    id: 'math-calculus-derivatives-integrals',
    title: 'Calculus: Derivatives, Integration, Fundamental Theorem & Applications',
    subject: 'Mathematics',
    level: 'fsc-pre-eng',
    levelLabel: 'FSC & BS Mathematics',
    category: 'Mathematics',
    estimatedMinutes: 30,
    summary: 'Comprehensive calculus guide covering limits, rate of change, differentiation rules, indefinite and definite integration, and real-world optimizations.',
    sections: {
      introduction: 'Calculus is the mathematical study of continuous change. Derivatives measure rate of change (slopes), while Integrals measure accumulated quantities (areas under curves).',
      basicConcepts: '• Derivative Definition: f\'(x) = lim(h -> 0) [f(x+h) - f(x)] / h.\n• Power Rule: d/dx [x^n] = n * x^(n-1).\n• Product Rule: d/dx [u * v] = u\' * v + u * v\'.\n• Quotient Rule: d/dx [u / v] = (u\' * v - u * v\') / v^2.\n• Chain Rule: d/dx [f(g(x))] = f\'(g(x)) * g\'(x).',
      intermediateExplanation: 'Integration is the inverse process of differentiation (Anti-derivative).\n- Indefinite Integral: ∫ f(x) dx = F(x) + C.\n- Definite Integral: ∫[a to b] f(x) dx = F(b) - F(a) (Fundamental Theorem of Calculus).\n\nIntegration Techniques:\n1. Integration by Substitution (u-substitution): Let u = g(x), du = g\'(x) dx.\n2. Integration by Parts: ∫ u dv = u * v - ∫ v du (derived from the product rule).',
      advancedExplanation: 'Calculus applications include Optimization (finding local maxima/minima using f\'(x) = 0 and f\'\'(x) test), Physics kinematics (Position x(t) -> Velocity v(t) = x\'(t) -> Acceleration a(t) = v\'(t)), and Differential Equations modelling population growth dy/dt = k*y.',
      applications: [
        'Machine Learning gradient descent algorithms calculating loss function partial derivatives.',
        'Engineering stress-strain analysis and structural loading calculations.',
        'Financial economics determining marginal revenue and cost optimization points.'
      ],
      examples: [
        {
          title: 'Integration by Parts Solved Example',
          detail: 'Evaluate ∫ x * e^x dx.\nLet u = x (du = dx), dv = e^x dx (v = e^x).\nUsing ∫ u dv = u*v - ∫ v du:\n∫ x * e^x dx = x * e^x - ∫ e^x dx = x * e^x - e^x + C = e^x (x - 1) + C.'
        }
      ],
      diagramFlowchart: `Function f(x)  --- (Differentiate) ---> Rate of Change f'(x)
Function f(x)  <--- ( Integrate )  --- Anti-derivative F(x) + C

Area under curve between x=a and x=b:  ∫[a..b] f(x)dx = F(b) - F(a)`,
      practiceQuestions: [
        'Find the derivative of f(x) = sin(3x^2 + 5x) using the Chain Rule.',
        'Calculate the definite integral ∫[0 to π/2] cos(x) dx.'
      ],
      mcqs: [
        {
          question: 'What is the second derivative f\'\'(x) test used to determine when f\'(c) = 0?',
          options: ['Inflection point only', 'If f\'\'(c) > 0 it is a local minimum, if f\'\'(c) < 0 it is a local maximum', 'Area under the curve', 'Slope at infinity'],
          answerIndex: 1,
          explanation: 'If the second derivative is positive (concave up), the critical point is a local minimum. If negative (concave down), it is a local maximum.'
        },
        {
          question: 'Evaluate d/dx [ln(x)]:',
          options: ['e^x', '1/x', 'x', 'ln(x)/x'],
          answerIndex: 1,
          explanation: 'The derivative of natural logarithm ln(x) with respect to x is 1/x for x > 0.'
        }
      ],
      interviewQuestions: [
        {
          question: 'How is partial derivative differentiation used in Training Deep Neural Networks?',
          answer: 'Backpropagation computes the gradient of the loss function with respect to every weight in the network using the multivariable chain rule of calculus to update weights via gradient descent.'
        }
      ],
      assignments: [
        'Solve 5 indefinite integrals requiring u-substitution and integration by parts.',
        'Find the dimensions of a rectangular parcel of land of maximum area that can be enclosed with 100 meters of fencing.'
      ],
      revisionNotes: [
        'd/dx [x^n] = n x^(n-1);  ∫ x^n dx = (x^(n+1))/(n+1) + C (n ≠ -1)',
        'd/dx [e^x] = e^x;  ∫ 1/x dx = ln|x| + C',
        'Integration by Parts formula: ∫ u dv = u v - ∫ v du',
        'Critical points occur where f\'(x) = 0 or undefined.'
      ]
    }
  },

  // 4. Matric & Intermediate Chemistry / Physics (Physics Fundamentals)
  {
    id: 'physics-electromagnetism-quantum',
    title: 'Physics: Electromagnetism, Maxwell Equations & Modern Physics',
    subject: 'Physics',
    level: 'fsc-pre-eng',
    levelLabel: 'FSC & Matric Physics',
    category: 'Board Exams',
    estimatedMinutes: 25,
    summary: 'Understand electric fields, magnetic induction, Maxwell\'s equations, electromagnetic waves, and modern quantum physics principles.',
    sections: {
      introduction: 'Electromagnetism governs electric forces, magnetic fields, and light. Modern physics expands classical mechanics to atomic and subatomic realms through quantum theory and relativity.',
      basicConcepts: '• Coulomb\'s Law: F = k * (q1 * q2) / r^2.\n• Electric Field (E): E = F / q.\n• Ohm\'s Law: V = I * R.\n• Faraday\'s Law of Electromagnetic Induction: EMF = -N * (dΦ/dt).\n• Photoelectric Effect: E = h * f = KE_max + Φ (Work function).',
      intermediateExplanation: 'Maxwell\'s 4 Equations unify electricity and magnetism into electromagnetic wave theory:\n1. Gauss\'s Law for Electricity: Electric flux through closed surface equals enclosed charge divided by ε0.\n2. Gauss\'s Law for Magnetism: Magnetic monopoles do not exist (Net magnetic flux = 0).\n3. Faraday\'s Law: Changing magnetic field induces an electric field.\n4. Ampere-Maxwell Law: Electric current or changing electric flux induces a magnetic field.',
      advancedExplanation: 'Quantum Physics establishes wave-particle duality (de Broglie wavelength λ = h / p) and Heisenberg\'s Uncertainty Principle (Δx * Δp ≥ ℏ/2), demonstrating that physical parameters cannot be simultaneously measured with infinite precision at subatomic scales.',
      applications: [
        'Electric generators and transformers powering global electrical grids.',
        'MRI (Magnetic Resonance Imaging) medical diagnostics using nuclear magnetic resonance.',
        'Semiconductor microchips and photovoltaics operating via energy band gaps and quantum mechanics.'
      ],
      examples: [
        {
          title: 'Photoelectric Effect Calculation',
          detail: 'Photon of frequency f = 10^15 Hz strikes a metal with work function Φ = 2.0 eV. (h = 4.14 x 10^-15 eV·s).\nE_photon = h * f = 4.14 eV.\nKE_max = E_photon - Φ = 4.14 - 2.0 = 2.14 eV.'
        }
      ],
      diagramFlowchart: `Changing Electric Field (E)  <--->  Changing Magnetic Field (B)
                                     |
                                     v
                  Propagating Electromagnetic Wave (Speed of Light c)`,
      practiceQuestions: [
        'State Faraday\'s Law of Induction and explain Lenz\'s Law minus sign physical meaning.',
        'Calculate the de Broglie wavelength of an electron moving at 2 x 10^6 m/s.'
      ],
      mcqs: [
        {
          question: 'What physical concept dictates that magnetic monopoles do not exist in nature?',
          options: ['Gauss\'s Law for Magnetism', 'Coulomb\'s Law', 'Ampere\'s Law', 'Lenz\'s Law'],
          answerIndex: 0,
          explanation: 'Gauss\'s Law for Magnetism states magnetic flux over any closed surface is always zero, meaning magnetic field lines always form closed loops without isolated single poles.'
        }
      ],
      interviewQuestions: [
        {
          question: 'What key experimental evidence proved light behaves as quantized particles?',
          answer: 'Albert Einstein\'s explanation of the Photoelectric Effect, showing kinetic energy of emitted electrons depends on light frequency, not light intensity, earning him the 1921 Nobel Prize.'
        }
      ],
      assignments: [
        'Derive the speed of electromagnetic waves c = 1 / √(μ0 * ε0) from Maxwell\'s equations in vacuum.',
        'Solve 4 numerical problems on RLC resonant AC circuits.'
      ],
      revisionNotes: [
        'Coulomb: F = k q1 q2 / r^2; Ohm: V = I R',
        'Faraday: EMF = -N dΦ/dt; Lenz law gives direction resisting flux change',
        'E = h f = hc/λ;  λ_deBroglie = h / p'
      ]
    }
  },

  // 5. BS Cyber Security - Cyber Security & Cryptography
  {
    id: 'cybersecurity-cryptography',
    title: 'Cyber Security Essentials: Cryptography, AES, RSA, PKI & Network Defense',
    subject: 'Cyber Security',
    level: 'bs-cyber',
    levelLabel: 'BS Cyber Security',
    category: 'Computer Science',
    estimatedMinutes: 25,
    summary: 'Master confidentiality, integrity, availability (CIA triad), symmetric/asymmetric encryption, hashing, public key infrastructure, and web security threats.',
    sections: {
      introduction: 'Cyber security protects networks, servers, devices, and data from unauthorized access, cyberattacks, and data breaches. Cryptography forms the mathematical foundation of digital security.',
      basicConcepts: '• CIA Triad: Confidentiality (Encryption), Integrity (Hashing), Availability (Redundancy/DDoS protection).\n• Symmetric Encryption: Same key for encryption and decryption (e.g., AES-256).\n• Asymmetric Encryption: Public key encrypts, Private key decrypts (e.g., RSA, ECC).\n• Cryptographic Hash Functions: One-way deterministic functions producing fixed-size digests (SHA-256).',
      intermediateExplanation: 'Public Key Infrastructure (PKI) binds public keys to verified identities using Digital Certificates issued by trusted Certificate Authorities (CAs).\n\nHTTPS & TLS Handshake:\n1. Client Hello (supported ciphers).\n2. Server Hello + Certificate (Server\'s RSA/ECC public key).\n3. Client verifies certificate chain against browser root store.\n4. Symmetric session key established via Diffie-Hellman or RSA key exchange.\n5. Encrypted communication begins.',
      advancedExplanation: 'Common Web Attack Vectors & Mitigations:\n- SQL Injection (SQLi): Mitigated via Prepared Statements & Parameterized Queries.\n- Cross-Site Scripting (XSS): Mitigated via Content Security Policy (CSP) & HTML Output Encoding.\n- Cross-Site Request Forgery (CSRF): Mitigated via Anti-CSRF tokens & SameSite cookies.\n- Buffer Overflow: Mitigated via ASLR, Stack Canaries, and Memory-Safe Languages (Rust).',
      applications: [
        'Securing online banking transactions with TLS 1.3 and zero-trust multi-factor authentication.',
        'Protecting corporate databases against data exfiltration using AES-256 disk encryption.',
        'Ensuring code integrity and authenticity via digital GPG / code signing signatures.'
      ],
      examples: [
        {
          title: 'RSA Public/Private Key Encryption Math',
          detail: 'Public Key (e, n), Private Key (d, n).\nMessage M encrypted: C = M^e mod n.\nCiphertext C decrypted: M = C^d mod n.\nSecurity relies on the hardness of prime factorization of large n = p * q.'
        }
      ],
      diagramFlowchart: `[ Client ] -- 1. Client Hello --> [ Web Server ]
         <-- 2. Certificate + Public Key --
         -- 3. Pre-Master Secret (Encrypted) -->
         <== 4. Secure AES Session Communication ==>`,
      practiceQuestions: [
        'Explain why hashing is irreversible while encryption is reversible.',
        'How does parameterized SQL query prevent SQL injection vulnerability?'
      ],
      mcqs: [
        {
          question: 'Which cryptographic algorithm represents a symmetric block cipher standard?',
          options: ['RSA', 'AES-256', 'ECDSA', 'Diffie-Hellman'],
          answerIndex: 1,
          explanation: 'AES (Advanced Encryption Standard) is a symmetric-key algorithm using 128, 192, or 256-bit key sizes.'
        }
      ],
      interviewQuestions: [
        {
          question: 'What is the difference between Authentication and Authorization?',
          answer: 'Authentication verifies WHO a user is (e.g., passwords, OAuth tokens, biometrics). Authorization determines WHAT actions or resources an authenticated user is allowed to access (e.g., RBAC, permissions).'
        }
      ],
      assignments: [
        'Generate an RSA 2048-bit keypair using OpenSSL in terminal and encrypt a text payload.',
        'Audit a vulnerable Node.js/Express snippet for XSS and SQL injection defects.'
      ],
      revisionNotes: [
        'CIA Triad: Confidentiality (AES), Integrity (SHA-256), Availability (DDoS mitigation)',
        'Symmetric: AES (Fast, same key). Asymmetric: RSA / ECC (Public/Private key pair)',
        'TLS 1.3 provides transport encryption using Diffie-Hellman key exchange.',
        'Always use Prepared Statements to prevent SQL injection.'
      ]
    }
  }
];
