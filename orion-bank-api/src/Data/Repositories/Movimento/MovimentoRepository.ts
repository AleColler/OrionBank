import { Movimento } from "../../../Domain/Entities/Movimento";
import { IMovimentoRepository } from "../../../Domain/Interfaces/Movimento/IMovimentoRepository";
import { connection } from "../../context/ConnectionString";

export class MovimentoRepository implements IMovimentoRepository {

    async RealizarTransacaoPixViaChave(movimento: Movimento): Promise<void> {
        
        const parametros = [
            movimento.Codigo,
            movimento.CodigoContaOrigem,
            movimento.CodigoContaDestino,
            movimento.Valor,
            movimento.Chave_Pix,
            movimento.InfoAdicional,
            movimento.DescTransacao,
            movimento.TipoTransacao,
            movimento.DtMovimento
        ]

        const sql = `INSERT INTO movimento
                        (Codigo, CodigoContaOrigem, CodigoContaDestino, Valor, Chave_Pix, 
                            InfoAdicional, DescTransacao, TipoTransacao, DtMovimento)
                    VALUES 
                        (?, ?, ?, ?, ?, ?, ?, ?, ?)`

        await (await connection).query(
            sql,
            parametros
        )

    }

    async ObterUltimasTransacoes(codigoConta: string) : Promise<Movimento> {

        const sql = `SELECT
                        Valor,
                        TipoTransacao,
                        DtMovimento
                    FROM
                        movimento 
                    WHERE
                        CodigoContaOrigem = ?
                    LIMIT 5`;

        const movimento = await (await connection).query(
            sql,
            [
                codigoConta
            ]
        ) as any

        return movimento[0][0] as Movimento
    }
}