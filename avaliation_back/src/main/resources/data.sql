INSERT INTO categoria (id, codigo, descricao) VALUES
  (1, 1, 'Comportamental'),
  (2, 2, 'Programação'),
  (3, 3, 'Qualidade'),
  (4, 4, 'Processos') ON CONFLICT DO NOTHING;