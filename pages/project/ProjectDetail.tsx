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
  MenuItem,
  Paper,
  Button, 
} from '@mui/material';
import CustomSelect from '@src/components/forms/theme-elements/CustomSelect';
import { visuallyHidden } from '@mui/utils';
import { useSelector, useDispatch } from '@src/store/Store';
import { fetchCompanies   } from '@src/store/apps/CompanySlice';
import CustomCheckbox from '@src/components/forms/theme-elements/CustomCheckbox'; 
import {   IconSearch,   } from '@tabler/icons-react';
import { CompanyType } from '@src/types/apps/company'; 
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
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: '수탁사명',
  },
  {
    id: 'work_name',
    numeric: false,
    disablePadding: false,
    label: '위탁 업무',
  }, 
  {
    id: 'pname',
    numeric: false,
    disablePadding: false,
    label: '점검 담당자',
  }, 
  {
    id: 'pname',
    numeric: false,
    disablePadding: false,
    label: '점검방식',
  }, 
];

interface CompaynyTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: any) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function CompanyTableHead(props: CompaynyTableProps) {
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

interface CompanyTableToolbarProps {
  numSelected: number;
  rows: any; 
}

const ProjectDetail = ({setMode, data}: {setMode:any, data:any}) => {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<any>('calories');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [dense, setDense] = React.useState(false);
  const [userList, setUserList] = React.useState([])

  const [consignee, setConsignee] = React.useState(0)
  const [workName, setWorkName] = React.useState('')
  const [checker, setChecker] = React.useState('')
  const [checkType, setCheckType] = React.useState(0)

  const onRegister = async() => {
    let response = await axios.post(`${API_URL}/project_detail/Register`, {
      project_id: data.id,
      user_id: consignee,
      work_name: workName,
      check_type: checkType
    });

    if (response.data.result == 'SUCCESS') {
      setRegisterMode(false)
      fetchData()
    }
  }

  const fetchData = async() => {
    let response = await axios.post(`${API_URL}/project_detail/List`, {
      project_id: data.id
    });
    setRows(response.data)
    
    response = await axios.post(`${API_URL}/project/Consignee`);

    setUserList(response.data)
  }
  //Fetch Products
  React.useEffect(() => {
    fetchData();
    setMode('Detail')
  }, []);

  const [rows, setRows] = React.useState([]);
 
  const [companyNameSearch, setCompanyNameSearch] = React.useState('');
  const [registrationNumberSearch, setRegistrationNumberSearch] = React.useState('');


  // 기존 handleSearch 함수 수정
  const handleCompanyNameSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filteredRows = rows.filter((row) => {
      return row.company_name.toLowerCase().includes(event.target.value);
      // || row.register_num.includes(searchQuery);
    });
    setCompanyNameSearch(event.target.value);
    setRows(filteredRows);
  };

  const handleRegistrationNumberSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filteredRows = rows.filter((row) => {
      return row.register_num.toLowerCase().includes(event.target.value);
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
  const handleClick = (event: React.MouseEvent<unknown>, num: string) => {
    const selectedIndex = selected.indexOf(num);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, num);
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

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.

  const theme = useTheme();
  const borderColor = theme.palette.divider;

  const [registerMode, setRegisterMode] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [editData, setEditData] = React.useState(false);
  
  
  return (
    <Box> 
          {/* <Button type="submit" color="success" variant="contained" sx={{width:150}}>조회</Button>  */}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginY: 1, mr: 2 }}>
          <Button variant="contained" onClick={() => setMode('List')}>
            목록
          </Button>
        </Box>       
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
                수탁사 총 {rows.length}개사
              </Typography>
            )} 
            <Button
              variant="contained"
              color="primary" 
              sx={{width:150}}
              onClick={() => {setRegisterMode(true)}}
            >
              엑셀 업로드
            </Button> 

            <Button
              variant="contained"
              color="primary" 
              sx={{width:80, ml:1}}
              onClick={() => {setRegisterMode(true)}}
            >
              추가
            </Button> 

            <Button
              variant="contained"
              color="primary" 
              sx={{width:80, ml: 1}}
              onClick={() => {setRegisterMode(true)}}
            >
              수정
            </Button> 

            <Button
              variant="contained"
              color="primary" 
              sx={{width:80, ml: 1}}
              onClick={() => {setRegisterMode(true)}}
            >
              삭제
            </Button> 
          </Toolbar>
          <Paper variant="outlined" sx={{ mx: 2, my: 1, border: `1px solid ${borderColor}` }}>
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? 'small' : 'medium'}
              >
                <CompanyTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                {registerMode &&
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                    >
                      <CustomTableCell>
                      </CustomTableCell>
                      <CustomTableCell>
                      </CustomTableCell>

                      <CustomTableCell>
                        <CustomSelect
                          labelId="month-dd"
                          id="month-dd"
                          size="small" 
                          value={consignee}
                          sx={{width:100, mr:1}}
                          onChange={(e:any)=>setConsignee(e.target.value)}
                        >
                          {userList.map((x, i) => {
                            return (
                              <MenuItem value={x.user_id} key = {i}>{x.name}</MenuItem>
                            );
                          })}
                        </CustomSelect>
                      </CustomTableCell>

                      <CustomTableCell>
                        <TextField
                          placeholder="위탁 업무"
                          size="small"
                          onChange={(e:any) => {setWorkName(e.target.value)}}
                          value={workName}
                          sx={{width:150, mr:1}}
                        />
                      </CustomTableCell>

                      <CustomTableCell>
                        <CustomSelect
                          labelId="month-dd"
                          id="month-dd"
                          size="small" 
                          value={data.checker}
                          sx={{width:150, mr:1}}
                          onChange={(e:any) => setChecker(e.target.value)}
                        >
                          <MenuItem value={data.checker}>{data.checker}</MenuItem>
                        </CustomSelect>
                      </CustomTableCell>

                      <CustomTableCell>
                        <CustomSelect
                          labelId="month-dd"
                          id="month-dd"
                          size="small" 
                          value={checkType}
                          sx={{width:150, mr:1}}
                          onChange={(e:any) => setCheckType(e.target.value)}
                        >
                          <MenuItem value={0}>서면</MenuItem>
                          <MenuItem value={1}>현장</MenuItem>
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
                          <CustomTableCell padding="checkbox">
                            <CustomCheckbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                'aria-labelledby': labelId,
                              }}
                            />
                          </CustomTableCell>

                          <CustomTableCell>
                            <Box display="flex" alignItems="center"> 
                              <Box
                                sx={{
                                  ml: 2,
                                }}
                              >
                                <Typography variant="h6" fontWeight="600">
                                  {index + 1}
                                </Typography> 
                              </Box>
                            </Box>
                          </CustomTableCell>
                                
                          <CustomTableCell>
                            <Box display="flex" alignItems="center"> 
                              <Box
                                sx={{
                                  ml: 2,
                                }}
                              >
                                <Typography variant="h6" fontWeight="600">
                                  {row.user_name}
                                </Typography> 
                              </Box>
                            </Box>
                          </CustomTableCell>
                          <CustomTableCell>
                              <Typography variant="h6" fontWeight="600">
                                {row.work_name}
                              </Typography>  
                          </CustomTableCell> 
                          <CustomTableCell>
                              <Typography variant="h6" fontWeight="600">
                                {row.checker_name}
                              </Typography>  
                          </CustomTableCell> 

                          <CustomTableCell>
                              <Typography variant="h6" fontWeight="600">
                                {row.check_type == 1 ? '현장' : '서면'}
                              </Typography>  
                          </CustomTableCell> 
                        </TableRow>
                      );
                    })}
                  
                </TableBody>
              </Table>
            </TableContainer>
          </Paper> 
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginY: 1, mr: 2 }}>
            {registerMode &&
            <Button variant="contained" onClick={onRegister}>
              저장
            </Button>

            }
          </Box>
        </BlankCard> 
      
    </Box>
  );
};

export default ProjectDetail;
