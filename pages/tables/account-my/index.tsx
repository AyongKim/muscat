import React, { useState } from 'react';
import { Box,Dialog, DialogContent, DialogActions, Button, Divider, InputLabel, Table, TableBody, TableCell, TableRow, Typography, TextField } from '@mui/material';
import { useRouter } from 'next/router'; // Import useRouter from Next.js

interface UserInfo {
  id: string;
  email: string;
  name: string;
  phone: string;
  password: string;
}

const initialUserInfo: UserInfo = {
  id: 'sampleId',
  email: 'example@example.com',
  name: 'John Doe',
  phone: '123-456-7890',
  password: 'password123',
};

export default function AccountDetailTable() {
  const [editMode, setEditMode] = useState(false); // State to track edit mode
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true); // State to track password match
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // State to show success popup
  const [showErrorPopup, setShowErrorPopup] = useState(false); // State to show error popup
  const [selectedUserInfo, setSelectedUserInfo] = useState<UserInfo>(initialUserInfo); // State to hold user info
  const router = useRouter(); // useRouter hook to handle navigation

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSaveChanges = () => {
    // Check if passwords match
    if (newPassword === confirmPassword) {
      // Perform the logic to update password
      // For demonstration, let's assume we're updating the password in a backend and then navigating back
      // Reset password fields and show success popup
      setNewPassword('');
      setConfirmPassword('');
      setShowSuccessPopup(true);
      setEditMode(false); // Exit edit mode after successful save
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
      <Box width={800}>
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
                <TableRow sx={{ padding: 1, border: '1px solid black' }}>
                  <TableCell sx={{ backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center' }}>
                    <InputLabel htmlFor="password" sx={{ fontWeight: 'bold' }}>
                      비밀번호
                    </InputLabel>
                  </TableCell>
                  <TableCell sx={{ padding: 1, border: '1px solid black' }}>
                    <TextField type="password" value={newPassword} onChange={handlePasswordChange} />
                  </TableCell>
                </TableRow>

                {/* Confirm Password row */}
                <TableRow sx={{ padding: 1, border: '1px solid black' }}>
                  <TableCell sx={{ backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center' }}>
                    <InputLabel htmlFor="confirmPassword" sx={{ fontWeight: 'bold' }}>
                      비밀번호 확인
                    </InputLabel>
                  </TableCell>
                  <TableCell sx={{ padding: 1, border: '1px solid black' }}>
                    <TextField type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                    {!passwordMatch && <Typography variant="body2" color="error">비밀번호가 일치하지 않습니다.</Typography>}
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
              <TableCell sx={{ padding: 1, border: '1px solid black' }}>
                {editMode ? (
                  <TextField value={selectedUserInfo.email} onChange={(e) => setSelectedUserInfo({ ...selectedUserInfo, email: e.target.value })} />
                ) : (
                  <Typography>{selectedUserInfo.email}</Typography>
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
              <TableCell sx={{ padding: 1, border: '1px solid black' }}>
                {editMode ? (
                  <TextField value={selectedUserInfo.name} onChange={(e) => setSelectedUserInfo({ ...selectedUserInfo, name: e.target.value })} />
                ) : (
                  <Typography>{selectedUserInfo.name}</Typography>
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
              <TableCell sx={{ padding: 1, border: '1px solid black' }}>
                {editMode ? (
                  <TextField value={selectedUserInfo.phone} onChange={(e) => setSelectedUserInfo({ ...selectedUserInfo, phone: e.target.value })} />
                ) : (
                  <Typography>{selectedUserInfo.phone}</Typography>
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
          <Button onClick={() => { handleClosePopup(); router.push('/'); }}>OK</Button>
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
