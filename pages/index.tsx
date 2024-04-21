import { useEffect, useState } from 'react'; 
import { useRouter } from 'next/router';
import React from "react";
import {
  Typography,
  Box,
  Grid,
  LinearProgress,
  Avatar,
  Chip,
  Paper,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  Card,
  Icon,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import PageContainer from "../src/components/container/PageContainer";

import TopCards from "../src/components/dashboards/modern/TopCards"; 
import TopPerformers from "../src/components/dashboards/modern/TopPerformers";
import Welcome from "../src/layouts/full/shared/welcome/Welcome";  

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { blue, yellow } from '@mui/material/colors';
 


interface ListItemData {
  primary: string;
  secondary: string;
  isNew?: boolean;
}

const CustomListItem: React.FC<ListItemData> = ({ primary, secondary, isNew }) => {
  return (
    <ListItem>
      <ListItemIcon>
        {/* 아이콘을 여기에 삽입합니다. 예를 들어, 폴더 아이콘을 사용할 수 있습니다. */}
        <Icon>folder</Icon>
      </ListItemIcon>
      <ListItemText primary={primary} secondary={secondary} />
      {isNew && (
        <Typography color="error" variant="caption" style={{ marginLeft: 'auto' }}>
          New
        </Typography>
      )}
    </ListItem>
  );
};
interface StatusProps {
  label: string;
  count: number;
  bgcolor: string;
}
const StatusItem: React.FC<StatusProps> = ({ label, count, bgcolor }) => {
  return (
    <Grid container alignItems="center" style={{ backgroundColor: bgcolor,  }}>
      <Grid item xs={6} style={{padding:8}}>
        <Typography variant="subtitle1">{label}</Typography>
      </Grid>
      <Divider
        orientation="vertical"
        flexItem
        sx={{
          borderColor: 'gray',
          borderWidth: 0.1, 
          borderStyle: 'dashed'
        }}
      />
      <Grid item xs={5} style={{padding:8}}>
        
        <Typography variant="h6" style={{ textAlign: 'right' }}>{`${count} 건`}</Typography>
      </Grid>
    </Grid>
  );
};
const StatusCard: React.FC = () => {
  const listItems: ListItemData[] = [
    { primary: '처리중', secondary: '2023.12.xx', isNew: true },
    { primary: '처리중', secondary: '2023.12.xx' },
    { primary: '처리중', secondary: '2023.12.xx' },
    // ... 추가 아이템
  ];
  const [open, setOpen] = React.useState(true);

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 300,  
        borderRadius: '16px', // 라운드 외곽선 반경 설정
        overflow: 'hidden', // 자식 요소가 반경을 넘어가지 않도록 설정
        border: '1px solid #aaaaaa', // 외곽선 색상과 두께 설정
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', backgroundColor: blue[100], padding: 8 }}>
        
        <Typography variant="h6" style={{ flexGrow: 1, textAlign: 'center' }}>
          결산 중
        </Typography>
        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </div>
      <Divider />
      
        
        <Collapse in={open} timeout="auto" unmountOnExit> 
        <StatusItem label="처리 중 접수" count={5} bgcolor="lightblue" />
        <Divider  flexItem />
        <StatusItem label="이해 접수" count={3} bgcolor="lightblue" />
          <List>
            {listItems.map((item, index) => (
              <CustomListItem key={index} {...item} />
            ))}
          </List>
      </Collapse> 
    </Paper>
  );
};

 
export default function Modern() {
  const router = useRouter();

  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const str = sessionStorage.getItem('user')
    const type = JSON.parse(str).type

    if (type == 1) {
      router.replace('/consignee_main')
    }
    setLoading(false);
  }, []);

  return (
    <PageContainer>
      <Box>
        
        <Grid container spacing={3}>
          {/* column */}
            <Grid item xs={6} lg={6}>
               
                <Typography variant="body1">40%</Typography>
                <LinearProgress variant="determinate" value={40} sx={{ height: '50px', borderRadius: '10px', marginTop: '10px' }} />
             
              <TopCards />
            </Grid>
            <Grid item xs={6} lg={6}>
               
                <Typography variant="body1">20%</Typography>
                <LinearProgress variant="determinate" value={20} sx={{ height: '50px', borderRadius: '10px', marginTop: '10px' }} />
             
              <TopCards />
            </Grid>
            <Grid item xs={3} lg={3}   > 
              <StatusCard/>
            </Grid>
            
        </Grid>
        
        {/* column */}
        <Welcome />
      </Box>
    </PageContainer>
  );
};

