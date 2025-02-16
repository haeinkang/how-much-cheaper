import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { selectProducts } from "../../features/product-slice";
import { useSelector } from "react-redux";
import { Product, Price } from "../../types/product";
import flatMap from "lodash/flatMap";
import find from "lodash/find";
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

const thumbnails: Record<string, string> = {
  0: _Thumbnail0,
  2: _Thumbnail2,
  3: _Thumbnail3,
  4: _Thumbnail4,
};

export default function ProductsPage() {
  const products = useSelector(selectProducts);
  const exchange = useSelector(selectTodayDealBasRByCurrency);

  return (
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
          {products.map((row) => {
            return (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="div" scope="row">
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateAreas: `
                        "img product-info"
                      `,
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
                      // gap={0.4}
                    >
                      <Grid
                        size={12}
                        sx={{
                          fontWeight: 700,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {row.brandName}
                      </Grid>
                      <Grid size={12} sx={{}}>
                        {row.productName}
                      </Grid>
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

                {flatMap(row.prices, (o) => {
                  let priceInKrw = 0;
                  priceInKrw =
                    parseFloat(exchange[o.cur_unit]) * 0.9 * o.localPrice;
                  if (o.cur_unit === "JPY(100)") priceInKrw = priceInKrw / 100;

                  const diff = priceInKrw - row.domesticPrice;
                  const percentDiff = (diff / row.domesticPrice) * 100;

                  return (
                    <TableCell>
                      <Grid
                        container
                        alignItems={"flex-end"}
                        gap={0.3}
                        sx={{
                          fontWeight: "500",
                          fontSize: "1rem",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {`${priceInKrw.toLocaleString("ko-KR", {
                          maximumFractionDigits: 0,
                        })}`}
                        <Box sx={{ fontSize: "0.9rem" }}>원</Box>
                      </Grid>
                      <Grid container alignItems={"center"} flexWrap={"nowrap"}>
                        {diff > 0 ? (
                          <ArrowDropUpIcon
                            color={"warning"}
                            sx={{ p: 0, m: 0 }}
                          />
                        ) : diff < 0 ? (
                          <ArrowDropDownIcon
                            color={"primary"}
                            sx={{ p: 0, m: 0 }}
                          />
                        ) : null}

                        <Typography
                          variant="body1"
                          color={
                            diff > 0
                              ? "error"
                              : diff < 0
                                ? "primary"
                                : "text.secondary"
                          }
                        >
                          {`${diff
                            .toLocaleString("ko-KR", {
                              maximumFractionDigits: 0,
                            })
                            .replace("-", "")}(${percentDiff.toLocaleString(
                            "ko-KR",
                            {
                              maximumFractionDigits: 0,
                            }
                          )}%)`}
                        </Typography>
                      </Grid>
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
