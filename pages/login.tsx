import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';
// import {  sendAuthEmail } from '../utils/commonFunctions'; // sendAuthEmail은 인증 이메일을 보내는 함수입니다.
import { postLogin, saveForm } from '../src/store/login'
import { nowEpoch } from '../src/utils/commonFunctions'

interface LoginResponse {
  loginResult: number;
  loginMessage: string;
  userData?: {
    userEmail: string;
  };
  authRequired?: boolean;
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [authSent, setAuthSent] = useState(false);
  const [timer, setTimer] = useState<number>(0);
  const router = useRouter();
  const dispatch = useDispatch()
 

  const resetLogin = () => {
    setLoginAttempts(0);
    setErrorMessage('');
    setEmail('');
    setPassword('');
    setAuthCode('');
    setLoading(false);
    setTimer(0);
  };

  useEffect(() => {
    if (authSent) {
      // 5분 타이머 설정
      const countdown = setInterval(() => {
        setTimer((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);

      // 타이머 종료 시 인증번호 만료 처리
      if (timer === 0) {
        clearInterval(countdown);
        setErrorMessage('인증번호 입력시간이 경과했습니다. 다시 로그인해 주세요.');
        setAuthSent(false);
      }

      return () => clearInterval(countdown);
    }
  }, [authSent, timer]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (loginAttempts >= 5) {
      setErrorMessage('로그인 시도 횟수 초과');
      setLoading(false);
      return;
    }
    setLoading(true);

    try {
      console.log(email, password);
      // postLogin은 로그인 요청을 보내는 비동기 함수입니다. 실제 구현 필요.
       let response: { [key: string]: any } = await dispatch(postLogin({ email: email, password: password }));
       console.log(response)
       response = response.data;

       if (response.loginResult === 1 && response.authRequired) {
         setErrorMessage('이메일 주소로 인증번호가 전송되었습니다.');
         setTimer(nowEpoch());
         // sendAuthEmail은 인증번호를 이메일로 전송하는 함수입니다. 실제 구현 필요.
         //sendAuthEmail(email);
       } else if (response.loginResult === 1) {
         // 로그인 성공 로직
         localStorage.setItem('loginUser', response.userData!.userEmail);
         sessionStorage.setItem('accessTime', nowEpoch().toString());
         router.push('/');
       } else {
         setLoginAttempts(prev => prev + 1);
         setErrorMessage(`입력하신 정보가 맞지 않습니다.(남은 횟수: ${5 - loginAttempts}번)`);
       }
    } catch (error) {
      console.error('Login error', error);
      setErrorMessage('서버와의 연결에 실패했습니다.');
    }

    setLoading(false);
  };

  const verifyAuthCode = async () => {
    // verifyAuthCode는 인증번호를 검증하는 비동기 함수입니다. 실제 구현 필요.
    // const isValid = await verifyAuthCode(email, authCode);

    // if (isValid) {
    //   // 인증 성공 로직
    //   localStorage.setItem('loginUser', email);
    //   sessionStorage.setItem('accessTime', nowEpoch().toString());
    //   router.push('/');
    // } else {
    //   setErrorMessage('인증번호가 틀립니다. 다시 입력해주세요.');
    // }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
      <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
        <Typography component="h1" variant="h5">로그인</Typography>
        <TextField margin="normal" required fullWidth id="email" label="이메일 주소" name="email" autoComplete="email" autoFocus value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField margin="normal" required fullWidth name="password" label="비밀번호" type="password" id="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {authSent && (
          <>
            <TextField margin="normal" required fullWidth name="authCode" label="인증번호" type="text" id="authCode" value={authCode} onChange={(e) => setAuthCode(e.target.value)} />
            <Typography variant="body2">남은 시간: {Math.floor(timer / 60)}:{('0' + (timer % 60)).slice(-2)}</Typography>
          </>
        )}
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : '로그인'}
        </Button>
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      </Box>
    </Box>
  );
}; 
