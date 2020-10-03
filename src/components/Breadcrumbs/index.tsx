import React, { FC, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Breadcrumb } from 'antd';

import { getBreadcrumbNameMap } from '@route';
import { IMenu } from 'types';

import classes from './index.less';

interface IBreadcrumbs {
  menus: Array<IMenu>
}

const Breadcrumbs: FC<IBreadcrumbs> = ({
  menus
}) => {

  const location = useLocation();
  const breadcrumbNameMap = useMemo(() => {
    return getBreadcrumbNameMap(menus, 'path', 'en_name')
  }, [menus])
  const pathSnippets = location.pathname.split('/').filter(i => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });
  return <Breadcrumb className={classes.breadcrumb} >{extraBreadcrumbItems}</Breadcrumb>
}

export default Breadcrumbs