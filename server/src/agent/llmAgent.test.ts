import { runAgent } from './llmAgent';

async function main() {
  const userInput = 'Find all PDF files in my Google Drive and send the latest one to my Gmail.';
  console.log('User Input:', userInput);
  const result = await runAgent(userInput);
  console.log('Agent Result:', result);
}

main().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});
