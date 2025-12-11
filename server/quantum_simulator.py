#!/usr/bin/env python3
"""
Quantum Algorithm Simulator using Qiskit
Executes quantum algorithms and returns measurement results.
"""

import json
import sys
import time
from qiskit import QuantumCircuit, transpile
from qiskit_aer import Aer


def create_bell_state(bell_type="phi_plus"):
    """Create one of the four Bell states."""
    qc = QuantumCircuit(2, 2)
    
    qc.h(0)
    qc.cx(0, 1)
    
    if bell_type == "phi_minus":
        qc.z(0)
    elif bell_type == "psi_plus":
        qc.x(1)
    elif bell_type == "psi_minus":
        qc.x(1)
        qc.z(0)
    
    qc.measure([0, 1], [0, 1])
    return qc


def create_deutsch_jozsa(n_qubits=3, function_type="balanced"):
    """Create Deutsch-Jozsa algorithm circuit."""
    qc = QuantumCircuit(n_qubits, n_qubits - 1)
    
    qc.x(n_qubits - 1)
    
    for i in range(n_qubits):
        qc.h(i)
    
    if function_type == "balanced":
        for i in range(n_qubits - 1):
            qc.cx(i, n_qubits - 1)
    elif function_type == "constant_1":
        qc.x(n_qubits - 1)
    
    for i in range(n_qubits - 1):
        qc.h(i)
    
    qc.measure(range(n_qubits - 1), range(n_qubits - 1))
    return qc


def create_bernstein_vazirani(hidden_string="101"):
    """Create Bernstein-Vazirani algorithm circuit."""
    n = len(hidden_string)
    qc = QuantumCircuit(n + 1, n)
    
    qc.x(n)
    
    for i in range(n + 1):
        qc.h(i)
    
    for i, bit in enumerate(reversed(hidden_string)):
        if bit == '1':
            qc.cx(i, n)
    
    for i in range(n):
        qc.h(i)
    
    qc.measure(range(n), range(n))
    return qc


def create_grovers_search(n_qubits=3, target_state="101", iterations=1):
    """Create Grover's search algorithm circuit."""
    qc = QuantumCircuit(n_qubits, n_qubits)
    
    for i in range(n_qubits):
        qc.h(i)
    
    for _ in range(iterations):
        for i, bit in enumerate(reversed(target_state)):
            if bit == '0':
                qc.x(i)
        
        qc.h(n_qubits - 1)
        if n_qubits == 2:
            qc.cx(0, 1)
        elif n_qubits == 3:
            qc.ccx(0, 1, 2)
        else:
            qc.mcx(list(range(n_qubits - 1)), n_qubits - 1)
        qc.h(n_qubits - 1)
        
        for i, bit in enumerate(reversed(target_state)):
            if bit == '0':
                qc.x(i)
        
        for i in range(n_qubits):
            qc.h(i)
            qc.x(i)
        
        qc.h(n_qubits - 1)
        if n_qubits == 2:
            qc.cx(0, 1)
        elif n_qubits == 3:
            qc.ccx(0, 1, 2)
        else:
            qc.mcx(list(range(n_qubits - 1)), n_qubits - 1)
        qc.h(n_qubits - 1)
        
        for i in range(n_qubits):
            qc.x(i)
            qc.h(i)
    
    qc.measure(range(n_qubits), range(n_qubits))
    return qc


def create_quantum_teleportation(input_state="0"):
    """Create quantum teleportation circuit."""
    qc = QuantumCircuit(3, 3)
    
    if input_state == "1":
        qc.x(0)
    elif input_state == "+":
        qc.h(0)
    elif input_state == "-":
        qc.x(0)
        qc.h(0)
    
    qc.h(1)
    qc.cx(1, 2)
    
    qc.cx(0, 1)
    qc.h(0)
    
    qc.measure([0, 1], [0, 1])
    
    qc.cx(1, 2)
    qc.cz(0, 2)
    
    qc.measure(2, 2)
    return qc


def create_qft(n_qubits=3, input_value=0):
    """Create Quantum Fourier Transform circuit."""
    qc = QuantumCircuit(n_qubits, n_qubits)
    
    binary = format(input_value, f'0{n_qubits}b')
    for i, bit in enumerate(binary):
        if bit == '1':
            qc.x(i)
    
    import numpy as np
    for i in range(n_qubits):
        qc.h(i)
        for j in range(i + 1, n_qubits):
            angle = np.pi / (2 ** (j - i))
            qc.cp(angle, j, i)
    
    for i in range(n_qubits // 2):
        qc.swap(i, n_qubits - 1 - i)
    
    qc.measure(range(n_qubits), range(n_qubits))
    return qc


def create_superdense_coding(message="11"):
    """Create superdense coding circuit."""
    qc = QuantumCircuit(2, 2)
    
    qc.h(0)
    qc.cx(0, 1)
    
    if message == "01":
        qc.x(0)
    elif message == "10":
        qc.z(0)
    elif message == "11":
        qc.x(0)
        qc.z(0)
    
    qc.cx(0, 1)
    qc.h(0)
    
    qc.measure([0, 1], [0, 1])
    return qc


def create_phase_estimation(precision=3):
    """Create quantum phase estimation circuit."""
    n_counting = precision
    qc = QuantumCircuit(n_counting + 1, n_counting)
    
    qc.x(n_counting)
    
    for i in range(n_counting):
        qc.h(i)
    
    import numpy as np
    for i in range(n_counting):
        repetitions = 2 ** (n_counting - 1 - i)
        for _ in range(repetitions):
            qc.cp(np.pi / 4, i, n_counting)
    
    for i in range(n_counting // 2):
        qc.swap(i, n_counting - 1 - i)
    
    for i in range(n_counting):
        qc.h(i)
        for j in range(i):
            angle = -np.pi / (2 ** (i - j))
            qc.cp(angle, j, i)
    
    qc.measure(range(n_counting), range(n_counting))
    return qc


def run_circuit(circuit, shots=1024):
    """Execute a quantum circuit on the simulator."""
    simulator = Aer.get_backend('qasm_simulator')
    transpiled = transpile(circuit, simulator)
    job = simulator.run(transpiled, shots=shots)
    result = job.result()
    counts = result.get_counts()
    return counts


def generate_qiskit_code(algorithm_id, params):
    """Generate the Qiskit Python code for an algorithm."""
    qubits = params.get('qubits', 2)
    shots = params.get('shots', 1024)
    
    code_templates = {
        "bell-states": f'''from qiskit import QuantumCircuit, transpile
from qiskit_aer import Aer

# Create Bell State circuit
qc = QuantumCircuit(2, 2)
qc.h(0)
qc.cx(0, 1)
qc.measure([0, 1], [0, 1])

# Execute on simulator
simulator = Aer.get_backend('qasm_simulator')
job = simulator.run(transpile(qc, simulator), shots={shots})
result = job.result()
counts = result.get_counts()
print(counts)''',
        
        "deutsch-jozsa": f'''from qiskit import QuantumCircuit, transpile
from qiskit_aer import Aer

# Deutsch-Jozsa Algorithm
n = {qubits}
qc = QuantumCircuit(n, n-1)

# Initialize ancilla in |1⟩ state
qc.x(n-1)

# Apply Hadamard to all qubits
for i in range(n):
    qc.h(i)

# Oracle for balanced function
for i in range(n-1):
    qc.cx(i, n-1)

# Apply Hadamard to input qubits
for i in range(n-1):
    qc.h(i)

qc.measure(range(n-1), range(n-1))

# Execute
simulator = Aer.get_backend('qasm_simulator')
job = simulator.run(transpile(qc, simulator), shots={shots})
result = job.result()
counts = result.get_counts()
print(counts)''',
        
        "grovers-search": f'''from qiskit import QuantumCircuit, transpile
from qiskit_aer import Aer

# Grover's Search Algorithm
n = {qubits}
qc = QuantumCircuit(n, n)

# Initialize superposition
for i in range(n):
    qc.h(i)

# Grover iteration (oracle + diffusion)
# Oracle marks target state |101⟩
qc.x(1)
qc.ccx(0, 1, 2) if n >= 3 else qc.cx(0, 1)
qc.x(1)

# Diffusion operator
for i in range(n):
    qc.h(i)
    qc.x(i)
qc.ccx(0, 1, 2) if n >= 3 else qc.cx(0, 1)
for i in range(n):
    qc.x(i)
    qc.h(i)

qc.measure(range(n), range(n))

# Execute
simulator = Aer.get_backend('qasm_simulator')
job = simulator.run(transpile(qc, simulator), shots={shots})
result = job.result()
counts = result.get_counts()
print(counts)'''
    }
    
    return code_templates.get(algorithm_id, f"# Code for {algorithm_id}\n# Qubits: {qubits}, Shots: {shots}")


def main():
    """Main function to handle algorithm execution requests."""
    try:
        input_data = json.loads(sys.stdin.read())
        
        algorithm_id = input_data.get('algorithmId', 'bell-states')
        qubits = input_data.get('qubits', 2)
        shots = input_data.get('shots', 1024)
        parameters = input_data.get('parameters', {})
        
        start_time = time.time()
        
        if algorithm_id == "bell-states":
            bell_type = parameters.get('bellType', 'phi_plus')
            circuit = create_bell_state(bell_type)
        elif algorithm_id == "deutsch-jozsa":
            function_type = parameters.get('functionType', 'balanced')
            circuit = create_deutsch_jozsa(qubits, function_type)
        elif algorithm_id == "bernstein-vazirani":
            hidden_string = parameters.get('hiddenString', '101')
            circuit = create_bernstein_vazirani(hidden_string)
        elif algorithm_id == "grovers-search":
            target_state = parameters.get('targetState', '101')
            iterations = int(parameters.get('iterations', 1))
            circuit = create_grovers_search(qubits, target_state, iterations)
        elif algorithm_id == "quantum-teleportation":
            input_state = parameters.get('inputState', '0')
            circuit = create_quantum_teleportation(input_state)
        elif algorithm_id == "qft":
            input_value = int(parameters.get('inputBits', 5))
            circuit = create_qft(qubits, input_value)
        elif algorithm_id == "superdense-coding":
            message = parameters.get('message', '11')
            circuit = create_superdense_coding(message)
        elif algorithm_id == "phase-estimation":
            precision = int(parameters.get('precision', 3))
            circuit = create_phase_estimation(precision)
        else:
            circuit = create_bell_state()
        
        counts = run_circuit(circuit, shots)
        
        execution_time = (time.time() - start_time) * 1000
        
        total_counts = sum(counts.values())
        probabilities = {state: count / total_counts for state, count in counts.items()}
        
        qiskit_code = generate_qiskit_code(algorithm_id, {
            'qubits': qubits,
            'shots': shots,
            **parameters
        })
        
        result = {
            "success": True,
            "result": {
                "counts": counts,
                "probabilities": probabilities,
                "shots": shots,
                "executionTime": execution_time
            },
            "qiskitCode": qiskit_code
        }
        
        print(json.dumps(result))
        
    except Exception as e:
        error_result = {
            "success": False,
            "error": str(e),
            "qiskitCode": "# Error occurred during execution"
        }
        print(json.dumps(error_result))
        sys.exit(1)


if __name__ == "__main__":
    main()
