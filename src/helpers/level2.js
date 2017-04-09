export function generateQuestion(index){
  var q=index+1;
  var answerIntermediate = 1;// valid
  var answer=0;
	do {
		var v1 = 1 + Math.floor( Math.random()*98 );
		var v2 = 1 + Math.floor( Math.random()*98 );
		switch (q) {
			case 1:
      case 8:
      case 12:{
        t=v1+' + '+v2+' = '; answer = eval(v1+v2); answerIntermediate=0; break;
      }
			case 2:
      case 4:
      case 6:{
        t=v1+' \xF7 '+v2+' = '; answerIntermediate = v1%v2; answer = eval(v1/v2);
        break;
      }
			case 3:
      case 7:
      case 10:
      case 11:{
        t=v1+' \xD7 '+v2+' = '; answer = eval(v1*v2);answerIntermediate=0; break;
      }
			case 5:
      case 9:{
        t=v1+' - '+v2+' = '; answer = eval(v1-v2); answerIntermediate=0; break;
      }
      default:{
        break;
      }
		}
	} while (answer>=100 || answer<=0 || answerIntermediate!=0);
  return {'question':t, 'answer':answer}
}
