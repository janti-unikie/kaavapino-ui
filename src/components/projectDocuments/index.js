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
import { IconAlertCircle } from 'hds-react'
import { useTranslation } from 'react-i18next'

function ProjectDocumentsPage(props) {
  useEffect(() => {
    const { currentProjectId } = props
    props.fetchDocuments(currentProjectId)
  }, [])

  const {t} = useTranslation()

  const groupDocuments = documents => {
    const result = {}
    documents.forEach(doc => {
      if (!doc.phases) {
        return null
      }

      doc.phases.forEach(phase => {
        if (!result[phase.phase_index]) {
          result[phase.phase_index] = {
            title: phase.phase_name,
            documents: [],
            phaseEnded: phase.phase_ended
          }
        }
        result[phase.phase_index].documents.push(doc)
      })
    })
    return result
  }
  const { documents, documentsLoading } = props
  const groupedDocuments = groupDocuments(documents)

  const getTitle = key => {
    const current = groupedDocuments[key]

    return (
      <>
        <span>
          {current.title}
          {current.phaseEnded && (
            <span className="phase-end-tag">
              <IconAlertCircle size="xs" />
              {t('project.phase-passed')}
            </span>
          )}
        </span>
      </>
    )
  }
  const renderDocumentList = () => (
    <div className="documents-page-container">
      {documentsLoading && <LoadingSpinner className="loader-icon" />}
      {!documentsLoading && Object.keys(groupedDocuments).length === 0 && (
        <p className="no-documents">{t('project.no-documents')}</p>
      )}
      {Object.keys(groupedDocuments).map(key => (
        <DocumentGroup
          key={key}
          title={getTitle(key)}
          phaseEnded={groupedDocuments[key].phaseEnded}
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
