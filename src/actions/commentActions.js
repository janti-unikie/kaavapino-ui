export const FETCH_COMMENTS = 'Fetch comments'
export const FETCH_COMMENTS_SUCCESSFUL = 'Fetch comments successful'
export const CREATE_COMMENT = 'Create comment'
export const CREATE_COMMENT_SUCCESSFUL = 'Create comment successful'
export const EDIT_COMMENT = 'Edit comment'
export const EDIT_COMMENT_SUCCESSFUL = 'Edit comment successful'
export const DELETE_COMMENT = 'Delete comment'
export const DELETE_COMMENT_SUCCESSFUL = 'Delete comment successful'

// Fetch
export const fetchComments = (id) => ({ type: FETCH_COMMENTS, payload: id })
export const fetchCommentsSuccessful = (comments) => ({ type: FETCH_COMMENTS_SUCCESSFUL, payload: comments })

// Create
export const createComment = (id, content) => ({ type: CREATE_COMMENT, payload: { id, content } })
export const createCommentSuccessful = (comment) => ({ type: CREATE_COMMENT_SUCCESSFUL, payload: comment })

// Edit
export const editComment = (projectId, commentId, content) => ({ type: EDIT_COMMENT, payload: { projectId, commentId, content } })
export const editCommentSuccessful = (comment) => ({ type: EDIT_COMMENT_SUCCESSFUL, payload: comment })

// Delete
export const deleteComment = (projectId, commentId) => ({ type: DELETE_COMMENT, payload: { projectId, commentId } })
export const deleteCommentSuccessful = (id) => ({ type: DELETE_COMMENT_SUCCESSFUL, payload: id })