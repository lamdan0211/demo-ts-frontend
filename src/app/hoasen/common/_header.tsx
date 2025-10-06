'use client';

import React from 'react';
import HeaderP31 from '../../../components/common/_header-p31';

interface HeaderProps {
  // Props will be passed through to HeaderP31
  [key: string]: any;
}

export default function Header(props: HeaderProps) {
  return <HeaderP31 {...props} />;
}
