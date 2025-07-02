
import React from 'react';
import { Mail } from 'lucide-react';
import BaseContentGenerator from './BaseContentGenerator';

const LetterGenerator = () => {
  const fields = [
    {
      id: 'letterType',
      label: 'Letter Type',
      type: 'input' as const,
      placeholder: 'Business, Personal, Complaint, etc.',
      required: true
    },
    {
      id: 'recipient',
      label: 'Recipient',
      type: 'input' as const,
      placeholder: 'Who is this letter addressed to?',
      required: true
    },
    {
      id: 'purpose',
      label: 'Purpose',
      type: 'textarea' as const,
      placeholder: 'What is the main purpose of this letter?',
      required: true
    },
    {
      id: 'keyPoints',
      label: 'Key Points',
      type: 'textarea' as const,
      placeholder: 'List the main points you want to address'
    }
  ];

  return (
    <BaseContentGenerator
      title="Letter"
      icon={Mail}
      iconColor="text-pink-400"
      contentType="letter"
      fields={fields}
    />
  );
};

export default LetterGenerator;
