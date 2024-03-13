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
  Badge, 
} from '@mui/material';
import IconButton from '@mui/material/IconButton'; 
import { Cancel } from '@mui/icons-material';
import { visuallyHidden } from '@mui/utils';
import CustomCheckbox from '../../../src/components/forms/theme-elements/CustomCheckbox';
import Breadcrumb from '../../../src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../src/components/container/PageContainer';
import BlankCard from '../../../src/components/shared/BlankCard';
import { Stack } from '@mui/system'; 
import AccountDetail from '../../../src/components/apps/account/AccountDetail';
import { useDispatch, useSelector } from '../../../src/store/Store';
import { fetchUsers, updateUser } from '../../../src/store/apps/UserSlice';
import { UserType } from '../../../src/types/apps/account';
import DeleteUser from '../../../src/components/apps/account/DeleteUser';
import DashboardCard from '../../../src/components/shared/DashboardCard';
import { Row } from 'antd';
import { userInfo } from 'os';

const BCrumb = [
  {
    to: '/',
    title: '메인',
  },
  {
    title: '회원가입 승인',
  },
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
} 

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: any[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }

    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: any;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'No.',
  },
  {
    id: 'pname',
    numeric: false,
    disablePadding: false,
    label: '아이디',
  },
  
  {
    id: 'weeks',
    numeric: false,
    disablePadding: false,
    label: '가입요청 일시',
  },
  {
    id: 'budget',
    numeric: false,
    disablePadding: false,
    label: '승인',
  },
];


interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof []) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: keyof []) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };
  
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <CustomCheckbox
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            tabIndex={-1}
            inputProps={{
              'aria-labelledby': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography variant="subtitle1" fontWeight="500">
                {headCell.label}
              </Typography>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

  

export default function EnhanceTable() {
  const dispatch = useDispatch(); 
  React.useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
 
  const accounts: UserType[] = useSelector((state) => state.user.users);

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<any>('calories');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof []) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = accounts.map((n) => n.user_id!.toString());
      setSelected(newSelecteds); 
      return;
    }
    setSelected([]);
  };

  const [showRegistrationInfo, setShowRegistrationInfo] = React.useState(false);
  const [selectedUserInfo, setSelectedUserInfo] = React.useState<UserType>({
    user_id: null,
    user_type: 0,
    user_email: "", 
    user_password: "",
    register_num: "",
    company_address: "",
    manager_name: "",
    manager_phone: "",
    manager_depart: "",
    manager_grade: "",
    other: "",
    admin_name: "",
    admin_phone: "",
    approval: 0,
  });

  const handleClick = (event: React.MouseEvent<unknown>, id: string | number) => {
    const selectedIndex = selected.indexOf(id.toString());
    let newSelected:  string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id.toString());
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleShow = (event: React.MouseEvent<unknown>, user: UserType) => { 
    setShowRegistrationInfo(true);
    setSelectedUserInfo(user); 
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - accounts.length) : 0;

  return (
    <PageContainer>
      {/* breadcrumb */}
      <Breadcrumb title="회원가입 승인" items={BCrumb} />
       <Box sx={{ display:'flex', gap:3 }}>
        <BlankCard >
        <Toolbar
            sx={{
              pl: { sm: 2 },
              pr: { xs: 1, sm: 1 },
              bgcolor: (theme) =>
                  alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
              ...(selected.length > 0 && {
                bgcolor: (theme) =>
                  alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
              }),
            }}
          > 
            {selected.length > 0 ? (
              <Typography sx={{ flex: '1 1 100%' }} color="inherit"  component="div">
                {selected.length} 건 선택됨
              </Typography>
            ) : (
              <Typography sx={{ flex: '1 1 100%' }} color="inherit"  component="div">
                총  {accounts.length} 건
              </Typography>
            )} 
            <DeleteUser selectedUserIds={selected.join(',')} onClose={()=>{setSelected([])}}/>
          </Toolbar>
          <Box mb={2} sx={{ mb: 2 }}> 
          
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={  'medium'}
              > 
               <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={accounts.length}
                />
                
                <TableBody>
                  {stableSort(accounts, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: any, index) => {
                      const isItemSelected = isSelected(row.user_id);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleShow(event, row)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.user_id}
                          
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <CustomCheckbox
                              checked={isItemSelected}
                              onClick={(event) => handleClick(event, row.user_id)}
                              inputProps={{
                                'aria-labelledby': labelId,
                              }}
                            />
                          </TableCell>
                          <TableCell> 
                            <Box>
                              <Typography variant="h6" fontWeight="600">
                                {row.user_id}
                              </Typography> 
                            </Box> 
                          </TableCell>
                          <TableCell> 
                            <Box>
                              <Typography variant="h6" fontWeight="600">
                                {row.admin_name}
                              </Typography> 
                            </Box> 
                          </TableCell>
                          <TableCell>
                            <Typography color="textSecondary" variant="subtitle2" fontWeight="400">
                              {row.access_time}
                            </Typography>
                          </TableCell> 
                          <TableCell>
                            <Stack spacing={1} direction="row" alignItems="center">
                              <Badge
                                color={ 
                                     row.approval === 0
                                      ? 'warning' 
                                        : row.approval === 2
                                          ? 'error'
                                          : 'secondary'
                                }
                                variant="dot"
                              ></Badge>
                              <Typography color="textSecondary" variant="body1">
                                {row.approval === 0
                                      ? '준비중' 
                                        : '미사용'}
                              </Typography>
                            </Stack>
                          </TableCell>
                           
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

           
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={accounts.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>  
        </BlankCard> 
        {showRegistrationInfo && (
          <DashboardCard
            title="회원가입 승인"
            action={
              <Box>
                <IconButton onClick={() => setShowRegistrationInfo(false)} sx={{ mr: 1 }}>
                  <Cancel />
                </IconButton> 
              </Box>
            }
          >
            <Box m={1} >
              <AccountDetail selectedUserInfo={selectedUserInfo} />
              <Box display="flex"   alignItems="center" justifyContent={'flex-end'} sx={{ mt: 1 }}>
                <Button variant="contained" color='error' onClick={()=>{
                   dispatch(updateUser({...selectedUserInfo, approval:1}))
                   .then(() => { 
                   })
                   .catch((error) => {
                     // 에러 처리
                   });
                }} sx={{ mr: 1 }}>
                  승인 거부
                </Button>
                <Button variant="contained" onClick={()=>{
                  dispatch(updateUser({...selectedUserInfo, approval:2}))
                  .then(() => { 
                  })
                  .catch((error) => {
                    // 에러 처리
                  });
                }} sx={{ mr: 1 }}>
                승인
                </Button>
            </Box>
            </Box>
            
          </DashboardCard>
        )} 
        </Box>
      
    </PageContainer>
  );
};
