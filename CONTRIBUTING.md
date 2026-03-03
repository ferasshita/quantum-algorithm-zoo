# Contributing to Quantum Algorithm Zoo

Thank you for your interest in contributing to the **Quantum Algorithm Zoo**! This project is maintained by the **ACM Student Chapter at University of Tripoli** as part of the "Year of Quantum" initiative. We welcome contributions from the quantum computing community.

Please take a moment to read this guide before submitting a contribution.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Reporting Issues](#reporting-issues)

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it before contributing.

## Getting Started

1. **Fork** the repository on GitHub.
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/<your-username>/quantum-algorithm-zoo.git
   cd quantum-algorithm-zoo
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the development server**:
   ```bash
   npm run dev
   ```

## How to Contribute

### New Algorithms

- Implement the algorithm in Python using [Qiskit](https://qiskit.org/) under `server/quantum/algorithms/`.
- Add the algorithm metadata in `client/src/lib/algorithms.ts`.
- Include a tutorial in `client/src/lib/tutorials/`.
- Add tests for the Python implementation.

### Tutorials & Documentation

- Add or improve tutorials under `client/src/lib/tutorials/`.
- Contributions in both English and Arabic are welcome.

### Bug Fixes

- Reference the related issue in your pull request description.
- Add a test that reproduces the bug when possible.

### Visualizations & UI

- Follow the existing component patterns in `client/src/components/`.
- Use the project's Tailwind CSS and Shadcn UI conventions.

## Development Workflow

1. Create a feature branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes with clear, focused commits.
3. Run the tests:
   ```bash
   npm test
   ```
4. Push your branch and open a pull request against `main`.

## Coding Standards

- **TypeScript**: Follow strict typing; avoid `any` where possible.
- **Python**: Follow [PEP 8](https://pep8.org/) and add type hints.
- **Commits**: Use clear, descriptive commit messages in the imperative mood (e.g., `Add Shor's algorithm simulation`).
- **Tests**: Add tests for new functionality.

## Submitting a Pull Request

1. Ensure your branch is up to date with `main`.
2. Fill out the pull request template completely.
3. Link any related issues using GitHub keywords (e.g., `Closes #42`).
4. Request a review from a maintainer.

Pull requests that do not pass CI checks or lack sufficient description may be closed without merging.

## Reporting Issues

Use the [issue tracker](https://github.com/ferasshita/quantum-algorithm-zoo/issues) to report bugs or request features. Please check for existing issues before opening a new one, and use the provided templates.

---

*Questions? Reach us at **uotacm@gmail.com** or open a [GitHub Discussion](https://github.com/ferasshita/quantum-algorithm-zoo/discussions).*
