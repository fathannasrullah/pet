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
import HideOnScroll from '../HideOnScroll'

const Search = (props) => {
  const { searchValue, onSearchChange } = props

  const handleKeyDown = (event) => {
    event.key === 'Enter' && event.preventDefault()
  }

  return (
    <HideOnScroll {...props}>
      <StyledForm>
        <StyledSearchContainer>
          <StyledSearchIconContainer>
            <SearchIcon />
          </StyledSearchIconContainer>
          <StyledInputBase
            fullWidth
            value={searchValue}
            placeholder='Search by tag..'
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
    </HideOnScroll>
  )
}

export default Search