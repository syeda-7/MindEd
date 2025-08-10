import React, { useState, useEffect } from 'react';
import { Heart, TrendingUp, Calendar, Smile, Frown, Meh, Plus, BarChart3 } from 'lucide-react';

interface MoodEntry {
  id: string;
  date: string;
  mood: number; // 1-5 scale
  notes: string;
  activities: string[];
}

const moodEmojis = [
  { value: 1, emoji: '😢', label: 'Very Sad', color: 'text-red-400' },
  { value: 2, emoji: '😔', label: 'Sad', color: 'text-orange-400' },
  { value: 3, emoji: '😐', label: 'Neutral', color: 'text-yellow-400' },
  { value: 4, emoji: '🙂', label: 'Happy', color: 'text-green-400' },
  { value: 5, emoji: '😊', label: 'Very Happy', color: 'text-blue-400' }
];

const commonActivities = [
  'Exercise', 'Work', 'Social Time', 'Sleep', 'Study', 'Meditation',
  'Entertainment', 'Cooking', 'Reading', 'Music', 'Nature', 'Family Time'
];

function MoodTracker() {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [notes, setNotes] = useState('');
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [viewMode, setViewMode] = useState<'add' | 'history' | 'stats'>('add');

  useEffect(() => {
    const saved = localStorage.getItem('moodEntries');
    if (saved) {
      setMoodEntries(JSON.parse(saved));
    }
  }, []);

  const saveMoodEntry = () => {
    if (selectedMood === null) return;

    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      mood: selectedMood,
      notes,
      activities: selectedActivities
    };

    const updated = [newEntry, ...moodEntries];
    setMoodEntries(updated);
    localStorage.setItem('moodEntries', JSON.stringify(updated));

    // Reset form
    setSelectedMood(null);
    setNotes('');
    setSelectedActivities([]);
    setShowAddForm(false);

    // Show notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Mood tracked!', {
        body: `You recorded a ${moodEmojis.find(m => m.value === selectedMood)?.label} mood.`,
        icon: '/favicon.ico'
      });
    }
  };

  const toggleActivity = (activity: string) => {
    setSelectedActivities(prev =>
      prev.includes(activity)
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    );
  };

  const getAverageMood = () => {
    if (moodEntries.length === 0) return 0;
    const total = moodEntries.reduce((sum, entry) => sum + entry.mood, 0);
    return total / moodEntries.length;
  };

  const getMoodTrend = () => {
    if (moodEntries.length < 2) return 'neutral';
    const recent = moodEntries.slice(0, 3);
    const older = moodEntries.slice(3, 6);
    
    const recentAvg = recent.reduce((sum, entry) => sum + entry.mood, 0) / recent.length;
    const olderAvg = older.length > 0 ? older.reduce((sum, entry) => sum + entry.mood, 0) / older.length : recentAvg;
    
    if (recentAvg > olderAvg + 0.3) return 'improving';
    if (recentAvg < olderAvg - 0.3) return 'declining';
    return 'stable';
  };

  const getWeeklyData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const weekData = days.map(day => {
      const dayEntries = moodEntries.filter(entry => {
        const entryDate = new Date(entry.date);
        const dayOfWeek = entryDate.getDay();
        const dayName = days[dayOfWeek === 0 ? 6 : dayOfWeek - 1];
        return dayName === day;
      });
      
      const average = dayEntries.length > 0 
        ? dayEntries.reduce((sum, entry) => sum + entry.mood, 0) / dayEntries.length 
        : 0;
      
      return { day, mood: average, count: dayEntries.length };
    });
    
    return weekData;
  };

  const today = new Date().toISOString().split('T')[0];
  const todayEntry = moodEntries.find(entry => entry.date === today);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center py-8">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Mood Tracker
              </h1>
              <p className="text-gray-400 text-sm">Track your emotional wellness journey</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center space-x-2 mb-8">
            {[
              { id: 'add', label: 'Log Mood', icon: Plus },
              { id: 'history', label: 'History', icon: Calendar },
              { id: 'stats', label: 'Analytics', icon: BarChart3 }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setViewMode(tab.id as any)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                    viewMode === tab.id
                      ? 'bg-gradient-to-r from-pink-500/20 to-purple-600/20 text-pink-400 border border-pink-500/30'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Add Mood View */}
        {viewMode === 'add' && (
          <div className="max-w-2xl mx-auto">
            {todayEntry ? (
              <div className="bg-green-900/20 border border-green-500/30 rounded-2xl p-8 text-center">
                <div className="text-6xl mb-4">
                  {moodEmojis.find(m => m.value === todayEntry.mood)?.emoji}
                </div>
                <h2 className="text-xl font-semibold text-green-400 mb-2">
                  Mood logged for today!
                </h2>
                <p className="text-gray-300 mb-4">
                  You recorded: {moodEmojis.find(m => m.value === todayEntry.mood)?.label}
                </p>
                {todayEntry.notes && (
                  <div className="bg-gray-800/50 rounded-xl p-4 mb-4">
                    <p className="text-gray-300 italic">"{todayEntry.notes}"</p>
                  </div>
                )}
                <button
                  onClick={() => setViewMode('history')}
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
                >
                  View History
                </button>
              </div>
            ) : (
              <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-purple-500/20 p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">How are you feeling today?</h2>
                  <p className="text-gray-400">Select your current mood</p>
                </div>

                {/* Mood Selection */}
                <div className="grid grid-cols-5 gap-4 mb-8">
                  {moodEmojis.map((mood) => (
                    <button
                      key={mood.value}
                      onClick={() => setSelectedMood(mood.value)}
                      className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                        selectedMood === mood.value
                          ? 'border-pink-400 bg-pink-400/20 transform scale-105'
                          : 'border-gray-600 hover:border-gray-500 bg-gray-700/30'
                      }`}
                    >
                      <div className="text-4xl mb-2">{mood.emoji}</div>
                      <div className={`text-sm font-medium ${mood.color}`}>
                        {mood.label}
                      </div>
                    </button>
                  ))}
                </div>

                {selectedMood && (
                  <div className="space-y-6 animate-fadeIn">
                    {/* Activities */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">What activities did you do today?</h3>
                      <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                        {commonActivities.map((activity) => (
                          <button
                            key={activity}
                            onClick={() => toggleActivity(activity)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                              selectedActivities.includes(activity)
                                ? 'bg-purple-500/30 text-purple-300 border border-purple-400/50'
                                : 'bg-gray-700/50 text-gray-300 border border-gray-600 hover:border-gray-500'
                            }`}
                          >
                            {activity}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Any thoughts or notes?</h3>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="What influenced your mood today? (optional)"
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                        rows={3}
                      />
                    </div>

                    {/* Save Button */}
                    <div className="text-center">
                      <button
                        onClick={saveMoodEntry}
                        className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 font-medium"
                      >
                        Save Mood Entry
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* History View */}
        {viewMode === 'history' && (
          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-purple-500/20 p-6">
              <h2 className="text-xl font-bold text-white mb-6">Mood History</h2>
              
              {moodEntries.length === 0 ? (
                <div className="text-center py-12">
                  <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">No mood entries yet</p>
                  <p className="text-gray-500 text-sm">Start tracking your mood to see your emotional patterns</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {moodEntries.map((entry) => {
                    const moodData = moodEmojis.find(m => m.value === entry.mood);
                    return (
                      <div key={entry.id} className="bg-gray-700/50 rounded-xl p-4 border border-gray-600/50">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="text-2xl">{moodData?.emoji}</div>
                            <div>
                              <div className={`font-semibold ${moodData?.color}`}>
                                {moodData?.label}
                              </div>
                              <div className="text-gray-400 text-sm">
                                {new Date(entry.date).toLocaleDateString('en-US', { 
                                  weekday: 'short', 
                                  month: 'short', 
                                  day: 'numeric' 
                                })}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-purple-400">{entry.mood}</div>
                            <div className="text-xs text-gray-400">out of 5</div>
                          </div>
                        </div>
                        
                        {entry.activities.length > 0 && (
                          <div className="mb-3">
                            <div className="text-sm text-gray-400 mb-2">Activities:</div>
                            <div className="flex flex-wrap gap-2">
                              {entry.activities.map((activity) => (
                                <span
                                  key={activity}
                                  className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-md text-xs"
                                >
                                  {activity}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {entry.notes && (
                          <div className="bg-gray-800/50 rounded-lg p-3">
                            <p className="text-gray-300 text-sm italic">"{entry.notes}"</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Stats View */}
        {viewMode === 'stats' && (
          <div className="space-y-6">
            {moodEntries.length === 0 ? (
              <div className="text-center py-12">
                <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">No data to analyze yet</p>
                <p className="text-gray-500 text-sm">Track your mood for a few days to see insights</p>
              </div>
            ) : (
              <>
                {/* Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-md rounded-2xl border border-blue-500/30 p-6">
                    <div className="flex items-center space-x-3">
                      <Smile className="h-8 w-8 text-blue-400" />
                      <div>
                        <div className="text-2xl font-bold text-white">
                          {getAverageMood().toFixed(1)}
                        </div>
                        <div className="text-blue-400 text-sm">Average Mood</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-900/50 to-teal-900/50 backdrop-blur-md rounded-2xl border border-green-500/30 p-6">
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="h-8 w-8 text-green-400" />
                      <div>
                        <div className="text-2xl font-bold text-white capitalize">
                          {getMoodTrend()}
                        </div>
                        <div className="text-green-400 text-sm">Trend</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-md rounded-2xl border border-purple-500/30 p-6">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-8 w-8 text-purple-400" />
                      <div>
                        <div className="text-2xl font-bold text-white">
                          {moodEntries.length}
                        </div>
                        <div className="text-purple-400 text-sm">Total Entries</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Weekly Pattern */}
                <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-purple-500/20 p-6">
                  <h3 className="text-xl font-bold text-white mb-6">Weekly Pattern</h3>
                  <div className="grid grid-cols-7 gap-4">
                    {getWeeklyData().map((day) => (
                      <div key={day.day} className="text-center">
                        <div className="text-sm text-gray-400 mb-2">{day.day}</div>
                        <div className="bg-gray-700/50 rounded-lg p-4 h-24 flex flex-col justify-between">
                          <div className="text-lg font-bold text-purple-400">
                            {day.mood > 0 ? day.mood.toFixed(1) : '-'}
                          </div>
                          <div className="text-xs text-gray-400">
                            {day.count} {day.count === 1 ? 'entry' : 'entries'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mood Distribution */}
                <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-purple-500/20 p-6">
                  <h3 className="text-xl font-bold text-white mb-6">Mood Distribution</h3>
                  <div className="space-y-4">
                    {moodEmojis.map((mood) => {
                      const count = moodEntries.filter(entry => entry.mood === mood.value).length;
                      const percentage = moodEntries.length > 0 ? (count / moodEntries.length) * 100 : 0;
                      
                      return (
                        <div key={mood.value} className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2 w-20">
                            <span className="text-lg">{mood.emoji}</span>
                            <span className="text-sm text-gray-400">{count}</span>
                          </div>
                          <div className="flex-1 bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <div className="text-sm text-gray-400 w-12 text-right">
                            {percentage.toFixed(0)}%
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MoodTracker;