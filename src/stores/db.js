import Dexie from 'dexie';

// Create a new database
const db = new Dexie('giras-db');
// Define the database schema
db.version(1).stores({
  tickets: '++id,revenue_sub_head_id,tickets',
  issued_tickets:'++id,revenue_sub_head_id,tickets'
});

export default db;
