"use strict";

const battons = document.querySelector('.battons'),
      batton = battons.querySelectorAll('.batton'),
      display = document.querySelector('.display'),
      calc = document.querySelector('.calc');

const date = new Date(),
      todaysdata = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;

      
const prise = {
    hard: 310,
    bonus: 265,
    normal: 230,
    easy: 200,
    person: 100
};      

const dataB = {
    Hard: 0,
    Bonus: 0,
    Normal: 0, 
    Easy: 0,
    Person: 0,
    All: 0,
    Sum: 0,
    Earnings: 0,
};

let dots = [];

function updateDataB() {

    if(localStorage.getItem(todaysdata)){       //  checks is today's date or not
        
        const dataA = JSON.parse(localStorage.getItem(todaysdata));
        for(let key in dataA){         //   update DataB
            dataB[key] = dataA[key];
        }
        
    }
    
}


function createDisplay() {
    const display = document.createElement('div');
    display.classList.add('display');
    calc.append(display); 

    for(let key in dataB){
        const strng = document.createElement('div');
        strng.classList.add('window-left');
        strng.setAttribute('name', key);
        display.append(strng);
        dots.push(strng);
    }

    batton.forEach(btn => {
        const name =  btn.dataset.name;
            for(let key in dataB){
                    
                if( key == name) {
                    
                        dots.forEach(item => {
                            if(item.getAttribute('name') == name){
                                    item.innerHTML = `<h1>${key}: ${dataB[key]}</h1> `;
                                    item.classList.add('active');
                                    
                            }
                        });
                }
            }
            allData();
    });
}
    

function allData() {
    
    dataB.All = dataB.Hard + dataB.Bonus + dataB.Normal + dataB.Easy + dataB.Person;

    dataB.Sum = ((dataB.Hard*prise.hard) + (dataB.Bonus*prise.bonus) + (dataB.Normal*prise.normal) + (dataB.Easy*prise.easy) + (dataB.Person*prise.person));
    
    dataB.Earnings = (dataB.Sum * 25) / 100;

    const All = document.querySelector('[name=All]');
    All.innerHTML = `<h1>количество кальянов: ${dataB.All}</h1> `;
    All.classList.add('active');

    const Sum = document.querySelector('[name=Sum]');
    Sum.innerHTML = `<h1>касса за день: ${dataB.Sum}</h1> `;
    Sum.classList.add('active');

    const Earnings = document.querySelector('[name=Earnings]');
    Earnings.innerHTML = `<h1>дневной процент: ${dataB.Earnings}</h1> `;
    Earnings.classList.add('active');

    localStorage.setItem(todaysdata, JSON.stringify(dataB));
}


batton.forEach(btn => {
    btn.addEventListener('click', (e) => {
    const name =  e.target.dataset.name;


        for(let key in dataB){
                
            if( key == name) {

                    dataB[key]++;
                    allData();
                    dots.forEach(item => {
                        if(item.getAttribute('name') == name){
                                item.innerHTML = `<h1>${key}: ${dataB[key]}</h1> `;
                                item.classList.add('active');
                                
                        }
                    });
                    
            
            
            }
        }
        
    });
});


document.querySelectorAll('.window-left').forEach(item => {     

    item.addEventListener('click', event=> {
       const name = item.getAttribute('name');

       if(dataB[name] != 0){
       dataB[name]--; 
       item.innerHTML = `<h1>${name}: ${dataB[name]}</h1> `;
    } else {
        dataB[name] = 0;
        item.innerHTML = `<h1>${name}: ${dataB[name]}</h1> `;
    }
    allData();  
    });
   
});



updateDataB(); 
createDisplay();
 






    
    




 









