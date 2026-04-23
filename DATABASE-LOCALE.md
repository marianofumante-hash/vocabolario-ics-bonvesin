# Database Locale

Ora il progetto ha due livelli distinti.

## 1. Il sito

Il sito mostra i dati all'utente.

File principali:

- `index.html`
- `styles.css`
- `app.js`

## 2. I dati

I vocaboli sono stati spostati in un file separato:

- `data/entries.js`

Questo e' utile perche':

- puoi cambiare i dati senza toccare la grafica
- in futuro potremo sostituire questo file con un vero database
- il sito diventa piu' ordinato

## 3. Il database vero e proprio

Ho preparato anche lo schema SQL:

- `database/schema.sql`

Questo file descrive come sara' organizzato un database reale.

In parole semplici:

- `entries` contiene la parola principale
- `senses` contiene le definizioni
- `examples` contiene gli esempi
- `expressions` contiene le locuzioni
- `inflections` contiene le forme flesse

## 4. Esempio di dati da caricare

Ho aggiunto anche:

- `database/sample-seed.sql`

Serve a mostrare come si caricherebbero alcune voci dentro il database.

## 5. Cosa significa per te

Adesso non hai piu' solo una pagina web dimostrativa.

Hai gia':

- un'interfaccia web
- un archivio dati separato
- il progetto del database vero

## 6. Prossimo passo naturale

Il passo successivo migliore e' questo:

- creare un piccolo importatore
- prendere un file con vocaboli reali
- trasformarlo nel formato del progetto

In pratica: iniziare a riempire il vocabolario in modo semi-automatico.
