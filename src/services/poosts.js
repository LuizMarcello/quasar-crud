/* eslint-disable */
import useApi from 'src/composables/UseApi'

export default function postsService() {
  const {
    liist,
    poost,
    update,
    remove
  } = useApi('postts')

  return {
    liist,
    poost,
    update,
    remove
  }
}
