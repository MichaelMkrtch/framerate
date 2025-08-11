import { execSync } from 'child_process';
import { existsSync } from 'fs';

const local = '../../server';

if (existsSync(local)) {
  console.log('Linking @framerate/server to local ../../server');
  execSync('Bun link ../../server', { stdio: 'inherit' });
}
