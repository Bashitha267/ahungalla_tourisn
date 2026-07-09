/**
 * Usage: node scripts/hash-password.mjs yourpassword
 *
 * This generates a bcrypt hash of your password which you can paste into Supabase SQL Editor:
 *
 *   INSERT INTO public.admin_users (username, password_hash)
 *   VALUES ('admin', '<paste hash here>');
 */

import bcrypt from 'bcryptjs';

const password = process.argv[2];

if (!password) {
  console.error('❌ Usage: node scripts/hash-password.mjs <your_password>');
  process.exit(1);
}

const hash = await bcrypt.hash(password, 12);

console.log('\n✅ Password hash generated!\n');
console.log('Hash:', hash);
console.log('\n📋 Copy this SQL and run it in Supabase SQL Editor:\n');
console.log(`INSERT INTO public.admin_users (username, password_hash)`);
console.log(`VALUES ('admin', '${hash}');`);
console.log('\n💡 Change "admin" to your preferred username.\n');
