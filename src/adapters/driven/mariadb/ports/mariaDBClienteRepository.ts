import conexao from "../conexao";
import { Cliente } from "../../../../core/domain/cliente";
import ClienteRepository from "../../../../core/application/ports/clienteRepository";

export default class MariaDBClienteRepository implements ClienteRepository {

    async criaCliente(cliente: Cliente): Promise<number> {
        const con = await conexao()
        return await con.query(
            `INSERT INTO clientes (nome, cpf) VALUES ('${cliente.nome}', '${cliente.cpf}')`,
            (err: Error, rows: Cliente[]) => {
                if ( err ) return err;
                return rows
            })
            .then((id: any) => id.insertId)
            
    }

    async encontraClientePorCPF(cpf: string): Promise<Cliente> {
        const con = await conexao();
        return await con.query(
            `SELECT * FROM clientes WHERE cpf = ${cpf}`, 
            (err: Error, rows: Cliente[]) => {
                if (err) return err;
                if ( rows.length == 0 ) {
                    throw new Error(`Cliente não encontrado.`);
                }
                return rows;
            })
            .then((response:Cliente[]) => response[0]);
    }

}