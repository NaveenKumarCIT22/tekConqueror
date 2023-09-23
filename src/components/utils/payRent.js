import axios from "axios";

export function payRent(currentParticipant, property) {
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
