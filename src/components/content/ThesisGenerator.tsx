
import React from 'react';
import { GraduationCap } from 'lucide-react';
import BaseContentGenerator from './BaseContentGenerator';

const ThesisGenerator = () => {
  const fields = [
    {
      id: 'researchArea',
      label: 'Research Area',
      type: 'input' as const,
      placeholder: 'Enter your research area or field of study',
      required: true
    },
    {
      id: 'researchQuestion',
      label: 'Research Question',
      type: 'textarea' as const,
      placeholder: 'What is your main research question or hypothesis?',
      required: true
    },
    {
      id: 'methodology',
      label: 'Methodology',
      type: 'textarea' as const,
      placeholder: 'Describe your research methodology or approach'
    },
    {
      id: 'objectives',
      label: 'Key Objectives',
      type: 'textarea' as const,
      placeholder: 'List your main research objectives'
    }
  ];

  return (
    <BaseContentGenerator
      title="Thesis"
      icon={GraduationCap}
      iconColor="text-purple-400"
      contentType="thesis"
      fields={fields}
    />
  );
};

export default ThesisGenerator;
