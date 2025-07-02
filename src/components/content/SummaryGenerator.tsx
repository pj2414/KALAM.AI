
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { Loader2, FileSpreadsheet, Upload } from 'lucide-react';

const SummaryGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    sourceType: 'text',
    wordCount: [300],
    writingStyle: 'academic',
    tone: 'neutral',
    uniqueness: 'standard'
  });

  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!formData.title || !formData.text) {
      toast({
        title: "Missing Information",
        description: "Please provide both title and text to summarize.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/content/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          type: 'summary',
          title: formData.title,
          inputData: {
            text: formData.text,
            sourceType: formData.sourceType
          },
          parameters: {
            wordCount: formData.wordCount[0],
            writingStyle: formData.writingStyle,
            tone: formData.tone,
            uniqueness: formData.uniqueness,
            plagiarismSafety: true,
            language: 'english'
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedContent(data.content.content);
        toast({
          title: "Summary Generated!",
          description: "Your summary has been successfully created."
        });
      } else {
        throw new Error('Failed to generate content');
      }
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate summary. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-orange-400" />
            Summary Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white">Summary Title</Label>
            <Input
              id="title"
              placeholder="Enter summary title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Source Type</Label>
            <Select value={formData.sourceType} onValueChange={(value) => setFormData({...formData, sourceType: value})}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="article">Article</SelectItem>
                <SelectItem value="book">Book</SelectItem>
                <SelectItem value="research">Research Paper</SelectItem>
                <SelectItem value="document">Document</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="text" className="text-white">Text to Summarize</Label>
            <Textarea
              id="text"
              placeholder="Paste your text here or upload a file..."
              value={formData.text}
              onChange={(e) => setFormData({...formData, text: e.target.value})}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[200px]"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-white">Summary Length: {formData.wordCount[0]} words</Label>
            <Slider
              value={formData.wordCount}
              onValueChange={(value) => setFormData({...formData, wordCount: value})}
              max={1000}
              min={50}
              step={25}
              className="w-full"
            />
          </div>

          <Button 
            onClick={handleGenerate} 
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating Summary...
              </>
            ) : (
              'Generate Summary'
            )}
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Generated Summary</CardTitle>
        </CardHeader>
        <CardContent>
          {generatedContent ? (
            <div className="prose prose-invert max-w-none">
              <div className="bg-white/5 p-4 rounded-lg text-white whitespace-pre-wrap">
                {generatedContent}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400 py-8">
              <FileSpreadsheet className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Your generated summary will appear here</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryGenerator;
