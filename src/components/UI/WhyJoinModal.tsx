'use client';

import React from 'react';
import Modal from './Modal';

interface WhyJoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  language?: string;
}

const WhyJoinModal: React.FC<WhyJoinModalProps> = ({ isOpen, onClose, language = 'vi' }) => {
  const content = {
    vi: {
      title: 'Join Our Talent Network',
      description: 'Gia nhập Talent Network của chúng tôi sẽ giúp bạn nâng cao khả năng tìm kiếm việc làm. Cho dù bạn ứng tuyển một công việc nào đó hoặc đơn giản là cập nhật thông tin của mình, chúng tôi cũng luôn mong muốn được kết nối cùng bạn.',
      benefits: [
        'Nhận thông báo việc làm mới phù hợp với sự quan tâm của bạn',
        'Cập nhật các thông tin mới nhất về công ty',
        'Chia sẻ cơ hội việc làm với gia đình, bạn bè thông qua mạng xã hội hoặc email'
      ],
      callToAction: 'Hãy gia nhập Talent Network của chúng tôi ngay hôm nay!'
    },
    en: {
      title: 'Join Our Talent Network',
      description: 'Joining our Talent Network will help you enhance your job search capabilities. Whether you apply for a job or simply update your information, we always want to connect with you.',
      benefits: [
        'Receive new job notifications relevant to your interests',
        'Update with the latest company information',
        'Share job opportunities with family and friends via social media or email'
      ],
      callToAction: 'Join our Talent Network today!'
    }
  };

  const text = content[language as keyof typeof content] || content.vi;

  return (
    <Modal
      id="WhyJoin"
      title={text.title}
      isOpen={isOpen}
      onClose={onClose}
      className="whyJoinModal"
    >
      <div className="whyJoinContent">
        <div className="contentBox">
          <h4 className="sectionTitle">Talent Network là gì?</h4>
          <p className="introText">{text.description}</p>
          
          <h4 className="sectionTitle">Vì sao bạn nên gia nhập Talent Network?</h4>
          <ul className="benefitsList">
            {text.benefits.map((benefit, index) => (
              <li key={index}>
                {benefit}
              </li>
            ))}
          </ul>
          
          <p className="callToAction">
            {text.callToAction}
          </p>
        </div>
        
        <div className="modalActions">
          <button 
            className="continueButton"
            onClick={onClose}
          >
            Tiếp Tục &gt;
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default WhyJoinModal;