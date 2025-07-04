CREATE PROCEDURE InserirAvaliacao(
    IN email_usuario VARCHAR,
    IN nome_prato VARCHAR,
    IN data_consumo DATE,
    IN data_avaliacao DATE,
    IN tipo_refeicao VARCHAR,
    IN texto_avaliacao TEXT,
    IN nota_avalicao INT
)
BEGIN
    DECLARE avaliacao_existe INT;
    SELECT COUNT(*) INTO avaliacao_existe
    FROM Avaliacoes
    WHERE email = email_usuario
    AND nomePrato = nome_prato
    AND dataConsumo = data_consumo
    AND refeicao = tipo_refeicao;

    IF avaliacao_existente = 0 THEN
        INSERT INTO Avaliacoes (email, nomePrato, dataConsumo, nota, texto, refeicao, dataAvaliacao)
        VALUES (email_usuario, nome_prato, data_consumo, nota_avalicao, texto_avaliacao, tipo_refeicao, data_avaliacao);
    ELSE
        SELECT 'Este prato já foi avaliado.';
    END IF;
END