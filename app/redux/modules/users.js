import { auth, logout, saveUser } from 'helpers/auth'
import { formatUserInfo } from 'helpers/utils'

const AUTH_USER = 'AUTH_USER'
const UNAUTH_USER = 'UNAUTH_USER'
const FETCHING_USER = 'FETCHING_USER'
const FETCHING_USER_FAILURE = 'FETCHING_USER_FAILURE'
const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS'
const REMOVE_FETCHING_USER = 'REMOVE_FETCHING_USER'

export const authUser = (uid) => {
  return {
    type: AUTH_USER,
    uid,
  }
}

const unAuthUser = () => {
  return {
    type: UNAUTH_USER,
  }
}

const fetchingUser = () => {
  return {
    type: FETCHING_USER,
  }
}

const fetchingUserFailure = () => {
  return {
    type: FETCHING_USER_FAILURE,
    error: 'fetching user error',
  }
}

export const fetchingUserSuccess = (uid, user, timestamp) => {
  console.info('fetching uid', uid)
  return {
    type: FETCHING_USER_SUCCESS,
    uid,
    user,
    timestamp,
  }
}

export function fetchAndHandleAuthUser () {
  return function (dispatch) {
    dispatch(fetchingUser())
    return auth()
      .then(({ user, credential }) => {
        const userData = user.providerData[0]
        console.info('HERE', userData, user)
        const userInfo = formatUserInfo(userData.displayName, userData.photoURL, user.uid)
        return dispatch(fetchingUserSuccess(user.uid, userInfo, Date.now()))
      })
      .then(({ user }) => {
        console.info('Here2', user)
        return saveUser(user)
      })
      .then((snapshot) => {
        const user = snapshot.val()
        console.info('snap', user)
        return dispatch(authUser(user.uid))
      })
      .catch((error) => {
        dispatch(fetchingUserFailure(error))
        console.info(error)
      })
  }
}

export function logoutAndUnauth () {
  return function (dispatch) {
    logout()
    dispatch(unAuthUser())
  }
}
export function removeFetchingUser () {
  return {
    type: REMOVE_FETCHING_USER,
  }
}
const initialUserState = {
  lastUpdated: 0,
  info: {
    name: '',
    uid: '',
    avatar: '',
  },
}

const user = (state = initialUserState, action) => {
  switch (action.type) {
    case FETCHING_USER_SUCCESS:
      return {
        ...state,
        info: action.user,
        lastUpdated: action.timestamp,
      }
    default:
      return state
  }
}

const initialState = {
  isFetching: false,
  error: '',
  isAuthed: false,
  authedId: '',
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER :
      return {
        ...state,
        isAuthed: true,
        authedId: action.uid,
      }
    case UNAUTH_USER :
      return {
        ...state,
        isAuthed: false,
        authedId: '',
      }
    case FETCHING_USER :
      return {
        ...state,
        isFetching: true,
      }
    case REMOVE_FETCHING_USER :
      return {
        ...state,
        isFetching: false,
      }
    case FETCHING_USER_FAILURE :
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case FETCHING_USER_SUCCESS :
      return action.user === null
        ? {
          ...state,
          error: '',
          isFetching: false,
        }
        : {
          ...state,
          error: '',
          isFetching: false,
          [action.uid]: user(state[action.uid], action),
        }
    default :
      return state
  }
}
export default userReducer
