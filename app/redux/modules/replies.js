import { postReply } from 'helpers/api'

const FETCHING_REPLIES = 'FETCHING_REPLIES'
const FETCHING_REPLIES_ERROR = 'FETCHING_REPLIES_ERROR'
const FETCHING_REPLIES_SUCCESS = 'FETCHING_REPLIES_SUCCESS'
const ADD_REPLY = 'ADD_REPLY'
const ADD_REPLY_ERROR = 'ADD_REPLY_ERROR'
const REMOVE_REPLY = 'REMOVE_REPLY'

function addReply (tweedId, reply) {
  return {
    type: ADD_REPLY,
    tweedId,
    reply,
  }
}

function addReplyError (error) {
  console.warn(error)
  return {
    type: ADD_REPLY_ERROR,
    error: 'Error adding reply',
  }
}

function removeReply (tweedId, replyId) {
  return {
    type: REMOVE_REPLY,
    replyId,
  }
}

function fetchingReplies () {
  return {
    type: FETCHING_REPLIES,
  }
}

function fetchingRepliesError (error) {
  console.warn(error)
  return {
    type: FETCHING_REPLIES_ERROR,
    error: 'Error fetching replies',
  }
}

function fetchingRepliesSuccess (tweedId, replies) {
  return {
    type: FETCHING_REPLIES_SUCCESS,
    replies,
    tweedId,
    lastUpdated: Date.now(),
  }
}

export function addAndHandleReply (tweedId, reply) {
  return function (dispatch, getState) {
    const { replyWithId, replyPromise } = postReply(tweedId, reply)

    dispatch(addReply(tweedId, replyWithId))
    replyPromise.catch((error) => {
      dispatch(removeReply(tweedId, replyWithId.replyId))
      dispatch(addReplyError(error))
    })
  }
}

const initialReply = {
  name: '',
  reply: '',
  uid: '',
  timestamp: 0,
  avatar: '',
  replyId: '',
}

function tweedReplies (state = initialReply, action) {
  switch (action.type) {
    case ADD_REPLY :
      return {
        ...state,
        [action.reply.replyId]: action.reply,
      }
    case REMOVE_REPLY :
      return {
        ...state,
        [action.reply.replyId]: undefined,
      }
    default :
      return state
  }
}

const initialTweedState = {
  lastUpdated: Date.now(),
  replies: {},
}

function repliesAndLastUpated (state = initialTweedState, action) {
  switch (action.type) {
    case FETCHING_REPLIES_SUCCESS :
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        replies: action.replies,
      }
    case ADD_REPLY :
    case REMOVE_REPLY :
      return {
        ...state,
        replies: tweedReplies(state.replies, action),
      }
    default :
      return state
  }
}

const initialState = {
  isFetching: true,
  error: '',
}

export default function replies (state = initialState, action) {
  switch (action.type) {
    case FETCHING_REPLIES :
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_REPLIES_ERROR :
    case ADD_REPLY_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case ADD_REPLY :
    case FETCHING_REPLIES_SUCCESS :
    case REMOVE_REPLY :
      return {
        ...state,
        isFetching: false,
        error: '',
        [action.tweedId]: repliesAndLastUpated(state[action.tweedId], action),
      }
    default :
      return state
  }
}
