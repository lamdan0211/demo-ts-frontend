import { useMemo } from 'react';

// Translation function for client-side components
export function useTranslations(language: 'vi' | 'en' = 'vi') {
  return useMemo(() => {
    const translations: Record<string, Record<string, string>> = {
      'field_lastname_blur': {
        vi: 'Vui lòng nhập họ',
        en: 'Please enter last name'
      },
      'field_firstname': {
        vi: 'Vui lòng nhập tên',
        en: 'Please enter first name'
      },
      'msg_require': {
        vi: 'Trường này là bắt buộc',
        en: 'This field is required'
      },
      'msg_password_require': {
        vi: 'Mật khẩu là bắt buộc',
        en: 'Password is required'
      },
      'msg_password_length': {
        vi: 'Mật khẩu phải có ít nhất 6 ký tự',
        en: 'Password must be at least 6 characters'
      },
      'msg_password_confirm_require': {
        vi: 'Xác nhận mật khẩu là bắt buộc',
        en: 'Password confirmation is required'
      },
      'msg_password_confirm_equal': {
        vi: 'Xác nhận mật khẩu không khớp',
        en: 'Password confirmation does not match'
      },
      'msg_password_current_require': {
        vi: 'Mật khẩu hiện tại là bắt buộc',
        en: 'Current password is required'
      },
      'msg_gender_require': {
        vi: 'Giới tính là bắt buộc',
        en: 'Gender is required'
      },
      'msg_location_require': {
        vi: 'Vị trí là bắt buộc',
        en: 'Location is required'
      },
      'msg_country_require': {
        vi: 'Quốc gia là bắt buộc',
        en: 'Country is required'
      },
      'msg_email_require': {
        vi: 'Email là bắt buộc',
        en: 'Email is required'
      },
      'msg_email_rule': {
        vi: 'Email không hợp lệ',
        en: 'Invalid email format'
      },
      'msg_email_exist': {
        vi: 'Email đã tồn tại',
        en: 'Email already exists'
      },
      'msg_email_available': {
        vi: 'Email có thể sử dụng',
        en: 'Email is available'
      },
      'msg_email_length': {
        vi: 'Email quá dài',
        en: 'Email is too long'
      },
      'msg_firstname_require': {
        vi: 'Tên là bắt buộc',
        en: 'First name is required'
      },
      'msg_lastname_require': {
        vi: 'Họ là bắt buộc',
        en: 'Last name is required'
      },
      'msg_fullname_require': {
        vi: 'Họ tên là bắt buộc',
        en: 'Full name is required'
      },
      'msg_fullname_rule': {
        vi: 'Họ tên không hợp lệ',
        en: 'Invalid full name format'
      },
      'msg_position_require': {
        vi: 'Vị trí là bắt buộc',
        en: 'Position is required'
      },
      'msg_select_jobs': {
        vi: 'Vui lòng chọn công việc',
        en: 'Please select a job'
      },
      'msg_maxlen_ckeditor': {
        vi: 'Nội dung quá dài',
        en: 'Content is too long'
      },
      'msg_valid_salary': {
        vi: 'Mức lương không hợp lệ',
        en: 'Invalid salary amount'
      },
      'msg_valid_expyear': {
        vi: 'Năm kinh nghiệm không hợp lệ',
        en: 'Invalid experience years'
      },
      'msg_mobile_require': {
        vi: 'Số điện thoại là bắt buộc',
        en: 'Mobile number is required'
      },
      'msg_mobile_rule': {
        vi: 'Số điện thoại không hợp lệ',
        en: 'Invalid mobile number format'
      },
      'msg_id_card': {
        vi: 'Số CMND/CCCD không hợp lệ',
        en: 'Invalid ID card number'
      },
      'msg_invalid_filesize': {
        vi: 'Kích thước file không hợp lệ',
        en: 'Invalid file size'
      },
      'msg_accept_file': {
        vi: 'File không được hỗ trợ',
        en: 'File type not supported'
      },
      'msg_job_is_expired': {
        vi: 'Công việc đã hết hạn',
        en: 'Job has expired'
      },
      'msg_job_is_applied': {
        vi: 'Bạn đã ứng tuyển công việc này',
        en: 'You have already applied for this job'
      },
      'msg_job_is_saved_successfully': {
        vi: 'Lưu công việc thành công',
        en: 'Job saved successfully'
      },
      'msg_you_have_already_save_this_job': {
        vi: 'Bạn đã lưu công việc này rồi',
        en: 'You have already saved this job'
      },
      'msg_select_survey_answer': {
        vi: 'Vui lòng chọn câu trả lời',
        en: 'Please select an answer'
      },
      'msg_confirm_delete': {
        vi: 'Bạn có chắc chắn muốn xóa?',
        en: 'Are you sure you want to delete?'
      },
      'msg_datebirthday_rule': {
        vi: 'Ngày sinh không hợp lệ',
        en: 'Invalid birth date'
      },
      'msg_old_resume_will_be_lost': {
        vi: 'CV cũ sẽ bị mất',
        en: 'Old resume will be lost'
      }
    };

    return (key: string): string => {
      return translations[key]?.[language] || key;
    };
  }, [language]);
}

// Common translations hook
export function useCommonTranslations(language: 'vi' | 'en' = 'vi') {
  return useMemo(() => {
    return {
      job_login_password: language === 'vi' ? 'Mật khẩu' : 'Password',
      job_index_title_hotjob: language === 'vi' ? 'Việc làm hot' : 'Hot Jobs',
      job_index_title_vipjob: language === 'vi' ? 'Việc làm VIP' : 'VIP Jobs',
      job_jobs_detail_job_viewmore: language === 'vi' ? 'Xem thêm' : 'View More',
      message_common: language === 'vi' ? 'Thông báo' : 'Notification',
      job_jobs_detail_job_collapse: language === 'vi' ? 'Thu gọn' : 'Collapse'
    };
  }, [language]);
}
