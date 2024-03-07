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
} from '@mui/material';
import BlankCard from '../shared/BlankCard';
import { basicsTableData, TableType } from './tableData';
import { Stack } from '@mui/system';
import ReactQuill from 'react-quill';

const basics: TableType[] = basicsTableData;

const Table5 = () => {
  const [text, setText] = useState('');
  return (
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
  );
};

export default Table5;
