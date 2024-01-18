import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import PixIcon from '@mui/icons-material/Pix';
import { Box, Typography, useTheme } from '@mui/material'
import FlexBetween from '@/components/FlexBetween';

type Props = {};

const Navbar = (props: Props) => {
  const { palette } = useTheme();
  const [selected, setSelected] = useState("dashboard"); // 선택된 메뉴 상태 관리
  return (
    <FlexBetween 
          mb="0.25rem"
          p="0.5rem 0rem" 
          color={palette.grey[300]} //MUI 회색 계열 색상 적용
        >
        {/* 네비게이션 바 왼쪽 사이드(웹앱 제목)  */}
        <FlexBetween gap="0.75rem">
            <PixIcon sx={{ fontSize: "28px" }} />
            <Typography variant="h4" fontSize="16px">
                Finance KPI
            </Typography>
        </FlexBetween>

        {/* 네비게이션 바 오른쪽 사이드(KPI 대시보드, 수입 예측) */}
        {/* slected 상태를 사용하여 조건에 따라 색상 변경. selected는 현재 선택된 메뉴를 나타냄. selected가 dash
            board 이면 color 속성을 inherit로 설정하여 현재 테마의 글자 사용하도록 함. else paleete.grey[700] */}
        <FlexBetween gap="2rem">
            <Box sx={{ "&:hover": { color: palette.primary[100]}}}>
                <Link 
                    to="/"
                    onClick={() => setSelected("dashboard")}
                    style={{
                    color: selected === "dashboard" ? "inherit" : palette.grey[700],
                    textDecoration: "inherit"
                    }}
                >
                KPI 대시보드
                </Link>
            </Box>
            <Box sx={{ "&:hover": { color: palette.primary[100]}}}>
                <Link 
                    to="/predictions"
                    onClick={() => setSelected("predictions")}
                    style={{
                    color: selected === "predictions" ? "inherit" : palette.grey[700],
                    textDecoration: "inherit"
                    }}
                >
                매출 예측
                </Link>
            </Box>
        </FlexBetween>
    </FlexBetween>
    );
};

export default Navbar