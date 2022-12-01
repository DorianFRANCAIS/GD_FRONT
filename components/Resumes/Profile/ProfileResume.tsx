import { Avatar, MantineNumberSize, Paper, Text } from '@mantine/core'
import Image from 'next/image'
import { UserInterface } from '../../../interfaces/User.interface'

const ProfileResume = ({ height, radius, imageUrl } : { height: number, radius: MantineNumberSize, imageUrl: string }) => {
  return (
    <Paper
        radius={radius}
        sx={{ height: height, backgroundColor: "gray", padding: "1rem" }}
    >
        <div>
            <Avatar src={imageUrl} radius="xl" sx={{ height: "3rem", width: "3rem", border: "2px solid white" }}  />
            <Text>John Doe</Text>
        </div>
    </Paper>
  )
}

export default ProfileResume