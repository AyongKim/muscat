import { GeneralIcon } from './icon';

export interface CompanyType {
  title: string;
  num: number; 
  id: number | string; 
}

export interface CompanyFiterType {
  id: number;
  filterbyTitle?: string;
  name?: string;
  sort?: string;
  icon?: GeneralIcon | any;
  devider?: boolean;
}

export interface CompanyCardProps {
  id?: string | number;
  color?: string;
  like: string;
  star: number;
  value?: string;
}
