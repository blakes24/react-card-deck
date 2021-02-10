function addTransform() {
	let angle = Math.random() * 90 - 45;
	let x = Math.random() * 20 - 10;
	let y = Math.random() * 20 - 10;
	return `translateX(${x}px) translateY(${y}px) rotate(${angle}deg)`;
}

export { addTransform };
