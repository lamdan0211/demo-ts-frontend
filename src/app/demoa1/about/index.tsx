'use client';

import React from 'react';
import { useTranslations } from '@/lib/use-translations';

interface AboutPageProps {
  siteId?: string;
}

const AboutPage: React.FC<AboutPageProps> = ({ siteId = 'demoa1' }) => {
  const { t } = useTranslations();

  return (
    <div className="about-page">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="page-title">Giới thiệu về {siteId}</h1>
            
            <div className="about-content">
              <div className="about-section">
                <h2>Về chúng tôi</h2>
                <p>
                  Chúng tôi là một công ty hàng đầu trong lĩnh vực tuyển dụng và phát triển nhân tài. 
                  Với nhiều năm kinh nghiệm, chúng tôi cam kết mang đến những giải pháp nhân sự tốt nhất 
                  cho các doanh nghiệp và cơ hội việc làm chất lượng cao cho người lao động.
                </p>
              </div>

              <div className="about-section">
                <h2>Tầm nhìn</h2>
                <p>
                  Trở thành nền tảng tuyển dụng hàng đầu Việt Nam, kết nối hiệu quả giữa 
                  nhà tuyển dụng và ứng viên, góp phần phát triển nguồn nhân lực chất lượng cao.
                </p>
              </div>

              <div className="about-section">
                <h2>Sứ mệnh</h2>
                <p>
                  Cung cấp các giải pháp nhân sự toàn diện, từ tuyển dụng, đào tạo đến phát triển 
                  nghề nghiệp, giúp các doanh nghiệp tìm được nhân tài phù hợp và người lao động 
                  có cơ hội phát triển sự nghiệp.
                </p>
              </div>

              <div className="about-section">
                <h2>Giá trị cốt lõi</h2>
                <ul>
                  <li><strong>Chất lượng:</strong> Cam kết mang đến dịch vụ chất lượng cao nhất</li>
                  <li><strong>Chuyên nghiệp:</strong> Làm việc với tinh thần chuyên nghiệp và tận tâm</li>
                  <li><strong>Đổi mới:</strong> Không ngừng cải tiến và phát triển</li>
                  <li><strong>Tin cậy:</strong> Xây dựng mối quan hệ dựa trên sự tin cậy và minh bạch</li>
                </ul>
              </div>

              <div className="about-section">
                <h2>Dịch vụ của chúng tôi</h2>
                <div className="services-grid">
                  <div className="service-item">
                    <h3>Tuyển dụng</h3>
                    <p>Tìm kiếm và kết nối nhân tài phù hợp với nhu cầu của doanh nghiệp</p>
                  </div>
                  <div className="service-item">
                    <h3>Tư vấn nhân sự</h3>
                    <p>Cung cấp các giải pháp tư vấn toàn diện về quản lý nhân sự</p>
                  </div>
                  <div className="service-item">
                    <h3>Đào tạo</h3>
                    <p>Phát triển kỹ năng và năng lực cho đội ngũ nhân viên</p>
                  </div>
                  <div className="service-item">
                    <h3>Outsourcing</h3>
                    <p>Dịch vụ thuê ngoài nhân sự chuyên nghiệp</p>
                  </div>
                </div>
              </div>

              <div className="about-section">
                <h2>Liên hệ với chúng tôi</h2>
                <p>
                  Nếu bạn có bất kỳ câu hỏi nào hoặc muốn tìm hiểu thêm về dịch vụ của chúng tôi, 
                  vui lòng liên hệ với chúng tôi qua:
                </p>
                <div className="contact-info">
                  <p><strong>Email:</strong> info@{siteId}.com</p>
                  <p><strong>Điện thoại:</strong> (028) 1234-5678</p>
                  <p><strong>Địa chỉ:</strong> 123 Đường ABC, Quận 1, TP.HCM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
