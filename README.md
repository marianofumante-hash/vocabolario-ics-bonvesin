# Vocabolario Online

Questo progetto serve a costruire un vocabolario online della lingua italiana in modo legale, chiaro e progressivo.

## Obiettivo

Creare un sito dove una persona possa:

- cercare una parola
- leggere una definizione
- vedere categoria grammaticale, esempi e locuzioni
- consultare la fonte del contenuto

## Punto fondamentale

Non useremo contenuti copiati da vocabolari protetti come Treccani.

La base iniziale consigliata e' questa:

- `Morph-it!` per l'elenco dei lemmi e delle forme
- `Wikizionario` per definizioni e contenuti riusabili

## File principali

- `GUIDA-PASSO-PASSO.md`: spiegazione semplice del progetto
- `FONTI-DATI.md`: da dove recuperare i dati e cosa si puo' usare
- `SCHEMA-LESSICALE.md`: struttura del database del vocabolario
- `DATABASE-LOCALE.md`: come sono separati sito, dati e database
- `data/entries.js`: piccolo archivio dati iniziale
- `database/schema.sql`: schema del database reale
- `HANDOFF.md`: riepilogo operativo per ripartire in una nuova chat

## Percorso consigliato

1. Capire bene quali dati ci servono
2. Preparare il database
3. Importare un primo gruppo di vocaboli
4. Creare una pagina web con ricerca
5. Aggiungere definizioni, fonti e miglioramenti

## Primo traguardo realistico

Un piccolo vocabolario online funzionante con:

- ricerca per parola
- pagina della voce
- fonte indicata chiaramente
- dati caricati da fonti riusabili
- cache locale nel browser per le ricerche e le voci gia' aperte
