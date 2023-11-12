import DashboardBox from '@/components/DashboardBox';
import BoxHeader from "@/components/BoxHeader";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery, useGetProductsQuery } from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import React, { useMemo } from "react";
import {
  Tooltip,
  CartesianGrid,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Line,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis
} from "recharts";
/*
위 코드에서 DashboardBox는 대시보드의 각 섹션을 구성하는 컨테이너 역할을 합니다. 
BoxHeader는 각 섹션의 헤더를 정의하며, FlexBetween은 자식 요소들을 공간을 균등하게 나눠서 배치하는 데 사용됩니다. 
useGetKpisQuery와 useGetProductsQuery는 데이터를 가져오는 API 호출을 위한 커스텀 훅입니다. 
ResponsiveContainer는 그래프가 다양한 화면 크기에 맞추어 조정될 수 있게 해줍니다. 
LineChart, PieChart, ScatterChart는 recharts 라이브러리에서 제공하는 차트 컴포넌트들입니다. 
useMemo 훅은 비용이 많이 드는 연산을 최적화하기 위해 사용됩니다.
*/


/* piechar의 데이터를 정의 */
const pieData = [
  { name: 'Gropu A', value: 600},
  { name: 'Gropu B', value: 400},
]

/* Row2 컴포넌트를 정의 */
const Row2 = () => {
  /* MUI 테마를 설정하여 스타일을 정의 */
  const { palette } = useTheme();
  const pieColors = [palette.grey[800], palette.primary[300]]

  /* API에서 데이터를 가져옵니다 */
  const { data:operationalData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();

  /* 데이터를 메모이제이션하여 차트에 사용할 데이터를 준비합니다 */
  const operationalExpenses = useMemo(() => {
    return (
      operationalData &&
      operationalData[0].monthlyData.map(
        ({ month, operationalExpenses, nonOperationalExpenses }) => {
          return {
            name: month.substring(0, 3),
            "Operational Expenses": operationalExpenses,
            "Non Operational Expenses": nonOperationalExpenses,
          };
        }
      )
    );
  }, [operationalData]);

  /* 상품 데이터를 메모이제이션하여 ScatterChart에 사용할 데이터를 준비합니다. */
  const productExpenseData = useMemo(() => {
    return (
      productData &&
      productData.map(({ _id, price, expense }) => {
        return {
          id: _id,
          price: price,
          expense: expense,
        };
      })
    );
  }, [productData]);
  
  /* 대시보드의 각 섹션을 렌더링 */
  return (
    <>
    {/* 운영 비용 대비 비운영 비용을 보여주는 LineChart를 포함하는 대시보드 박스 */}
    <DashboardBox  gridArea="d">
    <BoxHeader
          title="운영비용 vs 비운영비용"
          sideText="+4%"
        />
        {/* LineChart를 ResponsiveContainer로 감싸 반응형으로 만듭니다. */}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={operationalExpenses}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 55,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="Non Operational Expenses"
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="Operational Expenses"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
    </DashboardBox>
    {/* 캠페인 목표 달성률을 보여주는 PieChart를 포함하는 대시보드 박스 */}
    <DashboardBox  gridArea="e">
    {/* BoxHeader, FlexBetween, PieChart 등을 사용하여 UI를 구성합니다. */}
    <BoxHeader title="캠페인과 목표" sideText="+4%" />
        <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem">
          <PieChart
            width={110}
            height={100}
            margin={{
              top: 0,
              right: -10,
              left: 10,
              bottom: 0,
            }}
          >
            <Pie
              stroke="none"
              data={pieData}
              innerRadius={18}
              outerRadius={38}
              paddingAngle={2}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index]} />
              ))}
            </Pie>
          </PieChart>
          <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
            <Typography variant="h5">목표 매출</Typography>
            <Typography m="0.3rem 0" variant="h3" color={palette.primary[300]}>
              83
            </Typography>
            <Typography variant="h6">
              원하는 캠페인 재정 목표
            </Typography>
          </Box>
          <Box flexBasis="40%">
            <Typography variant="h5">매출 손실</Typography>
            <Typography variant="h6">손실이 25% 감소했습니다</Typography>
            <Typography mt="0.4rem" variant="h5">
             수익률
            </Typography>
            <Typography variant="h6">
              수익률이 지난달에 비해 30% 올랐습니다.
            </Typography>
          </Box>
        </FlexBetween>
    </DashboardBox>

     {/* 상품 가격 대비 비용을 보여주는 ScatterChart를 포함하는 대시보드 박스 */}
    <DashboardBox  gridArea="f">
    {/* ScatterChart를 ResponsiveContainer로 감싸 반응형으로 만듭니다. */}
    <BoxHeader title="제품 가격 vs 비용" sideText="+4%" />
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: 25,
              bottom: 40,
              left: -10,
            }}
          >
            <CartesianGrid stroke={palette.grey[800]} />
            <XAxis
              type="number"
              dataKey="price"
              name="price"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            />
            <YAxis
              type="number"
              dataKey="expense"
              name="expense"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            />
            <ZAxis type="number" range={[20]} />
            <Tooltip formatter={(v) => `$${v}`} />
            <Scatter
              name="Product Expense Ratio"
              data={productExpenseData}
              fill={palette.tertiary[500]}
            />
          </ScatterChart>
        </ResponsiveContainer>
    </DashboardBox>
    </>
  )
}

export default Row2