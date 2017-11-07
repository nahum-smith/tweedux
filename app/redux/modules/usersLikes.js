import {
  fetchUsersLikes, saveToUsersLikes, deleteFromUsersLikes,
  incrementNumberOfLikes, decrementNumberOfLikes,
} from 'helpers/api'

export const ADD_LIKE = 'ADD_LIKE'
export const REMOVE_LIKE = 'REMOVE_LIKE'
const FETCHING_LIKES = 'FETCHING_LIKES'
const FETCHING_LIKES_ERROR = 'FETCHING_LIKES_ERROR'
const FETCHING_LIKES_SUCCESS = 'FETCHING_LIKES_SUCCESS'

export function addLike (tweedId) {
  return {
    type: ADD_LIKE,
    tweedId,
  }
}

export function removeLike (tweedId) {
  return {
    type: REMOVE_LIKE,
    tweedId,
  }
}

export function fetchingLikes () {
  return {
    type: FETCHING_LIKES,
  }
}

export function fetchingLikesError (error) {
  console.warn(error)
  return {
    type: FETCHING_LIKES_ERROR,
    error: 'Error fetching likes',
  }
}

export function fetchingLikesSuccess (likes) {
  return {
    type: FETCHING_LIKES_SUCCESS,
    likes,
  }
}
export function addAndHandleLike (tweedId, e) {
  e.stopPropagation()
  return function (dispatch, getState) {
    dispatch(addLike(tweedId))

    const uid = getState().users.authedId
    Promise.all([
      saveToUsersLikes(uid, tweedId),
      incrementNumberOfLikes(tweedId),
    ])
      .catch((error) => {
        console.warn(error)
        dispatch(removeLike(tweedId))
      })
  }
}

export function handleDeleteLike (tweedId, e) {
  e.stopPropagation()
  return function (dispatch, getState) {
    dispatch(removeLike(tweedId))

    const uid = getState().users.authedId
    Promise.all([
      deleteFromUsersLikes(uid, tweedId),
      decrementNumberOfLikes(tweedId),
    ])
      .catch((error) => {
        console.warn(error)
        dispatch(addLike(tweedId))
      })
  }
}
export function setUsersLikes () {
  return function (dispatch, getState) {
    const uid = getState().users.authedId
    dispatch(fetchingLikes())
    fetchUsersLikes(uid)
      .then((likes) => dispatch(fetchingLikesSuccess(likes)))
      .catch((error) => dispatch(fetchingLikesError(error)))
  }
}
const initialState = {
  isFetching: false,
  error: '',
}

export default function usersLikes (state = initialState, action) {
  const type = action.type
  switch (type) {
    case FETCHING_LIKES :
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_LIKES_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case FETCHING_LIKES_SUCCESS :
      return {
        ...state,
        ...action.likes,
        isFetching: false,
        error: '',
      }
    case ADD_LIKE :
      return {
        ...state,
        [action.tweedId]: true,
      }
    case REMOVE_LIKE :
      return Object.keys(state)
        .filter((tweedId) => action.tweedId !== tweedId)
        .reduce((prev, current) => {
          prev[current] = state[current]
          return prev
        }, {})
    default :
      return state
  }
}
