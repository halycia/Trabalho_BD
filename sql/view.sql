CREATE VIEW media_prato AS
SELECT prato.nome, count (avaliacao.id), AVG (avaliacao.nota)
FROM prato
LEFT JOIN
avaliacao  ON
avaliacao.nomeprato=prato.nome
GROUP BY prato.nome;