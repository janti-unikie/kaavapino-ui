import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Loader } from 'semantic-ui-react'
import { fetchSchemas } from '../../actions/schemaActions'
import { schemaSelector } from '../../selectors/schemaSelector'
import EditForm from './EditForm'

class ProjectEditPage extends Component {
  componentDidMount() {
    const { project } = this.props
    this.props.fetchSchemas(project.type)
  }

  render() {
    const { schema, phase } = this.props
    if (!schema) {
      return <Loader active>Ladataan</Loader>
    }
    const currentSchema = schema.phases[phase - 1]
    return (
      <EditForm sections={currentSchema.sections} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    schema: schemaSelector(state)
  }
}

const mapDispatchToProps = {
  fetchSchemas
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectEditPage)
