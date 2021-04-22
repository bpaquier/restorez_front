import React, { useContext, useEffect, useState } from "react";
import classnames from "classnames/bind";
import axios from "axios";
import { userContext } from "../../context/userContext";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import css from "./styles.module.scss";
const cx = classnames.bind(css);

export default function RestaurantPage() {
  const [restaurantsList, setRestaurantsList] = useState(null);
  const { user } = useContext(userContext);

  const getRestaurants = async (id) => {
    return axios.get(`http://localhost:5000/restaurants/all-restaurants/${id}`);
  };

  useEffect(() => {
    if (user) {
      getRestaurants(user?.id).then((rep) =>
        setRestaurantsList(rep?.data?.data)
      );
    }
  }, [user]);

  console.log(restaurantsList);

  return (
    <main>
      <h1 className={css.title}>Vos restaurants</h1>
      <section>
        {restaurantsList && (
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
              {restaurantsList?.map((restaurant, index) => (
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
        )}
      </section>
    </main>
  );
}
