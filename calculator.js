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
                        screenOutput.textContent= ""
                    
                    }
                else if(ButtonValue === '⌫')
                    {
                            let screenText = screenOutput.textContent
                            let screenTextBackspaced="";
                            screenTextBackspaced = screenText.slice(0,screenText.length-1)
                            screenTextBackspaced = screenTextBackspaced.trim()
                            screenOutput.textContent = screenTextBackspaced
                    }
                else
                    {
                        screenOutput.textContent = screenOutput.textContent + ButtonValue 
                    }
            });
    }



