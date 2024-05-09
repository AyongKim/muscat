import React from 'react';
import DashboardCard from '../../src/components/shared/DashboardCard';
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineOppositeContentClasses,
} from '@mui/lab';
import { Link, Typography } from '@mui/material';

const ScheduleTimeLine = () => {
  return (
    <DashboardCard title="일정 안내">
      <>
        <Timeline
          className="theme-timeline"
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
          sx={{
            p: 0,
            mb: '-40px',
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0.5,
              paddingLeft: 0,
            },
          }}
        >
          <TimelineItem>
            <TimelineOppositeContent>점검시작</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent> </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>자가 점검 제출(완)</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="secondary" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography fontWeight="600"></Typography>{' '} 
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>최종 점검 완료</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="success" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent> </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>보완자료 제출</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="warning" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography fontWeight="600"> </Typography>{' '}
              <Typography   >
               
              </Typography>
            </TimelineContent>
          </TimelineItem>
           
          <TimelineItem>
            <TimelineOppositeContent>이행 점검 완료</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="success" variant="outlined" />
            </TimelineSeparator>
            <TimelineContent>   </TimelineContent>
          </TimelineItem>
        </Timeline>
      </>
    </DashboardCard>
  );
};

export default ScheduleTimeLine;
