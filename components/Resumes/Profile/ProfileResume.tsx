import { Avatar, MantineNumberSize, Paper, Text } from '@mantine/core'
import useProfileResumeStyles from './ProfileResume.style'

const ProfileResume = ({ height, radius, imageUrl } : { height: number, radius: MantineNumberSize, imageUrl: string }) => {

  const { classes } = useProfileResumeStyles();

  return (
    <Paper
        radius={radius}
        className={classes.wrapper}
        sx={{ height: height, padding: "1rem" }}
    >
        <div>
            <Avatar src={imageUrl} radius="xl" sx={{ height: "3rem", width: "3rem", border: "2px solid white" }}  />
            <Text>John Doe</Text>
        </div>
    </Paper>
  )
}

export default ProfileResume