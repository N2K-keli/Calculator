let numberButton = document.getElementsByClassName("Number-Button")
let screenOutput =  document.getElementById("Basic-Calculator-Screen-Answer")
let clearButton =  document.getElementById("Clear")
let backspaceButton = document.getElementById("Backspace");


for(let i = 0; i<numberButton.length ; i++) 
    {
        numberButton[i].addEventListener('click',function()
            {
                console.log(this.value)
                let ButtonValue =  this.value
                if(ButtonValue === "CE")
                    {
                        screenOutput.textContent= ''
                    
                    }
                else if(ButtonValue === '⌫')
                    {
                            let screenText = screenOutput.textContent
                            let screenTextBackspaced="";
                            screenTextBackspaced = screenText.slice(0,screenText.length-1)
                            screenTextBackspaced = screenTextBackspaced.trim()
                            screenOutput.textContent = screenTextBackspaced
                    }
                else if(ButtonValue === '=') 
                    {
                        let expression = screenOutput.textContent
                        try {
                            let answer = eval(expression)
                            ans = String(answer)
                            screenOutput.textContent = ans;
                            console.log(" the answer is : "+  ans + " and the type of the variable is : " + typeof(ans))
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
                else if(ButtonValue === '%')
                {
                    let percentageValue = eval(screenOutput.textContent)
                    try
                    {
                        percentageValue = (Number(percentageValue))
                        let ans = percentageValue / 100
                        screenOutput.textContent =  ans
                    }
                    catch(error)
                    {
                        console.log("an error occuerd" + error.message)
                    }
                }
                else
                    {
                        screenOutput.textContent = screenOutput.textContent + ButtonValue 
                    }
            });
    }



