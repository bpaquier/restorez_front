import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";

export default function ServicesList({ servicesList }) {
  const filterList = (arr) => {
    return arr.sort(function (a, b) {
      return (
        new Date(a.date) - new Date(b.date) ||
        a.start_hour.localeCompare(b.start_hour)
      );
    });
  };
  return (
    servicesList.length > 0 &&
    filterList(servicesList).map((service, index) => {
      return (
        <TableRow key={index}>
          <TableCell component="th" scope="row">
            {new Date(service.date).toLocaleDateString()}
          </TableCell>
          <TableCell align="left">{service.start_hour}</TableCell>
          <TableCell align="left">{service.end_hour}</TableCell>
          <TableCell align="left">{service.capacity}</TableCell>
          <TableCell align="left">{service.reservations_quantity}</TableCell>
          <TableCell align="right">
            <Button
              variant="contained"
              color="primary"
              href="#contained-buttons"
            >
              Ajouter une réservation
            </Button>
          </TableCell>
        </TableRow>
      );
    })
  );
}
