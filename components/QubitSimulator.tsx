'use client'

import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Slider } from './ui/slider';
import { RefreshCcw, Trash2, HelpCircle } from 'lucide-react';
import Modal from './ui/modal';

const QuantumBit = ({ state, onClick, name, isNoisy }: { state: string; onClick: () => void; name: string, isNoisy: boolean }) => (
  <div 
    className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold cursor-pointer
                ${state === '0' ? 'bg-blue-500 text-white' : 
                  state === '1' ? 'bg-red-500 text-white' : 
                  state === '+' ? 'bg-gradient-superposition text-white' : 
                  state === '-' ? 'bg-gradient-superposition text-white' : 
                  'bg-gradient-entangled text-white'}
                ${isNoisy ? 'animate-bounce' : ''}`}
    onClick={onClick}
  >
    {state}
  </div>
);

const QuantumGate = ({ name, onClick, Icon, color }: { name: string; onClick: () => void; Icon?: any; color: string }) => (
  <button
    className={`px-4 py-2 rounded ${color} hover:bg-opacity-80 text-white font-bold m-2 flex items-center justify-center space-x-2`}
    onClick={onClick}
  >
    {Icon && <Icon className="h-5 w-5" />}
    <span>{name}</span>
  </button>
);

const QubitSimulator = () => {
  const [alice, setAlice] = useState<string>('0');
  const [bob, setBob] = useState<string>('0');
  const [entangled, setEntangled] = useState(false);
  const [noiseLevel, setNoiseLevel] = useState(0);
  const [timeData, setTimeData] = useState<Array<{ alice: number; bob: number; entangled: number }>>([]);
  const [stateDistribution, setStateDistribution] = useState({
    '00': 0, '01': 0, '10': 0, '11': 0
  });
  const [measurementCount, setMeasurementCount] = useState(0);
  const [isInitialized, setIsInitialized] = useState(true);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isNoisy, setIsNoisy] = useState(false);

  const MAX_NOISE_LEVEL = 0.1;
  const MAX_TIME_POINTS = 50;

  useEffect(() => {
    const interval = setInterval(() => {
      updateTimeData();
      applyNoise();
    }, 100);
    return () => clearInterval(interval);
  }, [alice, bob, noiseLevel, entangled]);

  const getStateValue = (state: string): number => {
    if (state === '0') return 0;
    if (state === '1') return 1;
    return 0.5;  // Superposition state
  };

  const updateTimeData = () => {
    setTimeData(prevData => {
      const newData = [...prevData, {
        alice: getStateValue(alice),
        bob: getStateValue(bob),
        entangled: entangled ? 1 : 0
      }];
      return newData.slice(-MAX_TIME_POINTS);
    });
  };

  const updateStateDistribution = (aliceState: string, bobState: string) => {
    setStateDistribution(prev => {
      const state = aliceState + bobState;
      return {
        ...prev,
        [state]: prev[state as keyof typeof prev] + 1
      };
    });
    setMeasurementCount(prev => prev + 1);
  };

  const applyNoise = () => {
    if (Math.random() < noiseLevel) {
      setIsNoisy(true);
      setTimeout(() => setIsNoisy(false), 100); // Remove animation after 1 second
  
      if (entangled) {
        if (Math.random() < 0.5) {
          setAlice(prev => prev === '0' ? '1' : '0');
          setBob(prev => prev === '0' ? '1' : '0');
        } else {
          setEntangled(false);
          const measurementResultAlice = Math.random() < 0.5 ? '0' : '1';
          const measurementResultBob = Math.random() < 0.5 ? '0' : '1';
          setAlice(measurementResultAlice);
          setBob(measurementResultBob);
        }
      } else {
        if (Math.random() < 0.5) {
          setAlice(prev => prev === '0' ? '1' : prev === '1' ? '0' : prev);
        } else {
          setBob(prev => prev === '0' ? '1' : prev === '1' ? '0' : prev);
        }
      }
    }
  };

  const toggleQubit = (qubit: string, setQubit: React.Dispatch<React.SetStateAction<string>>) => {
    setQubit(prev => prev === '0' ? '1' : '0');
    checkEntanglement(alice, bob);
  };

  const applyHadamardGate = (qubit: string, setQubit: React.Dispatch<React.SetStateAction<string>>) => {
    setQubit(prev => {
      if (prev === '0') return '+';
      if (prev === '1') return '-';
      if (prev === '+') return '0';
      if (prev === '-') return '1';
      return prev;
    });
    checkEntanglement(alice, bob);
  };

  const applyCNOTGate = () => {
    if (alice === '0') {
      // Do nothing
    } else if (alice === '1') {
      setBob(prev => prev === '0' ? '1' : '0');
    } else if (alice === '+' || alice === '-') {
      if (bob === '0' || bob === '1') {
        setEntangled(true);
      }
    }
    checkEntanglement(alice, bob);
  };

  const checkEntanglement = (aliceState: string, bobState: string) => {
    const isEntangled = (
        (aliceState === '+' && bobState === '0') ||
        (aliceState === '+' && bobState === '1') ||
        (aliceState === '-' && bobState === '0') ||
        (aliceState === '-' && bobState === '1')
    );

    if (isEntangled) {
        if (aliceState === '+' && bobState === '0') {
            setAlice('Φ+');
            setBob('Φ+');
        } else if (aliceState === '-' && bobState === '0') {
            setAlice('Φ-');
            setBob('Φ-');
        } else if (aliceState === '+' && bobState === '1') {
            setAlice('Ψ+');
            setBob('Ψ+');
        } else if (aliceState === '-' && bobState === '1') {
            setAlice('Ψ-');
            setBob('Ψ-');
        }
        setEntangled(true);
    } else {
        setEntangled(false);
    }
  };

  const measureQubit = (qubit: string, setQubit: React.Dispatch<React.SetStateAction<string>>, name: string) => {
    let newAlice: string, newBob: string;
    if (entangled) {
        const measurementResult = Math.random() < 0.5 ? '0' : '1';
        if (name === 'Alice') {
            newAlice = measurementResult;
            newBob = (alice === 'Ψ+' || alice === 'Ψ-') ? (measurementResult === '0' ? '1' : '0') : measurementResult;
        } else {
            newBob = measurementResult;
            newAlice = (bob === 'Ψ+' || bob === 'Ψ-') ? (measurementResult === '0' ? '1' : '0') : measurementResult;
        }
        setAlice(newAlice);
        setBob(newBob);
        setEntangled(false);
    } else {
        if (name === 'Alice') {
            newAlice = (qubit === '+' || qubit === '-') ? (Math.random() < 0.5 ? '0' : '1') : qubit;
            setAlice(newAlice);
            newBob = bob;
        } else {
            newAlice = alice;
            newBob = (qubit === '+' || qubit === '-') ? (Math.random() < 0.5 ? '0' : '1') : qubit;
            setBob(newBob);
        }
    }

    updateStateDistribution(newAlice, newBob);
    checkEntanglement(newAlice, newBob);
  };

  const resetQubitStates = () => {
    setAlice('0');
    setBob('0');
    setEntangled(false);
  };

  const resetDistribution = () => {
    setStateDistribution({ '00': 0, '01': 0, '10': 0, '11': 0 });
    setMeasurementCount(0);
  };

  const histogramData = Object.entries(stateDistribution).map(([state, count]) => ({
    state,
    count
  }));

  if (!isInitialized) {
    return null;
  }

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-7xl relative">
        <button
          className="absolute top-0 right-0 p-2 bg-gray-300 rounded-full hover:bg-gray-400"
          onClick={() => setIsHelpModalOpen(true)}
        >
          <HelpCircle className="h-6 w-6 text-gray-700" />
        </button>
        <h1 className="text-3xl font-bold mb-2 text-center">Qubit Duo</h1>
        <div className="flex flex-row flex-wrap justify-center items-center space-x-4 mb-2">
          <div className="flex flex-col items-center">
            <h2 className="text-xl text-gray-500 mb-2">Alice</h2>
            <QuantumBit state={alice} onClick={() => toggleQubit(alice, setAlice)} name="Alice" isNoisy={isNoisy} />
            <QuantumGate name="H" onClick={() => applyHadamardGate(alice, setAlice)} color="bg-green-500" />
            <button
              className="px-4 py-2 rounded bg-purple-500 hover:bg-purple-600 text-white font-bold mt-2"
              onClick={() => measureQubit(alice, setAlice, 'Alice')}
            >
              Measure
            </button>
          </div>
          <div className="flex flex-col items-center mt-4 md:mt-0">
            <QuantumGate name="CNOT" onClick={applyCNOTGate} color="bg-yellow-500" />
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-xl text-gray-500 mb-2">Bob</h2>
            <QuantumBit state={bob} onClick={() => toggleQubit(bob, setBob)} name="Bob" isNoisy={isNoisy} />
            <QuantumGate name="H" onClick={() => applyHadamardGate(bob, setBob)} color="bg-green-500" />
            <button
              className="px-4 py-2 rounded bg-purple-500 hover:bg-purple-600 text-white font-bold mt-2"
              onClick={() => measureQubit(bob, setBob, 'Bob')}
            >
              Measure
            </button>
          </div>
        </div>
        <div className="flex space-x-4 mb-4 justify-center">
          <button
            className="px-4 py-2 rounded bg-gray-500 hover:bg-gray-600 text-white font-bold flex items-center space-x-2"
            onClick={resetQubitStates}
          >
            <RefreshCcw className="h-5 w-5" />
            <span>Reset</span>
          </button>
        </div>
        <div className="w-full flex justify-center mb-4">
          <div className="w-full md:w-1/3">
            <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
              Noise Level: {(noiseLevel * 100).toFixed(1)}%
            </label>
            <Slider
              value={[noiseLevel]}
              onValueChange={(value) => setNoiseLevel(value[0])}
              max={MAX_NOISE_LEVEL}
              step={0.001}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row w-full md:space-x-4">
          <div className="mb-4 flex flex-col items-center w-full md:w-1/2">
            <h3 className="text-xl text-gray-500 mb-2 text-center">Time Evolution</h3>
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis tick={false} />
                  <YAxis domain={[0, 1]} tickCount={3} />
                  <Tooltip />
                  <Legend />
                  <Line type="stepAfter" dataKey="alice" stroke="#ec4899" strokeWidth={2} dot={false} name="Alice" />
                  <Line type="stepAfter" dataKey="bob" stroke="#0ea5e9" strokeWidth={2} dot={false} name="Bob" />
                  <Line type="stepAfter" dataKey="entangled" stroke="#eab308" strokeWidth={2} dot={false} name="Entangled" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="mb-4 flex flex-col items-center w-full md:w-1/2">
            <h3 className="text-xl text-gray-500 mb-2 text-center">Histogram</h3>
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={histogramData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="state" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#eab308" name="Count" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <button
              className="px-4 py-2 rounded bg-gray-500 hover:bg-gray-600 text-white font-bold mt-2 flex items-center space-x-2"
              onClick={resetDistribution}
            >
              <Trash2 className="h-5 w-5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>
      {isHelpModalOpen && (
        <Modal onClose={() => setIsHelpModalOpen(false)}>
          <h2 className="text-xl font-bold mb-4">Help</h2>
          <p className="mb-4">This is a quantum entanglement simulator. You can manipulate the states of two qubits (Alice and Bob) and apply quantum gates to observe their behavior.</p>
          <h3 className="text-lg font-semibold mb-2">Usage:</h3>
          <ul className="list-disc list-outside mb-4 mx-4">
            <li>Click on the qubits (Alice or Bob) to toggle their states between 0 and 1.</li>
            <li>Use the H button to apply a Hadamard gate and create a superposition state.</li>
            <li>Use the CNOT button to entangle the qubits.</li>
            <li>Adjust the noise level using the slider to simulate environmental noise.</li>
          </ul>
          <h3 className="text-lg font-semibold mb-2">Info:</h3>
          <ul className="list-disc list-outside mb-4 mx-4">
            <li>GitHub: <a href="https://github.com/yamnor/qubitduo" target="_blank" className="text-blue-500 hover:text-blue-700">yamnor/qubitduo</a></li>
          </ul>
          <p className="text-sm text-gray-500">Developed by: Nori Yamamoto (<a href="https://x.com/yamnor" target="_blank" className="text-blue-500 hover:text-blue-700">@yamnor</a>)
          </p>
        </Modal>
      )}
    </div>
  );
};

export default QubitSimulator;
