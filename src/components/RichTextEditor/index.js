import React, { useRef, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { change } from 'redux-form'
import { EDIT_PROJECT_FORM } from '../../constants'
import { useDispatch, useSelector } from 'react-redux'
import './styles.scss'
import { fieldCommentsSelector } from '../../selectors/commentSelector'
import Comment from '../shoutbox/comments/Comment'
import { userIdSelector } from '../../selectors/authSelector'
import {
  editFieldComment,
  deleteFieldComment,
  createFieldComment
} from '../../actions/commentActions'
import { currentProjectIdSelector } from '../../selectors/projectSelector'
import { ReactComponent as CommentIcon } from '../../assets/icons/comment-icon.svg'

/* This component defines a react-quill rich text editor field to be used in redux form.
 * We are saving these rich text inputs as quill deltas - a form of JSON that
 * defines each part of the text, e.g.
 * ops: Array(3)
 * 0: {insert: "User-written text"}
 * 1: { attributes: {color: "#e60000"}, insert: " that now became red"}
 * 2: { attributes: {color: "#b26b00", underline: true}, insert: ", then became brown and underlined"}
 *
 * Quill rich text editor can't be a fully controlled component, as from the docs:
 * https://github.com/zenoamaro/react-quill
 *
 * "Because Quill handles its own changes, and does not allow preventing edits, ReactQuill has to settle for
 * a hybrid between controlled and uncontrolled mode. It can't prevent the change, but will still override
 * the content whenever value differs from current state."
 *
 * Thus this component uses the value from backend as initial value, then updates redux form whenever
 * quill's own input value changes - but no longer updates from redux form changes.
 * Do not set the value to input.value - it will make the component lose focus after every letter
 * */

const formats = ['bold', 'italic', 'underline', 'strike', 'color', 'background']

function RichTextEditor(props) {
  const {
    input: { value, ...inputProps },
    largeField,
    ...rest
  } = props
  const dispatch = useDispatch()
  const fieldComments = useSelector(fieldCommentsSelector)
  const userId = useSelector(userIdSelector)
  const projectId = useSelector(currentProjectIdSelector)
  const [showComments, setShowComments] = useState(false)
  const comments = fieldComments[inputProps.name]

  const [toolbarVisible, setToolbarVisible] = useState(false)
  const editorRef = useRef(null)

  const handleChange = (val, delta, source) => {
    if (source === 'user') {
      /* Get the value from the editor - the delta provided to handlechange does not have complete state */
      const actualDeltaValue = editorRef.current.editor.getContents()
      dispatch(change(EDIT_PROJECT_FORM, inputProps.name, actualDeltaValue))
    }
  }
  const addComment = () => {
    /* If cursor position is needed, you can get it like this */
    // const editor = editorRef.current.editor
    // const cursorPosition = editor.getSelection().index
    var prompt = window.prompt('Lisää kenttäkohtainen viesti:', '')
    if (prompt) {
      dispatch(createFieldComment(projectId, inputProps.name, prompt))
      setShowComments(true)
    }
  }

  const toolbarName = `toolbar-${inputProps.name || ''}`
  const modules = {
    toolbar: `#${toolbarName}`
  }

  return (
    <div className="rich-text-editor-wrapper">
      <div
        className={`rich-text-editor ${
          toolbarVisible || showComments ? 'toolbar-visible' : ''
        } ${largeField ? 'large' : ''}`}
        onClick={() => setToolbarVisible(true)}
      >
        <div id={toolbarName} className="ql-toolbar">
          <span className="ql-formats">
            <button className="ql-bold" />
            <button className="ql-italic" />
            <button className="ql-underline" />
            <button className="ql-strike" />
          </span>
          <span className="ql-formats">
            <select className="ql-color" />
            <select className="ql-background" />
            <button className="ql-clean" />
          </span>
          <span className="ql-formats">
            <button className="quill-toolbar-comment-button" onClick={addComment}>
              <CommentIcon className="comment-icon" />
            </button>
            <button
              className="show-comments-button"
              onClick={() => setShowComments(!showComments)}
              disabled={!comments || !comments.length}
            >
              {showComments ? 'Piilota' : 'Näytä'} kommentit (
              {comments ? comments.length : 0})
            </button>
          </span>
        </div>
        <ReactQuill
          ref={editorRef}
          theme="snow"
          modules={modules}
          formats={formats}
          {...inputProps}
          // default value initialized, after that quill handles internal state
          // Do not explicitly set value. see comments at top of this file.
          defaultValue={value}
          onChange={handleChange}
          onBlur={(range, source, quill) => {
            setToolbarVisible(false)
            inputProps.onBlur(quill.getHTML())
          }}
          onClick={() => setToolbarVisible(true)}
          {...rest}
        />
      </div>
      {showComments && comments && comments.length > 0 && (
        <div className="comment-list">
          {comments.map((comment, i) => (
            <Comment
              key={`${i}-${comment.id}`}
              {...comment}
              editable={userId === comment.user}
              onSave={content =>
                dispatch(
                  editFieldComment(projectId, comment.id, content, inputProps.name)
                )
              }
              onDelete={() =>
                dispatch(deleteFieldComment(projectId, comment.id, inputProps.name))
              }
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default RichTextEditor
