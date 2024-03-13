import { IconButton, Box, AppBar, useMediaQuery, Toolbar, styled, Stack, Typography } from '@mui/material';
import { useSelector, useDispatch } from '../../../../store/Store';
import { toggleSidebar, toggleMobileSidebar } from '../../../../store/customizer/CustomizerSlice';
import { IconMenu2 } from '@tabler/icons-react';
import Profile from './Profile';
import { AppState } from '../../../../store/Store';

const Header = () => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
  const lgDown = useMediaQuery((theme: any) => theme.breakpoints.down('lg'));

  // drawer
  const customizer = useSelector((state: AppState) => state.customizer);
  const dispatch = useDispatch();
  const user: string | undefined = useSelector((state) => state.auth.user?.email);
  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: customizer.TopbarHeight,
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        {/* ------------------------------------------- */}
        {/* Toggle Button Sidebar */}
        {/* ------------------------------------------- */}
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={lgUp ? () => dispatch(toggleSidebar()) : () => dispatch(toggleMobileSidebar())}
        >
          <IconMenu2 size="20" />
        </IconButton>

       
        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          <Typography>관리자 ({user})  으로 로그인되었습니다.</Typography>
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

export default Header;
