// app/components/Dashboard.tsx
import Chart from './Chart';
import ConnectBankAccount from './ConnectBankAccount';
import DateRangePicker from './DateRangePicker';
import OptionsMenu from './OptionsMenu';
import ProfitDisplay from './ProfitDisplay';

type DashboardProps = {
    profit: number;
    lastPeriodProfit: number;
    dateRange: string;
    chartData: Array<{ month: string; currentPeriod: number; lastPeriod: number }>;
};

export default function Dashboard({ profit, lastPeriodProfit, dateRange, chartData }: DashboardProps) {
    return (
        <section className="relative h-[530px] mb-4">
            <div className="flex justify-between mt-6 space-x-2">
                <div className="flex space-x-2">
                    {/* Placeholder for profit type selector */}
                    <button className="flex h-9 w-full items-center justify-between whitespace-nowrap border border-border bg-transparent px-3 py-2 text-sm font-medium">
                        <span className="line-clamp-1">Profit</span>
                        {/* Add dropdown icon */}
                    </button>
                </div>
                <div className="flex space-x-2">
                    <DateRangePicker dateRange={dateRange} />
                    <OptionsMenu />
                </div>
            </div>

            <div className="mt-8 relative">
                <ProfitDisplay profit={profit} lastPeriodProfit={lastPeriodProfit} />
                <Chart data={chartData} />
                <ConnectBankAccount />
            </div>
        </section>
    );
}
