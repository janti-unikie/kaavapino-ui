import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchDocuments } from '../../actions/documentActions'
import { documentsSelector, documentsLoadingSelector } from '../../selectors/documentSelector'
import { currentProjectIdSelector } from '../../selectors/projectSelector'
import { Loader } from 'semantic-ui-react'
import DocumentGroup from './DocumentGroup'

class ProjectDocumentsPage extends Component {
  componentDidMount() {
    const { currentProjectId } = this.props
    if (currentProjectId) {
      this.props.fetchDocuments(currentProjectId)
    }
  }

  groupDocuments = (documents) => {
    const result = {}
    documents.forEach((doc) => {
      if (!result[doc.phase]) {
        result[doc.phase] = { title: doc.phase_name, documents: [] }
      }
      result[doc.phase].documents.push(doc)
    })
    return result
  }

  render() {
    const { documents, documentsLoading } = this.props
    const groupedDocuments = this.groupDocuments(documents)
    return (
      <div className='documents-page-container'>
        { documentsLoading && <Loader inline={'centered'} active>Ladataan</Loader> }
        { Object.keys(groupedDocuments).map((key) => (
          <DocumentGroup
            key={key}
            title={groupedDocuments[key].title}
            documents={groupedDocuments[key].documents}
          />
        )) }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    documents: documentsSelector(state),
    documentsLoading: documentsLoadingSelector(state),
    currentProjectId: currentProjectIdSelector(state)
  }
}

const mapDispatchToProps = {
  fetchDocuments
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDocumentsPage)