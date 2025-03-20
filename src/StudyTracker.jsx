import React, { useState, useEffect } from 'react';
import {
  CalendarDays,
  CheckCircle,
  BookOpen,
  Code,
  FileCode,
  Layers,
  Database,
  GitBranch,
  Server,
  Brain,
  Sun,
  Moon,
  X
} from 'lucide-react';

function StudyTracker() {
  const [completedTopics, setCompletedTopics] = useState(() => {
    // Initialize state from localStorage if available, otherwise empty object
    const savedTopics = localStorage.getItem('completedTopics');
    return savedTopics ? JSON.parse(savedTopics) : {};
  });

  const [topicNotes, setTopicNotes] = useState(() => {
    const savedNotes = localStorage.getItem('topicNotes');
    return savedNotes ? JSON.parse(savedNotes) : {};
  });

  const [selectedTopic, setSelectedTopic] = useState(null);
  const [noteText, setNoteText] = useState('');

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  // Save to localStorage whenever completedTopics changes
  useEffect(() => {
    localStorage.setItem('completedTopics', JSON.stringify(completedTopics));
  }, [completedTopics]);

  useEffect(() => {
    localStorage.setItem('topicNotes', JSON.stringify(topicNotes));
  }, [topicNotes]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);
  
  const modules = [
    {
      id: 'oop',
      title: 'Object-Oriented Programming',
      weeks: ['Week 1-2'],
      icon: <Code className="h-5 w-5" />,
      color: 'bg-blue-100',
      topics: [
        { id: 'encapsulation', name: 'Encapsulation' },
        { id: 'inheritance', name: 'Inheritance' },
        { id: 'polymorphism', name: 'Polymorphism' },
        { id: 'abstraction', name: 'Abstraction' },
        { id: 'overloading', name: 'Overloading' },
        { id: 'overriding', name: 'Overriding' },
        { id: 'interfaces', name: 'Interfaces & Abstract Classes' }
      ]
    },
    {
      id: 'principles',
      title: 'Design Principles & Patterns',
      weeks: ['Week 3-4'],
      icon: <FileCode className="h-5 w-5" />,
      color: 'bg-green-100',
      topics: [
        { id: 'srp', name: 'Single Responsibility Principle' },
        { id: 'ocp', name: 'Open/Closed Principle' },
        { id: 'lsp', name: 'Liskov Substitution Principle' },
        { id: 'isp', name: 'Interface Segregation Principle' },
        { id: 'dip', name: 'Dependency Inversion Principle' },
        { id: 'creational', name: 'Creational Patterns' },
        { id: 'structural', name: 'Structural Patterns' },
        { id: 'behavioral', name: 'Behavioral Patterns' }
      ]
    },
    {
      id: 'dsa',
      title: 'Data Structures & Algorithms',
      weeks: ['Week 5-6'],
      icon: <Layers className="h-5 w-5" />,
      color: 'bg-purple-100',
      topics: [
        { id: 'arrays', name: 'Arrays & Linked Lists' },
        { id: 'stacks', name: 'Stacks & Queues' },
        { id: 'trees', name: 'Trees' },
        { id: 'hash', name: 'Hash Tables' },
        { id: 'complexity', name: 'Big O Notation' },
        { id: 'sorting', name: 'Sorting Algorithms' },
        { id: 'searching', name: 'Searching Algorithms' },
        { id: 'recursion', name: 'Recursion' }
      ]
    },
    {
      id: 'paradigms',
      title: 'Programming Paradigms & Architecture',
      weeks: ['Week 7-8'],
      icon: <BookOpen className="h-5 w-5" />,
      color: 'bg-yellow-100',
      topics: [
        { id: 'functional', name: 'Functional Programming' },
        { id: 'imperative', name: 'Imperative vs Declarative' },
        { id: 'reactive', name: 'Reactive Programming' },
        { id: 'mvc', name: 'MVC Architecture' },
        { id: 'mvvm', name: 'MVVM Architecture' },
        { id: 'layers', name: 'Layered Architecture' },
        { id: 'di', name: 'Dependency Injection' },
        { id: 'ddd', name: 'Domain-Driven Design' }
      ]
    },
    {
      id: 'systems',
      title: 'Systems & Infrastructure',
      weeks: ['Week 9-10'],
      icon: <Server className="h-5 w-5" />,
      color: 'bg-red-100',
      topics: [
        { id: 'processes', name: 'Processes & Threads' },
        { id: 'sync', name: 'Synchronization' },
        { id: 'memory', name: 'Memory Management' },
        { id: 'concurrency', name: 'Concurrency' },
        { id: 'databases', name: 'Database Design' },
        { id: 'transactions', name: 'ACID Transactions' },
        { id: 'normalization', name: 'Normalization' },
        { id: 'nosql', name: 'SQL vs NoSQL' }
      ]
    },
    {
      id: 'engineering',
      title: 'Software Engineering & Theory',
      weeks: ['Week 11-12'],
      icon: <Brain className="h-5 w-5" />,
      color: 'bg-indigo-100',
      topics: [
        { id: 'testing', name: 'Testing Methodologies' },
        { id: 'git', name: 'Version Control' },
        { id: 'cicd', name: 'CI/CD' },
        { id: 'refactoring', name: 'Refactoring' },
        { id: 'automata', name: 'Automata Theory' },
        { id: 'complexity', name: 'Complexity Classes' },
        { id: 'languages', name: 'Formal Languages' },
        { id: 'computability', name: 'Computability' }
      ]
    }
  ];

  const toggleTopic = (moduleId, topicId) => {
    setCompletedTopics(prev => {
      const key = `${moduleId}-${topicId}`;
      return {
        ...prev,
        [key]: !prev[key]
      };
    });
    setSelectedTopic({ moduleId, topicId });
    setNoteText(topicNotes[`${moduleId}-${topicId}`] || '');
  };

  const saveNote = () => {
    if (selectedTopic) {
      const key = `${selectedTopic.moduleId}-${selectedTopic.topicId}`;
      setTopicNotes(prev => ({
        ...prev,
        [key]: noteText
      }));
      setSelectedTopic(null);
      setNoteText('');
    }
  };

  const closeNoteModal = () => {
    setSelectedTopic(null);
    setNoteText('');
  };

  const calculateProgress = (moduleId) => {
    const moduleTopics = modules.find(m => m.id === moduleId).topics;
    const completedCount = moduleTopics.filter(topic => 
      completedTopics[`${moduleId}-${topic.id}`]
    ).length;
    return (completedCount / moduleTopics.length) * 100;
  };

  const calculateTotalProgress = () => {
    const totalTopics = modules.reduce((sum, module) => sum + module.topics.length, 0);
    const completedCount = Object.values(completedTopics).filter(Boolean).length;
    return (completedCount / totalTopics) * 100;
  };

  return (
    <div className="max-w-4xl mx-auto p-4 dark:bg-gray-900 min-h-screen">
      <header className="mb-8">
        <div className="flex items-center justify-center gap-4">
          <CalendarDays className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <span className="text-sm text-gray-600 dark:text-gray-400">12-Week Plan</span>
          
          <div className="ml-4 flex items-center gap-2">
            <div className="w-48 h-3 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div 
                className="h-full bg-blue-500 rounded-full" 
                style={{ width: `${calculateTotalProgress()}%` }}
              ></div>
            </div>
            <span className="text-sm font-semibold dark:text-white">{Math.round(calculateTotalProgress())}% Complete</span>
          </div>
        </div>
      </header>

      <div className="space-y-6">
        {modules.map(module => (
          <div 
            key={module.id} 
            className={`border rounded-lg p-4 ${module.color} dark:bg-opacity-20 dark:border-gray-700`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {module.icon}
                <h2 className="text-lg font-semibold dark:text-white">{module.title}</h2>
                <span className="text-xs bg-white dark:bg-gray-800 dark:text-white px-2 py-1 rounded">{module.weeks}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div 
                    className="h-full bg-green-500 rounded-full" 
                    style={{ width: `${calculateProgress(module.id)}%` }}
                  ></div>
                </div>
                <span className="text-xs dark:text-white">{Math.round(calculateProgress(module.id))}%</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {module.topics.map(topic => (
                <div 
                  key={topic.id}
                  className={`p-2 rounded cursor-pointer flex items-center gap-2 transition-colors ${
                    completedTopics[`${module.id}-${topic.id}`] 
                      ? 'bg-green-200 dark:bg-green-900' 
                      : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => toggleTopic(module.id, topic.id)}
                >
                  <CheckCircle 
                    className={`h-4 w-4 ${
                      completedTopics[`${module.id}-${topic.id}`] 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-gray-300 dark:text-gray-500'
                    }`}
                  />
                  <span className="text-sm dark:text-white">{topic.name}</span>
                  {topicNotes[`${module.id}-${topic.id}`] && (
                    <span className="ml-auto text-xs text-blue-500 dark:text-blue-400">(Notes)</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedTopic && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold dark:text-white">Add Notes for Topic</h3>
              <button
                onClick={closeNoteModal}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Write your notes about this topic..."
              className="w-full h-32 p-2 border rounded-lg mb-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={closeNoteModal}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={saveNote}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        {/* ... rest of your existing code ... */}
      </div>
    </div>
  );
}

export default StudyTracker;