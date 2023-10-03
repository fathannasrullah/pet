import { Fragment, useEffect, useMemo, useState } from "react";

import { Dialog, DialogTitle, DialogContent, TextField, Typography, Button, Autocomplete, Grid, DialogActions, Select, IconButton, MenuItem, ListItemText, ListItemIcon } from '@mui/material'

import { StyledDialogTitle, StyledFormControl } from './styles'
import { useDispatch, useSelector } from "react-redux";
import CustomAutocomplete from "../CustomAutocomplete/CustomAutocomplete";
import autocompleteHelper from "../../utils/helpers/autocomplete-helper";
import { createFilterOptions } from "../CustomAutocomplete/useCustomAutocomplete";
import { FormProvider, useForm } from "react-hook-form";
import { useFormContext } from 'react-hook-form'
import { AnimatePresence, motion } from 'framer-motion'

import ErrorIcon from '@mui/icons-material/Error'
import { findInputError, isFormInvalid } from "../../utils/helpers/validation-helper";

const prepareInput = (inputs) => {
  return inputs.reduce((obj, key) => ({...obj, [key.name]: key.value}), {})
}

function CreateUpdateModal({
  title,
  inputs,
  btnText,
  open,
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
  } = useForm()

  const {
    data: optionList = [],
    page: currPage,
    total
  } = listState
  
  const handleChangeInput = (event) => {
    const { name, value } = event.target
    
    setInput(prevInput => ({
      ...prevInput,
      [name]: value
    }))
  }
  
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

  const handleSubmitForm = (data) => {
    let { likes } = data
    const submittedData = {
      ...data,
      likes: Number(likes),
      tags: input.tags
    }
    console.log('data :', data)
    
    onSubmit(submittedData)
  }

  console.log('input  :', input)
  
  const optionsForSelect = [
    {
      name: 'Mr'
    },
    {
      name: 'Mrs'
    },
    {
      name: 'Miss'
    }
  ]

  return (
    <Dialog
      open={open}
      onClose={handleCloseCreateUpdateModal}
    >
      <StyledDialogTitle>{title}</StyledDialogTitle>
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
            value,
            maxLength,
            validation
          }, index) => {
            /*const {
              register,
              formState: { errors },
            } = useFormContext()*/
          
            const inputErrors = findInputError(errors, name)
            const isInvalid = isFormInvalid(inputErrors)
          
            return (
              <Fragment key={index}>
                <AnimatePresence mode="wait" initial={false}>
                  {isInvalid && (
                    <InputError
                      message={inputErrors.error.message}
                      key={inputErrors.error.message}
                    />
                  )}
                </AnimatePresence>
                <StyledFormControl>
                  {/*
                  {isSelect &&
                    <Select
                      name={name}
                      value={input[value]}
                      label='Title'
                    >
                    {optionsForSelect && optionsForSelect.map((option, index) => (
                      <MenuItem key={index} value={option.name}>
                        <ListItemText primary={option.name} />
                      </MenuItem>
                      ))
                    }
                    </Select>
                  }
                  */}

                  {isAutocomplete &&
                    <CustomAutocomplete
                      name={name}
                      value={input[value]}
                      options={optionList}
                      totalOptions={autocompleteHelper.getOptionPaginatedAutocomplete( optionList, 30, 3 )}
                      onOpen={handleOpenAutocomplete}
                      getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                      isOptionEqualToValue={(option, value) => autocompleteHelper.isOptionEqualToValue(option, value, 'id')}
                      onChange={(event, currValue) => handleAutocompleteChange(event, name, currValue)}
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
                          {...register(name, validation)}
                        />
                      )}
                      {...register(name, validation)}
                      /*PopperComponent={(props) => (
                       <Popper {...props} sx={{ backgroundColor: 'red' }} />
                      )}*/
                    />
                  }
              
                  {isAutocompleteTag &&
                    <Autocomplete
                      id="combo-box-demo"
                      name={name}
                      options={[]}
                      value={input[value]}
                      multiple
                      getOptionLabel={(option) => {
                        return option
                      }}
                      style={{ width: 300 }}
                      inputValue={tagName}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={label}
                          name={name}
                          variant="outlined"
                          {...register(name, validation)}
                        />
                      )}
                      onInputChange={(event, value) => {
                        event.preventDefault()
                        setTagName(value)
                        //setInput(prevInput => ({ ...prevInput, [name]: [value] }))
                      }}
                      onClose={(event, reason) => {
                        event.preventDefault()
                          if (reason === "blur") {
                          setSelectedTag(null);
                        }
                      }}
                      onChange={(event, value, reason) => {
                        event.preventDefault()
                    
                        switch (reason) {
                          case "clear":
                            setInput(prevInput => ({ ...prevInput, [name]: [] }))
                            break
                          case "remove-option":
                            setInput(prevInput => ({ ...prevInput, [name]: value }))
                            break
                          case "select-option":
                            const lastItem = value[value.length - 1];
                            if (typeof lastItem === "string") {
                              setSelectedTag(null);
                              break
                            }
                            if (!!lastItem.type) {
                              setSelectedAddTag(lastItem)
                              break
                            }
                            const isExists = input[name].some(
                              (tagItem) => tagItem.id === lastItem.id
                            )
                            if (isExists) {
                              setSelectedTag(null)
                            } else {
                              setSelectedTag(lastItem)
                              setInput(prevInput => ({ ...prevInput, [name]: value }))
                            }
                            break
                          default:
                            break
                        }
                        console.log('tahs :', value)
                        setInput(prevInput => ({ ...prevInput, [name]: value }))
                      }}
                      freeSolo
                      selectOnFocus
                      handleHomeEndKeys
                      filterOptions={(options, params) => {
                        const filtered = filter(options, params)
                    
                        if (params.inputValue !== "") filtered.concat(params.inputValue)
                        return filtered
                      }}
                      //{...register(name, validation)}
                   />
                  }

                  {isInput &&
                    <TextField
                      label={label}
                      name={name}
                      multiline={isMultiline}
                      rows={rows}
                      type={type}
                      value={input[value]}
                      onChange={(event) => handleChangeInput(event)}
                      fullWidth
                      variant='outlined'
                      inputProps={{
                        maxLength: maxLength,
                      }}
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
              type='submit'
              variant='contained'
            >
              submit
            </Button>
          </Grid>
        </form>

        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}

const InputError = ({ message }) => {
  return (
    <Grid justifyContent='flex-end' color='red' container>
      <motion.div
        {...framer_error}
      >
        <Grid justifyContent='flex-end' alignItems='center' container>
          <ErrorIcon />
          <Typography fontSize='11px'>{message}</Typography>
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