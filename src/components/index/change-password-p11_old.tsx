'use client';

import React, { useState, useEffect } from 'react';

// Types
interface ChangePasswordP11OldProps {
  msg?: string;
  strEmail?: string;
  language?: 'vi' | 'en';
  csrf_token?: string;
}

// Translation function
function t(key: string, language: 'vi' | 'en' = 'vi'): string {
  const translations: Record<string, Record<string, string>> = {
    '_Change your login password_': {
      vi: 'Thay đổi mật khẩu đăng nhập',
      en: 'Change your login password'
    },
    '_Provide your new password_': {
      vi: 'Cung cấp mật khẩu mới của bạn',
      en: 'Provide your new password'
    },
    '_Your login email_': {
      vi: 'Email đăng nhập của bạn',
      en: 'Your login email'
    },
    '_New password_': {
      vi: 'Mật khẩu mới',
      en: 'New password'
    },
    '_Confirm new password_': {
      vi: 'Xác nhận mật khẩu mới',
      en: 'Confirm new password'
    },
    '_Submit_': {
      vi: 'Gửi',
      en: 'Submit'
    },
    'msg_password_require': {
      vi: 'Mật khẩu là bắt buộc',
      en: 'Password is required'
    },
    'msg_password_length': {
      vi: 'Mật khẩu phải có từ 6-16 ký tự',
      en: 'Password must be 6-16 characters'
    },
    'msg_password_unicode': {
      vi: 'Mật khẩu không hợp lệ',
      en: 'Invalid password format'
    },
    'msg_password_confirm_require': {
      vi: 'Xác nhận mật khẩu là bắt buộc',
      en: 'Password confirmation is required'
    },
    'msg_password_confirm_equal': {
      vi: 'Mật khẩu xác nhận không khớp',
      en: 'Password confirmation does not match'
    }
  };
  
  return translations[key]?.[language] || key;
}

export default function ChangePasswordP11Old({
  msg,
  strEmail = '',
  language = 'vi',
  csrf_token = ''
}: ChangePasswordP11OldProps) {
  
  const [formData, setFormData] = useState({
    password: '',
    confirm_password: ''
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
    
    if (!formData.password.trim()) {
      newErrors.password = t('msg_password_require', language);
    } else if (formData.password.length < 6 || formData.password.length > 16) {
      newErrors.password = t('msg_password_length', language);
    }
    
    if (!formData.confirm_password.trim()) {
      newErrors.confirm_password = t('msg_password_confirm_require', language);
    } else if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = t('msg_password_confirm_equal', language);
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

  // Initialize form validation
  useEffect(() => {
    const initValidation = () => {
      if (typeof window !== 'undefined' && (window as any).jQuery && (window as any).jQuery.fn.validate) {
        (window as any).jQuery('#frmChangePassword').validate({
          onkeyup: false,
          rules: {
            password: {
              required: true,
              rangelength: [6, 16],
              validatePassUnicode: true,
              validatePassCheck: true
            },
            confirm_password: {
              required: true,
              equalTo: '#password'
            }
          },
          messages: {
            password: {
              required: t('msg_password_require', language),
              rangelength: t('msg_password_length', language),
              validatePassUnicode: t('msg_password_unicode', language),
              validatePassCheck: t('msg_password_unicode', language)
            },
            confirm_password: {
              required: t('msg_password_confirm_require', language),
              equalTo: t('msg_password_confirm_equal', language)
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
    <div className="section-page page-contact-pre">
      <header className="container-fluid">
        <h2 className="section-title">{t('_Change your login password_', language)}</h2>
      </header>
      
      <div className="container">
        <div className="s-wrapper">
          <form name="frmChangePassword" id="frmChangePassword" method="post" onSubmit={handleSubmit}>
            <div className="frmChangePass">
              <p className="text">{t('_Provide your new password_', language)}</p>
              
              {msg && (
                <p className="boxmsg-error">
                  {msg}
                </p>
              )}
              
              {!msg && (
                <>
                  <div className="row pd55">
                    <label className="width_202 align_right">
                      {t('_Your login email_', language)} <span className="red">*</span>
                    </label>
                    <div className="fl_left width_383">{strEmail}</div>
                  </div>
                  
                  <div className="row pd55">
                    <label className="width_202 align_right">
                      {t('_New password_', language)} <span className="red">*</span>
                    </label>
                    <div className="fl_left width_383">
                      <input 
                        name="password" 
                        type="password" 
                        id="password" 
                        autoComplete="off" 
                        className={`width_238 ${errors.password ? 'error' : ''}`}
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                      {errors.password && <span className="error-message">{errors.password}</span>}
                    </div>
                  </div>
                  
                  <div className="row pd55">
                    <label className="width_202 align_right">
                      {t('_Confirm new password_', language)} <span className="red">*</span>
                    </label>
                    <div className="fl_left width_383">
                      <input 
                        name="confirm_password" 
                        type="password" 
                        id="confirm_password" 
                        autoComplete="off" 
                        className={`width_238 ${errors.confirm_password ? 'error' : ''}`}
                        value={formData.confirm_password}
                        onChange={handleInputChange}
                      />
                      {errors.confirm_password && <span className="error-message">{errors.confirm_password}</span>}
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
