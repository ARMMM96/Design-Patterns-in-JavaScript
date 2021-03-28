let Color = Object.freeze({
	red: 'red',
	green: 'green',
	blue: 'blue',
});

let Size = Object.freeze({
	small: 'small',
	medium: 'meduim',
	large: 'large',
	yuge: 'yuge',
});

class Product {
	constructor(name, color, size) {
		this.name = name;
		this.color = color;
		this.size = size;
	}
}
// open for extension, closed for modification

class ProductFilter {
	fitlerByColor(products, color) {
		return products.filter((p) => p.color === color);
	}
	filterBySize(products, size) {
		return products.filter((p) => p.size === size);
	}

	fitlerBySizeAndColor(products, size, color) {
		return products.filter((p) => p.size === size && p.color === color);
	}

	// State space explosion
	// 3 criteria = 7 methods
}

// ↑↑↑ BEFORE

// ↓↓↓ AFTER

// general interface for a specification
class ColorSpecification {
	constructor(color) {
		this.color = color;
	}
	isSatisfied(item) {
		return item.color === this.color;
	}
}
class SizeSpecification {
	constructor(size) {
		this.size = size;
	}

	isSatisfied(item) {
		return item.size === this.size;
	}
}

class AndSpecification {
	constructor(...specs) {
		this.specs = specs;
	}
	isSatisfied(item) {
		return this.specs.every((x) => x.isSatisfied(item));
	}
}

let apple = new Product('Apple', Color.green, Size.small);
let tree = new Product('Tree', Color.green, Size.large);
let house = new Product('House', Color.blue, Size.large);

let products = [apple, tree, house];

class BetterFilter {
	fitler(items, spec) {
		return items.filter((x) => spec.isSatisfied(x));
	}
}

let bf = new BetterFilter();
console.log(`Green prodcuts (new): `);
for (let p of bf.fitler(products, new ColorSpecification(Color.green))) {
	console.log(` * ${p.name} is green`);
}

let pf = new ProductFilter();
console.log(`Green Products (old): `);
for (let p of pf.fitlerByColor(products, Color.green))
	console.log(` * ${p.name} is green`);

console.log(`Large and gree product: `);
let spec = new AndSpecification(
	new ColorSpecification(Color.green),
	new SizeSpecification(Size.large)
);
for (let p of bf.fitler(products, spec)) {
	console.log(` * ${p.name} is large and green`);
}
