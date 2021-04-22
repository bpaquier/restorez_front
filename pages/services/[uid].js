import axios from "axios";
import { useState, useEffect, useContext } from "react"
import { useRouter } from 'next/router'
import CustomHead from "../../Components/Head/index";
import { userContext } from "../../context/userContext"

import classnames from "classnames/bind";
import css from "../styles.module.scss";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";

const cx = classnames.bind(css)

export default function index() {

  const router = useRouter()
  const { uid } = router.query
  console.log(uid)

  const [servicesList, setServicesList] = useState([])
  const { user } = useContext(userContext)

  const getServices = async () => {
    if(uid) {
      return await axios.get(`http://localhost:5000/services/id-restaurant/${uid}`)
    }
  }

  const getRestaurantById = async () => {
    return await axios.get(`http://localhost:5000/restaurant/${uid}`)
  }

  useEffect(() => {
    if(user) {
      getServices()
        .then((rep) => {
          setServicesList(rep?.data?.data)
        })
    }
  }, [user])

  const servicesListFiltered = servicesList.sort(function(a,b){
    return (new Date(a.date) - new Date(b.date)) || a.start_hour.localeCompare(b.start_hour);
  });



  return (
    <>
      <CustomHead />
      <main>
        <h1 className={css.title}>Vos services du restaurant : NomRestaurant</h1>
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
                {
                  servicesListFiltered.map((service, index) => {
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {service.date}
                      </TableCell>
                      <TableCell align="left">{service.start_hour}</TableCell>
                      <TableCell align="left">{service.end_hour}</TableCell>
                      <TableCell align="left">{service.capacity}</TableCell>
                      <TableCell align="left">{service.reservation_quantity}</TableCell>
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
                  })
                }
              </TableBody>
            </Table>
          )}
        </section>
      </main>
    </>
  )
}
