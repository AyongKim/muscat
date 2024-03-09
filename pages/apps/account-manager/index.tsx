import Breadcrumb from '../../../src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../src/components/container/PageContainer';
import NoticeList from '../../../src/components/apps/ecommerce/NoticeList';
import BlankCard from '../../../src/components/shared/BlankCard';
import CompanyList from '../../../src/components/apps/ecommerce/CompanyList';
import AccountList from '../../../src/components/apps/ecommerce/AccountList';

const BCrumb = [
  {
    to: '/',
    title: '메인',
  },
  {
    title: '등록업체 및 계정관리',
  },
];

export default function EcomProductList() {

  return (
    <PageContainer>
      {/* breadcrumb */}
      <Breadcrumb title="등록업체 및 계정관리" items={BCrumb} />
      
        {/* ------------------------------------------- */}
        {/* Left part */}
        {/* ------------------------------------------- */}
        <CompanyList />

        <AccountList/>
       
    </PageContainer>
  );
};

