import { CircularProgress, Grid } from "@mui/material"

function InitialLoading() {
  return (
    <Grid container
      height='60vh'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
    >
      <CircularProgress />
    </Grid>
  )
}

export default InitialLoading