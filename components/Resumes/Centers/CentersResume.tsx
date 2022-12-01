import { MantineNumberSize, Paper, Title } from "@mantine/core";
import useCentersResumeStyle from "./CentersResume.style";

const CentersResume = ({ radius, height }: { radius: MantineNumberSize, height: number }) => {

  const { classes } = useCentersResumeStyle();

  return (
    <Paper
        radius={radius}
        className={classes.wrapper}
        sx={{ height: height }}
    >
        <Title>Centers Resume</Title>
    </Paper>
  );
};

export default CentersResume;
