import React from "react";
import { useEffect, useState } from 'react'; 
import {
  Typography,
  Box,
  Grid,
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
} from '@mui/material';
import PageContainer from "../../../src/components/container/PageContainer";

import TopCards from "../../../src/components/dashboards/modern/TopCards";
import RevenueUpdates from "../../../src/components/dashboards/modern/RevenueUpdates";
import YearlyBreakup from "../../../src/components/dashboards/modern/YearlyBreakup";
import MonthlyEarnings from "../../../src/components/dashboards/modern/MonthlyEarnings";
import EmployeeSalary from "../../../src/components/dashboards/modern/EmployeeSalary";
import Customers from "../../../src/components/dashboards/modern/Customers";
import Projects from "../../../src/components/dashboards/modern/Projects";
import Social from "../../../src/components/dashboards/modern/Social";
import SellingProducts from "../../../src/components/dashboards/modern/SellingProducts";
import WeeklyStats from "../../../src/components/dashboards/modern/WeeklyStats";
import TopPerformers from "../../../src/components/dashboards/modern/TopPerformers";
import Welcome from "../../../src/layouts/full/shared/welcome/Welcome";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function createData(
  imgsrc?: string,
  pname?: string,
  customer?: string,
  inventory?: boolean,
  price?: number,
  items?: string,
) {
  return {
    imgsrc,
    pname,
    customer,
    inventory,
    price,
    items,
    history: [
      { date: '2021-02-05', customerId: '15202410', price: 250, amount: 3 },
      { date: '2021-02-02', customerId: 'Anonymous', price: 600, amount: 1 },
    ],
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              src={row.imgsrc}
              alt={row.imgsrc}
              sx={{
                width: 90,
                height: 70,
                borderRadius: '10px',
              }}
            />
            <Typography variant="h6" fontWeight="600">
              {row.pname}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell>
          <Typography color="textSecondary" variant="h6">
            {row.customer}
          </Typography>
        </TableCell>
        <TableCell>
          <Chip
            size="small"
            label={row.inventory ? 'In Stock' : 'Out of Stock'}
            color={row.inventory ? 'success' : 'error'}
            sx={{ borderRadius: '6px' }}
          />
        </TableCell>
        <TableCell>
          <Typography color="textSecondary" variant="h6" fontWeight="400">
            ${row.price}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography color="textSecondary" fontWeight="400">
            {row.items}
          </Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography
                gutterBottom
                variant="h5"
                sx={{
                  mt: 2,
                  backgroundColor: (theme) => theme.palette.grey.A200,
                  p: '5px 15px',
                  color: (theme) =>
                    `${
                      theme.palette.mode === 'dark'
                        ? theme.palette.grey.A200
                        : 'rgba(0, 0, 0, 0.87)'
                    }`,
                }}
              >
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6">Date</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">Customer</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">Amount</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">Total price ($)</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow: any) => (
                    <TableRow key={historyRow.date}>
                      <TableCell>
                        <Typography color="textSecondary" fontWeight="400">
                          {historyRow.date}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" fontWeight="400">
                          {historyRow.customerId}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" fontWeight="400">
                          {historyRow.amount}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontWeight="600">
                          {Math.round(historyRow.amount * historyRow.price * 100) / 100}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function Modern() {


  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  const rows = [
    createData("/images/products/s1.jpg", 'Good butterscotch ice-cream', 'Sunil Joshi', true, 250, '2'),
    createData("/images/products/s2.jpg", 'Supreme fresh tomato available', 'John Deo', false, 450, '1'),
    createData("/images/products/s3.jpg", 'Red color candy from Gucci', 'Andrew McDownland', false, 150, '2'),
    createData("/images/products/s4.jpg", 'Stylish night lamp for night', 'Christopher Jamil', true, 550, '6'),
  ];
  return (
    <PageContainer>
      <Box>
        <Grid container spacing={3}>
          {/* column */}
          <Grid item xs={12} lg={12}>
            <Grid item xs={6} lg={6}>
              <TopCards />
            </Grid>
            <Grid item xs={6} lg={6}>
              <TopCards />
            </Grid>
          </Grid>
         
          {/* column */}
          <Grid item xs={12} lg={4}>
            <EmployeeSalary isLoading={isLoading} />
          </Grid>
          {/* column */}
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>

                <Customers isLoading={isLoading} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Projects isLoading={isLoading} />

              </Grid>
              <Grid item xs={12}>
                <Social />
              </Grid>
            </Grid>
          </Grid>
          {/* column */}
          <Grid item xs={12} lg={4}>
            <SellingProducts />
          </Grid>
          {/* column */}
          <Grid item xs={12} lg={4}>
            <WeeklyStats isLoading={isLoading} />
          </Grid>
          {/* column */}
          <Grid item xs={12} lg={8}>
            <TopPerformers />
          </Grid>
        </Grid>
        <TableBody>
              {rows.map((row) => (
                <Row key={row.pname} row={row} />
              ))}
            </TableBody>
        {/* column */}
        <Welcome />
      </Box>
    </PageContainer>
  );
};

