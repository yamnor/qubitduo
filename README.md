# Qubit Duo

## Try it now

Qubit Duo is available online at: https://qubitduo.vercel.app

## Overview

Qubit Duo is a quantum entanglement simulator that allows users to manipulate the states of two qubits (Alice and Bob) and apply quantum gates to observe their behavior. The simulator provides a visual and interactive way to understand quantum entanglement, superposition, and the effects of environmental noise.

## Features

- Toggle the states of two qubits (Alice and Bob) between 0 and 1.
- Apply Hadamard (H) gates to create superposition states.
- Apply CNOT gates to entangle the qubits.
- Adjust the noise level to simulate environmental noise.
- Visualize the time evolution of the qubits' states.
- View a histogram of measurement results.
- Responsive design for both desktop and mobile devices.
- Help and information modal with additional resources and contact information.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yamnor/qubitduo.git
   cd qubitduo
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

## Usage

### Toggling Qubit States

- Click on the Alice or Bob qubit to toggle their states between 0 and 1.

### Applying Quantum Gates

- **Hadamard Gate (H):** Click the "H" button below the qubit to apply a Hadamard gate, creating a superposition state.
- **CNOT Gate:** Click the "CNOT" button to entangle the qubits. The control qubit is Alice, and the target qubit is Bob.

### Adjusting Noise Level

- Use the noise level slider to simulate environmental noise. The slider is located below the qubit control buttons. Adjust the slider to increase or decrease the noise level.

### Viewing Time Evolution

- The "Time Evolution" section displays a line chart showing the states of Alice and Bob over time. The chart updates in real-time as you interact with the qubits and apply gates.

### Viewing Measurement Histogram

- The "Histogram" section shows the measurement results for the qubits. It displays the frequency of each state (00, 01, 10, 11) as you perform measurements.

### Resetting States and Histogram

- **Reset Qubit States:** Click the "Reset" button to reset Alice and Bob to their initial states (0).
- **Reset Histogram:** Click the "Reset" button below the histogram to clear the measurement results.

## Contact

For more information or support, please contact us at [@yamnor](https://x.com/yamnor).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
