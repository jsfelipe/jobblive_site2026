#!/bin/sh
set -e

if [ ! -d node_modules/next ]; then
  echo "Instalando dependências (primeira execução)..."
  npm ci
fi

exec "$@"
