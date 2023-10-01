import { IconButton, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'

import { isEmpty } from 'lodash'

import { 
  StyledForm,
  StyledInputBase, 
  StyledSearchContainer, 
  StyledSearchIconContainer 
} from './styles'

const Search = ({ searchValue, onSearchChange }) => {
  const handleKeyDown = (event) => {
    event.key === 'Enter' && event.preventDefault()
  }

  return (
    <StyledForm>
      <StyledSearchContainer>
        <StyledSearchIconContainer>
          <SearchIcon />
        </StyledSearchIconContainer>
        <StyledInputBase
          fullWidth
          value={searchValue}
          placeholder='Search..'
          inputProps={{
            'aria-label': 'search',
            maxLength: 50
          }}
          endAdornment={!isEmpty(searchValue) &&
            <InputAdornment position='end'>
              <IconButton
                size='small'
                onClick={(event) => onSearchChange(event, '')}
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          }
          onChange={onSearchChange}
          onKeyDown={handleKeyDown}
        />
      </StyledSearchContainer>
    </StyledForm>
  )
}

export default Search