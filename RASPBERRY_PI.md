# Narrowcasting op Raspberry Pi

Handleiding om deze Next.js app lokaal te draaien op een Raspberry Pi, en automatisch fullscreen (kiosk mode) te tonen na opstarten.

## Vereisten

- Raspberry Pi 3B+ of nieuwer (Pi 4 aanbevolen voor Next.js build)
- Raspberry Pi OS **met desktop** (Bookworm), 64-bit aanbevolen
- Netwerkverbinding (voor build)

## 1. Node.js installeren

Raspberry Pi OS heeft standaard een verouderde Node-versie. Installeer Node 20 via NodeSource:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs git
node -v   # check: v20.x
```

## 2. Project ophalen

```bash
cd ~
git clone <repo-url> narrowcasting
cd narrowcasting
```

## 3. Dependencies installeren en builden

```bash
npm install
npm run build
```

Build kan op een Pi 3 enkele minuten duren.

## 4. App als service draaien (survives reboot)

Maak een systemd service zodat de app automatisch start en herstart bij crash:

```bash
sudo nano /etc/systemd/system/narrowcasting.service
```

Inhoud:

```ini
[Unit]
Description=Narrowcasting Next.js app
After=network.target

[Service]
Type=simple
User=pi
WorkingDirectory=/home/pi/narrowcasting
ExecStartPre=/usr/bin/git pull
ExecStartPre=/usr/bin/npm install
ExecStartPre=/usr/bin/npm run build
ExecStart=/usr/bin/npm run start
Restart=always
Environment=PORT=1956

[Install]
WantedBy=multi-user.target
```

`ExecStartPre` regels draaien bij elke start van de service (dus ook bij boot/reboot): pull, install, build, dan pas start. Build kost tijd (minuten op Pi 3) — kiosk-script wacht sowieso tot server bereikbaar is.

Activeren:

```bash
sudo systemctl daemon-reload
sudo systemctl enable narrowcasting.service
sudo systemctl start narrowcasting.service
```

Check:

```bash
sudo systemctl status narrowcasting.service
```

App draait nu op `http://localhost:1956`.

## 5. Auto-login naar desktop

Kiosk mode vereist dat de Pi automatisch inlogt op het bureaublad (niet op login-scherm blijft staan):

```bash
sudo raspi-config
```

Kies: `1 System Options` → `S5 Boot / Auto Login` → `B4 Desktop Autologin`.

## 6. Chromium fullscreen bij boot (kiosk mode)

Maak een autostart-bestand aan:

```bash
mkdir -p ~/.config/autostart
nano ~/.config/autostart/kiosk.desktop
```

Inhoud:

```ini
[Desktop Entry]
Type=Application
Name=Kiosk
Exec=/home/pi/kiosk.sh
X-GNOME-Autostart-enabled=true
```

Maak het script:

```bash
nano ~/kiosk.sh
```

Inhoud:

```bash
#!/bin/bash
xset s off
xset -dpms
xset s noblank

# wacht tot de Next.js server bereikbaar is
until curl -s http://localhost:1956 > /dev/null; do
  sleep 1
done

chromium-browser --noerrdialogs --disable-infobars --kiosk --incognito \
  --disable-session-crashed-bubble --disable-translate \
  http://localhost:1956
```

Uitvoerbaar maken:

```bash
chmod +x ~/kiosk.sh
```

`xset` regels zetten schermbeveiliging/standby uit. `--kiosk` geeft fullscreen zonder browser-UI. `--incognito` voorkomt "herstel vorige sessie"-meldingen.

## 7. (Optioneel) Muiscursor verbergen

```bash
sudo apt install -y unclutter
```

Voeg toe aan `~/.config/autostart/` een tweede `.desktop` entry, of zet `unclutter -idle 0.1 &` bovenaan in `kiosk.sh`.

## 8. Testen

```bash
sudo reboot
```

Pi moet automatisch inloggen, de service starten, en Chromium fullscreen tonen met de narrowcasting-app.

## Updaten van de app

```bash
cd ~/narrowcasting
git pull
npm install
npm run build
sudo systemctl restart narrowcasting.service
```
