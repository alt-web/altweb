/** @type {import('next').NextConfig} */

const isGithubActions = process.env.GITHUB_ACTIONS || false

let assetPrefix = ""
let basePath = ""

if (isGithubActions) {
    // trim off `<owner>/`
    const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, "")

    assetPrefix = `/${repo}/`
    basePath = `/${repo}`
}

module.exports = {
    // Tell Next.js where the `public` folder is
    assetPrefix: assetPrefix,
    basePath: basePath,
    reactStrictMode: true,
    swcMinify: true,
    images: {
        unoptimized: true,
    },
}
