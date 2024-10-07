import { metadata } from '@/core/config/metadata/metadata.root-layout';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Toaster, TooltipProvider } from 'ui';

export { metadata };

export default function ThemeWrapper({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<TooltipProvider>
				<>
					<Toaster richColors />
					{children}
				</>
			</TooltipProvider>
			<Analytics />
			<SpeedInsights />
		</>
	);
}
