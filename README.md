# ohchainn

## Deployment

This repository includes a deployment scaffold for the original admin backend dashboard, exposing it at `ohchainn.com/admin`.

- `Dockerfile`: builds the admin backend container.
- `docker-compose.yml`: runs the backend and Nginx proxy.
- `nginx/nginx.conf`: routes `/admin/` to the backend service.
- `deploy.sh`: deploy helper script.
- `.github/workflows/deploy-admin-backend.yml`: GitHub Actions workflow for remote deployment.

The public frontend remains on `ohchainn.com`; this setup is solely for the admin backend control dashboard.

## HTTPS setup

For secure admin access, add TLS certificates to `nginx/certs` and use a production-ready HTTPS config.
- Copy `nginx/conf.d/admin-ssl.conf.sample` to `nginx/conf.d/admin-ssl.conf`.
- Provide `fullchain.pem` and `privkey.pem` under `nginx/certs`.
- Run `./deploy.sh` to start the stack with HTTPS support enabled.

## HTTPS and certificates

This scaffold uses Nginx to proxy `ohchainn.com/admin` to the admin backend.

- Place TLS certificates in `nginx/certs` and mount them into the proxy container.
- Update `./nginx/conf.d/admin.conf` to enable `listen 443 ssl` and point to your certificate files.
- For production, use a certificate manager such as Let's Encrypt or your cloud provider's managed TLS service.

## Notes

- The Nginx proxy currently returns `404` for non-`/admin/` paths, so it does not serve the public frontend.
- Integrate the frontend hosting separately if you need `ohchainn.com` to serve both frontend and admin routes from the same host.
