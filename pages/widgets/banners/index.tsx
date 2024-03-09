import { Grid } from '@mui/material';
import Breadcrumb from '../../../src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../src/components/container/PageContainer';
import WelcomeCard from '../../../src/components/dashboards/ecommerce/WelcomeCard'; 

const BCrumb = [
  {
    to: '/',
    title: '메인',
  },
  {
    title: 'Banner',
  },
];

export default function WidgetBanners() {

  return (
    <PageContainer>
      {/* breadcrumb */}
      <Breadcrumb title="Banner" items={BCrumb} />
      {/* end breadcrumb */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <WelcomeCard />
            </Grid>
             
          </Grid>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Grid container spacing={3}>
             
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

