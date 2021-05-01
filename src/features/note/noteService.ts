import { SQLResultSetRowList } from 'expo-sqlite';
import { NOTE_TABLE, database } from '../../services/database';
import { INote } from './types';

function save(note: INote): Promise<INote[]> {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      const sqlInsert = `INSERT INTO ${NOTE_TABLE} (id, content) values (?,?)`;

      tx.executeSql(
        sqlInsert,
        [note.id, note.content],
        (_, result) => {
          const arrayResult = listSqlRowListAsArray(result.rows);
          console.log('INSERT result.rowsAffected', result.rowsAffected);
          console.log('INSERT note', note);
          resolve([...arrayResult]);
        },
        (_, sqlError) => {
          reject(sqlError);
          return false;
        }
      );
    });
  });
}

function list(): Promise<INote[]> {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      const sqlSelect = `SELECT * FROM ${NOTE_TABLE}`;

      tx.executeSql(
        sqlSelect,
        [],
        (tx, result) => {
          const arrayResult = listSqlRowListAsArray(result.rows);
          console.log('SELECT result.rows', result.rows);
          console.log('SELECT result.rows', arrayResult);
          resolve([...arrayResult]);
        },
        (tx, sqlError) => {
          reject(sqlError);
          return false;
        }
      );
    });
  });
}

function remove(note: INote): Promise<INote[]> {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      const sqlDelete = `DELETE FROM ? WHERE id = ?`;

      tx.executeSql(
        sqlDelete,
        [NOTE_TABLE, note.id],
        (tx, result) => {
          const arrayResult = listSqlRowListAsArray(result.rows);          
          resolve([...arrayResult]);
        },
        (tx, sqlError) => {
          reject(sqlError);
          return false;
        }
      );
    });
  });
}

export const noteService = {
  save,
  list,
  remove,
};

function listSqlRowListAsArray(rows: SQLResultSetRowList): INote[] {
  const arrayResult = [];

  for (let index = 0; index < rows.length; index++) {
    arrayResult.push(rows.item(index));
  }
  return arrayResult;
}

/**
 database.transaction((tx) => {
      tx.executeSql(`INSERT INTO ${NOTE_TABLE} (content) values (?)`, [barcodeData]);
      tx.executeSql(`SELECT * FROM ${tableName}`, [], (tx, { rows }) => {
        // console.log(JSON.stringify(rows));
        resolve([...rows._array]);
      });
    });
 */
