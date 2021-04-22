import axios from "axios";
import { useState, useEffect, useContext } from "react"
import { useRouter } from 'next/router'
import classnames from "classnames/bind";
import css from "../styles.module.scss";
import CustomHead from "../../Components/Head/index";
import { userContext } from "../../context/userContext"

const cx = classnames.bind(css)

export default function index() {

  const [servicesList, setServicesList] = useState([])
  const { user } = useContext(userContext)

  const getServices = async () => {
    return await axios.get('http://localhost:5000/services/id-restaurant/70')
  }

  useEffect(() => {
    if(user) {
      getServices()
        .then((rep) => {
          setServicesList(rep?.data?.data)
          console.log(rep?.data?.data)
        })
    }
  }, [user])

  return (
      <main>
        {
          servicesList.map((service) =>{
            console.log(service)
            return <div key={service.id_service}>{service.capacity}</div>
          })
        }
      </main>
  )
}
