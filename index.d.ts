import { ReactNode } from 'react';

export interface IMenu {
  path: string
  name: string
  en_name: string
  permKey: string | boolean
  icon?: string | ReactNode
  children?: Array<IMenu>
}