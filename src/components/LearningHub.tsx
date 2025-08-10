import React, { useState } from 'react';
import { Book, Play, CheckCircle, Award, Clock, Star, ArrowRight } from 'lucide-react';

interface LearningModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: 'Mental Health' | 'Mindfulness' | 'Emotional Intelligence' | 'Stress Management';
  completed: boolean;
  content: string[];
  quiz?: Quiz;
}

interface Quiz {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const learningModules: LearningModule[] = [
  {
    id: '1',
    title: 'Understanding Anxiety',
    description: 'Learn about anxiety, its symptoms, and healthy coping strategies.',
    duration: '15 min',
    difficulty: 'Beginner',
    category: 'Mental Health',
    completed: false,
    content: [
      'Anxiety is a natural response to stress and can be beneficial in some situations.',
      'Common symptoms include racing thoughts, increased heart rate, sweating, and muscle tension.',
      'Anxiety becomes a disorder when it interferes with daily activities and persists over time.',
      'Deep breathing exercises can help activate your body\'s relaxation response.',
      'Regular exercise, adequate sleep, and limiting caffeine can reduce anxiety levels.',
      'It\'s important to challenge negative thoughts and replace them with realistic ones.'
    ],
    quiz: {
      question: 'Which of the following is NOT a healthy way to manage anxiety?',
      options: [
        'Deep breathing exercises',
        'Avoiding all stressful situations',
        'Regular physical exercise',
        'Challenging negative thoughts'
      ],
      correctAnswer: 1,
      explanation: 'While avoiding some stress can be helpful, completely avoiding all stressful situations can actually increase anxiety over time. Gradual exposure and building coping skills is more effective.'
    }
  },
  {
    id: '2',
    title: 'Mindful Breathing Techniques',
    description: 'Master fundamental breathing exercises for relaxation and focus.',
    duration: '10 min',
    difficulty: 'Beginner',
    category: 'Mindfulness',
    completed: false,
    content: [
      'Mindful breathing is the foundation of mindfulness practice.',
      'The 4-7-8 technique: Inhale for 4, hold for 7, exhale for 8 counts.',
      'Box breathing: Inhale for 4, hold for 4, exhale for 4, hold for 4.',
      'Focus on the sensation of breath entering and leaving your nostrils.',
      'When your mind wanders, gently return attention to your breath without judgment.',
      'Practice for just 5 minutes daily to see significant benefits.'
    ],
    quiz: {
      question: 'In the 4-7-8 breathing technique, how long should you hold your breath?',
      options: ['4 counts', '7 counts', '8 counts', '10 counts'],
      correctAnswer: 1,
      explanation: 'In the 4-7-8 technique, you hold your breath for 7 counts after inhaling for 4 counts, then exhale for 8 counts.'
    }
  },
  {
    id: '3',
    title: 'Emotional Intelligence Basics',
    description: 'Develop your ability to understand and manage emotions effectively.',
    duration: '20 min',
    difficulty: 'Intermediate',
    category: 'Emotional Intelligence',
    completed: false,
    content: [
      'Emotional intelligence involves recognizing, understanding, and managing emotions.',
      'The four domains: self-awareness, self-management, social awareness, and relationship management.',
      'Practice identifying emotions as they arise without immediately reacting.',
      'Use the "name it to tame it" technique - labeling emotions reduces their intensity.',
      'Empathy involves understanding others\' perspectives and emotional states.',
      'Regular self-reflection helps build emotional awareness over time.'
    ],
    quiz: {
      question: 'What are the four main domains of emotional intelligence?',
      options: [
        'Thinking, feeling, acting, reflecting',
        'Self-awareness, self-management, social awareness, relationship management',
        'Empathy, sympathy, compassion, understanding',
        'Cognition, emotion, behavior, environment'
      ],
      correctAnswer: 1,
      explanation: 'The four domains of emotional intelligence are self-awareness, self-management, social awareness, and relationship management, as defined by Daniel Goleman.'
    }
  },
  {
    id: '4',
    title: 'Building Resilience',
    description: 'Learn strategies to bounce back from adversity and build mental strength.',
    duration: '25 min',
    difficulty: 'Intermediate',
    category: 'Stress Management',
    completed: false,
    content: [
      'Resilience is the ability to adapt and recover from difficult experiences.',
      'Building strong relationships and social connections is crucial for resilience.',
      'Developing problem-solving skills helps you navigate challenges effectively.',
      'Practicing self-care and maintaining physical health supports mental resilience.',
      'Reframing negative thoughts and finding meaning in adversity builds strength.',
      'Setting realistic goals and celebrating small wins maintains motivation.'
    ],
    quiz: {
      question: 'Which factor is most important for building resilience?',
      options: [
        'Avoiding all stressful situations',
        'Building strong social connections',
        'Never showing vulnerability',
        'Suppressing negative emotions'
      ],
      correctAnswer: 1,
      explanation: 'Research consistently shows that strong social connections and support systems are the most important factors in building resilience and recovering from adversity.'
    }
  }
];

function LearningHub() {
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [modules, setModules] = useState(learningModules);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', 'Mental Health', 'Mindfulness', 'Emotional Intelligence', 'Stress Management'];

  const filteredModules = filterCategory === 'All' 
    ? modules 
    : modules.filter(module => module.category === filterCategory);

  const completedCount = modules.filter(module => module.completed).length;
  const progressPercentage = (completedCount / modules.length) * 100;

  const handleModuleSelect = (module: LearningModule) => {
    setSelectedModule(module);
    setCurrentContentIndex(0);
    setShowQuiz(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const handleNext = () => {
    if (selectedModule) {
      if (currentContentIndex < selectedModule.content.length - 1) {
        setCurrentContentIndex(currentContentIndex + 1);
      } else if (selectedModule.quiz && !showQuiz) {
        setShowQuiz(true);
      } else {
        completeModule();
      }
    }
  };

  const completeModule = () => {
    if (selectedModule) {
      setModules(prev => 
        prev.map(module => 
          module.id === selectedModule.id 
            ? { ...module, completed: true }
            : module
        )
      );
      setSelectedModule(null);
    }
  };

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
  };

  if (selectedModule) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Module Header */}
          <div className="mb-8">
            <button
              onClick={() => setSelectedModule(null)}
              className="text-blue-400 hover:text-blue-300 mb-4 flex items-center space-x-2"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              <span>Back to Learning Hub</span>
            </button>
            
            <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-blue-500/20 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-white mb-2">{selectedModule.title}</h1>
                  <p className="text-gray-400">{selectedModule.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">
                    {showQuiz ? 'Quiz Time!' : `${currentContentIndex + 1} / ${selectedModule.content.length}`}
                  </div>
                  <div className="text-xs text-blue-400">{selectedModule.duration}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-blue-500/20 p-8">
            {!showQuiz ? (
              <div className="space-y-6">
                <div className="min-h-[200px] flex items-center justify-center">
                  <p className="text-lg text-gray-100 leading-relaxed text-center max-w-2xl">
                    {selectedModule.content[currentContentIndex]}
                  </p>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-400">
                    Lesson {currentContentIndex + 1} of {selectedModule.content.length}
                  </div>
                  <button
                    onClick={handleNext}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 flex items-center space-x-2"
                  >
                    <span>{currentContentIndex === selectedModule.content.length - 1 && selectedModule.quiz ? 'Take Quiz' : 'Next'}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <Award className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
                  <h2 className="text-xl font-bold text-white mb-2">Knowledge Check</h2>
                  <p className="text-gray-400">Test your understanding of the material</p>
                </div>

                <div className="bg-gray-700/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-6">
                    {selectedModule.quiz?.question}
                  </h3>
                  
                  <div className="space-y-3">
                    {selectedModule.quiz?.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuizAnswer(index)}
                        disabled={selectedAnswer !== null}
                        className={`w-full text-left p-4 rounded-lg border transition-all duration-300 ${
                          selectedAnswer === null
                            ? 'border-gray-600 hover:border-blue-400 bg-gray-800/50'
                            : selectedAnswer === index
                              ? index === selectedModule.quiz?.correctAnswer
                                ? 'border-green-400 bg-green-400/20 text-green-300'
                                : 'border-red-400 bg-red-400/20 text-red-300'
                              : index === selectedModule.quiz?.correctAnswer && selectedAnswer !== null
                                ? 'border-green-400 bg-green-400/20 text-green-300'
                                : 'border-gray-600 bg-gray-800/30 opacity-60'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center">
                            {selectedAnswer !== null && (
                              <>
                                {index === selectedModule.quiz?.correctAnswer && (
                                  <CheckCircle className="h-4 w-4" />
                                )}
                              </>
                            )}
                          </div>
                          <span>{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {showExplanation && (
                    <div className="mt-6 p-4 bg-blue-500/20 border border-blue-500/40 rounded-lg">
                      <h4 className="font-semibold text-blue-300 mb-2">Explanation:</h4>
                      <p className="text-blue-100">{selectedModule.quiz?.explanation}</p>
                    </div>
                  )}
                </div>

                {showExplanation && (
                  <div className="text-center">
                    <button
                      onClick={completeModule}
                      className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl hover:from-green-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-green-500/25"
                    >
                      Complete Module
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center py-8">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full">
              <Book className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Learning Hub
              </h1>
              <p className="text-gray-400 text-sm">Expand your mental wellness knowledge</p>
            </div>
          </div>

          {/* Progress */}
          <div className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-green-500/20 p-6 max-w-md mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Overall Progress</span>
              <span className="text-sm text-green-400 font-semibold">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="flex items-center justify-center mt-3 space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-gray-300">{completedCount} Completed</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-yellow-400" />
                <span className="text-gray-300">{modules.length - completedCount} Remaining</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-gray-800/50 rounded-xl p-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilterCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  filterCategory === category
                    ? 'bg-gradient-to-r from-green-400/20 to-blue-500/20 text-green-400 border border-green-400/30'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Learning Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((module) => (
            <div
              key={module.id}
              className="group bg-gray-800/50 backdrop-blur-md rounded-2xl border border-blue-500/20 p-6 hover:border-green-400/40 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-xl hover:shadow-green-400/10"
              onClick={() => handleModuleSelect(module)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${module.completed ? 'bg-green-400/20' : 'bg-blue-500/20'}`}>
                    {module.completed ? (
                      <CheckCircle className="h-6 w-6 text-green-400" />
                    ) : (
                      <Play className="h-6 w-6 text-blue-400" />
                    )}
                  </div>
                  <div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      module.difficulty === 'Beginner' ? 'bg-green-400/20 text-green-400' :
                      module.difficulty === 'Intermediate' ? 'bg-yellow-400/20 text-yellow-400' :
                      'bg-red-400/20 text-red-400'
                    }`}>
                      {module.difficulty}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-gray-400">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{module.duration}</span>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-green-400 transition-colors">
                {module.title}
              </h3>
              
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {module.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full">
                  {module.category}
                </span>
                
                {module.completed ? (
                  <div className="flex items-center space-x-1 text-green-400">
                    <Star className="h-4 w-4" />
                    <span className="text-sm font-medium">Completed</span>
                  </div>
                ) : (
                  <div className="text-blue-400 group-hover:text-green-400 transition-colors">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Daily Tip */}
        <div className="mt-12 bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-md rounded-2xl border border-purple-500/30 p-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-3 mb-4">
              <Star className="h-6 w-6 text-yellow-400" />
              <h2 className="text-xl font-bold text-white">Daily Wellness Tip</h2>
            </div>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              "Practice the 5-4-3-2-1 grounding technique when feeling overwhelmed: 
              Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearningHub;