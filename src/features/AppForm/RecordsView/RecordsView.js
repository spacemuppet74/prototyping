import React from "react";
import { Segment, Table, TableHeaderCell } from "semantic-ui-react";
import { connect } from "react-redux";
import RecordsViewItem from "./RecordsViewItem";

const RecordsView = ({ loading, isEmpty, records }) => {
  const renderList = () => {
    if (isEmpty) {
      return (
        <Table.Row colSpan={2}>
          <Table.Cell>No Records to Display</Table.Cell>
        </Table.Row>
      );
    } else {
      return records.map(record => (
        <RecordsViewItem key={record} recordID={record} />
      ));
    }
  };

  return (
    <Segment loading={loading}>
      <Table basic="very" celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Employee</Table.HeaderCell>
            <Table.HeaderCell>Correct Guesses</Table.HeaderCell>
            <Table.HeaderCell />
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>{renderList()}</Table.Body>
      </Table>
    </Segment>
  );
};

const mapState = state => {
  return {
    loading: state.records.loading === "pending" ? true : false,
    isEmpty: state.records.allIds.length === 0 ? true : false,
    records: state.records.allIds
  };
};

const actions = {};

export default connect(mapState)(RecordsView);
