import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51IiewUHv3LwBSOHcbDnAslOArSH2dGjSoSa2oVhfsPSo8tODPIWYvUhf2AhkYba3Py4nIgudzUCbRMYxriEsegCo00FQtPH9Kh"
);

import { API_URL } from "../../config";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { userContext } from "../../context/userContext";
import Button from "@material-ui/core/Button";
import Form from "../../Components/Form";
import { TextField, Box } from "@material-ui/core/";

import classnames from "classnames/bind";
import css from "./styles.module.scss";
import ReservationsList from "../../Components/ReservationsList";
const cx = classnames.bind(css);

export default function ReservationsPage() {
  const { user } = useContext(userContext);
  const router = useRouter();
  const serviceId = router?.query?.uid;

  const [formState, setFormState] = useState(null);
  const [reservationId, setReservationId] = useState(null);
  const [restaurantName, setRestaurantName] = useState(null);

  const [display, setDisplay] = useState("list");
  const [reservationsList, setReservationsList] = useState(null);
  const [serviceInfos, setServiceInfos] = useState(null);
  console.log(reservationsList);
  useEffect(() => {
    if (serviceId) {
      getReservations(serviceId);
      getServiceInfos(serviceId);
    }
  }, [serviceId]);

  useEffect(() => {
    if (serviceInfos) {
      getRestaurantName(serviceInfos?.id_restaurant);
    }
  }, [serviceInfos]);

  const getRestaurantName = (id) => {
    axios.get(`${API_URL}/restaurants/${id}`).then((rep) => {
      setRestaurantName(rep?.data?.data?.name);
    });
  };

  useEffect(() => {
    if (!user) {
      Router.push("/login");
    }
  }, [user]);

  const getServiceInfos = async (id) => {
    axios
      .get(`${API_URL}/services/${id}`)
      .then((rep) => setServiceInfos(rep?.data?.data))
      .catch((rep) => console.log(rep?.response));
  };

  const getReservations = async (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.accessToken}`,
    };
    axios
      .get(`${API_URL}/reservations/id-service/${id}`, {
        headers: headers,
      })
      .then((rep) => {
        console.log(rep?.data?.data);
        setReservationsList(rep?.data?.data);
      })
      .catch((err) => {
        console.log(err?.response);
        if (err?.response?.status === 404) {
          setReservationsList(null);
        }
      });
  };

  const formatDate = (arg) => {
    const date = new Date(arg);
    const day = date?.getDay();
    const month = date?.getMonth();
    const year = date?.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = (values) => {
    const data = { ...values, id_service: serviceId };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.accessToken}`,
    };

    axios
      .post(`${API_URL}/reservations`, data, {
        headers: headers,
      })
      .then((rep) => {
        if (rep?.data?.status === 200) {
          getReservations(serviceId);
          getServiceInfos(serviceId);
          setFormState("submited");
          setReservationId(rep?.data?.data?.[0]?.id_reservation);
          toast.success("Réservation bien enregistré");
        }
      })
      .catch((err) => {
        const message = err?.response?.data?.errors?.[0];
        console.log(message);
        if (Array.isArray(message)) {
          message?.forEach((error) => {
            toast?.error(error?.param + " : " + error?.msg);
          });
        } else {
          toast?.error(message);
        }
      });
  };

  const handlePayment = async (value) => {
    // Get Stripe.js instance
    const stripe = await stripePromise;

    // Call your backend to create the Checkout Session
    const response = await fetch(`${API_URL}/reservations/checkout`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        amount: parseFloat(value?.amount) * 100,
        currency: "eur",
        name: restaurantName,
        reservation_id: reservationId,
        success_url: `http://localhost:3000/service/${serviceId}`,
        cancel_url: `http://localhost:3000/service/${serviceId}`,
      }),
    });

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      toast.error("Network error");
    }
  };

  const deleteReservation = async (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.accessToken}`,
    };

    axios
      .delete(`${API_URL}/reservations/id-reservation/${id}`, {
        headers: headers,
      })
      .then((rep) => {
        getReservations(serviceId);
        getServiceInfos(serviceId);
        toast.success("Reservation supprimée");
      })
      .catch((err) => console.log(err?.response));
  };

  return (
    user &&
    Object.keys(user).length !== 0 && (
      <main>
        <Toaster position="bottom-center" />
        <button className={css.backButton}>
          <a href={`/restaurant/${serviceInfos?.id_restaurant}`}>
            Retour à la liste des services du restaurant " {restaurantName} "
          </a>
        </button>
        <div className={css.serviceInfos}>
          <div className={css.header}>
            <h1 className={css.title}>
              {display === "list"
                ? "Vos réservations"
                : "Ajouter une réservation"}
            </h1>
            {display === "list" ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setDisplay("form")}
              >
                Ajouter une reservation
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setDisplay("list");
                  setFormState(null);
                  setReservationId(null);
                }}
              >
                retour à la liste
              </Button>
            )}
          </div>
          <div>
            <p>
              Service du {formatDate(serviceInfos?.date)} de{" "}
              {serviceInfos?.start_hour?.substr(0, 5)} à{" "}
              {serviceInfos?.end_hour?.substr(0, 5)}
            </p>
            <p>
              Nombre de couverts réservés :{" "}
              {serviceInfos?.reservations_quantity}
            </p>
            <p>
              Nombre de couverts ouverts à la reservation :{" "}
              {serviceInfos?.capacity}
            </p>
          </div>
        </div>
        {display === "list" &&
          (reservationsList?.length > 0 ? (
            <ReservationsList
              reservationsList={reservationsList}
              deleteReservation={deleteReservation}
            />
          ) : (
            <p>Aucunes reservations pour ce service</p>
          ))}
        {display === "form" && (
          <>
            <div className={css.formContainer}>
              <div className={css.form}>
                <Form
                  submitText={"Créer"}
                  handleSubmit={handleSubmit}
                  inputs={[
                    {
                      label: "Nombre de personne",
                      name: "customer_quantity",
                      type: "number",
                      id: 1,
                      required: true,
                    },
                    {
                      label: "Email de réservation",
                      name: "customer_email",
                      type: "email",
                      id: 2,
                      required: true,
                    },
                    {
                      label: "Téléphone de réservation",
                      name: "customer_phone",
                      type: "tel",
                      id: 3,
                      required: true,
                    },
                    {
                      label: "Nom",
                      name: "customer_name",
                      type: "text",
                      id: 4,
                      required: true,
                    },
                    {
                      label: "Heure de réservation",
                      name: "hour",
                      type: "time",
                      id: 5,
                      required: true,
                    },
                  ]}
                />
              </div>
              {formState === "submited" && (
                <>
                  <div className={css.form}>
                    <Form
                      submitText={"Prépayer"}
                      title="Invitez des amis! ajoutez un prépaiement"
                      handleSubmit={handlePayment}
                      inputs={[
                        {
                          label: "Montant (en euros)",
                          name: "amount",
                          type: "number",
                          id: 1,
                          required: true,
                        },
                      ]}
                    />
                  </div>

                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      setDisplay("list");
                      setFormState(null);
                      setReservationId(null);
                    }}
                  >
                    non merci
                  </Button>
                </>
              )}
            </div>
          </>
        )}
      </main>
    )
  );
}
