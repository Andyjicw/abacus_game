export function generateQuestion(index){
  var q=index+1;
  var answerIntermediate = 1;// valid
	do {
		var v1 = 1 + Math.floor( Math.random()*9 );
		var v2 = 1 + Math.floor( Math.random()*9 );
		var v3 = 1 + Math.floor( Math.random()*9 );
		switch (q) {
			case 1: t=v1+' + '+v2+' = '; answer = v1+v2; break;
			case 2: t=v1+' + '+v2+' + '+v3+' = '; answerIntermediate = v1+v2; answer = answerIntermediate+v3; break;
			case 3: t=v1+' - '+v2+' = '; answer = v1-v2; break;
			case 4: t=v1+' - '+v2+' - '+v3+' = '; answerIntermediate = v1-v2; answer = answerIntermediate-v3; break;
			case 5: t=v1+' + '+v2+' - '+v3+' = '; answerIntermediate = v1+v2; answer = answerIntermediate-v3; break;
			case 6: t=v1+' - '+v2+' + '+v3+' = '; answerIntermediate = v1-v2; answer = answerIntermediate+v3; break;
		}
	} while (answer>10 || answer<=0 || answerIntermediate<=0 || answerIntermediate>10);
  return {'question':t, 'answer':answer}
}
