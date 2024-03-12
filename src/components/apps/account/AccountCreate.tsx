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
  Fab,
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
import { IconCheck } from '@tabler/icons-react';
import { Row } from 'antd';
// API 엔드포인트 URL
const API_ENDPOINT = 'http://13.60.38.47:5001';
// Assuming these are the functions that would actually perform API calls.
// You would need to replace them with real API calls in your application.
const checkDuplicateId = async (id: string): Promise<boolean> => {
  try {
    const response = await axios.post(`${API_ENDPOINT}/user/CheckId`,{
      "id": id
    });
    return response.data.isDuplicate;
  } catch (error) {
    console.error('Error checking duplicate ID:', error);
    return true; // API 호출 실패 시 중복으로 간주
  }
};

// 사업자 등록번호 확인 API 호출
const checkBusinessNumber = async (number: string): Promise<string | null> => {
  try {
    const response = await axios.post(`${API_ENDPOINT}/company/Check`,{
      "register_num": number
    });
    return response.data.data;
  } catch (error) {
    console.error('Error checking business number:', error);
    return null; // API 호출 실패 시 null 반환
  }
};

const AccountTab: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  // Form state
  const [accountType, setAccountType] = useState<string>('수탁사');
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
  const [dialog1Open, setDialog1Open] = useState<boolean>(false);
  const [dialog2Open, setDialog2Open] = useState<boolean>(false);
  const [dialogTitle, setDialogTitle] = useState<string>('');
  const [dialogContent, setDialogContent] = useState<string>('');

  const [idChecked, setIdChecked] = useState<boolean>(false);
  const [compChecked, setCompChecked] = useState<boolean>(true);


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
      setDialog1Open(true);
    } else {
      setDialogTitle('중복 확인');
      setDialogContent('사용 가능한 아이디입니다.');
      setDialog2Open(true);
    }
  };

  const handleBusinessNumberCheck = async () => {
    const companyName = await checkBusinessNumber(businessNumber);
    if (companyName) {
      setDialogTitle('업체 확인');
      setDialogContent(`업체 명: ${companyName}`);
      setDialog2Open(true);
    } else {
      setDialogTitle('업체 확인');
      setDialogContent('등록된 업체가 없습니다. 업체를 등록해 주세요');
      setDialog1Open(true);
    }
    
  };

  const handleSubmit = async  ( ) => { 
    if( !idChecked){
      setDialogTitle('아이디');
      setDialogContent('아이디를 입력해주세요.');
      setDialog1Open(true);
      return;
    }
    if(!compChecked  ){
      setDialogTitle('사업자 등록번호');
      setDialogContent('사업자 등록번호를 입력해주세요.');
      setDialog1Open(true);
      return;
    }
    
     // 데이터 준비
    const userData: UserType = {
      user_id: 0, // id는 여기서 임의로 설정
      user_type: accountType === '수탁사' ? 1 : 2, // 계정 유형에 따라 값 설정
      user_email: email,
      nickname: id, // 아이디를 닉네임으로 사용
      user_password: password,
      register_num: businessNumber,
      company_address: address,
      manager_name: name,
      manager_phone: phone,
      manager_depart: department,
      manager_grade: position,
      other: 'ww', // 필요에 따라 설정
      admin_name: 'www', // 필요에 따라 설정
      admin_phone: 'www', // 필요에 따라 설정
      approval:0,
    };


    try {
      // 사용자 등록 액션 디스패치
      await dispatch(registerUser(userData));


      // 다이얼로그 메시지 설정
      setDialogTitle('계정 생성');
      setDialogContent('수탁사 계정이 생성되었습니다.');
      setDialog1Open(true);
    } catch (error) {
      console.error('Failed to register user:', error);

      // 다이얼로그 메시지 설정
      setDialogTitle('계정 생성 실패');
      setDialogContent('사용자 등록에 실패했습니다. 다시 시도해주세요.');
      setDialog1Open(true);
    }
  };

  // Dialog close handler
  const handleDialog2Close = () => {
    setIdChecked(true); 
    if (dialogContent.includes('사용 가능한 아이디입니다.')) {
      setIdChecked(true); 
    }else if(dialogContent.includes('업체 명')) {
      setCompChecked(true);
    } 
    setDialog2Open(false);
  };
  const handleDialog1Close = () => { 
    setDialog1Open(false);
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
                  <MenuItem value="수탁사">수탁사</MenuItem>
                  <MenuItem value="위탁사">위탁사</MenuItem>
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
            {idChecked ? ( // Render input field if editing mode is true
                <Typography  sx={{ml:2}} >{id}</Typography>
              ) : (
                <TextField  
                  fullWidth
                  variant="outlined" 
                  value={id}
                 
                  onChange={(e) => setId(e.target.value)}
                  required
                /> 
              )}
              
             
            </TableCell>
            <TableCell sx={{ padding: 1 }}> 
            {idChecked ? (
              <Fab
                  color="success" 
                  size="small" 
                >
                  <IconCheck width={16} /> 
                </Fab>
            ):(
              <Button onClick={handleIdCheck}>중복확인</Button>
            )}
              
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
            {compChecked ? (
              <Typography  sx={{ml:2}} >{businessNumber}</Typography>
            ):(
              <TextField 
                fullWidth
                variant="outlined"
                value={businessNumber}
                onChange={(e) => setBusinessNumber(e.target.value)}
                required
              /> 
            )}
              
            </TableCell>
            <TableCell sx={{ padding: 1 }}> 
            {compChecked ? (
              <Row>
               <Fab
                  color="success" 
                  size="small" 
                >
                  <IconCheck width={16} /> 
                </Fab>
                <Typography>업체명:</Typography>
              </Row>
             
            ):(
              <Button onClick={handleBusinessNumberCheck}>조회</Button>
            )}
              
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
        <Button color="primary" variant='contained' onClick={handleSubmit}>
          생성
        </Button>
      </Box>

      {/* Dialog for messages */}
      <Dialog open={dialog1Open} onClose={()=>setDialog1Open(false)}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogContent}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialog1Close} color="primary">
            확인
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={dialog2Open} onClose={()=>setDialog2Open(false)}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogContent}</DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={()=>setDialog2Open(false)} color="primary">
            취소
          </Button>
          <Button color="primary" variant='contained' onClick={handleDialog2Close} >
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AccountTab;
