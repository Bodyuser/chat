/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    APP_URL: process.env.APP_URL,
    API_URL: process.env.API_URL,
  },
  async rewrites() {
		return [
			{
				source: '/uploads/:path*',
				destination: `http://localhost:3000/uploads/:path*`,
				
			},
		]
	},
}

module.exports = nextConfig
