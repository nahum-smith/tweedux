// Users
const AUTH_USER

const initialUserState: {
  lastUpdated: 0,
  info: {
    name: '',
    uid: '',
    avatar: ''
  }
}

function user (state = initialUserState, action) {
  switch (action.type) {
    case FETCHING_USER_SUCCESS :
      return {
        ...state,
        info: action.user,
        lastUpdated: action.timestamp
      }
      default :
        return state
  }
}

const initialState = {
  isFetching: false,
  error: '',
  isAuthed: false,
  authedId: ''
}

function users (state = initialState, action) {
  switch (action.type) {
    case AUTH_USER :
      return {
        ...state,
        isAuthed: true,
        authedid: action.uid
      }
    case UNAUTH_USER :
      return {
        ...state,
        isAuthed: false,
        authedId: ''
      }
    case FETCHING_USER :
      return {
        ...state,
        isFetching: true
      }
    case FETCHING_USER_FAILURE :
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case FETCHING_USER_SUCCESS :
      return action.user === null
      ? {
        ...state,
        error: '',
        isFetching: false
      }
      : {
        ...state,
        error: '',
        [action.uid]: user(state[action.uid], action)
      }
    default :
      return state
  }
}
const initialState = {
  isFetching: true,
  error: '',
  [action.duck.duckId]: action.duck
}
function ducks (state, action) {
  switch (action.type) {
    case FETCHING_DUCK :
      return {
        ...state,
        error: '',
        isFetching: false,
      }
    case ADD_DUCK :
    case FETCHING_DUCK_SUCCESS :
      return {
        ...state,
        error: '',
        isFetching: false,
        [action.duck.duckId]: action.duck
      }
    case FETCHING_DUCK_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case REMOVE_FETCHING :
      return {
        ...state,
        isFetching: false,
        error: ''
      }
    case ADD_MULTIPLE_DUCKS :
      return {
        ...state,
        ...action.ducks
      }
    default :
      return state
  }
}

const initialState = {
  isFetching: false,
  newDucksAvailable: false,
  newDucksToAdd: [],
  error: '',
  duckIds: []
}

function feed (state, action) {
  switch (action.type) {
    case SETTING_FEED_LISTENER :
      return {
        ...state,
        isFetching: true
      }
    case SETTING_FEED_LISTENER_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case SETTING_FEED_LISTENER_SUCCESS :
      return {
        ...state,
        isFetching: false,
        error: '',
        duckIds: action.duckIds,
        newDucksAvailable: false
      }
    case ADD_NEW_DUCK_ID_TO_FEED :
      return {
        ...state,
        newDucksToAdd: [state.duckId, ...state.newDucksToAdd]
      }
    case RESET_NEW_DUCKS_AVAILABLE :
      return {
        ...state,
        duckIds: [...state.newDucksToAdd, ...state.duckIds],
        newDucksToAdd: [],
        newDucksAvailable: false
      }
    default :
      return state
  }
}

function listeners (state = {}, action) {
  switch (action.type) {
    case ADD_LISTENER :
      return {
        ...state,
        [action.listenerId]: true
      }
    default :
      return state
  }
}

const initialState = {
  duckText: '',
  isOpen: false
}

function modal (state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL :
      return {
        ...state,
        isOpen: true
      }
    case CLOSE_MODAL :
      return {
        duckText: '',
        isOpen: false
      }
    case UPDATE_DUCK_TEXT :
      return {
        ...state,
        ducktext: action.newDuckText
      }
    default :
      return state
  }
}

const initialState = {
  isFetching: false,
  error: ''
}

function usersLikes (state = initialState, action) {
  switch (action.type) {
    case FETCHING_LIKES :
      return {
        ...state,
        isFetching: true
      }
    case FETCHING_LIKES_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case FETCHING_LIKES_SUCCESS :
      return {
        ...state,
        ...action.likes,
        isFetching: false,
        error: ''
      }
    case ADD_LIKE :
      return {
        ...state,
        [action.duckId]: true
      }
    case REMOVE_LIKE :
      return Object.keys(state)
      .filter((duckId) => action.duckId !== duckid)
      .reduce((prev, current) => {
        prev[current] = state[current]
        return prev
      }, {})
    default :
      return state
  }
}

function count (state = 0, action) {
  switch (action.type) {
    case ADD_LIKE :
      return state + 1
    case REMOVE_LIKE :
      return state - 1
    default :
      return state
  }
}
const initialState = {
  isFetching: false,
  error: ''
}

function likeCount (state = initialState, action) {
  switch (action.type) {
    case FETCHING_COUNT :
      return {
        ...state,
        isFetching: true
      }
    case FETCHING_COUNT_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case FETCHING_COUNT_SUCCESS :
      return {
        ...state,
        ...initialState,
        [action.duckId]: action.count
      }
    case ADD_LIKE :
    case REMOVE_LIKE :
      return typeof state[action.duckId] === 'undefined'
      ? state
      : {
        ...state,
        [action.duckId]: count(state[action.duckId], action)
      }
    default :
      return state
  }
}

const initialState = {
  isFetching: true,
  error: ''
}
function usersDuck (state = initialUsersDuckState, action) {
  switch (action.type) {
    case ADD_SINGLE_USERS_DUCK :
      return {
        ...state,
        duckIds: state.duckIds.concat([action.duckid])
      }
    default :
      return state
  }
}
function usersDucks (state = initialState, action ) {
  switch (action.type) {
    case FETCHING_USERS_DUCKS :
      return {
        ...state,
        isFetching: true
      }
    case FETCHING_USERS_DUCKS_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case FETCHING_USERS_DUCKS_SUCCESS :
      return {
        ...state,
        isFetching: false,
        error: '',
        [action.uid]: {
          lastUpdated: action.lastUpdated,
          ducksIds: action.ducksIds
        }
      }
    case ADD_SINGLE_USERS_DUCK :
    default :
      return typeof state[action.uid] === 'undefined'
      ? state
      : {
        ...state,
        isFetching: false,
        error: '',
        [action.uid]: usersDuck(state[action.uid], action)
      }
  }
}
// Replies

const initialReply = {
  name: '',
  reply: '',
  uid: '',
  timestamp: 0,
  avatar: '',
  replyId: '',
}

function duckReplies (state = initialReply, action) {
  switch (action.type) {
    case ADD_REPLY :
      return {
        ...state,
        [action.reply.replyId]: action.reply
      }
    case REMOVE_REPLY :
      return {
        ...state,
        [action.reply.replyId]: undefined
      }
    default :
      return state
  }
}
const initialDuckState = {
  lastUpdated: Date.now(),
  replies: {}
}

function repliesAndLastUpdated (state, action) {
  switch (action.type) {
    case FETCHING_REPLIES_SUCCESS :
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        replies: action.replies
      }
    case ADD_REPLY :
    case REMOVE_REPLY :
      return {
        ...state,
        replies: duckReplies(state.replies, action)
      }
    default :
      return state
  }
}
const initialState = {
  isFetching: false,
  error: ''
}

function replies (state = initialState, action) {
  switch (action.type) {

    case ADD_REPLY_ERROR :
    case FETCHING_REPLIES :
      return {
        ...state,
        isFetching: true
      }
    case FETCHING_REPLIES_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case ADD_REPLY :
    case FETCHING_REPLIES_SUCCESS :
    case REMOVE_REPLY :
      return {
        ...state,
        isFetching: false,
        error: '',
        [action.duckId]: repliesAndLastUpdated(state[action.duckId], action)
      }
    default :
      return state
  }
}
