import Breadcrumb from '@src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '@src/components/container/PageContainer';
import CustomSelect from '@src/components/forms/theme-elements/CustomSelect'; 
const axios = require('axios');
import { API_URL } from '@pages/constant';
import React from 'react';
import { Box, Button, Grid, InputAdornment, MenuItem, TextField , Typography} from '@mui/material';  
import { IconSearch } from '@tabler/icons-react';
import CheckStatus from './components/CheckStatus';
import InnerSystemEnable from './components/InnerSystemEnable';
import RadialbarChart from './components/RadialBar';
import RetrustStatus from './components/RetrustStatus';
import ConsigneeWidget from './components/ConsigneeWidget';
import VerticalBarWidget from './components/VerticalBarWidget';
import HorizontalBarWidget from './components/HorizontalBarWidget';
import Image from "next/image";
import Go0 from "public/images/img/go0.png";
import Go1 from "public/images/img/go1.png";
import Go2 from "public/images/img/go2.png";
import Go3 from "public/images/img/go3.png";
import Go4 from "public/images/img/go4.png";
import Go5 from "public/images/img/go5.png";
import Go6 from "public/images/img/go6.png";
import Go7 from "public/images/img/go7.png";

let goArray = [
  Go0,
  Go1,
  Go2,
  Go3,
  Go4,
  Go5,
  Go6,
  Go7,
]
const BCrumb = [
  {
    to: '/',
    title: '메인',
  },
  {
    title: '점검 및 결과',
  },
];

interface Props {
    consigneeList: any;
}
  
export default function EcomProductList({consigneeList}: Props) {
  return (
    <PageContainer>
      <Grid container>
        <Grid xs={1}>
          <Box sx={{backgroundColor: '#7F7F7F', textAlign: 'center', borderRadius: 0, color: 'white'}}>
            이행점검 평균점수
          </Box>
          <Box sx={{backgroundColor: '#D9D9D9', textAlign: 'center', borderRadius: 0, borderColor: '#797979', border: 1, height: 'calc(20vh)', marginBottom: 1, alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
            <Typography sx={{color: 'red', fontSize: 20, marginRight: 1}}>77</Typography>
            <Typography sx={{fontSize: 20}}>점</Typography>
          </Box>
          <Box sx={{backgroundColor: '#D9D9D9', textAlign: 'center', borderRadius: 0, borderColor: '#A5A5A5', border: 1, borderBottom: 0, height: 'calc(40vh)', alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
          </Box>
        </Grid>
        <Grid xs={10} container>
          <Grid item xs={12} justifyContent={'center'} alignItems={'baseline'} display={'flex'} border={'1px solid black'} ml={1} mr={1} p={1} borderRadius={1}>
            <Typography>
                총 점검대상
            </Typography>
            <Typography sx={{color: '#4472C4', fontSize: 20, ml: '5px', fontWeight: 'bold'}}>
                45건
            </Typography>
            <Typography>
                중 최초점검 완료 
            </Typography>
            <Typography sx={{color: '#4472C4', fontSize: 20, ml: '5px', fontWeight: 'bold'}}>
                32건
            </Typography>
            <Typography>
                , 이행점검 완료
            </Typography>
            <Typography sx={{color: '#4472C4', fontSize: 20, ml: '5px', fontWeight: 'bold'}}>
                13건
            </Typography>
            <Typography>
                ,점검제외
            </Typography>
            <Typography sx={{color: 'red', fontSize: 20, ml: '5px', fontWeight: 'bold'}}>
                5건
            </Typography>
            <Typography>
                (PG사
            </Typography>
            <Typography sx={{color: 'red', fontSize: 14, ml: '5px'}}>
                2건
            </Typography>
            <Typography>
                /인증서 제출 
            </Typography>
            <Typography sx={{color: 'red', fontSize: 14, ml: '5px'}}>
                2건
            </Typography>
            <Typography>
                /점검 거부
            </Typography>
            <Typography sx={{color: 'red', fontSize: 14, ml: '5px'}}>
                1건
            </Typography>
            <Typography>
                )
            </Typography>
          </Grid>
          <Grid item xs={6} style={{padding:8}} width={16}> 
            <CheckStatus isLoading={false}></CheckStatus>
          </Grid>
          
          <Grid item xs={6} style={{padding:8}}>
            <ConsigneeWidget isLoading={false}></ConsigneeWidget>
          </Grid>
          <Grid item xs={6} style={{padding:8}}>
            <InnerSystemEnable isLoading={false}></InnerSystemEnable>
          </Grid>
          <Grid item xs={6} style={{padding:8}}>
            <RetrustStatus isLoading={false}></RetrustStatus>
          </Grid>
          <Grid item xs={6} style={{padding:8}}>
            <RadialbarChart ></RadialbarChart>
          </Grid>
          <Grid item xs={6} style={{padding:8}}>
            <RadialbarChart ></RadialbarChart>
          </Grid>
          <Grid item xs={5} style={{padding:8}}>
            <RetrustStatus isLoading={false}></RetrustStatus>
          </Grid>
          <VerticalBarWidget/>
          <HorizontalBarWidget/>
        </Grid>
        
      </Grid>
        {/* ------------------------------------------- */}
        {/* Left part */}
        {/* ------------------------------------------- */}
       
    </PageContainer>
  );
};