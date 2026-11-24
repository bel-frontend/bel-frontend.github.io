/** @type {import('next').NextConfig} */

const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/lessons/aws/aif-c01',
                destination: '/lessons/aws/aif-c01/index.html',
            },
        ];
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

module.exports = nextConfig;
