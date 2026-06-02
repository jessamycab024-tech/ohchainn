Traefik HTTPS scaffold

This setup uses the same app host `ohchainn.com` and routes admin backend requests under `/admin`.

To enable automatic TLS with Let's Encrypt (staging by default):

1. Ensure `docker-compose.traefik.yml` or `docker-compose.traefik.prod.yml` is present.
2. Provide a reachable public domain `ohchainn.com` and point DNS to the host running Docker.
3. Set proper permissions on `traefik/letsencrypt/acme.json`:

```bash
chmod 600 traefik/letsencrypt/acme.json
```

4. Start the stack with Traefik enabled (staging):

```bash
# staging (safe, avoids rate limits)
docker compose -f docker-compose.yml -f docker-compose.traefik.yml up -d
```

5. To enable production ACME (real certificates):

```bash
# ensure DNS for ohchainn.com points to this host and ports 80/443 are open
# then run (careful: will request real certs)
./deploy.sh --traefik --prod-acme
```

Notes:
- Staging is used by default to avoid Let's Encrypt rate limits during setup and testing.
- If you hit rate limits, wait for the retry window or use the staging CA for verification.
- You can also provision certificates via another mechanism and place `fullchain.pem` and `privkey.pem` into `nginx/certs/` for the nginx-based proxy.
