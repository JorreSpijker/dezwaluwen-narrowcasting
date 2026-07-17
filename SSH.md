# SSH naar de Raspberry Pi

## 1. SSH inschakelen op de Pi (eenmalig)

Via `raspi-config`:

```bash
sudo raspi-config
```

Kies: `3 Interface Options` → `I2 SSH` → `Yes`.

Of headless (zonder scherm), vóór eerste boot: zet een leeg bestand genaamd `ssh` in de boot-partitie van de SD-kaart.

## 2. IP-adres van de Pi opzoeken

Op de Pi zelf:

```bash
hostname -I
```

Of vanaf een ander apparaat in hetzelfde netwerk:

```bash
ping raspberrypi.local
```

## 3. Verbinden

```bash
ssh pi@<ip-adres>
```

Bijvoorbeeld:

```bash
ssh pi@192.168.1.50
```

Of via hostname (mDNS, werkt meestal op hetzelfde netwerk):

```bash
ssh pi@raspberrypi.local
```

Standaardwachtwoord is wat je bij `raspi-config` hebt ingesteld (niet het Raspbian-default `raspberry`, tenzij je dat nooit hebt aangepast).

## 4. (Optioneel) SSH-key gebruiken i.p.v. wachtwoord

Op je eigen machine (indien nog geen key):

```bash
ssh-keygen -t ed25519
```

Key naar de Pi kopiëren:

```bash
ssh-copy-id pi@<ip-adres>
```

Daarna inloggen zonder wachtwoord:

```bash
ssh pi@<ip-adres>
```
