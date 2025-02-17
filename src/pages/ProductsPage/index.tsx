import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  selectProducts,
  toggleDuty,
  toggleTaxRefund,
} from "../../features/product-slice";
import { useSelector, useDispatch } from "react-redux";
import { Product, Price, Category, CategoryName } from "../../types/product";
import { selectTodayDealBasRByCurrency } from "../../features/exchange-slice";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import _Thumbnail0 from "../../assets/images/thumbnails/_thumbnail-0.webp";
import _Thumbnail2 from "../../assets/images/thumbnails/_thumbnail-2.webp";
import _Thumbnail3 from "../../assets/images/thumbnails/_thumbnail-3.webp";
import _Thumbnail4 from "../../assets/images/thumbnails/_thumbnail-4.webp";
import Grid from "@mui/material/Grid2";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import { RootState } from "../../app/store";
import useFinalPrice from "../../hooks/useFinalPrice";

// 이미지 썸네일 매핑
const thumbnails: Record<string, string> = {
  0: _Thumbnail0,
  2: _Thumbnail2,
  3: _Thumbnail3,
  4: _Thumbnail4,
};

// FinalPriceCell 컴포넌트: 각 가격 셀 별로 hook을 사용하도록 분리
interface FinalPriceCellProps {
  category: CategoryName; // 예: "가방", "상의" 등
  price: Price;
  domesticPrice: number;
}

const FinalPriceCell: React.FC<FinalPriceCellProps> = ({
  category,
  price,
  domesticPrice,
}) => {
  // 개별 셀 내에서 useFinalPrice hook 호출 (각 컴포넌트는 독립적인 hook 호출 순서를 가짐)
  const { finalPrice, netTax } = useFinalPrice(category, price);
  const diff = finalPrice - domesticPrice;
  const percentDiff = (diff / domesticPrice) * 100;

  return (
    <TableCell>
      <Grid
        container
        alignItems={"flex-end"}
        gap={0.3}
        sx={{ fontWeight: "500", fontSize: "1rem", whiteSpace: "nowrap" }}
      >
        {finalPrice.toLocaleString("ko-KR", { maximumFractionDigits: 0 })}
        <Box sx={{ fontSize: "0.9rem" }}>원</Box>
      </Grid>

      <Grid container alignItems={"center"} flexWrap={"nowrap"}>
        {diff > 0 ? (
          <ArrowDropUpIcon color={"warning"} sx={{ p: 0, m: 0 }} />
        ) : diff < 0 ? (
          <ArrowDropDownIcon color={"primary"} sx={{ p: 0, m: 0 }} />
        ) : null}
        <Typography
          variant="body1"
          color={diff > 0 ? "error" : diff < 0 ? "primary" : "text.secondary"}
        >
          {`${Math.abs(diff).toLocaleString("ko-KR", { maximumFractionDigits: 0 })} (${Math.abs(percentDiff).toLocaleString("ko-KR", { maximumFractionDigits: 0 })}%)`}
        </Typography>
      </Grid>
    </TableCell>
  );
};

export default function ProductsPage() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const { applyTaxRefund, applyDuty } = useSelector(
    (state: RootState) => state.products
  );

  return (
    <React.Fragment>
      <Grid container justifyContent={"flex-end"} gap={2}>
        <FormControlLabel
          control={
            <Switch
              checked={applyTaxRefund}
              onChange={() => dispatch(toggleTaxRefund())}
            />
          }
          label={
            <Grid container alignItems={"center"} gap={0.3}>
              <Tooltip title="택스리펀드: 해외에서 구매 시, 현지 VAT를 환급받는 제도">
                <InfoRoundedIcon color="disabled" sx={{ fontSize: "1rem" }} />
              </Tooltip>
              <Box>택스리펀드 적용</Box>
            </Grid>
          }
          labelPlacement="start"
        />
        <FormControlLabel
          control={
            <Switch
              checked={applyDuty}
              onChange={() => dispatch(toggleDuty())}
            />
          }
          label={
            <Grid container alignItems={"center"} gap={0.3}>
              <Tooltip title="관세: 해외 구매 후 600달러 초과 금액에 대해 부과되는 세금 (자진 신고 시 30% 감면, 최대 20만 원)">
                <InfoRoundedIcon color="disabled" sx={{ fontSize: "1rem" }} />
              </Tooltip>
              <Box>관세 적용</Box>
            </Grid>
          }
          labelPlacement="start"
        />
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>상품</TableCell>
              <TableCell>일본</TableCell>
              <TableCell>프랑스</TableCell>
              <TableCell>미국</TableCell>
              <TableCell>홍콩</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="div" scope="row">
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateAreas: `"img product-info"`,
                      gridTemplateColumns: "auto 1fr",
                      gap: "0px 15px",
                    }}
                  >
                    <picture className="img" style={{ gridArea: "img" }}>
                      <source srcSet={thumbnails[row.id]} type="image/webp" />
                      <img
                        width="100"
                        height="100"
                        src={`_Thumbnail${row.id}`}
                        alt="대체 이미지"
                      />
                    </picture>
                    <Grid
                      className="product-info"
                      container
                      alignContent={"center"}
                    >
                      <Grid
                        size={12}
                        sx={{ fontWeight: 700, whiteSpace: "nowrap" }}
                      >
                        {row.brandName}
                      </Grid>
                      <Grid size={12}>{row.productName}</Grid>
                      <Grid
                        size={12}
                        container
                        alignItems={"flex-end"}
                        gap={0.3}
                        sx={{
                          fontWeight: "500",
                          fontSize: "1rem",
                          whiteSpace: "nowrap",
                          mt: 0.7,
                        }}
                      >
                        {row.domesticPrice.toLocaleString()}
                        <Box sx={{ fontSize: "0.9rem" }}>원</Box>
                      </Grid>
                    </Grid>
                  </Box>
                </TableCell>
                {row.prices.map((priceObj, index) => (
                  <FinalPriceCell
                    key={index}
                    category={row.category.name}
                    price={priceObj}
                    domesticPrice={row.domesticPrice}
                  />
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
