'use client';

import React, { useState, useEffect } from 'react';

// Types
interface ChangePasswordV1Props {
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
      vi: 'Mật khẩu phải có từ 8-20 ký tự',
      en: 'Password must be 8-20 characters'
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

export default function ChangePasswordV1({
  msg,
  strEmail = '',
  language = 'vi',
  csrf_token = ''
}: ChangePasswordV1Props) {
  
  const [formData, setFormData] = useState({
    password: '',
    confirm_password: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    } else if (formData.password.length < 8 || formData.password.length > 20) {
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

  const togglePasswordVisibility = (field: 'password' | 'confirm_password') => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
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
              rangelength: [8, 20],
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
    <div className="form-area">
      <div className="form-login">
        <div className="text-guide">
          <h3 className="mb-5">
            {t('_Change your login password_', language)}
          </h3>
          <p>
            {t('_Provide your new password_', language)}
          </p>
        </div>
        
        {msg && (
          <p className="boxmsg-error">
            {msg}
          </p>
        )}
        
        {!msg && (
          <form name="frmChangePassword" id="frmChangePassword" method="post" onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="label">
                <label>
                  {t('_Your login email_', language)} <span>*</span>
                </label>
              </div>
              <div className="input-area">
                <input 
                  type="text" 
                  name="" 
                  className="form-control" 
                  placeholder={strEmail} 
                  disabled
                />
              </div>
            </div>
            
            <div className="form-group">
              <div className="label">
                <label>
                  {t('_New password_', language)} <span>*</span>
                </label>
              </div>
              <div className="input-area">
                <div className="box-password">
                  <input 
                    name="password" 
                    type={showPassword ? 'text' : 'password'} 
                    id="password" 
                    autoComplete="off" 
                    className={`form-control ${errors.password ? 'error' : ''}`}
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <div 
                    className={`showhide-password eyess ${showPassword ? 'show' : ''}`}
                    onClick={() => togglePasswordVisibility('password')}
                  />
                </div>
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>
            </div>
            
            <div className="form-group">
              <div className="label">
                <label>
                  {t('_Confirm new password_', language)} <span>*</span>
                </label>
              </div>
              <div className="input-area">
                <div className="box-password">
                  <input 
                    name="confirm_password" 
                    type={showConfirmPassword ? 'text' : 'password'} 
                    id="confirm_password" 
                    autoComplete="off" 
                    className={`form-control ${errors.confirm_password ? 'error' : ''}`}
                    value={formData.confirm_password}
                    onChange={handleInputChange}
                  />
                  <div 
                    className={`showhide-password eyess ${showConfirmPassword ? 'show' : ''}`}
                    onClick={() => togglePasswordVisibility('confirm_password')}
                  />
                </div>
                {errors.confirm_password && <span className="error-message">{errors.confirm_password}</span>}
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
