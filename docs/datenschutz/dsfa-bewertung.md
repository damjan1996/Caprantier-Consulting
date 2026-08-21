# Entscheidung über die Datenschutz-Folgenabschätzung

**Stand:** _(Datum der Entscheidung eintragen)_
**Entschieden von:** Nico-Luca Carpantier
**Ergebnis:** _(nach der Prüfung eintragen: keine DSFA erforderlich / DSFA erforderlich)_

Art. 35 Abs. 1 DSGVO verlangt eine Datenschutz-Folgenabschätzung, wenn eine
Verarbeitung voraussichtlich ein hohes Risiko für die Rechte und Freiheiten
natürlicher Personen zur Folge hat. Auch wenn das Ergebnis „nicht erforderlich"
lautet, ist die Prüfung selbst zu dokumentieren — sie ist Teil der
Rechenschaftspflicht nach Art. 5 Abs. 2 DSGVO.

---

## 1. Prüfung anhand der Regelbeispiele des Art. 35 Abs. 3 DSGVO

| Regelbeispiel | Trifft zu | Begründung |
|---|---|---|
| Systematische und umfassende Bewertung persönlicher Aspekte mit automatisierter Entscheidung und rechtlicher Wirkung (lit. a) | Nein | Der Chatbot beantwortet Fragen und nimmt Kontaktwünsche auf. Es ergeht keine Entscheidung mit rechtlicher Wirkung oder ähnlich erheblicher Beeinträchtigung im Sinne des Art. 22 DSGVO |
| Umfangreiche Verarbeitung besonderer Kategorien nach Art. 9 oder von Daten nach Art. 10 (lit. b) | Nein | Solche Daten werden nicht erhoben. Besucher können sie theoretisch in eine freie Texteingabe schreiben; dafür gilt Abschnitt 3 |
| Systematische umfangreiche Überwachung öffentlich zugänglicher Bereiche (lit. c) | Nein | Es findet keine Beobachtung physischer Bereiche statt |

## 2. Prüfung anhand der Kriterienliste der Art.-29-Gruppe (WP 248)

Die Aufsichtsbehörden gehen in der Regel von einem hohen Risiko aus, wenn
mindestens zwei der folgenden Kriterien erfüllt sind.

| Kriterium | Erfüllt | Anmerkung |
|---|---|---|
| Bewertung oder Scoring | Nein | Kein Profil, keine Bewertung von Interessenten |
| Automatisierte Entscheidung mit Rechtswirkung | Nein | Siehe oben |
| Systematische Überwachung | Nein | Reichweitenmessung nur nach Einwilligung, gekürzte IP-Adresse, keine geräteübergreifende Zusammenführung |
| Besondere Datenkategorien oder höchstpersönliche Daten | Nein | Vergleiche Abschnitt 3 |
| Umfangreiche Verarbeitung | Nein | Einzelunternehmen mit einer Website; keine großen Datenbestände |
| Abgleich oder Zusammenführung von Datensätzen | Nein | Chat, Kontaktformular und Analyse werden nicht zusammengeführt |
| Daten schutzbedürftiger Personen | Nein | Angebot richtet sich ausschließlich an Unternehmerinnen und Unternehmer nach § 14 BGB |
| Innovative Nutzung neuer Technologien | **Ja** | Einsatz eines großen Sprachmodells in der Besucherkommunikation |
| Verhinderung der Ausübung von Rechten | Nein | Widerruf, Auskunft und Löschung sind über die genannten Wege möglich |

**Summe der erfüllten Kriterien:** 1

## 3. Sonderfall: freie Texteingaben im Chat

Besucher können in ein freies Textfeld schreiben, was sie möchten — theoretisch
auch Gesundheitsdaten oder andere Angaben nach Art. 9 DSGVO. Diese Möglichkeit
allein macht daraus keine „umfangreiche Verarbeitung besonderer Kategorien",
weil solche Daten weder gezielt erhoben noch ausgewertet werden.

Risikomindernde Maßnahmen:

- Der Hinweis vor der ersten Nachricht sagt ausdrücklich: „Geben Sie bitte keine
  sensiblen Daten ein." (`src/components/chat/ChatWidget.tsx`)
- Nachrichteninhalte erscheinen nicht in Logs
- Löschung nach 90 beziehungsweise 365 Tagen
- Auf Wunsch sofortige Löschung, siehe `loeschkonzept.md`

## 4. Abgleich mit der Liste der Aufsichtsbehörde

Die Datenschutzkonferenz führt eine Liste von Verarbeitungen, für die stets eine
DSFA durchzuführen ist („Muss-Liste").

- [ ] Aktuelle Muss-Liste der zuständigen Aufsichtsbehörde — für Köln die
      Landesbeauftragte für Datenschutz und Informationsfreiheit
      Nordrhein-Westfalen — abrufen und gegen die eigenen Verarbeitungen prüfen
- [ ] Datum der Prüfung und Fassung der Liste hier eintragen

## 5. Ergebnis

_(Nach Abschluss der Punkte 4 ausfüllen. Vorschlag auf Basis der Abschnitte 1
bis 3: Eine Datenschutz-Folgenabschätzung ist nicht erforderlich, weil kein
Regelbeispiel des Art. 35 Abs. 3 DSGVO erfüllt ist und nur ein Kriterium der
Kriterienliste zutrifft. Diese Einschätzung ist erneut zu prüfen, sobald der
Chatbot Antworten personalisiert, Interessenten bewertet oder Datenbestände
zusammengeführt werden.)_

**Nächste Überprüfung:** _(Datum, spätestens ein Jahr nach der Entscheidung)_
