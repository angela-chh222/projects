
function basic(rows) {
	let hashtag = "";
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j <= i; j++) {
			hashtag += "#";
		}
		hashtag += "\n";
	}
	return hashtag;
}

console.log(basic(7))