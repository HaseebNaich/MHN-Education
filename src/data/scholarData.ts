export interface ScholarCourse {
  id: string;
  title: string;
  institution: 'Google' | 'MIT' | 'Stanford' | 'Harvard' | 'Oxford' | 'DeepMind' | 'Carnegie Mellon';
  instructors: string;
  subject: string;
  level: 'Undergraduate' | 'Graduate' | 'Advanced Research' | 'All Levels';
  duration: string;
  rating: number;
  studentsEnrolled: string;
  description: string;
  prerequisites: string[];
  topicsCovered: string[];
  syllabusOutline: { week: number; title: string; topics: string[] }[];
  scholarUrl: string;
  accessUrl: string;
  badge: string;
}

export interface ScholarResearchNote {
  id: string;
  title: string;
  authors: string;
  publication: string;
  year: number;
  citations: string;
  category: 'Machine Learning & AI' | 'Computer Systems' | 'Mathematics & Theory' | 'Quantum & Physics';
  abstract: string;
  coreContribution: string;
  keyFormulasOrConcepts: { name: string; formulaOrConcept: string; explanation: string }[];
  studyNotes: string[];
  scholarQueryUrl: string;
  doiOrArxivUrl: string;
  difficulty: 'Intermediate' | 'Advanced' | 'Expert';
}

export const GOOGLE_SCHOLAR_COURSES: ScholarCourse[] = [
  {
    id: 'deepmind-dl-foundations',
    title: 'DeepMind x UCL: Deep Learning & Neural Architectures',
    institution: 'DeepMind',
    instructors: 'Dr. Hado van Hasselt, Dr. Raia Hadsell, Dr. David Silver',
    subject: 'Artificial Intelligence',
    level: 'Graduate',
    duration: '12 Weeks (Self-Paced)',
    rating: 4.9,
    studentsEnrolled: '145K+',
    description: 'Comprehensive graduate-level lecture series developed by Google DeepMind researchers covering modern neural network architectures, optimization landscapes, and attention mechanisms.',
    prerequisites: ['Multivariable Calculus', 'Linear Algebra', 'Python / PyTorch'],
    topicsCovered: [
      'Feedforward & Convolutional Networks',
      'Loss Landscapes & Optimization (Adam, SGD with Momentum)',
      'Sequence Modeling & Attention Mechanisms',
      'Generative Models (VAEs, Diffusion, Transformers)',
      'Reinforcement Learning Fundamentals'
    ],
    syllabusOutline: [
      { week: 1, title: 'Introduction to Representation Learning & Backprop', topics: ['Computational Graphs', 'Automatic Differentiation', 'Gradient Descent'] },
      { week: 2, title: 'Convolutional Architectures & Vision', topics: ['Spatial Invariance', 'ResNet Residual Blocks', 'Vision Transformers (ViT)'] },
      { week: 3, title: 'Attention & Transformer Architecture', topics: ['Scaled Dot-Product', 'Multi-Head Attention', 'Self-Attention Complexity'] },
      { week: 4, title: 'Generative Modeling & Diffusion', topics: ['Score Matching', 'Denoising Diffusion Probabilistic Models', 'Latent Spaces'] }
    ],
    scholarUrl: 'https://scholar.google.com/scholar?q=DeepMind+Deep+Learning+Lecture+Series',
    accessUrl: 'https://www.youtube.com/playlist?list=PLqYmG7hTraZCDxZ44o4p3N5Anz3lLRVZF',
    badge: 'DeepMind Certified'
  },
  {
    id: 'stanford-cs229-ml',
    title: 'Stanford CS229: Machine Learning Specialization',
    institution: 'Stanford',
    instructors: 'Prof. Andrew Ng & Prof. Christopher Ré',
    subject: 'Machine Learning',
    level: 'Undergraduate',
    duration: '10 Weeks',
    rating: 4.95,
    studentsEnrolled: '520K+',
    description: 'The world\'s most cited university machine learning curriculum. Rigorous mathematical treatment of supervised learning, generative learning algorithms, SVMs, and learning theory.',
    prerequisites: ['Linear Algebra', 'Probability & Statistics', 'Calculus'],
    topicsCovered: [
      'Linear Regression, Normal Equation, LMS Algorithm',
      'Logistic Regression, Perceptron & Newton-Raphson',
      'Gaussian Discriminant Analysis & Naive Bayes',
      'Support Vector Machines & Kernel Tricks',
      'VC Dimension & PAC Learning Theory'
    ],
    syllabusOutline: [
      { week: 1, title: 'Supervised Learning & Gradient Descent', topics: ['LMS Algorithm', 'Normal Equations', 'Locally Weighted Linear Regression'] },
      { week: 2, title: 'Classification & Generalized Linear Models', topics: ['Logistic Regression', 'Newton Method', 'Exponential Families'] },
      { week: 3, title: 'Generative Learning Algorithms & SVMs', topics: ['Gaussian Discriminant Analysis', 'Optimal Margin Classifiers', 'Dual Formulations'] },
      { week: 4, title: 'Learning Theory & Regularization', topics: ['Union and Chernoff Bounds', 'Vapnik-Chervonenkis (VC) Dimension', 'L1 vs L2 Norms'] }
    ],
    scholarUrl: 'https://scholar.google.com/scholar?q=Andrew+Ng+CS229+Machine+Learning',
    accessUrl: 'https://see.stanford.edu/Course/CS229',
    badge: 'Stanford Open Scholar'
  },
  {
    id: 'mit-6006-algorithms',
    title: 'MIT 6.006: Introduction to Algorithms',
    institution: 'MIT',
    instructors: 'Prof. Erik Demaine & Prof. Srini Devadas',
    subject: 'Computer Science',
    level: 'Undergraduate',
    duration: '12 Weeks',
    rating: 4.92,
    studentsEnrolled: '310K+',
    description: 'MIT\'s gold standard course on mathematical algorithm design and complexity analysis. Covers AVL trees, hashing, graph search, Dijkstra, Bellman-Ford, and dynamic programming.',
    prerequisites: ['Discrete Mathematics', 'Python Programming'],
    topicsCovered: [
      'Asymptotic Notation & Master Theorem',
      'Balanced BSTs & AVL Rotations',
      'Direct Access Arrays & Rolling Hash Algorithms',
      'Dijkstra & Shortest Path Variations',
      'Dynamic Programming: Memoization vs Tabulation'
    ],
    syllabusOutline: [
      { week: 1, title: 'Algorithmic Thinking & Peak Finding', topics: ['1D & 2D Peak Finding', 'Divide and Conquer', 'Big-O Proofs'] },
      { week: 2, title: 'Sorting & Binary Search Trees', topics: ['Merge Sort', 'Heap Sort', 'AVL Tree Self-Balancing Invariants'] },
      { week: 3, title: 'Graph Traversal & Shortest Paths', topics: ['Breadth-First Search', 'Depth-First Search', 'Dijkstra with Priority Queue'] },
      { week: 4, title: 'Dynamic Programming Paradigms', topics: ['Subproblem DAGs', 'Knapsack Problem', 'Longest Common Subsequence'] }
    ],
    scholarUrl: 'https://scholar.google.com/scholar?q=MIT+6.006+Introduction+to+Algorithms+Demaine',
    accessUrl: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/',
    badge: 'MIT OCW Scholar'
  },
  {
    id: 'harvard-cs50-foundations',
    title: 'Harvard CS50: Introduction to Computer Science',
    institution: 'Harvard',
    instructors: 'Prof. David J. Malan',
    subject: 'Computer Science',
    level: 'All Levels',
    duration: '11 Weeks',
    rating: 4.98,
    studentsEnrolled: '4.8M+',
    description: 'Harvard University\'s world-renowned introduction to the intellectual enterprises of computer science and the art of programming. Covers C memory management, algorithms, Python, SQL, and Web stacks.',
    prerequisites: ['None (Open to all learners)'],
    topicsCovered: [
      'Computational Thinking & Scratch',
      'C Language, Pointers, Stack vs Heap Allocation',
      'Data Structures: Linked Lists, Hash Tables, Tries',
      'Python Syntax, Libraries & File I/O',
      'Relational Databases & SQL Schema Normalization'
    ],
    syllabusOutline: [
      { week: 1, title: 'Computational Logic & C Fundamentals', topics: ['Conditionals', 'Loops', 'Bitwise Operators'] },
      { week: 2, title: 'Arrays, Strings & Cryptography', topics: ['Memory Buffers', 'Command-Line Arguments', 'Ciphers'] },
      { week: 3, title: 'Pointers & Dynamic Memory', topics: ['Valgrind Memory Leaks', 'Malloc & Free', 'Pointers Arithmetic'] },
      { week: 4, title: 'Data Structures in C & Python', topics: ['Linked Lists', 'Hash Maps with Buckets', 'Python Abstraction'] }
    ],
    scholarUrl: 'https://scholar.google.com/scholar?q=Harvard+CS50+David+Malan',
    accessUrl: 'https://cs50.harvard.edu/x/',
    badge: 'Harvard Open Scholar'
  },
  {
    id: 'mit-1801-calculus',
    title: 'MIT 18.01: Single Variable Calculus & Proofs',
    institution: 'MIT',
    instructors: 'Prof. David Jerison',
    subject: 'Mathematics',
    level: 'Undergraduate',
    duration: '10 Weeks',
    rating: 4.88,
    studentsEnrolled: '220K+',
    description: 'Rigorous first-principles differentiation and integration from MIT. Covers epsilon-delta continuity proofs, fundamental theorems, Taylor series expansions, and differential equations.',
    prerequisites: ['High School Algebra & Trigonometry'],
    topicsCovered: [
      'Limits, Continuity & Derivative Definitions',
      'Mean Value Theorem & L\'Hopital\'s Rule',
      'Riemann Sums & Fundamental Theorem of Calculus',
      'Techniques of Integration (Trig Sub, Partial Fractions)',
      'Infinite Series, Power Series & Taylor Polynomials'
    ],
    syllabusOutline: [
      { week: 1, title: 'Differentiation & Rates of Change', topics: ['Geometric Meaning', 'Product and Quotient Rules', 'Implicit Differentiation'] },
      { week: 2, title: 'Applications of Derivatives', topics: ['Max/Min Optimization', 'Curve Sketching', 'Related Rates'] },
      { week: 3, title: 'Integration Foundations', topics: ['Antiderivatives', 'First and Second Fundamental Theorems', 'Area Under Curves'] },
      { week: 4, title: 'Techniques of Integration & Series', topics: ['Integration by Parts', 'Separable Differential Equations', 'Convergence Tests'] }
    ],
    scholarUrl: 'https://scholar.google.com/scholar?q=MIT+18.01+Single+Variable+Calculus+Jerison',
    accessUrl: 'https://ocw.mit.edu/courses/18-01-single-variable-calculus-fall-2006/',
    badge: 'MIT Mathematics'
  },
  {
    id: 'google-cloud-genai-scholar',
    title: 'Google Cloud: Generative AI & Large Language Models',
    institution: 'Google',
    instructors: 'Google Cloud & Google Research Training Team',
    subject: 'Artificial Intelligence',
    level: 'All Levels',
    duration: '6 Weeks (Self-Paced)',
    rating: 4.85,
    studentsEnrolled: '380K+',
    description: 'Official Google scholar course detailing generative AI architecture, prompt engineering, attention mechanisms, vector databases, and retrieval augmented generation (RAG).',
    prerequisites: ['Basic Python & API knowledge'],
    topicsCovered: [
      'Introduction to Generative AI & Foundation Models',
      'Transformer Architecture & Multi-Modal Processing',
      'Attention Mechanisms & Context Windows',
      'Retrieval Augmented Generation (RAG) Architectures',
      'Responsible AI, Safety Evaluations & Grounding'
    ],
    syllabusOutline: [
      { week: 1, title: 'Foundations of Generative Models', topics: ['Discriminative vs Generative', 'Encoder-Decoder Paradigms'] },
      { week: 2, title: 'Large Language Models (LLMs)', topics: ['Pre-training, Fine-tuning, RLHF (Reinforcement Learning from Human Feedback)'] },
      { week: 3, title: 'Attention & Transformers in Depth', topics: ['Positional Encoding', 'Self-Attention', 'Transformer Blocks'] },
      { week: 4, title: 'RAG Systems & Grounding Techniques', topics: ['Embedding Models', 'Vector Search (Cosine Similarity)', 'Grounding Tools'] }
    ],
    scholarUrl: 'https://scholar.google.com/scholar?q=Google+Research+Generative+AI+Foundations',
    accessUrl: 'https://www.cloudskillsboost.google/journeys/118',
    badge: 'Google Official'
  },
  {
    id: 'oxford-quantum-computing',
    title: 'Oxford University: Quantum Computing Foundations',
    institution: 'Oxford',
    instructors: 'Prof. Artur Ekert & Prof. Jonathan Barrett',
    subject: 'Physics & Computing',
    level: 'Graduate',
    duration: '8 Weeks',
    rating: 4.91,
    studentsEnrolled: '65K+',
    description: 'Oxford University theoretical foundations of quantum computing, qubits, entanglement, quantum gates (Hadamard, CNOT), and Shor\'s factoring algorithm.',
    prerequisites: ['Complex Numbers', 'Linear Algebra / Hilbert Spaces'],
    topicsCovered: [
      'Qubits, Bloch Sphere Representation',
      'Quantum Superposition & Bell State Entanglement',
      'Unitary Operators & Quantum Logic Circuits',
      'Quantum Teleportation & No-Cloning Theorem',
      'Shor\'s Factoring & Grover\'s Search Algorithms'
    ],
    syllabusOutline: [
      { week: 1, title: 'Qubits & Quantum States', topics: ['State Vectors', 'Bra-Ket Notation', 'Measurement Postulates'] },
      { week: 2, title: 'Multiple Qubits & Entanglement', topics: ['Tensor Products', 'EPR Paradox', 'Bell Inequalities'] },
      { week: 3, title: 'Quantum Circuit Operations', topics: ['Pauli Gates (X, Y, Z)', 'Hadamard Transform', 'Controlled Phase Gates'] },
      { week: 4, title: 'Quantum Algorithms', topics: ['Deutsch-Jozsa Algorithm', 'Quantum Fourier Transform', 'Phase Estimation'] }
    ],
    scholarUrl: 'https://scholar.google.com/scholar?q=Artur+Ekert+Oxford+Quantum+Computing',
    accessUrl: 'https://www.cs.ox.ac.uk/teaching/courses/2020-2021/quantum/',
    badge: 'Oxford Scholar'
  }
];

export const GOOGLE_SCHOLAR_NOTES: ScholarResearchNote[] = [
  {
    id: 'paper-attention-vaswani',
    title: 'Attention Is All You Need (The Transformer Architecture)',
    authors: 'Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Łukasz Kaiser, Illia Polosukhin (Google Research)',
    publication: 'Advances in Neural Information Processing Systems (NeurIPS)',
    year: 2017,
    citations: '135,000+',
    category: 'Machine Learning & AI',
    abstract: 'The dominant sequence transduction models were based on complex recurrent or convolutional neural networks. We propose the Transformer, a model architecture eschewing recurrence and instead relying entirely on an attention mechanism to draw global dependencies between input and output.',
    coreContribution: 'Eliminated recurrence bottlenecks, enabling massive parallelization during training through Self-Attention mechanisms and Scaled Dot-Product computation.',
    keyFormulasOrConcepts: [
      {
        name: 'Scaled Dot-Product Attention',
        formulaOrConcept: 'Attention(Q, K, V) = softmax((Q * K^T) / sqrt(d_k)) * V',
        explanation: 'Queries and Keys of dimension d_k are multiplied to compute pairwise similarity, scaled by 1/sqrt(d_k) to prevent vanishing gradients in softmax, then weighted against Values.'
      },
      {
        name: 'Multi-Head Attention',
        formulaOrConcept: 'MultiHead(Q,K,V) = Concat(head_1, ..., head_h) * W^O',
        explanation: 'Projects Q, K, V into h different subspace representations simultaneously, allowing the model to jointly attend to information from different representation subspaces at different positions.'
      },
      {
        name: 'Positional Encoding',
        formulaOrConcept: 'PE(pos, 2i) = sin(pos / 10000^(2i/d_model)), PE(pos, 2i+1) = cos(...)',
        explanation: 'Since the model contains no recurrence and no convolution, sine and cosine functions of varying frequencies inject sequence order information into word embeddings.'
      }
    ],
    studyNotes: [
      'Complexity per layer: O(n^2 * d) where n is sequence length and d is representation dimension.',
      'Allows sequential operations of O(1), in contrast to RNNs which require O(n) sequential path operations.',
      'Forms the foundational backbone of modern models: BERT, GPT series, Gemini, T5, and Vision Transformers.'
    ],
    scholarQueryUrl: 'https://scholar.google.com/scholar?q=Attention+Is+All+You+Need+Vaswani',
    doiOrArxivUrl: 'https://arxiv.org/abs/1706.03762',
    difficulty: 'Advanced'
  },
  {
    id: 'paper-resnet-he',
    title: 'Deep Residual Learning for Image Recognition (ResNet)',
    authors: 'Kaiming He, Xiangyu Zhang, Shaoqing Ren, Jian Sun (Microsoft Research)',
    publication: 'IEEE Conference on Computer Vision and Pattern Recognition (CVPR)',
    year: 2016,
    citations: '210,000+',
    category: 'Machine Learning & AI',
    abstract: 'Deeper neural networks are more difficult to train. We present a residual learning framework to ease the training of networks that are substantially deeper than those used previously. We explicitly reformulate the layers as learning residual functions with reference to the layer inputs.',
    coreContribution: 'Introduced identity skip connections (residual shortcuts) that resolved the vanishing/exploding gradient problem, allowing networks of 152+ layers to be trained stably.',
    keyFormulasOrConcepts: [
      {
        name: 'Residual Mapping Formulation',
        formulaOrConcept: 'H(x) = F(x, {W_i}) + x',
        explanation: 'Instead of hoping a stack of layers directly fits an underlying mapping H(x), we let these layers fit a residual mapping F(x) = H(x) - x, making identity mappings trivially learnable if F(x) -> 0.'
      },
      {
        name: 'Gradient Highway',
        formulaOrConcept: 'dLoss/dx = (dLoss/dH) * (dF/dx + I)',
        explanation: 'The derivative term contains an identity matrix I, ensuring gradients can flow directly backwards through the network without decaying to zero across hundreds of layers.'
      }
    ],
    studyNotes: [
      'Won 1st place in all five main tracks of ILSVRC 2015 and COCO competitions.',
      'Showed that degradation problem was not caused by overfitting, but by numerical optimization difficulty.',
      'Residual skip connections are now universally used across ConvNets, Transformers, and Diffusion models.'
    ],
    scholarQueryUrl: 'https://scholar.google.com/scholar?q=Deep+Residual+Learning+for+Image+Recognition+Kaiming+He',
    doiOrArxivUrl: 'https://arxiv.org/abs/1512.03385',
    difficulty: 'Intermediate'
  },
  {
    id: 'paper-mapreduce-dean',
    title: 'MapReduce: Simplified Data Processing on Large Clusters',
    authors: 'Jeffrey Dean & Sanjay Ghemawat (Google Inc.)',
    publication: 'USENIX Symposium on Operating Systems Design and Implementation (OSDI)',
    year: 2004,
    citations: '42,000+',
    category: 'Computer Systems',
    abstract: 'MapReduce is a programming model and an associated implementation for processing and generating large data sets. Users specify a map function that processes a key/value pair to generate a set of intermediate key/value pairs, and a reduce function that merges all intermediate values associated with the same intermediate key.',
    coreContribution: 'Abstracted massive parallel distributed computing, automatic fault tolerance, data partitioning, and machine failures into two intuitive functional primitives (Map & Reduce).',
    keyFormulasOrConcepts: [
      {
        name: 'Map Signature',
        formulaOrConcept: 'map: (k1, v1) -> list(k2, v2)',
        explanation: 'Processes raw input records and outputs intermediate key/value pairs.'
      },
      {
        name: 'Reduce Signature',
        formulaOrConcept: 'reduce: (k2, list(v2)) -> list(k3, v3)',
        explanation: 'Aggregates all values matching intermediate key k2 and produces final consolidated output.'
      },
      {
        name: 'Fault Tolerance by Re-execution',
        formulaOrConcept: 'State = Idle | In-Progress | Completed',
        explanation: 'Master pings worker nodes periodically. If a worker fails, its in-progress or completed map tasks are reset to Idle and reassigned to healthy workers.'
      }
    ],
    studyNotes: [
      'Inspired Apache Hadoop and the entire big data analytics open source revolution.',
      'Data locality optimization: Schedules Map tasks on machines that physically store copies of the input data on GFS (Google File System).',
      'Critical study material for Distributed Systems, Cloud Architecture, and Software Engineering exams.'
    ],
    scholarQueryUrl: 'https://scholar.google.com/scholar?q=MapReduce+Simplified+Data+Processing+Jeffrey+Dean',
    doiOrArxivUrl: 'https://research.google/pubs/pub62/',
    difficulty: 'Intermediate'
  },
  {
    id: 'paper-shannon-information-theory',
    title: 'A Mathematical Theory of Communication',
    authors: 'Claude E. Shannon (Bell System Technical Journal)',
    publication: 'Bell System Technical Journal',
    year: 1948,
    citations: '148,000+',
    category: 'Mathematics & Theory',
    abstract: 'The fundamental problem of communication is that of reproducing at one point either exactly or approximately a message selected at another point. We formulate the mathematical foundation of digital information, entropy, and channel capacity.',
    coreContribution: 'Created the field of Information Theory, introduced the "bit" as the fundamental quantum of information, and proved the Noisy-Channel Coding Theorem.',
    keyFormulasOrConcepts: [
      {
        name: 'Shannon Entropy (Information Content)',
        formulaOrConcept: 'H(X) = - sum_{i=1}^n P(x_i) * log_2(P(x_i))',
        explanation: 'Quantifies the expected uncertainty, surprise, or information measure contained in a random variable X.'
      },
      {
        name: 'Shannon-Hartley Channel Capacity Theorem',
        formulaOrConcept: 'C = B * log_2(1 + S/N)',
        explanation: 'The maximum theoretical error-free data rate C through a channel with bandwidth B in Hertz, where S/N is the signal-to-noise power ratio.'
      }
    ],
    studyNotes: [
      'Proved that error-free transmission is theoretically achievable over noisy channels as long as transmission rate R < C.',
      'Foundation of all digital telecommunications: Wi-Fi, 5G, satellite communications, JPEG/MP3 compression, and cross-entropy loss in machine learning.',
      'Essential study concept for Electrical Engineering, Computer Networks, and Cryptography.'
    ],
    scholarQueryUrl: 'https://scholar.google.com/scholar?q=A+Mathematical+Theory+of+Communication+Claude+Shannon',
    doiOrArxivUrl: 'https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf',
    difficulty: 'Advanced'
  },
  {
    id: 'paper-dijkstra-shortest-path',
    title: 'A Note on Two Problems in Connexion with Graphs (Dijkstra\'s Algorithm)',
    authors: 'Edsger W. Dijkstra (Numerische Mathematik)',
    publication: 'Numerische Mathematik',
    year: 1959,
    citations: '38,000+',
    category: 'Computer Systems',
    abstract: 'We consider n points (nodes), some or all pairs of which are connected by a branch; the length of each branch is given. We solve two problems: construct the tree of minimum total length, and find the path of minimum total length between two given nodes.',
    coreContribution: 'Devised the single-source shortest path algorithm for non-negative edge weights using a greedy relaxation strategy, and an alternative spanning tree algorithm.',
    keyFormulasOrConcepts: [
      {
        name: 'Greedy Relaxation Step',
        formulaOrConcept: 'if dist[u] + weight(u, v) < dist[v]: dist[v] = dist[u] + weight(u, v)',
        explanation: 'Selects the unvisited vertex u with the smallest known distance from source, updates neighbor distances, and marks u as settled.'
      },
      {
        name: 'Complexity with Min-Heap',
        formulaOrConcept: 'O((V + E) * log(V))',
        explanation: 'Using binary priority queues, every vertex is extracted once (V * log V) and edge relaxations decrease keys (E * log V).'
      }
    ],
    studyNotes: [
      'Designed by Dijkstra in 1956 in 20 minutes while shopping with his fiancée to demonstrate the ARMAC computer capabilities.',
      'Core component in Internet routing (OSPF, IS-IS protocols) and GPS navigation systems (Google Maps road network routing).',
      'Critical requirement in BS Computer Science and Software Engineering exams.'
    ],
    scholarQueryUrl: 'https://scholar.google.com/scholar?q=A+Note+on+Two+Problems+in+Connexion+with+Graphs+Dijkstra',
    doiOrArxivUrl: 'https://link.springer.com/article/10.1007/BF01386390',
    difficulty: 'Intermediate'
  }
];
