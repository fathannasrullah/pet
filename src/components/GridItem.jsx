import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, Skeleton, Stack, Typography, styled } from "@mui/material"
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Likes from './Likes'

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  '& p': {
    fontSize: '16px',
    color: theme.palette.common.purple.light[1]
  },
  '& span': {
    fontSize: '11px',
    color: theme.palette.common.purple.light[3]
  }
}))

function GridItem({
  listLoading,
  id,
  avatar,
  title,
  subHeader,
  image,
  contentText,
  tags,
  likes,
  submittedData
}) {
  return (
    <Card sx={{ minHeight: 400, maxWidth: 345 }}>
      <StyledCardHeader
        avatar={<Avatar aria-label="recipe" src={avatar || <AccountCircleIcon />} />}
        title={listLoading ? (<Skeleton sx={{ marginBottom: '5px' }} variant='rectangular' />) : (<p>{title}</p>)}
        subheader={listLoading ? (<Skeleton variant='rectangular' />) : (<span>{subHeader}</span>)}
      />
      {listLoading ? (
        <Skeleton sx={{ minHeight: '200px' }} variant='rectangular' />
      ) : (
        <CardMedia
          component='img'
          height='194'
          image={image || 'https://i.ibb.co/V2nrLXx/no-image.jpg'}
          alt={title}
        />
      )}
      <CardContent>
        {listLoading ? (<Skeleton variant='rectangular'/>) : (<Typography>{contentText}</Typography>)}
      </CardContent>
      {listLoading ? (
        <Skeleton variant='rectangular' />
      ) : (
        <Box
          sx={{
            overflow: 'auto',
            '::-webkit-scrollbar': {
              display: 'none'
            },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none'
          }}
        >
          <Stack direction='row' spacing={0.5} padding='0 10px'>
            {tags.map((tag, index) => (<Chip key={index} label={tag} size='small' />))}
          </Stack>
        </Box>
      )}
      {listLoading ? (
        <Skeleton sx={{ marginTop: '5px' }} variant='rectangular' />
      ) : (
        <CardActions disableSpacing>
          <Likes
            id={id}
            likes={likes}
            submittedData={submittedData}
          />
        </CardActions>
      )}
    </Card>
  )
}

export default GridItem