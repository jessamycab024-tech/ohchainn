# TLS Certificates for nginx

Place your TLS certificate files in this directory if you want HTTPS support for `ohchainn.com/admin`.

Expected files:
- `fullchain.pem`
- `privkey.pem`

This directory is ignored by Git via `.gitignore`.

For production, use a valid certificate provider such as Let's Encrypt.
