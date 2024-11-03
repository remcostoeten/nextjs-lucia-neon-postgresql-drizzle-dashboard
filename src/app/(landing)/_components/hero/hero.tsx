import { cn } from 'cn'

import HorizontalLine from '../horizontal-line'
import styles from './hero.module.scss'
import { ZenWealthContainer } from './ZenWealth/ZenWealthContainer'

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
					'px-theme z-5 max-w-big-wrapper relative mx-auto w-full '
				)}
			>
				<div className="max-w-wrapper relative w-full">
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
