import { MantineNumberSize, Paper, Title } from "@mantine/core";

const EmployeesResume = ({
  radius,
  height,
}: {
  radius: MantineNumberSize;
  height: number;
}) => {
  return (
    <Paper
      radius={radius}
      sx={{ height: height, backgroundColor: "gray" }}
    >
        <Title>Employees Resume</Title>
    </Paper>
  );
};

export default EmployeesResume;
