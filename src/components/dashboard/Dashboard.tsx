
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  BookOpen, 
  FileSearch, 
  GraduationCap, 
  Mic, 
  Bell,
  BarChart3,
  Mail,
  FileInput,
  Camera,
  Heart,
  Video,
  Zap,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const contentTypes = [
    {
      id: 'essay',
      title: 'Essay',
      description: 'Academic essays with proper structure and citations',
      icon: FileText,
      gradient: 'from-blue-500 to-purple-600',
      count: '2.4k+ generated'
    },
    {
      id: 'assignment',
      title: 'Assignment',
      description: 'Complete assignment solutions with explanations',
      icon: BookOpen,
      gradient: 'from-green-500 to-teal-600',
      count: '1.8k+ generated'
    },
    {
      id: 'summary',
      title: 'Summary',
      description: 'Concise summaries of texts, articles, and documents',
      icon: FileSearch,
      gradient: 'from-orange-500 to-red-600',
      count: '3.1k+ generated'
    },
    {
      id: 'thesis',
      title: 'Thesis',
      description: 'Research thesis abstracts and proposals',
      icon: GraduationCap,
      gradient: 'from-purple-500 to-pink-600',
      count: '890+ generated'
    },
    {
      id: 'speech',
      title: 'Speech',
      description: 'Engaging speeches for any audience and occasion',
      icon: Mic,
      gradient: 'from-indigo-500 to-blue-600',
      count: '1.2k+ generated'
    },
    {
      id: 'notice',
      title: 'Notice',
      description: 'Formal notices and announcements',
      icon: Bell,
      gradient: 'from-yellow-500 to-orange-600',
      count: '760+ generated'
    },
    {
      id: 'report',
      title: 'Report',
      description: 'Professional reports with analysis and insights',
      icon: BarChart3,
      gradient: 'from-teal-500 to-green-600',
      count: '1.5k+ generated'
    },
    {
      id: 'letter',
      title: 'Letter',
      description: 'Personal and professional letters',
      icon: Mail,
      gradient: 'from-pink-500 to-rose-600',
      count: '2.1k+ generated'
    },
    {
      id: 'application',
      title: 'Application',
      description: 'Job applications and formal requests',
      icon: FileInput,
      gradient: 'from-violet-500 to-purple-600',
      count: '980+ generated'
    },
    {
      id: 'caption',
      title: 'Caption',
      description: 'Social media captions and content',
      icon: Camera,
      gradient: 'from-rose-500 to-pink-600',
      count: '4.2k+ generated'
    },
    {
      id: 'diary',
      title: 'Diary',
      description: 'Personal diary entries and reflections',
      icon: Heart,
      gradient: 'from-amber-500 to-orange-600',
      count: '650+ generated'
    },
    {
      id: 'script',
      title: 'Script',
      description: 'Event scripts and presentations',
      icon: Video,
      gradient: 'from-cyan-500 to-blue-600',
      count: '420+ generated'
    }
  ];

  const handleContentTypeClick = (type: string) => {
    navigate(`/generate/${type}`);
  };

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 p-8">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user?.email.split('@')[0]}! 👋
          </h1>
          <p className="text-blue-100 text-lg mb-6">
            Ready to create amazing content? Choose a content type below to get started.
          </p>
          <Button 
            onClick={() => navigate('/generate')}
            className="bg-white text-purple-600 hover:bg-gray-100 font-semibold"
          >
            <Zap className="w-4 h-4 mr-2" />
            Start Creating
          </Button>
        </div>
        <div className="absolute top-4 right-4 opacity-20">
          <div className="w-32 h-32 bg-white rounded-full animate-pulse-slow" />
        </div>
      </div>

      {/* Content Types */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Content Types</h2>
            <p className="text-gray-400">Choose what you want to create</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate('/generate')}
            className="border-white/20 text-white hover:bg-white/5"
          >
            View All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {contentTypes.map((type) => (
            <Card 
              key={type.id}
              className="glass-effect border-white/10 hover-lift cursor-pointer group"
              onClick={() => handleContentTypeClick(type.id)}
            >
              <CardHeader className="pb-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${type.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <type.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white group-hover:text-purple-300 transition-colors">
                  {type.title}
                </CardTitle>
                <CardDescription className="text-gray-400 text-sm">
                  {type.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{type.count}</span>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            variant="outline" 
            className="h-auto p-4 border-white/20 hover:bg-white/5 justify-start"
            onClick={() => navigate('/history')}
          >
            <Clock className="w-5 h-5 mr-3 text-purple-400" />
            <div className="text-left">
              <div className="font-medium text-white">View History</div>
              <div className="text-sm text-gray-400">Browse your past content</div>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto p-4 border-white/20 hover:bg-white/5 justify-start"
            onClick={() => navigate('/library')}
          >
            <FileText className="w-5 h-5 mr-3 text-blue-400" />
            <div className="text-left">
              <div className="font-medium text-white">Content Library</div>
              <div className="text-sm text-gray-400">Organize your content</div>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto p-4 border-white/20 hover:bg-white/5 justify-start"
            onClick={() => navigate('/generate')}
          >
            <Zap className="w-5 h-5 mr-3 text-green-400" />
            <div className="text-left">
              <div className="font-medium text-white">Generate Content</div>
              <div className="text-sm text-gray-400">Create something new</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
