'use client';

import { EmployerPageProps } from '@/lib/types';

export default function EmployerVi({ 
  siteId 
}: EmployerPageProps) {
  return (
    <>
      <div className="banner_employer">
        <div className="welcome_em">
          <h3>Chào mừng đến với HR Vietnam's Talent Solution</h3>
          <p>
            HR Vietnam hỗ trợ doanh nghiệp kết nối với những nhân tài cấp cao với kinh nghiệm và kiến thức sâu rộng, phù hợp với các vị trí doanh nghiệp cần tìm kiếm. 
            Đặt mình vào vị thế như chính bộ phận nhân sự của doanh nghiệp, HR Vietnam luôn luôn chuyên tâm trong quá trình tìm kiếm nhân tài cho khách hàng.
          </p>
        </div>
        <div className="contact_em">
          <p>Là một trong những công ty tư vấn nhân sư hàng đầu trên thị trường, HR Vietnam luôn cung cấp cho doanh nghiệp và ứng viên dịch vụ tư vấn chuyên nghiệp nhất.</p>
          <p><strong>Địa chỉ</strong> :Tòa nhà Pasteur, 139 Pasteur, Quận 3, HCMC, Việt Nam</p>
          <p><strong>SĐT</strong> :(08) 8 38220 6060</p>
          <p><strong>Fax</strong> :&nbsp;&nbsp; (08) 8 3824 1866</p>
          <p><strong>Email</strong> : info@hrvietnam.com</p>
        </div>
      </div>

      <div id="main-content"> 
        <div className="step_em">
          <h4>Kinh nghiệm</h4>
          <p>Làm việc cùng đội ngũ tư vấn nhân sự nhiều năm kinh nghiệm trong từng lĩnh vực chuyên biệt</p>
        </div>
        <div className="row_next"></div>
        <div className="step_em">
          <h4>Nhân tài</h4>
          <p>Kho dữ liệu nhân tài trong nước và toàn cầu trong nhiều lĩnh vực cùng với mạng lưới quan hệ rộng khắp của các tư vấn viên</p>
        </div>
        <div className="row_next"></div>
        <div style={{ marginRight: '-9px' }} className="step_em">
          <h4>Sàng lọc</h4>
          <p>Phong cách tuyển chọn và phỏng vấn chuyên nghiệp dựa theo các yêu cầu đặc biệt từ khách hàng</p>
        </div>
      </div>
    </>
  );
}
