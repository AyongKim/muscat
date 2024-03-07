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
} from '@mui/material'; 
import { Stack } from '@mui/system';
import ReactQuill from 'react-quill';
import PageContainer from '../../../src/components/container/PageContainer';
import Breadcrumb from '../../../src/layouts/full/shared/breadcrumb/Breadcrumb';
import BlankCard from '../../../src/components/shared/BlankCard';

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

  return (
    <PageContainer>
      {/* breadcrumb */}
      <Breadcrumb title="글 작성" items={BCrumb} />
      {/* end breadcrumb */}
      <BlankCard>
      <TableContainer>
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: 'nowrap',
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography color={'dark'} variant="h6">제목</Typography>
              </TableCell>
              <TableCell width={'100%'} >
                <Typography variant="h6">첫번째 공지사항입니다.</Typography>
              </TableCell>
               
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="h6">분류</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">전체</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">작성자</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">ooo</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">작성일</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">yyyy-mm-dd hh:mm:ss</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">조회</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">52</Typography>
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
    </BlankCard>
    </PageContainer>
  );
};
