import React, { useState } from 'react';
import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Typography,
  TableHead,
  Chip,
  Box,
  AvatarGroup,
  useTheme,
  FormControl,
  InputLabel,
  Input,
  Button,
  Card,
} from '@mui/material'; 
import { Stack } from '@mui/system';
import ReactQuill from 'react-quill';
import PageContainer from '../../../../src/components/container/PageContainer';
import Breadcrumb from '../../../../src/layouts/full/shared/breadcrumb/Breadcrumb';
import BlankCard from '../../../../src/components/shared/BlankCard';
import DashboardCard from '../../../../src/components/shared/DashboardCard';
import { Space } from 'antd';

const BCrumb = [
  {
    to: '/',
    title: '공지사항',
  },
  {
    title: '글작성',
  },
];

export default function QuillEditor() {

  const [text, setText] = useState('');

  const theme = useTheme();
  const borderColor = theme.palette.divider;
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event: any) => {
    // 첫 번째 선택된 파일을 가져옵니다.
    const file = event.target.files[0];
    
    if (file) {
      setSelectedFile(file);
      // 파일 처리 로직 추가 (예: 파일을 서버에 업로드)
    } else {
      // 파일이 선택되지 않았을 경우의 처리
      console.log("No file selected.");
    }
  };
  
  return (
    <PageContainer>
      {/* breadcrumb */}
      <Breadcrumb title="글 작성" items={BCrumb} />
      <DashboardCard
          title="글 작성" 
          action={
            <Box>
              <Button variant="contained" onClick={()=>{}} sx={{mr:1}}>
                수정
              </Button>  
            </Box> 
          } 
        >
      {/* end breadcrumb */}
      <Card sx={{ p: 0,  border:1, borderColor: 'black' }} 
      elevation={ 9 } 
      variant={'outlined'}>
        <TableContainer sx={{  borderColor: 'black' }}>
          <Table
            aria-label="simple table"
            sx={{
              whiteSpace: 'nowrap',
              borderColor: 'black'
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: "primary.light", borderColor: 'black' }}>
                  <Typography color={'dark'} variant="h6">제목</Typography>
                </TableCell>
                <TableCell width={'100%'} sx={{ borderColor: 'black' }} colSpan={7}>
                  <Typography variant="h6">첫번째 공지사항입니다.</Typography>
                </TableCell> 
              
              </TableRow>
              <TableRow>
                <TableCell sx={{ backgroundColor: "primary.light", borderColor: 'black' }}>
                  <Typography variant="h6">분류</Typography>
                </TableCell>
                <TableCell sx={{ borderColor: 'black' }}>
                  <Typography variant="h6">전체</Typography>
                </TableCell>
                <TableCell sx={{ backgroundColor: "primary.light", borderColor: 'black' }}>
                  <Typography variant="h6">작성자</Typography>
                </TableCell>
                <TableCell sx={{ borderColor: 'black' }}>
                  <Typography variant="h6">ooo</Typography>
                </TableCell>
                <TableCell sx={{ backgroundColor: "primary.light", borderColor: 'black' }}>
                  <Typography variant="h6">작성일</Typography>
                </TableCell>
                <TableCell sx={{ borderColor: 'black' }}>
                  <Typography variant="h6">yyyy-mm-dd hh:mm:ss</Typography>
                </TableCell>
                <TableCell sx={{ backgroundColor: "primary.light", borderColor: 'black' }}>
                  <Typography variant="h6">조회</Typography>
                </TableCell>
                <TableCell sx={{ borderColor: 'black' }}>
                  <Typography variant="h6">52</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ backgroundColor: "primary.light", borderColor: 'black' }}>
                  <Typography color={'dark'} variant="h6">첨부파일</Typography>
                </TableCell>
                <TableCell width={'100%'} sx={{ borderColor: 'black' }} colSpan={7}  >
                <Box display={'flex'}   alignItems="center">
                  <InputLabel
                    htmlFor="file-upload"
                    component="label"
                    sx={{
                      borderRadius: '4px',
                      display: 'inline-block',
                      mr:3
                    }}
                  >
                    파일 선택
                  </InputLabel>
                  <Input
                    id="file-upload"
                    type="file"
                    onChange={handleFileChange}
                    inputProps={{
                      'aria-label': '첨부파일',
                    }}
                    style={{ display: 'none' }}
                  />
                  {selectedFile && <Typography> {selectedFile.name}</Typography>}
                  </Box> 
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <ReactQuill
                value={text}
                onChange={(value) => {
                  setText(value);
                }}
                placeholder="Type here..."
              />
            </TableBody>
          </Table>
        </TableContainer>

      </Card>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginY:2 }}>
        <Button variant="contained" onClick={()=>{}} sx={{ mr: 1 }}>
          목록
        </Button>
      </Box>
      </DashboardCard> 
    </PageContainer>
    
  
  );
};
