import React from "react";
import { Grid2Props } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";

interface PriceDisplayProps extends Grid2Props {
  price: number;
}

const PriceDisplay: React.FC<PriceDisplayProps> = React.memo(
  ({ price, sx, ...restProps }) => {
    return (
      <Grid
        {...restProps}
        size={12}
        container
        alignItems={"flex-end"}
        gap={0.3}
        sx={{
          ...sx,
          fontWeight: "500",
          fontSize: "1rem",
          whiteSpace: "nowrap",
          // mt: 0.7,
        }}
      >
        {price.toLocaleString("ko-KR", { maximumFractionDigits: 0 })}
        <Box sx={{ fontSize: "0.9rem" }}>원</Box>
      </Grid>
    );
  }
);

export default PriceDisplay;
