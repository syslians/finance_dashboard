import { Box, useMediaQuery } from '@mui/material';
import Row1 from './Row1';
import Row2 from './Row2';
import Row3 from './Row3';

/* 
Dashbaord 컴포넌트는 useMediaQuery 훅을 사용하여 화면 크기에 따라 다른 그리드 레이아웃을 적용합니다. 
대형 화면에서는 3열 그리드를, 소형 화면에서는 1열 그리드를 사용합니다. 각 Row 컴포넌트는 대시보드의 특정 부분을 담당합니다. 
Box 컴포넌트의 sx 속성을 통해 CSS 스타일을 동적으로 적용하여 반응형 레이아웃을 구성합니다.
*/

/* 대형화면과 소형화면에 대한 그리드 레이아웃 설정 */
const gridTemplateLargeScreens = `
  "a b c"
  "a b c"
  "a b c"
  "a b f"
  "d e f"
  "d e f"
  "d h i"
  "g h i"
  "g h j"
  "g h j"
  `;
const gridTemplateSmallScreens = `
  "a"
  "a"
  "a"
  "a"
  "b"
  "b"
  "b"
  "b"
  "c"
  "c"
  "d"
  "d"
  "d"
  "e"
  "e"
  "f"
  "f"
  "f"
  "g"
  "g"
  "g"
  "h"
  "h"
  "h"
  "h"
  "i"
  "i"
  "j"
  "j"
  `

/* 대시보드 컴포넌트 정의 */
const Dashbaord = () => {
   /* 화면 크기에 따라 레이아웃을 변경하기 위해 미디어 쿼리를 사용 */
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)")
  return (
        /* Box 컴포넌트를 사용하여 그리드 레이아웃을 설정 */
    <Box width="100%" height="100%" display="grid" gap="1.5rem"
    sx={
      isAboveMediumScreens ? {
        gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
        gridTemplateRows: "repeat(10, minmax(60px, 1fr))",
        gridTemplateAreas: gridTemplateLargeScreens,
      } :  {
        gridAutoColumns: "1fr",
        gridAutoRows: "80px",
        gridTemplateAreas: gridTemplateSmallScreens,
           }
     }
   > 
      <Row1 />
      <Row2 />
      <Row3 />
    </Box>
  )
}

export default Dashbaord;