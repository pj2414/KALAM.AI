
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Folder, FileText } from 'lucide-react';

const ContentLibrary = () => {
  return (
    <div className="p-6">
      <div className="text-center text-white py-12">
        <Folder className="w-16 h-16 mx-auto mb-4 text-purple-400" />
        <h2 className="text-2xl font-bold mb-4">Content Library</h2>
        <p className="text-gray-400 max-w-md mx-auto">
          Organize and manage your generated content. Create folders, tag content, and keep everything organized.
        </p>
      </div>
    </div>
  );
};

export default ContentLibrary;
