import HorizontalLine from '../horizontal-line'
import Logo from './_components/logo'
import SecondaryButton from './_components/sign-in-button'
import styles from './navigation.module.scss'

export default function Navigation() {
	return (
		<div className="relative">
			<div className={`${styles.navbar} ${styles['w-nav']}`}>
				<div className={styles['nav-container-lines']}>
					<div className={styles['nav-container']}>
						<Logo />

						<div className={styles['nav-button-group']}>
							<SecondaryButton href="https://webflow.partnerlinks.io/flowbase-luna-template">
								Dashboard
							</SecondaryButton>
							<div
								className={`${styles['menu-button']} ${styles['w-nav-button']}`}
								role="button"
								tabIndex={0}
								aria-controls="w-nav-overlay-0"
								aria-haspopup="menu"
								aria-expanded="false"
							>
								<div
									className={styles['w-icon-nav-menu']}
								></div>
							</div>
						</div>
					</div>
					<div className={styles['lines-group']}>
						<div className={styles['line-vertical-left']}></div>
						<div className={styles['line-vertical-right']}></div>
						<div
							className={`${styles['line-dot']} ${styles['bottom-left']}`}
						></div>
						<div
							className={`${styles['line-dot']} ${styles['bottom-right']}`}
						></div>
					</div>
				</div>
				<div className={styles['line-horizontal']}></div>
				<div
					className={styles['w-nav-overlay']}
					id="w-nav-overlay-0"
				></div>
			</div>

			<div className={styles['container-lines-regular']}>
				<div className={styles['lines-group']}>
					<div className={styles['line-vertical-left']}></div>
					<div className={styles['line-vertical-right']}></div>
					<div
						className={`${styles['line-dot']} ${styles['bottom-left']}`}
					></div>
					<div
						className={`${styles['line-dot']} ${styles['bottom-right']}`}
					></div>
				</div>
				<div className={styles['container-regular']}>
					<div className={styles['hero-content']}>
						<div
							className={`${styles['wrap-v-small']} ${styles['align-v-l']}`}
						>
							<div className={styles['hero-badge']}>
								<div
									className={`${styles['icon-x-small']} ${styles['w-embed']}`}
								></div>
								\i/<div>140+ commits</div>
							</div>
							<h1>
								<span className={styles['gradient-span']}>
									Zen is wealth. <br />
									The ultimate space.{' '}
								</span>
							</h1>
							<div className={styles['headline-regular']}>
								A central hub for digital life.
							</div>
						</div>
						<div className={styles['max-width-x-small']}>
							<p className={styles['paragraph-regular']}>
								Built by a developer, for myself.Without the
								well- known annoyance of having to wait for
								Cloudflare security checks, ads or reCAPTCHAs.
							</p>
						</div>
					</div>
				</div>
			</div>
			<HorizontalLine />
		</div>
	)
}
