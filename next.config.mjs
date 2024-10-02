/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: config => {
		config.externals.push('@node-rs/argon2', '@node-rs/bcrypt')
		return config
	},
	env: {
		OPENROUTE_SERVICE_API_KEY: process.env.OPENROUTE_SERVICE_API_KEY,
	},
	eslint: {
		ignoreDuringBuilds: true
	},
	typescript: {
		ignoreBuildErrors: true
	}
}

export default nextConfig
