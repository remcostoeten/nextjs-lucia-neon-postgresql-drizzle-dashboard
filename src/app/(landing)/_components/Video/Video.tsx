import HorizontalLine from '../horizontal-line'
import styles from './video.module.scss'

type VideoProps = {
	// Add any props here if needed
}

type LineDotProps = {
	position: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight'
}

function LineDot({ position }: LineDotProps) {
	return <div className={`${styles.lineDot} ${styles[position]}`}></div>
}

function LinesGroup() {
	return (
		<div className={styles.linesGroup}>
			<div className={styles.lineVerticalLeft}></div>
			<div className={styles.lineVerticalRight}></div>
			<LineDot position="bottomLeft" />
			<LineDot position="bottomRight" />
			<LineDot position="topLeft" />
			<LineDot position="topRight" />
		</div>
	)
}

export default function Video({}: VideoProps) {
	return (
		<div className="relative">
			<div className={styles.videoContainerLines}>
				<div className={styles.containerRegular}>
					<div
						className={`${styles.videoLightboxWrapper} ${styles.styleYWvEo}`}
						id="style-YWvEo"
					>
						<a
							href="#"
							className={`${styles.videoLightboxLink} ${styles.wInlineBlock} ${styles.wLightbox}`}
							aria-label="open lightbox"
							aria-haspopup="dialog"
						>
							<img
								src="https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65b8f8b4e99c725a3cdc8f4f_Play%20Icon.svg"
								loading="lazy"
								alt=""
								className={styles.iconRegular}
							/>
						</a>
					</div>
					<LinesGroup />
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
