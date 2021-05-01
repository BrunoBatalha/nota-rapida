import * as SQLite from 'expo-sqlite';

export const NAME_DATABASE = 'NotaRapida';
export const NOTE_TABLE = 'Note';

export const database = SQLite.openDatabase(NAME_DATABASE);

export async function initDatabase() {
  await deleteTables();
  await createTables();
}

function deleteTables(){
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      const sqlDeleteNoteTable = `DELETE FROM ${NOTE_TABLE};`;

      tx.executeSql(
        sqlDeleteNoteTable,
        [],
        () => {
          resolve();
        },
        (_, sqlError) => {
          reject(sqlError);
          return false;
        }
      );
    });
  });
}

function createTables() {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      const sqlCreateNoteTable = `CREATE TABLE IF NOT EXISTS ${NAME_DATABASE} (id UNIQUEIDENTIFIER PRIMARY KEY NOT NULL, content text NULL);`;

      tx.executeSql(
        sqlCreateNoteTable,
        [],
        () => {
          resolve();
        },
        (_, sqlError) => {
          reject(sqlError);
          return false;
        }
      );
    });
  });
}
