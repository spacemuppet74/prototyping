import { sp } from "@pnp/sp";

class SpRestCalls {
  postRecord({ email }) {
    return sp.web.lists.getByTitle("prototype").items.add({
      Title: email
    });
  }
}

const spRestCalls = new SpRestCalls();

export default spRestCalls;
