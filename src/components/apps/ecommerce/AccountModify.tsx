import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableRow, Typography, InputLabel, Divider, TextField, Button, Snackbar } from '@mui/material';
import { updateUser } from '../../../store/apps/UserSlice'; 
import { AppDispatch, useDispatch } from '../../../store/Store';
import { UserType } from '../../../types/apps/account';
interface AccountDetailProps {
  selectedUserInfo: any;
}

const AccountModify: React.FC<AccountDetailProps> = ({ selectedUserInfo }) => {
  const dispatch: AppDispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const handleSave = () => {
    if (password !== confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
      return;
    }
    const userData: UserType = {
      id: selectedUserInfo.id,
      user_type: selectedUserInfo.accountType === 'trustee' ? 1 : 2,
      user_email: selectedUserInfo.email,
      nickname: selectedUserInfo.id,
      user_password: password,
      register_num: selectedUserInfo.businessNumber,
      company_address: selectedUserInfo.address,
      manager_name: selectedUserInfo.name,
      manager_phone: selectedUserInfo.phone,
      manager_depart: selectedUserInfo.department,
      manager_grade: selectedUserInfo.position,
      other: '', // 필요에 따라 설정
      admin_name: '', // 필요에 따라 설정
      admin_phone: '', // 필요에 따라 설정
    };
    
    // 비밀번호가 일치하면 사용자 정보를 업데이트합니다.
    dispatch(updateUser(userData))
      .then(() => {
        setSnackbarMessage('정보가 수정되었습니다.');
        setSnackbarOpen(true);
      })
      .catch((error) => {
        // 에러 처리
      });
    
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    // 저장 후 페이지 이동 로직을 추가할 수 있습니다.
  };

  return (
    <>
      <Table sx={{ flex: 1 }}>
        <TableBody>
          <Typography variant="h4" padding={1} marginTop={3}>기본정보</Typography>
          <Divider />
          <TableRow sx={{ padding: 1, border: '1px solid black' }}>
            <TableCell sx={{ backgroundColor: '#f0f0f0', width: '30%', border: '1px solid black' }}>
              <InputLabel htmlFor="id" sx={{ fontWeight: 'bold' }}>아이디</InputLabel>
            </TableCell>
            <TableCell sx={{ border: '1px solid black' }}>
              <TextField
                id="id"
                value={selectedUserInfo.id}
                disabled
                fullWidth
                InputProps={{
                  style: { backgroundColor: '#f0f0f0' } // 회색 음영 처리
                }}
              />
            </TableCell>
          </TableRow>

          <TableRow sx={{ padding: 1, border: '1px solid black' }}>
            <TableCell sx={{ backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center' }}>
              <InputLabel htmlFor="password" sx={{ fontWeight: 'bold' }}>비밀번호</InputLabel>
            </TableCell>
            <TableCell sx={{ padding: 1, border: '1px solid black' }}>
              <TextField
                id="password"
                type="password"
                fullWidth
                value={password}
                onChange={handlePasswordChange}
              />
            </TableCell>
          </TableRow>

          <TableRow sx={{ padding: 1, border: '1px solid black' }}>
            <TableCell sx={{ backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center' }}>
              <InputLabel htmlFor="confirmPassword" sx={{ fontWeight: 'bold' }}>비밀번호 확인</InputLabel>
            </TableCell>
            <TableCell sx={{ padding: 1, border: '1px solid black' }}>
              <TextField
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                fullWidth
                onChange={handleConfirmPasswordChange}
                error={!!passwordError}
                helperText={passwordError}
              />
            </TableCell>
          </TableRow>

          <Typography variant="h4" padding={1} marginTop={3}>회사정보</Typography>
          <TableRow sx={{ padding: 1, border: '1px solid black' }}>
            <TableCell sx={{ backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center' }}>
              <InputLabel htmlFor="name" sx={{ fontWeight: 'bold' }}>업체명</InputLabel>
            </TableCell>
            <TableCell sx={{ padding: 1, border: '1px solid black' }}>
              <TextField
                id="name"
                value={selectedUserInfo.name}
                disabled
                fullWidth
                InputProps={{
                  style: { backgroundColor: '#f0f0f0' } // 회색 음영 처리
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow sx={{ border: '1px solid black' }}>
            <TableCell sx={{ backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center' }}>
              <InputLabel htmlFor="businessNumber" sx={{ fontWeight: 'bold' }}>사업자 등록번호</InputLabel>
            </TableCell>
            <TableCell sx={{ padding: 1, border: '1px solid black' }}>
              <TextField
                id="businessNumber"
                value={selectedUserInfo.businessNumber}
                disabled
                fullWidth
                InputProps={{
                  style: { backgroundColor: '#f0f0f0' } // 회색 음영 처리
                }}
              />
            </TableCell>
          </TableRow>

          <TableRow sx={{ padding: 1, border: '1px solid black' }}>
            <TableCell sx={{ backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center' }}>
              <InputLabel htmlFor="address" sx={{ fontWeight: 'bold' }}>주소</InputLabel>
            </TableCell>
            <TableCell sx={{ padding: 1, border: '1px solid black' }}>
              <TextField
                id="address"
                fullWidth
                value={selectedUserInfo.address}
                onChange={(e) => console.log(e.target.value)} // 이벤트 핸들러 추가
              />
            </TableCell>
          </TableRow>

          <Typography variant="h4" padding={1} marginTop={3}>담당자 정보</Typography>
          <TableRow sx={{ padding: 1, border: '1px solid black' }}>
            <TableCell sx={{ backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center' }}>
              <InputLabel htmlFor="name" sx={{ fontWeight: 'bold' }}>이름</InputLabel>
            </TableCell>
            <TableCell sx={{ padding: 1, border: '1px solid black' }}>
              <TextField
                id="name"
                fullWidth
                value={selectedUserInfo.managerName}
                onChange={(e) => console.log(e.target.value)} // 이벤트 핸들러 추가
              />
            </TableCell>
          </TableRow>

          <TableRow sx={{ padding: 1, border: '1px solid black' }}>
            <TableCell sx={{ backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center' }}>
              <InputLabel htmlFor="phone" sx={{ fontWeight: 'bold' }}>연락처</InputLabel>
            </TableCell>
            <TableCell sx={{ padding: 1, border: '1px solid black' }}>
              <TextField
                id="phone"
                fullWidth
                value={selectedUserInfo.managerPhone}
                onChange={(e) => console.log(e.target.value)} // 이벤트 핸들러 추가
              />
            </TableCell>
          </TableRow>

          <TableRow sx={{ padding: 1, border: '1px solid black' }}>
            <TableCell sx={{ backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center' }}>
              <InputLabel htmlFor="department" sx={{ fontWeight: 'bold' }}>부서명</InputLabel>
            </TableCell>
            <TableCell sx={{ padding: 1, border: '1px solid black' }}>
              <TextField
                id="department"
                fullWidth
                value={selectedUserInfo.managerDepartment}
                onChange={(e) => console.log(e.target.value)} // 이벤트 핸들러 추가
              />
            </TableCell>
          </TableRow>

          <TableRow sx={{ padding: 1, border: '1px solid black' }}>
            <TableCell sx={{ backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center' }}>
              <InputLabel htmlFor="position" sx={{ fontWeight: 'bold' }}>직급</InputLabel>
            </TableCell>
            <TableCell sx={{ padding: 1, border: '1px solid black' }}>
              <TextField
                id="position"
                fullWidth
                value={selectedUserInfo.managerPosition}
                onChange={(e) => console.log(e.target.value)} // 이벤트 핸들러 추가
              />
            </TableCell>
          </TableRow>

          {/* 저장 및 취소 버튼 */}
          <TableRow> 
            <TableCell  colSpan={4}  align="right">
              <Button variant="contained" onClick={handleSave} sx={{mr:1}} >저장</Button>
              <Button variant="contained">취소</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {/* 스낵바 */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Snackbar 위치를 화면 가운데로 설정
      />

    </>
  );
};

export default AccountModify;
