---
title: "Kyberbezpečnost"
tags:
  - "Kyberbezpečnost"
params:
  author: "Cymry"
---

# !! Probíhá práce na stránce

> **Upozornění:** Při vytváření článku byla použita umělá inteligence (AI).

**Kyberbezpečnost** je obor informatiky, který se zaměřuje na ochranu informací, systémů a sítí před neautorizovaným přístupem, poškozením a zneužitím. Zahrnuje ochranu důvěrnosti, integrity a dostupnosti (CIA triáda) dat i služeb, a to v celém jejich životním cyklu – od návrhu, přes provoz, až po vyřazení.

## Praktická využití

Naše **rostoucí závislost na počítačích, cloudu a chytrých telefonech** dělá z kyberbezpečnosti každodenní nutnost. S rozvojem AI navíc vidíme nový typ hrozeb – deep‑fake hovory, klonované e‑maily nebo podvodné investiční reklamy generované umělou inteligencí. Útoky se tedy netýkají jen velkých korporací; cílem se dnes může stát i jednotlivec, živnostník či malá firma.

**Každodenní využití v praxi:**

- **Silná a unikátní hesla** → ideálně správce hesel (KeePass, Bitwarden).
    
- **Vícefaktorová autentizace (MFA)** → minimalizuje riziko po kompromitaci hesla.
    
- **Pravidelné aktualizace** → záplaty OS, prohlížeče i routeru.
    
- **Zálohování 3‑2‑1** → tři kopie na dvou médiích, jedna offline/cloud.
    
- **VPN & Firewall** → chrání při práci na cestách a omezuje post‑exploitační pohyb útočníka.
    
- **Phishing awareness** → ověřovat odkazy, nedůvěřovat nevyžádaným přílohám.
    
- **Kontrola oprávnění** → princip nejmenších práv (least privilege) pro účty i aplikace.

## Mýty v Kyberbezpečnosti

**Jsme malí, nikoho nezajímáme.** <br />
Automatizované skenery nehledí na velikost a velká část útoků se zaměřuje na firmy menší velikosti a jednotlivce, kteří často nemají tak silnou ochranu, jelikož do ní neinvestují tolik, jako velké firmy a korporace.

**Antivirus stačí.** <br />
Bohužel to už dnes není tolik pravda. Současné hrozby vyžadují vícevrstvou obranu a hlavně člověka s dostatečným porozumněním, aby se dokázal vyhnout phishingu, sociálnímu inženýrství nebo jiným formám útoku.
## Historie Kyberbezpečnosti

- **1971 – Creeper virus:** první zaznamenaný počítačový červ; ukázal možnost sebemnožícího kódu.
    
- **1988 – Morris Worm:** celosíťová infekce raného Internetu; vedla k vzniku CERT/CC a konceptu koordinovaného řešení incidentů.
    
- **1993 – Firewall Toolkit:** start éry komerčních firewallů (Checkpoint, Cisco PIX) a posun od čisté konektivity k perimetrální ochraně.
    
- **2000 – ILOVEYOU worm:** masivní sociálně‑inženýrská kampaň přes e‑mail; škody přes 10 mld USD a důraz na anti‑malware a záplaty.
    
- **2010 – Stuxnet:** první veřejně odhalený státem podporovaný APT cílící na ICS/SCADA; odstartoval éru kyber‑zbraní.
    
- **2017 – WannaCry / NotPetya:** ransomware a wiper využívající EternalBlue; globální výpadky nemocnic a továren, důraz na patch management.
    
- **2020+ – Zero Trust & AI:** odklon od perimetru k identitě, nárůst využití AI/ML v SOC a automatizaci odpovědí na incidenty.
## OWASP Top 10

**OWASP** (Open Worldwide Application Security Project) je nezisková open‑source komunita, která od roku 2001 vytváří zdarma dostupné metodiky, nástroje a výzkum zaměřené na bezpečnost softwaru. Její projekty jsou peer‑reviewované odborníky z celého světa a citují je průmyslové standardy (ISO 27034, PCI‑DSS) i zadávací dokumentace státní správy, což z OWASP dělá de‑facto autoritu v aplikační bezpečnosti.

Nejznámějším výstupem je **OWASP Top 10 Web Application Security Risks** – každé 3–4 roky aktualizovaný seznam deseti nejkritičtějších a nejčastějších zranitelností webových aplikací. Slouží jako minimální kontrolní seznam pro vývojáře, testery, audity i školení.

| **A01** | **Broken Access Control**                    | Nedostatečné nebo chybně implementované řízení přístupu umožňuje útočníkům obejít autorizaci a získat, změnit či smazat cizí data nebo funkce. |
| ------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **A02** | **Cryptographic Failures**                   | Slabé klíče, nesprávná konfigurace TLS či absence šifrování vedou k úniku hesel, osobních a finančních údajů.                                  |
| **A03** | **Injection**                                | Neošetřené vstupy (SQL, NoSQL, OS, LDAP …) dovolí útočníkovi spouštět příkazy nebo měnit dotazy a manipulovat s databází či systémem.          |
| **A04** | **Insecure Design**                          | Chyby už v návrhu aplikace – chybí modelování hrozeb, rate‑limit, validace vstupů, separace rolí – které nelze později snadno „zapatchovat“.   |
| **A05** | **Security Misconfiguration**                | Default hesla, otevřené porty, vypnuté bezpečné hlavičky, chybné CORS – prosté konfigurační přešlapy vedoucí k přístupu útočníka.              |
| **A06** | **Vulnerable & Outdated Components**         | Knihovny, frameworky či runtime s veřejně známými CVE, které nejsou patchované; dovolují remote‑code‑execution či data leak.                   |
| **A07** | **Identification & Authentication Failures** | Slabá hesla, chybějící MFA, nezajištěné session ID anebo vystavené reset tokeny vedou k převzetí účtů.                                         |
| **A08** | **Software & Data Integrity Failures**       | Neověřené updaty, nedůvěryhodné závislosti či kompromitované CI/CD pipeline → supply‑chain útoky.                                              |
| **A09** | **Security Logging & Monitoring Failures**   | Nedostatečné logování a dohled znamená, že incidenty nejsou včas detekovány ani vyšetřeny.                                                     |
| **A10** | **Server‑Side Request Forgery (SSRF)**       | Útočník zneužije server, aby volal interní nebo externí zdroje, což obchází firewally a exfiltruje data.                                       |

## Klíčové domény

1. **Network Security** – segmentace, firewally, VPN, IDS/IPS
    
2. **Endpoint Security** – EDR/XDR, hardening OS, patch management
    
3. **Application Security** – secure SDLC, OWASP Top 10, DevSecOps
    
4. **Cloud & Container Security** – CSPM, IaC scanning, runtime ochrana
    
5. **Identity & Access Management** – MFA, SSO, least‑privilege
    
6. **Governance, Risk & Compliance (GRC)** – politiky, audity, ISO 27001, NIS2
    
7. **OT/ICS Security** – segmentace průmyslových sítí, monitoring protokolů (Modbus, OPC)

## Základní dovednosti a nástroje

- **Síťové základy:** TCP/IP, OSI model, VLAN, Wireshark
    
- **Operační systémy:** Linux (bash, iptables), Windows (PowerShell, AD)
    
- **Bezpečnostní nástroje:** Nmap, Burp Suite, Metasploit, OpenVAS/Greenbone
    
- **Skriptování & automatizace:** Python, PowerShell, Bash
    
- **Cloud platformy:** Azure, AWS, GCP – IAM, CSPM basics
    
- **Log management:** Syslog, ELK stack, Graylog

## Kariérní cesty v kyberbezpečnosti

- **SOC analytik (Tier 1 → Tier 3)**  
    _Co dělá:_ Sleduje bezpečnostní alerty, třídí falešná pozitiva, analyzuje incidenty a v případě nutnosti eskaluje.  
    _Předpoklady:_ pevný základ v síťových protokolech, administrace Linux/Windows, certifikace CompTIA Security+
    _Kam dál:_ Threat Hunter ▶ Senior/Tier 3 ▶ SOC Team Lead ▶ CSIRT/CERT Manager.
    
- **Pentester / red‑teamer**  
    _Co dělá:_ Eticky „hackuje“ aplikace, sítě či cloud klienta, hledá zranitelnosti a reportuje s důrazem na obchodní dopad.  
    _Předpoklady:_ certifikace eJPT či OSCP, znalost OWASP Top 10, práce s nástroji Burp Suite a Metasploit.  
    _Kam dál:_ Lead pentester ▶ Red‑team Lead ▶ Purple‑team architekt ▶ Security R&D / vlastní consult firma.
    
- **Cloud security engineer**  
    _Co dělá:_ Zabezpečuje konfiguraci a architekturu Azure/AWS/GCP, nasazuje IaC kontroly a CSPM, řeší IAM a supply‑chain rizika.  
    _Předpoklady:_ platformová certifikace (AZ‑500, AWS SCS), základy IaC (Terraform) a povědomí o CI/CD.  
    _Kam dál:_ SecDevOps Lead ▶ Cloud security architekt ▶ CISO advisor pro cloud.
    
- **GRC / compliance konzultant**  
    _Co dělá:_ Překládá technickou bezpečnost do politik, hodnotí rizika, připravuje audity ISO 27001, NIS2 a GDPR dokumentaci.  
    _Předpoklady:_ certifikace ISO 27001 Lead Implementer/Auditor, znalost ITIL a právní orientace.  
    _Kam dál:_ GRC manager ▶ Risk director ▶ Chief Risk Officer (CRO).
    
- **OT/ICS blue‑team specialista**  
    _Co dělá:_ Chrání průmyslové sítě, odděluje SCADA, monitoruje Modbus/DNP3, školí provozní techniky.  
    _Předpoklady:_ znalost síťových protokolů a průmyslových standardů, certifikace GICSP.  
    _Kam dál:_ OT security lead ▶ ICS architekt ▶ CISO kritické infrastruktury.
    
- **Bug‑bounty researcher (freelance)**  
    _Co dělá:_ Hledá zranitelnosti v bounty programech (HackerOne, YesWeHack), odměnu bere za validní report.  
    _Předpoklady:_ zkušenosti s web‑application hackingem, znalost Burp Suite a dobrá angličtina pro psaní reportů.  
    _Kam dál:_ Placený externí pentester ▶ Security researcher ve fintech / big‑tech ▶ vlastní start‑up.
    

**Platové mediány (Praha/Brno, 2025):**  
• Tier 1 SOC ≈ 45 000 Kč  
• Junior Pentester 55–65 000 Kč  
• Cloud Security Engineer 80 000 Kč+  
• Senior GRC 90 000 Kč+

## Doporučené materiály

### Online kurzy a laby

- TryHackMe – interaktivní laby a Red/Blue team roadmap s virtuálními stroji.
    
- Google Cybersecurity Professional Certificate - Coursera
	
- Hack The Box Academy – uznávané cvičné prostředí s labem pro základy etického hackingu.
### Knihy (CZ / EN)

- Hacking: The Art of Exploitation, 2nd Edition
	
- Blue Team Field Manual (BTFM)
	
- RTFM: Red Team Field Manual v2

### České zdroje

- **CZ.NIC Academy** – bezplatné kurzy (DNSSEC, Linux, bezpečnost).
    
- **NÚKIB** – oficiální bezpečnostní doporučení a vyhlášky.

- **CSIRT.CZ** – národní CSIRT: databáze incidentů, varování před zranitelnostmi, pravidelný newsletter
