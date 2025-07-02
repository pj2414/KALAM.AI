
import React from 'react';
import { BarChart3 } from 'lucide-react';
import BaseContentGenerator from './BaseContentGenerator';

const ReportGenerator = () => {
  const fields = [
    {
      id: 'reportType',
      label: 'Report Type',
      type: 'input' as const,
      placeholder: 'What type of report is this?',
      required: true
    },
    {
      id: 'objective',
      label: 'Objective',
      type: 'textarea' as const,
      placeholder: 'What is the main objective of this report?',
      required: true
    },
    {
      id: 'scope',
      label: 'Scope',
      type: 'textarea' as const,
      placeholder: 'Define the scope and boundaries of the report'
    },
    {
      id: 'keyFindings',
      label: 'Key Findings/Data',
      type: 'textarea' as const,
      placeholder: 'Provide key findings, data, or observations'
    }
  ];

  return (
    <BaseContentGenerator
      title="Report"
      icon={BarChart3}
      iconColor="text-indigo-400"
      contentType="report"
      fields={fields}
    />
  );
};

export default ReportGenerator;
