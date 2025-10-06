'use client';

import React from 'react';
import PopupSuccessP11 from '../../../components/common/_popup_success_p11';

interface PopupSuccessProps {
  // Props will be passed through to PopupSuccessP11
  [key: string]: any;
}

export default function PopupSuccess(props: PopupSuccessProps) {
  return <PopupSuccessP11 {...props} />;
}
