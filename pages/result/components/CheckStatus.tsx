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

const CheckStatus = ({ isLoading }: SalesOverviewCardProps) => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const primarylight = theme.palette.primary.light;
  const textColor = theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.8)' : '#2A3547';

  // chart
  const optionscolumnchart: any = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",

      toolbar: {
        show: false,
      },
      height: 275,
    },
    labels: ["Profit", "Revenue", "Expance"],
    colors: [primary, primarylight, secondary],
    plotOptions: {
      pie: {

        donut: {
          size: '89%',
          background: 'transparent',

          labels: {
            show: true,
            name: {
              show: true,
              offsetY: 7,
            },
            value: {
              show: false,
            },
            total: {
              show: true,
              color: textColor,
              fontSize: '20px',
              fontWeight: '600',
              label: '$500,458',
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: false,
    },
    legend: {
      show: false,
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
  };
  const seriescolumnchart = [55, 55, 55];

  return (
    <>
      {
        isLoading ? (
          <SkeletonSalesOverviewCard />
        ) : (
          <DashboardCard title="점검상태" >
            <>
            <Box display={'flex'} alignItems={'center'}  >
              <Box mt={3} height="155px" width={155}>
                <Chart
                  options={optionscolumnchart}
                  series={seriescolumnchart}
                  type="donut"
                  height="175px"
                  width={"100%"}
                />
              </Box>
              <Button
                sx={{ my: 0.5, width:"25px", height:1 }}
                variant="outlined"
                size="small" 
                aria-label="move all right"
              >
                <IconChevronsRight width={20} height={20} />
              </Button>
              <Box mt={3} height="155px" width={155}>
                <Chart
                  options={optionscolumnchart}
                  series={seriescolumnchart}
                  type="donut"
                  height="175px"
                  width={"100%"}
                />
              </Box>
              
            </Box>
            <Stack direction="row" spacing={2} justifyContent="space-between" mt={7}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    width={38}
                    height={38}
                    bgcolor="primary.light"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography
                      color="primary.main"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <IconGridDots width={22} />
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" fontWeight="600">
                      $23,450
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      Profit
                    </Typography>
                  </Box>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    width={38}
                    height={38}
                    bgcolor="secondary.light"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography
                      color="secondary.main"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <IconGridDots width={22} />
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" fontWeight="600">
                      $23,450
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      Expance
                    </Typography>
                  </Box>
                </Stack>
            </Stack>
            </>
          </DashboardCard>
        )}
    </>

  );
};

export default CheckStatus;
