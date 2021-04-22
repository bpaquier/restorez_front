import styles from "../styles/Home.module.css";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51IiewUHv3LwBSOHcbDnAslOArSH2dGjSoSa2oVhfsPSo8tODPIWYvUhf2AhkYba3Py4nIgudzUCbRMYxriEsegCo00FQtPH9Kh"
);

export default function Home() {
  const handleClick = async (event) => {
    // Get Stripe.js instance
    const stripe = await stripePromise;

    // Call your backend to create the Checkout Session
    const response = await fetch(
      "http://localhost:5000/reservations/checkout",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          amount: 2050,
          currency: "eur",
          name: "BARBYLONE",
          reservation_id: 76,
          success_url: "https://example.com/success",
          cancel_url: "https://example.com/cancel",
        }),
      }
    );

    const session = await response.json();
    console.log(session);

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    console.log(result);

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };

  return (
    <button role="link" onClick={handleClick}>
      Checkout
    </button>
  );
}
