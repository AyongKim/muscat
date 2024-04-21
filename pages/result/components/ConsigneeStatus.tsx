import React from 'react';
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Box, Button } from '@mui/material';
import { IconChevronsRight, IconGridDots } from '@tabler/icons-react';
import DashboardCard from '../../../src/components/shared/DashboardCard';
import SkeletonSalesOverviewCard from '../../../src/components/dashboards/skeleton/SalesOverviewCard';
import { Row } from 'antd';

interface SalesOverviewCardProps {
  isLoading: boolean;
}

const ConsigneeStatus = ({ isLoading }: SalesOverviewCardProps) => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const primarylight = theme.palette.primary.light;
  const textColor = theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.8)' : '#2A3547';

  return (
    <>
      <DashboardCard>
        <>
          <Box sx={{textAlign: 'center', borderBottom: 1, borderRadius:0, display: 'flex', justifyContent: 'center'}}>
            <Typography sx={{fontWeight: 'bold', fontSize: 18}}>
              바다원(주)-
            </Typography>
            <Typography>
              대표 업종
            </Typography>
          </Box>
          <Box sx={{borderBottom: 1, borderRadius:0, pb: 1}}>
            <Typography sx={{fontSize:15, fontWeight: 'bold', ml:1, mt:1}}>
              수탁사정보
            </Typography>
            
            <Box sx={{ml: 3, mt:1}}>
              <Box sx={{display: 'flex', mt: '4px'}}>
                <Typography sx={{width: 150}}>
                  위탁 업무
                </Typography>
                <Typography>
                  위탁 업무 내용
                </Typography>
              </Box>

              <Box sx={{display: 'flex', mt: '4px'}}>
                <Typography sx={{width: 150}}>
                  주소
                </Typography>
                <Typography>
                  서울시 관악구 승방길7 201호
                </Typography>
              </Box>

              <Box sx={{display: 'flex', mt: '4px'}}>
                <Typography sx={{width: 150}}>
                  보안 담당자
                </Typography>
                <Typography>
                  홍길동
                </Typography>
              </Box>

              <Box sx={{display: 'flex', mt: '4px'}}>
                <Typography sx={{width: 150}}>
                  연락처
                </Typography>
                <Typography>
                  010-1234-5678
                </Typography>
              </Box>

              <Box sx={{display: 'flex', mt: '4px'}}>
                <Typography sx={{width: 150}}>
                  이메일
                </Typography>
                <Typography>
                  test@test.com
                </Typography>
              </Box>

              <Box sx={{display: 'flex', mt: '4px'}}>
                <Typography sx={{width: 150}}>
                  개인정보취급자수
                </Typography>
                <Typography>
                  2명
                </Typography>
              </Box>

              <Box sx={{display: 'flex', mt: '4px'}}>
                <Typography sx={{width: 150}}>
                  개인정보처리량
                </Typography>
                <Typography>
                  연간 80만건
                </Typography>
              </Box>

              <Box sx={{display: 'flex', mt: '4px'}}>
                <Typography sx={{width: 150}}>
                  개인정보처리시스템
                </Typography>
                <Typography>
                  시스템명
                </Typography>
              </Box>

              <Box sx={{display: 'flex', mt: '4px'}}>
                <Typography sx={{width: 150}}>
                  재위탁/제3자제공
                </Typography>
                <Typography>
                  재위탁사명/제3자제공 업체명
                </Typography>
              </Box>
              <Box sx={{display: 'flex', mt: '4px', alignItems: 'center'}}>
                <Typography sx={{width: 150}}>
                  개인정보 취급 항목
                </Typography>
                <Box sx={{borderRadius: 0, backgroundColor: 'red', p: '3px'}}>
                  1등급
                </Box>
                <Box sx={{borderRadius: 0, backgroundColor: '', p: '3px', ml: 1}}>
                  2등급
                </Box>
                <Box sx={{borderRadius: 0, backgroundColor: 'yellow', p: '3px', ml: 1}}>
                  3등급
                </Box>
              </Box>
            </Box>
          </Box>

          <Box>
            <Typography sx={{fontSize:15, fontWeight: 'bold', ml:1, mt:1}}>
              위탁사정보
            </Typography>
            
            <Box sx={{ml: 3, mt:1}}>
              <Box sx={{display: 'flex', mt: '4px'}}>
                <Typography sx={{width: 150}}>
                  현업 부서
                </Typography>
                <Typography>
                  부서명
                </Typography>
              </Box>

              <Box sx={{display: 'flex', mt: '4px'}}>
                <Typography sx={{width: 150}}>
                  보안 담당자
                </Typography>
                <Typography>
                  김철수
                </Typography>
              </Box>

              <Box sx={{display: 'flex', mt: '4px'}}>
                <Typography sx={{width: 150}}>
                  이메일
                </Typography>
                <Typography>
                  test@test.com
                </Typography>
              </Box>
            </Box>
          </Box>
        </>
      </DashboardCard>
    </>

  );
};

export default ConsigneeStatus;
