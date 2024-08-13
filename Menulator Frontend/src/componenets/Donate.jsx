import React, { useEffect, useState } from "react";
import Popup from "./Popup";

// IN DEVELOPMENT
// Connection to Stripe via API functionality

export default function Donate(props) {
  const { toggleScreen } = props;
  const [donationId, setDonationId] = useState(1);
  const [donationAmount, setDonationAmount] = useState();

  let donations = [1, 5, 10, 20]
  function clickDonation(e) {
    setDonationId(parseInt(e.target.value))
  }

  useEffect(()=>{
    setDonationAmount(donations[donationId - 1])
  }, [donationId])
  // Stripe Function for Donate Click
  function runCheckoutServer(e) {
    e.preventDefault();
    fetch("http://localhost:3000/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          { id: donationId, quantity: 1 },
        ],
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        window.location = url;
      })
      .catch((e) => {
        console.error(e.error);
      });
  }

  return (
    <Popup close={toggleScreen}>
      <h1>Support Menulator!</h1>

      <h2 className="txt center">
        If you love Menulator and want to see more features released, make a
        donation today!
      </h2>
      <div className="flex align gap">
        Select Donation Amount
        <div className="donationButtons">
        <button onClick={clickDonation} value={1} className="btn donation" >$1 Donation</button>
        <button onClick={clickDonation} value={2} className="btn donation" >$5 Donation</button>
        <button onClick={clickDonation} value={3} className="btn donation" >$10 Donation</button>
        <button onClick={clickDonation} value={4} className="btn donation" >$20 Donation</button>
        </div>
        <h2>Current Donation: ${donationAmount}</h2>
      </div>
      <form className="flex row gap">
        <button className="btn select" onClick={runCheckoutServer}>
          Make Donation
        </button>
      </form>
    </Popup>
  );
}
