import React from "react";
import { useSelector } from "react-redux";
import {
  selectTodayExchangeRates,
  selectYesterdayExchangeRates,
} from "../features/exchange-slice";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid2";
import { ExchangeData } from "../types/exchange";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import DiffIndicator from "./DiffIndicator";
import styled from "styled-components";
import { Box } from "@mui/material";

interface DealBasRBoxProps {
  diffColor: string;
}

function ExchangeSection() {
  // Redux 스토어에서 환율 데이터 가져오기
  const todayExchangeRates = useSelector(selectTodayExchangeRates);
  const yesterdayExchangeRates = useSelector(selectYesterdayExchangeRates);
  const over1500px = useMediaQuery("(min-width:1500px)");

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
      {todayExchangeRates.map((o: ExchangeData) => {
        const yesterday = yesterdayExchangeRates.find(
          ({ cur_unit }) => o.cur_unit === cur_unit
        );
        // diff 계산 (데이터가 없으면 0 처리)
        const diff = yesterday
          ? parseFloat(o.deal_bas_r) - parseFloat(yesterday.deal_bas_r)
          : 0;
        // 색상 선택: 기준에 따라 색상 결정
        const diffColor =
          diff > 0 ? "error.main" : diff < 0 ? "primary.main" : "disabled.main";

        return (
          <Grid size={{ xs: 6, sm: 6, md: 3, lg: 3, xl: 3 }} key={o.cur_unit}>
            <Card sx={{ height: "100%" }}>
              <StyledCardContent>
                <GridContainer>
                  <FlagBox className="flag">{getFlag(o.cur_unit)}</FlagBox>

                  <CurrencyNameWrapper className="cur-name">
                    <CurNameBox>{o.cur_nm}</CurNameBox>
                    {over1500px && <CurUnitBox>{o.cur_unit}</CurUnitBox>}
                  </CurrencyNameWrapper>

                  {yesterday && (
                    <DiffIndicator
                      className="compare"
                      style={{ gridArea: "compare" }}
                      baseValue={parseFloat(o.deal_bas_r)}
                      compareValue={parseFloat(yesterday.deal_bas_r)}
                    />
                  )}

                  <DealBasRBox className="deal_bas_r" diffColor={diffColor}>
                    <DealBasRValue diffColor={diffColor}>
                      {o.deal_bas_r}
                    </DealBasRValue>
                    원
                  </DealBasRBox>
                </GridContainer>
              </StyledCardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default ExchangeSection;

const StyledCardContent = styled(CardContent)`
  &:last-child {
    padding-bottom: 16px;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-areas:
    "flag cur-name deal_bas_r"
    "flag compare deal_bas_r";
  grid-template-columns: auto 1fr;
  gap: 0px 15px;

  @media (max-width: 1500px) {
    gap: 0px 5px;
    grid-template-columns: auto 1fr;
    grid-template-areas:
      "flag cur-name"
      "deal_bas_r deal_bas_r"
      "compare compare";
  }
`;

const FlagBox = styled.div`
  grid-area: flag;
  font-size: 2rem;

  @media (max-width: 1500px) {
    font-size: 1.4rem;
  }
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CurrencyNameWrapper = styled.div`
  grid-area: cur-name;
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const CurNameBox = styled.div`
  font-weight: bold;
  font-size: 1rem;
  white-space: nowrap;
`;

const CurUnitBox = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.palette?.text?.secondary || "#666"};
`;

const DealBasRBox = styled.div<DealBasRBoxProps>`
  grid-area: deal_bas_r;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 1.1rem;
  font-weight: 500;
  margin-right: 0.3rem;
  color: ${(props) => props.diffColor};

  @media (max-width: 1500px) {
    justify-content: flex-start;
    font-size: 1rem;
    margin-top: 1rem;
  }
`;

const DealBasRValue = styled.span<DealBasRBoxProps>`
  color: ${(props) => props.diffColor};
  font-size: 1.5rem;
  font-weight: 600;
  margin-right: 0.3rem;

  @media (max-width: 1500px) {
    font-size: 1.3rem;
  }
`;
