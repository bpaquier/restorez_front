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
            },
            {
              label: "Adress",
              name: "adress",
              type: "text",
            },
            {
              label: "Heure d'ouverture",
              name: "opening_time",
              type: "text",
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
            },
            {
              label: "Date",
              name: "date",
              type: "date",
            },
            {
              label: "Type",
              name: "type",
              type: "text",
            },
            {
              label: "Heure de début",
              name: "start_hour",
              type: "time",
            },
            {
              label: "Heure de fin",
              name: "end_hour",
              type: "time",
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
            },
            {
              label: "Email de réservation",
              name: "customer_email",
              type: "email",
            },
            {
              label: "Téléphone de réservation",
              name: "customer_phone",
              type: "tel",
            },
            {
              label: "Nom",
              name: "customer_name",
              type: "text",
            },
            {
              label: "Heure de réservation",
              name: "hour",
              type: "time",
            },
          ]}
        />
      </main>
    </>
  );
}
