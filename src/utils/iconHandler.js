import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faUser,
  faCheck,
  faPen,
  faPlus,
  faFile,
  faFileAlt,
  faForward,
  faArrowLeft,
  faAngleUp,
  faAngleDown,
  faSearch,
  faTimes
} from '@fortawesome/free-solid-svg-icons'

const initIcons = () => {
  library.add(
    faUser,
    faCheck,
    faPen,
    faPlus,
    faFile,
    faFileAlt,
    faForward,
    faArrowLeft,
    faAngleUp,
    faAngleDown,
    faSearch,
    faTimes,
  )
}

export default {
  initIcons
}
