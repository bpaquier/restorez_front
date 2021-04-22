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

function ReservationsList({ reservationsList }) {
  return (
    <Table aria-label="simple table" className={css.table}>
      <TableHead>
        <TableRow>
          <TableCell align="center">Nom</TableCell>
          <TableCell align="center">Couverts</TableCell>
          <TableCell align="center">Heure</TableCell>
          <TableCell align="center">Contact</TableCell>
          <TableCell align="center">Prepaiement</TableCell>
          <TableCell align="center"></TableCell>
          <TableCell align="center"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {reservationsList?.map((reservation, index) => (
          <TableRow key={index}>
            <TableCell align="center">{reservation?.customer_name}</TableCell>
            <TableCell align="center">
              {reservation?.customer_quantity}
            </TableCell>
            <TableCell align="center">
              {reservation?.hour?.substr(0, 5)}
            </TableCell>
            <TableCell align="center">
              <div>
                <p>{reservation?.customer_email}</p>
                <p>{reservation?.customer_phone}</p>
              </div>
            </TableCell>
            <TableCell align="center">
              <div>
                {reservation?.prepayment
                  ? reservation?.prepayment +
                    " " +
                    reservation?.prepayment_currency
                  : "-"}
              </div>
            </TableCell>
            <TableCell align="right">
              <Button variant="contained" color="primary">
                modifier
              </Button>
            </TableCell>
            <TableCell align="right">
              <Button variant="contained" color="secondary">
                supprimer
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

ReservationsList.defaultProps = {};

export default ReservationsList;

/*
 */
