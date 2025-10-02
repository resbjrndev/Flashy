// Script to remove Programming Basics and World Capitals decks
// Run with: node scripts/remove-decks.js

const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function removeDecks() {
  // Parse connection string manually (same as db.ts)
  const connStr = process.env.DATABASE_URL;
  const match = connStr.match(/^postgres(?:ql)?:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/([^?]+)(?:\?(.+))?$/);
  const [, user, password, host, port, database] = match;

  const pool = new Pool({
    user: decodeURIComponent(user),
    password: decodeURIComponent(password),
    host,
    port: parseInt(port, 10),
    database,
    ssl: { rejectUnauthorized: false },
  });

  try {
    console.log('Connecting to database...');

    const decksToRemove = ['Programming Basics', 'World Capitals'];

    for (const deckTitle of decksToRemove) {
      console.log(`\nRemoving deck: ${deckTitle}`);

      // Delete deck (cards will be deleted automatically due to cascade)
      const result = await pool.query(
        'DELETE FROM decks WHERE device_id = $1 AND title = $2 RETURNING id',
        ['starter-decks-system', deckTitle]
      );

      if (result.rows.length > 0) {
        console.log(`  ✅ Deleted deck "${deckTitle}" (ID: ${result.rows[0].id})`);
      } else {
        console.log(`  ⚠️  Deck "${deckTitle}" not found`);
      }
    }

    console.log('\n✅ Done!');
  } catch (error) {
    console.error('❌ Error removing decks:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

removeDecks();
