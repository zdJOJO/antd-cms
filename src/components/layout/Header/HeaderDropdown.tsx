import React from 'react'
import { DropDownProps } from 'antd/es/dropdown';
import { Dropdown } from 'antd';

declare type OverlayFunc = () => React.ReactNode;

export interface IHeaderDropdown extends Omit<DropDownProps, 'overlay'> {
  overlay: React.ReactNode | OverlayFunc | any;
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight' | 'bottomCenter';
}

const HeaderDropdown: React.FC<IHeaderDropdown> = ({
  ...restProps
}) => {
  return (
    <Dropdown {...restProps} />
  )
}

export default HeaderDropdown