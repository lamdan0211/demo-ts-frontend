'use client';

import React, { useState, useEffect } from 'react';

// Types
interface ForgotPasswordV1Props {
  msg?: string;
  msgType?: 'success' | 'error' | 'warning' | 'info';
  strCaptcha?: string;
  language?: 'vi' | 'en';
  csrf_token?: string;
}

// Translation function
function t(key: string, language: 'vi' | 'en' = 'vi'): string {
  const translations: Record<string, Record<string, string>> = {
    'title_forgot_password': {
      vi: 'Quên mật khẩu',
      en: 'Forgot Password'
    },
    'forgotpass_instruction': {
      vi: 'Nhập email của bạn để nhận link đặt lại mật khẩu',
      en: 'Enter your email to receive password reset link'
    },
    'forgotpass_field_email': {
      vi: 'Email của bạn',
      en: 'Your Email'
    },
    'field_security_code': {
      vi: 'Mã bảo mật',
      en: 'Security Code'
    },
    '_Submit_': {
      vi: 'Gửi',
      en: 'Submit'
    },
    'msg_email_require': {
      vi: 'Email là bắt buộc',
      en: 'Email is required'
    },
    'msg_email_rule': {
      vi: 'Email không hợp lệ',
      en: 'Invalid email format'
    }
  };
  
  return translations[key]?.[language] || key;
}

export default function ForgotPasswordV1({
  msg,
  msgType = 'info',
  strCaptcha = 'test',
  language = 'vi',
  csrf_token = ''
}: ForgotPasswordV1Props) {
  
  const [formData, setFormData] = useState({
    email: '',
    security_code: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email.trim()) {
      newErrors.email = t('msg_email_require', language);
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('msg_email_rule', language);
    }
    
    if (!formData.security_code.trim()) {
      newErrors.security_code = 'Mã bảo mật là bắt buộc';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Handle form submission
      console.log('Form submitted:', formData);
      // Here you would typically send the data to your API
    }
  };

  const refreshCaptcha = () => {
    // Handle captcha refresh
    console.log('Refreshing captcha...');
    // This would typically make an API call to get a new captcha
  };

  // Initialize form validation
  useEffect(() => {
    const initValidation = () => {
      if (typeof window !== 'undefined' && (window as any).jQuery && (window as any).jQuery.fn.validate) {
        (window as any).jQuery('#frmForgotPassword').validate({
          onkeyup: false,
          rules: {
            security_code: { required: true },
            email: { required: true, email: true }
          },
          messages: {
            email: {
              required: t('msg_email_require', language),
              email: t('msg_email_rule', language)
            }
          },
          errorPlacement: function(error: any, element: any) {
            error.insertAfter(element);
          }
        });
      }
    };

    // Wait for jQuery to be available
    const checkJQuery = () => {
      if (typeof window !== 'undefined' && (window as any).jQuery) {
        initValidation();
      } else {
        setTimeout(checkJQuery, 100);
      }
    };

    checkJQuery();
  }, [language]);

  return (
    <div className="form-area">
      <div className="form-login">
        <div className="text-guide">
          <h3 className="mb-5">
            {t('title_forgot_password', language)}
          </h3>
          <p>
            {msgType !== 'success' && t('forgotpass_instruction', language)}
          </p>
          {msg && (
            <p className={`boxmsg-${msgType}`}>
              {msg}
            </p>
          )}
        </div>
        
        {msgType !== 'success' && (
          <form name="frmForgotPassword" id="frmForgotPassword" method="post" onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="label">
                <label>
                  {t('forgotpass_field_email', language)} <span>*</span>
                </label>
              </div>
              <div className="input-area">
                <input 
                  name="email" 
                  id="login_email" 
                  className={`form-control ${errors.email ? 'error' : ''}`}
                  placeholder="Nhập mail của bạn"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
            </div>
            
            <div className="form-group">
              <div className="label">
                <label>
                  {t('field_security_code', language)} <span>*</span>
                </label>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <input 
                    type="text" 
                    className={`required form-control ${errors.security_code ? 'error' : ''}`}
                    placeholder="Nhập Mã số bảo mật" 
                    name="security_code" 
                    id="security_code" 
                    maxLength={10} 
                    autoComplete="off"
                    value={formData.security_code}
                    onChange={handleInputChange}
                  />
                  {errors.security_code && <span className="error-message">{errors.security_code}</span>}
                </div>
                <div className="col-sm-6">
                  <div className="row align-center">
                    <div className="col-9 img-captcha">
                      <div id="captchaim">
                        <span id="tn_captcha">{strCaptcha}</span>
                      </div>
                    </div>
                    <div className="col-3">
                      <a 
                        id="trynewcode" 
                        onClick={refreshCaptcha} 
                        tabIndex={0} 
                        role="button"
                        style={{ cursor: 'pointer' }}
                      >
                        <svg width="35" height="29" viewBox="0 0 35 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path 
                            fillRule="evenodd" 
                            clipRule="evenodd" 
                            d="M8.74734 13.3286L5.36072 16.7152C5.13438 16.9416 4.83827 17.0522 4.54215 17.0522C4.24603 17.0522 3.94992 16.9416 3.72358 16.7152L0.33696 13.3286C-0.11232 12.8776 -0.11232 12.1493 0.33696 11.7C0.78624 11.2507 1.51462 11.2507 1.9656 11.7L3.34918 13.0836C3.92439 5.76405 10.0322 0 17.4998 0C22.9541 0 27.6835 3.07689 30.0643 7.585C30.3638 8.1466 30.1528 8.84264 29.5929 9.14216C29.033 9.43998 28.337 9.22725 28.0374 8.66735H28.034C26.0395 4.88422 22.0743 2.30256 17.4998 2.30256C11.2728 2.30256 6.17249 7.08296 5.64663 13.1721L7.1187 11.7C7.56968 11.2507 8.29806 11.2507 8.74734 11.7C9.19662 12.1493 9.19662 12.8776 8.74734 13.3286ZM34.6618 15.0861C35.1127 15.5354 35.1127 16.2638 34.6618 16.7147C34.2125 17.164 33.4841 17.164 33.0331 16.7147L31.6495 15.3312C31.076 22.6507 24.9665 28.4147 17.5006 28.4147C12.0446 28.4147 7.31526 25.3361 4.93272 20.8263C4.6332 20.2647 4.84592 19.5687 5.40752 19.2692C5.96742 18.9696 6.66517 19.1824 6.96469 19.7423V19.7457H6.96639C8.95922 23.5288 12.9262 26.1122 17.5006 26.1122C23.7259 26.1122 28.8279 21.3318 29.3521 15.241L27.88 16.7147C27.4307 17.164 26.7024 17.164 26.2531 16.7147C25.8021 16.2638 25.8021 15.5354 26.2531 15.0861L29.638 11.6995C29.8643 11.4731 30.1605 11.3625 30.4566 11.3625C30.7527 11.3625 31.0488 11.4731 31.2751 11.6995L34.6618 15.0861Z" 
                            fill="#09589E"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <input type="hidden" name="csrf_token" value={csrf_token} />
            
            <div className="form-action">
              <div className="row">
                <div className="col-12">
                  <button type="submit" className="btn-st1">
                    {t('_Submit_', language)}
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
