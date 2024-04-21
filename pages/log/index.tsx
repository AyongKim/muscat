import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField,Typography, MenuItem, InputAdornment, Divider } from '@mui/material';
import {IconSearch} from '@tabler/icons-react'; 
import Breadcrumb from '@src/layouts/full/shared/breadcrumb/Breadcrumb';
import { apiUrl } from '@src/utils/commonValues'; 
import CustomSelect from '@src/components/forms/theme-elements/CustomSelect';
import { Row } from 'antd';
const API_URL = `http://${apiUrl}log`; // 서버 API 주소로 수정 필요

interface LogItem {
  category: string;
  api_name: string;
  ip_address: string;
  user_name: string;
  user_email: string;
  user_type: string;
  log_type: string;
  log_request: string;
  log_response: string;
  date: String;
}
export default function LogPage() {
  const [logItems, setLogItems] = useState<LogItem[]>([]);
  const [searchItem, setSearchItem] = React.useState([]); 
  let search_items = ['No', 'API', '이름', '이메일', '접속 IP', '작업'];
  const [companyName, setCompanyName] = React.useState('');
  const fetchLogItems = async () => {
    try {
      const response = await axios.post(`${API_URL}/List`);
      if (response.status === 200) {
        setLogItems(response.data); 
      } else {
        console.error('Failed to fetch checklist items');
      }
    } catch (error) {
      console.error('Error fetching checklist items:', error);
    }
  };

  useEffect(() => {
    fetchLogItems();
  }, []);
 

  return (
    <> 
    <Box sx={{ width: '100%' }}>
      <Breadcrumb title="로그" items={[{ to: '/', title: '메인' }, { title: '로그' }]} />
      <TableContainer component={Paper}>
      <Box display="flex"
        alignItems="center"  >
        <CustomSelect
          labelId="month-dd"
          id="month-dd"
          size="small" 
          value={searchItem}
          sx={{width:100, mr:2}}
          onChange = {(e:any) => {
            setSearchItem(e.target.value);
          }}
        >
          <MenuItem value={0} key = {1000000}>전체</MenuItem>
          {search_items.map((x, index) => {
            return (
              <MenuItem value={x} key = {index}>{x}</MenuItem>
            );
          }) 
          }
        </CustomSelect>
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
        <CustomSelect
          labelId="month-dd"
          id="month-dd"
          size="small" 
          sx={{width:200, ml:2}}
          value={searchItem} 
          onChange = {(e:any) => {
            setSearchItem(e.target.value);
          }}
        >
          <Box    >
            <Typography>구분</Typography>
           
            
            <Box display="flex"
              alignItems="center"  >
                <Box display="block">
                  <Row align={'middle'}><Checkbox checked={true} /> <Typography>사용자 로그인</Typography></Row>
                  <Row align={'middle'}><Checkbox checked={true} /> <Typography>관리자 로그인</Typography></Row>
                  <Row align={'middle'}><Checkbox checked={true} /> <Typography>시스템</Typography></Row>
                  <Row align={'middle'}><Checkbox checked={true} /> <Typography>일반</Typography></Row>
                </Box>
                <Box>
                  <Row align={'middle'}><Checkbox checked={true} /> <Typography>권한</Typography></Row>
                  <Row align={'middle'}><Checkbox checked={true} /> <Typography>접속기록</Typography></Row>
                </Box>
            </Box>
             <Divider sx={{mt:3}}></Divider>
          
            <Box display="flex"   alignItems="center" justifyContent={'flex-end'} sx={{ mt: 1 }}>
                <Button variant="text" color='error' onClick={()=>{ 
                  }} sx={{ mr: 1 }}>
                    모든 필터 해제
                </Button>
                <Button variant="contained" color='error' onClick={()=>{ 
                }} sx={{ mr: 1 }}>
                  취소
                </Button>
                <Button variant="contained" onClick={()=>{ 
                }} sx={{ mr: 1 }}>
                확인
                </Button>
            </Box>
          </Box>
          
        </CustomSelect>
      </Box>
      
        <Table>
          <TableHead sx={{backgroundColor:'success'}}>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>구분</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>계정</TableCell>
              <TableCell>계정 유형</TableCell>
              <TableCell>일시</TableCell>
              <TableCell>상세</TableCell>
              <TableCell>작업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>  
            {logItems.map((row, index) => (
                
              <TableRow>
                <TableCell>{index}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.api_name}</TableCell>
                <TableCell>{row.user_email}</TableCell>
                <TableCell>{row.user_type}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell><Button></Button></TableCell>
                <TableCell>{row.log_type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
      
    </>
  );
}











