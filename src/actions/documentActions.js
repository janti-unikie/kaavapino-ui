export const FETCH_DOCUMENTS = 'Fetch documents'
export const FETCH_DOCUMENTS_SUCCESSFUL = 'Fetch documents successful'
export const DOWNLOAD_DOCUMENT = 'Download document'

export const fetchDocuments = projectId => ({ type: FETCH_DOCUMENTS, payload: projectId })
export const fetchDocumentsSuccessful = documents => ({
  type: FETCH_DOCUMENTS_SUCCESSFUL,
  payload: documents
})

export const downloadDocument = documentUrl => ({
  type: DOWNLOAD_DOCUMENT,
  payload: documentUrl
})
