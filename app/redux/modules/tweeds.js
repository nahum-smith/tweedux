import { saveTweed } from 'helpers/api'
import { closeModal } from './modal'
import { addSingleUsersTweed } from './usersTweeds'

const FETCHING_TWEED = 'FETCHING_TWEED'
const ADD_TWEED = 'ADD_TWEED'
const FETCHING_TWEED_SUCCESS = 'FETCHING_TWEED_SUCCESS'
const FETCHING_TWEED_ERROR = 'FETCHING_TWEED_ERROR'
const REMOVE_FETCHING = 'REMOVE_FETCHING'
const ADD_MULTIPLE_TWEEDS = 'ADD_MULTIPLE_TWEEDS'

export function fetchingTweed () {
  return {
    type: FETCHING_TWEED,
  }
}

export function fetchingTweedError (error) {
  return {
    type: FETCHING_TWEED_ERROR,
    error,
  }
}

export function fetchingTweedSuccess (tweed) {
  return {
    type: FETCHING_TWEED_SUCCESS,
    tweed,
  }
}

export function removeFetching () {
  return {
    type: REMOVE_FETCHING,
  }
}

export function addTweed (tweed) {
  return {
    type: ADD_TWEED,
    tweed,
  }
}

export function addMultipleTweeds (tweeds) {
  return {
    type: ADD_MULTIPLE_TWEEDS,
    tweeds,
  }
}

export function tweedFanout (tweed) {
  return function (dispatch, getState) {
    const uid = getState().users.authId
    saveTweed(tweed)
      .then((tweedWithId) => {
        dispatch(addTweed(tweedWithId))
        dispatch(closeModal())
        dispatch(addSingleUsersTweed(uid, tweedWithId.tweedId))
      })
      .catch((error) => {
        console.warn('Error with Tweed fanout', error)
      })
  }
}
const initialState = {
  isFetching: true,
  error: '',
}

export default function tweeds (state = initialState, action) {
  switch (action.type) {
    case FETCHING_TWEED :
      return {
        ...state,
        error: '',
        isFetching: false,
      }
    case ADD_TWEED :
    case FETCHING_TWEED_SUCCESS :
      return {
        ...state,
        error: '',
        isFetching: false,
        [action.tweed.tweedId]: action.tweed,
      }
    case FETCHING_TWEED_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case REMOVE_FETCHING :
      return {
        ...state,
        isFetching: false,
        error: '',
      }
    case ADD_MULTIPLE_TWEEDS :
      return {
        ...state,
        ...action.tweeds,
      }
    default :
      return state
  }
}
