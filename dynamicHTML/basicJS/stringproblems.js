function landscape() {	
  let result = "";
  let tops = "";

  function flat(size) {
    for (let count = 0; count < size; count++){
      result += "_";
	  tops += " ";
	}
  }

  function hill(size) {
    result += "/";
	tops += " ";
    for (let count = 0; count < size; count++){
      result += " ";
	  tops += "_";
	}
    result += "\\";
	tops += " ";
  }

  //START BUILD SCRIPT
  flat(3);
  hill(4);
  flat(6);
  hill(1);
  flat(1);
  //END BUILD SCRIPT
  
  let flatHill = tops + "\n" + result;
  return flatHill;

}

console.log("")
console.log(landscape())
