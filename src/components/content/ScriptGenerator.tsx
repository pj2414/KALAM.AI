
import React from 'react';
import { Film } from 'lucide-react';
import BaseContentGenerator from './BaseContentGenerator';

const ScriptGenerator = () => {
  const fields = [
    {
      id: 'eventType',
      label: 'Event Type',
      type: 'input' as const,
      placeholder: 'Wedding, conference, presentation, etc.',
      required: true
    },
    {
      id: 'duration',
      label: 'Expected Duration',
      type: 'input' as const,
      placeholder: 'How long should the event be?',
      required: true
    },
    {
      id: 'audience',
      label: 'Target Audience',
      type: 'input' as const,
      placeholder: 'Who will be attending?',
      required: true
    },
    {
      id: 'keyElements',
      label: 'Key Elements/Segments',
      type: 'textarea' as const,
      placeholder: 'What are the main segments or elements of the event?'
    }
  ];

  return (
    <BaseContentGenerator
      title="Script"
      icon={Film}
      iconColor="text-red-400"
      contentType="script"
      fields={fields}
    />
  );
};

export default ScriptGenerator;
