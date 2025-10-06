'use client';

import React, { useEffect } from 'react';

// Types
interface FunctionSettings {
  AUTO_LOGIN_FACEBOOK?: boolean;
  AUTO_LOGIN_GOOGLE?: boolean;
  AUTO_LOGIN_LINKEDIN?: boolean;
  SHOW_JOIN_TS?: number;
  SHOW_JOIN_COLLEGE?: number;
  OFF_JOIN_TALENT_NETWORK?: boolean;
}

interface LoginOldProps {
  language?: 'vi' | 'en';
  LANGUAGE?: string;
  HOME?: string;
  TN?: string;
  LOGIN_FAIL?: number;
  alwaysShowCaptcha?: number;
  login_fail?: number;
  strCaptcha?: string;
  csrf_token?: string;
  arrFunction?: FunctionSettings;
  msg?: string;
  redirect_to_forgot_password?: string;
}

// Translation function
function t(key: string, language: 'vi' | 'en' = 'vi'): string {
  const translations: Record<string, Record<string, string>> = {
    '_Why Join Our Talent Network_': {
      vi: 'Tại sao tham gia Mạng lưới nhân tài của chúng tôi',
      en: 'Why Join Our Talent Network'
    },
    '_Joining our Talent Network will enhance..._': {
      vi: 'Tham gia Mạng lưới nhân tài của chúng tôi sẽ nâng cao...',
      en: 'Joining our Talent Network will enhance...'
    },
    'act_login': {
      vi: 'Đăng nhập',
      en: 'Login'
    },
    'field_email': {
      vi: 'Email',
      en: 'Email'
    },
    'field_password': {
      vi: 'Mật khẩu',
      en: 'Password'
    },
    'field_security_code': {
      vi: 'Mã bảo mật',
      en: 'Security Code'
    },
    'try_new_code': {
      vi: 'Thử mã mới',
      en: 'Try New Code'
    },
    '_Forgot Password_': {
      vi: 'Quên mật khẩu',
      en: 'Forgot Password'
    },
    '_Our sign in with_': {
      vi: 'Đăng nhập bằng',
      en: 'Our sign in with'
    },
    "_Don't have a member of our Talent Network yet ?_": {
      vi: 'Chưa có thành viên trong Mạng lưới nhân tài của chúng tôi?',
      en: "Don't have a member of our Talent Network yet?"
    },
    '_Join Our Talent Network_': {
      vi: 'Tham gia Mạng lưới nhân tài của chúng tôi',
      en: 'Join Our Talent Network'
    }
  };
  
  return translations[key]?.[language] || key;
}

// Helper function to get link
function getLink(linkType: string): string {
  // This would typically come from a routing system
  const links: Record<string, string> = {
    'forgot_password': '/hoasen/forgot-password',
    'join': '/hoasen/join',
    'joincollege': '/hoasen/join-college'
  };
  return links[linkType] || '#';
}

export default function LoginOld({
  language = 'vi',
  LANGUAGE = 'vi',
  HOME = '/hoasen',
  TN = '/hoasen',
  LOGIN_FAIL = 3,
  alwaysShowCaptcha = 0,
  login_fail = 0,
  strCaptcha = '',
  csrf_token = '',
  arrFunction = {},
  msg = '',
  redirect_to_forgot_password = '0'
}: LoginOldProps) {

  useEffect(() => {
    // Initialize jQuery validation and other functionality
    const initLoginForm = () => {
      if (typeof window !== 'undefined' && (window as any).jQuery) {
        const $ = (window as any).jQuery;
        
        // Check for redirect to forgot password
        if (redirect_to_forgot_password === '1') {
          alert((window as any).language?.msg_pls_change_password || 'Please change your password');
          window.location.href = `${TN}/forgot-password/${LANGUAGE}`;
        }
        
        // Initialize form validation
        $("#frmLogin").validate({
          onkeyup: false,
          rules: {
            password: { required: true },
            email: { required: true, email: true }
          },
          messages: {
            password: { required: (window as any).language?.msg_password_require || 'Password is required' },
            email: { 
              required: (window as any).language?.msg_email_require || 'Email is required',
              email: (window as any).language?.msg_email_rule || 'Please enter a valid email'
            }
          }
        });
      } else {
        setTimeout(initLoginForm, 100);
      }
    };

    initLoginForm();
  }, [HOME, LANGUAGE, TN, redirect_to_forgot_password]);

  // Popup API function
  const popupapi = (network: string, url: string) => {
    if (typeof window !== 'undefined') {
      const height = 550;
      const width = 650;
      const left = (window.innerWidth / 2) - (width / 2);
      const top = (window.innerHeight / 2) - (height / 2);
      
      const path = `${HOME}/service/getrequestsocial?network=${network}&method=opener&redirect_url=${url}`;
      window.open(path, network, `height=${height},width=${width},top=${top},left=${left},resizable=0,scrollbars=yes,status=yes`);
    }
  };

  // Determine CSS classes for social login buttons
  const getSocialButtonClass = (index: number) => {
    const classes = ['st1', 'st2', 'st3'];
    return classes[index] || 'st1';
  };

  const showCaptcha = alwaysShowCaptcha === 1 || login_fail > LOGIN_FAIL;
  const param = arrFunction.SHOW_JOIN_TS === 0 && arrFunction.SHOW_JOIN_COLLEGE === 1 ? '?type=uni' : '';

  return (
    <>
      <style jsx>{`
        #main-content { overflow: hidden }
      `}</style>
      
      <div id="main-content">
        <div className="JoinNow">
          <div className="leftCol">
            <h1 className="col_theme">{t('_Why Join Our Talent Network_', language)}</h1>
            <div className="content_fck">
              {t('_Joining our Talent Network will enhance..._', language)}
            </div>
            <div className="otherlink">
              {/* Privacy Policy and Terms links can be added here */}
            </div>
          </div>
          
          <div className="rightCol Frm_Login">
            <h2 className="col_theme">{t('act_login', language)}</h2>
            {msg && <p className="boxmsg-error">{msg}</p>}
            
            <form name="frmLogin" id="frmLogin" method="post" className="fontCore">
              <div className="row">
                <label>{t('field_email', language)} <span className="red">*</span></label>
                <div className="fl_left width_290">
                  <input name="email" type="text" className="width_212" />
                </div>
              </div>
              
              <div className="row">
                <label>{t('field_password', language)} <span className="red">*</span></label>
                <div className="fl_left width_290">
                  <input name="password" type="password" autoComplete="off" className="width_212" />
                </div>
              </div>
              
              <div id="area_captcha" style={{ display: showCaptcha ? 'block' : 'none' }}>
                <div className="row">
                  <label>{t('field_security_code', language)} <span className="red">*</span></label>
                  <div className="fl_left width_290">
                    <input 
                      type="text" 
                      className="required width_212" 
                      name="security_code" 
                      id="security_code" 
                      maxLength={10} 
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div className="row">
                  <label>&nbsp;</label>
                  <div className="fl_left width_290">
                    <span className="fl_left" id="captchaim">
                      <span id="tn_captcha">{strCaptcha}</span>
                    </span>
                    <a 
                      id="trynewcode" 
                      className="line_bot" 
                      onClick={() => {
                        if (typeof (window as any).refreshCaptcha === 'function') {
                          (window as any).refreshCaptcha();
                        }
                      }}
                      href="javascript:void(0);"
                      style={{ float: 'left', padding: '0px 0px 0px 10px' }}
                    >
                      {t('try_new_code', language)}
                    </a>
                    <span id="security_code_error"></span>
                  </div>
                </div>
              </div>
              
              <div className="forgetpass">
                <a href={getLink('forgot_password')} className="line_bot">
                  {t('_Forgot Password_', language)} ?
                </a>
              </div>
              
              <div className="loginBtn">
                <input type="submit" className="ui_btnCb" value={t('act_login', language)} />
              </div>
              
              <input type="hidden" name="csrf_token" value={csrf_token} />
            </form>
            
            {(arrFunction.AUTO_LOGIN_FACEBOOK || arrFunction.AUTO_LOGIN_GOOGLE || arrFunction.AUTO_LOGIN_LINKEDIN) && (
              <div className="signin_social">
                <span>{t('_Our sign in with_', language)}</span>
                <ul>
                  {arrFunction.AUTO_LOGIN_FACEBOOK && (
                    <li className={getSocialButtonClass(0)}>
                      <a 
                        href="javascript:void(0);" 
                        onClick={() => popupapi('facebook', btoa(`${HOME}/index/loginfacebook${param}`))}
                        className="facebook"
                      >
                        Facebook
                      </a>
                    </li>
                  )}
                  {arrFunction.AUTO_LOGIN_GOOGLE && (
                    <li className={getSocialButtonClass(1)}>
                      <a 
                        href="javascript:void(0);" 
                        onClick={() => popupapi('google', btoa(`${HOME}/index/logingoogle${param}`))}
                        className="google"
                      >
                        Google
                      </a>
                    </li>
                  )}
                  {arrFunction.AUTO_LOGIN_LINKEDIN && (
                    <li className={getSocialButtonClass(2)}>
                      <a 
                        href="javascript:void(0);" 
                        onClick={() => popupapi('linkedin', btoa(`${HOME}/index/loginlinkedin${param}`))}
                        className="linkedin"
                      >
                        Linkedin
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            )}
            
            {!arrFunction.OFF_JOIN_TALENT_NETWORK && (
              <div className="loginJoinTalentNetwork">
                <p className="col_theme">{t("_Don't have a member of our Talent Network yet ?_", language)}</p>
                {arrFunction.SHOW_JOIN_TS === 0 && arrFunction.SHOW_JOIN_COLLEGE === 1 ? (
                  <a href={getLink('joincollege')} className={LANGUAGE}>
                    {t('_Join Our Talent Network_', language)}
                  </a>
                ) : (
                  <a 
                    title="Join Our Talent Network" 
                    href={getLink('join')} 
                    className={LANGUAGE}
                  >
                    {t('_Join Our Talent Network_', language)}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            var redirect_to_forgot_password = '${redirect_to_forgot_password}';
            var LANGUAGE = '${LANGUAGE}';
            var TN = '${TN}';
            var HOME = '${HOME}';
          `
        }}
      />
    </>
  );
}
