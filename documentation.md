# Quantum Algorithm Zoo

An interactive educational platform for learning quantum computing through hands-on exploration. Built by the ACM UOT Student Chapter.

## Overview

Quantum Zoo provides a web-based interface for running, visualizing, and understanding quantum algorithms. It uses IBM's Qiskit framework for real quantum simulations.

## Features

- **8+ Quantum Algorithms**: Bell States, Deutsch-Jozsa, Bernstein-Vazirani, Grover's Search, Quantum Teleportation, QFT, Superdense Coding, Phase Estimation
- **Interactive Visualizations**: Quantum circuit diagrams, probability charts, measurement results
- **Step-by-Step Tutorials**: Beginner-friendly explanations for each algorithm
- **Real Simulations**: Powered by Qiskit for authentic quantum behavior
- **Parameter Controls**: Adjust qubits, shots, and algorithm-specific settings
- **Code Export**: View and copy the Qiskit Python code for each algorithm

## Tech Stack

### Frontend
- React with TypeScript
- Tailwind CSS + Shadcn UI components
- Recharts for data visualization
- Wouter for routing
- TanStack Query for data fetching

### Backend
- Express.js API server
- Python + Qiskit for quantum simulations
- Qiskit Aer simulator backend

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── algorithm-card.tsx
│   │   │   ├── circuit-visualizer.tsx
│   │   │   ├── code-display.tsx
│   │   │   ├── navigation.tsx
│   │   │   ├── parameter-controls.tsx
│   │   │   ├── results-dashboard.tsx
│   │   │   ├── theme-toggle.tsx
│   │   │   └── tutorial-viewer.tsx
│   │   ├── lib/
│   │   │   ├── algorithms.ts  # Algorithm definitions & tutorials
│   │   │   ├── theme.tsx      # Dark/light mode provider
│   │   │   └── utils.ts
│   │   ├── pages/
│   │   │   ├── home.tsx
│   │   │   ├── algorithms.tsx
│   │   │   ├── algorithm-detail.tsx
│   │   │   ├── tutorials.tsx
│   │   │   └── about.tsx
│   │   └── App.tsx
├── server/
│   ├── index.ts             # Express server entry
│   ├── routes.ts            # API endpoints
│   ├── quantum_simulator.py # Qiskit simulation engine
│   └── storage.ts           # Data storage interface
├── shared/
│   └── schema.ts            # TypeScript types & schemas
└── design_guidelines.md     # UI/UX design specifications
```

## API Endpoints

### POST /api/execute
Execute a quantum algorithm simulation.

**Request:**
```json
{
  "algorithmId": "bell-states",
  "qubits": 2,
  "shots": 1024,
  "parameters": {
    "bellType": "phi_plus"
  }
}
```

**Response:**
```json
{
  "success": true,
  "result": {
    "counts": {"00": 512, "11": 512},
    "probabilities": {"00": 0.5, "11": 0.5},
    "shots": 1024,
    "executionTime": 150.5
  },
  "qiskitCode": "..."
}
```

### GET /api/algorithms
List all available algorithms.

### GET /api/health
Health check endpoint.

## Running the Application

The application runs with `npm run dev` which starts:
- Express server on port 5000
- Vite dev server for frontend hot reloading

## Quantum Algorithms Included

1. **Bell States** (Beginner) - Create maximally entangled qubit pairs
2. **Deutsch-Jozsa** (Beginner) - Determine if a function is constant or balanced
3. **Bernstein-Vazirani** (Beginner) - Find a hidden bit string
4. **Superdense Coding** (Beginner) - Transmit 2 classical bits with 1 qubit
5. **Grover's Search** (Intermediate) - Quadratic speedup for database search
6. **Quantum Teleportation** (Intermediate) - Transfer quantum states
7. **Quantum Fourier Transform** (Advanced) - Basis transformation
8. **Phase Estimation** (Advanced) - Estimate eigenvalues

## Recent Changes

- Initial implementation with full frontend and backend
- Qiskit integration for real quantum simulations
- Interactive tutorials for Bell States, Deutsch-Jozsa, and Grover's Search
- Dark/light mode support
- Responsive design for mobile and desktop

## User Preferences

- Educational focus - explanations prioritized for beginners
- ACM UOT branding and academic styling
- Clean, modern interface with minimal distractions
