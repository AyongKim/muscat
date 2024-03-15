import { useState, useEffect } from "react";
import { Box, useMediaQuery, Theme } from "@mui/material";
import Breadcrumb from "@src/layouts/full/shared/breadcrumb/Breadcrumb";
import PageContainer from "@src/components/container/PageContainer"; 
import NoteContent from "./components/NoteContent";
import AppCard from "@src/components/shared/AppCard";
import { Drawer,  } from '@mui/material'; 
import NoteList from "./components/NoteList";
const drawerWidth = 660;

const BCrumb = [
  {
    to: "/",
    title: "메인",
  },
  {
    title: "메모발신이력",
  },
];

export default function Notes() {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(true);

  const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));

  useEffect(() => {
    if (lgDown) {
      setMobileSidebarOpen(!isMobileSidebarOpen);
    } else {
      setMobileSidebarOpen(true);
    }
  }, [lgDown]);
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

  return (
    <PageContainer>
      <Breadcrumb title="메모발신이력" items={BCrumb} />
      <AppCard> 
        <Box flexGrow={1}>
          <NoteList />
        </Box>
        {isMobileSidebarOpen ? (
          <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            zIndex: lgUp ? 0 : 1,
            [`& .MuiDrawer-paper`]: { position: 'relative' },
          }}
          open={isMobileSidebarOpen} 
          variant={lgUp ? 'persistent' : 'temporary'}
        >
          <NoteContent
           toggleNoteSidebar={() => setMobileSidebarOpen(!isMobileSidebarOpen)}
         />
        </Drawer>

          
        ) : (
          <></>
        )}

        
      </AppCard>
    </PageContainer>
  );
};

