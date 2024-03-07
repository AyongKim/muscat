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
} from '@mui/material';
import Divider from '@mui/material/Divider';

// Assuming these are the functions that would actually perform API calls.
// You would need to replace them with real API calls in your application.
const checkDuplicateId = async (id: string): Promise<boolean> => {
  // Replace with actual API call
  return false; // Return true if ID is duplicate
};

const checkBusinessNumber = async (number: string): Promise<string | null> => {
  // Replace with actual API call
  return null; // Return company name if exists, otherwise null
};

const AccountTab: React.FC = () => {
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

  // Edit mode state
  const [editMode, setEditMode] = useState<boolean>(false);

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogTitle, setDialogTitle] = useState<string>('');
  const [dialogContent, setDialogContent] = useState<string>('');

  // Handlers
  const handleAccountTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add form validation and submission logic here
    // For now, just show the dialog
    setDialogTitle('계정 생성');
    setDialogContent('수탁사 계정이 생성되었습니다.');
    setDialogOpen(true);
  };

  // Dialog close handler
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  // ...other handlers here...

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" mb={2}>계정 생성</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>계정 유형</TableCell>
              <TableCell>
                <FormControl fullWidth>
                  <InputLabel id="account-type-select-label">계정 유형</InputLabel>
                  {/* <Select
                    labelId="account-type-select-label"
                    id="account-type-select"
                    value={accountType}
                    label="계정 유형"
                    onChange={handleAccountTypeChange}
                  >
                    <MenuItem value="trustee">수탁사</MenuItem>
                    <MenuItem value="consignor">위탁사</MenuItem>
                  </Select> */}
                </FormControl>
              </TableCell>
            </TableRow>
          </TableHead>
          <Divider />

          <TableBody>
            <Typography variant="h4" padding={1} marginTop={3}>기본정보</Typography>
             <Divider />
            {/* ID */}
            <TableRow>
              <TableCell sx={{ backgroundColor: '#f0f0f0' }}>아이디*</TableCell>
              <TableCell sx={{ padding: 1 }} >
                <TextField  
                  variant="outlined" 
                  value={id}
                  sx={{ flex: 1 }}
                  onChange={(e) => setId(e.target.value)}
                  required
                  disabled={!editMode} // Disable if not in edit mode
                  InputProps={{
                    sx: { '& .MuiOutlinedInput-notchedOutline': { display: !editMode ? 'none' : 'block' } }
                  }}
                />
                <Button onClick={handleIdCheck}>중복확인</Button>
              </TableCell>
            </TableRow>

            {/* Password */}
            <TableRow>
              <TableCell sx={{ backgroundColor: '#f0f0f0'  }}>비밀번호*</TableCell>
              <TableCell sx={{ padding: 1 }} >
                <TextField
                  fullWidth
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={!editMode} // Disable if not in edit mode
                  InputProps={{
                    sx: { '& .MuiOutlinedInput-notchedOutline': { display: !editMode ? 'none' : 'block' } }
                  }}
                />
              </TableCell>
            </TableRow>
            {/* Email */}
            <TableRow sx={{ '&:hover': { outline: '1px solid rgba(0, 0, 0, 0.12)' } }}>
              <TableCell sx={{ backgroundColor: '#f0f0f0'  }}>이메일*</TableCell>
              <TableCell sx={{ padding: 1 }} >
                <TextField
                  fullWidth 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={!editMode} // Disable if not in edit mode
                  InputProps={{
                    sx: { '& .MuiOutlinedInput-notchedOutline': { display: !editMode ? 'none' : 'block' } }
                  }}
                />
              </TableCell>
            </TableRow>
            <Typography variant="h4" padding={1} marginTop={3}>회사정보</Typography>
            {/* Business Registration Number */}
            <TableRow>
              <TableCell sx={{ backgroundColor: '#f0f0f0'  }}>사업자 등록번호*</TableCell>
              <TableCell sx={{ padding: 1 }} >
                <TextField 
                  variant="outlined"
                  value={businessNumber}
                  onChange={(e) => setBusinessNumber(e.target.value)}
                  required
                  disabled={!editMode} // Disable if not in edit mode
                  InputProps={{
                    sx: { '& .MuiOutlinedInput-notchedOutline': { display: !editMode ? 'none' : 'block' } }
                  }}
                />
                <Button onClick={handleBusinessNumberCheck}>조회</Button>
              </TableCell>
            </TableRow>
            {/* Address */}
            <TableRow>
              <TableCell sx={{ backgroundColor: '#f0f0f0'  }}>주소*</TableCell>
              <TableCell sx={{ padding: 1 }} >
                <TextField
                  fullWidth
                  variant="outlined"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  disabled={!editMode} // Disable if not in edit mode
                  InputProps={{
                    sx: { '& .MuiOutlinedInput-notchedOutline': { display: !editMode ? 'none' : 'block' } }
                  }}
                />
              </TableCell>
            </TableRow>
            <Typography variant="h4" padding={1} marginTop={3}>담당자 정보</Typography>
            {/* Name */}
            <TableRow>
              <TableCell sx={{ backgroundColor: '#f0f0f0'  }}>이름*</TableCell>
              <TableCell sx={{ padding: 1 }} >
                <TextField
                  fullWidth
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={!editMode} // Disable if not in edit mode
                  InputProps={{
                    sx: { '& .MuiOutlinedInput-notchedOutline': { display: !editMode ? 'none' : 'block' } }
                  }}
                />
              </TableCell>
            </TableRow>
            {/* Phone */}
            <TableRow>
              <TableCell sx={{ backgroundColor: '#f0f0f0'  }}>연락처*</TableCell>
              <TableCell sx={{ padding: 1 }} >
                <TextField
                  fullWidth
                  variant="outlined"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  disabled={!editMode} // Disable if not in edit mode
                  InputProps={{
                    sx: { '& .MuiOutlinedInput-notchedOutline': { display: !editMode ? 'none' : 'block' } }
                  }}
                />
              </TableCell>
            </TableRow>
            {/* Department */}
            <TableRow>
              <TableCell sx={{ backgroundColor: '#f0f0f0'  }}>부서명</TableCell>
              <TableCell sx={{ padding: 1 }} >
                <TextField
                  fullWidth
                  variant="outlined"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  disabled={!editMode} // Disable if not in edit mode
                  InputProps={{
                    sx: { '& .MuiOutlinedInput-notchedOutline': { display: !editMode ? 'none' : 'block' } }
                  }}
                />
              </TableCell>
            </TableRow>
            {/* Position */}
            <TableRow>
              <TableCell sx={{ backgroundColor: '#f0f0f0'  }}>직급</TableCell>
              <TableCell sx={{ padding: 1 }} >
                <TextField
                  fullWidth
                  variant="outlined"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  disabled={!editMode} // Disable if not in edit mode
                  InputProps={{
                    sx: { '& .MuiOutlinedInput-notchedOutline': { display: !editMode ? 'none' : 'block' } }
                  }}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button color="primary" onClick={() => setEditMode(!editMode)}>
          {editMode ? '저장' : '수정'}
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
