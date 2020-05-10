$('.history').click(history);
$('.bracket').click(bracket_T);
var historyRef = false;

function history_value(value){
    document.getElementById('result').innerText = value.innerText;
    displayValue = value.innerText;
    var node = math.parse(value.innerText);
    var latex = node.toTex({parenthesis: 'keep', implicit: 'hide'});
    var elem = MathJax.Hub.getAllJax('latex')[0];
    MathJax.Hub.Queue(['Text', elem, latex]); 
}

function history(){
    if(historyRef == true) {
      historyRef = false
      $('.history_div').css({
      'display': 'none'
    })
    } else {
      $('.history_div').css({
      'display': 'block'
    })
      historyRef = true
    };

    $('#arrow').css({
      'transform': 'rotateY('+180*historyRef+'deg)'
    })
}

function historyAdd(result){
  var INNERHTML = '';
  INNERHTML += '<div class="history_bottom">';
  INNERHTML += '<div class="history_value" onclick="history_value(this)">'+$('#result').text()+'</div>';
  INNERHTML += '<div class="history_result" onclick="history_value(this)">'+result+'</div>';
  INNERHTML += '</div>';
  document.querySelector('.history_div').innerHTML += INNERHTML;
}


function helpTF(){
  if(helpValue === false) {
    helpValue = true;
    document.getElementById('result').innerText = '';
    $('.help').css({
                'background-color': '#5F9EA0',
                'box-shadow': '0 5px #666',
                'transform': 'translateY(4px)'
            });
  }else {
    helpValue = false;
    document.getElementById('result').innerText = '0';
    $('.help').css({
                'background-color': '',
                'box-shadow': '',
                'transform': ''
            });
  }}

  $('.bracket-S').hover(function() {
    //var rowcolumn = $(this).attr('id');
    var rowcolumn = $(this).attr('id').split('');
    for(var i =1; i<=rowcolumn[0];i++){
      for(var j =1; j<=rowcolumn[1];j++){
        $('#'+i+j).css("background-color", "black");
      }
    }
  },function() {
    $('.bracket-S').mouseout(function() {
      $('.bracket-S').css("background-color", "");
    });
  });

  

function helpFn(text){
  if(text == 1) text = '숫자1 이다.';
  if(text == 2) text = '숫자2 이다.';
  if(text == 3) text = '숫자3 이다.';
  if(text == 4) text = '숫자4 이다.';
  if(text == 5) text = '숫자5 이다.';
  if(text == 6) text = '숫자6 이다.';
  if(text == 7) text = '숫자7 이다.';
  if(text == 8) text = '숫자8 이다.';
  if(text == 9) text = '숫자9 이다.';
  if(text == 0) text = '숫자0 이다.';
  return text;
}

function bracketC(row,column){
 var INNERH = '';
  if(column==1) INNERH += '(';
  else INNERH += '[';

  if(column==1){
    for(var j=1;j<=row;j++){
      INNERH+=0;
      if(j==row) INNERH+='';
      else INNERH += ',';
    }
  }else {
    for(var i=1;i<=row;i++){
      INNERH += '[';
      for(var j=1;j<=column;j++){
        INNERH+=0;
        if(j==column) INNERH+='';
        else INNERH += ',';
      }
      INNERH += ']';
      if(i==row) INNERH+='';
      else INNERH += ',';
    }
  }

  if(column==1) INNERH += ')';
  else INNERH += ']';

  document.getElementById('result').innerText += INNERH;
    displayValue = INNERH;
    var node = math.parse(displayValue);
    var latex = node.toTex({parenthesis: 'keep', implicit: 'hide'});
    var elem = MathJax.Hub.getAllJax('latex')[0];
    MathJax.Hub.Queue(['Text', elem, latex]); 
  
}
var bracket_Tvalue = false;

function bracket_T(){
  if(bracket_Tvalue){
    $('.bracket-T').css({
      'display': 'none'
    });

    $('.bracket').css({
          'background-color': '',
          'box-shadow': '',
          'transform': ''
      });
    bracket_Tvalue = false;
  }else{
    $('.bracket-T').css({
      'display': 'flex'
    });

    $('.bracket').css({
          'background-color': '#5F9EA0',
          'box-shadow': '0 5px #666',
          'transform': 'translateY(4px)'
      });
    bracket_Tvalue = true;
  }

}

function copy(){
  $('#result_set').val($('#result').text());
}

function paste(){
    $('#ipput_id').css('display', 'none');
  var paste = $('#result').text();
   paste += $('#result_set').val();
  $('#result').text(paste);
  displayValue = paste;

  var node = math.parse(displayValue);
    var latex = node.toTex({parenthesis: 'keep', implicit: 'hide'});
    var elem = MathJax.Hub.getAllJax('latex')[0];
    MathJax.Hub.Queue(['Text', elem, latex]); 
}

function paste_key(keyVal) {
    var paste = $('#result').text();
    paste += keyVal;
    $('#result').text(paste);
    displayValue = paste;

    var node = math.parse(displayValue);
    var latex = node.toTex({parenthesis: 'keep', implicit: 'hide'});
    var elem = MathJax.Hub.getAllJax('latex')[0];
    MathJax.Hub.Queue(['Text', elem, latex]);
}
$(function() {
    var allowKey = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '+', '*', 'Enter', '=', '%', '^', ',', '.', ':', ';'];
    $(document).keyup(function(e) {
        if (!$('#result_set').is(':focus')) {
            if (allowKey.indexOf(e.key) > -1) {
                // 엔터키에 대한 예외 사항
                if (e.key == 'Enter') paste_key('=')
                else paste_key(e.key);
            }
        }
    });
    $('#result').on('click', function(e) {
        $('#ipput_id').css('display', 'block');
    });
});