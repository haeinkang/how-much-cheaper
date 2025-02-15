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
            <TableCell>한국</TableCell>
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
                    >
                      <Box
                        sx={{
                          fontWeight: "bold",
                          fontSize: "1rem",
                          whiteSpace: "nowrap",
                          width: "100%",
                        }}
                      >
                        {row.brandName}
                      </Box>
                      <Box sx={{}}>{row.productName}</Box>
                    </Grid>
                  </Box>
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.domesticPrice.toLocaleString()}
                </TableCell>

                {flatMap(row.prices, (o) => {
                  let priceInKrw = 0;
                  priceInKrw =
                    parseFloat(exchange[o.cur_unit]) * o.localPrice * 0.9;
                  if (o.cur_unit === "JPY(100)") priceInKrw = priceInKrw / 100;

                  const diff = priceInKrw - row.domesticPrice;

                  return (
                    <TableCell>
                      <Box
                        sx={{
                          fontWeight: "500",
                          fontSize: "1rem",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {priceInKrw.toLocaleString()}
                      </Box>
                      <Box>{diff.toLocaleString()}</Box>
                      {/* <Box>{`${o.localPrice} ${o.currencySymbol}`}</Box> */}
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
