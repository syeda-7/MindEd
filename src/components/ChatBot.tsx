import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Eliza-inspired therapy chatbot patterns and responses
const elizaPatterns = [
  {
    pattern: /\b(hello|hi|hey|good morning|good afternoon|good evening)\b/i,
    responses: [
      "Hello! I'm here to listen and support you. How are you feeling today?",
      "Hi there! Welcome to our safe space. What's on your mind?",
      "Hello! I'm glad you're here. How can I support you today?",
    ]
  },
  {
    pattern: /\b(anxious|anxiety|worried|worry|nervous|panic)\b/i,
    responses: [
      "I understand that anxiety can feel overwhelming. Can you tell me more about what's making you feel this way?",
      "Anxiety is a natural response, but it can be difficult to manage. What situations tend to trigger these feelings for you?",
      "It sounds like you're experiencing some anxiety. Remember, you're safe right now. What helps you feel more grounded?",
    ]
  },
  {
    pattern: /\b(sad|depressed|down|low|empty|hopeless)\b/i,
    responses: [
      "I hear that you're feeling sad. Those feelings are valid, and it's okay to sit with them. What's been weighing on your heart?",
      "Sadness can feel heavy. You're brave for reaching out. Can you share what's been contributing to these feelings?",
      "It takes strength to acknowledge when we're feeling down. What small thing might bring you a moment of comfort today?",
    ]
  },
  {
    pattern: /\b(angry|mad|frustrated|irritated|furious)\b/i,
    responses: [
      "Anger often signals that something important to us feels threatened. What's behind these feelings of anger?",
      "It sounds like you're really frustrated. Those feelings make sense. What situation is causing you to feel this way?",
      "Anger can be a protective emotion. What do you think your anger is trying to tell you?",
    ]
  },
  {
    pattern: /\b(stressed|overwhelmed|busy|pressure|deadline)\b/i,
    responses: [
      "Stress can make everything feel more difficult. What's creating the most pressure for you right now?",
      "Being overwhelmed is exhausting. Let's break this down - what feels most urgent to you?",
      "When we're stressed, it helps to focus on what we can control. What's one small step you could take today?",
    ]
  },
  {
    pattern: /\b(happy|good|great|wonderful|amazing|excited)\b/i,
    responses: [
      "It's wonderful to hear that you're feeling good! What's been bringing you joy lately?",
      "I'm so glad you're experiencing happiness. What's been going well for you?",
      "That's fantastic! Celebrating positive moments is important. What made today special?",
    ]
  },
  {
    pattern: /\b(tired|exhausted|drained|burnt out|burnout)\b/i,
    responses: [
      "Feeling tired can affect everything. Are you getting enough rest, or is this more of an emotional exhaustion?",
      "Being drained is a signal that you might need to recharge. What usually helps restore your energy?",
      "Burnout is real and valid. What aspects of your life feel most demanding right now?",
    ]
  },
  {
    pattern: /\b(lonely|alone|isolated|disconnected)\b/i,
    responses: [
      "Loneliness can feel really painful. You're not alone in feeling this way. What's been making you feel disconnected?",
      "Feeling isolated is hard, especially when we need connection most. What relationships in your life feel supportive?",
      "I'm here with you right now. Sometimes loneliness comes when we're surrounded by people too. What kind of connection are you craving?",
    ]
  },
  {
    pattern: /\b(can't sleep|insomnia|sleep|sleepless)\b/i,
    responses: [
      "Sleep difficulties often reflect what's happening in our inner world. What thoughts tend to keep you awake?",
      "Good sleep is so important for our wellbeing. What's been on your mind when you're trying to rest?",
      "Sleep troubles can be frustrating. Have you noticed any patterns in what disrupts your sleep?",
    ]
  },
  {
    pattern: /\b(thank you|thanks|grateful|appreciate)\b/i,
    responses: [
      "You're very welcome. It takes courage to reach out and share. I'm here whenever you need support.",
      "Thank you for trusting me with your feelings. Remember, healing is a journey and you're doing great.",
      "I appreciate you sharing with me. You deserve support and kindness, especially from yourself.",
    ]
  },
  {
    pattern: /\b(help|support|advice|guidance)\b/i,
    responses: [
      "I'm here to support you. Sometimes just talking through our feelings can provide clarity. What feels most challenging right now?",
      "Asking for help is a sign of strength. What kind of support would feel most helpful to you today?",
      "I believe in your ability to work through this. What strategies have helped you cope with difficult times before?",
    ]
  }
];

const defaultResponses = [
  "I hear you. Can you tell me more about how you're feeling?",
  "That sounds important. What emotions are coming up for you around this?",
  "I'm listening. How has this been affecting you?",
  "Thank you for sharing that with me. What feels most significant about this for you?",
  "I can sense this matters to you. What would feel helpful right now?",
];

function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your therapy companion. I'm here to listen, support, and help you explore your feelings in a safe space. How are you doing today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Find matching pattern
    for (const pattern of elizaPatterns) {
      if (pattern.pattern.test(lowerMessage)) {
        const randomResponse = pattern.responses[Math.floor(Math.random() * pattern.responses.length)];
        return randomResponse;
      }
    }
    
    // Default response if no pattern matches
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="text-center py-8">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
              <Bot className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Therapy Companion
              </h1>
              <p className="text-gray-400 text-sm">A safe space for emotional support</p>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-2 text-green-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Always here to listen</span>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-blue-500/20 shadow-2xl">
          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-700">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.sender === 'bot' && (
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                  </div>
                )}
                
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white ml-auto'
                      : 'bg-gray-700/80 text-gray-100 border border-gray-600/50'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-2 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>

                {message.sender === 'user' && (
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div className="bg-gray-700/80 px-4 py-3 rounded-2xl border border-gray-600/50">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-700/50 p-4">
            <div className="flex space-x-4">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share what's on your mind..."
                className="flex-1 bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={1}
                style={{ maxHeight: '120px' }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-blue-400" />
                <span>This is a supportive space - share openly and honestly</span>
              </div>
              <span>Press Enter to send</span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-xl">
          <p className="text-yellow-200 text-sm text-center">
            <strong>Important:</strong> This chatbot provides emotional support and guidance but is not a replacement for professional therapy or crisis intervention. 
            If you're experiencing thoughts of self-harm or suicide, please contact emergency services or a crisis helpline immediately.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;