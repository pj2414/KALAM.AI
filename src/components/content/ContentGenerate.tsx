
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  FileText, 
  BookOpen, 
  FileSpreadsheet, 
  GraduationCap, 
  Mic,
  Bell,
  BarChart3,
  Mail,
  FileCheck,
  Instagram,
  BookMarked,
  Film
} from 'lucide-react';

const ContentGenerate = () => {
  const navigate = useNavigate();

  const contentTypes = [
    {
      id: 'essay',
      title: 'Essay',
      description: 'Create compelling essays on any topic',
      icon: FileText,
      gradient: 'from-blue-500 to-purple-600',
      path: '/generate/essay'
    },
    {
      id: 'assignment',
      title: 'Assignment',
      description: 'Complete your academic assignments',
      icon: BookOpen,
      gradient: 'from-green-500 to-blue-600',
      path: '/generate/assignment'
    },
    {
      id: 'summary',
      title: 'Summary',
      description: 'Summarize any text or document',
      icon: FileSpreadsheet,
      gradient: 'from-orange-500 to-red-600',
      path: '/generate/summary'
    },
    {
      id: 'thesis',
      title: 'Thesis',
      description: 'Create academic thesis abstracts',
      icon: GraduationCap,
      gradient: 'from-purple-500 to-pink-600',
      path: '/generate/thesis'
    },
    {
      id: 'speech',
      title: 'Speech',
      description: 'Craft powerful speeches',
      icon: Mic,
      gradient: 'from-yellow-500 to-orange-600',
      path: '/generate/speech'
    },
    {
      id: 'notice',
      title: 'Notice',
      description: 'Create formal notices',
      icon: Bell,
      gradient: 'from-cyan-500 to-blue-600',
      path: '/generate/notice'
    },
    {
      id: 'report',
      title: 'Report',
      description: 'Generate detailed reports',
      icon: BarChart3,
      gradient: 'from-indigo-500 to-purple-600',
      path: '/generate/report'
    },
    {
      id: 'letter',
      title: 'Letter',
      description: 'Write professional letters',
      icon: Mail,
      gradient: 'from-pink-500 to-rose-600',
      path: '/generate/letter'
    },
    {
      id: 'application',
      title: 'Application',
      description: 'Create formal applications',
      icon: FileCheck,
      gradient: 'from-emerald-500 to-green-600',
      path: '/generate/application'
    },
    {
      id: 'caption',
      title: 'Caption',
      description: 'Create engaging social media captions',
      icon: Instagram,
      gradient: 'from-violet-500 to-purple-600',
      path: '/generate/caption'
    },
    {
      id: 'diary',
      title: 'Diary',
      description: 'Write personal diary entries',
      icon: BookMarked,
      gradient: 'from-teal-500 to-cyan-600',
      path: '/generate/diary'
    },
    {
      id: 'script',
      title: 'Script',
      description: 'Create event scripts',
      icon: Film,
      gradient: 'from-red-500 to-pink-600',
      path: '/generate/script'
    }
  ];

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {contentTypes.map((type) => {
          const IconComponent = type.icon;
          return (
            <Card 
              key={type.id}
              className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
              onClick={() => navigate(type.path)}
            >
              <CardHeader className="pb-3">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${type.gradient} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white text-lg">{type.title}</CardTitle>
                <CardDescription className="text-gray-400">
                  {type.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-purple-400 group-hover:text-purple-300">
                    Get Started →
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ContentGenerate;
