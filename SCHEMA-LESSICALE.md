# Schema Lessicale

Questa e' la struttura minima consigliata per il database del vocabolario.

## Tabella: `entries`

Contiene una riga per ogni voce principale del vocabolario.

Campi:

- `id`: identificatore numerico
- `lemma`: parola base, per esempio `casa`
- `slug`: versione usata nell'indirizzo web, per esempio `casa`
- `part_of_speech`: nome, verbo, aggettivo, ecc.
- `pronunciation`: pronuncia, se disponibile
- `etymology`: etimologia, se disponibile
- `language`: lingua della voce, per esempio `it`
- `source_name`: nome della fonte
- `source_url`: indirizzo della fonte
- `license_name`: licenza del contenuto
- `license_url`: link alla licenza
- `created_at`: data di creazione
- `updated_at`: data di aggiornamento

## Tabella: `senses`

Contiene le definizioni della voce.

Campi:

- `id`: identificatore numerico
- `entry_id`: collegamento alla tabella `entries`
- `sense_order`: ordine della definizione
- `definition_text`: testo della definizione
- `register_label`: etichetta come comune, tecnico, letterario
- `usage_note`: eventuale nota d'uso

## Tabella: `examples`

Contiene esempi collegati a una definizione.

Campi:

- `id`: identificatore numerico
- `sense_id`: collegamento alla tabella `senses`
- `example_text`: frase di esempio

## Tabella: `expressions`

Contiene locuzioni e modi di dire collegati a una voce.

Campi:

- `id`: identificatore numerico
- `entry_id`: collegamento alla tabella `entries`
- `expression_text`: locuzione
- `meaning_text`: spiegazione della locuzione

## Tabella: `inflections`

Contiene forme flesse e varianti.

Campi:

- `id`: identificatore numerico
- `entry_id`: collegamento alla tabella `entries`
- `form_text`: forma, per esempio `case`
- `morphology_tag`: etichetta grammaticale, per esempio `noun-f-pl`

## Esempio pratico

### Entry

- lemma: `casa`
- part_of_speech: `sostantivo`
- source_name: `Wikizionario`

### Sense 1

- definition_text: `edificio destinato ad abitazione`

### Example 1

- example_text: `Sono tornato a casa tardi.`

### Expression 1

- expression_text: `a casa`
- meaning_text: `nella propria abitazione`

### Inflection 1

- form_text: `case`
- morphology_tag: `noun-f-pl`

## Perche' questo schema e' utile

Perche' ci permette di:

- avere piu' definizioni per la stessa parola
- aggiungere esempi senza confusione
- collegare locuzioni e forme flesse
- mostrare sempre la fonte dei contenuti

## Cosa faremo dopo

Quando inizieremo a programmare davvero, trasformeremo questo schema in tabelle reali dentro un database.
