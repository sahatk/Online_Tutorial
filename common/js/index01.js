let changeColor = function(color) {
    document.body.style.background = color;
    document.querySelectorAll('span').forEach(function(item){
        item.classList.remove('active');
    });
    event.target.classList.add('active');
}