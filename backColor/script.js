const btn=document.getElementById('btn');
const color = document.querySelector(".color");

const colors=['red','blue','green','pink'];

btn.addEventListener("click", function(){
 const randomNumber = getRandomNumber();
 console.log(randomNumber);
 
 document.body.style.backgroundColor = colors[randomNumber];
 color.textContent = colors[randomNumber];

});

function getRandomNumber(){
    return Math.floor(Math.random()*colors.length);
}