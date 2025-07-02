CREATE VIEW media_prato AS
SELECT prato.nome, prato.icone, count (avaliacao.id) AS qnt_avaliacoes, AVG (avaliacao.nota) AS media_avaliacoes
FROM prato
LEFT JOIN
avaliacao  ON
avaliacao.nomeprato=prato.nome
GROUP BY prato.nome;