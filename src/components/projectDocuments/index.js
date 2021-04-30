import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchDocuments } from '../../actions/documentActions'
import {
  documentsSelector,
  documentsLoadingSelector
} from '../../selectors/documentSelector'
import { currentProjectIdSelector } from '../../selectors/projectSelector'
import { LoadingSpinner } from 'hds-react'
import DocumentGroup from './DocumentGroup'

function ProjectDocumentsPage(props) {
  useEffect(() => {
    const { currentProjectId } = props
    if (currentProjectId) {
      props.fetchDocuments(currentProjectId)
    }
  }, [])
  const groupDocuments = documents => {
    const result = {}
    documents.forEach(doc => {
      if (!result[doc.phase]) {
        result[doc.phase] = { title: doc.phase_name, documents: [] }
      }
      result[doc.phase].documents.push(doc)
    })
    return result
  }
  const { documents, documentsLoading } = props
  const groupedDocuments = groupDocuments(documents)

  return (
    <div className="documents-page-container">
      {documentsLoading && <LoadingSpinner className="loader-icon" />}
      {!documentsLoading && Object.keys(groupedDocuments).length === 0 && (
        <p className="no-documents">Ei dokumentteja.</p>
      )}
      {Object.keys(groupedDocuments).map(key => (
        <DocumentGroup
          key={key}
          title={groupedDocuments[key].title}
          documents={groupedDocuments[key].documents}
        />
      ))}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    documents: documentsSelector(state),
    documentsLoading: documentsLoadingSelector(state),
    currentProjectId: currentProjectIdSelector(state)
  }
}

const mapDispatchToProps = {
  fetchDocuments
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDocumentsPage)
