import { createTheme } from '@mui/material'
import { isEmpty } from 'lodash'

export const purple = {
  dark: {
    1: '#0f131f',
    2: '#202535'
  },
  light: {
    1: '#e0e2f0',
    2: '#b2c5ff',
    3: '#8d909f',
    4: '#444564',
    5: '#424655',
    6: '#313541'
  }
}

export const theme = createTheme({
  palette: {
    common: {
      purple: {
        dark: {
          1: purple.dark[1],
          2: purple.dark[2]
        },
        light: {
          1: purple.light[1],
          2: purple.light[2],
          3: purple.light[3],
          4: purple.light[4],
          5: purple.light[5],
          6: purple.light[6]
        }
      }
    },
    primary: {
      main: purple.light[2]
    },
    text: {
      primary: purple.light[1]
    },
    divider: purple.light[5],
    background: {
      paper: purple.dark[2],
      default: purple.dark[1]
    },
    action: {
      active: purple.light[1],
      selected: purple.light[4],
      disabled: purple.light[3],
      disabledBackground: purple.light[6]
    }
  },
  shape: {
    borderRadius: 12
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        head: {
          background: purple.light[4]
        },
        body: {
          height: '30px',
          borderBottom: `1px solid ${purple.light[5]}`
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            background: purple.light[4]
          }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: purple.light[3],
          '&.MuiInputLabel-shrink': {
            color: purple.light[2],
            backgroundColor: purple.dark[2]
          },
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          border: `1px solid${purple.light[2]}`,
          color: purple.light[1],
          ...(!isEmpty(ownerState.value) && ownerState.value.length > 0
              ? {
                  opacity: 1,
                  '&.MuiInputLabel-shrink': {
                    color: purple.light[2],
                    backgroundColor: purple.dark[2]
                  },
                }
              : {
                  opacity: 1,
                  ':hover': {
                    opacity: 1
                  },
                }
            )
        }),
      }
    },
    MuiSelect: {
      styleOverrides: {
        /*select: ({ ownerState }) => ({
          ...(ownerState.value && ownerState.value.length > 0 && {
            color: purple.light[2]
          })
        })*/
      }
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: purple.light[2]
        }
      }
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          borderRadius: '20px'
        }
      }
    }
  }
})