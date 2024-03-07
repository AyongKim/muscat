import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { AppProps } from 'next/app';
import { Provider, useSelector } from 'react-redux';
import { store, AppState } from '../src/store/Store'; // 경로에 주의하세요.
import createEmotionCache from '../src/createEmotionCache'; 
import NextNProgress from 'nextjs-progressbar';
import { Box, CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
import { ThemeSettings } from '../src/theme/Theme';
import BlankLayout from "../src/layouts/blank/BlankLayout";
import FullLayout from "../src/layouts/full/FullLayout";
import "../src/utils/i18n";
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
const layouts: any = {
  Blank: BlankLayout,
};
const MyApp = (props: MyAppProps) => {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
  }: any = props;
  const theme = ThemeSettings();
  const Layout = layouts[Component.layout] || FullLayout;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isAuthenticated = useSelector((state: AppState) => state.auth.isAuthenticated);
  useEffect(() => {
    // 로딩 시간을 설정하여 앱이 초기화 될 때까지 기다립니다.
    setTimeout(() => setLoading(true), 1000);
    // 로그인 상태가 아니라면 로그인 페이지로 리다이렉션
    // if (!isAuthenticated && router.pathname !== '/login') {
    //   router.push('/login');
    // }
  }, [isAuthenticated, router]);

  return ( 
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <title>Modernize NextJs Admin template</title>
        </Head>
        <NextNProgress color="#5D87FF" />
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {loading ? (
             <Layout>
              <Component {...pageProps} />
            </Layout>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100vh",
              }}
            >
              <CircularProgress />
            </Box>
          )}
        </ThemeProvider>
      </CacheProvider> 
  );
};

export default (props: MyAppProps) => (
  <Provider store={store}>
    <MyApp {...props} />
  </Provider>
);

