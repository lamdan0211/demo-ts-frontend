'use client';

import React, { useState, useEffect } from 'react';

// Types
interface SurveyAnswer {
  ANSWER_ID: number;
  ANSWER_CONTENT: string;
  ANSWER_VOTE: number;
}

interface Survey {
  QUESTION_ID: number;
  QUESTION_CONTENT: string;
  ANSWERS: SurveyAnswer[];
}

interface SurveySubject {
  SUBJECT_ID: number;
  SUBJECT_TITLE: string;
}

interface BoxSurveyP11Props {
  arrFunction?: {
    SURVEY_BOX?: boolean;
    MULTI_SURVEY_BOX?: boolean;
  };
  arrSurvey?: Survey | SurveySubject[];
  language?: 'vi' | 'en';
  LANGUAGE?: string;
  TN?: string;
  csrf_token?: string;
}

// Translation function
function t(key: string, language: 'vi' | 'en' = 'vi'): string {
  const translations: Record<string, Record<string, string>> = {
    'Survey': {
      vi: 'Khảo sát',
      en: 'Survey'
    },
    'Vote': {
      vi: 'Bình chọn',
      en: 'Vote'
    },
    'Result': {
      vi: 'Kết quả',
      en: 'Result'
    },
    '_Result_': {
      vi: 'Kết quả',
      en: 'Result'
    },
    'msg_have_already_survey': {
      vi: 'Bạn đã tham gia khảo sát này rồi',
      en: 'You have already participated in this survey'
    },
    'msg_select_survey_answer': {
      vi: 'Vui lòng chọn một câu trả lời',
      en: 'Please select an answer'
    }
  };
  
  return translations[key]?.[language] || key;
}

// Cookie helper functions
function getCookie(name: string): string {
  if (typeof document === 'undefined') return '';
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || '';
  return '';
}

function setCookie(name: string, value: string, days: number): void {
  if (typeof document === 'undefined') return;
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

// Vote survey function
async function voteSurvey(questionId: number, answerId: number): Promise<string> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/survey/vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        questionId,
        answerId
      })
    });
    
    if (response.ok) {
      return '1';
    }
    return '0';
  } catch (error) {
    console.error('Error voting survey:', error);
    return '0';
  }
}

// Load survey result function
async function loadSurveyResult(language: string): Promise<string> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/survey/result?trans=${language}`);
    return await response.text();
  } catch (error) {
    console.error('Error loading survey result:', error);
    return '';
  }
}

export default function BoxSurveyP11({
  arrFunction = {},
  arrSurvey,
  language = 'vi',
  LANGUAGE = 'vi',
  TN = '/hoasen',
  csrf_token = ''
}: BoxSurveyP11Props) {
  
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [surveyResult, setSurveyResult] = useState<string>('');

  // Single survey box
  if (arrFunction.SURVEY_BOX && !arrFunction.MULTI_SURVEY_BOX && arrSurvey && 'QUESTION_ID' in arrSurvey) {
    const survey = arrSurvey as Survey;

    const handleVote = async () => {
      if (selectedAnswer === null) {
        alert(t('msg_select_survey_answer', language));
        return;
      }

      const questionId = survey.QUESTION_ID;
      const cookieKey = `survey_${questionId}`;
      
      if (getCookie(cookieKey) === questionId.toString()) {
        alert(t('msg_have_already_survey', language));
        return;
      }

      const result = await voteSurvey(questionId, selectedAnswer);
      
      if (result === '1') {
        setCookie(cookieKey, questionId.toString(), 1);
        
        // Load and show result
        const resultHtml = await loadSurveyResult(LANGUAGE);
        setSurveyResult(resultHtml);
        
        // Show Fancybox
        if (typeof window !== 'undefined' && (window as any).jQuery && (window as any).jQuery.fancybox) {
          (window as any).jQuery.fancybox({
            content: resultHtml,
            'padding': 0,
            onComplete: function() {
              const fancyboxContent = (window as any).jQuery('#fancybox-content');
              const fancyboxWrap = (window as any).jQuery('#fancybox-wrap');
              if (fancyboxContent.length && fancyboxWrap.length) {
                fancyboxWrap.css({
                  'width': (fancyboxContent.width() + 40) + 'px',
                  'padding': 0
                });
              }
            }
          });
        }
      }
    };

    return (
      <>
        <h2>{t('Survey', language)}</h2>
        <p>{survey.QUESTION_CONTENT}</p>
        <ul className="col-xs-12">
          {survey.ANSWERS.map((answer) => (
            <li key={answer.ANSWER_ID} className="col-xs-12">
              <input 
                type="radio" 
                className="fl_left input_margin" 
                name="survey_answer" 
                value={answer.ANSWER_ID}
                checked={selectedAnswer === answer.ANSWER_ID}
                onChange={(e) => setSelectedAnswer(Number(e.target.value))}
              />
              <span className="fl_left">{answer.ANSWER_CONTENT}</span>
            </li>
          ))}
        </ul>
        
        <div className="col-xs-12 col-sm-6 btn-vote">
          <a className="btn" href="javascript:void(0)" onClick={handleVote}>
            {t('Vote', language)}
          </a>
        </div>
        
        <div className="col-xs-12 col-sm-6 btn-result">
          <a className="showDialogD btn" href="#ResultSurvey" className="showDialog">
            {t('Result', language)}
          </a>
        </div>
        
        <input type="hidden" name="survey_question" value={survey.QUESTION_ID} />
        
        {/* Survey Result Dialog */}
        <div style={{ display: 'none' }} id="divResultSurvey">
          <div id="ResultSurvey" className="wrapDialog msgbox ResultSurvey">
            <div className="title_msgbox">{t('_Result_', language)}</div>
            <div className="container">
              <div className="box_width_common">
                <p className="title_danhgia_core col_theme">{survey.QUESTION_CONTENT}</p>
              </div>
              <div className="fl_left box_width_common">
                <ul className="scroll_thongke">
                  {survey.ANSWERS.map((answer) => (
                    <li key={answer.ANSWER_ID} id={`rs_${answer.ANSWER_ID}`}>
                      <div className="info_result">
                        <div className="label_result">{answer.ANSWER_CONTENT}</div>
                        <div className="fl_right scroll_color">
                          <span 
                            percent={answer.ANSWER_VOTE} 
                            className="bg_center_scroll bgcolor_theme" 
                            style={{ width: `${answer.ANSWER_VOTE}%` }}
                          >
                            <label className="txt_number_ketqua">{answer.ANSWER_VOTE}%</label>
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="clear"></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Multi survey box
  if (arrFunction.MULTI_SURVEY_BOX && arrSurvey && Array.isArray(arrSurvey)) {
    const surveys = arrSurvey as SurveySubject[];

    const loadMultiQuestion = (id: number) => {
      if (typeof window !== 'undefined' && (window as any).jQuery && (window as any).jQuery.fancybox) {
        (window as any).jQuery.fancybox({
          'href': `${TN}/ajax/load-multi-question`,
          ajax: {
            type: 'POST',
            data: `id=${id}`
          }
        });
      }
    };

    return (
      <div className="BoxHolder">
        <div className="bgcolor_theme headerBox">{t('Survey', language)}</div>
        <div className="containerBox">
          <ul className="ListCareer">
            {surveys.map((survey) => (
              <li key={survey.SUBJECT_ID}>
                <a 
                  href="javascript:void(0);" 
                  onClick={() => loadMultiQuestion(survey.SUBJECT_ID)}
                >
                  {survey.SUBJECT_TITLE}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return null;
}
