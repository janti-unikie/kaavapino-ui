import React, { useRef, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { change } from 'redux-form'
import { EDIT_PROJECT_FORM } from '../../constants'
import { useDispatch } from 'react-redux'
import './styles.scss'

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
    largeField
  } = props
  const dispatch = useDispatch()
  const [toolbarVisible, setToolbarVisible] = useState(false)
  const editorRef = useRef(null)

  const handleChange = (val, delta, source) => {
    if (source === 'user') {
      /* Get the value from the editor - the delta provided to handlechange does not have complete state */
      const actualDeltaValue = editorRef.current.editor.getContents()
      dispatch(change(EDIT_PROJECT_FORM, inputProps.name, actualDeltaValue))
    }
  }

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      ['clean']
    ]
  }

  return (
    <div
      className={`rich-text-editor ${toolbarVisible ? 'toolbar-visible' : ''} ${
        largeField ? 'large' : ''
      }`}
      onClick={() => {
        console.log('click')
        setToolbarVisible(true)
      }}
    >
      <ReactQuill
        {...inputProps}
        ref={editorRef}
        theme="snow"
        modules={modules}
        formats={formats}
        toolbar={false}
        // default value initialized, after that quill handles internal state
        // Do not explicitly set value. see comments at top of this file.
        defaultValue={value}
        onChange={handleChange}
        onBlur={(range, source, quill) => {
          setToolbarVisible(false)
          inputProps.onBlur(quill.getHTML())
        }}
        onClick={() => setToolbarVisible(true)}
      />
    </div>
  )
}

export default RichTextEditor
