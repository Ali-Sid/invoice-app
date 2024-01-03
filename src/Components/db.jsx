import Dexie from 'dexie';

export const db = new Dexie({
 databaseName: 'InvoiceDB'
});

db.version(1).stores({
    invoices: '++id, date, customerName, totalAmount'
   });
