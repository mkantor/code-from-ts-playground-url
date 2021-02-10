#!/bin/sh

dir="$(realpath "$(dirname "$0")")"
real_thing="$dir"/index.js

if ! test -x "$real_thing"; then
    printf >&2 "%s\n" "Couldn't find or run program"
    exit 1
fi

while ! "$real_thing" "$@"; do
    printf >&2 "%s\n" "Please enter arguments, or use Ctrl-c or Ctrl-d to quit"
    if read -r INPUT; then
        set -- "$INPUT"
    else
        break;
    fi
done
