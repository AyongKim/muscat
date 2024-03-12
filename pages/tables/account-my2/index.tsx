import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogTitle, Divider, InputLabel, Table, TableBody, TableCell, TableRow, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router'; // Import useRouter from Next.js

interface UserInfo {
  id: string;
  email: string;
  name: string;
  phone: string;
  password: string;
  businessName: string;
  businessRegistrationNumber: string;
  address: string;
  contactName: string;
  department: string;
  position: string;
}

const initialUserInfo: UserInfo = {
  id: 'sampleId',
  email: 'example@example.com',
  name: 'John Doe',
  phone: '123-456-7890',
  password: 'password123',
  businessName: 'Sample Business',
  businessRegistrationNumber: '1234567890',
  address: '123 Street, City, Country',
  contactName: 'Jane Doe',
  department: 'Sample Department',
  position: 'Sample Position',
};

export default function AccountDetailTable() {
  const [editMode, setEditMode] = useState(false); // State to track edit mode
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true); // State to track password match
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // State to show success popup
  const [showErrorPopup, setShowErrorPopup] = useState(false); // State to show error popup
  const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo); // State to hold user info
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
              <TableCell sx={{ border: '1px solid black' }}>
                <Typography>{userInfo.id}</Typography>
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
                    <TextField
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
                <InputLabel htmlFor="email" sx={{ fontWeight: 'bold' }}>
                  이메일
                </InputLabel>
              </TableCell>
              <TableCell sx={{ padding: 1, border: '1px solid black' }}>
                {editMode ? (
                  <TextField
                    type="text"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                  />
                ) : (
                  <Typography>{userInfo.email}</Typography>
                )}
              </TableCell>
            </TableRow>

            {/* Business Info */}
            <Typography variant="h4" padding={1} marginTop={3}>
              회사 정보
            </Typography>
            <TableRow sx={{ padding: 1, border: '1px solid black' }}>
              <TableCell sx={{ backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center' }}>
                <InputLabel htmlFor="businessName" sx={{ fontWeight: 'bold' }}>
                  업체명
                </InputLabel>
              </TableCell>
              <TableCell sx={{ padding: 1, border: '1px solid black' }}>
                {editMode ? (
                  <TextField
                    type="text"
                    value={userInfo.businessName}
                    onChange={(e) => setUserInfo({ ...userInfo, businessName: e.target.value })}
                  />
                ) : (
                  <Typography>{userInfo.businessName}</Typography>
                )}
              </TableCell>
            </TableRow>

            <TableRow sx={{ padding: 1, border: '1px solid black' }}>
              <TableCell sx={{ backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center' }}>
                <InputLabel htmlFor="businessRegistrationNumber" sx={{ fontWeight: 'bold' }}>
                  사업자 등록번호
                </InputLabel>
              </TableCell>
              <TableCell sx={{ padding: 1, border: '1px solid black' }}>
                <Typography>{userInfo.businessRegistrationNumber}</Typography>
              </TableCell>
            </TableRow>

            <TableRow sx={{ padding: 1, border: '1px solid black' }}>
              <TableCell sx={{ backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center' }}>
                <InputLabel htmlFor="address" sx={{ fontWeight: 'bold' }}>
                  주소
                </InputLabel>
              </TableCell>
              <TableCell sx={{ padding: 1, border: '1px solid black' }}>
                {editMode ? (
                  <TextField
                    type="text"
                    value={userInfo.address}
                    onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
                  />
                ) : (
                  <Typography>{userInfo.address}</Typography>
                )}
              </TableCell>
            </TableRow>

            {/* Contact Person Info */}
            <Typography variant="h4" padding={1} marginTop={3}>
              담당자 정보
            </Typography>
            <TableRow sx={{ padding: 1, border: '1px solid black' }}>
              <TableCell sx={{ backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center' }}>
                <InputLabel htmlFor="contactName" sx={{ fontWeight: 'bold' }}>
                  담당자 이름
                </InputLabel>
              </TableCell>
              <TableCell sx={{ padding: 1, border: '1px solid black' }}>
                {editMode ? (
                  <TextField
                    type="text"
                    value={userInfo.contactName}
                    onChange={(e) => setUserInfo({ ...userInfo, contactName: e.target.value })}
                  />
                ) : (
                  <Typography>{userInfo.contactName}</Typography>
                )}
              </TableCell>
            </TableRow>

            <TableRow sx={{ padding: 1, border: '1px solid black' }}>
              <TableCell sx={{ backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center' }}>
                <InputLabel htmlFor="phone" sx={{ fontWeight: 'bold' }}>
                  연락처
                </InputLabel>
              </TableCell>
              <TableCell sx={{ padding: 1, border: '1px solid black' }}>
                {editMode ? (
                  <TextField
                    type="text"
                    value={userInfo.phone}
                    onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                  />
                ) : (
                  <Typography>{userInfo.phone}</Typography>
                )}
              </TableCell>
            </TableRow>

            <TableRow sx={{ padding: 1, border: '1px solid black' }}>
              <TableCell sx={{ backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center' }}>
                <InputLabel htmlFor="department" sx={{ fontWeight: 'bold' }}>
                  부서명
                </InputLabel>
              </TableCell>
              <TableCell sx={{ padding: 1, border: '1px solid black' }}>
                {editMode ? (
                  <TextField
                    type="text"
                    value={userInfo.department}
                    onChange={(e) => setUserInfo({ ...userInfo, department: e.target.value })}
                  />
                ) : (
                  <Typography>{userInfo.department}</Typography>
                )}
              </TableCell>
            </TableRow>

            <TableRow sx={{ padding: 1, border: '1px solid black' }}>
              <TableCell sx={{ backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center' }}>
                <InputLabel htmlFor="position" sx={{ fontWeight: 'bold' }}>
                  직급
                </InputLabel>
              </TableCell>
              <TableCell sx={{ padding: 1, border: '1px solid black' }}>
                {editMode ? (
                  <TextField
                    type="text"
                    value={userInfo.position}
                    onChange={(e) => setUserInfo({ ...userInfo, position: e.target.value })}
                  />
                ) : (
                  <Typography>{userInfo.position}</Typography>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
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
      {/* Success Dialog
      <Dialog open={showSuccessDialog} onClose={handleCloseDialog}>
        <DialogTitle>정보가 수정되었습니다.</DialogTitle>
        <DialogActions>
          <Button onClick={() => { handleCloseDialog(); router.push('/'); }}>OK</Button>
        </DialogActions>
      </Dialog> 
      {/* <Dialog open={showErrorDialog} onClose={handleCloseDialog}>
        <DialogTitle>입력한 비밀번호가 일치하지 않습니다.</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDialog}>OK</Button>
        </DialogActions>
      </Dialog> */}  
    </Box>
  );
}
