import React from "react";
import { Table, Icon } from "semantic-ui-react";

import { connect } from "react-redux";
import {
  deleteRecordRequest,
  editRecord
} from "../../../actions/recordActions";

const RecordsViewItem = ({ record, deleteRecordRequest, editRecord }) => {
  const { Id, Title } = record;
  return (
    <Table.Row>
      <Table.Cell>{Id}</Table.Cell>
      <Table.Cell>{Title}</Table.Cell>
      <Table.Cell>
        <Icon
          name="trash"
          color="red"
          onClick={() => deleteRecordRequest(Id)}
        />
      </Table.Cell>
      <Table.Cell>
        <Icon name="pencil" onClick={() => editRecord(Id)} />
      </Table.Cell>
    </Table.Row>
  );
};

const mapState = (state, ownProps) => {
  const { recordID } = ownProps;

  return {
    record: state.records.byIds[recordID]
  };
};

const actions = {
  deleteRecordRequest,
  editRecord
};

export default connect(
  mapState,
  actions
)(RecordsViewItem);
