import {
  Card,
  Paper,
  Table as MUITable,
  TableHead,
  TableCell,
  TableBody,
  TablePagination,
  TableRow,
  Grid,
  Typography
} from '@mui/material'

import { isEmpty } from 'lodash'

import TableRowPrimary from './TableRowPrimary'

import { StyledTableContainer } from './styles'

function Table({
  TableRowCustom = TableRowPrimary,
  columns,
  rows,
  page,
  rowsPerPage,
  viewDetail,
  basePath,
  listIsLoading,
  onPageChange,
  
  handleGetDataSelected,
  handleOpenImagePreviewModal,
  handleOpenDeleteModal,
  handleOpenCreateUpdateModal,
  handleSetTitleAndActionType,
}) {
  return (
    <Card>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <StyledTableContainer>
          <MUITable stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    key={index}
                    align={column.align}
                    sx={{ minWidth: column.minWidth, width: column.width }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                return (
                  <TableRowCustom
                    key={row.id}
                    row={row}
                    columns={columns}
                    viewDetail={viewDetail}
                    basePath={basePath}
                    listIsLoading={listIsLoading}

                    handleGetDataSelected={handleGetDataSelected}
                    handleOpenImagePreviewModal={handleOpenImagePreviewModal}
                    handleOpenDeleteModal={handleOpenDeleteModal}
                    handleOpenCreateUpdateModal={handleOpenCreateUpdateModal}
                    handleSetTitleAndActionType={handleSetTitleAndActionType}
                    
                  />
                )
              })}
            </TableBody>
          </MUITable>
          {isEmpty(rows) && !listIsLoading &&
            <Grid container justifyContent='center' alignItems='center' sx={{ height: '50vh' }}>
              <Typography>Data not found!</Typography>
            </Grid>
          }
        </StyledTableContainer>
        <TablePagination 
          rowsPerPageOptions={[10]}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onPageChange}
        />
      </Paper>
    </Card>
  )
}

export default Table