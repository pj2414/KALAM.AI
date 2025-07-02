
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Brain, 
  Sparkles, 
  Zap, 
  FileText, 
  BookOpen, 
  Mic,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Users,
  Clock,
  Shield,
  Lightbulb
} from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: FileText,
      title: "Smart Content Generation",
      description: "Create essays, assignments, reports, and more with AI assistance"
    },
    {
      icon: Brain,
      title: "Advanced AI Technology",
      description: "Powered by cutting-edge language models for high-quality content"
    },
    {
      icon: Shield,
      title: "Plagiarism-Free Content",
      description: "Original, unique content generated specifically for your needs"
    },
    {
      icon: Clock,
      title: "Instant Results",
      description: "Generate professional content in seconds, not hours"
    }
  ];

  const contentTypes = [
    { name: "Essays", icon: FileText, color: "from-blue-500 to-purple-600" },
    { name: "Assignments", icon: BookOpen, color: "from-green-500 to-teal-600" },
    { name: "Speeches", icon: Mic, color: "from-orange-500 to-red-600" },
    { name: "Reports", icon: BarChart3, color: "from-purple-500 to-pink-600" },
  ];

  const benefits = [
    "12+ Content Types Available",
    "Multiple Writing Styles",
    "Customizable Word Counts",
    "Version History & Editing",
    "Export to Multiple Formats",
    "Professional Quality Output"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 neural-bg">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Animated background elements */}
        <div className="absolute top-20 left-20 animate-float">
          <div className="w-32 h-32 gradient-bg-primary rounded-full opacity-10 animate-pulse-slow" />
        </div>
        <div className="absolute bottom-40 right-20 animate-float" style={{ animationDelay: '2s' }}>
          <div className="w-24 h-24 gradient-bg-accent rounded-full opacity-10 animate-pulse-slow" />
        </div>
        <div className="absolute top-1/2 left-10 animate-float" style={{ animationDelay: '4s' }}>
          <div className="w-16 h-16 gradient-bg-secondary rounded-full opacity-10 animate-pulse-slow" />
        </div>

        <div className="relative z-10 container mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            {/* Logo */}
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <Brain className="w-16 h-16 text-white animate-glow" />
                <Sparkles className="w-8 h-8 text-purple-400 absolute -top-2 -right-2 animate-pulse" />
              </div>
            </div>

            {/* Main heading */}
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="gradient-text-primary">कलम</span>
              <span className="text-white">.AI</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Transform your ideas into professional content with the power of artificial intelligence. 
              Create essays, assignments, reports, and more in seconds.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                onClick={() => navigate('/generate')}
                className="px-8 py-4 text-lg gradient-bg-primary hover:opacity-90 transition-opacity"
              >
                <Zap className="w-5 h-5 mr-2" />
                Start Creating
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => navigate('/library')}
                className="px-8 py-4 text-lg border-white/20 text-white hover:bg-white/5"
              >
                <FileText className="w-5 h-5 mr-2" />
                Explore Features
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text-accent mb-2">12+</div>
                <div className="text-gray-400">Content Types</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text-accent mb-2">10k+</div>
                <div className="text-gray-400">Content Generated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text-accent mb-2">2.4s</div>
                <div className="text-gray-400">Avg Response Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose <span className="gradient-text-primary">कलम.AI</span>?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience the future of content creation with our advanced AI technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="glass-effect border-white/10 hover-lift group">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 gradient-bg-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Content Types Preview */}
      <div className="py-20 px-6 bg-black/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Create Any Type of Content
            </h2>
            <p className="text-xl text-gray-400">
              From academic essays to professional reports, we've got you covered
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {contentTypes.map((type, index) => (
              <div key={index} className="text-center group cursor-pointer" onClick={() => navigate('/generate')}>
                <div className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-r ${type.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <type.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-white font-medium group-hover:text-purple-300 transition-colors">{type.name}</h3>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button 
              onClick={() => navigate('/generate')}
              className="px-8 py-3 gradient-bg-accent hover:opacity-90 transition-opacity"
            >
              View All Content Types
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Everything You Need to Succeed
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-lg">{benefit}</span>
                  </div>
                ))}
              </div>

              <Card className="glass-effect border-white/10">
                <CardContent className="p-8">
                  <div className="text-center">
                    <Lightbulb className="w-16 h-16 mx-auto mb-6 text-yellow-400" />
                    <h3 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h3>
                    <p className="text-gray-400 mb-6">
                      Join thousands of users who are already creating amazing content with कलम.AI
                    </p>
                    <Button 
                      onClick={() => navigate('/generate')}
                      className="w-full gradient-bg-primary hover:opacity-90 transition-opacity"
                    >
                      <Zap className="w-5 h-5 mr-2" />
                      Start Creating Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 py-8 px-6">
        <div className="container mx-auto">
          <div className="text-center text-gray-400">
            <p>&copy; 2024 कलम.AI - Empowering creativity with artificial intelligence</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
