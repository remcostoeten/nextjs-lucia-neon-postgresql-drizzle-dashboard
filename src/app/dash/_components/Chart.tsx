import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

type ChartProps = {
    data: Array<{ month: string; currentPeriod: number; lastPeriod: number }>;
};

export default function Chart({ data }: ChartProps) {
    return (
        <ResponsiveContainer width="100%" height={290}>
            <BarChart data={data}>
                <XAxis dataKey="month" />
                <YAxis />
                <Bar dataKey="lastPeriod" fill="#C6C6C6" />
                <Bar dataKey="currentPeriod" fill="#121212" />
            </BarChart>
        </ResponsiveContainer>
    );
}
