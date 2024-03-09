import { Grid } from '@mui/material';
import Breadcrumb from '../../../src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../src/components/container/PageContainer';

import PaymentGateways from '../../../src/components/dashboards/ecommerce/PaymentGateways';
import RecentTransactions from '../../../src/components/dashboards/ecommerce/RecentTransactions';
import TopCards from '../../../src/components/dashboards/modern/TopCards';  

const BCrumb = [
  {
    to: '/',
    title: '메인',
  },
  {
    title: 'Cards',
  },
];

export default function WidgetCards() {

  return (
    <PageContainer>
      {/* breadcrumb */}
      <Breadcrumb title="Cards" items={BCrumb} />
      {/* end breadcrumb */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TopCards />
        </Grid>
         
        <Grid item xs={12} sm={6} lg={4}>
          <PaymentGateways />
        </Grid> 
        <Grid item xs={12} sm={6} lg={4}>
          <RecentTransactions />
        </Grid>
      </Grid>
    </PageContainer>
  );
};
