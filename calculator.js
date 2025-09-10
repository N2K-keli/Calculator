let numberButton = document.getElementsByClassName("Number-Button")
let screenOutput =  document.getElementsByClassName("Basic-Calculator-Screen-Answer")
let clearButton =  document.getElementById("Clear")
let backspaceButton = document.getElementById("Backspace");
let previousAnswerButton =  document.getElementsByClassName("Basic-Calculator-Screen-history")
let scientificDisplay = document.getElementById("Scientifci-Calculator")
let scientificButton = document.getElementById("Scientific-Button")
let basicCalculatorDisplay  =  document.getElementById("Basic-Calculator")
let basicCalculatorButton =  document.getElementById("Basic-Button")

window.toRadians=function(degree) // to make it global for eval() since eval() can only bread in local scope
{
    return degree * (Math.PI / 180) 
    // need to convert from degrees to radians because js reads but radians in its math methods which i think is bullshit.
    // like who the f***k sees things in radians. OR am i the dumb one ?
}
window.inverse =  function (number) 
{
    return (1 / number)
}
for(let i = 0; i<numberButton.length ; i++) 
    {
        numberButton[i].addEventListener('click',function()
            {
                console.log(this.value)
                let ButtonValue =  this.value
                
                //  Check which calculator is currently active
                let isScientificActive = !scientificDisplay.classList.contains("hidden-Elements")
                let activeIndex = isScientificActive ? 1 : 0 // this is one was to set active one calculator cos i noticed it was calculating same in the back
                
                if(ButtonValue === "CE")
                    {
                        //  Only clear the active calculator
                        screenOutput[activeIndex].textContent= ''
                    }
                else if(ButtonValue === '⌫')
                    {
                        //  Only backspace on the active calculator not to both calculators as before
                        let screenText = screenOutput[activeIndex].textContent
                        let screenTextBackspaced = screenText.slice(0,screenText.length-1).trim()
                        screenOutput[activeIndex].textContent = screenTextBackspaced
                    }
                else if(ButtonValue === '=') 
                    {
                        // Only process the active calculator's expression
                        let expression = screenOutput[activeIndex].textContent
                        try {
                            console.log("Original expression:", expression)
                            expression = expression.replaceAll("%","/100")
                            expression = expression.replaceAll("sqrt(", "Math.sqrt(")
                            expression = expression.replaceAll("mod", "%")
                            // below conditional only for when the active calculator is active
                            if(isScientificActive) {
                                expression =  expression.replaceAll("Log(", "Math.log10(")
                                expression =  expression.replaceAll("e","Math.E")
                                expression =  expression.replaceAll("π", "Math.PI")
                                expression = expression.replaceAll("Ln(", "Math.log(")
                                expression = expression.replaceAll("inv(", "inverse(")
                                // why the conditional below you ask. because for some reason if i say sin(90) in the calculator, 
                                // the function is supposed to return Math.sin(toRadians(90)) but instead it returns Math.sin(toRadians(90))90)
                                // so  i just put it in an if to isolate the sine and then slice the remaining 3 characters. i must do for all trigs
                                // not the best way but that is what i have seen not the smartest i guess. 
                                if(expression.includes("sin(")) 
                                {
                                    expression = expression.replaceAll(/sin\(/g, function(match, position, stringWord)
                                    {
                                        console.log("DEBUG - match:", match, "position:", position, "stringWord:", stringWord);
    
                                        let openCount = 1;
                                        let i = position + match.length;
                                        let startContentPosition = i;
    
                                    console.log("DEBUG - Starting loop: i =", i, "openCount =", openCount, "stringWord.length =", stringWord.length);
                                
                                    while(i < stringWord.length && openCount > 0) 
                                    {
                                        console.log("DEBUG - Loop iteration: i =", i, "char =", stringWord[i], "openCount =", openCount);
                                    
                                        if(stringWord[i] === '(') 
                                        {
                                            openCount++;
                                            console.log("DEBUG - Found '(', openCount now:", openCount);
                                        }
                                        else if (stringWord[i] === ')')
                                        {
                                            openCount--;
                                            console.log("DEBUG - Found ')', openCount now:", openCount);
                                        }
                                        i++;
                                    }
                                    
                                        console.log("DEBUG - After loop: i =", i, "openCount =", openCount);
                                    
                                        let endContentPosition = i - 1;
                                        let content = stringWord.substring(startContentPosition, endContentPosition);
                                    
                                        console.log("DEBUG - content found:", content);
                                        console.log("DEBUG - substring from", startContentPosition, "to", endContentPosition);

                                        return `Math.sin(toRadians(${content}))`;
                                    })
                                    expression = expression.slice(0,-3)
                                }
                                
                                if(expression.includes("cos("))
                                {
                                    expression = expression.replaceAll(/cos\(/g, function(match, position, stringWord){
                                        let openCount = 1;
                                        let i = position + match.length
                                        let startContentPosition = i
                                        while(i < stringWord.length && openCount > 0) 
                                        {
                                            if(stringWord[i] === '(') openCount++
                                            else if (stringWord[i] === ')') openCount--
                                            i++
                                        }
                                        let endContentPosition = i-1
                                        let content = stringWord.substring(startContentPosition, endContentPosition)
                                        return `Math.cos(toRadians(${content}))`
                                    })
                                    expression = expression.slice(0,-3)
                            }
                                if(expression.includes("tan("))
                                {
                                    expression = expression.replaceAll(/tan\(/g, function(match, position, stringWord){
                                        let openCount = 1;
                                        let i = position + match.length
                                        let startContentPosition = i
                                        while(i < stringWord.length && openCount > 0) 
                                        {
                                            if(stringWord[i] === '(') openCount++
                                            else if (stringWord[i] === ')') openCount--
                                            i++
                                        }
                                        let endContentPosition = i-1
                                        let content = stringWord.substring(startContentPosition, endContentPosition)
                                        return `Math.tan(toRadians(${content}))`
                                })
                                expression = expression.slice(0,-3)
                                }
                            }
                            console.log("Final expression before eval:", expression)
                            // Only evaluate and display on the active calculator
                            let answer = eval(expression)
                            answer =  Number(answer).toFixed(9)
                            let ans = String(answer)
                            screenOutput[activeIndex].textContent = ans
                            previousAnswerButton[activeIndex].textContent = ans
                            console.log(" the answer is : "+ ans + " and the type of the variable is : " + typeof(ans))
                        }
                        catch(error)
                        {
                            console.log("an error occured. error message : " + error)
                        }
                    } 
                else if(ButtonValue === "ans") 
                    {
                        // CORRECTED: Only add previous answer to the active calculator
                        screenOutput[activeIndex].textContent = screenOutput[activeIndex].textContent + previousAnswerButton[activeIndex].textContent
                    }
                else
                    {
                        // CORRECTED: Only add button input to the active calculator
                        screenOutput[activeIndex].textContent = screenOutput[activeIndex].textContent + ButtonValue
                    }
            });
    }

scientificButton.addEventListener('click', function(){
    basicCalculatorDisplay.classList.add("hidden-Elements")
    scientificDisplay.classList.remove("hidden-Elements")
})
basicCalculatorButton.addEventListener('click', function()
{
    basicCalculatorDisplay.classList.remove("hidden-Elements")
    scientificDisplay.classList.add("hidden-Elements")
})