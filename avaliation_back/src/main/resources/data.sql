INSERT INTO categoria (id, codigo, descricao) VALUES
  (10001, 1, 'Comportamental'),
  (10002, 2, 'Programação'),
  (10003, 3, 'Qualidade'),
  (10004, 4, 'Processos') ON CONFLICT DO NOTHING;

INSERT INTO curso (id, descricao, end_date, init_date, nome, qtd_aluno, categoria_id) VALUES
  (10001, 'Estrutura de dados 1', 1612100800000, 1609502400000, 'EDO', 40, 10002),
  (10002, 'Gestão de Processos', 1614590000000, 1612180800000, 'GP', 120, 10003),
  (10003, 'Interface Humano Computador', 1617270400000, 1614600000000, 'IHC', 20, 10002),
  (10004, 'Compiladores', 1619870400000, 1617278400000, 'Comp', 60, 10002) ON CONFLICT DO NOTHING;