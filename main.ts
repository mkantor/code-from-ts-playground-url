import { decompressFromBase64 } from "lz-string"

// Expected invocation is `node path/to/index.js $url`.
if (process.argv.length !== 3) {
  throw new Error(
    "This script expects a single command-line argument (the TypeScript Playground URL to decode).",
  )
}

const url = process.argv[2]
const code = decompressFromBase64(new URL(url).hash.replace(/^#code\//, ""))

if (typeof code !== "string") {
  throw new Error(
    `Failed to decode URL. Is "${url}" a valid TypeScript Playground URL?`,
  )
}

console.log(code)
