import { LineChart } from "@mantine/charts";
import { Box, Title } from "@mantine/core";

const MonthlyQuestBreakdownChart = ({
  data,
}: {
  data: { [key: number]: number };
}) => {
  const chartData = Object.entries(data).map(([key, value]) => ({
    x: parseInt(key),
    y: value,
  }));

  return (
    <Box p={32}>
      <Title order={3}>Monthly Quest Breakdown</Title>
      <LineChart
        data={chartData}
        h={400}
        xAxisProps={{
          label: "Day of the Month",
          tickFormatter: (val) => `Day ${val}`,
        }}
        yAxisProps={{ label: "Quests Completed" }}
        series={[]}
        dataKey={""}
      />
    </Box>
  );
};

export default MonthlyQuestBreakdownChart;
