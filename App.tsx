import React, { useState } from 'react';
import { Shield, AlertTriangle, Zap, Code2, CheckCircle2, XCircle, Info } from 'lucide-react';

type Severity = 'high' | 'medium' | 'low';

interface Issue {
  id: string;
  severity: Severity;
  title: string;
  description: string;
  recommendation: string;
}

function App() {
  const [code, setCode] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const mockIssues: Issue[] = [
    {
      id: '1',
      severity: 'high',
      title: 'Reentrancy Vulnerability',
      description: 'The contract may be vulnerable to reentrancy attacks due to state changes after external calls.',
      recommendation: 'Implement checks-effects-interactions pattern and use ReentrancyGuard.'
    },
    {
      id: '2',
      severity: 'medium',
      title: 'Unoptimized Gas Usage',
      description: 'Multiple state variable updates could be batched to save gas.',
      recommendation: 'Consider combining state updates into a single transaction.'
    },
    {
      id: '3',
      severity: 'low',
      title: 'Floating Pragma',
      description: 'Contract uses a floating pragma statement.',
      recommendation: 'Lock the pragma to a specific compiler version.'
    }
  ];

  const handleAnalyze = () => {
    if (!code.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  const getSeverityColor = (severity: Severity) => {
    switch (severity) {
      case 'high':
        return 'text-red-400';
      case 'medium':
        return 'text-orange-400';
      case 'low':
        return 'text-yellow-400';
      default:
        return 'text-gray-400';
    }
  };

  const getSeverityBg = (severity: Severity) => {
    switch (severity) {
      case 'high':
        return 'bg-red-900/20';
      case 'medium':
        return 'bg-orange-900/20';
      case 'low':
        return 'bg-yellow-900/20';
      default:
        return 'bg-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <nav className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-purple-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
              AuditX.ai
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="bg-gray-900 rounded-xl border border-gray-800 shadow-lg backdrop-blur-sm">
              <div className="p-6">
                <h2 className="text-lg font-bold mb-4 flex items-center text-purple-400">
                  <Code2 className="h-5 w-5 mr-2" />
                  Smart Contract Analysis
                </h2>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Paste your Solidity smart contract code here..."
                  className="w-full h-96 p-4 bg-gray-950 border border-gray-800 rounded-lg font-mono text-sm 
                    focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-gray-300
                    placeholder-gray-600"
                  spellCheck="false"
                />
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !code.trim()}
                  className="mt-4 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-lg
                    hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed 
                    transition-all duration-200 flex items-center justify-center font-semibold"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      Analyzing Contract...
                    </>
                  ) : (
                    <>
                      <Zap className="h-5 w-5 mr-2" />
                      Analyze Contract
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {showResults && (
            <div className="space-y-6">
              <div className="bg-gray-900 rounded-xl border border-gray-800 shadow-lg p-6 backdrop-blur-sm">
                <h2 className="text-lg font-bold mb-6 text-purple-400">Analysis Results</h2>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-red-900/20 border border-red-800/50 p-4 rounded-lg">
                    <div className="font-semibold text-red-400">Critical</div>
                    <div className="text-2xl font-bold text-red-300">1</div>
                  </div>
                  <div className="bg-orange-900/20 border border-orange-800/50 p-4 rounded-lg">
                    <div className="font-semibold text-orange-400">Warning</div>
                    <div className="text-2xl font-bold text-orange-300">1</div>
                  </div>
                  <div className="bg-yellow-900/20 border border-yellow-800/50 p-4 rounded-lg">
                    <div className="font-semibold text-yellow-400">Notice</div>
                    <div className="text-2xl font-bold text-yellow-300">1</div>
                  </div>
                </div>

                <div className="space-y-4">
                  {mockIssues.map((issue) => (
                    <div
                      key={issue.id}
                      className={`${getSeverityBg(issue.severity)} border border-gray-800 rounded-lg p-4 backdrop-blur-sm`}
                    >
                      <div className="flex items-start">
                        {issue.severity === 'high' ? (
                          <XCircle className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                        ) : issue.severity === 'medium' ? (
                          <AlertTriangle className="h-5 w-5 text-orange-400 mt-1 flex-shrink-0" />
                        ) : (
                          <Info className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" />
                        )}
                        <div className="ml-3 flex-1">
                          <h3 className={`text-lg font-semibold ${getSeverityColor(issue.severity)}`}>
                            {issue.title}
                          </h3>
                          <p className="text-gray-400 mt-1">{issue.description}</p>
                          <div className="mt-2 border-t border-gray-800 pt-2">
                            <h4 className="font-medium text-purple-400">Recommendation:</h4>
                            <p className="text-gray-400">{issue.recommendation}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl border border-gray-800 shadow-lg p-6 backdrop-blur-sm">
                <h2 className="text-lg font-bold mb-4 flex items-center text-purple-400">
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                  Security Checklist
                </h2>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center bg-gray-800/50 p-3 rounded-lg">
                    <CheckCircle2 className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                    <span>Use SafeMath for arithmetic operations</span>
                  </li>
                  <li className="flex items-center bg-gray-800/50 p-3 rounded-lg">
                    <CheckCircle2 className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                    <span>Implement access control using OpenZeppelin's Ownable</span>
                  </li>
                  <li className="flex items-center bg-gray-800/50 p-3 rounded-lg">
                    <CheckCircle2 className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                    <span>Add comprehensive event logging</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;