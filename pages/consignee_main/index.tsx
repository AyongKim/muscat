import { useEffect, useState } from 'react'; 
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
  MenuItem,
  TableHead,
  TableRow,
  Stack,
  Card,
  Icon,
  Divider,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog, DialogActions, DialogContent, DialogContentText,  DialogTitle, Fab, Link
} from '@mui/material';

import PageContainer from "@src/components/container/PageContainer";
import Status from "./component/Status"
import CustomSelect from '@src/components/forms/theme-elements/CustomSelect';
const axios = require('axios');
import { API_URL } from '@pages/constant';
import axiosPost from '@pages/axiosWrapper';
import ScheduleTimeLine from './scheduletimeline';
import DashboardCard from '@src/components/shared/DashboardCard';
import { InquiryType } from '@src/types/apps/inquiry';
import { IconPlus } from '@tabler/icons-react'; 
import { NoticeType } from '@src/types/apps/notice';

export default function Modern() {
  const [projectList, setProjectList] = useState([])
  const [project, setProject] = useState(0)
  const [noStatus, setNoStatus] = useState(false)

  const [inqs, setInqs] = React.useState<InquiryType[]>([]); 
  const [notice, setNotice] = React.useState<NoticeType[]>([]); 

  const [userData, setUserData] = useState({
    type: 0,
    user_id: 0,
    name: '',
    company_name: '',
  })

  const fetchProject = async() => {
    const str = sessionStorage.getItem('user')
    let data = JSON.parse(str);
    setUserData(data)

    const response = await axiosPost(`${API_URL}/project/List`, {
      consignee_id: data.user_id
    });
    setProjectList(response.data)
  }

  const fetchInqa = async () => { 
    try {
      const response = await axiosPost(`${API_URL}/inquiry/List`,{});
      if (response.status === 200) {
        // Handle successful response (status code 200)
        const { data } = response;
        // Assuming the data structure matches the Model for success
        // You can access individual fields like data.id, data.title, etc.
        
        setInqs(data.slice(0, Math.min(2, data.length)  )); 
      } else if (response.status === 400) {
        // Handle failed response (status code 400)
        const { result, reason, error_message } = response.data;
        // You can use the error information to display an appropriate message
        console.error(`API request failed: ${reason} - ${error_message}`);
      }
    } catch (error:any) {
      // Handle any other errors (e.g., network issues, invalid URL, etc.)
      console.error('Error fetching data from API:', error.message);
    }
  };
  const fetchNotices = async() => {
    const response = await axiosPost(`${API_URL}/notice/List` ,{});
    
    const str = sessionStorage.getItem('user')
    let data = JSON.parse(str); 
    // if (data.type == 1) {
    //   fetchProjectsByConsignee(data.user_id, response.data)
    // } else if (data.type == 2 ) {
    //   fetchProjectsByConsignor(data.user_id, response.data)
    // } else{ 
    //   setNotice(response.data.slice(0, Math.min(2, response.data.length)  ));   
    // }
  }

  useEffect(() => {
    fetchProject()
    fetchInqa(); 
    fetchNotices();
  }, []);

  const [status, setStatus] = useState('')

  const fetchDetail = async () => {
    let response = await axiosPost(`${API_URL}/project_detail/Status`, {
      project_id: project,
      consignee_id: userData.user_id
    });

    setStatus(response.data)

    if (response.data.status) {
      setNoStatus(false)
    }
    else {
      setModalMsg('"' + userData.company_name + '"담당자님, 환영합니다!\n 점검 진행에 앞서 일반 현황 정보를 입력해주세요.')
      setShowModal(true)
      setNoStatus(true)
    }
  }

  useEffect(() => {
    if (project)
      fetchDetail()
    else
      setNoStatus(false)
  }, [project])

  const [showModal, setShowModal] = React.useState(false)
  const [modalMsg, setModalMsg] = React.useState('')
  const onClose = () => {
    setShowModal(false)
  }

  return (
    <PageContainer>
      <Box>
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <Typography sx={{mr:1}}>
            프로젝트명:
          </Typography>
          <CustomSelect
            labelId="month-dd"
            id="month-dd"
            size="small" 
            value={project}
            sx={{width:150, mr:2}}
            onChange = {(e:any) => {
              setProject(e.target.value);
            }}
          >
            {projectList.map((x, index) => {
              return (
                <MenuItem value={x.project_id} key = {index}>{x.name}</MenuItem>
              );
            })
            }
          </CustomSelect>
        </Box>


        {noStatus && <Status project={project} setNoStatus={setNoStatus}/>}
        <Dialog open={showModal} onClose={onClose}>
          <DialogTitle></DialogTitle>
          <DialogContent sx={{width:370}} >
            <DialogContentText sx={{wordWrap:'break-word', whiteSpace:'break-spaces', textAlign: 'center', fontSize: 19}}>{modalMsg}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { onClose(); }}>OK</Button>
          </DialogActions>
        </Dialog> 
       
        <Grid container spacing={3}>
          {/* column */}
          <Grid item xs={4} lg={4}>
            <ScheduleTimeLine/>
          </Grid> 
          <Grid container xs={8} lg={8}>  
          <Grid item xs={2} lg={2}>
            <Card sx={{ p: 3, border: 1, borderColor: 'black' }} variant={'outlined'}>
                <Typography 
                  variant="subtitle1"
                  fontWeight={600}
                >
                  점검 바로가기
                </Typography> 
            </Card>
          </Grid> 
          <Grid item xs={2} lg={2}>
            <Card sx={{ p: 3, border: 1, borderColor: 'black' }} variant={'outlined'}>
                <Typography 
                  variant="subtitle1"
                  fontWeight={600}
                >
                  개별 일정 캘린더
                </Typography> 
            </Card>
          </Grid> 
          <Grid item xs={2} lg={2}>
            <Card sx={{ p: 3, border: 1, borderColor: 'black' }} variant={'outlined'}>
                <Typography 
                  variant="subtitle1"
                  fontWeight={600}
                >
                  점검 결과 확인
                </Typography> 
            </Card>
          </Grid>  
          <Grid item xs={2} lg={2}>
            <Card sx={{ p: 3, border: 1, borderColor: 'black' }} variant={'outlined'}>
                <Typography 
                  variant="subtitle1"
                  fontWeight={600}
                >
                  문의하기
                </Typography> 
            </Card>
          </Grid>  
          
            <Grid item xs={4} lg={4}>
            <DashboardCard
                title="문의 내역"
                action={
                  <Fab color="secondary" size="small" component={Link}  href="/inquiry">
                    <IconPlus width={24} />
                  </Fab>
                } 
              >
                <List style={{ display: 'block' }}>
                    {inqs.map((inq: InquiryType, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={
                            <Box display={'flex'} justifyContent={'space-between'}>
                              <Typography variant="subtitle1" component="span" color="textPrimary" sx={{maxWidth:150}} >
                                {inq.title}
                              </Typography>
                              <Typography variant="body2" component="span" color="textSecondary" style={{   marginLeft: 8 }}>
                                {inq.created_date}
                              </Typography>
                            </Box>
                          } 
                        />
                      </ListItem>
                    ))}
                  </List>
              </DashboardCard> 
            </Grid>
            <Grid item xs={4} lg={4}>
              <DashboardCard
                title="공지사항"
                action={
                  <Fab color="secondary" size="small" component={Link}  href="/noticelist">
                    <IconPlus width={24} />
                  </Fab>
                } 
              >
                <List style={{ display: 'block' }}>
                    {notice.map((note: NoticeType, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={
                            <Box display={'flex'} justifyContent={'space-between'}>
                              <Typography variant="subtitle1" component="span" color="textPrimary" sx={{maxWidth:150}} >
                                {note.title}
                              </Typography>
                              <Typography variant="body2" component="span" color="textSecondary" style={{   marginLeft: 8 }}>
                                {note.create_by}
                              </Typography>
                            </Box>
                          } 
                        />
                      </ListItem>
                    ))}
                  </List>
              </DashboardCard>
            </Grid>
            
          </Grid>
         
          </Grid>
      </Box>
    </PageContainer>
  );
};

