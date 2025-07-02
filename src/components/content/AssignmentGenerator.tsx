
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { Loader2, BookOpen, Plus, Trash2 } from 'lucide-react';

const AssignmentGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [questions, setQuestions] = useState(['']);
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    wordCount: [500],
    writingStyle: 'academic',
    tone: 'neutral',
    uniqueness: 'standard'
  });

  const { toast } = useToast();

  const addQuestion = () => {
    setQuestions([...questions, '']);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const updateQuestion = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  const handleGenerate = async () => {
    const validQuestions = questions.filter(q => q.trim());
    if (!formData.title || validQuestions.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please provide a title and at least one question.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://kalamai-backend-production.up.railway.app/api/content/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          type: 'assignment',
          title: formData.title,
          inputData: {
            questions: validQuestions,
            subject: formData.subject
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
          title: "Assignment Generated!",
          description: "Your assignment has been successfully completed."
        });
      } else {
        throw new Error('Failed to generate content');
      }
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate assignment. Please try again.",
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
            <BookOpen className="w-5 h-5 text-green-400" />
            Assignment Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white">Assignment Title</Label>
            <Input
              id="title"
              placeholder="Enter assignment title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="text-white">Subject</Label>
            <Input
              id="subject"
              placeholder="Enter subject (optional)"
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-white">Questions</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addQuestion}
                className="bg-white/10 border-white/20"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Question
              </Button>
            </div>
            {questions.map((question, index) => (
              <div key={index} className="flex gap-2">
                <Textarea
                  placeholder={`Question ${index + 1}`}
                  value={question}
                  onChange={(e) => updateQuestion(index, e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  rows={2}
                />
                {questions.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeQuestion(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <Label className="text-white">Word Count: {formData.wordCount[0]}</Label>
            <Slider
              value={formData.wordCount}
              onValueChange={(value) => setFormData({...formData, wordCount: value})}
              max={4000}
              min={100}
              step={50}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-white">Writing Style</Label>
              <Select value={formData.writingStyle} onValueChange={(value) => setFormData({...formData, writingStyle: value})}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="conversational">Conversational</SelectItem>
                  <SelectItem value="persuasive">Persuasive</SelectItem>
                  <SelectItem value="reflective">Reflective</SelectItem>
                  <SelectItem value="creative">Creative</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Tone</Label>
              <Select value={formData.tone} onValueChange={(value) => setFormData({...formData, tone: value})}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="motivational">Motivational</SelectItem>
                  <SelectItem value="humorous">Humorous</SelectItem>
                  <SelectItem value="neutral">Neutral</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Uniqueness</Label>
              <Select value={formData.uniqueness} onValueChange={(value) => setFormData({...formData, uniqueness: value})}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={handleGenerate} 
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating Assignment...
              </>
            ) : (
              'Generate Assignment'
            )}
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Generated Assignment</CardTitle>
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
              <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Your completed assignment will appear here</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AssignmentGenerator;
