export const FETCH_COMMENTS = 'Fetch comments'
export const POLL_COMMENTS = 'Poll comments'
export const POLL_COMMENTS_SUCCESSFUL = 'Poll comments successful'
export const FETCH_COMMENTS_SUCCESSFUL = 'Fetch comments successful'
export const CREATE_COMMENT = 'Create comment'
export const CREATE_COMMENT_SUCCESSFUL = 'Create comment successful'
export const EDIT_COMMENT = 'Edit comment'
export const EDIT_COMMENT_SUCCESSFUL = 'Edit comment successful'
export const DELETE_COMMENT = 'Delete comment'
export const DELETE_COMMENT_SUCCESSFUL = 'Delete comment successful'
export const INCREASE_AMOUNT_OF_COMMENTS_TO_SHOW = 'Increase amount of comments to show'
export const SET_AMOUNT_OF_COMMENTS_TO_SHOW = 'Set amount of comments to show'
export const SET_TOTAL_COMMENTS = 'Set total comments'
export const LOAD_COMMENTS_SUCCESSFUL = 'Load comments successful'
export const FETCH_UNREAD_COMMENTS_COUNT = 'Fetch unread comments count'
export const FETCH_UNREAD_COMMENTS_COUNT_SUCCESSFUL =
  'Fetch unread comments count successful'

// Fetch
export const fetchComments = id => ({ type: FETCH_COMMENTS, payload: id })
export const fetchUnreadCommentsCount = id => ({
  type: FETCH_UNREAD_COMMENTS_COUNT,
  payload: id
})
export const pollComments = id => ({ type: POLL_COMMENTS, payload: id })
export const fetchCommentsSuccessful = comments => ({
  type: FETCH_COMMENTS_SUCCESSFUL,
  payload: comments
})
export const pollCommentsSuccessful = () => ({ type: POLL_COMMENTS_SUCCESSFUL })
export const fetchUnreadCommentsCountSuccessful = count => ({
  type: FETCH_UNREAD_COMMENTS_COUNT_SUCCESSFUL,
  payload: count
})

// Create
export const createComment = (id, content) => ({
  type: CREATE_COMMENT,
  payload: { id, content }
})
export const createCommentSuccessful = comment => ({
  type: CREATE_COMMENT_SUCCESSFUL,
  payload: comment
})

// Edit
export const editComment = (projectId, commentId, content) => ({
  type: EDIT_COMMENT,
  payload: { projectId, commentId, content }
})
export const editCommentSuccessful = comment => ({
  type: EDIT_COMMENT_SUCCESSFUL,
  payload: comment
})

// Delete
export const deleteComment = (projectId, commentId) => ({
  type: DELETE_COMMENT,
  payload: { projectId, commentId }
})
export const deleteCommentSuccessful = id => ({
  type: DELETE_COMMENT_SUCCESSFUL,
  payload: id
})

// Comment pagination
export const increaseAmountOfCommentsToShow = () => ({
  type: INCREASE_AMOUNT_OF_COMMENTS_TO_SHOW
})
export const setAmountOfCommentsToShow = count => ({
  type: SET_AMOUNT_OF_COMMENTS_TO_SHOW,
  payload: count
})
export const setTotalComments = count => ({ type: SET_TOTAL_COMMENTS, payload: count })
export const loadCommentsSuccessful = comments => ({
  type: LOAD_COMMENTS_SUCCESSFUL,
  payload: comments
})
