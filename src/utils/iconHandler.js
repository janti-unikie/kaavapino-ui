import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faCheck, faPen, faPlus, faFile, faForward } from '@fortawesome/free-solid-svg-icons'

const initIcons = () => {
  library.add(faUser, faCheck, faPen, faPlus, faFile, faForward)
}

export default {
  initIcons
}
