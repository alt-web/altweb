/** @type {import('next').NextConfig} */

const isGithubActions = process.env.GITHUB_ACTIONS || false

let basePath = ""

if (isGithubActions) {
    // trim off `<owner>/`
    const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, "")

    basePath = `/${repo}`
}

module.exports = {
    // Tell Next.js where the `public` folder is
    basePath: basePath,
    reactStrictMode: true,
    swcMinify: true,
    images: {
        unoptimized: true,
    },
}
