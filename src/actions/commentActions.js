export const FETCH_COMMENTS = 'Fetch comments'
export const FETCH_COMMENTS_SUCCESSFUL = 'Fetch comments successful'
export const POLL_COMMENTS = 'Poll comments'
export const POLL_COMMENTS_SUCCESSFUL = 'Poll comments successful'
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
export const SET_UNREAD_COMMENTS_COUNT = 'Fetch unread comments count successful'
export const MARK_COMMENTS_AS_READ = 'Mark comments as read'

export const FETCH_FIELD_COMMENTS = 'Fetch field comments'
export const FETCH_FIELD_COMMENTS_SUCCESSFUL = 'Fetch field comments successful'
export const FETCH_SINGLE_FIELD_COMMENTS = 'Fetch single field comments'
export const FETCH_SINGLE_FIELD_COMMENTS_SUCCESSFUL =
  'Fetch single field comments successful'
export const POLL_FIELD_COMMENTS = 'Poll field comments'
export const POLL_FIELD_COMMENTS_SUCCESSFUL = 'Poll field comments successful'
export const CREATE_FIELD_COMMENT = 'create field comment'
export const CREATE_FIELD_COMMENT_SUCCESSFUL = 'create field comment successful'
export const EDIT_FIELD_COMMENT = 'Edit field comment'
export const EDIT_FIELD_COMMENT_SUCCESSFUL = 'Edit field comment successful'
export const DELETE_FIELD_COMMENT = 'Delete field comment'
export const DELETE_FIELD_COMMENT_SUCCESSFUL = 'Delete field comment successful'
export const CLEAR_COMMENTS = 'Clear comments'

// Fetch
export const fetchComments = id => ({ type: FETCH_COMMENTS, payload: id })
export const fetchUnreadCommentsCount = id => ({
  type: FETCH_UNREAD_COMMENTS_COUNT,
  payload: id
})
export const clearComments = () => ({ type: CLEAR_COMMENTS })
export const pollComments = id => ({ type: POLL_COMMENTS, payload: id })
export const fetchCommentsSuccessful = comments => ({
  type: FETCH_COMMENTS_SUCCESSFUL,
  payload: comments
})
export const pollCommentsSuccessful = () => ({ type: POLL_COMMENTS_SUCCESSFUL })
export const setUnreadCommentsCount = count => ({
  type: SET_UNREAD_COMMENTS_COUNT,
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

export const markCommentsAsRead = projectId => ({
  type: MARK_COMMENTS_AS_READ,
  payload: projectId
})

// Field comment actions

// Fetch
export const fetchFieldComments = id => ({ type: FETCH_FIELD_COMMENTS, payload: id })
export const fetchFieldCommentsSuccessful = fieldComments => ({
  type: FETCH_FIELD_COMMENTS_SUCCESSFUL,
  payload: fieldComments
})

export const fetchSingleFieldComments = (projectId, fieldName) => ({
  type: FETCH_SINGLE_FIELD_COMMENTS,
  payload: { projectId, fieldName }
})

export const fetchSingleFieldCommentsSuccessful = (fieldName, singleFieldComments) => ({
  type: FETCH_SINGLE_FIELD_COMMENTS_SUCCESSFUL,
  payload: { fieldName, singleFieldComments }
})

export const pollFieldComments = id => ({ type: POLL_FIELD_COMMENTS, payload: id })
export const pollFieldCommentsSuccessful = () => ({
  type: POLL_FIELD_COMMENTS_SUCCESSFUL
})

// Create
export const createFieldComment = (projectId, fieldName, content) => ({
  type: CREATE_FIELD_COMMENT,
  payload: { projectId, fieldName, content }
})

export const createFieldCommentSuccessful = comment => ({
  type: CREATE_FIELD_COMMENT_SUCCESSFUL,
  payload: comment
})

// Edit
export const editFieldComment = (projectId, commentId, content, fieldName) => ({
  type: EDIT_FIELD_COMMENT,
  payload: { projectId, commentId, content, fieldName }
})

export const editFieldCommentSuccessful = comment => ({
  type: EDIT_FIELD_COMMENT_SUCCESSFUL,
  payload: comment
})

// Delete
export const deleteFieldComment = (projectId, commentId, fieldName) => ({
  type: DELETE_FIELD_COMMENT,
  payload: { projectId, commentId, fieldName }
})

export const deleteFieldCommentSuccessful = commentId => ({
  type: DELETE_FIELD_COMMENT_SUCCESSFUL,
  payload: commentId
})
