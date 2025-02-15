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

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function ProductsPage() {
  const products = useSelector(selectProducts);
  const exchange = useSelector(selectTodayDealBasRByCurrency);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>상품</TableCell>
            <TableCell align="right">한국</TableCell>
            <TableCell align="right">일본</TableCell>
            <TableCell align="right">프랑스</TableCell>
            <TableCell align="right">미국</TableCell>
            <TableCell align="right">홍콩</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((row) => {
            return (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.productName}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.domesticPrice.toLocaleString()}
                </TableCell>

                {flatMap(row.prices, (o) => {
                  let priceInKrw = 0;
                  priceInKrw = parseFloat(exchange[o.cur_unit]) * o.localPrice;
                  if (o.cur_unit === "JPY(100)") priceInKrw = priceInKrw / 100;

                  return (
                    <TableCell align="right">
                      <div>{`${o.localPrice} ${o.currencySymbol}`}</div>
                      <div>{priceInKrw.toLocaleString()}</div>
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
function selectTodayDeal_bas_rByCurrency(state: unknown): unknown {
  throw new Error("Function not implemented.");
}
