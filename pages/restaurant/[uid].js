import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import CustomHead from "../../Components/Head/index";
import { userContext } from "../../context/userContext";
import Form from "../../Components/Form";
import toast, { Toaster } from "react-hot-toast";

import classnames from "classnames/bind";
import css from "../styles.module.scss";
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
    if (uid) {
      return await axios
        .get(`http://localhost:5000/services/id-restaurant/${uid}`)
        .then((rep) => rep.data);
    }
  };

  const getRestaurantById = async (uid) => {
    return await axios
      .get(`http://localhost:5000/restaurants/${uid}`)
      .then((rep) => rep.data);
  };

  const handleSubmit = (values) => {
    const data = { ...values, id_restaurant: uid };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.accessToken}`,
    };
    axios
      .post(`http://localhost:5000/services`, data, {
        headers: headers,
      })
      .then((rep) => {
        if (rep?.data?.status === 200) {
          setDisplay("list");
          getRestaurants(user?.id);
          toast.success("Restaurant bien enregistré");
        }
      })
      .then(() => {
        getServices(uid).then((data) => {
          setServicesList(data.data);
        });
      })
      .catch((err) => {
        const message = err?.response?.data?.errors?.[0];
        toast.error(message);
      });
  };

  useEffect(() => {
    if (uid) {
      getServices(uid).then((data) => {
        setServicesList(data.data);
      });
      getRestaurantById(uid).then((data) => {
        setRestaurantName(data.data.name);
      });
    }
  }, [uid]);

  return (
    <>
      <CustomHead />
      <main>
        {display === "list" ? (
          <>
            <h1 className={css.title}>
              Vos services du restaurant : {restaurantName}
              <Button
                variant="contained"
                color="primary"
                onClick={() => setDisplay("form")}
              >
                Ajouter un service
              </Button>
            </h1>
            <section>
              {servicesList && (
                <Table aria-label="simple table" className={css.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Date</TableCell>
                      <TableCell align="left">Heure de début</TableCell>
                      <TableCell align="left">Heure de fin</TableCell>
                      <TableCell align="left">Capacité du service</TableCell>
                      <TableCell align="left">Couverts reservés</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <ServicesList servicesList={servicesList} />
                  </TableBody>
                </Table>
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
