import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faCheck, faPen } from '@fortawesome/free-solid-svg-icons'

const initIcons = () => {
  library.add(faUser, faCheck, faPen)
}

export default {
  initIcons
}
