import styles from './navigation.module.scss'

export default function Navigation() {
	return (
		<>
			<div className={`${styles.navbar} ${styles['w-nav']}`}>
				<div className={styles['nav-container-lines']}>
					<div className={styles['nav-container']}>
						<a
							href="/"
							className={`${styles['nav-logo']} ${styles['w-nav-brand']} ${styles['w--current']}`}
						>
							<h2
								className={`${styles['text-white']} ${styles['top-title']}`}
							>
								remco.
							</h2>
							<div className={styles['navigation-line']}></div>
						</a>
						<nav
							role="navigation"
							className={`${styles['nav-menu']} ${styles['w-nav-menu']}`}
						>
							<a
								href="/"
								className={`${styles['navigation-link']} ${styles['w-nav-link']} ${styles['w--current']}`}
							>
								Home
							</a>
							<a
								href="/pricing"
								className={`${styles['navigation-link']} ${styles['w-nav-link']}`}
							>
								Pricing
							</a>
							<a
								href="/contact"
								className={`${styles['navigation-link']} ${styles['w-nav-link']}`}
							>
								Contact
							</a>
						</nav>
						<div className={styles['nav-button-group']}>
							<a
								href="https://webflow.partnerlinks.io/flowbase-luna-template"
								target="_blank"
								className={`${styles['button-secondary']} ${styles['w-inline-block']}`}
							>
								<div className={styles.button}>
									<div>Go to dashboard</div>
								</div>
								<div className={styles['button-background']}>
									<div
										className={`${styles['button-bg']} ${styles['w-embed']}`}
									></div>
								</div>
							</a>
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

			<section className={styles.section}>
				<div className={styles['container-lines-regular']}>
					<div className={styles['container-regular']}>
						<div className={styles['logo-wrapper']}>
							<div
								className={`${styles['paragraph-small']} ${styles['text-color-white']}`}
							>
								Trusted by 10+ companies worldwide
							</div>
							<div className={styles['logo-group']}>
								<img
									src="https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65b8fcb604e608e9c9bea553_Logo%2004.webp"
									alt=""
									className={styles.logo}
								/>
								<img
									src="https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65b8fcb65f79476f2d80d5b5_Logo%2007.webp"
									alt=""
									className={styles.logo}
								/>
								<img
									src="https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65b8fcb6fa0980238f56800e_Logo%2002.webp"
									alt=""
									className={styles.logo}
								/>
								<img
									src="https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65b8fcb6c2934f49cce3e541_Logo%2005.webp"
									alt=""
									className={styles.logo}
								/>
								<img
									src="https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65b8fcb7478024bd67ee81d9_Logo%2001.webp"
									alt=""
									className={styles.logo}
								/>
								<img
									src="https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65b8fcb774d33600cce11313_Logo%2006.webp"
									alt=""
									className={styles.logo}
								/>
								<img
									src="https://cdn.prod.website-files.com/65b8e9cb3c15d9b62f057c9a/65b8fcb85f1d9774b9242163_Logo%2003.webp"
									alt=""
									className={styles.logo}
								/>
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
			</section>
		</>
	)
}
