import React, { useState } from 'react';
import { Phone, Globe, MessageSquare, Clock, MapPin, Heart, AlertTriangle, ExternalLink } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  type: 'crisis' | 'therapy' | 'support' | 'emergency';
  description: string;
  contact: string;
  website?: string;
  hours?: string;
  location?: string;
  urgent?: boolean;
}

const resources: Resource[] = [
  {
    id: '1',
    title: 'National Suicide Prevention Lifeline',
    type: 'crisis',
    description: '24/7 crisis support for people in suicidal crisis or emotional distress.',
    contact: '988',
    website: 'https://suicidepreventionlifeline.org',
    hours: '24/7',
    urgent: true
  },
  {
    id: '2',
    title: 'Crisis Text Line',
    type: 'crisis',
    description: 'Free, 24/7 support via text message for people in crisis.',
    contact: 'Text HOME to 741741',
    website: 'https://crisistextline.org',
    hours: '24/7',
    urgent: true
  },
  {
    id: '3',
    title: 'SAMHSA National Helpline',
    type: 'support',
    description: 'Treatment referral and information service for mental health and substance use disorders.',
    contact: '1-800-662-4357',
    website: 'https://samhsa.gov',
    hours: '24/7'
  },
  {
    id: '4',
    title: 'National Alliance on Mental Illness (NAMI)',
    type: 'support',
    description: 'Support, education, and advocacy for individuals and families affected by mental illness.',
    contact: '1-800-950-6264',
    website: 'https://nami.org',
    hours: 'Mon-Fri, 10 AM - 10 PM ET'
  },
  {
    id: '5',
    title: 'BetterHelp',
    type: 'therapy',
    description: 'Online therapy platform connecting users with licensed therapists.',
    contact: 'Online Platform',
    website: 'https://betterhelp.com',
    hours: 'Varies by therapist'
  },
  {
    id: '6',
    title: 'Psychology Today',
    type: 'therapy',
    description: 'Directory to find therapists, psychiatrists, and mental health professionals in your area.',
    contact: 'Online Directory',
    website: 'https://psychologytoday.com',
    hours: 'Online 24/7'
  },
  {
    id: '7',
    title: 'National Domestic Violence Hotline',
    type: 'crisis',
    description: '24/7 support for domestic violence survivors and their loved ones.',
    contact: '1-800-799-7233',
    website: 'https://thehotline.org',
    hours: '24/7',
    urgent: true
  },
  {
    id: '8',
    title: 'Veterans Crisis Line',
    type: 'crisis',
    description: 'Crisis support specifically for veterans, service members, and their families.',
    contact: '1-800-273-8255, Press 1',
    website: 'https://veteranscrisisline.net',
    hours: '24/7',
    urgent: true
  }
];

const emergencyInfo = [
  {
    title: 'Immediate Danger',
    description: 'If you or someone else is in immediate physical danger',
    action: 'Call 911',
    color: 'red'
  },
  {
    title: 'Suicidal Thoughts',
    description: 'If you are having thoughts of suicide or self-harm',
    action: 'Call 988 or text HOME to 741741',
    color: 'orange'
  },
  {
    title: 'Mental Health Crisis',
    description: 'If you are experiencing a mental health emergency',
    action: 'Go to nearest ER or call 911',
    color: 'yellow'
  }
];

function Resources() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const types = [
    { id: 'all', label: 'All Resources' },
    { id: 'crisis', label: 'Crisis Support' },
    { id: 'therapy', label: 'Therapy Services' },
    { id: 'support', label: 'Support Groups' },
    { id: 'emergency', label: 'Emergency' }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const urgentResources = resources.filter(resource => resource.urgent);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'crisis':
        return AlertTriangle;
      case 'therapy':
        return MessageSquare;
      case 'support':
        return Heart;
      case 'emergency':
        return Phone;
      default:
        return Globe;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'crisis':
        return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'therapy':
        return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'support':
        return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'emergency':
        return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      default:
        return 'text-purple-400 bg-purple-500/20 border-purple-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center py-8">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-red-500 to-orange-600 rounded-full">
              <Phone className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Crisis Resources
              </h1>
              <p className="text-gray-400 text-sm">Professional help is always available</p>
            </div>
          </div>
        </div>

        {/* Emergency Banner */}
        <div className="mb-8 bg-gradient-to-r from-red-900/50 to-orange-900/50 border border-red-500/30 rounded-2xl p-6">
          <div className="text-center mb-6">
            <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-3" />
            <h2 className="text-2xl font-bold text-white mb-2">In Crisis? Get Help Now</h2>
            <p className="text-gray-300">You don't have to go through this alone. Help is available 24/7.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {emergencyInfo.map((info, index) => (
              <div
                key={index}
                className={`bg-${info.color}-900/30 border border-${info.color}-500/40 rounded-xl p-4 text-center`}
              >
                <h3 className={`font-bold text-${info.color}-400 mb-2`}>{info.title}</h3>
                <p className="text-gray-300 text-sm mb-3">{info.description}</p>
                <div className={`bg-${info.color}-500/20 text-${info.color}-300 px-3 py-2 rounded-lg font-bold`}>
                  {info.action}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Access - Crisis Lines */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            <span>Crisis Lines - Available 24/7</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {urgentResources.map((resource) => (
              <div
                key={resource.id}
                className="bg-red-900/20 border border-red-500/30 rounded-xl p-4 hover:border-red-400/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-red-300 mb-1">{resource.title}</h3>
                    <p className="text-gray-300 text-sm mb-2">{resource.description}</p>
                  </div>
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 ml-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-red-400" />
                    <span className="text-red-200 font-mono font-bold">{resource.contact}</span>
                  </div>
                  {resource.website && (
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4 text-red-400" />
                      <a
                        href={resource.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-300 hover:text-red-200 underline text-sm flex items-center space-x-1"
                      >
                        <span>Visit Website</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-600/20 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex-1 lg:mr-6">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search resources..."
                className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex space-x-2">
              {types.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    selectedType === type.id
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-blue-400 border border-blue-500/30'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50 border border-gray-600'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredResources.map((resource) => {
            const Icon = getTypeIcon(resource.type);
            const colorClass = getTypeColor(resource.type);
            
            return (
              <div
                key={resource.id}
                className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-600/20 p-6 hover:border-blue-400/40 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`p-2 rounded-lg border ${colorClass}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white">{resource.title}</h3>
                        {resource.urgent && (
                          <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full">
                            URGENT
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mb-4">{resource.description}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-blue-400" />
                    <span className="text-blue-300 font-mono font-semibold">{resource.contact}</span>
                  </div>

                  {resource.hours && (
                    <div className="flex items-center space-x-3">
                      <Clock className="h-4 w-4 text-green-400" />
                      <span className="text-green-300">{resource.hours}</span>
                    </div>
                  )}

                  {resource.location && (
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-4 w-4 text-purple-400" />
                      <span className="text-purple-300">{resource.location}</span>
                    </div>
                  )}

                  {resource.website && (
                    <div className="flex items-center space-x-3">
                      <Globe className="h-4 w-4 text-orange-400" />
                      <a
                        href={resource.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-300 hover:text-orange-200 underline flex items-center space-x-1"
                      >
                        <span>Visit Website</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Support Information */}
        <div className="mt-12 bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-md rounded-2xl border border-blue-500/20 p-8">
          <div className="text-center">
            <Heart className="h-12 w-12 text-blue-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Remember</h2>
            <div className="max-w-3xl mx-auto space-y-4 text-gray-300">
              <p>
                💙 <strong>You are not alone.</strong> Millions of people experience mental health challenges, and help is available.
              </p>
              <p>
                🌟 <strong>Seeking help is a sign of strength,</strong> not weakness. It takes courage to reach out.
              </p>
              <p>
                🔒 <strong>Your conversations are confidential.</strong> Mental health professionals are bound by privacy laws.
              </p>
              <p>
                ⏰ <strong>Crisis support is available 24/7.</strong> Don't wait until "business hours" to get help.
              </p>
              <p>
                📱 <strong>Multiple ways to connect:</strong> Phone, text, chat, or in-person - choose what feels comfortable.
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-xl">
          <p className="text-yellow-200 text-sm text-center">
            <strong>Disclaimer:</strong> MindEd provides educational resources and emotional support tools. 
            In case of emergency, please call 911. For mental health crises, contact the resources listed above or go to your nearest emergency room. 
            This app is not a substitute for professional mental health care.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Resources;