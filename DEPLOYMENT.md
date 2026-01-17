# Deployment auf Hetzner VPS (CX22 Falkenstein)

## 1. Server vorbereiten

### 1.1 SSH-Verbindung
```bash
ssh root@DEINE_SERVER_IP
```

### 1.2 System updaten & Docker installieren
```bash
apt update && apt upgrade -y

# Docker installieren
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Docker Compose installieren
apt install docker-compose-plugin -y

# Docker ohne sudo
usermod -aG docker $USER
```

### 1.3 Firewall einrichten
```bash
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
```

---

## 2. Projekt auf Server laden

### Option A: Git Clone (Empfohlen)
```bash
cd /opt
git clone https://github.com/DEIN_REPO/carpantier-consulting.git
cd carpantier-consulting
```

### Option B: SCP Upload
```bash
# Lokal ausführen:
scp -r . root@DEINE_SERVER_IP:/opt/carpantier-consulting
```

---

## 3. SSL-Zertifikat einrichten

### 3.1 Verzeichnisse erstellen
```bash
mkdir -p certbot/conf certbot/www nginx/ssl
```

### 3.2 Temporäre Nginx-Config für Zertifikat
Erstelle zunächst eine einfache Nginx-Config ohne SSL:

```bash
cat > nginx/nginx-init.conf << 'EOF'
events {
    worker_connections 1024;
}

http {
    server {
        listen 80;
        server_name carpantier-consulting.de www.carpantier-consulting.de;

        location /.well-known/acme-challenge/ {
            root /var/www/certbot;
        }

        location / {
            return 200 'OK';
            add_header Content-Type text/plain;
        }
    }
}
EOF
```

### 3.3 Zertifikat anfordern
```bash
# Temporären Nginx starten
docker run -d --name nginx-init \
  -p 80:80 \
  -v $(pwd)/nginx/nginx-init.conf:/etc/nginx/nginx.conf:ro \
  -v $(pwd)/certbot/www:/var/www/certbot:ro \
  nginx:alpine

# Zertifikat anfordern
docker run --rm \
  -v $(pwd)/certbot/conf:/etc/letsencrypt \
  -v $(pwd)/certbot/www:/var/www/certbot \
  certbot/certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email deine@email.de \
  --agree-tos \
  --no-eff-email \
  -d carpantier-consulting.de \
  -d www.carpantier-consulting.de

# Temporären Nginx stoppen
docker stop nginx-init && docker rm nginx-init
```

---

## 4. Anwendung starten

### 4.1 Build & Start
```bash
docker compose up -d --build
```

### 4.2 Status prüfen
```bash
docker compose ps
docker compose logs -f
```

---

## 5. DNS-Einstellungen

Bei deinem Domain-Registrar:

| Typ | Name | Wert | TTL |
|-----|------|------|-----|
| A | @ | DEINE_SERVER_IP | 300 |
| A | www | DEINE_SERVER_IP | 300 |

---

## 6. Wartung

### Logs anzeigen
```bash
docker compose logs -f web
docker compose logs -f nginx
```

### Neustart
```bash
docker compose restart
```

### Update deployen
```bash
git pull
docker compose up -d --build
```

### SSL erneuern (automatisch, aber manuell möglich)
```bash
docker compose run --rm certbot renew
docker compose restart nginx
```

---

## 7. Monitoring (Optional)

### Einfaches Health-Check Script
```bash
cat > /opt/healthcheck.sh << 'EOF'
#!/bin/bash
if ! curl -sf https://carpantier-consulting.de > /dev/null; then
    docker compose -f /opt/carpantier-consulting/docker-compose.yml restart
fi
EOF

chmod +x /opt/healthcheck.sh

# Cronjob alle 5 Minuten
(crontab -l 2>/dev/null; echo "*/5 * * * * /opt/healthcheck.sh") | crontab -
```

---

## Troubleshooting

### Container startet nicht
```bash
docker compose logs web
```

### Port bereits belegt
```bash
lsof -i :80
lsof -i :443
```

### Nginx-Config testen
```bash
docker compose exec nginx nginx -t
```

---

## Ressourcen

- Hetzner Cloud Console: https://console.hetzner.cloud
- Docker Docs: https://docs.docker.com
- Let's Encrypt: https://letsencrypt.org
