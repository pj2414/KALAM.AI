import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { Loader2, FileText, Download, Edit3, Save, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import jsPDF from 'jspdf';

const EssayGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [currentContentId, setCurrentContentId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    topic: '',
    additionalRequirements: '',
    wordCount: [500],
    writingStyle: 'academic',
    tone: 'neutral',
    uniqueness: 'standard'
  });

  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!formData.title || !formData.topic) {
      toast({
        title: "Missing Information",
        description: "Please provide both title and topic for your essay.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/content/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          type: 'essay',
          title: formData.title,
          inputData: {
            topic: formData.topic,
            additionalRequirements: formData.additionalRequirements
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
        setCurrentContentId(data.content.id);
        setIsEditing(false);
        toast({
          title: "Essay Generated!",
          description: "Your essay has been successfully generated."
        });
      } else {
        throw new Error('Failed to generate content');
      }
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate essay. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setEditedContent(generatedContent);
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    if (!currentContentId) {
      toast({
        title: "Error",
        description: "No content ID found for saving.",
        variant: "destructive"
      });
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/content/${currentContentId}/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          content: editedContent,
          editNote: 'Manual edit from essay generator'
        })
      });

      if (response.ok) {
        setGeneratedContent(editedContent);
        setIsEditing(false);
        toast({
          title: "Content Updated",
          description: "Your essay has been successfully updated."
        });
      } else {
        throw new Error('Failed to save changes');
      }
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Failed to save changes. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent('');
  };

  const downloadAsPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - 2 * margin;
    let currentY = margin;

    // Title
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    const titleLines = doc.splitTextToSize(formData.title, maxWidth);
    doc.text(titleLines, margin, currentY);
    currentY += titleLines.length * 8 + 10;

    // Content - process markdown formatting
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    
    const lines = generatedContent.split('\n');
    
    lines.forEach((line) => {
      if (currentY > pageHeight - margin) {
        doc.addPage();
        currentY = margin;
      }
      
      // Handle different markdown elements
      if (line.startsWith('# ')) {
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        const text = line.replace('# ', '');
        const textLines = doc.splitTextToSize(text, maxWidth);
        doc.text(textLines, margin, currentY);
        currentY += textLines.length * 8 + 5;
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
      } else if (line.startsWith('## ')) {
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        const text = line.replace('## ', '');
        const textLines = doc.splitTextToSize(text, maxWidth);
        doc.text(textLines, margin, currentY);
        currentY += textLines.length * 7 + 4;
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
      } else if (line.startsWith('### ')) {
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        const text = line.replace('### ', '');
        const textLines = doc.splitTextToSize(text, maxWidth);
        doc.text(textLines, margin, currentY);
        currentY += textLines.length * 6 + 3;
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
      } else if (line.trim() === '') {
        currentY += 5;
      } else {
        // Regular paragraph text
        const cleanText = line.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1');
        const textLines = doc.splitTextToSize(cleanText, maxWidth);
        doc.text(textLines, margin, currentY);
        currentY += textLines.length * 6 + 3;
      }
    });
    
    doc.save(`${formData.title || 'essay'}.pdf`);
    
    toast({
      title: "Downloaded",
      description: "Essay downloaded as PDF with formatting preserved."
    });
  };

  const downloadAsText = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${formData.title || 'essay'}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Downloaded",
      description: "Essay downloaded as text file successfully."
    });
  };

  return (
    <div className="p-3 sm:p-6 grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2 text-lg sm:text-xl">
            <FileText className="w-5 h-5 text-blue-400" />
            Essay Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white text-sm sm:text-base">Essay Title</Label>
            <Input
              id="title"
              placeholder="Enter your essay title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 text-sm sm:text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="topic" className="text-white text-sm sm:text-base">Topic</Label>
            <Input
              id="topic"
              placeholder="Enter the main topic"
              value={formData.topic}
              onChange={(e) => setFormData({...formData, topic: e.target.value})}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 text-sm sm:text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements" className="text-white text-sm sm:text-base">Additional Requirements</Label>
            <Textarea
              id="requirements"
              placeholder="Any specific instructions or requirements"
              value={formData.additionalRequirements}
              onChange={(e) => setFormData({...formData, additionalRequirements: e.target.value})}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 text-sm sm:text-base"
              rows={3}
            />
          </div>

          <div className="space-y-3">
            <Label className="text-white text-sm sm:text-base">Word Count: {formData.wordCount[0]}</Label>
            <Slider
              value={formData.wordCount}
              onValueChange={(value) => setFormData({...formData, wordCount: value})}
              max={4000}
              min={100}
              step={50}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-white text-sm">Writing Style</Label>
              <Select value={formData.writingStyle} onValueChange={(value) => setFormData({...formData, writingStyle: value})}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white text-sm">
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
              <Label className="text-white text-sm">Tone</Label>
              <Select value={formData.tone} onValueChange={(value) => setFormData({...formData, tone: value})}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white text-sm">
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
              <Label className="text-white text-sm">Uniqueness</Label>
              <Select value={formData.uniqueness} onValueChange={(value) => setFormData({...formData, uniqueness: value})}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white text-sm">
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
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-sm sm:text-base py-2 sm:py-3"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating Essay...
              </>
            ) : (
              'Generate Essay'
            )}
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <span className="text-lg sm:text-xl">Generated Essay</span>
            {generatedContent && (
              <div className="flex flex-wrap gap-2">
                {!isEditing ? (
                  <Button
                    onClick={handleEdit}
                    size="sm"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 text-xs sm:text-sm"
                  >
                    <Edit3 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      onClick={handleSaveEdit}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-xs sm:text-sm"
                    >
                      <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      Save
                    </Button>
                    <Button
                      onClick={handleCancelEdit}
                      size="sm"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 text-xs sm:text-sm"
                    >
                      <X className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      Cancel
                    </Button>
                  </div>
                )}
                <Select onValueChange={(value) => {
                  if (value === 'pdf') downloadAsPDF();
                  if (value === 'text') downloadAsText();
                }}>
                  <SelectTrigger className="w-24 sm:w-32 bg-white/10 border-white/20 text-white text-xs sm:text-sm">
                    <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <SelectValue placeholder="Download" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="text">Text</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {generatedContent ? (
            <div className="space-y-4">
              {isEditing ? (
                <Textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="min-h-[300px] sm:min-h-[500px] bg-white/5 border-white/20 text-white resize-none text-sm sm:text-base"
                  placeholder="Edit your essay content..."
                />
              ) : (
                <div className="prose prose-invert max-w-none prose-sm sm:prose-base">
                  <div className="bg-white/5 p-3 sm:p-6 rounded-lg text-white markdown-content overflow-auto">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h1: ({children}) => <h1 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-4 text-blue-300">{children}</h1>,
                        h2: ({children}) => <h2 className="text-base sm:text-xl font-semibold mb-2 sm:mb-3 text-purple-300">{children}</h2>,
                        h3: ({children}) => <h3 className="text-sm sm:text-lg font-medium mb-2 text-green-300">{children}</h3>,
                        p: ({children}) => <p className="mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">{children}</p>,
                        ul: ({children}) => <ul className="list-disc list-inside mb-3 sm:mb-4 space-y-1 text-sm sm:text-base">{children}</ul>,
                        ol: ({children}) => <ol className="list-decimal list-inside mb-3 sm:mb-4 space-y-1 text-sm sm:text-base">{children}</ol>,
                        strong: ({children}) => <strong className="font-semibold text-yellow-300">{children}</strong>,
                        em: ({children}) => <em className="italic text-cyan-300">{children}</em>,
                      }}
                    >
                      {generatedContent}
                    </ReactMarkdown>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-8">
              <FileText className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-4 opacity-50" />
              <p className="text-sm sm:text-base">Your generated essay will appear here</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EssayGenerator;
