import React from "react";
import { useSelector } from "react-redux";
import { selectExchangeRates } from "../features/exchange-slice"; // 파일 경로에 맞게 수정
import _ from "lodash";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import { ExchangeResponse } from "../types/exchange";
import { styled as MuiStyled } from "@mui/material/styles";

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

  // 통화 단위에 따른 국기 이모지 반환
  const getFlag = (cur_unit: string) => {
    switch (cur_unit) {
      case "JPY(100)":
        return "🇯🇵";
      case "HKD":
        return "🇭🇰";
      case "EUR":
        return "🇫🇷";
      case "USD":
        return "🇺🇸";
      default:
        return "";
    }
  };

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      {filteredRates.map((o: ExchangeResponse) => (
        // xs: 모바일 전체 너비, sm: 작은 화면 6칸(2열), md: 중간 이상 3칸(4열)
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }} key={o.cur_unit}>
          <Card sx={{ height: "100%" }}>
            <CardContentNoPadding sx={{ p: 2 }}>
              <Grid container spacing={1} alignItems="center">
                <Grid size={6}>
                  <Grid
                    display="flex"
                    flexWrap="nowrap"
                    alignItems="center"
                    gap={2}
                  >
                    <Box sx={{ fontSize: "2rem" }}>{getFlag(o.cur_unit)}</Box>
                    <Box>
                      <Box sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                        {o.cur_nm}
                      </Box>
                      <Box
                        sx={{ fontSize: "0.875rem", color: "text.secondary" }}
                      >
                        {o.cur_unit}
                      </Box>
                    </Box>
                  </Grid>
                </Grid>

                <Grid size={6}>
                  <Grid
                    display="flex"
                    flexWrap="nowrap"
                    alignItems="center"
                    justifyContent="flex-end"
                  >
                    <div
                      style={{
                        fontSize: "1.4rem",
                        fontWeight: 400,
                        textAlign: "right",
                        marginRight: ".2rem",
                      }}
                    >
                      {o.deal_bas_r}
                    </div>
                    <div
                      style={{
                        fontSize: "1rem",
                        fontWeight: 500,
                        textAlign: "right",
                      }}
                    >
                      원
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </CardContentNoPadding>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default ExchangeSection;
