import { getHomeList, getSearchPostByTag } from '../store/post/action'
import { REQUEST_STATUS, STATE_NAME, STORE_NAME } from '../utils/constant'
import ListGridView from '../components/ListGridView'

function Home() {
  return (
    <main>
      <ListGridView 
        responseKeyName='data'
        storeName={STORE_NAME.POST}
        listStateName={STATE_NAME.HOME_LIST}
        listLoadingStatus={REQUEST_STATUS.POST_LIST_PENDING}
        onFetchList={getHomeList}
        onFetchSearch={getSearchPostByTag}
      />
    </main>
  )
}

export default Home