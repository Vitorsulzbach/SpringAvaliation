INSERT INTO categoria (id, codigo, descricao) VALUES
  (10001, 1, 'Comportamental'),
  (10002, 2, 'Programação'),
  (10003, 3, 'Qualidade'),
  (10004, 4, 'Processos') ON CONFLICT DO NOTHING;