/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    APP_URL: "https://effulgent-pasca-b08f2e.netlify.app",
    API_URL: "https://chat-api-3.onrender.com",
  },
  async rewrites() {
		return [
			{
				source: '/uploads/:path*',
				destination: `https://chat-api2-epmf.onrender.com/uploads/:path*`,
				
			},
		]
	},
}

module.exports = nextConfig
