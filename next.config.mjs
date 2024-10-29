/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		reactCompiler: true
	},
	images: {
		domains: ['cdn.prod.website-files.com']
	},
	webpack: config => {
		config.externals.push('@node-rs/argon2', '@node-rs/bcrypt')
		return config
	},
	eslint: {
		ignoreDuringBuilds: true
	},
	typescript: {
		ignoreBuildErrors: true
	}
}

export default nextConfig
