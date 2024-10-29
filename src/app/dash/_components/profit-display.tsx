type ProfitDisplayProps = {
    profit: number;
    lastPeriodProfit: number;
};

export default function ProfitDisplay({ profit, lastPeriodProfit }: ProfitDisplayProps) {
    return (
        <div className="space-y-2 mb-14 inline-block select-text">
            <h1 className="text-4xl font-mono">
                ${profit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h1>
            <div className="text-sm text-gray-500 flex items-center space-x-2">
                <p>vs ${lastPeriodProfit.toLocaleString('en-US')} last period</p>
                {/* Add info icon */}
            </div>
        </div>
    );
}
