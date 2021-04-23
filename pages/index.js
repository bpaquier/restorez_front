import React, { useContext, useEffect, useState } from "react";
import Router from "next/router";

import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { userContext } from "../context/userContext";

import RestaurantsList from "../Components/RestaurantsList";
import Form from "../Components/Form";
import Button from "@material-ui/core/Button";

import classnames from "classnames/bind";
import css from "./styles.module.scss";
const cx = classnames.bind(css);

export default function RestaurantPage() {
  const { user } = useContext(userContext);

  const [display, setDisplay] = useState("list");
  const [restaurantsList, setRestaurantsList] = useState(null);
  useEffect(() => {
    if (user?.id) {
      getRestaurants(user?.id);
    }
  }, [user?.id]);

  useEffect(() => {
    if (!user) {
      Router.push("/login");
    }
  }, [user]);

  const getRestaurants = async (id) => {
    axios
      .get(`http://localhost:5000/restaurants/all-restaurants/${id}`)
      .then((rep) => setRestaurantsList(rep?.data?.data))
      .catch((err) => {
        console.log(err?.response);
        if (err?.response?.status === 404) {
          setRestaurantsList(null);
        }
      });
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

  const deleteRestaurant = (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.accessToken}`,
    };

    axios
      .delete(`http://localhost:5000/restaurants/${id}`, {
        headers: headers,
      })
      .then((rep) => {
        getRestaurants(user?.id);
        toast.success("Restaurant supprimé");
      })
      .catch((err) => console.log(err?.response));
  };

  return (
    user &&
    Object.keys(user).length !== 0 && (
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
            {restaurantsList ? (
              <RestaurantsList
                list={restaurantsList}
                deleteRestaurant={deleteRestaurant}
              />
            ) : (
              <div>Ajouter votre premier restaurant 👨‍🍳</div>
            )}
          </>
        )}
      </main>
    )
  );
}
