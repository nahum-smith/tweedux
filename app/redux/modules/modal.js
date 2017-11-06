// Modal
const OPEN_MODAL = 'OPEN_MODAL'
const CLOSE_MODAL = 'CLOSE_MODAL'
const UPDATE_TWEED_TEXT = 'UPDATE_TWEED_TEXT'

export const openModal = () => ({
  type: OPEN_MODAL,
})
export const closeModal = () => ({
  type: CLOSE_MODAL,
})
export const updateTweedText = (newTweedText) => ({
  type: UPDATE_TWEED_TEXT,
  newTweedText,
})

const initialState = {
  tweedText: '',
  isOpen: false,
}

const modal = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL :
      return {
        ...state,
        isOpen: true,
      }
    case CLOSE_MODAL :
      return {
        tweedText: '',
        isOpen: false,
      }
    case UPDATE_TWEED_TEXT :
      return {
        ...state,
        tweedText: action.newTweedText,
      }
    default :
      return state
  }
}
export default modal
