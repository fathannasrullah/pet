import {
  getPostList
} from '../store/post/action'

import { postTableColumns } from '../utils/table-colums/post-table-columns'
import { 
  STORE_NAME,
  STATE_NAME,
  REQUEST_STATUS
} from '../utils/constant'

import ListTableView from '../components/ListTableView'

function Post() {
  return (
    <main>
      <ListTableView
        showSearchFilter
        tableColumns={postTableColumns}
        responseKeyName='data'
        storeName={STORE_NAME.POST}
        listStateName={STATE_NAME.POST_LIST}
        listStatusLoading={REQUEST_STATUS.POST_LIST_PENDING}
        onFetchList={getPostList}
        //onFetchSearch={getSearchProduct}
      />
    </main>
  )
}

export default Post