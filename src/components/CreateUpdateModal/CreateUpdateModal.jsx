import { Fragment, useEffect, useMemo, useState } from "react";

import { DialogContent, TextField, Typography, Button, Autocomplete, Grid, DialogActions, Select, IconButton, MenuItem, ListItemText, ListItemIcon, InputLabel, FormControl, CircularProgress, Box, Popper } from '@mui/material'

import { StyledDialog, StyledDialogTitle, StyledFormControl } from './styles'
import { useDispatch, useSelector } from "react-redux"
import CustomAutocomplete from "../CustomAutocomplete/CustomAutocomplete"
import autocompleteHelper from "../../utils/helpers/autocomplete-helper"
import { createFilterOptions } from "../CustomAutocomplete/useCustomAutocomplete"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { AnimatePresence, motion } from 'framer-motion'
import CloseIcon from '@mui/icons-material/Close'
import ErrorIcon from '@mui/icons-material/Error'
import { findInputError, isFormInvalid } from "../../utils/helpers/validation-helper"
import { isEmpty } from "lodash"

const prepareInput = (inputs) => {
  return inputs.reduce((obj, currObj) => ({ ...obj, [currObj.name]: currObj.value }), {})
}

function CreateUpdateModal({
  title,
  actionType,
  inputs,
  open,
  details,
  detailLoading,
  createDataLoading,
  createDataSuccess,
  updateDataLoading,
  updateDataSuccess,
  storeNameForAutocomplete,
  stateNameForAutocomplete,
  getAutocompleteList,
  handleCloseCreateUpdateModal,
  onSubmit,
}) {
  const dispatch = useDispatch()
  let requestStatus = ''
  let listState = ''

  if (storeNameForAutocomplete) {
    const { requestStatus: status, [stateNameForAutocomplete]: state } = useSelector((state) => state[storeNameForAutocomplete])
    requestStatus = status
    listState = state
  }

  const initialInput = useMemo(() => prepareInput(inputs), [inputs])
  const [input, setInput] = useState(initialInput)
  const [tagName, setTagName] = useState('type first then enter!');
  const [selectedTag, setSelectedTag] = useState(null)
  const [selectedAddTag, setSelectedAddTag] = useState(null)

  const filter = createFilterOptions()
  const methods = useForm()
  
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    reset
  } = useForm({ defaultValues: initialInput })

  const {
    data: optionList = [],
    page: currPage,
    total
  } = listState
  
  /*const handleInputChange = (event) => {
    const { name, value } = event.target
    
    setInput(prevInput => ({
      ...prevInput,
      [name]: value
    }))
  }*/
  
  const handleAutocompleteChange = (event, name, value) => {
    event.preventDefault()
    setInput(prevInput => ({ ...prevInput, [name]: value.id}))
  }

  const handleOpenAutocomplete = () => {
    dispatch(getAutocompleteList({
      limit: 30,
      page: 1
    }))
  }

  const handleScrollAutocomplete = () => {
    if (optionList.length === total) return

    dispatch(getAutocompleteList({
      limit: 30,
      page: currPage + 1
    }))
  }

  const handleSubmitForm = (data) => onSubmit(data)

  useEffect(() => {
    reset(initialInput)

    if (createDataSuccess || updateDataSuccess && !isEmpty(initialInput)) {
      reset(initialInput)
      handleCloseCreateUpdateModal()
    }
  }, [reset, initialInput, createDataSuccess, updateDataSuccess])

  if (actionType === 'edit' && isEmpty(details)) {
    return (
      <StyledDialog
        open={open}
        onClose={handleCloseCreateUpdateModal}
      >
        <DialogContent>
          <StyledDialogTitle>
            <IconButton onClick={handleCloseCreateUpdateModal}>
              <CloseIcon />
            </IconButton>
          </StyledDialogTitle>
          <Grid container
            justifyContent='center'
            alignItems='center'
          >
            <CircularProgress />
          </Grid>
        </DialogContent>
      </StyledDialog>
      )
    }

  return (
    <StyledDialog
      open={open}
      onClose={handleCloseCreateUpdateModal}
    >
      <StyledDialogTitle>
        <IconButton onClick={handleCloseCreateUpdateModal}>
          <CloseIcon />
        </IconButton>
        {title}
      </StyledDialogTitle>
      <DialogContent>
        <FormProvider {...methods}>

        <form
          autoComplete='off'
          onSubmit={handleSubmit(handleSubmitForm)}
        >
          {inputs.map(({
            isInput,
            isSelect,
            isAutocomplete,
            isAutocompleteTag,
            isMultiline,
            rows,
            label,
            name,
            type,
            placeholder,
            defaultValue,
            selectOptions,
            validation,
          }, index) => {
            const inputErrors = findInputError(errors, name)
            const isInvalid = isFormInvalid(inputErrors)
            
            return (
              <Fragment key={index}>
                <StyledFormControl>
                  <AnimatePresence mode='wait' initial={false}>
                    {isInvalid && (
                      <InputError
                        message={inputErrors.error.message}
                        key={inputErrors.error.message}
                      />
                    )}
                  </AnimatePresence>
                  
                  {isSelect &&
                    <FormControl fullWidth>
                      <InputLabel>{label}</InputLabel>
                      <Controller
                        control={control}
                        name={name}
                        rules={validation}
                        render={({ field: { onChange, value } }) => (
                          <Select
                            name={name}
                            label={label}
                            value={value}
                            onChange={(event, option) => {
                              event.preventDefault()
                              onChange(option.props.value)
                            }}
                            
                          >
                            {selectOptions.map((option, index) => (
                              <MenuItem key={index} value={option}>{option}</MenuItem>
                            ))}
                          </Select>
                        )}
                      />
                    </FormControl>
                  }
                  

                  {isAutocomplete &&
                    <Controller
                      control={control}
                      name={name}
                      rules={validation}
                      render={({ field: { onChange, value } }) => (
                        <CustomAutocomplete
                          disabled={actionType === 'edit'}
                          value={value}
                          options={optionList}
                          totalOptions={autocompleteHelper.getOptionPaginatedAutocomplete( optionList, 30, 3 )}
                          onOpen={handleOpenAutocomplete}
                          getOptionLabel={(option) => option ? `${option.firstName} ${option.lastName}` : ''}
                          isOptionEqualToValue={(option, value) =>
                            value === undefined || value === '' || option.id === value.id
                          }
                          onChange={(event, option) => {
                            event.preventDefault()
                            onChange(option)
                          }}
                          autoHighlight={true}
                          isPaginated={true}
                          ListboxProps={{
                            onScroll: (event) => {
                              // i need scroll into bottom view when api was hitted
                              const { offsetHeight, scrollHeight, scrollTop } = event.target
                              const amountOffsetHeightScrollTop = Math.round(offsetHeight + scrollTop)
                              const isEndOfScroll = amountOffsetHeightScrollTop === scrollHeight
          
                              if (isEndOfScroll) handleScrollAutocomplete()
                            }
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label={label}
                              placeholder={placeholder}
                            />
                          )}
                        />
                      )}
                    />
                  }
              
                  {isAutocompleteTag &&
                    <Controller
                      control={control}
                      name={name}
                      rules={validation}
                      render={({ field: { onChange, value } }) => (
                        <Autocomplete
                          id="combo-box-demo"
                          name={name}
                          multiple
                          options={[]}
                          value={value}
                          defaultValue={[ 'type first then enter' ]}
                          
                          getOptionLabel={(option) => option}
                          onChange={(event, option) => {
                            event.preventDefault()
                            onChange(option)
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label={label}
                              placeholder={placeholder}
                            />
                          )}
                          freeSolo
                          selectOnFocus
                          handleHomeEndKeys
                          filterOptions={(options, params) => {
                            const filtered = filter(options, params)
                    
                            if (params.inputValue !== "") filtered.concat(params.inputValue)
                            return filtered
                          }}
                        />
                      )}
                    />
                  }

                  {isInput &&
                    <TextField
                      label={label}
                      name={name}
                      placeholder={placeholder}
                      multiline={isMultiline}
                      rows={rows}
                      type={type}
                      fullWidth
                      variant='outlined'
                      {...register(name, validation)}
                   />
                  }
                </StyledFormControl>
              </Fragment>
            )
          })}
          <Grid container
            flexDirection='row'
            justifyContent='flex-end'
            gap={2}
          >
            <Button variant='outlined'
              onClick={handleCloseCreateUpdateModal}
            >
              cancel
            </Button>
            <Button
              disabled={createDataLoading || updateDataLoading}
              type='submit'
              variant='contained'
            >
              submit
            </Button>
          </Grid>
        </form>

        </FormProvider>
      </DialogContent>
    </StyledDialog>
  )
}

const InputError = ({ message }) => {
  return (
    <Grid justifyContent='flex-end' sx={{ color: 'red', marginBottom: '5px' }} container>
      <motion.div
        {...framer_error}
      >
        <Grid justifyContent='flex-end' alignItems='center' gap={0.5} container>
          <ErrorIcon />
          <Typography fontSize='12px'>{message}</Typography>
        </Grid>
      </motion.div>
    </Grid>
  )
}

const framer_error = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
}

export default CreateUpdateModal