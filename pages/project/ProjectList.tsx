import * as React from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import { format } from 'date-fns';
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
  IconButton,
  Tooltip,
  FormControlLabel,
  Typography,
  Avatar,
  TextField,
  InputAdornment,
  Paper,
  Button,
  MenuItem,
  CardContent,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { IconDotsVertical, IconFilter, IconSearch, IconTrash } from '@tabler/icons-react';
import CustomSelect from '@src/components/forms/theme-elements/CustomSelect';
import BlankCard from '@src/components/shared/BlankCard';
const axios = require('axios');
import { API_URL } from '@pages/constant';

const CustomTableCell = (props: any) => {
  return (
    <TableCell {...props} sx={{padding:1.2}}>
    </TableCell>
  );
}

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
    id: 'year',
    numeric: false,
    disablePadding: false,
    label: '연도',
  },

  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: '프로젝트 명',
  },
  {
    id: 'consignor',
    numeric: false,
    disablePadding: false,
    label: '위탁사 명',
  },
  {
    id: 'checklist_name',
    numeric: false,
    disablePadding: false,
    label: '체크리스트 명',
  },
  {
    id: 'privacy_type',
    numeric: false,
    disablePadding: false,
    label: '개인정보 취급 분류',
  },
  {
    id: 'consignee',
    numeric: false,
    disablePadding: false,
    label: '수탁사 현황',
  },
  {
    id: 'schedule',
    numeric: false,
    disablePadding: false,
    label: '일정',
  }
];

function EnhancedTableHead(props: any) {
  const { order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: any) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <CustomTableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'center'}
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
          </CustomTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}


const EnhancedTableToolbar = (props: any) => {
  const { numSelected, setEditMode, search,rows } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
     
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle2" component="div">
          {numSelected} 건 선택됨
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle2" component="div">
          총  {rows.length} 건
        </Typography>
      )} 
      <Button
        variant="contained"
        color="success" 
        sx={{width:150}}
        onClick={() => {setEditMode(true)}}
      >
            프로젝트 생성
      </Button> 
   
    </Toolbar>
  );
};


const ProductTableList = () => {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<any>('calories');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [year, setYear] = React.useState(0);
  const [years, setYears] = React.useState([]);
  const [consignorName, setConsignorName] = React.useState('');

  async function fetchData() {
    try {
      const response = await axios.post(`${API_URL}/project/List`, {
        year: year,
        project_name: projectName,
        consignor_name: consignorName
      });
      setRows(response.data)

      if (response.data.length > 0) {
        setSearchName('0')
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async function fetchYears() {
    try {
      const response = await axios.post(`${API_URL}/project/Years`);
      setYears(response.data)

      if (response.data.length > 0) {
        setSearchYear(0)
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  //Fetch Products
  React.useEffect(() => {
    fetchYears()
    fetchData()
  }, []);


  const [rows, setRows] = React.useState<any>([]);
  const [search, setSearch] = React.useState('');

  const handleSearch = (event: any) => {
    fetchData()
  };

  // This is for the sorting
  const handleRequestSort = (event: React.MouseEvent<unknown>, property: any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const theme = useTheme();
  const borderColor = theme.palette.divider;

  const [projectName, setProjectName] = React.useState('');
  const [searchYear, setSearchYear] = React.useState(0);
  const [searchName, setSearchName] = React.useState('');
  const [userId, setUserId] = React.useState(0);
  const [checkListId, setCheckListId] = React.useState(0);
  const [privacyPolicy, setPrivacyPolicy] = React.useState(0);
  const [editMode, setEditMode] = React.useState(false);

  const onRegister = async() => {
    if (projectName != '' && year != 0 && userId != 0 && checkListId != 0 && privacyPolicy != 0) {
      let data = {
        'year': year,
        'name': projectName,
        'user_id': userId,
        'checklist_id': checkListId,
        'privacy_type': privacyPolicy
      }

      const response = await axios.post('http://localhost:5001/project/Register', data);
      console.log(response)
      fetchData()
      setEditMode(false)
    }
    else {
      
    }
    
  }

  React.useEffect(() => {
    setProjectName('');
    setYear(0);
    setUserId(0);
    setCheckListId(0);
    setPrivacyPolicy(0);
  }, [editMode])
  
  return (
    <Box>
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
            setProjectName(e.target.value);
          }}
        >
          <MenuItem value={0} key = {1000000}>전체</MenuItem>
          {rows.map((x:any, index: number) => {
            return (
              <MenuItem value={x.name} key = {index}>{x.name}</MenuItem>
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
              setConsignorName(e.target.value)
            }}
            value={consignorName}
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
        <BlankCard>
          <EnhancedTableToolbar
            numSelected={selected.length}
            search={search}
            handleSearch={(event: any) => handleSearch(event)}
            setEditMode={setEditMode}
            rows={rows}
          />
          <Paper variant="outlined" sx={{ mx: 2, mt: 1, border: `1px solid ${borderColor}` }}>
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? 'small' : 'medium'}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {editMode &&
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                    >
                      <CustomTableCell>
                      </CustomTableCell>

                      <CustomTableCell>
                        <CustomSelect
                          labelId="month-dd"
                          id="month-dd"
                          size="small" 
                          value={year}
                          sx={{width:100, mr:1}}
                          onChange={(e:any)=>setYear(e.target.value)}
                        >
                          <MenuItem value={2024}>2024</MenuItem>
                          <MenuItem value={2023}>2023</MenuItem>
                          <MenuItem value={2022}>2022</MenuItem>
                        </CustomSelect>
                      </CustomTableCell>

                      <CustomTableCell>
                        <TextField
                          placeholder="프로젝트명"
                          size="small"
                          onChange={(e:any) => {setProjectName(e.target.value)}}
                          value={projectName}
                          sx={{width:150, mr:1}}
                        />
                      </CustomTableCell>

                      <CustomTableCell>
                        <CustomSelect
                          labelId="month-dd"
                          id="month-dd"
                          size="small" 
                          value={userId}
                          sx={{width:150, mr:1}}
                          onChange={(e:any) => setUserId(e.target.value)}
                        >
                          <MenuItem value={1}>A사</MenuItem>
                          <MenuItem value={2}>B사</MenuItem>
                          <MenuItem value={3}>C사</MenuItem>
                        </CustomSelect>
                      </CustomTableCell>

                      <CustomTableCell>
                        <CustomSelect
                          labelId="month-dd"
                          id="month-dd"
                          size="small" 
                          value={checkListId}
                          sx={{width:150, mr:1}}
                          onChange={(e:any) => setCheckListId(e.target.value)}
                        >
                          <MenuItem value={1}>2024-1</MenuItem>
                          <MenuItem value={2}>2024-2</MenuItem>
                          <MenuItem value={3}>2024-3</MenuItem>
                        </CustomSelect>
                      </CustomTableCell>

                      <CustomTableCell>
                        <CustomSelect
                          labelId="month-dd"
                          id="month-dd"
                          size="small" 
                          value={privacyPolicy}
                          sx={{width:150, mr:1}}
                          onChange={(e:any) => setPrivacyPolicy(e.target.value)}
                        >
                          <MenuItem value={1}>금융사 분류</MenuItem>
                          <MenuItem value={2}>게임사 분류</MenuItem>
                        </CustomSelect>
                      </CustomTableCell>
                      <CustomTableCell>
                        <Box 
                          sx={{width: 100}}
                        >

                        </Box>
                      </CustomTableCell>
                      <CustomTableCell>
                      <Box 
                          sx={{width: 50}}
                        >

                        </Box>
                      </CustomTableCell>
                    </TableRow>
                  }
                  
                  {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: any, index) => {
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={index}
                        >

                          <CustomTableCell>
                            <Box display="flex" alignItems="center"> 
                              <Box
                                sx={{
                                  ml: 2,
                                }}
                              >
                                <Typography align='center'>
                                  {index + 1}
                                </Typography> 
                              </Box>
                            </Box>
                          </CustomTableCell>

                          <CustomTableCell>
                              <Typography align='center'>
                                {row.year}
                              </Typography> 
                          </CustomTableCell>

                          <CustomTableCell>
                            <Typography align='center'>{row.name}</Typography>
                          </CustomTableCell>

                          <CustomTableCell>
                            <Typography align='center'>
                              {row.user_id}
                            </Typography>
                          </CustomTableCell>

                          <CustomTableCell>
                          <Typography align='center'>
                              {row.checklist_id}
                            </Typography>
                          </CustomTableCell>

                          <CustomTableCell>
                            <Typography align='center'>
                              {row.privacy_type}
                            </Typography>
                          </CustomTableCell>

                          <CustomTableCell>
                            <Box display={"flex"} justifyContent={"center"}>
                              <Button variant="contained" onClick={() => {}}>
                                수탁사 현황
                              </Button>
                            </Box>
                            
                          </CustomTableCell>

                          <CustomTableCell>
                            <Box display={"flex"} justifyContent={"center"}>
                              <Button variant="contained" onClick={() => {}}>
                                일정
                              </Button>
                            </Box>
                          </CustomTableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows,
                      }}
                    >
                      <CustomTableCell colSpan={6} />
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
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginY: 1, mr: 2 }}>
            {editMode &&
            <Button variant="contained" onClick={onRegister}>
              저장
            </Button>

            }
          </Box>
        </BlankCard>         
    </Box>
  );
};

export default ProductTableList;
