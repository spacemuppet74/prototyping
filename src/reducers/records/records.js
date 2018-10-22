import { createReducer } from "../../helpers/createReducer";

import {
  FETCH_RECORDS,
  FETCH_RECORDS_ERROR,
  FETCH_RECORDS_SUCCESS,
  ADD_NEW_RECORD,
  DELETE_RECORD,
  EDIT_RECORD,
  UPDATE_RECORD
} from "../../actions/recordActions";

const initialState = {
  loading: "none", // none | pending | completed | failed
  error: null,
  byIds: {},
  activeRecord: null,
  allIds: []
};

const fetchRecords = (state, { payload }) => {
  return {
    ...state,
    loading: "pending"
  };
};

const fetchRecordsSuccess = (state, { payload }) => {
  const byIds = payload.records.reduce((prev, next) => {
    return {
      ...prev,
      [next.Id]: next
    };
  }, {});

  const allIds = Object.keys(byIds);

  return {
    ...state,
    byIds,
    allIds,
    loading: "completed"
  };
};

const fetchRecordsError = (state, { payload }) => {
  return {
    ...state,
    loading: "failed",
    error: payload
  };
};

const addNewRecord = (state, { payload }) => {
  const { record } = payload;
  return {
    ...state,
    byIds: {
      ...state.byIds,
      [record.ID]: record
    },
    allIds: [...state.allIds, record.ID]
  };
};

const deleteRecord = (state, { payload }) => {
  const { [payload.toString()]: record, ...newState } = state.byIds;
  console.log("remove this record ", record);
  console.log(newState);
  return {
    ...state,
    byIds: { ...newState },
    allIds: state.allIds.filter(record => record !== payload.toString()),
    loading: "completed"
  };
};

const editRecord = (state, { payload }) => {
  return {
    ...state,
    activeRecord: payload
  };
};

const updateRecord = (state, { payload }) => {
  return {
    ...state,
    byIds: {
      ...state.byIds,
      [payload.record.Id]: payload.record
    }
  };
};

export default createReducer(initialState, {
  [FETCH_RECORDS]: fetchRecords,
  [FETCH_RECORDS_SUCCESS]: fetchRecordsSuccess,
  [FETCH_RECORDS_ERROR]: fetchRecordsError,
  [ADD_NEW_RECORD]: addNewRecord,
  [DELETE_RECORD]: deleteRecord,
  [EDIT_RECORD]: editRecord,
  [UPDATE_RECORD]: updateRecord
});
