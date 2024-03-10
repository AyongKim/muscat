import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  ListItemIcon,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import axios from 'axios'; 
import { registerUser } from '../../../store/apps/UserSlice'; 
import { AppDispatch, useDispatch } from '../../../store/Store';
import { UserType } from '../../../types/apps/account';
// API 엔드포인트 URL
const API_ENDPOINT = 'http://your-api-endpoint.com';
// Assuming these are the functions that would actually perform API calls.
// You would need to replace them with real API calls in your application.
const checkDuplicateId = async (id: string): Promise<boolean> => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/check-duplicate-id/${id}`);
    return response.data.isDuplicate;
  } catch (error) {
    console.error('Error checking duplicate ID:', error);
    return true; // API 호출 실패 시 중복으로 간주
  }
};

// 사업자 등록번호 확인 API 호출
const checkBusinessNumber = async (number: string): Promise<string | null> => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/check-business-number/${number}`);
    return response.data.companyName;
  } catch (error) {
    console.error('Error checking business number:', error);
    return null; // API 호출 실패 시 null 반환
  }
};

const AccountTab: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  // Form state
  const [accountType, setAccountType] = useState<string>('trustee');
  const [id, setId] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [businessNumber, setBusinessNumber] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [department, setDepartment] = useState<string>('');
  const [position, setPosition] = useState<string>('');
 

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogTitle, setDialogTitle] = useState<string>('');
  const [dialogContent, setDialogContent] = useState<string>('');

  // Handlers
  const handleAccountTypeChange = (event:any) => {
    setAccountType(event.target.value as string);
  };

  // ...other handlers here...

  const handleIdCheck = async () => {
    const isDuplicate = await checkDuplicateId(id);
    if (isDuplicate) {
      setDialogTitle('중복 확인');
      setDialogContent('중복된 아이디가 존재합니다. 다른 아이디를 입력해 주세요.');
      setDialogOpen(true);
    } else {
      setDialogTitle('중복 확인');
      setDialogContent('사용 가능한 아이디입니다.');
      setDialogOpen(true);
    }
  };

  const handleBusinessNumberCheck = async () => {
    const companyName = await checkBusinessNumber(businessNumber);
    if (companyName) {
      setDialogTitle('업체 확인');
      setDialogContent(`업체 명: ${companyName}`);
    } else {
      setDialogTitle('업체 확인');
      setDialogContent('등록된 업체가 없습니다. 업체를 등록해 주세요');
    }
    setDialogOpen(true);
  };

  const handleSubmit = async  (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
     // 데이터 준비
    const userData: UserType = {
      id: 0, // id는 여기서 임의로 설정
      user_type: accountType === 'trustee' ? 1 : 2, // 계정 유형에 따라 값 설정
      user_email: email,
      nickname: id, // 아이디를 닉네임으로 사용
      user_password: password,
      register_num: businessNumber,
      company_address: address,
      manager_name: name,
      manager_phone: phone,
      manager_depart: department,
      manager_grade: position,
      other: '', // 필요에 따라 설정
      admin_name: '', // 필요에 따라 설정
      admin_phone: '', // 필요에 따라 설정
    };


    try {
      // 사용자 등록 액션 디스패치
      await dispatch(registerUser(userData));


      // 다이얼로그 메시지 설정
      setDialogTitle('계정 생성');
      setDialogContent('수탁사 계정이 생성되었습니다.');
      setDialogOpen(true);
    } catch (error) {
      console.error('Failed to register user:', error);

      // 다이얼로그 메시지 설정
      setDialogTitle('계정 생성 실패');
      setDialogContent('사용자 등록에 실패했습니다. 다시 시도해주세요.');
      setDialogOpen(true);
    }
  };

  // Dialog close handler
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  // ...other handlers here...

  return (
    <Box sx={{ width: 750 }}> 
    <TableContainer component={Paper}>
      <Table >
        <TableHead >
          <TableRow>
            <TableCell sx={{width:'40%'}}><InputLabel id="account-type-select-label">계정 유형</InputLabel></TableCell>
            <TableCell>
              <FormControl fullWidth>
              <InputLabel id="account-type-select-label">계정 유형</InputLabel>
                <Select
                  labelId="account-type-select-label"
                  id="account-type-select"
                  value={accountType}
                  label="계정 유형"
                  onChange={handleAccountTypeChange}
                >
                  <MenuItem value="trustee">수탁사</MenuItem>
                  <MenuItem value="consignor">위탁사</MenuItem>
                </Select>
              </FormControl>
            </TableCell>
          </TableRow>
        </TableHead>
        <Divider />

        <TableBody  >
          <Typography variant="h4" padding={1} marginTop={3}>기본정보</Typography>
          <Divider />
          {/* ID */}
          
          <TableRow>
            <TableCell sx={{ backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center' }}>
              <InputLabel htmlFor="id">
                <AccountCircleIcon sx={{ marginRight: 1 }} />
                아이디*
              </InputLabel>
            </TableCell>
            <TableCell sx={{ padding: 1 }}>
              <TextField  
              fullWidth
                variant="outlined" 
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
              />
             
            </TableCell>
            <TableCell sx={{ padding: 1 }}> 
              <Button onClick={handleIdCheck}>중복확인</Button>
            </TableCell>
           
          </TableRow>
         
          {/* Password */}
           
          <TableRow>
            <TableCell sx={{ backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center' }}>
              <InputLabel htmlFor="password">
                <LockIcon sx={{ marginRight: 1 }} />
                비밀번호*
              </InputLabel>
            </TableCell>
            <TableCell sx={{ padding: 1 }} >
              <TextField
                fullWidth
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </TableCell>
          </TableRow> 
          <Divider/>
          {/* Email */}
          <TableRow>
            <TableCell sx={{ backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center' }}>
              <InputLabel htmlFor="email">
                <EmailIcon sx={{ marginRight: 1 }} />
                이메일*
              </InputLabel>
            </TableCell>
            <TableCell sx={{ padding: 1 }}>
              <TextField
                fullWidth 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </TableCell>
          </TableRow>
          
          <Typography variant="h4" padding={1} marginTop={3}>회사정보</Typography>
          {/* Business Registration Number */}
          <TableRow>
            <TableCell sx={{ backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center' }}>
              <InputLabel htmlFor="businessNumber">
                <BusinessIcon sx={{ marginRight: 1 }} />
                사업자 등록번호*
              </InputLabel>
            </TableCell>
            <TableCell sx={{ padding: 1 }}>
              <TextField 
              fullWidth
                variant="outlined"
                value={businessNumber}
                onChange={(e) => setBusinessNumber(e.target.value)}
                required
              /> 
            </TableCell>
            <TableCell sx={{ padding: 1 }}> 
              <Button onClick={handleBusinessNumberCheck}>조회</Button>
            </TableCell>
          </TableRow>
          {/* Address */}
          <TableRow>
            <TableCell sx={{ backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center' }}>
              <InputLabel htmlFor="address">
                <LocationOnIcon sx={{ marginRight: 1 }} />
                주소*
              </InputLabel>
            </TableCell>
            <TableCell sx={{ padding: 1 }}>
              <TextField
                fullWidth
                variant="outlined"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </TableCell>
          </TableRow>
          <Typography variant="h4" padding={1} marginTop={3}>담당자 정보</Typography>
          {/* Name */}
          <TableRow>
            <TableCell sx={{ backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center' }}>
              <InputLabel htmlFor="name">
                <PersonIcon sx={{ marginRight: 1 }} />
                이름*
              </InputLabel>
            </TableCell>
            <TableCell sx={{ padding: 1 }}>
              <TextField
                fullWidth
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </TableCell>
          </TableRow>
          {/* Phone */}
          <TableRow>
            <TableCell sx={{ backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center' }}>
              <InputLabel htmlFor="phone">
                <PhoneIcon sx={{ marginRight: 1 }} />
                연락처*
              </InputLabel>
            </TableCell>
            <TableCell sx={{ padding: 1 }}>
              <TextField
                fullWidth
                variant="outlined"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </TableCell>
          </TableRow>
          {/* Department */}
          <TableRow>
            <TableCell sx={{ backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center' }}>
              <InputLabel htmlFor="department">
                <BusinessCenterIcon sx={{ marginRight: 1 }} />
                부서명
              </InputLabel>
            </TableCell>
            <TableCell sx={{ padding: 1 }}>
              <TextField
                fullWidth
                variant="outlined"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </TableCell>
          </TableRow>
          {/* Position */}
          <TableRow>
            <TableCell sx={{ backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center' }}>
              <InputLabel htmlFor="position">
                <AssignmentIndIcon sx={{ marginRight: 1 }} />
                직급
              </InputLabel>
            </TableCell>
            <TableCell sx={{ padding: 1 }}>
              <TextField
                fullWidth
                variant="outlined"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>


      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button color="primary" variant='contained' onClick={() => {}}>
          생성
        </Button>
      </Box>

      {/* Dialog for messages */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogContent}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AccountTab;
