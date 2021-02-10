import { Readable } from "stream"
import * as readline from "readline"
import { decompressFromEncodedURIComponent } from "lz-string"

function codeFromUrl(url: URL): string | null {
  return decompressFromEncodedURIComponent(url.hash.replace(/^#code\//, ""))
}

async function main(): Promise<void> {
  // Expected invocation is `node path/to/index.js $url`. If $url is "-" or
  // there are no arguments, read from STDIN.
  let lines
  if (
    process.argv.length < 3 ||
    (process.argv.length === 3 && process.argv[2] === "-")
  ) {
    process.stdin.setEncoding("utf8")
    lines = readline.createInterface({ input: process.stdin })
  } else {
    lines = Readable.from(process.argv.slice(2))
  }

  for await (const line of lines) {
    const trimmedLine = line.trim()
    if (trimmedLine.length === 0) {
      throw new Error("No URL was provided.")
    }

    const code = codeFromUrl(new URL(trimmedLine))
    if (typeof code !== "string" || code.length === 0) {
      throw new Error(
        `Failed to decode URL. Is "${trimmedLine}" a valid TypeScript Playground URL?`,
      )
    }

    console.log(code)
  }
}

main().catch((error: unknown) => {
  console.error(error)
  process.exitCode = 1
})
