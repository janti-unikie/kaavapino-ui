import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faCheck } from '@fortawesome/free-solid-svg-icons'

const initIcons = () => {
  library.add(faUser, faCheck)
}

export default {
  initIcons
}
