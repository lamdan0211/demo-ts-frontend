'use client';

import React, { useState, useEffect } from 'react';

// Types
interface ForgotPasswordP11OldProps {
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
    'try_new_code': {
      vi: 'Thử mã mới',
      en: 'Try New Code'
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

export default function ForgotPasswordP11Old({
  msg,
  msgType = 'info',
  strCaptcha = 'test',
  language = 'vi',
  csrf_token = ''
}: ForgotPasswordP11OldProps) {
  
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
            if (element.attr('name') === 'security_code') {
              error.insertAfter('#security_code_error');
            } else {
              error.insertAfter(element);
            }
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
    <div className="section-page page-forgot-pre">
      <header className="container-fluid">
        <h2 className="section-title">{t('title_forgot_password', language)}</h2>
      </header>
      
      <div className="container">
        <div className="s-wrapper">
          <form name="frmForgotPassword" id="frmForgotPassword" method="post" onSubmit={handleSubmit}>
            <div className="frmChangePass">
              <p className="text">
                {msgType !== 'success' && t('forgotpass_instruction', language)}
              </p>
              
              {msg && (
                <p className={`boxmsg-${msgType}`}>
                  {msg}
                </p>
              )}
              
              {msgType !== 'success' && (
                <>
                  <div className="row pd55">
                    <label className="width_202 align_right">
                      {t('forgotpass_field_email', language)} <span className="red">*</span>
                    </label>
                    <div className="fl_left">
                      <input 
                        name="email" 
                        id="login_email" 
                        className={`width_238 ${errors.email ? 'error' : ''}`}
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                      {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>
                  </div>
                  
                  <div className="row pd55">
                    <label className="width_202 align_right">
                      {t('field_security_code', language)} <span className="red">*</span>
                    </label>
                    <div className="fl_left">
                      <input 
                        type="text" 
                        className={`required width_125 ${errors.security_code ? 'error' : ''}`}
                        name="security_code" 
                        id="security_code" 
                        maxLength={10} 
                        autoComplete="off"
                        value={formData.security_code}
                        onChange={handleInputChange}
                      />
                      <span className="fl_left mar_left10" id="captchaim">
                        <span id="tn_captcha">{strCaptcha}</span>
                      </span>
                      <a 
                        id="trynewcode" 
                        className="line_bot" 
                        onClick={refreshCaptcha} 
                        href="javascript:void(0);" 
                        style={{ float: 'left', padding: '0px 0px 0px 10px' }}
                      >
                        {t('try_new_code', language)}
                      </a>
                      <span id="security_code_error"></span>
                      {errors.security_code && <span className="error-message">{errors.security_code}</span>}
                    </div>
                  </div>
                  
                  <div className="forgotpassBtn">
                    <input 
                      type="submit" 
                      className="ui_btnCb" 
                      value={t('_Submit_', language)}
                    />
                  </div>
                </>
              )}
            </div>
            
            <input type="hidden" name="csrf_token" value={csrf_token} />
          </form>
        </div>
      </div>
    </div>
  );
}
