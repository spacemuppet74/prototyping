export const FETCH_RECORDS = "FETCH_RECORDS";
export const FETCH_RECORDS_SUCCESS = "FETCH_RECORDS_SUCCESS";
export const FETCH_RECORDS_ERROR = "FETCH_RECORDS_ERROR";
export const ADD_NEW_RECORD = "ADD_NEW_RECORD";
export const DELETE_RECORD = "DELETE_RECORD";
export const EDIT_RECORD = "EDIT_RECORD";
export const UPDATE_RECORD = "UPDATE_RECORD";

import spRestCalls from "../api/spRestCalls";

const fetchRecords = () => {
  return {
    type: FETCH_RECORDS
  };
};

const fetchRecordsSuccess = records => ({
  type: FETCH_RECORDS_SUCCESS,
  payload: { records }
});

const fetchRecordError = error => ({
  type: FETCH_RECORDS_ERROR,
  payload: error
});

export const fetchRecordsRequest = () => {
  return async dispatch => {
    dispatch(fetchRecords());
    try {
      const records = await spRestCalls.getRecords();
      dispatch(fetchRecordsSuccess(records));
    } catch (error) {
      console.log(error);
      dispatch(fetchRecordError(error));
    }
  };
};

export const addNewRecord = record => {
  return {
    type: ADD_NEW_RECORD,
    payload: {
      record
    }
  };
};

export const deleteRecord = recordId => {
  return {
    type: DELETE_RECORD,
    payload: recordId
  };
};

export const deleteRecordRequest = recordId => {
  return async dispatch => {
    dispatch(fetchRecords());
    try {
      const deleted = await spRestCalls.deleteRecord(recordId);
      dispatch(deleteRecord(recordId));
    } catch (error) {
      console.log("error deleting record");
    }
  };
};

export const editRecord = recordId => {
  console.log("action fired ", recordId);
  return {
    type: EDIT_RECORD,
    payload: recordId
  };
};

export const updatedRecord = record => {
  return {
    type: UPDATE_RECORD,
    payload: { record }
  };
};
