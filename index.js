const readline = require('readline');
const FlamesCalculator = require('./flames');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const calculator = new FlamesCalculator();

console.log('\n╔════════════════════════════════════════╗');
console.log('║     FLAMES RELATIONSHIP CALCULATOR     ║');
console.log('╚════════════════════════════════════════╝\n');
console.log('FLAMES: Friends, Lovers, Affection, Marriage, Enemies, Siblings\n');

function askNames() {
  rl.question('Enter first name: ', (name1) => {
    if (!name1.trim()) {
      console.log('❌ Name cannot be empty!\n');
      return askNames();
    }

    rl.question('Enter second name: ', (name2) => {
      if (!name2.trim()) {
        console.log('❌ Name cannot be empty!\n');
        return askNames();
      }

      try {
        const result = calculator.calculate(name1, name2);
        
        console.log('\n' + '='.repeat(50));
        console.log(`👤 Name 1: ${result.name1}`);
        console.log(`👤 Name 2: ${result.name2}`);
        console.log(`📊 Remaining Characters: ${result.remainingCount}`);
        console.log(`💖 Result: ${result.result} - ${result.relationship}`);
        console.log('='.repeat(50) + '\n');
      } catch (error) {
        console.log(`❌ Error: ${error.message}\n`);
      }

      rl.question('Calculate again? (yes/no): ', (answer) => {
        if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
          console.log('\n');
          askNames();
        } else {
          console.log('\n👋 Thank you for using FLAMES Calculator!\n');
          rl.close();
        }
      });
    });
  });
}

askNames();
