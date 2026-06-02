#!/usr/bin/env bash
set -euo pipefail

# Build and deploy the admin backend dashboard stack.
# Ensure Docker and Docker Compose are installed on the target host.

docker compose build --no-cache admin-backend

# If --traefik flag is provided, start the Traefik-enabled compose overlay
if [[ "${1-}" == "--traefik" ]]; then
	echo "Starting stack with Traefik (automatic HTTPS)"
	# Use production ACME resolver if --prod-acme flag is present
	if [[ "${@}" == *"--prod-acme"* ]]; then
		echo "Using production Let's Encrypt ACME resolver (ensure DNS points to this host)"
		docker compose -f docker-compose.yml -f docker-compose.traefik.prod.yml up -d --remove-orphans admin-backend traefik
	else
		echo "Using staging ACME resolver (safe testing)"
		docker compose -f docker-compose.yml -f docker-compose.traefik.yml up -d --remove-orphans admin-backend traefik
	fi
else
	docker compose up -d --remove-orphans admin-backend reverse-proxy
fi

docker compose ps
