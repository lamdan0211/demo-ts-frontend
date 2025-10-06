'use client';

import React from 'react';

// Types
interface SocialNetwork {
  SO_NETWORK_OWNER_STATUS: number;
  SO_NETWORK_LINK: string;
}

interface FooterProps {
  arrListSoNetwork?: Record<number, SocialNetwork>;
  language?: 'vi' | 'en';
  onSocialRight?: string;
  showJoinBottom?: string;
  joinLink?: string;
}

// Translation function
function t(key: string, language: 'vi' | 'en' = 'vi'): string {
  const translations: Record<string, Record<string, string>> = {
    '_on_social_right_': {
      vi: '1',
      en: '1'
    },
    '_Join The Conversation_': {
      vi: 'THAM GIA TRÒ CHUYỆN',
      en: 'JOIN THE CONVERSATION'
    },
    '_By Employer_': {
      vi: 'Được tạo bởi Nhà tuyển dụng',
      en: 'Created by Employer'
    },
    '_show_join_bottom_': {
      vi: '1',
      en: '1'
    },
    '_Title Join_': {
      vi: 'Tham gia mạng lưới tài năng',
      en: 'Join Talent Network'
    }
  };
  
  return translations[key]?.[language] || key;
}

export default function Footer({ 
  arrListSoNetwork = {},
  language = 'vi',
  onSocialRight = '1',
  showJoinBottom = '1',
  joinLink = '/hoasen/join'
}: FooterProps) {
  
  const showSocialRight = onSocialRight !== '_on_social_right_' && onSocialRight === '1';
  const shouldShowJoinBottom = showJoinBottom && showJoinBottom !== '_show_join_bottom_';

  return (
    <>
      {/* Social Vertical Bar */}
      {showSocialRight && (
        <div className="social-vertical">
          <div className="icon-wrapper">
            <a target="_blank" href="tel:0283 9975 569" className="btn-greyscale call">
              <img src="themes/hoasen/images/call.png" alt="Call" />
            </a>
          </div>
          
          {arrListSoNetwork[6]?.SO_NETWORK_OWNER_STATUS === 1 && (
            <div className="icon-wrapper">
              <a target="_blank" href={arrListSoNetwork[6].SO_NETWORK_LINK} className="btn-greyscale facebook">
                <img src="themes/hoasen/images/fb.png" alt="Facebook" />
              </a>
            </div>
          )}
          
          {arrListSoNetwork[10]?.SO_NETWORK_OWNER_STATUS === 1 && (
            <div className="icon-wrapper">
              <a target="_blank" href={arrListSoNetwork[10].SO_NETWORK_LINK} className="btn-greyscale twitter">
                <i className="fa fa-twitter"></i>
              </a>
            </div>
          )}
          
          {arrListSoNetwork[3]?.SO_NETWORK_OWNER_STATUS === 1 && (
            <div className="icon-wrapper">
              <a target="_blank" href={arrListSoNetwork[3].SO_NETWORK_LINK} className="btn-greyscale linkedin">
                <i className="fa fa-linkedin"></i>
              </a>
            </div>
          )}
          
          {arrListSoNetwork[7]?.SO_NETWORK_OWNER_STATUS === 1 && (
            <div className="icon-wrapper">
              <a target="_blank" href={arrListSoNetwork[7].SO_NETWORK_LINK} className="btn-greyscale youtube">
                <i className="fa fa-youtube"></i>
              </a>
            </div>
          )}
          
          {arrListSoNetwork[12]?.SO_NETWORK_OWNER_STATUS === 1 && (
            <div className="icon-wrapper">
              <a target="_blank" href={arrListSoNetwork[12].SO_NETWORK_LINK} className="btn-greyscale instagram">
                <i className="fa fa-instagram"></i>
              </a>
            </div>
          )}
          
          <div className="icon-wrapper">
            <a target="_blank" href="https://zalo.me/332116161" className="btn-greyscale zalo">
              <img src="themes/hoasen/images/zalo.png" alt="Zalo" />
            </a>
          </div>
        </div>
      )}

      {/* Main Footer */}
      <div id="footer" className="section-page">
        <div className="container">
          <div className="col-xs-12 col-sm-12 col-md-4">
            <div className="column internal-link">
              <h6>VỀ TẬP ĐOÀN</h6>
              <a href="https://hoasengroup.vn/">Tập đoàn Hoa Sen</a>
              <a href="https://hoasenhome.vn/">Hoa Sen Home</a>
              <a href="https://vietnamsteel.com/">Xuất khẩu Hoa Sen</a>
              <a href="https://www.nhuahoasen.vn/">Nhựa Hoa Sen</a>
            </div>
          </div>
          
          <div className="col-xs-12 col-sm-12 col-md-4">
            <div className="column internal-link">
              <h6>HỖ TRỢ</h6>
              <a href="https://hoasenjobs.com/dieu-khoan-su-dung-35A529CD/vi">Điều khoản sử dụng</a>
              <a href="https://hoasenjobs.com/chinh-sach-bao-mat-35A529CE/vi">Chính sách bảo mật</a>
              <a href="https://hoasenjobs.com/cau-hoi-thuong-gap-35A529CF/vi">Câu hỏi thường gặp</a>
            </div>
          </div>
          
          <div className="col-xs-12 col-sm-12 col-md-4">
            <div className="column social_col">
              <h6>{t('_Join The Conversation_', language)}</h6>
              <a href="tel:0283 9975 569"><i className="fa fa-phone"></i></a>
              
              {arrListSoNetwork[6]?.SO_NETWORK_OWNER_STATUS === 1 && (
                <a target="_blank" href={arrListSoNetwork[6].SO_NETWORK_LINK} aria-label="facebook" className="facebook31">
                  <i className="fa fa-facebook" aria-hidden="true"></i>
                </a>
              )}
              
              {arrListSoNetwork[3]?.SO_NETWORK_OWNER_STATUS === 1 && (
                <a target="_blank" href={arrListSoNetwork[3].SO_NETWORK_LINK} aria-label="linkedin" className="linkedin31">
                  <i className="fa fa-linkedin" aria-hidden="true"></i>
                </a>
              )}
              
              {arrListSoNetwork[10]?.SO_NETWORK_OWNER_STATUS === 1 && (
                <a target="_blank" href={arrListSoNetwork[10].SO_NETWORK_LINK} aria-label="twitter" className="twitter31">
                  <i className="fa fa-twitter" aria-hidden="true"></i>
                </a>
              )}
              
              {arrListSoNetwork[7]?.SO_NETWORK_OWNER_STATUS === 1 && (
                <a target="_blank" href={arrListSoNetwork[7].SO_NETWORK_LINK} aria-label="youtube" className="youtube31">
                  <i className="fa fa-youtube" aria-hidden="true"></i>
                </a>
              )}
              
              {arrListSoNetwork[12]?.SO_NETWORK_OWNER_STATUS === 1 && (
                <a target="_blank" href={arrListSoNetwork[12].SO_NETWORK_LINK} aria-label="instagram" className="instagram31">
                  <i className="fa fa-instagram" aria-hidden="true"></i>
                </a>
              )}
              
              <a target="_blank" href="https://zalo.me/332116161" aria-label="zalo" className="zalo31">
                <img src="images/zalo-ft.png" alt="Zalo" />
              </a>
            </div>
          </div>
          
          <div className="col-xs-12 info-hoasen">
            <div className="col-xs-12 text--info">
              <p className="head-title">THÔNG TIN LIÊN HỆ</p>
              <p className="text__">TRỤ SỞ CHÍNH</p>
              <p><i className="fa fa-map-marker"></i> <strong>Địa chỉ:</strong> Số 9 Đại lộ Thống Nhất, KCN Sóng Thần 2, Phường Dĩ An, TP. HCM</p>
              <p className="text__">VĂN PHÒNG ĐẠI DIỆN</p>
              <p><i className="fa fa-map-marker"></i> <strong>Địa chỉ:</strong> 183 Nguyễn Văn Trỗi, Phường Phú Nhuận, TP.HCM</p>
              <p>
                <span><i className="fa fa-phone"></i> <strong>SĐT:</strong> 0283 9975 569</span>
                <span><i className="fa fa-phone"></i> <strong>Hotline:</strong> 0332 116 161</span>
                <span className="dsk"><i className="fa fa-envelope-o"></i> <strong>Email:</strong> tuyendung@hoasengroup.vn</span>
              </p>
              <p><span className="mbl"><i className="fa fa-envelope-o"></i> <strong>Email:</strong> tuyendung@hoasengroup.vn</span></p>
            </div>
          </div>
          
          <div className="col-xs-12 creatby">{t('_By Employer_', language)}</div>
        </div>
      </div>

      {/* Join Talent Network Bottom */}
      {shouldShowJoinBottom && (
        <div className="join-talent-onclip setpos">
          <a href={joinLink} className="showDialogD">{t('_Title Join_', language)}</a>
        </div>
      )}
    </>
  );
}
