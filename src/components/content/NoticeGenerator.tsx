
import React from 'react';
import { Bell } from 'lucide-react';
import BaseContentGenerator from './BaseContentGenerator';

const NoticeGenerator = () => {
  const fields = [
    {
      id: 'organization',
      label: 'Organization/Institution',
      type: 'input' as const,
      placeholder: 'Name of the organization or institution',
      required: true
    },
    {
      id: 'purpose',
      label: 'Purpose of Notice',
      type: 'input' as const,
      placeholder: 'What is this notice about?',
      required: true
    },
    {
      id: 'details',
      label: 'Details',
      type: 'textarea' as const,
      placeholder: 'Provide detailed information about the notice',
      required: true
    },
    {
      id: 'deadline',
      label: 'Important Dates/Deadlines',
      type: 'input' as const,
      placeholder: 'Any important dates or deadlines'
    }
  ];

  return (
    <BaseContentGenerator
      title="Notice"
      icon={Bell}
      iconColor="text-cyan-400"
      contentType="notice"
      fields={fields}
    />
  );
};

export default NoticeGenerator;
