import React, { useEffect, useState } from 'react';
import { Box,Dialog, DialogContent, DialogActions, Button, Divider, InputLabel, Table, TableBody, TableCell, TableRow, Typography, TextField } from '@mui/material';
import { useRouter } from 'next/router'; // Import useRouter from Next.js 
import { dispatch, useSelector } from '@src/store/Store';
import { UserType } from '@src/types/apps/account';
import { apiUrl } from '@src/utils/commonValues';
import axios from 'axios';
import { updateUser } from '@src/store/apps/UserSlice';
 
 

export default function AccountDetailTable() {
  const id = useSelector((state) => state.auth.user?.id);
  const [editMode, setEditMode] = useState(false); // State to track edit mode
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true); // State to track password match
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // State to show success popup
  const [showErrorPopup, setShowErrorPopup] = useState(false); // State to show error popup
  const [selectedUserInfo, setSelectedUserInfo] = useState<UserType>({
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
    id: ""
  }); // State to hold user info
  const router = useRouter(); // useRouter hook to handle navigation
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search); 
        // 파라미터에서 받아온 공지사항 정보 설정
        const API_URL = `http://${apiUrl}user`;
        const response = await axios.post(`${API_URL}/Detail`, { id: id });
        console.log(response);
        setSelectedUserInfo(response.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
        // Handle error if necessary
      }
    };
  
    fetchDetail();
  }, []);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSaveChanges = () => {
    // Check if passwords match
    if (newPassword !== '' && newPassword === confirmPassword) {
      dispatch(updateUser(selectedUserInfo))
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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box width={600}>
        <Table>
          <TableBody>
            <Typography variant="h4" padding={1} marginTop={3}>
              기본정보
            </Typography>
            <Divider />
            <TableRow sx={{ padding: 1, border: '1px solid black' }}>
              <TableCell sx={{ backgroundColor: '#f0f0f0', width: '30%', border: '1px solid black' }}>
                <InputLabel htmlFor="id" sx={{ fontWeight: 'bold' }}>
                  아이디
                </InputLabel>
              </TableCell>
              {/* Display user ID */}
              <TableCell sx={{ border: '1px solid black' }}>
                <Typography>{selectedUserInfo.id}</Typography>
              </TableCell>
            </TableRow>
            {/* Password row - only editable in edit mode */}
            {editMode && (
              <>
                <TableRow sx={{  border: '1px solid black' }}>
                  <TableCell sx={{ backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center' }}>
                    <InputLabel htmlFor="password" sx={{ fontWeight: 'bold' }}>
                      비밀번호
                    </InputLabel>
                  </TableCell>
                  <TableCell sx={{ padding: 0, border: '1px solid black' }}>
                    <TextField sx={{ px:1}} fullWidth type="password" value={newPassword} onChange={handlePasswordChange} />
                  </TableCell>
                </TableRow>

                {/* Confirm Password row */}
                <TableRow sx={{ padding: 1, border: '1px solid black' }}>
                  <TableCell sx={{ backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center' }}>
                    <InputLabel htmlFor="confirmPassword" sx={{ fontWeight: 'bold' }}>
                      비밀번호 확인
                    </InputLabel>
                  </TableCell>
                  <TableCell sx={{ padding: 0, border: '1px solid black' }}>
                    <TextField sx={{ px:1}} fullWidth type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                    {!passwordMatch && <Typography  sx={{ px:1}} variant="body2" color="error">비밀번호가 일치하지 않습니다.</Typography>}
                  </TableCell>
                </TableRow>
              </>
            )}
            {/* Email row */}
            <TableRow sx={{ padding: 1, border: '1px solid black' }}>
              <TableCell sx={{ backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center' }}>
                <InputLabel htmlFor="email" sx={{ fontWeight: 'bold' }}>
                  이메일
                </InputLabel>
              </TableCell>
              <TableCell sx={{ padding: 0, border: '1px solid black' }}>
                {editMode ? (
                  <TextField sx={{ px:1}} fullWidth value={selectedUserInfo.user_email} onChange={(e) => setSelectedUserInfo({ ...selectedUserInfo, user_email: e.target.value })} />
                ) : (
                  <Typography sx={{ px:2}}>{selectedUserInfo.user_email}</Typography>
                )}
              </TableCell>
            </TableRow>

            {/* Name row */}
            <TableRow sx={{ padding: 1, border: '1px solid black' }}>
              <TableCell sx={{ backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center' }}>
                <InputLabel htmlFor="name" sx={{ fontWeight: 'bold' }}>
                  이름
                </InputLabel>
              </TableCell>
              <TableCell sx={{ padding: 0, border: '1px solid black' }}>
                {editMode ? (
                  <TextField sx={{ px:1}} fullWidth value={selectedUserInfo.admin_name} onChange={(e) => setSelectedUserInfo({ ...selectedUserInfo, admin_name: e.target.value })} />
                ) : (
                  <Typography sx={{ px:2}}>{selectedUserInfo.admin_name}</Typography>
                )}
              </TableCell>
            </TableRow>

            {/* Phone row */}
            <TableRow sx={{ padding: 1, border: '1px solid black' }}>
              <TableCell sx={{ backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center' }}>
                <InputLabel htmlFor="phone" sx={{ fontWeight: 'bold' }}>
                  연락처
                </InputLabel>
              </TableCell>
              <TableCell sx={{ padding: 0, border: '1px solid black' }}>
                {editMode ? (
                  <TextField sx={{ px:1}} fullWidth value={selectedUserInfo.admin_phone} onChange={(e) => setSelectedUserInfo({ ...selectedUserInfo, admin_phone: e.target.value })} />
                ) : (
                  <Typography sx={{ px:2}}>{selectedUserInfo.admin_phone}</Typography>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginY: 2 }}>
        {editMode ? (
          <Button variant="contained" onClick={handleSaveChanges}>
            저장
          </Button>
        ) : (
          <Button variant="contained" onClick={() => setEditMode(true)}>
            수정
          </Button>
        )}
      </Box>
      </Box>
      
      {/* Success Popup */}
      {/* Success Dialog */}
      <Dialog open={showSuccessPopup} onClose={handleClosePopup}>
        <DialogContent>
          <Typography>정보가 수정되었습니다.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { handleClosePopup(); router.push('/account/account-my'); }}>OK</Button>
        </DialogActions>
      </Dialog>

      {/* Error Dialog */}
      <Dialog open={showErrorPopup} onClose={handleClosePopup}>
        <DialogContent>
          <Typography color="error">입력한 비밀번호가 일치하지 않습니다.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup}>OK</Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
}
