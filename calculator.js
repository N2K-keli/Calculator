let numberButton = document.getElementsByClassName("Number-Button")
let screenOutput =  document.getElementById("Basic-Calculator-Screen-Answer")
let clearButton =  document.getElementById("Clear")

for(let i = 0; i<numberButton.length ; i++) 
    {
        numberButton[i].addEventListener('click',function()
            {
                console.log(this.value)
                let ButtonValue =  this.value
                
                screenOutput.textContent = screenOutput.textContent + ButtonValue 
                
                    
            });
    }

clearButton.addEventListener('click',function()
{
    screenOutput.textContent = ""
})




