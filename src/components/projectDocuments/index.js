import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchDocuments, downloadDocumentPreview } from '../../actions/documentActions'
import {
  documentsSelector,
  documentsLoadingSelector,
  documentPreviewSelector
} from '../../selectors/documentSelector'
import { currentProjectIdSelector } from '../../selectors/projectSelector'
import { LoadingSpinner } from 'hds-react'
import DocumentGroup from './DocumentGroup'

function ProjectDocumentsPage(props) {
 
  useEffect(() => {
    const { currentProjectId } = props
      props.fetchDocuments(currentProjectId)
  }, [])

  const groupDocuments = documents => {
    const result = {}
    documents.forEach(doc => {
      if (!result[doc.phase_index]) {
        result[doc.phase_index] = { title: doc.phase_name, documents: [] }
      }
      result[doc.phase_index].documents.push(doc)
    })
    return result
  }
  const { documents, documentsLoading } = props
  const groupedDocuments = groupDocuments(documents) 

  const renderDocumentList = () => (
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
          projectId={props.currentProjectId}
        />
      ))}
    </div>
  )

  return renderDocumentList()
}

const mapStateToProps = state => {
  return {
    documents: documentsSelector(state),
    documentsLoading: documentsLoadingSelector(state),
    currentProjectId: currentProjectIdSelector(state),
    documentPreview: documentPreviewSelector(state)
  }
}

const mapDispatchToProps = {
  fetchDocuments,
  downloadDocumentPreview
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDocumentsPage)
