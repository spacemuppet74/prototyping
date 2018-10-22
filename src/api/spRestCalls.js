import { sp } from "@pnp/sp";

class SpRestCalls {
  getRecords() {
    return sp.web.lists.getByTitle("prototype").items.get();
  }

  postRecord({ Title }) {
    return sp.web.lists.getByTitle("prototype").items.add({
      Title
    });
  }

  updateRecord({ Id, Title }) {
    return sp.web.lists
      .getByTitle("prototype")
      .items.getById(Id)
      .update({
        Title
      });
  }

  deleteRecord(recordId) {
    return sp.web.lists
      .getByTitle("prototype")
      .items.getById(recordId)
      .delete();
  }
}

const spRestCalls = new SpRestCalls();

export default spRestCalls;
