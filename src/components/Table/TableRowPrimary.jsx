import { Skeleton, TableCell, TableRow } from '@mui/material'
import { limitExcededStr } from '../../utils/helpers/string-helper'
import { postAction } from '../../utils/actions/post-actions'
import {
  StyledActionContainer,
  StyledButton,
  StyledChip,
  StyledChipContainer,
  StyledImageContainer
} from './styles'

function TableRowPrimary({
  row,
  columns,
  listIsLoading,
  
  handleOpenDeleteModal,
  handleOpenImagePreviewModal,
  handleGetDataSelected,
  handleOpenCreateUpdateModal,
  handleSetTitleAndActionType
}) {
  const handleActionClick = (event) => {
    const { name, value } = event.currentTarget

    if (name === 'delete') handleOpenDeleteModal()
    if (name === 'edit') {
      handleSetTitleAndActionType('edit', 'edit')
      handleOpenCreateUpdateModal()
    }

    handleGetDataSelected(value)
  }

  const handleImageClick = (event) => {
    handleGetDataSelected(event.currentTarget.value)
    handleOpenImagePreviewModal()
  }

  return (
    <TableRow
      hover
      role='checkbox'
      tabIndex={-1}
    >
      {columns.map(({ name, align }, index) => {
        let value = row[name]
        
        if (name === 'firstName') value = `${row.firstName} ${row.lastName}`
        if (name === 'owner') value = `${value.firstName} ${value.lastName}`
        if (name === 'image' || name === 'picture') {
          value = (
            <StyledImageContainer 
              value={JSON.stringify(row)}
              onClick={handleImageClick}>
              <img src={value || 'https://i.ibb.co/V2nrLXx/no-image.jpg'} />
            </StyledImageContainer>
          )
        }
        if (name === 'tags') {
          value = value.map((tag, index) => {
            return (
              <StyledChipContainer key={index} direction='row'>
                <StyledChip label={tag} />
              </StyledChipContainer>
            )
          })
        }
        if (name === 'action') {
          value = postAction.map(({ label, Icon }, index ) => {
            return (
              <StyledActionContainer key={index} direction='row'>
                <StyledButton
                  name={label}
                  value={JSON.stringify(row)}
                  startIcon={<Icon />}
                  onClick={handleActionClick}
                  variant='outlined'
                  size='small'
                >
                  {label}
                </StyledButton>
              </StyledActionContainer>
            )
          })
        }

        return (
          <TableCell key={index} align={align}>
            {listIsLoading ? (
              <Skeleton variant='rectangular' width='100%' />
            ) : (
              limitExcededStr(value, 14)
            )}
          </TableCell>
        )
      })}
    </TableRow>
  )
}

export default TableRowPrimary