import { cn } from '@/lib/utils'
import HorizontalLine from '../horizontal-line'
import { ZenWealthContainer } from './ZenWealth/ZenWealthContainer'
import styles from './hero.module.scss'

type LineDotProps = {
	position: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight'
}

function LineDot({ position }: LineDotProps) {
	return <div className={`${styles.lineDot} ${styles[position]}`}></div>
}

export default function Hero() {
	return (
		<div className="relative">
			<div
				className={cn(
					'py-[55px] ',
					'px-theme z-5 w-full max-w-big-wrapper mx-auto relative '
				)}
			>
				<div className="w-full max-w-wrapper mx-auto relative">
					<div className={styles.inner}>
						<ZenWealthContainer />
					</div>
				</div>
				<div className={styles.linesGroup}>
					<div className={styles.lineVerticalLeft}></div>
					<div className={styles.lineVerticalRight}></div>
					<LineDot position="bottomLeft" />
					<LineDot position="bottomRight" />
				</div>
				<HorizontalLine />
			</div>
		</div>
	)
}
