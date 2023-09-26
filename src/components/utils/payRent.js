import axios from "axios";

export function payRent(currentParticipant, property) {
  console.log("inside payrent");
  axios
    .post(
      "/rent",
      { player: currentParticipant, property },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((r) => {
      console.log(r.data);
    });
}
