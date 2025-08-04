import React from 'react';

import getMenuData from '@/shared/api/menuApi';
import { Breadcrumbs, Header } from '@/shared/ui';

export const LayoutWidget = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const sections = await getMenuData();

  return (
    <>
      <Header data={sections} />
      <Breadcrumbs />
      {children}
    </>
  );
};
