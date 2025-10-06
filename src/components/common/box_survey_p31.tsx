'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from '@/lib/use-translations';

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

interface BoxSurveyP31Props {
  arrFunction: {
    SURVEY_BOX: number;
    MULTI_SURVEY_BOX: number;
  };
  arrSurvey: Survey | SurveySubject[];
  csrf_token: string;
  language: string;
}

export default function BoxSurveyP31({
  arrFunction,
  arrSurvey,
  csrf_token,
  language = 'vi'
}: BoxSurveyP31Props) {
  const t = useTranslations(language);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [surveyResult, setSurveyResult] = useState<string>('');

  // Helper functions
  const getCookie = (name: string): string | null => {
    if (typeof document === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  };

  const setCookie = (name: string, value: string, days: number) => {
    if (typeof document === 'undefined') return;
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  };

  const voteSurvey = async (questionId: number, answerId: number): Promise<string> => {
    try {
      const response = await fetch('/api/survey/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrf_token
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
  };

  const loadSurveyResult = async () => {
    try {
      const response = await fetch(`/api/survey/result?trans=${language}`);
      const result = await response.text();
      setSurveyResult(result);
      return result;
    } catch (error) {
      console.error('Error loading survey result:', error);
      return '';
    }
  };

  const handleVote = async () => {
    if (!selectedAnswer) {
      alert((window as any).language?.msg_select_survey_answer || 'Please select an answer');
      return;
    }

    const questionId = (arrSurvey as Survey).QUESTION_ID;
    const cookieName = `survey_${questionId}`;
    
    if (getCookie(cookieName) === questionId.toString()) {
      alert((window as any).language?.msg_have_already_survey || 'You have already voted');
      return;
    }

    const result = await voteSurvey(questionId, selectedAnswer);
    if (result === '1') {
      setCookie(cookieName, questionId.toString(), 1);
      const surveyResultHtml = await loadSurveyResult();
      
      // Show result in fancybox
      if ((window as any).$.fancybox) {
        (window as any).$.fancybox({
          content: surveyResultHtml,
          padding: 0,
          onComplete: () => {
            const fancyboxContent = document.getElementById('fancybox-content');
            const fancyboxWrap = document.getElementById('fancybox-wrap');
            if (fancyboxContent && fancyboxWrap) {
              fancyboxWrap.style.width = (fancyboxContent.clientWidth + 40) + 'px';
              fancyboxWrap.style.padding = '0';
            }
          }
        });
      }
    }
  };

  const loadMultiQuestion = (id: number) => {
    if ((window as any).$.fancybox) {
      (window as any).$.fancybox({
        href: `/demoa1/ajax/load-multi-question`,
        ajax: {
          type: 'POST',
          data: `id=${id}`
        }
      });
    }
  };

  // Initialize fancybox on component mount
  useEffect(() => {
    if ((window as any).$ && (window as any).$.fancybox) {
      (window as any).$('.showDialog').fancybox();
    }
  }, []);

  // Single survey box
  if (arrFunction.SURVEY_BOX && !arrFunction.MULTI_SURVEY_BOX) {
    const survey = arrSurvey as Survey;
    
    if (!survey.QUESTION_ID) {
      return null;
    }

    return (
      <>
        <h3>{t("Survey")}</h3>
        <p>{survey.QUESTION_CONTENT}</p>
        <ul className="col-xs-12">
          {survey.ANSWERS.map((answer) => (
            <li key={answer.ANSWER_ID} className="col-xs-12">
              <input 
                type="radio" 
                name="survey_answer" 
                value={answer.ANSWER_ID}
                checked={selectedAnswer === answer.ANSWER_ID}
                onChange={() => setSelectedAnswer(answer.ANSWER_ID)}
              />
              <span>{answer.ANSWER_CONTENT}</span>
            </li>
          ))}
        </ul>
        <div className="col-xs-12 col-sm-6 btn-vote">
          <a 
            className="btn btn-primary btn-block" 
            href="javascript:void(0)" 
            id="btnVoteSurvey"
            onClick={handleVote}
          >
            {t('Vote')}
          </a>
        </div>
        <div className="col-xs-12 col-sm-6 btn-result">
          <a 
            className="showDialogD btn showDialog" 
            href="#ResultSurvey"
          >
            {t("Result")}
          </a>
        </div>
        <input type="hidden" name="survey_question" value={survey.QUESTION_ID} />

        <div style={{ display: 'none' }} id="divResultSurvey">
          <div id="ResultSurvey" className="wrapDialog msgbox ResultSurvey">
            <div className="title_msgbox">{t("_Result_")}</div>
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
  if (arrFunction.MULTI_SURVEY_BOX && Array.isArray(arrSurvey) && arrSurvey.length > 0) {
    return (
      <>
        <div className="BoxHolder">
          <div className="bgcolor_theme headerBox">{t("Survey")}</div>
          <div className="containerBox">
            <ul className="ListCareer">
              {(arrSurvey as SurveySubject[]).map((subject) => (
                <li key={subject.SUBJECT_ID}>
                  <a 
                    href="javascript:void(0);" 
                    onClick={() => loadMultiQuestion(subject.SUBJECT_ID)}
                  >
                    {subject.SUBJECT_TITLE}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    );
  }

  return null;
}
