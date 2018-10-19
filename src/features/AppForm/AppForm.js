import React, { Component } from "react";
import { Form, Header, Container, Label, Button } from "semantic-ui-react";
import { Formik } from "formik";
import { connect } from "react-redux";

import { addNewUser } from "../../actions/formActions";

import spRestCalls from "../../api/spRestCalls";

class AppForm extends Component {
  state = {
    inputField: ""
  };

  render() {
    const { addNewUser } = this.props;
    return (
      <Container>
        <Header as="h1" content="Form Example with Formik" />
        <Formik
          initialValues={{ ...this.state }}
          validate={values => {
            let errors = {};
            if (values.email.length < 4) {
              errors.email = "email is too long";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            spRestCalls.postRecord(values).then(resp => {
              alert(JSON.stringify(resp, null, 2));
              addNewUser(resp.data);
              setSubmitting(false);
              resetForm({});
            });
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => {
            return (
              <Form>
                <Form.Field>
                  <label htmlFor="">test input</label>
                  <input
                    type="text"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  {errors.email &&
                    touched.email && (
                      <Label pointing color="red" basic>
                        {errors.email}
                      </Label>
                    )}
                </Form.Field>
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Container>
    );
  }
}

const actions = {
  addNewUser
};

export default connect(
  null,
  actions
)(AppForm);
