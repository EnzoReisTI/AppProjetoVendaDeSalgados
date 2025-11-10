import * as SQLite from 'expo-sqlite';

const DATABASE_NAME = 'salgados.db';
const db = SQLite.openDatabase(DATABASE_NAME); 

export const executeSql = (sql: string, params: any[] = []): Promise<any> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx: any) => { 
      tx.executeSql(
        sql,
        params,
        // CORREÇÃO: Usamos 'txCallback' em vez de '_' e tipamos ambos como 'any'
        (txCallback: any, result: any) => resolve(result), 
        (txCallback: any, error: any) => { 
          reject(error);
          return true; 
        }
      );
    });
  });
};

export const initDatabase = () => {
  db.transaction((tx: any) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS produtos (
        id TEXT PRIMARY KEY NOT NULL,
        nome TEXT NOT NULL,
        preco REAL NOT NULL,
        imagem TEXT
      );`,
      [],
      () => console.log('Tabela criada.'),
      // CORREÇÃO: Usamos 'txCallback' em vez de '_' e tipamos ambos como 'any'
      (txCallback: any, error: any) => {
        console.error('Erro ao criar a tabela:', error);
        return true;
      }
    );
  });
};