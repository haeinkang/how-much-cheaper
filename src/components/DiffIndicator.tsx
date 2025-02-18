import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import React from "react";

interface DiffIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  baseValue: number;
  compareValue: number;
}

const DiffIndicator: React.FC<DiffIndicatorProps> = React.memo(
  ({ baseValue, compareValue, ...restProps }) => {
    // baseValue 0인 경우, 분모가 0이 되어 계산할 수 없으므로 안내 메시지를 렌더링합니다.
    if (baseValue === 0) {
      return (
        <Grid container alignItems="center" flexWrap="nowrap">
          <Typography variant="body1" color="text.secondary">
            NaN
          </Typography>
        </Grid>
      );
    }

    const diff = baseValue - compareValue;
    const percentDiff = (diff / baseValue) * 100;

    const textColor =
      diff > 0 ? "error" : diff < 0 ? "primary" : "text.secondary";

    const IconComponent = diff > 0 ? ArrowDropUpIcon : ArrowDropDownIcon;

    const iconColor = diff > 0 ? "warning" : "primary";

    const formattedDiff = Math.abs(diff).toLocaleString("ko-KR", {
      maximumFractionDigits: 2,
    });

    const formattedPercent = Math.abs(percentDiff).toLocaleString("ko-KR", {
      maximumFractionDigits: 2,
    });

    return (
      <Grid {...restProps} container alignItems="center" flexWrap="nowrap">
        {diff !== 0 && <IconComponent color={iconColor} sx={{ p: 0, m: 0 }} />}
        <Typography variant="body1" color={textColor}>
          {diff === 0 ? "0.00" : `${formattedDiff} (${formattedPercent}%)`}
        </Typography>
      </Grid>
    );
  }
);

export default DiffIndicator;
