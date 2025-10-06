'use client';

import React, { useState, useEffect } from 'react';

// Types
interface OwnerDetail {
  EMP_DESC?: string;
  EMP_ADDRESS?: string;
  LOCATION_ID?: number;
  COUNTRY_ID?: number;
  EMP_TEL?: string;
  EMP_FAX?: string;
  EMP_EMAIL?: string;
}

interface ContactIndexP11Props {
  msg?: string;
  msgType?: 'success' | 'error' | 'warning' | 'info';
  detailOwner?: OwnerDetail;
  strCaptcha?: string;
  language?: 'vi' | 'en';
  csrf_token?: string;
  offInfoContact?: string;
  offLocationContact?: string;
}

// Translation function
function t(key: string, language: 'vi' | 'en' = 'vi'): string {
  const translations: Record<string, Record<string, string>> = {
    '_Contact Us_': {
      vi: 'Liên hệ với chúng tôi',
      en: 'Contact Us'
    },
    '_User the form below to send..._': {
      vi: 'Sử dụng form bên dưới để gửi...',
      en: 'Use the form below to send...'
    },
    '_Your Name_': {
      vi: 'Tên của bạn',
      en: 'Your Name'
    },
    '_Your Email_': {
      vi: 'Email của bạn',
      en: 'Your Email'
    },
    '_Your Phone_': {
      vi: 'Số điện thoại của bạn',
      en: 'Your Phone'
    },
    '_Your Message, Question, Comment, or Testimonial_': {
      vi: 'Tin nhắn, câu hỏi, bình luận hoặc đánh giá của bạn',
      en: 'Your Message, Question, Comment, or Testimonial'
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
    '_Cancel_': {
      vi: 'Hủy',
      en: 'Cancel'
    },
    'msg_email_rule': {
      vi: 'Email không hợp lệ',
      en: 'Invalid email format'
    }
  };
  
  return translations[key]?.[language] || key;
}

// Helper function to get location name
function getLocationName(locationId: number): string {
  const locations: Record<number, string> = {
    1: 'Hồ Chí Minh',
    2: 'Hà Nội',
    3: 'Đà Nẵng'
  };
  return locations[locationId] || '';
}

// Helper function to get country name
function getCountryName(countryId: number): string {
  const countries: Record<number, string> = {
    1: 'Việt Nam',
    2: 'Thái Lan',
    3: 'Singapore'
  };
  return countries[countryId] || '';
}

// Helper function to get message type class
function getMessageTypeClass(msgType: string): string {
  const typeClasses: Record<string, string> = {
    success: 'boxmsg-success',
    error: 'boxmsg-error',
    warning: 'boxmsg-warning',
    info: 'boxmsg-info'
  };
  return typeClasses[msgType] || 'boxmsg-info';
}

export default function ContactIndexP11({
  msg,
  msgType = 'info',
  detailOwner = {},
  strCaptcha = 'test',
  language = 'vi',
  csrf_token = '',
  offInfoContact = '0',
  offLocationContact = '0'
}: ContactIndexP11Props) {
  
  const [formData, setFormData] = useState({
    sender: '',
    from: '',
    phone: '',
    content: '',
    security_code: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    
    if (!formData.sender.trim()) {
      newErrors.sender = 'Tên là bắt buộc';
    }
    
    if (!formData.from.trim()) {
      newErrors.from = 'Email là bắt buộc';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.from)) {
      newErrors.from = t('msg_email_rule', language);
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Nội dung là bắt buộc';
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

  const handleReset = () => {
    setFormData({
      sender: '',
      from: '',
      phone: '',
      content: '',
      security_code: ''
    });
    setErrors({});
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
        (window as any).jQuery('#frmContact').validate({
          onkeyup: false,
          rules: {
            security_code: { required: true },
            from: { email: true }
          },
          messages: {
            from: { email: t('msg_email_rule', language) }
          },
          errorPlacement: function(error: any, element: any) {
            if (element.attr('name') === 'security_code') {
              error.insertAfter('#security_div');
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
    <div className="section-page page-contact-pre">
      <header className="container-fluid">
        <h2 className="section-title">{t('_Contact Us_', language)}</h2>
      </header>
      
      <div className="container">
        {msg && (
          <p className={`boxmsg-${getMessageTypeClass(msgType)}`}>{msg}</p>
        )}
        
        <div className="s-wrapper">
          <div className="LeftContact">
            <div className="content_fck">
              <p className="text">{detailOwner.EMP_DESC}</p>
              
              {offInfoContact !== '1' && (
                <p className="text">
                  {detailOwner.EMP_ADDRESS && (
                    <>
                      <i className="fa fa-map-marker"></i> {detailOwner.EMP_ADDRESS}<br />
                    </>
                  )}
                  
                  {offLocationContact !== '1' && detailOwner.LOCATION_ID && (
                    <>
                      <i className="fa fa-map-marker"></i> {getLocationName(detailOwner.LOCATION_ID)}, {getCountryName(detailOwner.COUNTRY_ID || 0)}<br />
                    </>
                  )}
                  
                  {detailOwner.EMP_TEL && (
                    <>
                      <i className="fa fa-phone-square"></i> <a href={`tel:${detailOwner.EMP_TEL}`}>{detailOwner.EMP_TEL}</a><br />
                    </>
                  )}
                  
                  {detailOwner.EMP_FAX && (
                    <>
                      <i className="fa fa-fax"></i> {detailOwner.EMP_FAX}<br />
                    </>
                  )}
                  
                  {detailOwner.EMP_EMAIL && (
                    <>
                      <i className="fa fa-envelope"></i> <a href={`mailto:${detailOwner.EMP_EMAIL}`}>{detailOwner.EMP_EMAIL}</a>
                    </>
                  )}
                </p>
              )}
            </div>
            
            {detailOwner.EMP_ADDRESS && (
              <div className="mapcontact">
                <iframe 
                  width="433" 
                  height="401" 
                  frameBorder="0" 
                  scrolling="no" 
                  marginHeight={0} 
                  marginWidth={0} 
                  src={`https://maps.google.com/maps?f=q&q=${encodeURIComponent(detailOwner.EMP_ADDRESS)}&output=embed`}
                  title="Company Location"
                />
              </div>
            )}
          </div>
          
          <div className="RightContact">
            <form 
              name="frmContact" 
              id="frmContact" 
              method="post" 
              className="frmContact"
              onSubmit={handleSubmit}
            >
              <p className="text">{t('_User the form below to send..._', language)}</p>
              
              <div className="row">
                <label>{t('_Your Name_', language)} <span className="red">*</span></label>
                <div className="fl_left value">
                  <input 
                    type="text" 
                    className={`width_238 required ${errors.sender ? 'error' : ''}`}
                    name="sender"
                    value={formData.sender}
                    onChange={handleInputChange}
                  />
                  {errors.sender && <span className="error-message">{errors.sender}</span>}
                </div>
              </div>
              
              <div className="row">
                <label>{t('_Your Email_', language)} <span className="red">*</span></label>
                <div className="fl_left value">
                  <input 
                    type="email" 
                    className={`width_238 required ${errors.from ? 'error' : ''}`}
                    name="from"
                    value={formData.from}
                    onChange={handleInputChange}
                  />
                  {errors.from && <span className="error-message">{errors.from}</span>}
                </div>
              </div>
              
              <div className="row">
                <label>{t('_Your Phone_', language)}</label>
                <div className="fl_left value">
                  <input 
                    type="text" 
                    className="width_238"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="row">
                <label>{t('_Your Message, Question, Comment, or Testimonial_', language)} <span className="red">*</span></label>
                <div className="fl_left value">
                  <textarea 
                    name="content" 
                    className={`required ${errors.content ? 'error' : ''}`}
                    value={formData.content}
                    onChange={handleInputChange}
                    rows={5}
                  />
                  {errors.content && <span className="error-message">{errors.content}</span>}
                </div>
              </div>
              
              <div className="row">
                <label className="width_202">{t('field_security_code', language)} <span className="red">*</span></label>
                <div className="fl_left" id="security_div">
                  <input 
                    name="security_code" 
                    type="text" 
                    className={`required width_125 ${errors.security_code ? 'error' : ''}`}
                    id="security_code" 
                    maxLength={10} 
                    autoComplete="off"
                    value={formData.security_code}
                    onChange={handleInputChange}
                  />
                  <span id="captchaim" className="fl_left mar_left10">
                    <span id="tn_captcha">{strCaptcha}</span>
                  </span>
                  <a 
                    style={{ float: 'left', padding: '0px 0px 0px 10px' }} 
                    href="javascript:void(0);" 
                    className="line_bot" 
                    id="trynewcode" 
                    onClick={refreshCaptcha}
                  >
                    {t('try_new_code', language)}
                  </a>
                  {errors.security_code && <span className="error-message">{errors.security_code}</span>}
                </div>
              </div>
              
              <div className="row">
                <input 
                  type="submit" 
                  value={t('_Submit_', language)} 
                  className="ui_btnCb"
                />
                <a 
                  href="javascript:void(0)" 
                  className="btnTextLink" 
                  onClick={handleReset}
                >
                  {t('_Cancel_', language)}
                </a>
              </div>
              
              <input type="hidden" name="csrf_token" value={csrf_token} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
