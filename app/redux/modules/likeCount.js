import { ADD_LIKE, REMOVE_LIKE } from './usersLikes'
import { fetchTweedLikeCount } from 'helpers/api'
const FETCHING_COUNT = 'FETCHING_COUNT'
const FETCHING_COUNT_ERROR = 'FETCHING_COUNT_ERROR'
const FETCHING_COUNT_SUCCESS = 'FETCHING_COUNT_SUCCESS'

export function fetchingCount () {
  return {
    type: FETCHING_COUNT,
  }
}

export function fetchingCountError (error) {
  console.warn(error)
  return {
    type: FETCHING_COUNT_ERROR,
    error: 'Error fetching tweed\'s like count',
  }
}

export function fetchingCountSuccess (tweedId, count) {
  return {
    type: FETCHING_COUNT_SUCCESS,
    tweedId,
    count,
  }
}

export function count (state = 0, action) {
  switch (action.type) {
    case ADD_LIKE :
      return state + 1
    case REMOVE_LIKE :
      return state - 1
    default :
      return state
  }
}
export function initLikeFetch (tweedId) {
  return function (dispatch) {
    dispatch(fetchingCount())
    fetchTweedLikeCount(tweedId)
      .then((likeCount) => dispatch(fetchingCountSuccess(tweedId, likeCount)))
  }
}
const initialState = {
  isFetching: false,
  error: '',
}

export default function likeCount (state = initialState, action) {
  switch (action.type) {
    case FETCHING_COUNT :
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_COUNT_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case FETCHING_COUNT_SUCCESS :
      return {
        ...state,
        ...initialState,
        [action.tweedId]: action.count,
      }
    case ADD_LIKE :
    case REMOVE_LIKE :
      return typeof state[action.tweedId] === 'undefined'
        ? state
        : {
          ...state,
          [action.tweedId]: count(state[action.tweedId], action),
        }
    default :
      return state
  }
}
