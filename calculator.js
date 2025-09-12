let numberButton = document.getElementsByClassName("Number-Button")
let screenOutput =  document.getElementsByClassName("Basic-Calculator-Screen-Answer")
let clearButton =  document.getElementById("Clear")
let backspaceButton = document.getElementById("Backspace");
let previousAnswerButton =  document.getElementsByClassName("Basic-Calculator-Screen-history")
let scientificDisplay = document.getElementById("Scientifci-Calculator")
let scientificButton = document.getElementById("Scientific-Button")
let basicCalculatorDisplay  =  document.getElementById("Basic-Calculator")
let basicCalculatorButton =  document.getElementById("Basic-Button")

window.sineFunction=function(degree) // to make it global for eval() since eval() can only bread in local scope
{
    return  Math.sin( degree * (Math.PI / 180) ) 
    // need to convert from degrees to radians because js reads but radians in its math methods which i think is bullshit.
    // like who the f***k sees things in radians. OR am i the dumb one ?
}
window.inverse =  function (number) 
{
    return (1 / number)
}
window.cosFunction = function (degree) 
{
    return  Math.cos( degree * (Math.PI / 180) ) 

}
window.tanFunction = function (degree) 
{
    return  Math.tan( degree * (Math.PI / 180) ) 
}
window.inverseSine = function(number) 
{
    return  ( Math.asin (number) * (180 / Math.PI ) )
}
window.inverseCos = function(number) 
{
    return  ( Math.acos (number) * (180 / Math.PI ) )
}
window.inverseTan = function(number) 
{
    return  ( Math.atan (number) * (180 / Math.PI ) )
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
                                expression  = expression.replaceAll("cosh(", "Math.cosh(")
                                expression = expression.replaceAll("^", "**")
                                expression  = expression.replaceAll("tanh(", "Math.tanh(")

                                if(expression.includes("sin")) 
                                    {
                                        let startingIndex  = expression.indexOf("sin")
                                        if(expression[startingIndex + 3 ]  == "h")
                                            {
                                            expression  = expression.replaceAll("sinh(", "Math.sinh(")
                                            }
                                        else if(expression[startingIndex  -1 ]  == "c")
                                                {
                                                expression  = expression.replaceAll("arcsin(", "inverseSine(")
                                                }
                                        else
                                            {
                                            expression  = expression.replaceAll("sin(", "sineFunction(")
                                            }
                                    }
                                if(expression.includes("cos")) 
                                    {
                                        let startingIndex  = expression.indexOf("cos")
                                        if(expression[startingIndex + 3 ]  == "h")
                                            {
                                            expression  = expression.replaceAll("cosh(", "Math.cosh(")
                                            }
                                        else if(expression[startingIndex  -1 ]  == "c")
                                                {
                                                expression  = expression.replaceAll("arccos(", "inverseCos(")
                                                }
                                        else
                                            {
                                            expression  = expression.replaceAll("cos(", "cosFunction(")
                                            }
                                    }
                                if(expression.includes("tan")) 
                                    {
                                        let startingIndex  = expression.indexOf("tan")
                                        if(expression[startingIndex + 3 ]  == "h")
                                            {
                                            expression  = expression.replaceAll("tanh(", "Math.tanh(")
                                            }
                                        else if(expression[startingIndex  -1 ]  == "c")
                                                {
                                                expression  = expression.replaceAll("arctan(", "inverseTan(")
                                                }
                                        else
                                            {
                                            expression  = expression.replaceAll("tan(", "tanFunction(")
                                            }
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
                        //  Only add previous answer to the active calculator
                        screenOutput[activeIndex].textContent = screenOutput[activeIndex].textContent + previousAnswerButton[activeIndex].textContent
                    }
                else
                    {
                        //Only add button input to the active calculator
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
// after finishing this project i can say fuck Js, C++ is the best
