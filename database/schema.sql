CREATE TABLE entries (
  id INTEGER PRIMARY KEY,
  lemma TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  part_of_speech TEXT,
  pronunciation TEXT,
  etymology TEXT,
  language_code TEXT NOT NULL DEFAULT 'it',
  source_name TEXT,
  source_url TEXT,
  license_name TEXT,
  license_url TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE senses (
  id INTEGER PRIMARY KEY,
  entry_id INTEGER NOT NULL,
  sense_order INTEGER NOT NULL,
  definition_text TEXT NOT NULL,
  register_label TEXT,
  usage_note TEXT,
  FOREIGN KEY (entry_id) REFERENCES entries(id) ON DELETE CASCADE
);

CREATE TABLE examples (
  id INTEGER PRIMARY KEY,
  sense_id INTEGER NOT NULL,
  example_text TEXT NOT NULL,
  FOREIGN KEY (sense_id) REFERENCES senses(id) ON DELETE CASCADE
);

CREATE TABLE expressions (
  id INTEGER PRIMARY KEY,
  entry_id INTEGER NOT NULL,
  expression_text TEXT NOT NULL,
  meaning_text TEXT,
  FOREIGN KEY (entry_id) REFERENCES entries(id) ON DELETE CASCADE
);

CREATE TABLE inflections (
  id INTEGER PRIMARY KEY,
  entry_id INTEGER NOT NULL,
  form_text TEXT NOT NULL,
  morphology_tag TEXT,
  FOREIGN KEY (entry_id) REFERENCES entries(id) ON DELETE CASCADE
);

CREATE INDEX idx_entries_lemma ON entries(lemma);
CREATE INDEX idx_senses_entry_id ON senses(entry_id);
CREATE INDEX idx_examples_sense_id ON examples(sense_id);
CREATE INDEX idx_expressions_entry_id ON expressions(entry_id);
CREATE INDEX idx_inflections_entry_id ON inflections(entry_id);
