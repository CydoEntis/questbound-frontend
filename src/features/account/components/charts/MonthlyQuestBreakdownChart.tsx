import { ChartTooltipProps, LineChart } from "@mantine/charts";
import { Paper, Title, Text } from "@mantine/core";

type PayloadItem = {
  name: string;
  value: number | string;
};

function ChartTooltip({ label, payload }: ChartTooltipProps) {
  if (!payload) return null;

  const typedPayload = payload as PayloadItem[];

  return (
    <Paper px="md" py="sm" withBorder shadow="md" radius="md">
      <Text fw={500} mb={5}>
        {label}
      </Text>
      {typedPayload.map((item) => (
        <Text key={item.name} fz="sm">
          {item.value}
        </Text>
      ))}
    </Paper>
  );
}

function MonthlyQuestBreakdownChart({
  data,
}: {
  data: { date: number; value: number }[];
}) {
  console.log("DATA: ", data);

  return (
    <Paper bg="card" p={32}>
      <Title order={3} mb={16}>
        Monthly Quest Breakdown
      </Title>
      <LineChart
        h={330}
        data={data}
        series={[{ name: "value", label: "Quests", color: "violet" }]}
        dataKey="date"
        strokeWidth={2}
        curveType="natural"
        yAxisProps={{
          domain: [0, Math.max(...data.map((d) => d.value)) + 1],
        }}
        valueFormatter={(value) => `${value}`}
        tooltipProps={{
          content: ({ payload }) => (
            <ChartTooltip label={"Completed Quests"} payload={payload} />
          ),
        }}
        xAxisLabel="Day"
        yAxisLabel="Quests Completed"
      />
    </Paper>
  );
}

export default MonthlyQuestBreakdownChart;
