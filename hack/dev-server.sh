#!/bin/sh
PLATFORM=$(uname -s | tr "[:upper:]" "[:lower:]")
ARCHITECTURE=""
case $(uname -m) in
  i386)   echo "32 bit architecture is not supported" exit 1 ;;
  i686)   echo "32 bit architecture is not supported" exit 1 ;;
  x86_64) ARCHITECTURE="amd64" ;;
  arm)    ARCHITECTURE="arm64" ;;
esac

_out/theila-${PLATFORM}-${ARCHITECTURE} --port 8090 >_out/backend.log 2>&1 &
cd frontend && npm install && npm run serve
