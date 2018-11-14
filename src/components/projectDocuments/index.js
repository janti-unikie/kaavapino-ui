import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchDocuments } from '../../actions/documentActions'
import { selectDocuments } from '../../selectors/documentSelector'
import DocumentGroup from './DocumentGroup'

class ProjectDocumentsPage extends Component {
  componentDidMount() {
    this.props.fetchDocuments()
  }

  render() {
    const { documents } = this.props
    return (
      <div className='documents-page-container'>
        { documents.map(({ title, sections }, i) => <DocumentGroup title={title} documents={sections} key={i} />) }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    documents: selectDocuments(state)
  }
}

const mapDispatchToProps = {
  fetchDocuments
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDocumentsPage)