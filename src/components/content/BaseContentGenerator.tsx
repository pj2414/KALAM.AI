import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { VoiceInput } from '@/components/ui/voice-input';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Download, Edit3, Save, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import jsPDF from 'jspdf';
import { apiService } from '@/services/api';

interface BaseContentGeneratorProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  contentType: string;
  fields: Array<{
    id: string;
    label: string;
    type: 'input' | 'textarea';
    placeholder: string;
    required?: boolean;
  }>;
}

const BaseContentGenerator: React.FC<BaseContentGeneratorProps> = ({
  title,
  icon: Icon,
  iconColor,
  contentType,
  fields
}) => {
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [currentContentId, setCurrentContentId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({
    title: '',
    wordCount: [500],
    writingStyle: 'academic',
    tone: 'neutral',
    uniqueness: 'standard'
  });

  const { toast } = useToast();

  const handleVoiceInput = (fieldId: string, transcript: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: prev[fieldId] ? prev[fieldId] + ' ' + transcript : transcript
    }));
  };

  const handleGenerate = async () => {
    const requiredFields = fields.filter(field => field.required);
    const missingFields = requiredFields.filter(field => !formData[field.id]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: `Please provide: ${missingFields.map(f => f.label).join(', ')}`,
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const inputData: Record<string, any> = {};
      fields.forEach(field => {
        if (formData[field.id]) {
          inputData[field.id] = formData[field.id];
        }
      });

      const data = await apiService.generateContent({
        type: contentType,
        title: formData.title,
        inputData,
        parameters: {
          wordCount: formData.wordCount[0],
          writingStyle: formData.writingStyle,
          tone: formData.tone,
          uniqueness: formData.uniqueness,
          plagiarismSafety: true,
          language: 'english'
        }
      });

      setGeneratedContent(data.content.content);
      setCurrentContentId(data.content.id);
      setIsEditing(false);
      toast({
        title: `${title} Generated!`,
        description: `Your ${title.toLowerCase()} has been successfully generated.`
      });
    } catch (error: any) {
      toast({
        title: "Generation Failed",
        description: error.message || `Failed to generate ${title.toLowerCase()}. Please try again.`,
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
      await apiService.updateContent(currentContentId, {
        content: editedContent,
        editNote: `Manual edit from ${title.toLowerCase()} generator`
      });
      setGeneratedContent(editedContent);
      setIsEditing(false);
      toast({
        title: "Content Updated",
        description: `Your ${title.toLowerCase()} has been successfully updated.`
      });
    } catch (error: any) {
      toast({
        title: "Save Failed",
        description: error.message || "Failed to save changes. Please try again.",
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
        const cleanText = line.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1');
        const textLines = doc.splitTextToSize(cleanText, maxWidth);
        doc.text(textLines, margin, currentY);
        currentY += textLines.length * 6 + 3;
      }
    });
    
    doc.save(`${formData.title || title.toLowerCase()}.pdf`);
    
    toast({
      title: "Downloaded",
      description: `${title} downloaded as PDF with formatting preserved.`
    });
  };

  const downloadAsText = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${formData.title || title.toLowerCase()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Downloaded",
      description: `${title} downloaded as text file successfully.`
    });
  };

  return (
    <div className="p-3 sm:p-6 grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2 text-lg sm:text-xl">
            <Icon className={`w-5 h-5 ${iconColor}`} />
            {title} Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white text-sm sm:text-base">{title} Title</Label>
            <div className="relative">
              <Input
                id="title"
                placeholder={`Enter your ${title.toLowerCase()} title`}
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 text-sm sm:text-base pr-12"
              />
              <VoiceInput
                onTranscript={(transcript) => handleVoiceInput('title', transcript)}
              />
            </div>
          </div>

          {fields.map((field) => (
            <div key={field.id} className="space-y-2">
              <Label htmlFor={field.id} className="text-white text-sm sm:text-base">
                {field.label} {field.required && <span className="text-red-400">*</span>}
              </Label>
              <div className="relative">
                {field.type === 'input' ? (
                  <Input
                    id={field.id}
                    placeholder={field.placeholder}
                    value={formData[field.id] || ''}
                    onChange={(e) => setFormData({...formData, [field.id]: e.target.value})}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 text-sm sm:text-base pr-12"
                  />
                ) : (
                  <Textarea
                    id={field.id}
                    placeholder={field.placeholder}
                    value={formData[field.id] || ''}
                    onChange={(e) => setFormData({...formData, [field.id]: e.target.value})}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 text-sm sm:text-base pr-12"
                    rows={3}
                  />
                )}
                <VoiceInput
                  onTranscript={(transcript) => handleVoiceInput(field.id, transcript)}
                  className={field.type === 'textarea' ? 'top-3' : ''}
                />
              </div>
            </div>
          ))}

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
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-sm sm:text-base py-2 sm:py-3 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating {title}...
              </>
            ) : (
              `Generate ${title}`
            )}
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <span className="text-lg sm:text-xl">Generated {title}</span>
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
                  placeholder={`Edit your ${title.toLowerCase()} content...`}
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
              <Icon className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-4 opacity-50" />
              <p className="text-sm sm:text-base">Your generated {title.toLowerCase()} will appear here</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BaseContentGenerator;
