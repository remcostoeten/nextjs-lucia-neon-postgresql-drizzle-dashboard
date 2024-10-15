import styles from './integration-title.module.scss'

export default function IntegrationTitle() {
	return (
		<div className={styles.integrationTitle}>
			<div className={styles.badge}>
				<div>Application powered by</div>
			</div>
			<h3>
				<span className={styles.gradientSpan}>
					You won't get AI pushed
					<br /> down your throat here
				</span>
			</h3>
		</div>
	)
}
