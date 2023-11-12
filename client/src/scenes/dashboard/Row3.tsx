import React from 'react';
import DashboardBox from '@/components/DashboardBox';
import { useGetKpisQuery, 
         useGetProductsQuery, 
         useGetTransactionQuery } from "@/state/api"
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import BoxHeader from '@/components/BoxHeader';
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from '@/components/FlexBetween';
import { Cell, Pie, PieChart } from "recharts";
import { useMemo } from "react";

/* Row3 컴포넌트를 정의합니다. */
const Row3 = () => {

  /* //테마와 API 쿼리 훅을 사용하여 스타일과 데이터를 가져옵니다. */
  const { data: kpiData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const { data: transactionData } = useGetTransactionQuery();
  const { palette } = useTheme();

  /* piechart의 색상 정의 */
  const pieColors = [palette.primary[800], palette.primary[500]];

  /* piechart의 데이터를 메모이제이션하여 계산 */
  const pieChartData = useMemo(() => {
    if (kpiData) {
      
      /* 총 비용을 구하고 각 카테고리별 비용을 계산 */
      const totalExpenses = kpiData[0].totalExpenses;
      return Object.entries(kpiData[0].expensesByCategory).map(
        ([key, value]) => {
          return [
            {
              name: key,
              value: value,
            },
            {
              name: `${key} of Total`,
              value: totalExpenses - value,
            },
          ];
        }
      );
    }
  }, [kpiData]);

  /* 제품 목록을 위한 컬럼을 정의 */
  const productColumns = [
    {
      field : "_id",
      headerName : "id",
      flex: 1,
    },
    {
      field : "expense",
      headerName : "Expenses",
      flex : 0.5,
      renderCell : (params: GridCellParams) =>  `$${params.value}`,
    },
    {
      field : "price",
      headerName : "Price",
      flex : 0.5,
      renderCell : (params: GridCellParams) =>  `$${params.value}`,
    }    
  ]

  /* 트랜잭션을 위한 컬럼 정의 */
  const transactionColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "buyer",
      headerName: "Buyer",
      flex: 0.67,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.35,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "productIds",
      headerName: "Count",
      flex: 0.1,
      renderCell: (params: GridCellParams) =>
        (params.value as Array<string>).length,
    },
  ];

  console.log("transactionData",transactionData)
  return (
    <>
      <DashboardBox  gridArea="g">
        <BoxHeader 
         title="제품 목록"
         sideText={`${productData?.length} 개의제품`}
        />
        <Box
          mt="0.5rem"
          p="0 0.5rem"
          height="75%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
          >
        <DataGrid
           columnHeaderHeight={25}
           rowHeight={35}
           hideFooter={true}
           rows={productData || []}
           columns={productColumns}
        />
        </Box>
      </DashboardBox>
      <DashboardBox  gridArea="h">
      <BoxHeader
          title="최근 주문"
          sideText={`${transactionData?.length} 개의 최근 트랜잭션`}
        />
        <Box
          mt="1rem"
          p="0 0.5rem"
          height="80%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={transactionData || []}
            columns={transactionColumns}
          />
        </Box>
      </DashboardBox>
      <DashboardBox  gridArea="i">
        <BoxHeader title="카테고리별 비용 내용" sideText="+4%" />
          <FlexBetween mt="0.5rem" gap="0.5rem" p="0 1rem" textAlign="center">
          {pieChartData?.map((data, i) => (
            <Box key={`${data[0].name}-${i}`}>
              <PieChart width={110} height={85}>
                <Pie
                  stroke="none"
                  data={data}
                  innerRadius={18}
                  outerRadius={35}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>
              <Typography variant="h5">{data[0].name}</Typography>
            </Box>
          ))}
          </FlexBetween>
      </DashboardBox>
      <DashboardBox  gridArea="j">
        <BoxHeader title="전체 요약 및 설명 데이터" sideText="+15%" />
         <Box
          height="15px"
          margin="1.25rem 1rem 0.4rem 1rem"
          bgcolor={palette.primary[800]}
          borderRadius="1rem"
         >
          <Box height="15px"
            bgcolor={palette.primary[600]}
            width="40%"        
          >
          </Box>
         </Box>
         <Typography margin="0 1rem" variant="h6">
          Orci aliquam enim vel diam. Venenatis euismod id donec mus lorem etiam
          ullamcorper odio sed. Ipsum non sed gravida etiam urna egestas
          molestie volutpat et. Malesuada quis pretium aliquet lacinia ornare
          sed. In volutpat nullam at est id cum pulvinar nunc.
         </Typography>
      </DashboardBox>
    </>
  )
}

export default Row3