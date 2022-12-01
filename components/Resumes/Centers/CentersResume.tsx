import { MantineNumberSize, Paper, Title } from "@mantine/core";

const CentersResume = ({ radius, height }: { radius: MantineNumberSize, height: number }) => {
  return (
    <Paper
        radius={radius}
        sx={{ height: height, backgroundColor: "gray" }}
    >
        <Title>Centers Resume</Title>
    </Paper>
  );
};

export default CentersResume;
