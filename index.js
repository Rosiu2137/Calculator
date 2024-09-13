const time = document.querySelector("#time");
const buttonsContainer = document.querySelector(".buttonsContainer")
const result = document.querySelector("#result")

let array1 = []
let array2 = []
let operation = null

const checkCharactersCount = ()=>
{
    if(result.innerHTML.length > 8)
    {
        result.style.fontSize = `${result.clientWidth/result.innerHTML.length*2.2}px`
    }
    else
    {
        result.style.fontSize = `15vh`
    }

}

const count = (operate)=>
    {
        console.log("dsfdf")
        if(array1.length > 0 && array2.length >0 && array2.at(-1) != '-')
        {
            if(array2.at(-1) == ',')
            {
                array2.pop()
            }
            const firstNumber = Number(array1.join('').replace(',','.'))
            const secondNumber = Number(array2.join('').replace(',','.'))
            switch(operation)
            {
                case "+":
                    array1 = (String(Math.round((firstNumber+secondNumber)*10000)/10000).replace(".",',')).split('')
                    break
                case "-":
                    array1 = (String(Math.round((firstNumber-secondNumber)*10000)/10000).replace(".",',')).split('')
                    break
                case 'X':
                    array1 = (String(Math.round((firstNumber*secondNumber)*10000)/10000).replace(".",',')).split('')
                    break
                case ':':
                    array1 = (String(Math.round((firstNumber/secondNumber)*10000)/10000).replace(".",',')).split('')
                    break
            }
            array2 = []
            if(operate)
            {
                operation = operate

            }
            else
            {
                operation = null
            }
            displayNumbers()
            checkCharactersCount()
        }
    }

const plusClicked = ()=>
{
    if(array1.at(-1) != '-')
    {
        if(array1.length > 0 && array2.length == 0)
        {
            operation = '+'
            if(array1.at(-1) == ',')
            {
                array1.pop()
            }
        }
        else if(array1.length > 0 && array2 > 0)
        {
            count('+')
        }
    }
    
}

const minusClicked = ()=>
{
    if(array1.length == 0)
    {
        array1.push('-')
    }
    else if(array1.length > 0 && array2.length == 0)
    {
        if(!operation)
        {
            operation = '-'
        }
        else
        {
            array2.push('-')
        }

        if(array1.at(-1) == ',')
        {
            array1.pop()
        }
    }
    else if(array1.length > 0 && array2 > 0)
    {
        count('-')
    }
}

const multiplicationClicked = () =>
{
    if(array1.at(-1) != '-')
    {
        if(array1.length > 0 && array2.length == 0)
            {
                operation = 'X'
                if(array1.at(-1) == ',')
                {
                    array1.pop()
                }
            }
            else if(array1.length > 0 && array2 > 0)
            {
                count('X')
            }
    }
    
}


const divideClicked = ()=>
{
    if(array1.at(-1) != '-')
    {
        if(array1.length > 0 && array2.length == 0)
            {
                operation = ':'
                if(array1.at(-1) == ',')
                {
                    array1.pop()
                }
            }
            else if(array1.length > 0 && array2 > 0)
            {
                count(':')
            }
    }
    
}

const dotClicked = ()=>{
    if(!operation)
    {
        console.log(array1)
        if(!array1.includes(","))
        {
            if(array1.length == 0 || (array1.length == 1 && array1[0] == '-'))
            {
                array1.push('0',',')
            }
            else
            {
                array1.push(',')
            }
        }
    }
    else
    {
        if(!array2.includes(","))
        {
            if(array2.length == 0 || (array2.length == 1 && array2[0] == '-'))
            {
                array2.push('0',',')
            }
            else
            {
                array2.push(',')
            }
        }
    }
    
    
}

const removeFirstZeros = ()=>
{
    if(!operation)
    {
        if(array1.length > 1)
        {
            if(array1[0] == 0 && array1[1] != ",")
            {
                array1.splice(0,1)
            }
        }
    }
    else
    {
        if(array2.length > 1)
        {
            if(array2[0] == 0 && array2[1] != ",")
            {
                array2.splice(0,1)
            }
        }
    }
}

const displayNumbers = ()=>
{
    
    removeFirstZeros()

    if(array1.length == 0)
    {
        result.innerHTML = `0`
    }
    else if(operation)
    {
        if(array2.length > 0)
        {
            result.innerHTML = `${array1.join('')}${operation}${array2.join('')}`
        }
        else
        {
            result.innerHTML = `${array1.join('')}${operation}`
        }
    }
    else
    {
        result.innerHTML = array1.join('')
    }   
    checkCharactersCount()
}

const resetClicked = ()=>
{   
    array1 = []
    array2 = []
    operation = null
    result.innerHTML = `0`
}

const checkFunc = (e)=>
{
    if(+e.target.value || e.target.value == 0)
    {
        if(!operation)
        {
            array1.push(e.target.value)
        }
        else
        {
            array2.push(e.target.value)
        }
    }
    else
    {
        switch(e.target.value)
        {
            case "plus":
                plusClicked()
                break
            case "minus":
                minusClicked()
                break
            case "multiplication":
                multiplicationClicked()
                break
            case "divide":
                divideClicked()
                break
            case "dot":
                dotClicked()
                break
            case "equals":
                count()
                break
            case "reset":
                resetClicked()
                break
        }
    }
    displayNumbers()
    
}

buttonsContainer.addEventListener("click",checkFunc)


function timeCounter()
{
    let timeNow = new Date()

    time.innerHTML = timeNow.toLocaleTimeString('pl')
}

setInterval(timeCounter,1000)
timeCounter()




