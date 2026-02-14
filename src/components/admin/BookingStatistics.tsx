import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { format, startOfWeek, startOfMonth, getYear, getWeek, parseISO } from "date-fns";

interface Booking {
  id: string;
  booking_date: string;
  created_at: string;
  status: string;
}

interface BookingStatisticsProps {
  bookings: Booking[];
}

const chartConfig = {
  count: { label: "Bookings", color: "hsl(var(--primary))" },
};

const BookingStatistics = ({ bookings }: BookingStatisticsProps) => {
  const weeklyData = useMemo(() => {
    const map = new Map<string, number>();
    bookings.forEach((b) => {
      const date = parseISO(b.created_at);
      const weekStart = startOfWeek(date, { weekStartsOn: 1 });
      const key = format(weekStart, "dd MMM yyyy");
      map.set(key, (map.get(key) || 0) + 1);
    });
    return Array.from(map.entries())
      .map(([week, count]) => ({ label: week, count }))
      .reverse();
  }, [bookings]);

  const monthlyData = useMemo(() => {
    const map = new Map<string, number>();
    bookings.forEach((b) => {
      const date = parseISO(b.created_at);
      const key = format(date, "MMM yyyy");
      map.set(key, (map.get(key) || 0) + 1);
    });
    return Array.from(map.entries())
      .map(([month, count]) => ({ label: month, count }))
      .reverse();
  }, [bookings]);

  const yearlyData = useMemo(() => {
    const map = new Map<string, number>();
    bookings.forEach((b) => {
      const date = parseISO(b.created_at);
      const key = String(getYear(date));
      map.set(key, (map.get(key) || 0) + 1);
    });
    return Array.from(map.entries())
      .map(([year, count]) => ({ label: year, count }))
      .reverse();
  }, [bookings]);

  const renderChart = (title: string, data: { label: string; count: number }[]) => (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="text-muted-foreground text-sm text-center py-8">No data available</p>
        ) : (
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="label" fontSize={11} tickLine={false} axisLine={false} className="fill-muted-foreground" />
              <YAxis allowDecimals={false} fontSize={11} tickLine={false} axisLine={false} className="fill-muted-foreground" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="count" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))" }} />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">This Week</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{weeklyData.length > 0 ? weeklyData[weeklyData.length - 1]?.count || 0 : 0}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">This Month</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{monthlyData.length > 0 ? monthlyData[monthlyData.length - 1]?.count || 0 : 0}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">This Year</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{yearlyData.length > 0 ? yearlyData[yearlyData.length - 1]?.count || 0 : 0}</div></CardContent>
        </Card>
      </div>

      {renderChart("Weekly Booking Trends", weeklyData)}
      {renderChart("Monthly Booking Trends", monthlyData)}
      {renderChart("Yearly Booking Trends", yearlyData)}
    </div>
  );
};

export default BookingStatistics;
