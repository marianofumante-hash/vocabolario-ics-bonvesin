# Guida Passo Passo

Questa guida spiega il progetto senza dare per scontato che tu sappia programmare.

## 1. Che cosa stiamo costruendo

Stiamo costruendo un sito web che funziona come un vocabolario online.

Quando un utente scrive una parola, per esempio `casa`, il sito deve:

- cercare la parola nel database
- mostrare la definizione
- mostrare informazioni aggiuntive come categoria grammaticale, esempi, locuzioni e fonte

## 2. Di che cosa abbiamo bisogno

Per fare un vocabolario online servono 4 pezzi.

### A. I vocaboli

Sono le parole del dizionario: `casa`, `libro`, `correre`, `felice`.

### B. Le informazioni su ogni vocabolo

Per ogni parola ci servono almeno:

- il lemma, cioe' la forma base della parola
- la categoria grammaticale, per esempio nome, verbo, aggettivo
- una o piu' definizioni
- eventuali esempi
- eventuali locuzioni
- la fonte del contenuto

### C. Un database

Il database e' il luogo dove conserviamo tutte queste informazioni in modo ordinato.

### D. Un sito web

Il sito e' la parte che l'utente vede: barra di ricerca, risultati, pagina della parola.

## 3. Da dove prendiamo i vocaboli

Qui c'e' il punto piu' importante del progetto.

Non possiamo prendere liberamente contenuti da Treccani o da altri dizionari commerciali e copiarli nel nostro sito.

Per partire in modo corretto, la strategia migliore e' questa:

- usare `Morph-it!` per avere una grande lista di parole italiane
- usare `Wikizionario` per le definizioni riusabili con licenza aperta

## 4. Perche' usiamo due fonti

Perche' fanno due lavori diversi.

### Morph-it!

Serve soprattutto per avere:

- tanti lemmi
- tante forme flesse
- dati morfologici

Esempio:

- `andare`
- `vado`
- `andiamo`
- `andato`

Morph-it! e' ottimo per costruire l'ossatura del vocabolario, ma non nasce come dizionario di definizioni.

### Wikizionario

Serve soprattutto per avere:

- definizioni
- esempi
- a volte etimologie e locuzioni

Non e' perfetto come un vocabolario editoriale, ma e' molto utile per partire legalmente.

## 5. Come si costruisce davvero il progetto

Lavoreremo in questo ordine:

1. Prepariamo la struttura del database
2. Carichiamo un primo gruppo di vocaboli
3. Colleghiamo le definizioni
4. Creiamo il sito con ricerca
5. Miglioriamo il risultato passo dopo passo

## 6. Che aspetto avra' il primo sito

All'inizio il sito sara' semplice.

Avra':

- una home con barra di ricerca
- una pagina risultato
- una pagina della voce

Esempio:

- utente cerca `casa`
- il sito trova `casa`
- il sito mostra categoria grammaticale, definizione, eventuali esempi e fonte

## 7. Cosa NON faremo

Non faremo queste cose:

- copiare in massa testi protetti
- promettere un database "uguale a Treccani"
- usare fonti senza capire la licenza

## 8. Cosa faremo subito dopo

Il prossimo passo pratico e' preparare:

- il modello del database
- il formato dei dati da importare
- la prima bozza tecnica del sito

## 9. Come ti guidero'

Ti spieghero' ogni fase in modo semplice:

- cosa stiamo facendo
- perche' lo facciamo
- cosa otteniamo alla fine di quel passaggio

L'idea e' costruire il progetto insieme, senza darti per scontate conoscenze tecniche.
