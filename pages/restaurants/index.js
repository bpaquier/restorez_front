import React, { useContext, useEffect, useState } from "react";

import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { userContext } from "../../context/userContext";

import RestaurantsList from "../../Components/RestaurantsList";
import Form from "../../Components/Form";
import Button from "@material-ui/core/Button";

import classnames from "classnames/bind";
import css from "./styles.module.scss";
const cx = classnames.bind(css);

export default function RestaurantPage() {
  const { user } = useContext(userContext);

  const [display, setDisplay] = useState("list");

  const [restaurantsList, setRestaurantsList] = useState(null);
  useEffect(() => {
    if (user) {
      getRestaurants(user?.id);
    }
  }, [user]);

  const getRestaurants = async (id) => {
    axios
      .get(`http://localhost:5000/restaurants/all-restaurants/${id}`)
      .then((rep) => setRestaurantsList(rep?.data?.data));
  };

  const handleSubmit = (values) => {
    const data = { ...values, id_restaurateur: user?.id };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.accessToken}`,
    };
    axios
      .post(`http://localhost:5000/restaurants`, data, {
        headers: headers,
      })
      .then((rep) => {
        if (rep?.data?.status === 200) {
          setDisplay("list");
          getRestaurants(user?.id);
          toast.success("Restaurant bien enregistré");
        }
      })
      .catch((err) => {
        const message = err?.response?.data?.errors?.[0];
        toast.error(message);
      });
  };
  return (
    <main>
      <Toaster position="bottom-center" />
      {display === "form" && (
        <>
          <div className={css.formContainer}>
            <div className={css.form}>
              <Form
                submitText={"Créer"}
                title="Ajouter un restaurant"
                handleSubmit={handleSubmit}
                inputs={[
                  {
                    label: "Nom",
                    name: "name",
                    type: "text",
                    id: 1,
                  },
                  {
                    label: "Adress",
                    name: "adress",
                    type: "text",
                    id: 2,
                  },
                  {
                    label: "Heure d'ouverture",
                    name: "opening_time",
                    type: "text",
                    id: 3,
                  },
                ]}
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setDisplay("list")}
            >
              retour à la liste
            </Button>
          </div>
          <div className={css.alert}></div>
        </>
      )}
      {display === "list" && (
        <>
          <div className={css.header}>
            <h1 className={css.title}>Vos restaurants</h1>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setDisplay("form")}
            >
              Ajouter un restaurant
            </Button>
          </div>
          {restaurantsList && <RestaurantsList list={restaurantsList} />}
        </>
      )}
    </main>
  );
}
