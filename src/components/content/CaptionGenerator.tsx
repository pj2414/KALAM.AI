
import React from 'react';
import { Instagram } from 'lucide-react';
import BaseContentGenerator from './BaseContentGenerator';

const CaptionGenerator = () => {
  const fields = [
    {
      id: 'platform',
      label: 'Social Platform',
      type: 'input' as const,
      placeholder: 'Instagram, Facebook, Twitter, etc.',
      required: true
    },
    {
      id: 'contentType',
      label: 'Content Type',
      type: 'input' as const,
      placeholder: 'Photo, video, story, etc.',
      required: true
    },
    {
      id: 'description',
      label: 'Content Description',
      type: 'textarea' as const,
      placeholder: 'Describe what your post is about',
      required: true
    },
    {
      id: 'hashtags',
      label: 'Target Keywords/Themes',
      type: 'input' as const,
      placeholder: 'Keywords or themes for hashtag suggestions'
    }
  ];

  return (
    <BaseContentGenerator
      title="Caption"
      icon={Instagram}
      iconColor="text-violet-400"
      contentType="caption"
      fields={fields}
    />
  );
};

export default CaptionGenerator;
