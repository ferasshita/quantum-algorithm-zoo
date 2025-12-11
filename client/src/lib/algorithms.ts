import type { Algorithm, Tutorial } from "@shared/schema";

export const algorithms: Algorithm[] = [
  {
    id: "bell-states",
    name: "Bell States",
    description: "Create maximally entangled two-qubit states, the foundation of quantum entanglement and many quantum protocols.",
    category: "fundamentals",
    difficulty: "beginner",
    circuit: [
      { type: "H", qubit: 0, label: "Hadamard" },
      { type: "CNOT", qubit: 1, controlQubit: 0, label: "CNOT" },
      { type: "M", qubit: 0 },
      { type: "M", qubit: 1 }
    ],
    defaultQubits: 2,
    minQubits: 2,
    maxQubits: 2,
    parameters: [
      {
        id: "bellType",
        name: "Bell State Type",
        type: "select",
        default: "phi_plus",
        options: ["phi_plus", "phi_minus", "psi_plus", "psi_minus"],
        description: "Choose which of the four Bell states to create"
      }
    ],
    useCases: [
      "Quantum teleportation",
      "Superdense coding",
      "Quantum key distribution",
      "Entanglement-based protocols"
    ],
    theory: "Bell states are the simplest examples of quantum entanglement. When two qubits are in a Bell state, measuring one instantly determines the state of the other, regardless of the distance between them. This 'spooky action at a distance' is fundamental to quantum computing and communication.",
    complexity: "O(1) - constant time"
  },
  {
    id: "deutsch-jozsa",
    name: "Deutsch-Jozsa Algorithm",
    description: "Determine if a function is constant or balanced with a single query, demonstrating quantum speedup.",
    category: "fundamentals",
    difficulty: "beginner",
    circuit: [
      { type: "X", qubit: 2 },
      { type: "H", qubit: 0 },
      { type: "H", qubit: 1 },
      { type: "H", qubit: 2 },
      { type: "CNOT", qubit: 2, controlQubit: 0 },
      { type: "CNOT", qubit: 2, controlQubit: 1 },
      { type: "H", qubit: 0 },
      { type: "H", qubit: 1 },
      { type: "M", qubit: 0 },
      { type: "M", qubit: 1 }
    ],
    defaultQubits: 3,
    minQubits: 2,
    maxQubits: 6,
    parameters: [
      {
        id: "functionType",
        name: "Function Type",
        type: "select",
        default: "balanced",
        options: ["constant_0", "constant_1", "balanced"],
        description: "Type of oracle function to test"
      }
    ],
    useCases: [
      "Demonstrating quantum speedup",
      "Educational introduction to quantum oracles",
      "Foundation for more complex algorithms"
    ],
    theory: "The Deutsch-Jozsa algorithm is one of the first examples showing quantum computers can solve certain problems exponentially faster than classical computers. It determines whether a function f(x) is constant (same output for all inputs) or balanced (different outputs for exactly half the inputs) using only one function evaluation.",
    complexity: "O(1) quantum vs O(2^(n-1)+1) classical"
  },
  {
    id: "bernstein-vazirani",
    name: "Bernstein-Vazirani Algorithm",
    description: "Find a hidden bit string with a single query using quantum parallelism.",
    category: "fundamentals",
    difficulty: "beginner",
    circuit: [
      { type: "X", qubit: 3 },
      { type: "H", qubit: 0 },
      { type: "H", qubit: 1 },
      { type: "H", qubit: 2 },
      { type: "H", qubit: 3 },
      { type: "CNOT", qubit: 3, controlQubit: 0 },
      { type: "CNOT", qubit: 3, controlQubit: 2 },
      { type: "H", qubit: 0 },
      { type: "H", qubit: 1 },
      { type: "H", qubit: 2 },
      { type: "M", qubit: 0 },
      { type: "M", qubit: 1 },
      { type: "M", qubit: 2 }
    ],
    defaultQubits: 4,
    minQubits: 2,
    maxQubits: 8,
    parameters: [
      {
        id: "hiddenString",
        name: "Hidden String",
        type: "select",
        default: "101",
        options: ["001", "010", "011", "100", "101", "110", "111"],
        description: "The secret bit string to discover"
      }
    ],
    useCases: [
      "Cryptographic applications",
      "Pattern recognition",
      "Database queries"
    ],
    theory: "The Bernstein-Vazirani algorithm finds a hidden bit string s encoded in a function f(x) = s·x (mod 2). Classically, finding an n-bit string requires n queries. Quantum computers find it in just one query by exploiting superposition and interference.",
    complexity: "O(1) quantum vs O(n) classical"
  },
  {
    id: "grovers-search",
    name: "Grover's Search",
    description: "Search an unsorted database quadratically faster than classical algorithms.",
    category: "search",
    difficulty: "intermediate",
    circuit: [
      { type: "H", qubit: 0 },
      { type: "H", qubit: 1 },
      { type: "H", qubit: 2 },
      { type: "X", qubit: 0 },
      { type: "X", qubit: 1 },
      { type: "H", qubit: 2 },
      { type: "CNOT", qubit: 2, controlQubit: 1 },
      { type: "H", qubit: 2 },
      { type: "X", qubit: 0 },
      { type: "X", qubit: 1 },
      { type: "H", qubit: 0 },
      { type: "H", qubit: 1 },
      { type: "H", qubit: 2 },
      { type: "X", qubit: 0 },
      { type: "X", qubit: 1 },
      { type: "X", qubit: 2 },
      { type: "H", qubit: 2 },
      { type: "CNOT", qubit: 2, controlQubit: 1 },
      { type: "H", qubit: 2 },
      { type: "X", qubit: 0 },
      { type: "X", qubit: 1 },
      { type: "X", qubit: 2 },
      { type: "H", qubit: 0 },
      { type: "H", qubit: 1 },
      { type: "H", qubit: 2 },
      { type: "M", qubit: 0 },
      { type: "M", qubit: 1 },
      { type: "M", qubit: 2 }
    ],
    defaultQubits: 3,
    minQubits: 2,
    maxQubits: 6,
    parameters: [
      {
        id: "targetState",
        name: "Target State",
        type: "select",
        default: "101",
        options: ["000", "001", "010", "011", "100", "101", "110", "111"],
        description: "The state to search for"
      },
      {
        id: "iterations",
        name: "Iterations",
        type: "number",
        default: 1,
        min: 1,
        max: 10,
        step: 1,
        description: "Number of Grover iterations (optimal is ~sqrt(N)/4)"
      }
    ],
    useCases: [
      "Database search",
      "Cryptographic key search",
      "Constraint satisfaction problems",
      "Optimization problems"
    ],
    theory: "Grover's algorithm provides a quadratic speedup for unstructured search problems. Given N items, classical search requires O(N) steps on average, while Grover's algorithm finds the target in O(sqrt(N)) steps. It uses amplitude amplification to increase the probability of measuring the correct answer.",
    complexity: "O(sqrt(N)) quantum vs O(N) classical"
  },
  {
    id: "quantum-teleportation",
    name: "Quantum Teleportation",
    description: "Transfer a quantum state from one qubit to another using entanglement and classical communication.",
    category: "fundamentals",
    difficulty: "intermediate",
    circuit: [
      { type: "H", qubit: 1 },
      { type: "CNOT", qubit: 2, controlQubit: 1 },
      { type: "CNOT", qubit: 1, controlQubit: 0 },
      { type: "H", qubit: 0 },
      { type: "M", qubit: 0 },
      { type: "M", qubit: 1 },
      { type: "CNOT", qubit: 2, controlQubit: 1 },
      { type: "CZ", qubit: 2, controlQubit: 0 }
    ],
    defaultQubits: 3,
    minQubits: 3,
    maxQubits: 3,
    parameters: [
      {
        id: "inputState",
        name: "Input State",
        type: "select",
        default: "0",
        options: ["0", "1", "+", "-"],
        description: "The quantum state to teleport"
      }
    ],
    useCases: [
      "Quantum communication networks",
      "Quantum internet",
      "Distributed quantum computing",
      "Quantum cryptography"
    ],
    theory: "Quantum teleportation allows the transfer of a quantum state from one location to another without physically moving the particle. It uses a shared entangled pair and classical communication. The original state is destroyed during the process, preserving the no-cloning theorem.",
    complexity: "O(1) - uses 2 classical bits and 1 ebit"
  },
  {
    id: "qft",
    name: "Quantum Fourier Transform",
    description: "The quantum analog of the discrete Fourier transform, exponentially faster than classical FFT.",
    category: "fundamentals",
    difficulty: "advanced",
    circuit: [
      { type: "H", qubit: 0 },
      { type: "S", qubit: 0, controlQubit: 1 },
      { type: "T", qubit: 0, controlQubit: 2 },
      { type: "H", qubit: 1 },
      { type: "S", qubit: 1, controlQubit: 2 },
      { type: "H", qubit: 2 },
      { type: "SWAP", qubit: 0, controlQubit: 2 },
      { type: "M", qubit: 0 },
      { type: "M", qubit: 1 },
      { type: "M", qubit: 2 }
    ],
    defaultQubits: 3,
    minQubits: 2,
    maxQubits: 6,
    parameters: [
      {
        id: "inputBits",
        name: "Input Value",
        type: "number",
        default: 5,
        min: 0,
        max: 7,
        step: 1,
        description: "Integer value to transform"
      }
    ],
    useCases: [
      "Phase estimation",
      "Shor's algorithm for factoring",
      "Solving linear systems",
      "Quantum simulation"
    ],
    theory: "The Quantum Fourier Transform (QFT) transforms quantum states from the computational basis to the Fourier basis. It's a key component of many quantum algorithms including Shor's factoring algorithm. Unlike classical FFT which takes O(N log N) time, QFT uses only O(log^2 N) gates.",
    complexity: "O(log^2 N) quantum vs O(N log N) classical FFT"
  },
  {
    id: "superdense-coding",
    name: "Superdense Coding",
    description: "Transmit two classical bits using only one qubit by leveraging shared entanglement.",
    category: "fundamentals",
    difficulty: "beginner",
    circuit: [
      { type: "H", qubit: 0 },
      { type: "CNOT", qubit: 1, controlQubit: 0 },
      { type: "X", qubit: 0 },
      { type: "Z", qubit: 0 },
      { type: "CNOT", qubit: 1, controlQubit: 0 },
      { type: "H", qubit: 0 },
      { type: "M", qubit: 0 },
      { type: "M", qubit: 1 }
    ],
    defaultQubits: 2,
    minQubits: 2,
    maxQubits: 2,
    parameters: [
      {
        id: "message",
        name: "Message to Send",
        type: "select",
        default: "11",
        options: ["00", "01", "10", "11"],
        description: "Two classical bits to transmit"
      }
    ],
    useCases: [
      "Quantum communication",
      "Quantum networks",
      "Bandwidth optimization",
      "Secure messaging"
    ],
    theory: "Superdense coding is the inverse of quantum teleportation. By sharing an entangled pair beforehand, Alice can send two classical bits of information to Bob by transmitting only one qubit. This demonstrates how entanglement can be used as a communication resource.",
    complexity: "O(1) - transmits 2 bits per qubit"
  },
  {
    id: "phase-estimation",
    name: "Quantum Phase Estimation",
    description: "Estimate the eigenvalue of a unitary operator, crucial for many quantum algorithms.",
    category: "simulation",
    difficulty: "advanced",
    circuit: [
      { type: "H", qubit: 0 },
      { type: "H", qubit: 1 },
      { type: "H", qubit: 2 },
      { type: "X", qubit: 3 },
      { type: "S", qubit: 3, controlQubit: 2 },
      { type: "S", qubit: 3, controlQubit: 1 },
      { type: "S", qubit: 3, controlQubit: 1 },
      { type: "S", qubit: 3, controlQubit: 0 },
      { type: "S", qubit: 3, controlQubit: 0 },
      { type: "S", qubit: 3, controlQubit: 0 },
      { type: "S", qubit: 3, controlQubit: 0 },
      { type: "H", qubit: 2 },
      { type: "S", qubit: 1, controlQubit: 2 },
      { type: "H", qubit: 1 },
      { type: "T", qubit: 0, controlQubit: 2 },
      { type: "S", qubit: 0, controlQubit: 1 },
      { type: "H", qubit: 0 },
      { type: "M", qubit: 0 },
      { type: "M", qubit: 1 },
      { type: "M", qubit: 2 }
    ],
    defaultQubits: 4,
    minQubits: 3,
    maxQubits: 6,
    parameters: [
      {
        id: "precision",
        name: "Precision Bits",
        type: "number",
        default: 3,
        min: 2,
        max: 5,
        step: 1,
        description: "Number of qubits for precision"
      }
    ],
    useCases: [
      "Finding eigenvalues",
      "Chemistry simulations",
      "Machine learning",
      "Shor's algorithm"
    ],
    theory: "Quantum Phase Estimation determines the phase (eigenvalue) of a unitary operator. Given U|ψ⟩ = e^(2πiθ)|ψ⟩, it finds θ to arbitrary precision. This subroutine is essential for quantum chemistry, solving linear systems, and factoring integers.",
    complexity: "O(1/ε) for precision ε"
  }
];

export const tutorials: Record<string, Tutorial> = {
  "bell-states": {
    algorithmId: "bell-states",
    steps: [
      {
        id: 1,
        title: "What is Entanglement?",
        content: "Quantum entanglement is one of the most fascinating phenomena in physics. When two particles become entangled, the quantum state of one particle is correlated with the other, no matter how far apart they are. This connection is instantaneous and forms the basis of quantum computing and communication.",
        tip: "Einstein called entanglement 'spooky action at a distance' because it seemed to violate the speed of light. We now know it doesn't transmit information faster than light, but the correlations are real!"
      },
      {
        id: 2,
        title: "The Hadamard Gate",
        content: "The first step is applying a Hadamard gate (H) to the first qubit. This creates a superposition: the qubit is now in both |0⟩ and |1⟩ states simultaneously with equal probability. Mathematically: H|0⟩ = (|0⟩ + |1⟩)/√2",
        highlightGates: [0],
        interactiveElement: "run",
        tip: "The Hadamard gate is like a quantum coin flip - it puts the qubit in a perfect 50/50 superposition."
      },
      {
        id: 3,
        title: "The CNOT Gate",
        content: "Next, we apply a CNOT (Controlled-NOT) gate. This flips the second qubit only if the first qubit is |1⟩. Because the first qubit is in superposition, the CNOT entangles the two qubits: when one is |0⟩, so is the other; when one is |1⟩, so is the other.",
        highlightGates: [1],
        interactiveElement: "observe",
        tip: "After the CNOT, measuring one qubit instantly determines what you'll measure on the other - they're now correlated!"
      },
      {
        id: 4,
        title: "Measuring the Bell State",
        content: "When we measure both qubits, we always get correlated results: either |00⟩ or |11⟩, each with 50% probability. You'll never see |01⟩ or |10⟩. This is the signature of the Φ⁺ (Phi-plus) Bell state.",
        highlightGates: [2, 3],
        interactiveElement: "run",
        tip: "Try running the simulation multiple times. Notice you always get matching results - that's entanglement in action!"
      },
      {
        id: 5,
        title: "The Four Bell States",
        content: "There are four maximally entangled Bell states: Φ⁺ = (|00⟩+|11⟩)/√2, Φ⁻ = (|00⟩-|11⟩)/√2, Ψ⁺ = (|01⟩+|10⟩)/√2, Ψ⁻ = (|01⟩-|10⟩)/√2. Each has unique properties and uses. Try changing the Bell State Type parameter to explore them!",
        interactiveElement: "adjust",
        tip: "These four states form a complete basis for two-qubit systems and are used in teleportation and superdense coding."
      }
    ]
  },
  "deutsch-jozsa": {
    algorithmId: "deutsch-jozsa",
    steps: [
      {
        id: 1,
        title: "The Problem",
        content: "Imagine you have a mystery function f(x) that takes binary input and outputs 0 or 1. The function is either CONSTANT (always 0 or always 1) or BALANCED (0 for half the inputs, 1 for the other half). Classically, you'd need to check many inputs to be sure. Quantum computers can tell the difference with just ONE query!",
        tip: "This was one of the first algorithms to prove quantum computers could outperform classical ones for certain tasks."
      },
      {
        id: 2,
        title: "Superposition Setup",
        content: "We start by putting all input qubits into superposition using Hadamard gates. This creates a state where every possible input exists simultaneously. The ancilla qubit is set to |1⟩ and then put in superposition too.",
        highlightGates: [0, 1, 2, 3],
        interactiveElement: "observe"
      },
      {
        id: 3,
        title: "The Oracle",
        content: "The oracle encodes our mystery function. For a balanced function, it applies CNOT gates that flip the ancilla based on the input. For a constant function, it either does nothing (constant 0) or always flips (constant 1). The beauty is that the quantum state accumulates phases that reveal the function type.",
        highlightGates: [4, 5],
        interactiveElement: "adjust",
        tip: "Try switching between constant and balanced functions to see how the circuit behavior changes."
      },
      {
        id: 4,
        title: "Interference",
        content: "After the oracle, we apply Hadamard gates again to the input qubits. This causes quantum interference: for balanced functions, the phases cancel out on |00...0⟩ and amplify other states. For constant functions, they constructively interfere on |00...0⟩.",
        highlightGates: [6, 7],
        interactiveElement: "run"
      },
      {
        id: 5,
        title: "The Result",
        content: "Measure the input qubits: if you get all zeros (|00⟩), the function is CONSTANT. Anything else means BALANCED. This single measurement tells us what would take 2^(n-1)+1 classical queries to determine with certainty!",
        highlightGates: [8, 9],
        interactiveElement: "run",
        tip: "Run the algorithm multiple times with different function types. Notice the all-zeros result for constant functions!"
      }
    ]
  },
  "grovers-search": {
    algorithmId: "grovers-search",
    steps: [
      {
        id: 1,
        title: "The Search Problem",
        content: "Imagine searching for a specific item in an unsorted list of N items. Classically, you might need to check N items in the worst case. Grover's algorithm finds the item in about √N steps - a quadratic speedup that becomes dramatic for large N.",
        tip: "For a million items, classical search takes ~500,000 steps on average. Grover's needs only ~1,000!"
      },
      {
        id: 2,
        title: "Initial Superposition",
        content: "We create an equal superposition of all possible states using Hadamard gates. Each state represents one item in our database, and initially each has equal probability 1/N of being measured.",
        highlightGates: [0, 1, 2],
        interactiveElement: "observe"
      },
      {
        id: 3,
        title: "The Oracle",
        content: "The oracle marks our target state by flipping its phase (multiplying by -1). Visually, while all other amplitudes point 'up', the target now points 'down'. This doesn't change probabilities yet, but sets up the amplification step.",
        highlightGates: [3, 4, 5, 6, 7, 8, 9],
        interactiveElement: "adjust",
        tip: "Try different target states to see how the oracle marks different items."
      },
      {
        id: 4,
        title: "Amplitude Amplification",
        content: "The diffusion operator reflects all amplitudes about the mean. Since the target has negative amplitude, it ends up with amplitude higher than the mean, while others drop below. This is amplitude amplification - the quantum magic of Grover's!",
        highlightGates: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
        interactiveElement: "run"
      },
      {
        id: 5,
        title: "Optimal Iterations",
        content: "Repeat the oracle and diffusion steps about π√N/4 times for optimal results. Too few iterations won't amplify enough; too many will start reducing the probability! This is a unique feature of quantum algorithms - more isn't always better.",
        interactiveElement: "adjust",
        tip: "Adjust the iterations parameter to see how probability changes. Watch what happens if you use too many iterations!"
      }
    ]
  }
};

export function getAlgorithmById(id: string): Algorithm | undefined {
  return algorithms.find(a => a.id === id);
}

export function getAlgorithmsByCategory(category: string): Algorithm[] {
  return algorithms.filter(a => a.category === category);
}

export function getAlgorithmsByDifficulty(difficulty: string): Algorithm[] {
  return algorithms.filter(a => a.difficulty === difficulty);
}

export function getTutorialForAlgorithm(algorithmId: string): Tutorial | undefined {
  return tutorials[algorithmId];
}
