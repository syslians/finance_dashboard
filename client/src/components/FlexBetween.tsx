import { Box } from "@mui/material";
import { styled } from "@mui/material";
/* Box: Material UI에서 제공되는 기본 레이아웃 컴포넌트. 컨테이너, 레이이웃, 스페이싱 등을 위해 사용됨.
   styled: Material UI에서 제공하는 스타일링 함수. 기존 컴포넌트에 스타일을 추가하거나 새로운 컴포넌트를 만드는데 사용됨.
*/

/* Box 컴포넌트를 기반으로 새로운 유틸리티 컴포넌트 FlexBetween을 생성. */
const FlexBetween  = styled(Box)({
    display:"flex", 
    justifyContent:"space-between", 
    alignItems:"center",
})

export default FlexBetween;