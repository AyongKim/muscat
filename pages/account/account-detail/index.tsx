import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText,  DialogTitle, Divider, InputLabel, Table, TableBody, TableCell, TableRow, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router'; // Import useRouter from Next.js
import { apiUrl } from '../../../src/utils/commonValues';
import axios from 'axios'; 
import { UserType } from '../../../src/types/apps/account';
import { AppDispatch, useDispatch } from '../../../src/store/Store';
import { updateUser } from '../../../src/store/apps/UserSlice';
 
 

export default function AccountDetailTable() {
  const dispatch: AppDispatch = useDispatch();
  const [editMode, setEditMode] = useState(false); // State to track edit mode
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true); // State to track password match
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // State to show success popup
  const [showErrorPopup, setShowErrorPopup] = useState(false); // State to show error popup
  const [userInfo, setUserInfo] = useState<UserType>( {
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
  }); // State to hold user info
  const router = useRouter(); // useRouter hook to handle navigation


  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id') || ''; 
        // 파라미터에서 받아온 공지사항 정보 설정
        const API_URL = `http://${apiUrl}user`;
        const response = await axios.post(`${API_URL}/Detail`, { id: id });
        console.log(response);
        setUserInfo(response.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
        // Handle error if necessary
      }
    };
  
    fetchDetail();
  }, []); // 페이지 로드시 한번만 실행

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSaveChanges = () => {
    // Check if passwords match

    if (newPassword !=='' && newPassword === confirmPassword) { 
      // 비밀번호가 일치하면 사용자 정보를 업데이트합니다.
      dispatch(updateUser(userInfo))
        .then(() => {
          setNewPassword('');
          setConfirmPassword('');
          setShowSuccessPopup(true);
          setEditMode(false); // Exit edit mode after successful save
        })
        .catch((error) => {
          // 에러 처리
        });
      
    } else {
      // Show error popup if passwords don't match
      setPasswordMatch(false);
      setShowErrorPopup(true);
    }
  };

  const handleClosePopup = () => {
    // Close both success and error popups
    setShowSuccessPopup(false);
    setShowErrorPopup(false);
  };
2
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box component="form" width={600} >
        <Table>
          <TableBody>
            <Typography sx={{ml:1}} variant="h4" padding={1} marginTop={3}>
              기본정보
            </Typography>
            <Divider />
            <TableRow sx={{ padding: 1, border: '1px solid black' }}>
              <TableCell sx={{ backgroundColor: '#f0f0f0', width: '30%', border: '1px solid black' }}>
                <InputLabel  htmlFor="id" sx={{ fontWeight: 'bold' }}>
                  아이디
                </InputLabel>
              </TableCell>
              <TableCell sx={{ border: '1px solid black' }}>
                <Typography sx={{ml:1}}>{userInfo.user_id}</Typography>
              </TableCell>
            </TableRow>

            {/* Password row - only editable in edit mode */}
            {editMode && (
              <>
                <TableRow sx={{  border: '1px solid black' }}>
                  <TableCell sx={{ backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center' }}>
                    <InputLabel htmlFor="password" sx={{padding:1, fontWeight: 'bold' }}>
                      비밀번호
                    </InputLabel>
                  </TableCell>
                  <TableCell sx={{ padding: 0, border: '1px solid black' }}>
                    <TextField fullWidth required  sx={{padding:1}} type="password" value={newPassword} onChange={handlePasswordChange} />
                  </TableCell>
                </TableRow>

                {/* Confirm Password row */}
                <TableRow sx={{ padding: 0, border: '1px solid black' }}>
                  <TableCell sx={{ backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center' }}>
                    <InputLabel  htmlFor="confirmPassword" sx={{padding: 1, fontWeight: 'bold' }}>
                      비밀번호 확인
                    </InputLabel>
                  </TableCell>
                  <TableCell sx={{ padding: 1, border: '1px solid black' }}>
                    <TextField
                    fullWidth
                      type="password"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      error={!passwordMatch}
                      helperText={!passwordMatch && '비밀번호가 일치하지 않습니다.'}
                    />
                  </TableCell>
                </TableRow>
              </>
            )}
            {/* Email row */}
            <TableRow sx={{ padding: 1, border: '1px solid black' }}>
              <TableCell sx={{ backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center' }}>
                <InputLabel htmlFor="email" sx={{padding: 1, fontWeight: 'bold' }}>
                  이메일
                </InputLabel>
              </TableCell>
              <TableCell sx={{ padding: 1, border: '1px solid black' }}>
                {editMode ? (
                  <TextField
                  fullWidth
                    type="text"
                    value={userInfo.user_email}
                    onChange={(e) => setUserInfo({ ...userInfo, user_email: e.target.value })}
                  />
                ) : (
                  <Typography sx={{ml:1}}>{userInfo.user_email}</Typography>
                )}
              </TableCell>
            </TableRow>

            {/* Business Info */}
            <Typography sx={{ml:1}} variant="h4" padding={1} marginTop={3}>
              회사 정보
            </Typography>
            <TableRow sx={{ padding: 1, border: '1px solid black' }}>
              <TableCell sx={{ backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center' }}>
                <InputLabel htmlFor="businessName" sx={{ padding: 1,fontWeight: 'bold' }}>
                  업체명
                </InputLabel>
              </TableCell>
              <TableCell sx={{ padding: 1, border: '1px solid black' }}>
                {editMode ? (
                  <TextField
                  fullWidth
                    type="text"
                    value={userInfo.manager_name}
                    onChange={(e) => setUserInfo({ ...userInfo, manager_name: e.target.value })}
                  />
                ) : (
                  <Typography sx={{ml:1}}>{userInfo.manager_name}</Typography>
                )}
              </TableCell>
            </TableRow>

            <TableRow sx={{ padding: 1, border: '1px solid black' }}>
              <TableCell sx={{ backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center' }}>
                <InputLabel htmlFor="businessRegistrationNumber" sx={{padding: 1, fontWeight: 'bold' }}>
                  사업자 등록번호
                </InputLabel>
              </TableCell>
              <TableCell sx={{ padding: 1, border: '1px solid black' }}>
                <Typography sx={{ml:1}}>{userInfo.register_num}</Typography>
              </TableCell>
            </TableRow>

            <TableRow sx={{ padding: 1, border: '1px solid black' }}>
              <TableCell sx={{ backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center' }}>
                <InputLabel htmlFor="address" sx={{padding: 1, fontWeight: 'bold' }}>
                  주소
                </InputLabel>
              </TableCell>
              <TableCell sx={{ padding: 1, border: '1px solid black' }}>
                {editMode ? (
                  <TextField
                  fullWidth
                    type="text"
                    value={userInfo.company_address}
                    onChange={(e) => setUserInfo({ ...userInfo, company_address: e.target.value })}
                  />
                ) : (
                  <Typography sx={{ml:1}}>{userInfo.company_address}</Typography>
                )}
              </TableCell>
            </TableRow>

            {/* Contact Person Info */}
            <Typography sx={{ml:1}} variant="h4" padding={1} marginTop={3}>
              담당자 정보
            </Typography>
            <TableRow sx={{ padding: 1, border: '1px solid black' }}>
              <TableCell sx={{ backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center' }}>
                <InputLabel htmlFor="contactName" sx={{ padding: 1,fontWeight: 'bold' }}>
                  담당자 이름
                </InputLabel>
              </TableCell>
              <TableCell sx={{ padding: 1, border: '1px solid black' }}>
                {editMode ? (
                  <TextField
                  fullWidth
                    type="text"
                    value={userInfo.admin_name}
                    onChange={(e) => setUserInfo({ ...userInfo, admin_name: e.target.value })}
                  />
                ) : (
                  <Typography sx={{ml:1}}>{userInfo.admin_name}</Typography>
                )}
              </TableCell>
            </TableRow>

            <TableRow sx={{ padding: 1, border: '1px solid black' }}>
              <TableCell sx={{ backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center' }}>
                <InputLabel htmlFor="phone" sx={{ padding: 1,fontWeight: 'bold' }}>
                  연락처
                </InputLabel>
              </TableCell>
              <TableCell sx={{ padding: 1, border: '1px solid black' }}>
                {editMode ? (
                  <TextField
                  fullWidth
                    type="text"
                    value={userInfo.admin_phone}
                    onChange={(e) => setUserInfo({ ...userInfo, admin_phone: e.target.value })}
                  />
                ) : (
                  <Typography sx={{ml:1}}>{userInfo.admin_phone}</Typography>
                )}
              </TableCell>
            </TableRow>

            <TableRow sx={{ padding: 1, border: '1px solid black' }}>
              <TableCell sx={{ backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center' }}>
                <InputLabel htmlFor="department" sx={{padding: 1, fontWeight: 'bold' }}>
                  부서명
                </InputLabel>
              </TableCell>
              <TableCell sx={{ padding: 1, border: '1px solid black' }}>
                {editMode ? (
                  <TextField
                  fullWidth
                    type="text"
                    value={userInfo.manager_depart}
                    onChange={(e) => setUserInfo({ ...userInfo, manager_depart: e.target.value })}
                  />
                ) : (
                  <Typography sx={{ml:1}}>{userInfo.manager_depart}</Typography>
                )}
              </TableCell>
            </TableRow>

            <TableRow sx={{ padding: 1, border: '1px solid black' }}>
              <TableCell sx={{ backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center' }}>
                <InputLabel htmlFor="position" sx={{padding: 1, fontWeight: 'bold' }}>
                  직급
                </InputLabel>
              </TableCell>
              <TableCell sx={{ padding: 1, border: '1px solid black' }}>
                {editMode ? (
                  <TextField
                  fullWidth
                  
                    type="text"
                    value={userInfo.manager_grade}
                    onChange={(e) => setUserInfo({ ...userInfo, manager_grade: e.target.value })}
                  />
                ) : (
                  <Typography sx={{ml:1}}  >{userInfo.manager_grade}</Typography>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginY: 2 }}>
        {editMode ? (
          <Button onClick={handleSaveChanges} variant="contained" >
            저장
          </Button>
        ) : (
          <Button  variant="contained" onClick={() => setEditMode(true)}>
            수정
          </Button>
        )}
      </Box>
      </Box>
      
      {/* // Success Dialog */}
      <Dialog open={showSuccessPopup} onClose={handleClosePopup}>
        <DialogTitle></DialogTitle>
        <DialogContent sx={{width:200}} >
          <DialogContentText>정보가 수정되었습니다.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { handleClosePopup(); router.push('/apps/account-manager'); }}>OK</Button>
        </DialogActions>
      </Dialog> 
       <Dialog open={showErrorPopup} onClose={handleClosePopup}> 
        <DialogContent sx={{width:200}} >
          <DialogContentText>입력한 비밀번호가 일치하지 않습니다.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup}>OK</Button>
        </DialogActions>
      </Dialog> 
    </Box>
  );
}
