console.log('Loaded!');

//change text
var element = document.getElementById('main-text');
element.innerHTML = 'New Value';

//move the image
var img= document.getElementById('nodi');
var marginLeft = 0;
function moveRight(){
    marginLeft = marginLeft +10;
    img.style.marginLeft = marginLeft + 'px';
}
img.onclick = function (){
    //img.style.marginleft= '100px';
    var interval = setInterval(moveRight, 100);
};