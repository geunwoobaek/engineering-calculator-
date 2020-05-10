function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}
function myFunction2() {
  document.getElementById("cce").classList.toggle("show");
}
function myFunction3() {
  document.getElementById("paren_id").classList.toggle("show");
}
function myFunction4() {
  document.getElementById("bool_id").classList.toggle("show");
}
function myFunction5() {
  document.getElementById("Math_id").classList.toggle("show");
}

var helpValue = false;

        $(document).ready(function(){

            var parser = math.parser();
        
            var displayValue = '0';
            $('#result').text(displayValue);
            $('#latex').html('$$' + math.parse(displayValue).toTex() + '$$');

            $('.key').each(function(index, key){       
                $(this).click(function(e){
                  if(helpValue === true){
                    var Vtext = $(this).text();
                    $('#result').text(helpFn(Vtext));
                  } else {
                    if(displayValue == '0') displayValue = '';
                    
                    if($(this).text() == 'EV')
                    {
                      displayValue = document.querySelector('#result').innerText;
                        try
                      {                
                            displayValue = parser.eval(displayValue).toString();
                            var tokens = displayValue.split(' ');
                            if(tokens[0] == 'function')
                            {
                                displayValue = tokens[0];
                            }

                            historyAdd(displayValue);
                            $('#result').text(displayValue);
                            displayValue = '0';
                        }
                        catch (e)
                        {
                            displayValue = '0';
                            if(displayValue != 'function')
                            {
                                $('#result').text(e);
                            }
                        }               
                    }
                    else
                    {
                        if($(this).text() == 'CL')
                        {
                            displayValue = '0';
                            $('#result').text(displayValue);
                        }
                        else if($(this).text()=='BACK')
                        {
                            displayValue=displayValue.substring(0,displayValue.length-1)
                            $('#result').text(displayValue);
                        }
                        else if($(this).text() == 'CP')
                        {                 
                        if (document.getSelection) {    // all browsers, except IE before version 9
                        var selectionText = document.getSelection ();
                         cpText=selectionText;
                          } 
                          else {
                          if (document.selection) {   // Internet Explorer before version 9
                              var textRange = document.selection.createRange ();
                              cpText=textRange;
                          }
                           }                    
                        }
                        else if($(this).text() == 'PS')
                        {
                        displayValue += cpText;
                        $('#result').text(displayValue);
                        }
                        else
                        {   
                            displayValue = $('#result').text();         
                            displayValue += $(this).text();
                            $('#result').text(displayValue);
                        }

                        var node = math.parse(displayValue);
                        var latex = node.toTex({parenthesis: 'keep', implicit: 'hide'});
                        var elem = MathJax.Hub.getAllJax('latex')[0];
                        MathJax.Hub.Queue(['Text', elem, latex]);                      
                    }

                    e.preventDefault()
                }})

            })

        });

