'use client';

import { useState } from 'react';
import { BoxSurveyProps, Survey, SurveyAnswer, SurveySubject } from '@/lib/types';
import { getSiteConfig } from '@/lib/site-config';

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

// Cookie utility functions
const getCookie = (name: string): string => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || '';
  return '';
};

const setCookie = (name: string, value: string, days: number): void => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

export default function BoxSurvey({ 
  siteId, 
  arrFunction, 
  arrSurvey, 
  csrfToken,
  language = 'vi' 
}: BoxSurveyProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState<boolean>(false);
  const [surveyResult, setSurveyResult] = useState<string>('');

  const siteConfig = getSiteConfig(siteId);
  if (!siteConfig) return null;

  // Single survey box
  if (arrFunction?.SURVEY_BOX && !arrFunction?.MULTI_SURVEY_BOX && arrSurvey && 'QUESTION_ID' in arrSurvey) {
    const survey = arrSurvey as Survey;
    
    const handleVote = async () => {
      if (!selectedAnswer) {
        alert(t('msg_select_survey_answer', language));
        return;
      }

      const questionId = survey.QUESTION_ID.toString();
      
      // Check if user already voted
      if (getCookie(`survey_${questionId}`) === questionId) {
        alert(t('msg_have_already_survey', language));
        return;
      }

      try {
        // Simulate voting API call
        const response = await fetch(`${siteConfig.constants.TN}/ajax/vote-survey`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            question_id: questionId,
            answer_id: selectedAnswer,
            csrf_token: csrfToken || ''
          })
        });

        if (response.ok) {
          setCookie(`survey_${questionId}`, questionId, 1);
          
          // Load survey result
          const resultResponse = await fetch(`${siteConfig.constants.TN}/ajax/load-survey-result`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              trans: siteConfig.constants.LANGUAGE
            })
          });

          if (resultResponse.ok) {
            const result = await resultResponse.text();
            setSurveyResult(result);
            setShowResult(true);
          }
        }
      } catch (error) {
        console.error('Error voting survey:', error);
        alert('Error occurred while voting');
      }
    };

    return (
      <>
        <div className="BoxHolder">
          <div className="bgcolor_theme headerBox">
            {t('Survey', language)}
          </div>
          <div className="containerBox">
            <div className="survey_content">
              <p>{survey.QUESTION_CONTENT}</p>
              <ul>
                {survey.ANSWERS.map((answer: SurveyAnswer) => (
                  <li key={answer.ANSWER_ID}>
                    <input 
                      type="radio" 
                      className="fl_left input_margin" 
                      name="survey_answer" 
                      value={answer.ANSWER_ID.toString()}
                      checked={selectedAnswer === answer.ANSWER_ID.toString()}
                      onChange={(e) => setSelectedAnswer(e.target.value)}
                    />
                    <span className="fl_left">{answer.ANSWER_CONTENT}</span>
                  </li>
                ))}
              </ul>
              <div className="voteBtn">
                <input 
                  type="hidden" 
                  name="survey_question" 
                  value={survey.QUESTION_ID} 
                />
                <input 
                  type="button" 
                  className="ui_btnCb btnSmall" 
                  id="btnVoteSurvey"
                  value={t('Vote', language)}
                  onClick={handleVote}
                />
                <span className="result">
                  <a 
                    href="#ResultSurvey" 
                    className="showDialog"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowResult(true);
                    }}
                  >
                    {t('Result', language)}
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Survey Result Modal */}
        {showResult && (
          <div className="modal-overlay" onClick={() => setShowResult(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="title_msgbox">{t('_Result_', language)}</div>
              <div className="container">
                <div className="box_width_common">
                  <p className="title_danhgia_core col_theme">{survey.QUESTION_CONTENT}</p>
                </div>
                <div className="fl_left box_width_common">
                  <ul className="scroll_thongke">
                    {survey.ANSWERS.map((answer: SurveyAnswer) => (
                      <li key={answer.ANSWER_ID} id={`rs_${answer.ANSWER_ID}`}>
                        <div className="info_result">
                          <div className="label_result">{answer.ANSWER_CONTENT}</div>
                          <div className="fl_right scroll_color">
                            <span 
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
              <button 
                className="close-btn"
                onClick={() => setShowResult(false)}
              >
                ×
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Multi survey box
  if (arrFunction?.MULTI_SURVEY_BOX && arrSurvey && Array.isArray(arrSurvey)) {
    const surveys = arrSurvey as SurveySubject[];

    const loadMultiQuestion = async (subjectId: number) => {
      try {
        const response = await fetch(`${siteConfig.constants.TN}/ajax/load-multi-question`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            id: subjectId.toString()
          })
        });

        if (response.ok) {
          const content = await response.text();
          // Handle multi-question display (this would need a modal or separate component)
          console.log('Multi-question content:', content);
        }
      } catch (error) {
        console.error('Error loading multi-question:', error);
      }
    };

    return (
      <div className="BoxHolder">
        <div className="bgcolor_theme headerBox">
          {t('Survey', language)}
        </div>
        <div className="containerBox">
          <ul className="ListCareer">
            {surveys.map((survey: SurveySubject) => (
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

  // No survey to display
  return null;
}