export const cardRegEx = new RegExp(
  /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/
);
export const codeRegEx = new RegExp(/^[0-9]{3,4}$/);
export const expRegEx = new RegExp(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/);

export function insertSpace(cardNumber) {
  return cardNumber
    .split("")
    .reduce((acc, cur, index) => {
      acc.push(cur);

      if ((index + 1) % 4 === 0) {
        acc.push(" ");
      }

      return acc;
    }, [])
    .join("")
    .trim();
}

export function removeSpace(spaced) {
  return spaced
    .split("")
    .reduce((acc, cur) => {
      if (cur !== " ") {
        acc.push(cur);
      }

      return acc;
    }, [])
    .join("");
}

export function insertSlash(date) {
  if (date.length < 2) return date;

  const a = date.split("");
  a.splice(2, 0, " / ");
  return a.join("");
}

export function removeSlash(date) {
  if (date[date.length - 1] === "/") return date[0];

  const month = date.slice(0, 2);
  const year = date.slice(5, date.length);
  return month.concat(year);
}

async function stall() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
}

export async function makePayment({ body }) {
  // get rid od unused var error
  console.log(body);

  //Do something like this if there was an actual server
  /*
  const res = await fetch("https://tirrel.io/api/payment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  const json = await response.json();

  // maybe returns order id, or other metadata about the purchase
  
  return json;
  */

  await stall();
}
