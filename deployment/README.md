# Admin Backend Dashboard Deployment

This deployment scaffold targets the original admin backend dashboard at `ohchainn.com/admin`.

## What it includes
- `Dockerfile` for the admin backend container.
- `docker-compose.yml` for backend and Nginx reverse proxy.
- `nginx/nginx.conf` to route `/admin/` to the admin backend.
- `deploy.sh` for local or remote deployment steps.

## Deployment behavior
- The public frontend remains at `ohchainn.com`.
- The admin backend is exposed through `ohchainn.com/admin`.
- Nginx proxies requests from `/admin/` to the backend service on port `4000`.

## Usage
1. Ensure DNS for `ohchainn.com` points to the deployment host.
2. Place SSL certificates under `nginx/certs` or update Nginx to use your certificate provider.
3. Run:

```bash
chmod +x deploy.sh
./deploy.sh
```

## Customize for your backend
- Update `Dockerfile` to match your actual backend stack and build commands.
- Change `CMD` to start your backend server.
- If you use a different HTTP port, update both `docker-compose.yml` and `nginx/nginx.conf`.

## Notes
- This setup is a deployment scaffold, not a complete production system.
- Add monitoring, backups, and a secure secrets solution before using it in production.
- HTTPS support is optional but recommended for `ohchainn.com/admin`.

## Optional HTTPS setup

1. Copy `nginx/conf.d/admin-ssl.conf.sample` to `nginx/conf.d/admin-ssl.conf`.
2. Place TLS certificates in `nginx/certs/fullchain.pem` and `nginx/certs/privkey.pem`.
3. Start the stack with `./deploy.sh`.

If you need automatic Let's Encrypt certificate issuance, integrate a certificate manager or use a dedicated TLS proxy in front of this stack.
