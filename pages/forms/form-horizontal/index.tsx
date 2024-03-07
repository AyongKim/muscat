import { Box, Button, Grid, Typography } from '@mui/material';

// components
import Breadcrumb from '../../../src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../src/components/container/PageContainer';
import ParentCard from '../../../src/components/shared/ParentCard';
import BasicLayout from '../../../src/components/forms/form-horizontal/BasicLayout';
import BasicIcons from '../../../src/components/forms/form-horizontal/BasicIcons';
import FormSeparator from '../../../src/components/forms/form-horizontal/FormSeparator';
import FormLabelAlignment from '../../../src/components/forms/form-horizontal/FormLabelAlignment';
import CollapsibleForm from '../../../src/components/forms/form-horizontal/CollapsibleForm';
import FormTabs from '../../../src/components/forms/form-horizontal/FormTabs';
import DashboardCard from '../../../src/components/shared/DashboardCard';

const BCrumb = [
  {
    to: '/',
    title: '메인',
  },
  {
    title: '수탁사 현황',
  },
];

export default function FormHorizontal() {

  return (
    <PageContainer>
      {/* breadcrumb */}
      <Breadcrumb title="수탁사 현황" items={BCrumb} />
      {/* end breadcrumb */}
      <Grid container spacing={3}>
        <Grid item xs={12}> 
        <DashboardCard
          title="프로젝트명" 
          action={
            <Box>
              <Button variant="contained" onClick={()=>{}} sx={{mr:1}}>
                수정
              </Button>
              <Button variant="contained" onClick={()=>{}}>
                저장
              </Button> 
            </Box> 
          }
        ><BasicLayout /> </DashboardCard> 
           
        </Grid>
        
        
      </Grid>
    </PageContainer>
  );
};
