# Handoff Progetto

Questo file serve per ripartire rapidamente in una nuova chat senza perdere il lavoro gia' fatto.

## Cartella di lavoro

- `/Users/marianomacbook/Documents/Codex/2026-04-21-agisci-come-un-interfaccia-api-rigorosa`

## File principali da leggere per primi

- `index.html`
- `styles.css`
- `app.js`
- `ui-languages.js`

## Stato attuale del progetto

Il progetto e' un vocabolario online locale che:

- cerca vocaboli online
- mostra il contenuto della voce nella pagina
- traduce interfaccia e contenuto della voce quando si cambia lingua
- mantiene una cache locale nel browser
- legge il contenuto con sintesi vocale tramite browser

## Comportamenti attualmente presenti

- ricerca live online
- traduzione della query verso l'italiano quando la lingua selezionata non e' italiano
- traduzione del contenuto della voce nella lingua selezionata
- cache locale per risultati, voci e traduzioni
- due selettori lingua sincronizzati
- pulsanti audio `Ascolta` e `Stop`
- font accessibile per lettura facilitata

## Vincoli da mantenere

Non reintrodurre mai queste cose:

- riferimenti visibili a `Wikizionario`
- riferimenti visibili a `Treccani`, `De Mauro`, `Sansoni`, `The Free Dictionary` o fonti simili
- link ipertestuali attivi nel contenuto mostrato
- sezioni finali tipo `Note`, `Riferimenti`, `Altri progetti`
- sezioni inutili in altre lingue come `Latino`, `Spagnolo`, `Inglese`, ecc.
- blocchi come `Pronuncia`, `AFI`, `Proverbi e modi di dire` quando non servono

## Pulizia del contenuto gia' implementata

In `app.js` esiste un filtro HTML che prova a rimuovere:

- immagini
- riferimenti finali e bibliografici
- rimandi ad altri progetti
- link attivi
- sezioni non desiderate in altre lingue

## Traduzione

La traduzione attuale:

- traduce l'interfaccia tramite `ui-languages.js`
- traduce il contenuto della voce via chiamate web nel browser
- traduce i blocchi di testo in parallelo per ridurre la lentezza

Nota pratica:

- la traduzione ora funziona, ma non e' istantanea
- e' stata giudicata accettabile dall'utente

## Audio

L'audio attuale usa la `speechSynthesis` del browser.

Comportamento:

- legge lemma + contenuto visibile
- usa la lingua selezionata quando possibile
- prova a scegliere automaticamente una voce disponibile compatibile

Limite noto:

- la qualita' della voce dipende dal browser e dal sistema operativo

## Accessibilita'

L'interfaccia usa un font accessibile:

- `Atkinson Hyperlegible Next`

con fallback:

- `Atkinson Hyperlegible`
- `Verdana`
- `Tahoma`
- `sans-serif`

## File da non usare come fonte primaria dello stato corrente

Questi file sono storici o preparatori e non descrivono sempre la versione finale dell'interfaccia:

- `README.md`
- `AVVIO.md`
- `DATABASE-LOCALE.md`
- `SCHEMA-LESSICALE.md`
- `FONTI-DATI.md`
- `GUIDA-PASSO-PASSO.md`

Sono utili come contesto, ma la fonte di verita' dell'app attuale e' nei file frontend principali.

## Prossimo metodo consigliato in una nuova chat

Chiedere al nuovo assistente di:

1. leggere `index.html`, `styles.css`, `app.js`, `ui-languages.js`
2. riassumere brevemente lo stato reale del progetto
3. applicare modifiche direttamente ai file esistenti senza rigenerare tutto da zero

## Prompt consigliato per la nuova chat

```text
Sto lavorando su un progetto locale in questa cartella:

/Users/marianomacbook/Documents/Codex/2026-04-21-agisci-come-un-interfaccia-api-rigorosa

Usa come base l'ULTIMA versione gia' presente nei file locali, senza rigenerare da zero.

Leggi prima questi file:
- index.html
- styles.css
- app.js
- ui-languages.js
- HANDOFF.md

Vincoli importanti:
- non mostrare mai riferimenti visibili a Wikizionario o ad altre fonti editoriali
- non mostrare mai link attivi nel contenuto delle voci
- mantieni il filtro delle sezioni finali e delle sezioni in lingue non necessarie
- mantieni traduzione, cache, audio e font accessibile
- applica modifiche direttamente ai file esistenti

Prima azione:
1. leggi i file
2. riassumi lo stato reale del progetto
3. chiedimi quale miglioramento voglio fare dopo
```
