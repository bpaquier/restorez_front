import Form from "../../Components/Form";
import CustomHead from "../../Components/Head";
import css from "../styles.module.scss";

export default function FormPage() {
  return (
    <>
      <CustomHead />
      <main className={css.pageContainer}>
        <Form
          submitText={"Créer"}
          title="Ajouter un restaurant"
          handleSubmit={() => {}}
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

        <Form
          submitText={"Créer"}
          title="Ajouter un service"
          handleSubmit={() => {}}
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

        <Form
          submitText={"Créer"}
          title="Ajouter une réservation"
          handleSubmit={() => {}}
          inputs={[
            {
              label: "Nombre de personne",
              name: "amount",
              type: "number",
              id: 1,
            },
            {
              label: "Email de réservation",
              name: "customer_email",
              type: "email",
              id: 2,
            },
            {
              label: "Téléphone de réservation",
              name: "customer_phone",
              type: "tel",
              id: 3,
            },
            {
              label: "Nom",
              name: "customer_name",
              type: "text",
              id: 4,
            },
            {
              label: "Heure de réservation",
              name: "hour",
              type: "time",
              id: 5,
            },
          ]}
        />
      </main>
    </>
  );
}
