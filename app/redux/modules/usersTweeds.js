const FETCHING_USERS_TWEEDS = 'FETCHING_USERS_TWEEDS'
const FETCHING_USERS_TWEEDS_ERROR = 'FETCHING_USERS_TWEEDS_ERROR'
const FETCHING_USERS_TWEEDS_SUCCESS = 'FETCHING_USERS_TWEEDS_SUCCESS'
const ADD_SINGLE_USERS_TWEED = 'ADD_SINGLE_USERS_TWEED'

export function fetchingUsersDucks (uid) {
  return {
    type: FETCHING_USERS_TWEEDS,
    uid,
  }
}

export function fetchingUsersTweedsError (error) {
  console.warn(error)
  return {
    type: FETCHING_USERS_TWEEDS_ERROR,
    error,
  }
}

export function fetchingUsersTweedsSuccess (uid, tweedIds, lastUpdated) {
  return {
    type: FETCHING_USERS_TWEEDS_SUCCESS,
    uid,
    tweedIds,
    lastUpdated,
  }
}

export function addSingleUsersTweed (uid, tweedId) {
  return {
    type: ADD_SINGLE_USERS_TWEED,
    uid,
    tweedId,
  }
}

const initialUsersTweedState = {
  lastUpdated: 0,
  tweedIds: [],
}

function usersTweed (state = initialUsersTweedState, action) {
  switch (action.type) {
    case ADD_SINGLE_USERS_TWEED :
      return {
        ...state,
        tweedIds: state.tweedIds.concat([action.tweedId]),
      }
    default :
      return state
  }
}

const initialState = {
  isFetching: true,
  error: '',
}

export default function usersTweeds (state = initialState, action) {
  switch (action.type) {
    case FETCHING_USERS_TWEEDS :
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_USERS_TWEEDS_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case FETCHING_USERS_TWEEDS_SUCCESS :
      return {
        ...state,
        isFetching: false,
        error: '',
        [action.uid]: {
          lastUpdated: action.lastUpdated,
          tweedIds: action.tweedIds,
        },
      }
    case ADD_SINGLE_USERS_TWEED :
      return typeof state[action.uid] === 'undefined'
        ? state
        : {
          ...state,
          isFetching: false,
          error: '',
          [action.uid]: usersTweed(state[action.uid], action),
        }
    default :
      return state
  }
}
