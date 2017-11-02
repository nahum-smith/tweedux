import { auth, logout, saveUser } from 'helpers/auth'
import { formatUserInfo } from 'helpers/utils'

const AUTH_USER = 'AUTH_USER'
const UNAUTH_USER = 'UNAUTH_USER'
const FETCHING_USER = 'FETCHING_USER'
const FETCHING_USER_FAILURE = 'FETCHING_USER_FAILURE'
const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS'

const authUser = (uid) => ({
  type: AUTH_USER,
  uid,
})

const unAuthUser = () => ({
  type: UNAUTH_USER,
})

const fetchingUser = () => ({
  type: FETCHING_USER,
})

const fetchingUserFailure = () => ({
  type: FETCHING_USER_FAILURE,
  error: 'fetching user error',
})

const fetchingUserSuccess = (uid, user, timestamp) => ({
  type: FETCHING_USER_SUCCESS,
  uid,
  user,
  timestamp,
})

export function fetchAndHandleAuthUser () {
  return function (dispatch) {
    dispatch(fetchingUser())
    return auth()
      .then(({ user, credential }) => {
        const userData = user.providerData[0]
        const userInfo = formatUserInfo(userData.displayName, userData.photoURL, userData.uid)
        return dispatch(fetchingUserSuccess(userInfo.uid, userInfo, Date.now()))
      })
      .then(({ user }) => {
        console.info(user)
        return saveUser(user)
      })
      .then((snapshot) => {
        const user = snapshot.val()
        console.info(user)
        dispatch(authUser(user.uid))
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
        authedid: action.uid,
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
