
import React from 'react';
import { BookMarked } from 'lucide-react';
import BaseContentGenerator from './BaseContentGenerator';

const DiaryGenerator = () => {
  const fields = [
    {
      id: 'date',
      label: 'Date/Period',
      type: 'input' as const,
      placeholder: 'Date or time period for this entry',
      required: true
    },
    {
      id: 'mood',
      label: 'Mood/Feeling',
      type: 'input' as const,
      placeholder: 'How are you feeling today?',
      required: true
    },
    {
      id: 'events',
      label: 'Key Events',
      type: 'textarea' as const,
      placeholder: 'What happened today that you want to remember?',
      required: true
    },
    {
      id: 'reflection',
      label: 'Thoughts/Reflection',
      type: 'textarea' as const,
      placeholder: 'Any thoughts, insights, or reflections?'
    }
  ];

  return (
    <BaseContentGenerator
      title="Diary"
      icon={BookMarked}
      iconColor="text-teal-400"
      contentType="diary"
      fields={fields}
    />
  );
};

export default DiaryGenerator;
