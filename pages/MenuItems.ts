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
    //chip: 'New',
    chipColor: 'secondary',
    children: [
       {
         id: uniqueId(),
         title: '메인',
         icon: IconPoint,
         href: '/',
       },
       {
         id: uniqueId(),
         title: '메모 발신 이력',
         icon: IconPoint,
         href: '/notes',
       },
       {
         id: uniqueId(),
         title: '공지사항',
         icon: IconPoint,
         href: '/noticelist',
       },
       {
         id: uniqueId(),
         title: '회원가입 승인',
         icon: IconPoint,
         href: '/account/account-accept',
       }
     ],
  
  },
  {
    id: uniqueId(),
    title: '점검 및 결과',
    icon: IconNotes,
    href: '/account/account-manager',
    children: [
      {
        id: uniqueId(),
        title: '분류',
        icon: IconPoint,
        href: '/result/category',
      },
      {
        id: uniqueId(),
        title: '수탁사 전체 결과',
        icon: IconPoint,
        href: '/result/all_result',
      },
      {
        id: uniqueId(),
        title: '일반 현황',
        icon: IconPoint,
        href: '/result/detail',
      },
      {
        id: uniqueId(),
        title: '점검 수행',
        icon: IconPoint,
        href: '/result/individual_after',
      }
    ],
  },
  {
    id: uniqueId(),
    title: '등록업체 및 계정관리',
    icon: IconNotes,
    href: '/account/account-manager',
  },
  {
    id: uniqueId(),
    title: '등록업체 및 계정관리-마스터',
    icon: IconNotes,
    href: '/master/account-manager',
  },
  {
    id: uniqueId(),
    title: '프로젝트관리',
    icon: IconUserCircle,
    href: '/project',
  },  
  {
    id: uniqueId(),
    title: '점검 항목 관리',
    icon: IconNotes,
    href: '/checklist',
  }, 
  {
    id: uniqueId(),
    title: '개인정보 항목 관리',
    icon: IconNotes,
    href: '/privacy',
  },
  {
    id: uniqueId(),
    title: '일정관리',
    icon: IconNotes,
    href: '/calendar',
  },
  {
    id: uniqueId(),
    title: '문의',
    icon: IconNotes,
    href: '/inquiry',
  },
  {
    id: uniqueId(),
    title: '로그',
    icon: IconNotes,
    href: '/log',
  },
  {
    id: uniqueId(),
    title: '마이페이지',
    icon: IconUserCircle,
    href: '/account/account-my',
  }, 
];

export default Menuitems;
