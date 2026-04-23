INSERT INTO entries (
  id,
  lemma,
  slug,
  part_of_speech,
  pronunciation,
  source_name,
  source_url,
  license_name,
  license_url
) VALUES
  (
    1,
    'casa',
    'casa',
    'sostantivo femminile',
    'ca|sa',
    'Voce dimostrativa del progetto',
    'https://it.wiktionary.org/wiki/casa',
    'CC BY-SA',
    'https://creativecommons.org/licenses/by-sa/4.0/deed.it'
  ),
  (
    2,
    'libro',
    'libro',
    'sostantivo maschile',
    'li|bro',
    'Voce dimostrativa del progetto',
    'https://it.wiktionary.org/wiki/libro',
    'CC BY-SA',
    'https://creativecommons.org/licenses/by-sa/4.0/deed.it'
  );

INSERT INTO senses (id, entry_id, sense_order, definition_text) VALUES
  (1, 1, 1, 'Edificio o parte di edificio destinato a essere abitato.'),
  (2, 1, 2, 'Ambiente domestico considerato come luogo della propria vita familiare.'),
  (3, 2, 1, 'Opera scritta o stampata composta di pagine rilegate insieme.'),
  (4, 2, 2, 'Testo pubblicato come unita'' autonoma.');

INSERT INTO examples (id, sense_id, example_text) VALUES
  (1, 1, 'Sono tornato a casa dopo il lavoro.'),
  (2, 3, 'Ho comprato un libro di storia italiana.');

INSERT INTO expressions (id, entry_id, expression_text, meaning_text) VALUES
  (1, 1, 'a casa', 'nella propria abitazione o nel luogo in cui si vive abitualmente'),
  (2, 1, 'casa editrice', 'impresa che pubblica libri, riviste o altri contenuti editoriali'),
  (3, 2, 'libro di testo', 'manuale usato per lo studio scolastico o universitario');
