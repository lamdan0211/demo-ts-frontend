'use client';

import React, { useEffect, useState } from 'react';

interface ContactProps {
  siteId?: string;
  language?: string;
  msg?: string;
  msgType?: string;
  detailOwner?: {
    EMP_DESC?: string;
    EMP_ADDRESS?: string;
    EMP_TEL?: string;
    EMP_FAX?: string;
    EMP_EMAIL?: string;
  };
  strCaptcha?: string;
}

// Translation function
function t(key: string, language: string = 'en'): string {
  const translations: Record<string, Record<string, string>> = {
    '_Contact Us_': {
      vi: 'Liên hệ chúng tôi',
      en: 'Contact Us'
    },
    '_Andress_': {
      vi: 'Địa chỉ',
      en: 'Address'
    },
    '_Tel_': {
      vi: 'Điện thoại',
      en: 'Phone'
    },
    '_Fax_': {
      vi: 'Fax',
      en: 'Fax'
    },
    '_Email_': {
      vi: 'Email',
      en: 'Email'
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
    '_Your Message, Question, Comment, or Testimonial_': {
      vi: 'Tin nhắn, câu hỏi, bình luận hoặc lời chứng thực của bạn',
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
    }
  };
  
  return translations[key]?.[language] || key;
}

export default function Contact({
  siteId = 'demoa2',
  language = 'en',
  msg = '',
  msgType = 'success',
  detailOwner = {
    EMP_DESC: 'We are here to help you with any questions or concerns you may have.',
    EMP_ADDRESS: '123 Main Street, City, State 12345',
    EMP_TEL: '+1 (555) 123-4567',
    EMP_FAX: '+1 (555) 123-4568',
    EMP_EMAIL: 'contact@demoa2.com'
  },
  strCaptcha = 'ABC123'
}: ContactProps) {
  const [formData, setFormData] = useState({
    sender: '',
    from: '',
    content: '',
    security_code: ''
  });
  const [captcha, setCaptcha] = useState(strCaptcha);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Generate new captcha
  const refreshCaptcha = () => {
    const newCaptcha = Math.random().toString(36).substring(2, 8).toUpperCase();
    setCaptcha(newCaptcha);
  };

  // Handle form input changes
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

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors: Record<string, string> = {};
    
    if (!formData.sender.trim()) {
      newErrors.sender = 'Name is required';
    }
    
    if (!formData.from.trim()) {
      newErrors.from = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.from)) {
      newErrors.from = 'Please enter a valid email address';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Message is required';
    }
    
    if (!formData.security_code.trim()) {
      newErrors.security_code = 'Security code is required';
    } else if (formData.security_code.toUpperCase() !== captcha) {
      newErrors.security_code = 'Security code does not match';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Form is valid, submit it
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    
    // Reset form
    setFormData({
      sender: '',
      from: '',
      content: '',
      security_code: ''
    });
    refreshCaptcha();
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      sender: '',
      from: '',
      content: '',
      security_code: ''
    });
    setErrors({});
    refreshCaptcha();
  };

  // Initialize jQuery validation when component mounts
  useEffect(() => {
    const initValidation = () => {
      if (typeof window !== 'undefined' && (window as any).$ && (window as any).$.fn.validate) {
        const $ = (window as any).$;
        
        $("#frmContact").validate({
          onkeyup: false,
          rules: {
            security_code: { required: true },
            from: { email: true }
          },
          messages: {
            from: { email: 'Please enter a valid email address' }
          },
          errorPlacement: function(error: any, element: any) {
            if (element.attr("name") === "security_code") {
              error.insertAfter('#security_div');
            } else {
              error.insertAfter(element);
            }
          }
        });
      }
    };

    // Check if jQuery and validation plugin are loaded
    const checkValidation = () => {
      if (typeof window !== 'undefined' && (window as any).$ && (window as any).$.fn.validate) {
        initValidation();
        return true;
      }
      return false;
    };

    // Try immediately first
    if (!checkValidation()) {
      // If not ready, check every 200ms for up to 10 seconds
      let attempts = 0;
      const maxAttempts = 50; // 10 seconds
      
      const interval = setInterval(() => {
        attempts++;
        if (checkValidation() || attempts >= maxAttempts) {
          clearInterval(interval);
        }
      }, 200);
    }
  }, []);

  return (
    <div id="main-content">
      <div className="frmContact">
        {msg && (
          <p className={`boxmsg-${msgType}`}>{msg}</p>
        )}
        
        <div className="pageinfo2">
          <h1 className="col_theme">{t('_Contact Us_', language)}</h1>
        </div>
        
        <div className="LeftContact">
          <div className="content_fck">
            <p className="text">{detailOwner?.EMP_DESC}</p>
            <p className="text">
              <strong>{t('_Andress_', language)}:</strong> {detailOwner?.EMP_ADDRESS}<br />
              <strong>{t('_Tel_', language)}:</strong> {detailOwner?.EMP_TEL}<br />
              <strong>{t('_Fax_', language)}:</strong> {detailOwner?.EMP_FAX}<br />
              <strong>{t('_Email_', language)}:</strong> {detailOwner?.EMP_EMAIL}
            </p>
          </div>
          
          {detailOwner?.EMP_ADDRESS && (
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
                suppressHydrationWarning={true}
              />
            </div>
          )}
        </div>
        
        <form name="frmContact" id="frmContact" method="post" onSubmit={handleSubmit}>
          <div className="RightContact">
            <p className="text">{t('_User the form below to send..._', language)}</p>
            
            <div className="row">
              <label>{t('_Your Name_', language)} <span className="red">*</span></label>
              <div className="fl_left">
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
              <div className="fl_left">
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
              <label>{t('_Your Message, Question, Comment, or Testimonial_', language)} <span className="red">*</span></label>
              <div className="fl_left">
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
                  <span id="tn_captcha">{captcha}</span>
                </span>
                <a 
                  style={{ float: 'left', padding: '0px 0px 0px 10px' }} 
                  href="#" 
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
              <input type="submit" value={t('_Submit_', language)} className="ui_btnCb" />
              <a href="#" className="btnTextLink" onClick={(e) => { e.preventDefault(); resetForm(); }}>
                {t('_Cancel_', language)}
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
