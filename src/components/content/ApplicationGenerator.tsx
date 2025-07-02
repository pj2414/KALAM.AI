
import React from 'react';
import { FileCheck } from 'lucide-react';
import BaseContentGenerator from './BaseContentGenerator';

const ApplicationGenerator = () => {
  const fields = [
    {
      id: 'applicationType',
      label: 'Application Type',
      type: 'input' as const,
      placeholder: 'Job application, school admission, etc.',
      required: true
    },
    {
      id: 'position',
      label: 'Position/Program',
      type: 'input' as const,
      placeholder: 'What position or program are you applying for?',
      required: true
    },
    {
      id: 'qualifications',
      label: 'Key Qualifications',
      type: 'textarea' as const,
      placeholder: 'List your relevant qualifications and experience',
      required: true
    },
    {
      id: 'motivation',
      label: 'Motivation/Interest',
      type: 'textarea' as const,
      placeholder: 'Why are you interested in this position/program?'
    }
  ];

  return (
    <BaseContentGenerator
      title="Application"
      icon={FileCheck}
      iconColor="text-emerald-400"
      contentType="application"
      fields={fields}
    />
  );
};

export default ApplicationGenerator;
