console.log('Loaded!');

//change text
var element = document.getElementById('main-text');
element.innerHTML = 'New Value';

//move the image
var img= document.getElementById('nodi');
img.onclick = function (){
    img.style.marginleft= '100px';
};