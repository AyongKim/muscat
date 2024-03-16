import Breadcrumb from '@src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '@src/components/container/PageContainer';

import * as React from 'react';
import { alpha, useTheme } from '@mui/material/styles'; 
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
  TextField,
  InputAdornment,
  Paper,
  Button, 
} from '@mui/material';
import { visuallyHidden } from '@mui/utils'; 
import {   IconSearch,   } from '@tabler/icons-react';  
import { useDispatch, useSelector } from '@src/store/Store';
import { InquiryType } from '@src/types/apps/inquiry';
import BlankCard from '@src/components/shared/BlankCard';
import CustomCheckbox from '@src/components/forms/theme-elements/CustomCheckbox';
import { apiUrl } from '@src/utils/commonValues';
import axios from 'axios';
import DeleteInquiry from './components/DeleteInquiry';
import AddInquiry from './components/AddInquiry';
const BCrumb = [
  {
    to: '/',
    title: '메인',
  },
  {
    title: '문의',
  },
];

export default function EcomProductList() {

  return (
    <PageContainer>
      {/* breadcrumb */}
      <Breadcrumb title="문의" items={BCrumb} />
      
        {/* ------------------------------------------- */}
        {/* Left part */}
        {/* ------------------------------------------- */}
       <InquiryList/>
    </PageContainer>
  );
};




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

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
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
  id: string;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'no',
    numeric: false,
    disablePadding: false,
    label: 'No',
  },
  {
    id: 'title',
    numeric: false,
    disablePadding: false,
    label: '제목',
  },
  {
    id: 'author',
    numeric: false,
    disablePadding: false,
    label: '글쓴이',
  }, 
  {
    id: 'date',
    numeric: false,
    disablePadding: false,
    label: '작성날짜',
  },
];


interface InquiryTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: any) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function InquiryTableHead(props: InquiryTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: any) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <CustomCheckbox
            color="primary"
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
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
              {headCell.label}
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

interface InquiryTableToolbarProps {
  numSelected: number;
  rows: any; 
}

const InquiryList = () => {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<any>('calories');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);


  const [rows, setRows] = React.useState<any>([]);
 
  React.useEffect(() => {
    const fetchData = async () => {
      const API_URL = `http://${apiUrl}inquiry`;
      try {
        const response = await axios.post(`${API_URL}/List`);
        if (response.status === 200) {
          // Handle successful response (status code 200)
          const { data } = response;
          // Assuming the data structure matches the Model for success
          // You can access individual fields like data.id, data.title, etc.
          setRows(data);
        } else if (response.status === 400) {
          // Handle failed response (status code 400)
          const { result, reason, error_message } = response.data;
          // You can use the error information to display an appropriate message
          console.error(`API request failed: ${reason} - ${error_message}`);
        }
      } catch (error:any) {
        // Handle any other errors (e.g., network issues, invalid URL, etc.)
        console.error('Error fetching data from API:', error.message);
      }
    };
  
    fetchData();
  }, []);
  
  

 
  const [inquiryNameSearch, setInquiryNameSearch] = React.useState('');
  const [registrationNumberSearch, setRegistrationNumberSearch] = React.useState('');


  // 기존 handleSearch 함수 수정
  const handleInquiryNameSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filteredRows: InquiryType[] = rows.filter((row:any) => {
      return row.title.toLowerCase().includes(event.target.value);
      // || row.register_num.includes(searchQuery);
    });
    setInquiryNameSearch(event.target.value);
    setRows(filteredRows);
  };

  const handleRegistrationNumberSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filteredRows: InquiryType[] = rows.filter((row:any) => {
      return row.content.toLowerCase().includes(event.target.value);
    });
    setRegistrationNumberSearch(event.target.value);
    setRows(filteredRows);
  };

 

  // This is for the sorting
  const handleRequestSort = (event: React.MouseEvent<unknown>, property: any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // This is for select all the row
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n: any) => n.id);
      setSelected(newSelecteds);

      return;
    }
    setSelected([]);
  };



  // This is for the single row sleect
  const handleClick = (event: React.MouseEvent<unknown>, num: number) => {
    const selectedIndex = selected.indexOf(num.toString());
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, num.toString());
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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: number) => selected.indexOf(name.toString()) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const theme = useTheme();
  const borderColor = theme.palette.divider;


  
  
  return (
    <Box> 
          {/* <Button type="submit" color="success" variant="contained" sx={{width:150}}>조회</Button>  */}
       
        <BlankCard> 
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
              <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle2" component="div">
                {selected.length} 건 선택됨
              </Typography>
            ) : (
              <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle2" component="div">
                총  {rows.length} 건
              </Typography>
            )} 
            <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconSearch size="1.1rem" />
                      </InputAdornment>
                    ),
                    style: { backgroundColor: 'white' } 
                  }}
                  placeholder="제목"
                  size="small"
                  sx={{mr:1,width:300 }}
                  onChange={handleInquiryNameSearch}
                  value={inquiryNameSearch}
                />
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconSearch size="1.1rem" />
                      </InputAdornment>
                    ),
                    style: { backgroundColor: 'white' } 
                  }}
                  placeholder="글쓴이"
                  size="small" 
                  sx={{ mr: 1, width: 300,   }} // 배경색을 흰색으로 설정
                  onChange={handleRegistrationNumberSearch}
                  value={registrationNumberSearch}
                />

            <DeleteInquiry selectedInquiryIds={selected.join(',')} onClose={()=>{setSelected([])}}/>
            <AddInquiry   />
        
          </Toolbar>
          <Paper variant="outlined" sx={{ mx: 2, my: 1, border: `1px solid ${borderColor}` }}>
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? 'small' : 'medium'}
              >
                <InquiryTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: any, index) => {
                      const isItemSelected = isSelected(row.id);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, row.id)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.id}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <CustomCheckbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                'aria-labelledby': labelId,
                              }}
                            />
                          </TableCell>

                          <TableCell>
                            <Box display="flex" alignItems="center"> 
                              <Box
                                sx={{
                                  ml: 2,
                                }}
                              >
                                <Typography variant="h6" fontWeight="600">
                                  {row.id}
                                </Typography> 
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                              <Typography variant="h6" fontWeight="600">
                                {row.title}
                              </Typography>  
                          </TableCell> 
                          <TableCell>
                              <Typography variant="h6" fontWeight="600">
                                {row.author}
                              </Typography>  
                          </TableCell> 
                          <TableCell>
                              <Typography variant="h6" fontWeight="600">
                                {row.created_date}
                              </Typography>  
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
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper> 
        </BlankCard> 
      
    </Box>
  );
};
 

