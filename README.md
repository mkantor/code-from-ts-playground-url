# `code-from-ts-playground-url`

A simple script to decode & print the TypeScript source code from a
[playground](https://www.typescriptlang.org/play) URL.

## Usage

This isn't published to npm (mostly out of laziness). PRs/issues are welcome if
there's demand.

In the meantime, first install [node](https://nodejs.org/en/download/) and
[git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git), then:

```sh
git clone https://github.com/mkantor/code-from-ts-playground-url.git
cd code-from-ts-playground-url
npm install
npm start https://www.typescriptlang.org/play?#code/MYewdgzgLgBAHgLhtATgSzAcxgXhgIgAkBTAG1JABoYAVATwAdiBlYdBqAQnyA
```

You should see this output:
```ts
const x: string = "Hello, TypeScript!"
```
