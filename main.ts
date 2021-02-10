import { Readable } from "stream"
import * as readline from "readline"
import { decompressFromEncodedURIComponent } from "lz-string"

function codeFromUrl(url: URL): string | null {
  return decompressFromEncodedURIComponent(url.hash.replace(/^#code\//, ""))
}

async function main(): Promise<void> {
  // Expected invocation is `node path/to/index.js $url`. If $url is "-" or
  // there are no arguments, read from STDIN.
  let inputs
  if (
    process.argv.length < 3 ||
    (process.argv.length === 3 && process.argv[2] === "-")
  ) {
    process.stdin.setEncoding("utf8")
    inputs = readline.createInterface({ input: process.stdin })
  } else {
    inputs = Readable.from(process.argv.slice(2))
  }

  for await (const input of inputs) {
    const trimmedInput = input.trim()
    if (trimmedInput.length === 0) {
      throw new Error("No URL was provided.")
    }

    const code = codeFromUrl(new URL(trimmedInput))
    if (typeof code !== "string" || code.length === 0) {
      throw new Error(
        `Failed to decode URL. Is "${trimmedInput}" a valid TypeScript Playground URL?`,
      )
    }

    console.log(code)
  }
}

main().catch((error: unknown) => {
  console.error(error)
  process.exitCode = 1
})
