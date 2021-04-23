import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import CustomHead from "../../Components/Head/index";
import { userContext } from "../../context/userContext";
import Form from "../../Components/Form";
import toast, { Toaster } from "react-hot-toast";
import { API_URL } from "../../config";

import classnames from "classnames/bind";
import css from "./styles.module.scss";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ServicesList from "../../Components/ServicesList";
import Button from "@material-ui/core/Button";

const cx = classnames.bind(css);

export default function index() {
  const [servicesList, setServicesList] = useState([]);
  const [restaurantName, setRestaurantName] = useState("");
  const [display, setDisplay] = useState("list");

  const router = useRouter();
  const { uid } = router?.query;
  const { user } = useContext(userContext);

  const getServices = async (uid) => {
    axios
      .get(`${API_URL}/services/id-restaurant/${uid}`)
      .then((rep) => setServicesList(rep?.data?.data))
      .catch((err) => {
        console.log(err.response);
        setServicesList([]);
      });
  };

  const getRestaurantById = async (uid) => {
    return await axios
      .get(`${API_URL}/restaurants/${uid}`)
      .then((rep) => rep.data);
  };

  const handleSubmit = (values) => {
    const data = { ...values, id_restaurant: uid };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.accessToken}`,
    };
    axios
      .post(`${API_URL}/services`, data, {
        headers: headers,
      })
      .then((rep) => {
        if (rep?.data?.status === 200) {
          //getRestaurants(user?.id);
          getServices(uid);
          setDisplay("list");
          toast.success("Restaurant bien enregistré");
        }
      })
      .catch((err) => {
        const message = err?.response?.data?.errors?.[0];
        toast.error(message);
      });
  };

  useEffect(() => {
    if (uid) {
      getServices(uid);
      getRestaurantById(uid).then((data) => {
        setRestaurantName(data.data.name);
      });
    }
  }, [uid]);

  const deleteService = (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.accessToken}`,
    };

    axios
      .delete(`${API_URL}/services/${id}`, {
        headers: headers,
      })
      .then((rep) => {
        getServices(uid);
        toast.success("Service supprimé");
      })
      .catch((err) => console.log(err?.response));
  };
  console.log(servicesList);

  return (
    <>
      <CustomHead />

      <main>
        <Toaster position="bottom-center" />
        <button className={css.backButton}>
          <a href="/">Retour à la liste des restaurants</a>
        </button>
        {display === "list" ? (
          <>
            <div className={css.header}>
              <h1 className={css.title}>Vos services : "{restaurantName}"</h1>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setDisplay("form")}
              >
                Ajouter un service
              </Button>
            </div>
            <section>
              {servicesList && servicesList?.length > 0 ? (
                <Table aria-label="simple table" className={css.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Date</TableCell>
                      <TableCell align="left">Heure de début</TableCell>
                      <TableCell align="left">Heure de fin</TableCell>
                      <TableCell align="left">Capacité du service</TableCell>
                      <TableCell align="left">Couverts reservés</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <ServicesList
                      servicesList={servicesList}
                      deleteService={deleteService}
                    />
                  </TableBody>
                </Table>
              ) : (
                <div>Créez votre premier service 🍽️</div>
              )}
            </section>
          </>
        ) : (
          <>
            <div className={css.formContainer}>
              <div className={css.form}>
                <Form
                  submitText={"Créer"}
                  title="Ajouter un service"
                  handleSubmit={handleSubmit}
                  inputs={[
                    {
                      label: "Nombre de personne max",
                      name: "capacity",
                      type: "number",
                      id: 1,
                    },
                    {
                      label: "Date",
                      name: "date",
                      type: "date",
                      id: 2,
                    },
                    {
                      label: "Type",
                      name: "type",
                      type: "text",
                      id: 3,
                    },
                    {
                      label: "Heure de début",
                      name: "start_hour",
                      type: "time",
                      id: 4,
                    },
                    {
                      label: "Heure de fin",
                      name: "end_hour",
                      type: "time",
                      id: 5,
                    },
                  ]}
                />
              </div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setDisplay("list")}
              >
                Retour à la liste
              </Button>
            </div>
          </>
        )}
      </main>
    </>
  );
}
