/* eslint-disable */
import useApi from 'src/composables/UseApi'

export default function postsService() {
  const {
    liist,
    post,
    update,
    remove
  } = useApi('postts')

  return {
    liist,
    post,
    update,
    remove
  }
}
