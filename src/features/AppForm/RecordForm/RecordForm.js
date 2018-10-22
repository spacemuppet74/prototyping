import React from "react";
import { Formik } from "formik";
import { Form, Button, Segment, Header } from "semantic-ui-react";
import { connect } from "react-redux";

import spRestCall from "../../../api/spRestCalls";
import { addNewRecord, updatedRecord } from "../../../actions/recordActions";

const defaultValues = {
  Title: ""
};

const RecordForm = ({ addNewRecord, record, updatedRecord }) => {
  console.log("active record ", record);

  const handleFormSubmit = async (values, actions) => {
    console.log("new record", values);

    if (values.Id) {
      const result = await spRestCall.updateRecord(values);
      console.log("update record ", result);
      updatedRecord(values);
    } else {
      const { data, item } = await spRestCall.postRecord(values);
      addNewRecord(data);
    }

    actions.resetForm();
    actions.setSubmitting(false);
  };

  return (
    <Segment>
      <Header as="h2" content="Add/Update Record" />
      <Formik
        initialValues={{ ...record }}
        onSubmit={handleFormSubmit}
        enableReinitialize={true}
        render={props => {
          return (
            <Form onSubmit={props.handleSubmit}>
              <Form.Field>
                <label htmlFor="">Record</label>
                <input
                  name="Title"
                  type="text"
                  value={props.values.Title}
                  onChange={props.handleChange}
                />
              </Form.Field>
              <Button type="submit" onClick={props.handleSubmit}>
                Submit
              </Button>
            </Form>
          );
        }}
      />
    </Segment>
  );
};

const mapState = state => {
  return {
    record: state.records.activeRecord
      ? state.records.byIds[state.records.activeRecord.toString()]
      : defaultValues
  };
};

const actions = {
  addNewRecord,
  updatedRecord
};

export default connect(
  mapState,
  actions
)(RecordForm);
