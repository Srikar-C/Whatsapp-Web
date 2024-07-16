import React, { useState } from "react";

export default function Sample() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhn] = useState("");
  const [address, setAddress] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitted(true);
  }

  function handleUpdate() {
    setIsSubmitted(false);
  }

  return (
    <form className="Form" onSubmit={handleSubmit}>
      <div className="heading">
        <h2>Contact Form</h2>
      </div>
      <div className="details">
        <div>
          <label>Name: </label>
          {isSubmitted ? (
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled
            />
          ) : (
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
        </div>

        <div>
          <label>Email: </label>
          {isSubmitted ? (
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled
            />
          ) : (
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          )}
        </div>

        <div>
          <label>Phone: </label>

          {isSubmitted ? (
            <input
              type="tel"
              name="phone"
              value={phone}
              onChange={(e) => setPhn(e.target.value)}
              required
              disabled
            />
          ) : (
            <input
              type="tel"
              name="phone"
              value={phone}
              onChange={(e) => setPhn(e.target.value)}
              required
            />
          )}
        </div>

        <div>
          <label>Address: </label>

          {isSubmitted ? (
            <input
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              disabled
            />
          ) : (
            <input
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          )}
        </div>
        <br />
        <button type="submit">Submit</button>
      </div>

      {isSubmitted && (
        <div className="display-data">
          <h3>Submitted Data:</h3>
          <p>
            <strong>Name: </strong> {name}{" "}
          </p>
          <p>
            <strong>Email: </strong> {email}{" "}
          </p>
          <p>
            <strong>Phone: </strong> {phone}{" "}
          </p>
          <p>
            <strong>Address: </strong> {address}{" "}
          </p>
          <button type="submit" onClick={handleUpdate}>
            Update
          </button>
        </div>
      )}
    </form>
  );
}
