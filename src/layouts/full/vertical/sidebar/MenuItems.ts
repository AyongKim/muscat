import { uniqueId } from 'lodash';

interface MenuitemsType {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
}
import {
  IconAward,
  IconBoxMultiple,
  IconPoint,
  IconAlertCircle,
  IconNotes,
  IconCalendar,
  IconMail,
  IconTicket,
  IconEdit,
  IconGitMerge,
  IconCurrencyDollar,
  IconApps,
  IconFileDescription,
  IconFileDots,
  IconFiles,
  IconBan,
  IconStar,
  IconMoodSmile,
  IconBorderAll,
  IconBorderHorizontal,
  IconBorderInner,
  IconBorderVertical,
  IconBorderTop,
  IconUserCircle,
  IconPackage,
  IconMessage2,
  IconBasket,
  IconChartLine,
  IconChartArcs,
  IconChartCandle,
  IconChartArea,
  IconChartDots,
  IconChartDonut3,
  IconChartRadar,
  IconLogin,
  IconUserPlus,
  IconRotate,
  IconBox,
  IconShoppingCart,
  IconAperture,
  IconLayout,
  IconSettings,
  IconHelp,
  IconZoomCode,
  IconBoxAlignBottom,
  IconBoxAlignLeft,
  IconBorderStyle2,
  IconAppWindow
} from '@tabler/icons-react';

const Menuitems: MenuitemsType[] = [
  {
    id: uniqueId(),
    title: '메인',
    icon: IconAperture,
    href: '/',
    chip: 'New',
    chipColor: 'secondary',
  },
  {
    id: uniqueId(),
    title: '등록업체 및 계정관리',
    icon: IconNotes,
    href: '/apps/account-manager',
  },
  {
    id: uniqueId(),
    title: '등록업체 및 계정관리-마스터',
    icon: IconNotes,
    href: '/master/account-manager',
  }, 
  {
    id: uniqueId(),
    title: '마이페이지',
    icon: IconUserCircle,
    href: '/account/account-my',
  }, 

  
  
  {
    id: uniqueId(),
    title: '회원가입 승인',
    icon: IconNotes,
    href: '/account/account-accept',
  },
 
 
  {
    id: uniqueId(),
    title: '공지사항',
    icon: IconNotes,
    href: '/apps/noticelist',
  },
  {
    id: uniqueId(),
    title: '프로젝트관리',
    icon: IconUserCircle,
    href: '/apps/project',
  }, 
  {
    id: uniqueId(),
    title: '일정관리',
    icon: IconCalendar,
    href: '/apps/calendar',
  },
  
 
  // {
  //   id: uniqueId(),
  //   title: '메모발신이력 ',
  //   icon: IconNotes,
  //   href: '/apps/notes',
  // },
    
  // {
  //   id: uniqueId(),
  //   title: '점검 및 결과',
  //   icon: IconPoint,
  //   href: '/forms/form-elements/autocomplete',
  // },
   
  
 
  // {
  //   id: uniqueId(),
  //   title: '문의',
  //   icon: IconTicket,
  //   href: '/apps/tickets',
  // },
  
  // {
  //   id: uniqueId(),
  //   title: '공지사항추가',
  //   icon: IconBorderAll,
  //   href: '/tables/basic',
  // },
  
 
   
  // {
  //   id: uniqueId(),
  //   title: '위탁사',
  //   icon: IconLayout,
  //   href: '/widgets/cards',
  //   children: [
  //     {
  //       id: uniqueId(),
  //       title: 'Cards',
  //       icon: IconPoint,
  //       href: '/widgets/cards',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Banners',
  //       icon: IconPoint,
  //       href: '/widgets/banners',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Charts',
  //       icon: IconPoint,
  //       href: '/widgets/charts',
  //     },
  //   ],
  // },
  // {
  //   navlabel: true,
  //   subheader: 'Forms',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Form Elements',
  //   icon: IconApps,
  //   href: '/forms/form-elements/autocomplete',
  //   children: [
      
  //     {
  //       id: uniqueId(),
  //       title: 'Button',
  //       icon: IconPoint,
  //       href: '/forms/form-elements/button',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Checkbox',
  //       icon: IconPoint,
  //       href: '/forms/form-elements/checkbox',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Radio',
  //       icon: IconPoint,
  //       href: '/forms/form-elements/radio',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Date Time',
  //       icon: IconPoint,
  //       href: '/forms/form-elements/date-time',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Slider',
  //       icon: IconPoint,
  //       href: '/forms/form-elements/slider',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Switch',
  //       icon: IconPoint,
  //       href: '/forms/form-elements/switch',
  //     },
  //   ],
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Form Layout',
  //   icon: IconFileDescription,
  //   href: '/forms/form-layout',
  // },
  
  // {
  //   id: uniqueId(),
  //   title: 'Form Vertical',
  //   icon: IconBoxAlignLeft,
  //   href: '/forms/form-vertical',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Form Custom',
  //   icon: IconFileDots,
  //   href: '/forms/form-custom',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Form Wizard',
  //   icon: IconFiles,
  //   href: '/forms/form-wizard',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Form Validation',
  //   icon: IconFiles,
  //   href: '/forms/form-validation',
  // },
  
  // {
  //   navlabel: true,
  //   subheader: 'Tables',
  // },

  // {
  //   id: uniqueId(),
  //   title: 'Collapsible',
  //   icon: IconBorderHorizontal,
  //   href: '/tables/collapsible',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Enhanced',
  //   icon: IconBorderInner,
  //   href: '/tables/enhanced',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Fixed Header',
  //   icon: IconBorderVertical,
  //   href: '/tables/fixed-header',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Pagination',
  //   icon: IconBorderTop,
  //   href: '/tables/pagination',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Search',
  //   icon: IconBorderStyle2,
  //   href: '/tables/search',
  // },
  // {
  //   navlabel: true,
  //   subheader: 'UI',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Ui Components',
  //   icon: IconBox,
  //   href: '/ui-components/alert',
  //   children: [
  //     {
  //       id: uniqueId(),
  //       title: 'Alert',
  //       icon: IconPoint,
  //       href: '/ui-components/alert',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Accordion',
  //       icon: IconPoint,
  //       href: '/ui-components/accordion',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Avatar',
  //       icon: IconPoint,
  //       href: '/ui-components/avatar',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Chip',
  //       icon: IconPoint,
  //       href: '/ui-components/chip',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Dialog',
  //       icon: IconPoint,
  //       href: '/ui-components/dialog',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'List',
  //       icon: IconPoint,
  //       href: '/ui-components/list',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Popover',
  //       icon: IconPoint,
  //       href: '/ui-components/popover',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Rating',
  //       icon: IconPoint,
  //       href: '/ui-components/rating',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Tabs',
  //       icon: IconPoint,
  //       href: '/ui-components/tabs',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Tooltip',
  //       icon: IconPoint,
  //       href: '/ui-components/tooltip',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Transfer List',
  //       icon: IconPoint,
  //       href: '/ui-components/transfer-list',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Typography',
  //       icon: IconPoint,
  //       href: '/ui-components/typography',
  //     },
  //   ],
  // },

  // {
  //   navlabel: true,
  //   subheader: 'Charts',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Line',
  //   icon: IconChartLine,
  //   href: '/charts/line',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Gradient',
  //   icon: IconChartArcs,
  //   href: '/charts/gradient',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Area',
  //   icon: IconChartArea,
  //   href: '/charts/area',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Candlestick',
  //   icon: IconChartCandle,
  //   href: '/charts/candlestick',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Column',
  //   icon: IconChartDots,
  //   href: '/charts/column',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Doughtnut & Pie',
  //   icon: IconChartDonut3,
  //   href: '/charts/doughnut',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'RadialBar & Radar',
  //   icon: IconChartRadar,
  //   href: '/charts/radialbar',
  // },
  // {
  //   navlabel: true,
  //   subheader: 'Auth',
  // },
  
  // {
  //   id: uniqueId(),
  //   title: 'Login',
  //   icon: IconLogin,
  //   href: '/auth/auth1/login',
  //   children: [
  //     {
  //       id: uniqueId(),
  //       title: 'Side Login',
  //       icon: IconPoint,
  //       href: '/auth/auth1/login',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Boxed Login',
  //       icon: IconPoint,
  //       href: '/auth/auth2/login',
  //     },
  //   ],
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Register',
  //   icon: IconUserPlus,
  //   href: '/auth/auth1/register',
  //   children: [
  //     {
  //       id: uniqueId(),
  //       title: 'Side Register',
  //       icon: IconPoint,
  //       href: '/auth/auth1/register',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Boxed Register',
  //       icon: IconPoint,
  //       href: '/auth/auth2/register',
  //     },
  //   ],
  // },
  
 
];

export default Menuitems;
