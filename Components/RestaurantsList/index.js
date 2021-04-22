import React from "react";
import classnames from "classnames/bind";
import css from "./styles.module.scss";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";

const cx = classnames.bind(css);

function RestaurantsList({ list }) {
  return (
    <Table aria-label="simple table" className={css.table}>
      <TableHead>
        <TableRow>
          <TableCell>Enseigne</TableCell>
          <TableCell align="left">Adresse</TableCell>
          <TableCell align="left">Heures d'ouverture</TableCell>
          <TableCell align="right"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {list?.map((restaurant, index) => (
          <TableRow key={index}>
            <TableCell component="th" scope="row">
              {restaurant.name}
            </TableCell>
            <TableCell align="left">{restaurant.adress}</TableCell>
            <TableCell align="left">{restaurant.opening_time}</TableCell>
            <TableCell align="right">
              <Button
                variant="contained"
                color="primary"
                href="#contained-buttons"
              >
                Link
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

RestaurantsList.defaultProps = {};

export default RestaurantsList;
