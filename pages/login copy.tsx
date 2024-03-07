import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { TextField, Button, CircularProgress, Box, Typography } from '@mui/material';

// 로그인 요청 데이터와 응답 데이터의 타입을 정의합니다.
interface LoginRequestData {
  userEmail: string;
  userPasswd: string;
}

interface LoginResponseData {
  list: {
    loginResult: number;
    loginMessage: string;
    userData?: {
      userEmail: string;
    };
  };
}

// 폼 저장 요청 데이터의 타입을 정의합니다.
interface FormSaveData {
  [key: string]: any;
}

// 로그인 함수
const postLogin = async (data: LoginRequestData): Promise<LoginResponseData> => {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 폼 기본 제출 이벤트 방지
    setLoading(true);

    try {
      const response = await postLogin({ userEmail: email, userPasswd: password });
      if (response && response.list) {
        const { loginResult, loginMessage, userData } = response.list;
        if (loginResult === 1) {
          // 로그인 성공
          localStorage.setItem('loginUser', userData.userEmail);
          sessionStorage.setItem('accessTime', Date.now().toString());
          router.push('/');
        } else {
          // 로그인 실패
          setErrorMessage(loginMessage);
        }
      }
      setLoading(false);
    } catch (error) {
      console.error('onLogin', error);
      setErrorMessage('An error occurred while logging in.');
      setLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Box maxWidth={400}>
        <Typography variant="h4" component="h1" gutterBottom>Sign in</Typography>
        <form onSubmit={onLogin}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
          />
          {errorMessage && (
            <Typography color="error" gutterBottom>{errorMessage}</Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            fullWidth
          >
            {loading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
        </form>
      </Box>
    </Box>
  );
}
