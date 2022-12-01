import { MantineNumberSize, Paper, Title } from "@mantine/core";
import useEmployeesResumeStyles from "./EmployeesResume.style";

const EmployeesResume = ({
  radius,
  height,
}: {
  radius: MantineNumberSize;
  height: number;
}) => {

  const { classes } = useEmployeesResumeStyles();

  return (
    <Paper
      radius={radius}
      className={classes.wrapper}
      sx={{ height: height }}
    >
        <Title>Employees Resume</Title>
    </Paper>
  );
};

export default EmployeesResume;
