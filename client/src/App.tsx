import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { themeSettings } from "./theme";
import { Box, CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/scenes/navbar";
import Dashboard  from "@/scenes/dashboard";
import Predictions from "@/scenes/predictions";

function App() {
  // 테마 생성
  const theme = useMemo(() => createTheme(themeSettings), [])
  return (
    <div className="app">
      {/* 브라우저 라우팅을 위한 BrowseRouter 컴포넌트 사용 */}
      <BrowserRouter>
        {/* 테마 적용을 위한 ThemeProvider 컴포넌트 사용 */}
        <ThemeProvider theme={theme}>
          {/* Material UI의 기본 CSS 스타일 적용 */}
          <CssBaseline />
              {/* 전체 컴포넌트를 감싸는 BOX 컴포넌트 */}
             <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
              {/* 네비게이션 바 컴포넌트 */}
              <Navbar />
              {/* 기본 경로에 Dashboard 컴포넌트, predection 경로에 Predection 컴포넌트 */}
              <Routes>
                <Route path="/" element={<Dashboard />}/>
                <Route path="/predictions" element={<Predictions />}/>
              </Routes>
             </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App

