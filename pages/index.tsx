import { useEffect, useState } from 'react'; 
import { useRouter } from 'next/router';
import React from "react";
import {
  Typography,
  Box,
  Grid,
  LinearProgress, 
  Paper,
  Collapse,
  IconButton, 
  Divider,
  List,
  ListItem, 
  ListItemText,
  Fab,
  MenuItem,
} from '@mui/material';

import PageContainer from "../src/components/container/PageContainer";

import TopCards from "../src/components/dashboards/modern/TopCards"; 
import TopPerformers from "../src/components/dashboards/modern/TopPerformers";
import Welcome from "../src/layouts/full/shared/welcome/Welcome";  

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { blue, yellow } from '@mui/material/colors';
import AppCard from '@src/components/shared/AppCard';
import DashboardWidgetCard from '@src/components/shared/DashboardWidgetCard';
import DashboardCard from '@src/components/shared/DashboardCard';
import { IconPlus } from '@tabler/icons-react';
import { InquiryType } from '@src/types/apps/inquiry';
import ChildCard from '@src/components/shared/ChildCard';
import axios from 'axios';
import { apiUrl } from '@src/utils/commonValues';
import { API_URL } from './constant';
import { NoticeType } from '@src/types/apps/notice';
import Link from '@src/components/shared/Link';
import CustomSelect from '@src/components/forms/theme-elements/CustomSelect';
interface ListItemData {
  primary: string;
  secondary: string;
  isNew?: boolean;
}

const CustomListItem: React.FC<ListItemData> = ({ primary, secondary, isNew }) => {
  return (
    <ListItem> 
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
const IssueCard: React.FC = () => {
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
          이슈사항
        </Typography>
        <Typography variant="h6" style={{ flexGrow: 1, textAlign: 'center' }}>
          7 건
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

const DelayCard: React.FC = () => {
  const listItems: ListItemData[] = [
    { primary: '계정 미생성', secondary: '2023.12.xx', isNew: true },
    { primary: '자가점검 미제출', secondary: '2023.12.xx' },
    { primary: '보완자료 미제출', secondary: '2023.12.xx' },
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
          지연
        </Typography>
        <Typography variant="h6" style={{ flexGrow: 1, textAlign: 'center' }}>
          7 건
        </Typography>
        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </div>
      <Divider /> 
        <Collapse in={open} timeout="auto" unmountOnExit> 
        <StatusItem label="계정 미생성" count={5} bgcolor="lightblue" />
        <Divider  flexItem />
        <StatusItem label="자가점검 미제출" count={3} bgcolor="lightblue" />
        <Divider  flexItem />
        <StatusItem label="보완자료 미제출" count={3} bgcolor="lightblue" />

        <Typography variant="h6">
          총 7 건
        </Typography>
          <List>
            {listItems.map((item, index) => (
              <CustomListItem key={index} {...item} />
            ))}
          </List>
      </Collapse> 
    </Paper>
  );
};



const CheckingCard: React.FC = () => {
  const listItems: ListItemData[] = [
    { primary: '계정 미생성', secondary: '2023.12.xx', isNew: true },
    { primary: '자가점검 미제출', secondary: '2023.12.xx' },
    { primary: '보완자료 미제출', secondary: '2023.12.xx' },
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
          검수중
        </Typography>
        <Typography variant="h6" style={{ flexGrow: 1, textAlign: 'center' }}>
          7 건
        </Typography>
        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </div>
      <Divider /> 
        <Collapse in={open} timeout="auto" unmountOnExit> 
        <StatusItem label="계정 미생성" count={5} bgcolor="lightblue" />
        <Divider  flexItem />
        <StatusItem label="자가점검 미제출" count={3} bgcolor="lightblue" />
        <Divider  flexItem />
        <StatusItem label="보완자료 미제출" count={3} bgcolor="lightblue" />

        <Typography variant="h6">
          총 7 건
        </Typography>
          <List>
            {listItems.map((item, index) => (
              <CustomListItem key={index} {...item} />
            ))}
          </List>
      </Collapse> 
    </Paper>
  );
};



const ScheduleCheckCard: React.FC = () => {
  const listItems: ListItemData[] = [
    { primary: '계정 미생성', secondary: '2023.12.xx', isNew: true },
    { primary: '자가점검 미제출', secondary: '2023.12.xx' },
    { primary: '보완자료 미제출', secondary: '2023.12.xx' },
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
          일정 체크
        </Typography>
        <Typography variant="h6" style={{ flexGrow: 1, textAlign: 'center' }}>
          7 건
        </Typography>
        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </div>
      <Divider /> 
        <Collapse in={open} timeout="auto" unmountOnExit> 
        <StatusItem label="계정 미생성" count={5} bgcolor="lightblue" />
        <Divider  flexItem />
        <StatusItem label="자가점검 미제출" count={3} bgcolor="lightblue" />
        <Divider  flexItem />
        <StatusItem label="보완자료 미제출" count={3} bgcolor="lightblue" />

        <Typography variant="h6">
          총 7 건
        </Typography>
          <List>
            {listItems.map((item, index) => (
              <CustomListItem key={index} {...item} />
            ))}
          </List>
      </Collapse> 
    </Paper>
  );
};



export default function MainPage() {
  const router = useRouter(); 
  const [isLoading, setLoading] = useState(true);
  const [inqs, setInqs] = React.useState<InquiryType[]>([]); 
  const [notice, setNotice] = React.useState<NoticeType[]>([]); 
  const [approveCount, setApproveCount] = useState(0);
  const [projects, setProjects] = useState([]); 
  const [admins, setAdmins] = useState([])
  const [admin, setAdmin] = useState(0) 
  const [project_id, setProject] = useState(1)

  const [totalCount1, setTotalCount1] = useState(0) //최초점검완료총개수
  const [totalCount2, setTotalCount2] = useState(0) //이행점검완료총개수
  const [totalCompCount1, setTotalCompCount1] = useState(0) //최초점검완료완료개수
  const [totalCompCount2, setTotalCompCount2] = useState(0) //이행점검완료완료개수
  const [issueCount1, setIssueCount1] = useState(0) 
  const [issueCount2, setIssueCount2] = useState(0) 
  const [delayCount1, setDelayCount1] = useState(0) 
  const [delayCount2, setDelayCount2] = useState(0) 
  const [exceptCount1, setExceptCount1] = useState(0) 
  const [exceptCount2, setExceptCount2] = useState(0) 
  const [prepareCount1, setPrepareCount1] = useState(0) 
  const [prepareCount2, setPrepareCount2] = useState(0) 
  const [checkingCount1, setCheckingCount1] = useState(0) 
  const [checkingCount2, setCheckingCount2] = useState(0) 
  const [completeCount1, setCompleteCount1] = useState(0) 
  const [completeCount2, setCompleteCount2] = useState(0) 

  const [issueDetail, setIssueDetail] = useState([]) 
  const [delayDetail, setDelayDetail] = useState([]) 
  const [checkingDetail, setCheckingDetail] = useState([]) 
  const [scheduleCheckDetail, setScheduleCheckDetail] = useState([]) 

  const [projectDetail, setProjectDetail] = useState({
    id: 0,
    create_date: '',
    self_check_date: '',
    imp_check_date: '',
    delay: {
      create: [],
      self_check: [],
      imp_check: []
    },
    set: false,
  })
  const [userData, setUserData] = React.useState({
    type: 0,
    user_id: 0,
    name: ''
  });
  useEffect(() => {
    const str = sessionStorage.getItem('user')
    let data = JSON.parse(str);
    setUserData(data)
    const type = data.type
    if (type == 1) {
      router.replace('/consignee_main')
    }
    fetchAdmins(); 
    fetchInqa();
    fetchProjects();
    fetchNotices();
    fetchApproveCount();
    setLoading(false);

  }, []);
  useEffect(() => { 
    fetchDetail(); 
  }, [project_id]);
  const fetchAdmins = async() => {
    const response = await axios.post(`${API_URL}/project/Users`);
    let data = response.data
    setAdmins(data.admin)
    if (data.admin.length > 0)
      setAdmin(data.admin[0].user_id)
  }
  const fetchProjects = async() => {
    const response = await axios.post(`${API_URL}/project/List`, {
      admin_id: admin
    });
    setProjects(response.data)
  }
  const fetchDetail = async() => {
    let response;
    if (userData.type == 1) {
      response = await axios.post(`${API_URL}/project/Detail`, {
        project_id: project_id,
        consignee_id: userData.user_id
      });  
    }
    else if (userData.type == 2) {
      response = await axios.post(`${API_URL}/project/Detail`, {
        project_id: project_id, 
      }); 
    }
    else {
      response = await axios.post(`${API_URL}/projec.t/Detail`, {
        project_id: project_id,
        // admin_id: admin,
      }); 
    }

    let delay = response.data.delay

    if (delay)
      delay = JSON.parse(delay);
    else
      delay = {
        create: [],
        self_check: [],
        imp_check: []
      }

    setProjectDetail({...response.data, delay: delay, set: true})

    setTotalCount1(response.data.filter((x:any) => x.state == 1).length)
    setTotalCount2(response.data.filter((x:any) => x.state == 2).length)
    setTotalCompCount1(response.data.filter((x:any) => x.state == 1 && x.sub_state == 3 ).length )//수정필요
    setTotalCompCount2(response.data.filter((x:any) => x.state == 2 && x.sub_state == 3).length)//수정필요
    setIssueCount1(response.data.filter((x:any) => x.state == 2 && x.issue_id != "").length)//수정필요
    setIssueCount2(response.data.filter((x:any) => x.state == 1 && x.issue_id != "").length)//수정필요
    setDelayCount1(0)//수정필요
    setDelayCount2(0)//수정필요
    setExceptCount1(response.data.filter((x:any) => x.state == 3).length)
    setExceptCount2(response.data.filter((x:any) => x.state == 3).length)
    setPrepareCount1(response.data.filter((x:any) => x.state == 1 && x.sub_state == 1).length)
    setPrepareCount2(response.data.filter((x:any) => x.state == 2 && x.sub_state == 1).length)
    setCheckingCount1(response.data.filter((x:any) => x.state == 1 && x.sub_state == 2).length)
    setCheckingCount2(response.data.filter((x:any) => x.state == 2 && x.sub_state == 2).length)
    setCompleteCount1(response.data.filter((x:any) => x.state == 1 && x.sub_state == 3 ).length )
    setCompleteCount2(response.data.filter((x:any) => x.state == 2 && x.sub_state == 3 ).length )
    setIssueDetail( response.data.filter((x:any) => x.state == 2 && x.issue_id != "") ) 
    // setDelayDetail(  )
    setCheckingDetail(response.data.filter((x:any) => x.state == 1 && x.sub_state == 2))
    setScheduleCheckDetail(response.data.filter((x:any) => x.state == 1 && x.sub_state == 2)) //수정필요
  }

  const fetchApproveCount = async() => {
    const response = await axios.post(`${API_URL}/user/ApprovalList`);
    setApproveCount(response.data.filter((x:any) => x.approval == 0).length);
  }
  const fetchInqa = async () => {
    const API_URL = `http://${apiUrl}inquiry`;
    try {
      const response = await axios.post(`${API_URL}/List`);
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
    } catch (error) {
      // Handle any other errors (e.g., network issues, invalid URL, etc.)
      console.error('Error fetching data from API:', error.message);
    }
  };
  const fetchProjectsByConsignee = async (id:any, notices:any) => {
    const response = await axios.post(`${API_URL}/project/List`, {
      consignee_id: id, 
    }); 
    const projects = response.data;   
    const noticeFilter = notices.filter((x:any) => projects.some((project:any) => project.project_id === x.project_id || '전체' === x.project_name));
    console.log(noticeFilter) 
    setNotice(noticeFilter.slice(0, Math.min(2, noticeFilter.length)  ));  
  };
  const fetchProjectsByConsignor = async (id:any, notices:any) => { 
    const response = await axios.post(`${API_URL}/project/List`, { 
      consignor_id: id
    }); 
    const projects = response.data;   
    const noticeFilter = notices.filter((x:any) => projects.some((project:any) => project.project_id === x.project_id || '전체' === x.project_name));
    setNotice(noticeFilter.slice(0, Math.min(2, noticeFilter.length)  ));  
  };
  const fetchNotices = async() => {
    const response = await axios.post(`${API_URL}/notice/List` ,{});
    
    const str = sessionStorage.getItem('user')
    let data = JSON.parse(str); 
    if (data.type == 1) {
      fetchProjectsByConsignee(data.user_id, response.data)
    } else if (data.type == 2 ) {
      fetchProjectsByConsignor(data.user_id, response.data)
    } else{ 
      setNotice(response.data.slice(0, Math.min(2, response.data.length)  ));   
    }
  }
  return (
    <PageContainer>
      <Box>
      <Box display={'flex'} sx={{margin:1}} alignItems="center"> 
          <Typography sx={{mr:1}} >담당자 명</Typography>
          <CustomSelect
            id="account-type-select"
            sx={{mr:4}}
            value={admin} 
            onChange={(event:any) => {
              setAdmin(event.target.value)}}
          >
            {admins.map((x, i) => {
                return (
                <MenuItem key={i} value={x.user_id}>{x.name}</MenuItem>
              );
            })
            }
          </CustomSelect>
        <Typography sx={{mr:1}} >프로젝트 명</Typography>
        <CustomSelect
          id="account-type-select"
          sx={{mr:2, width: 200}}
          value={project_id} 
          onChange={(event:any) => {
            console.log('hi')
            setProject(event.target.value)
          }}
        >
          {projects.map((x, i) => {
            console.log(x)
            return (
              <MenuItem key={i} value={x.project_id}>{x.name}</MenuItem>
            );
          })}
        </CustomSelect> 
      </Box>
       
        <Grid container spacing={3}>
          {/* column */}
            <Grid item xs={6} lg={6}>    
            <Box display={'flex'} justifyContent={'space-between'}>
              <Typography variant="h5" component="span" color="textPrimary"  >
                최초 점검 완료
              </Typography>
              <Typography variant="h5" component="span" color="textSecondary" style={{   marginLeft: 8 }}>
                {totalCompCount1 / totalCount1}%
              </Typography>
            </Box> 
              <LinearProgress variant="determinate" value={40} sx={{ height: '50px', borderRadius: '10px', marginTop: '10px' }} />
              <TopCards />
            </Grid>
            <Grid item xs={6} lg={6}>
                <Box display={'flex'} justifyContent={'space-between'}>
                  <Typography variant="h5" component="span" color="textPrimary">
                    이행 점검 완료
                  </Typography>
                  <Typography variant="h5" component="span" color="textSecondary" style={{   marginLeft: 8 }}>
                  {totalCompCount2 / totalCount2}%
                  </Typography>
                </Box>
                <LinearProgress variant="determinate" value={20} sx={{ height: '50px', borderRadius: '10px', marginTop: '10px' }} />
              <TopCards />
            </Grid>
            <Grid item xs={3} lg={3}   > 
              <IssueCard/>
            </Grid>
            <Grid item xs={3} lg={3}   > 
              <DelayCard/>
            </Grid>
            <Grid item xs={3} lg={3}   > 
              <CheckingCard/>
            </Grid>
            <Grid item xs={3} lg={3}   > 
              <ScheduleCheckCard/>
            </Grid>
        </Grid>
        <Box sx={{height:10}}></Box>
        <Grid container spacing={3}>
          {/* column */}
            <Grid item xs={4} lg={4}>
            <DashboardCard
                title="문의 내역"
                action={
                  <Fab color="secondary" size="small" component={Link}  href="/noticelist">
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
            <Grid item xs={2} lg={2}>
              <ChildCard
                title="회원가입요청" 
              >
                 <Typography display={'flex'} justifyContent={'center'} fontSize={30} underline={'always'} component={Link}  href="/account/account-accept">{approveCount}</Typography>
              </ChildCard>
            </Grid>
            <Grid item xs={2} lg={2}>
              <ChildCard
                title="주소변경"
              >
                <Typography display={'flex'} justifyContent={'center'} fontSize={30} underline={'always'} component={Link}  href="/account/account-accept">{approveCount}</Typography>        
              </ChildCard>  
            </Grid>
        </Grid>  
        <Welcome />
      </Box>
    </PageContainer>
  );
};

