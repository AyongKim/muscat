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
const BCrumb = [
  {
    to: '/',
    title: '메인',
  },
  {
    title: '점검 및 결과',
  },
];

export default function EcomProductList() {
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [year, setYear] = React.useState(0);
  
  const [checklist, setChecklist] = React.useState([]);
  const [personalCategory, setPersonalCategory] = React.useState([]);
  const [companyList, setCompanyList] = React.useState([]);

  const [projectNames, setProjectNames] = React.useState([]);
  const [companyName, setCompanyName] = React.useState('');
  let registerYears: number[] = [];
  const [years, setYears] = React.useState([]);
  const [searchYear, setSearchYear] = React.useState(0);
  const [searchName, setSearchName] = React.useState('');
  const today = new Date();
  let y = [];
  for (let i = 0; i < 3; i++)
    registerYears.push(today.getFullYear() - i);

  async function fetchData() {
    try {
      const response = await axios.post(`${API_URL}/project/List`, {
        year: searchYear,
        project_name: searchName,
        company_name: companyName
      });
      // setRows(response.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  async function fetchYears() {
    try {
      const response = await axios.post(`${API_URL}/project/SearchItem`);
      setYears(response.data.years)
      setProjectNames(response.data.names)

      setSearchYear(0)
      setSearchName('!@#')
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  const fetchCompany = async() => {
    try {
      const response = await axios.post(`${API_URL}/company/List`)
      setCompanyList(response.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  React.useEffect(() => {
    fetchYears()
    fetchData() 
    fetchCompany() 
  }, []);
  const handleSearch = (event: any) => {
    fetchData()
  };
  return (
    <PageContainer>
      {/* breadcrumb */}
      <Breadcrumb title="점검 및 결과" items={BCrumb} />
      <Box
          sx={{mb: 2, display: 'flex', alignItems: 'center'}}
        > 
          <Typography align='center' sx={{mr: 1}}>
            연도:
          </Typography> 
         <CustomSelect
          labelId="month-dd"
          id="month-dd"
          size="small" 
          value={searchYear}
          sx={{width:100, mr:2}}
          onChange = {(e:any) => {
            setSearchYear(e.target.value);
          }}
        >
          <MenuItem value={0} key = {1000000}>전체</MenuItem>
          {years.map((x, index) => {
            return (
              <MenuItem value={x} key = {index}>{x}</MenuItem>
            );
          })

          }
        </CustomSelect>
        <Typography align='center' sx={{mr: 1}}>
          프로젝트 명:
        </Typography> 
        <CustomSelect
          labelId="month-dd"
          id="month-dd"
          size="small" 
          value={searchName}
          sx={{width:200, mr:2}}
          onChange = {(e:any) => {
            setSearchName(e.target.value);
          }}
        >
          <MenuItem value={'!@#'} key = {1000000}>전체</MenuItem>
          {projectNames.map((x:any, index: number) => {
            return (
              <MenuItem value={x} key = {index}>{x}</MenuItem>
            );
          })

          }
        </CustomSelect>
        <Typography align='center' sx={{mr: 1}}>
          위탁사 명:
        </Typography> 
        <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconSearch size="1.1rem" />
                </InputAdornment>
              ),
            }}
            placeholder="검색"
            size="small"
            onChange={(e) => {
              setCompanyName(e.target.value)
            }}
            value={companyName}
        />
        <Button
          variant={"contained"}
          color={"primary"}
          sx={{width:60, ml:1}}
          onClick = {handleSearch}
        >
              조회
        </Button> 
      </Box>

      <Grid container alignItems="center"  >
        <Grid item xs={7} style={{padding:8}} width={16}> 
          <CheckStatus isLoading={false}></CheckStatus>
        </Grid>
        
        <Grid item xs={5} style={{padding:8}}>
          <ConsigneeWidget isLoading={false}></ConsigneeWidget>
        </Grid>
        <Grid item xs={5} style={{padding:8}}>
          <InnerSystemEnable isLoading={false}></InnerSystemEnable>
        </Grid>
        <Grid item xs={5} style={{padding:8}}>
          <RadialbarChart ></RadialbarChart>
        </Grid>
        <Grid item xs={5} style={{padding:8}}>
          <RetrustStatus isLoading={false}></RetrustStatus>
        </Grid>
        <VerticalBarWidget/>
        <HorizontalBarWidget/>
      </Grid>
        {/* ------------------------------------------- */}
        {/* Left part */}
        {/* ------------------------------------------- */}
       
    </PageContainer>
  );
};

