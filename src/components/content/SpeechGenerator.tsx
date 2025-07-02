
import React from 'react';
import { Mic } from 'lucide-react';
import BaseContentGenerator from './BaseContentGenerator';

const SpeechGenerator = () => {
  const fields = [
    {
      id: 'occasion',
      label: 'Occasion/Event',
      type: 'input' as const,
      placeholder: 'What is the occasion or event?',
      required: true
    },
    {
      id: 'audience',
      label: 'Target Audience',
      type: 'input' as const,
      placeholder: 'Who is your audience?',
      required: true
    },
    {
      id: 'mainMessage',
      label: 'Main Message',
      type: 'textarea' as const,
      placeholder: 'What is the key message you want to convey?',
      required: true
    },
    {
      id: 'keyPoints',
      label: 'Key Points',
      type: 'textarea' as const,
      placeholder: 'List the main points you want to cover'
    }
  ];

  return (
    <BaseContentGenerator
      title="Speech"
      icon={Mic}
      iconColor="text-yellow-400"
      contentType="speech"
      fields={fields}
    />
  );
};

export default SpeechGenerator;
