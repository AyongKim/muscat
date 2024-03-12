/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { alpha } from '@mui/material/styles';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Button,
  InputLabel,
  Divider,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import CustomCheckbox from '../../../src/components/forms/theme-elements/CustomCheckbox';
import Breadcrumb from '../../../src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../src/components/container/PageContainer';
import BlankCard from '../../../src/components/shared/BlankCard';
import { Stack } from '@mui/system';
import { EnhancedTableData, EnTableType } from '../../../src/components/tables/tableData';
import { Badge } from 'antd';
import AccountDetail from '../../../src/components/apps/account/AccountDetail';
import AccountModify from '../../../src/components/apps/account/AccountModify';

const BCrumb = [
  {
    to: '/apps/account-manager',
    title: '계정관리',
  },
  {
    to: '/tables/account-detail',
    title: '계정상세보기',
  },
  {
    title: '수정',
  },
];

export default function AccountModifyTable() {

   
  const [showRegistrationInfo, setShowRegistrationInfo] = React.useState(true);
  const [selectedUserInfo, setSelectedUserInfo] = React.useState(Object);

  return (
    <PageContainer>
      {/* breadcrumb */}
      <Breadcrumb title="계정상세보기" items={BCrumb} />
       <Box sx={{ display:'flex',  }}>
       
        {showRegistrationInfo && (
          <Box width={800}>
            <AccountModify selectedUserInfo={selectedUserInfo} />
          </Box>
        )} 
        
      </Box>
    </PageContainer>
  );
};

