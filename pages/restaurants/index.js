import React, { useContext, useEffect, useState } from "react";
import classnames from "classnames/bind";
import axios from "axios";
import { userContext } from "../../context/userContext";

import css from "./styles.module.scss";
import RestaurantsList from "../../Components/RestaurantsList";
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
        {restaurantsList && <RestaurantsList list={restaurantsList} />}
      </section>
    </main>
  );
}
