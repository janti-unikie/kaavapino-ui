export const FETCH_DOCUMENTS = 'Fetch documents'
export const FETCH_DOCUMENTS_SUCCESSFUL = 'Fetch documents successful'

export const fetchDocuments = () => ({ type: FETCH_DOCUMENTS })
export const fetchDocumentsSuccessful = (documents) => ({ type: FETCH_DOCUMENTS_SUCCESSFUL, payload: documents })