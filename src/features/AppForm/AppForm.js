import React, { Component } from "react";
import { Header, Container } from "semantic-ui-react";
import { connect } from "react-redux";

import { fetchRecordsRequest } from "../../actions/recordActions";
import RecordsView from "./RecordsView/RecordsView";
import RecordForm from "./RecordForm/RecordForm";

class AppForm extends Component {
  componentDidMount() {
    this.props.fetchRecordsRequest();
  }

  render() {
    return (
      <Container>
        <Header as="h1" content="Form Example with Formik" />
        <RecordsView />
        <RecordForm />
      </Container>
    );
  }
}

const actions = {
  fetchRecordsRequest
};

export default connect(
  null,
  actions
)(AppForm);
