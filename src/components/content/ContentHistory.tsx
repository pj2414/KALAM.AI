import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Search, FileText, Calendar, Trash2, Eye } from 'lucide-react';

interface ContentItem {
  _id: string;
  type: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  parameters: {
    wordCount: number;
    writingStyle: string;
    tone: string;
  };
}

const ContentHistory = () => {
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const { toast } = useToast();

  // Fetch history
  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://kalamai.up.railway.app/api/content/history', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setContents(data.contents);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch content history",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete content
  const deleteContent = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://kalamai.up.railway.app/api/content/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setContents(contents.filter(content => content._id !== id));
        toast({
          title: "Content Deleted",
          description: "Content has been successfully deleted"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete content",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const filteredContents = contents.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === '' || content.type === selectedType;
    return matchesSearch && matchesType;
  });

  const contentTypes = [...new Set(contents.map(content => content.type))];

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
          />
        </div>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white"
        >
          <option value="">All Types</option>
          {contentTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredContents.map((content) => (
          <Card key={content._id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-white text-lg line-clamp-2">
                    {content.title}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                      {content.type}
                    </Badge>
                    <span className="text-xs text-gray-400">
                      {content.parameters.wordCount} words
                    </span>
                  </div>
                </div>
                <FileText className="w-5 h-5 text-purple-400" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm line-clamp-3 mb-4">
                {content.content.substring(0, 150)}...
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(content.createdAt).toLocaleDateString()}
                </div>
                <div className="flex gap-1">
                  <Badge variant="outline" className="text-xs">
                    {content.parameters.writingStyle}
                  </Badge>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs"
                  onClick={() => {/* View content logic */}}
                >
                  <Eye className="w-3 h-3 mr-1" />
                  View
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteContent(content._id)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredContents.length === 0 && (
        <div className="text-center text-gray-400 py-12">
          <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No content found</p>
        </div>
      )}
    </div>
  );
};

export default ContentHistory;
