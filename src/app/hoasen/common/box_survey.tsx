'use client';

import React from 'react';
import BoxSurveyP11 from '../../../components/common/box_survey_p11';

interface BoxSurveyProps {
  // Props will be passed through to BoxSurveyP11
  [key: string]: any;
}

export default function BoxSurvey(props: BoxSurveyProps) {
  return <BoxSurveyP11 {...props} />;
}
