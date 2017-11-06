const SETTING_FEED_LISTENER = 'SETTING_FEED_LISTENER'
const SETTING_FEED_LISTENER_ERROR = 'SETTING_FEED_LISTENER_ERROR'
const SETTING_FEED_LISTENER_SUCCESS = 'SETTING_FEED_LISTENER_SUCCESS'
const ADD_NEW_TWEED_ID_TO_FEED = 'ADD_NEW_TWEED_ID_TO_FEED'
const RESET_NEW_TWEEDS_AVAILABLE = 'RESET_NEW_TWEEDS_AVAILABLE'

export function settingFeedListener () {
  return {
    type: SETTING_FEED_LISTENER,
  }
}

export function settingFeedListenerError (error) {
  console.warn(error)
  return {
    type: SETTING_FEED_LISTENER_ERROR,
    error: 'Error fetching feeds.',
  }
}

export function settingFeedListenerSuccess (tweedIds) {
  return {
    type: SETTING_FEED_LISTENER_SUCCESS,
    tweedIds,
  }
}

export function addNewTweedIdToFeed (tweedId) {
  return {
    type: ADD_NEW_TWEED_ID_TO_FEED,
    tweedId,
  }
}

export function resetNewTweedsAvailable () {
  return {
    type: RESET_NEW_TWEEDS_AVAILABLE,
  }
}

const initialState = {
  newTweedsAvailable: false,
  newTweedsToAdd: [],
  isFetching: false,
  error: '',
  tweedIds: [],
}

export default function feed (state = initialState, action) {
  switch (action.type) {
    case SETTING_FEED_LISTENER :
      return {
        ...state,
        isFetching: true,
      }
    case SETTING_FEED_LISTENER_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case SETTING_FEED_LISTENER_SUCCESS :
      return {
        ...state,
        isFetching: false,
        error: '',
        tweedIds: action.tweedIds,
        newTweedsAvailable: false,
      }
    case ADD_NEW_TWEED_ID_TO_FEED :
      return {
        ...state,
        newTweedsToAdd: [action.tweedId, ...state.newTweedsToAdd],
        newTweedsAvailable: true,
      }
    case RESET_NEW_TWEEDS_AVAILABLE :
      return {
        ...state,
        tweedIds: [...state.newTweedsToAdd, ...state.tweedIds],
        newTweedsToAdd: [],
        newTweedsAvailable: false,
      }
    default :
      return state
  }
}
