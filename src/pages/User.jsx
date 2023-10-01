import {
  getUserList
} from '../store/user/action'

import { userTableColumns } from '../utils/table-colums/user-table-columns'
import { 
  STORE_NAME,
  STATE_NAME,
  REQUEST_STATUS
} from '../utils/constant'

import ListTableView from '../components/ListTableView'

function User() {
  return (
    <main>
      <ListTableView
        addButtonLabel='create user'
        tableColumns={userTableColumns}
        responseKeyName='data'
        storeName={STORE_NAME.USER}
        listStateName={STATE_NAME.USER_LIST}
        listStatusLoading={REQUEST_STATUS.USER_LIST_PENDING}
        onFetchList={getUserList}
      />
    </main>
  )
}

export default User