import React, { useState } from "react";
import StyledInput from "./StyledInput";
import Loader from "./Loader";
import {
  insertSpace,
  removeSpace,
  insertSlash,
  removeSlash,
  cardRegEx,
  codeRegEx,
  expRegEx,
  makePayment,
} from "../helpers";

export default function CreditCard({ setComplete }) {
  const [cardNum, setCardNum] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [exp, setExp] = useState("");
  const [name, setName] = useState("");
  const [isValid, setIsValid] = useState({
    cardNumValid: null,
    securityCodeValid: null,
    expValid: null,
    nameValid: null,
  });
  const [loading, setLoading] = useState(false);

  function validateInput() {
    const cardNumValid = cardRegEx.test(cardNum);
    const securityCodeValid = codeRegEx.test(securityCode);
    const expValid = expRegEx.test(exp);
    const nameValid = Boolean(name.length);

    setIsValid({
      cardNumValid,
      securityCodeValid,
      expValid,
      nameValid,
    });

    return [cardNumValid, securityCodeValid, expValid, nameValid].every(
      (v) => v
    );
  }

  async function submitForm() {
    if (validateInput()) {
      setLoading(true);
      await makePayment({
        body: {
          cardNum,
          securityCode,
          exp,
          name,
        },
      });

      setLoading(false);
      setComplete(true);
    }
  }

  function handleValueChange(e, set, len, formatter) {
    const value = formatter ? formatter(e.target.value) : e.target.value;

    if (value.match(/^[0-9]*$/) && value.length <= len) {
      set(value);
    }
  }

  return (
    <div className="mw6 w-90 ba bg-white">
      <form className="pa4 black-80">
        <StyledInput
          label="Card number"
          id="cardNumber"
          value={insertSpace(cardNum)}
          handleChange={(e) =>
            handleValueChange(e, setCardNum, 16, removeSpace)
          }
          isValid={isValid.cardNumValid}
          warningText="Invalid card number"
        />

        <StyledInput
          label="Name on card"
          id="name"
          value={name}
          handleChange={(e) => setName(e.target.value)}
          isValid={isValid.nameValid}
          warningText="You must provide a name"
        />

        <div className="flex justify-between flex-wrap-m">
          <div className="w-100 pr2-l">
            <StyledInput
              label="Expiration date (MM / YYYY)"
              id="exp"
              value={insertSlash(exp)}
              handleChange={(e) => handleValueChange(e, setExp, 6, removeSlash)}
              isValid={isValid.expValid}
              warningText="Not a valid date"
            />
          </div>

          <div className="w-100 pl2-l">
            <StyledInput
              label="Security code"
              id="securityCode"
              value={securityCode}
              handleChange={(e) => handleValueChange(e, setSecurityCode, 4)}
              isValid={isValid.securityCodeValid}
              warningText="Invalid security code"
            />
          </div>
        </div>
        <div className="w-100 flex justify-end">
          <div
            className="f6 link dim ba ph3 pv2 dib black pointer flex justify-center"
            style={{ width: 80 }}
            onClick={submitForm}
          >
            {loading ? <Loader /> : "Submit"}
          </div>
        </div>
      </form>
    </div>
  );
}
