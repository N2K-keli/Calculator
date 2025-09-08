let numberButton = document.getElementsByClassName("Number-Button")
let screenOutput =  document.getElementsByClassName("Basic-Calculator-Screen-Answer")
let clearButton =  document.getElementById("Clear")
let backspaceButton = document.getElementById("Backspace");
let previousAnswerButton =  document.getElementsByClassName("Basic-Calculator-Screen-history")
let scientificDisplay = document.getElementById("Scientifci-Calculator")
let scientificButton = document.getElementById("Scientific-Button")
let basicCalculatorDisplay  =  document.getElementById("Basic-Calculator")
let basicCalculatorButton =  document.getElementById("Basic-Button")


for(let i = 0; i<numberButton.length ; i++) 
    {
        numberButton[i].addEventListener('click',function()
            {
                console.log(this.value)
                let ButtonValue =  this.value
                if(ButtonValue === "CE")
                    {
                        screenOutput[0].textContent= ''
                        screenOutput[1].textContent= ''
                    
                    }
                else if(ButtonValue === '⌫')
                    {
                            let screenText = [screenOutput[0].textContent, screenOutput[0].textContent]
                            let screenTextBackspaced=["",""];
                            screenTextBackspaced[0] = screenText[0].slice(0,screenText[0].length-1)
                            screenTextBackspaced[1] = screenText[1].slice(0,screenText[1].length-1)
                            screenTextBackspaced[0] = screenTextBackspaced[0].trim()
                            screenTextBackspaced[1] = screenTextBackspaced[1].trim()
                            screenOutput[0].textContent = screenTextBackspaced[0]
                            screenOutput[1].textContent = screenTextBackspaced[1]
                    }
                else if(ButtonValue === '=') 
                    {
                        let expression = [screenOutput[0].textContent , screenOutput[0].textContent]
                        try {
                            expression[0] = expression[0].replaceAll("%","/100")
                            expression[1] = expression[1].replaceAll("%","/100")
                            expression[0] =  expression[0].replaceAll("sqrt(", "Math.sqrt(")
                            expression[1] =  expression[1].replaceAll("sqrt(", "Math.sqrt(")
                            expression[0] = expression[0].replaceAll("mod", "%")
                            expression[1] = expression[1].replaceAll("mod", "%")
                            let answer = [eval(expression[0]), eval(expression[0])]
                            ans = [String(answer[0]),String(answer[1])]
                            screenOutput[0].textContent = ans[0];
                            screenOutput[1].textContent = ans[1];
                            previousAnswerButton[0].textContent = ans[0]
                            previousAnswerButton[1].textContent = ans[1]
                            console.log(" the answer is : "+  ans[0] + " and the type of the variable is : " + typeof(ans[0]))
                            console.log(" the answer is : "+  ans[1] + " and the type of the variable is : " + typeof(ans[1]))
                        }
                        catch(error)
                        {
                            console.log("an error occured. error message : " + error)
                        }
                        // the reason i am printing ans instead of answer is just because i want to. i could very wel do
                        //screenOutput.textContent = answer . i decided to print ans instead of answer because the data type of
                        // answer is a number , so i decied to convert it to string to make sure everything on  the string is string 
                        // but if you do screenOutput.textContent = answer , JS will also convert it to a string so nothing changes.
                        // i just enjoy managing my data types my self. i think i don't know i am just a beginner so who am i to 
                        // know what is good or bad.
                        
                    } 
                else if(ButtonValue === "ans") 
                    {
                        screenOutput[0].textContent = screenOutput[0].textContent + previousAnswerButton[0].textContent
                        screenOutput[1].textContent = screenOutput[1].textContent + previousAnswerButton[1].textContent
                    }
                else
                    {
                        screenOutput[0].textContent = screenOutput[0].textContent + ButtonValue
                        screenOutput[1].textContent = screenOutput[1].textContent + ButtonValue 
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



