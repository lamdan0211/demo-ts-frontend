'use client';

import { useState } from 'react';
import { ContactProps, OwnerDetail, MessageType } from '@/lib/types';
import Header from '../common/_header';
import Footer from '../common/_footer';

// Translation function (equivalent to PHP |t filter)
function t(key: string, language: 'vi' | 'en' = 'vi'): string {
  const translations: Record<string, Record<string, string>> = {
    '_Contact Us_': {
      vi: 'Liên hệ với chúng tôi',
      en: 'Contact Us'
    },
    '_Andress_': {
      vi: 'Địa chỉ',
      en: 'Address'
    },
    '_location_': {
      vi: 'Vị trí',
      en: 'Location'
    },
    '_Tel_': {
      vi: 'Điện thoại',
      en: 'Tel'
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
      vi: 'Tin nhắn, câu hỏi, bình luận hoặc đánh giá của bạn',
      en: 'Your Message, Question, Comment, or Testimonial'
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

// Helper function to get location name
function getLocationName(locationId: number): string {
  // This would typically come from a locations API or database
  const locations: Record<number, string> = {
    1: 'Hồ Chí Minh',
    2: 'Hà Nội',
    3: 'Đà Nẵng'
  };
  return locations[locationId] || '';
}

// Helper function to get country name
function getCountryName(countryId: number): string {
  // This would typically come from a countries API or database
  const countries: Record<number, string> = {
    1: 'Việt Nam',
    2: 'Thái Lan',
    3: 'Singapore'
  };
  return countries[countryId] || '';
}

// Helper function to get message type class
function getMessageTypeClass(msgType: MessageType): string {
  const typeClasses: Record<MessageType, string> = {
    success: 'boxmsg-success',
    error: 'boxmsg-error',
    warning: 'boxmsg-warning',
    info: 'boxmsg-info'
  };
  return typeClasses[msgType] || 'boxmsg-info';
}

export default function ContactPage({ 
  siteId, 
  msg, 
  msgType, 
  detailOwner, 
  strCaptcha, 
  language = 'vi',
  arrRwInfo,
  arrEmployer,
  arrMenuCates
}: ContactProps) {
  const [formData, setFormData] = useState({
    sender: '',
    from: '',
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
      newErrors.from = 'Email không hợp lệ';
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

  return (
    <>
      <Header 
        siteId={siteId}
        arrRwInfo={arrRwInfo}
        arrEmployer={arrEmployer}
        arrMenuCates={arrMenuCates}
        language={language}
      />
      <div id="main-content">
      {msg && (
        <p className={`boxmsg-${getMessageTypeClass(msgType)}`}>
          {msg}
        </p>
      )}
      
      <div className="pageinfo2">
        <h1 className="col_theme">
          {t('_Contact Us_', language)}
        </h1>
      </div>
      
      <div className="frmContact">
        <div className="LeftContact">
          <div className="content_fck">
            <p className="text">{detailOwner?.EMP_DESC}</p>
            <p className="text">
              <strong>{t('_Andress_', language)} :</strong> {detailOwner?.EMP_ADDRESS}<br />
              {detailOwner?.LOCATION_ID && (
                <>
                  <strong>{t('_location_', language)} :</strong> {getLocationName(detailOwner.LOCATION_ID)}, {getCountryName(detailOwner.COUNTRY_ID)}<br />
                </>
              )}
              <strong>{t('_Tel_', language)} :</strong> {detailOwner?.EMP_TEL}<br />
              <strong>{t('_Fax_', language)} :</strong> {detailOwner?.EMP_FAX}<br />
              <strong>{t('_Email_', language)} :</strong> {detailOwner?.EMP_EMAIL}
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
              />
            </div>
          )}
        </div>
        
        <form name="frmContact" id="frmContact" method="post" onSubmit={handleSubmit}>
          <div className="RightContact">
            <p className="text">
              {t('_User the form below to send..._', language)}
            </p>
            
            <div className="row">
              <label>
                {t('_Your Name_', language)} <span className="red">*</span>
              </label>
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
              <label>
                {t('_Your Email_', language)} <span className="red">*</span>
              </label>
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
              <label>
                {t('_Your Message, Question, Comment, or Testimonial_', language)} <span className="red">*</span>
              </label>
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
              <label className="width_202">
                Mã bảo mật <span className="red">*</span>
              </label>
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
                  Thử mã mới
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
          </div>
        </form>
        </div>
      </div>

      <Footer 
        siteId={siteId}
        arrRwInfo={arrRwInfo}
        arrEmployer={arrEmployer}
        language={language}
      />
    </>
  );
}
