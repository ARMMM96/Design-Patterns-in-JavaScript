const fs = require('fs');

class Journal {
	constructor() {
		this.entries = {};
	}

	addEntry(text) {
		let c = ++Journal.count;
		let entry = `${c}: ${text}`;
		this.entries[c] = entry;
		return c;
	}

	removeEntry(index) {
		delete this.entries[index];
	}
	toString() {
		return Object.values(this.entries).join('\n');
	}
	// save(filename)
	// {
	//   fs.writeFileSync(filename, this.toString());
	// }
	//
	// load(filename)
	// {
	//   //
	// }
	//
	// loadFromUrl(url)
	// {
	//   //
	// }
}
Journal.count = 0;

class PersistenceManager {
	preprocess(j) {
		//
	}
	saveToFile(jornal, filename) {
		fs.writeFileSync(filename, jornal.toString());
	}
}

let j = new Journal();

j.addEntry('I was feeling bored today');
j.addEntry('I was trying to learin designe patterns');
console.log(j.toString());

let p = new PersistenceManager();
let filename = 'c:/temp/journal.txt';
p.saveToFile(j, filename);

// Separation of concerns
