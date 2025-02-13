import React from "react";
import { useSelector } from "react-redux";
import { selectExchangeRates } from "../features/exchange-slice"; // 파일 경로에 맞게 수정
import _ from "lodash";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Hidden from "@mui/material/Hidden";
import { ExchangeResponse } from "../types/exchange";
import { styled as MuiStyled } from "@mui/material/styles";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

const CardContentNoPadding = MuiStyled(CardContent)(`
  &:last-child {
    padding-bottom: 16px;
  }
`);

function ExchangeSection() {
  // Redux 스토어에서 환율 데이터 가져오기
  const exchangeRates = useSelector(selectExchangeRates);

  // 관심있는 통화만 필터링 (JPY(100), HKD, EUR, USD)
  const filteredRates = _(exchangeRates)
    .filter((o: ExchangeResponse) =>
      ["JPY(100)", "HKD", "EUR", "USD"].includes(o.cur_unit)
    )
    .value();

  const below1500px = useMediaQuery("(max-width:1500px)");

  // 통화 단위에 따른 국기 이모지 반환
  const getFlag = (cur_unit: string) => {
    switch (cur_unit) {
      case "JPY(100)":
        return "🇯🇵";
      case "HKD":
        return "🇭🇰";
      case "EUR":
        return "🇪🇺";
      case "USD":
        return "🇺🇸";
      default:
        return "🏳️";
    }
  };

  return (
    <Grid container spacing={2}>
      {filteredRates.map((o: ExchangeResponse) => (
        <Grid size={{ xs: 6, sm: 6, md: 3, lg: 3, xl: 3 }} key={o.cur_unit}>
          <Card sx={{ height: "100%" }}>
            <CardContentNoPadding>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateAreas: `
                    "flag cur-name deal_bas_r"
                    "flag compare deal_bas_r"
                  `,
                  "@media (max-width: 1500px)": {
                    gap: "3px 5px",
                    gridTemplateColumns: "auto 1fr",
                    gridTemplateAreas: `
                      "flag cur-name"
                      "deal_bas_r deal_bas_r"
                      "compare compare"
                    `,
                  },
                }}
              >
                <Box
                  className="flag"
                  sx={{
                    gridArea: "flag",
                    fontSize: "2rem",
                    "@media (max-width: 1500px)": {
                      fontSize: "1.4rem",
                    },
                    "@media (max-width: 768px)": {
                      fontSize: "1rem",
                    },
                  }}
                >
                  {getFlag(o.cur_unit)}
                </Box>

                <Grid
                  className="cur-name"
                  container
                  alignItems={"center"}
                  flexWrap={"nowrap"}
                  gap={0.8}
                  sx={{ gridArea: "cur-name" }}
                >
                  <Box
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1rem",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {o.cur_nm}
                  </Box>
                  {!below1500px && (
                    <Box sx={{ fontSize: "0.875rem", color: "text.secondary" }}>
                      {o.cur_unit}
                    </Box>
                  )}
                </Grid>

                <Grid
                  className="compare"
                  container
                  alignItems={"center"}
                  flexWrap={"nowrap"}
                  sx={{ gridArea: "compare" }}
                >
                  <ArrowDropDownIcon color={"primary"} sx={{ p: 0, m: 0 }} />
                  <Typography variant="body1" color="primary">
                    {"7.6(-0.76%)"}
                  </Typography>
                </Grid>

                <Box
                  className="deal_bas_r"
                  sx={{
                    gridArea: "deal_bas_r",
                    color: "primary.main",
                    fontSize: "1.1rem",
                    fontWeight: 500,
                    fontStyle: "normal",
                    mr: 0.3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    "@media (max-width: 1500px)": {
                      justifyContent: "flex-start",
                      fontSize: "1rem",
                    },
                  }}
                >
                  <Box
                    component={"span"}
                    sx={{
                      color: "primary.main",
                      fontSize: "1.5rem",
                      fontWeight: 600,
                      fontStyle: "normal",
                      mr: 0.3,
                      "@media (max-width: 1500px)": {
                        fontSize: "1.3rem",
                      },
                    }}
                  >
                    {o.deal_bas_r}
                  </Box>
                  원
                </Box>
              </Box>
            </CardContentNoPadding>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default ExchangeSection;
