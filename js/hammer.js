// HAMMER
delete Hammer.defaults.cssProps.userSelect;
const $body = document.querySelector('body');
const hammerjs = new Hammer($body);

hammerjs.on("panleft panright",function(e){
    if(e.pointerType === 'touch'){
        if(e.type === 'panleft' && e.distance >100){
            dom.tasks.form_container.classList.add('active');
        }
        if(e.type === 'panright' && e.distance >100){
            dom.tasks.form_container.classList.remove('active');
        }
    }

})