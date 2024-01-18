import React, { useMemo } from 'react';
import DashboardBox from '@/components/DashboardBox';
import { useGetKpisQuery } from '@/state/api';
import { ResponsiveContainer,
         AreaChart,
         CartesianGrid,
         LineChart,
         BarChart,
         Bar,
         XAxis,
         YAxis,
         Line,
         Legend,
         Tooltip,
         Area
} from 'recharts';
import { useTheme } from '@mui/material';
import BoxHeader from '@/components/BoxHeader';

/*
이 코드는 세 가지 주요 대시보드 박스를 구현합니다. 첫 번째 박스에서는 영역 차트를 사용하여 수익과 비용을 시각화하고, 
두 번째 박스에서는 선형 차트로 수익과 이익을 표시합니다. 마지막으로 세 번째 박스에서는 막대 차트를 사용하여 월별 수익을 나타냅니다. 
각 차트는 recharts 라이브러리를 사용하며, MUI의 테마와 스타일을 적용하여 UI를 구성합니다. 데이터는 API 호출을 통해 가져오며, 
useMemo 훅을 사용하여 필요한 형태로 가공하고 계산하는 부분은 data가 변하지 않는한 계산된 메모이제이션된 값을 사용합니다.
*/

/*props 데이터 타입 정의*/
type Props = {}

const Row1 = (props: Props) => {
  
  const { palette } = useTheme(); /* MUI 테마사용 */
  const { data } = useGetKpisQuery(); /* API 호출을 통해 KPI 데이터 가져오기 */

  console.log("KPI 데이터:",data);

  /* 수익 데이터를 메모이제이션. mothlydata에서 month, revenue 추출 하여 name: , revenue: 리턴. month는 앞의 3글자만 추출
     ex: January = Jan*/
  // monthlydata: [{month: , revenue: , expense: , nonOperationalExpenses: , operationalExpenses: , revenue: , _id: }, {}, {}]
  const revenue = useMemo(() => {
    return(
      data &&
      data[0].monthlyData.map(({ month, revenue }) => {
        return {
          name: month.substring(0, 3), 
          매출: revenue,
        };
      })
    );  
  }, [data]);
  console.log("revenue:", revenue);

  /* 수익과 비용 데이터를 메모이제이션하여 계산합니다 */
  const revenueExpenses = useMemo(() => {
    return(
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          매출: revenue,
          비용: expenses,
        };
      })
    );  
  }, [data]);
  console.log("revenueExpenses" ,revenueExpenses);

  /* 수익과 비용 데이터를 메모이제이션 */
  const revenueProfit = useMemo(() => {
    return(
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          매출: revenue,
          순이익:(revenue - expenses).toFixed(2), // 순이익 계산. 총 수입 - 비용
        };
      })
    );  
  }, [data]);
  console.log("revenueProfit:" ,revenueProfit);


  return (
    <>
    <DashboardBox gridArea="a">
    <BoxHeader 
     title="매출 및 비용"
     subtitle="상단 항목은 수익을 나타내며, 하단 항목은 비용을 나타냅니다."
     sideText="+4%"
    />
    <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400} 
          data={revenueExpenses}
          margin={{
            top: 15,
            right: 25,
            left: -10,
            bottom: 60,
          }}
        >
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop 
              offset="5%" 
              stopColor={palette.primary[300]} 
              stopOpacity={2.0} 
              />
              <stop 
              offset="95%" 
              stopColor={palette.primary[300]} 
              stopOpacity={0} 
              />
            </linearGradient>
            <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
              <stop 
              offset="5%" 
              stopColor={palette.primary[300]} 
              stopOpacity={0.5} 
              />
              <stop 
              offset="95%" 
              stopColor={palette.primary[300]} 
              stopOpacity={0} 
              />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke={palette.grey[800]} />
          <XAxis 
            dataKey="name"
            tickLine={false}
            style={{ fontSize: "10px" }}
          />
          <YAxis
              tickLine={false}
              axisLine={{ strokeWidth: "0" }}
              style={{ fontSize: "10px" }}
              domain={[8000, 23000]}
          />
          <Tooltip />
          <Area
          type="monotone"
          dataKey="매출" 
          dot={true}
          stroke={palette.primary.main}
          fillOpacity={1} 
          fill="url(#colorRevenue)" />
          <Area
          type="monotone"
          dataKey="비용" 
          dot={true}
          stroke={palette.primary.main}
          fillOpacity={1} 
          fill="url(#colorExpenses)" />
        </AreaChart>
      </ResponsiveContainer>
    </DashboardBox>

    <DashboardBox  gridArea="b">
    <BoxHeader 
     title="매출 및 순이익"
     subtitle="상단 항목은 매출 나타내며, 하단 항목은 순이익을 나타냅니다."
     sideText="+4%"
    />
    <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={400}
          data={revenueProfit}
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
          <Legend
              height={20}
              wrapperStyle={{
                margin: "0 0 10px 0",
              }}
            />
          <Line
              yAxisId="left"
              type="monotone"
              dataKey="순이익"
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="매출"
              stroke={palette.primary.main}
            />
        </LineChart>
      </ResponsiveContainer>  
    </DashboardBox>
    <DashboardBox  gridArea="c">
    <BoxHeader 
     title="월별 매출"
     subtitle="월별 매출 그래프"
     sideText="+4%"
    />
    <ResponsiveContainer width="100%" height="100%">     
    <BarChart
      width={500}
      height={300}
      data={revenue}
      margin={{
        top: 17,
        right: 15,
        left: -5,
        bottom: 55,
        }}
      >
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={palette.primary[300]}
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor={palette.primary[300]}
              stopOpacity={0}
            />
          </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke={palette.grey[800]} />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            style={{ fontSize: "10px" }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            style={{ fontSize: "10px" }}
          />
          <Tooltip />
          <Bar dataKey="매출" fill="url(#colorRevenue)" />
        </BarChart>
    </ResponsiveContainer>
    </DashboardBox>
    </>
  )
}

export default Row1