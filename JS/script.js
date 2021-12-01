"use strict";

const battons = document.querySelector('.battons'),
      batton = battons.querySelectorAll('.batton'),
      display = document.querySelector('.display'),
      calc = document.querySelector('.calc');


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
const date = new Date();
const todaysdata = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
updateDataB();
function updateDataB() {
    if(localStorage.getItem(todaysdata)){
        
        const dataA = JSON.parse(localStorage.getItem(todaysdata));
        for(let key in dataA){
            dataB[key] = dataA[key];
        }
        console.log(dataB);
    }
}

let dots = [];
function allData() {
    
    dataB.All = dataB.Hard + dataB.Bonus + dataB.Normal + dataB.Easy + dataB.Person;

    dataB.Sum = ((dataB.Hard*prise.hard) + (dataB.Bonus*prise.bonus) + (dataB.Normal*prise.normal) + (dataB.Easy*prise.easy) + (dataB.Person*prise.person));
    
    dataB.Earnings = (dataB.Sum * 25) / 100;

    const All = document.querySelector('[name=All]');
    All.innerHTML = `<h1>Всео кальянов: ${dataB.All}</h1> `;
    All.classList.add('active');

    const Sum = document.querySelector('[name=Sum]');
    Sum.innerHTML = `<h1>касса за день: ${dataB.Sum}</h1> `;
    Sum.classList.add('active');

    const Earnings = document.querySelector('[name=Earnings]');
    Earnings.innerHTML = `<h1>зароботок: ${dataB.Earnings}</h1> `;
    Earnings.classList.add('active');

    localStorage.setItem(todaysdata, JSON.stringify(dataB));
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
        
        
    }
    


createDisplay();

batton.forEach(btn => {
    btn.addEventListener('click', (e) => {
    const name =  e.target.dataset.name;


        for(let key in dataB){
                
            if( key == name) {

                    dataB[key]++;
                    allData();
                    console.log(dataB.Sum);
                    console.log(dataB.Earnings);

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



    

    
    




 

// <div class="window-left" data-name="Hard">
// <div class="delete"></div>


// batton[0].addEventListener('click', (e) => {
//     dataB.Hard++;
//     allData();

//     windowLeft[0].innerHTML = `<h1>Hard: ${dataB.Hard}</h1> `;
//     windowLeft[0].

    
    
// });

// batton[1].addEventListener('click', (e) => {
//     dataB.Bonus++;
//     allData();
//     windowLeft[1].innerHTML = `<h1>Bonus: ${dataB.Bonus}</h1>`;
//     windowLeft[1].classList.add('active');
// });

// batton[2].addEventListener('click', (e) => {
//     dataB.Normal++;
//     allData();
//     windowLeft[2].innerHTML = `<h1>Normal: ${dataB.Normal}</h1>`;
//     windowLeft[2].classList.add('active');
// });

// batton[3].addEventListener('click', (e) => {
//     dataB.Easy++;
//     allData();
//     windowLeft[3].innerHTML = `<h1>Easy: ${dataB.Easy}</h1>`;
//     windowLeft[3].classList.add('active');

// });

// batton[4].addEventListener('click', (e) => {
//     dataB.Person++;
//     allData();
//     windowLeft[4].innerHTML = `<h1>Person: ${dataB.Person}</h1>`;
//     windowLeft[4].classList.add('active');
    
// });

// batton.forEach((i)=> {
//     i.addEventListener('click', (e) => {
    
//         allData();
//         windowRight.innerHTML = `<h1>All: ${dataB.All}</h1>`;
//         windowRight.classList.add('active');
        
//     });
// })








