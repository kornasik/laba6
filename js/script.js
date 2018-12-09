'use strict';

var wrap = document.body.querySelector('.wrapper');
var script = document.createElement('SCRIPT');
script.src = "https://api.vk.com/method/photos.get?owner_id=-37512548&album_id=164359161&access_token=b90de1bdb90de1bdb90de1bdf8b96aa58abb90db90de1bde50e1574bb91f26336ad6d70&v=5.92&count=108&callback=createImg";
document.head.appendChild(script);

window.onload = function() {
 var loader = document.querySelector('.loader');
 loader.style.display = 'none';
}

function createImg(result) {
    for (var i = 0; i < result.response.items.length; i++) {
        var imageBlock = document.createElement('div');
        imageBlock.classList = 'image';
        var img = document.createElement('img');
        img.classList = [i];
        img.src = result.response.items[i].sizes[3].url;
        imageBlock.appendChild(img);

        var slider = document.querySelector('#slider');
        var wrapSlider = document.querySelector('.wrapperSlider')
        var imgLi = document.createElement('li');
        imgLi.classList = 'slide';
        var imgTwo = document.createElement('img');
        imgTwo.classList = [i];
        imgTwo.src = result.response.items[i].sizes[7].url;
        imgLi.appendChild(imgTwo);
        slider.appendChild(imgLi);

        wrap.appendChild(imageBlock);


        imageBlock.addEventListener('click', function (evt) {
            var podlogka = document.querySelector('#podlogka');

            wrapSlider.style.display = 'block';
            podlogka.style.display = 'block';
            var next = document.getElementById('next');
            var prew = document.getElementById('prew');

            var slides = document.getElementsByClassName('slide');
            for (var j = 0; j < slides.length; j++) {
                slides[j].classList = 'slide';
            }
            slides[evt.target.className].classList = 'slide active';
            for (var i = evt.target.className; i < slides.length; i++) {
                slides[i].style.zIndex = slides.length - i;
            }

            next.addEventListener('click', function () {
                var activeEl = document.querySelector('.active');
                if (activeEl.nextElementSibling) {
                    activeEl.style.left = "-100%";
                    activeEl.classList.remove('active');
                    activeEl.nextElementSibling.classList.add('active');
                    this.classList.remove('no_active');
                    prew.classList.remove('no_active');
                    if (!activeEl.nextElementSibling.nextElementSibling) {
                        this.classList.add('no_active');
                    }
                }
            })


            prew.addEventListener('click', function () {
                var activeEl = document.querySelector('.active');
                if (activeEl.previousElementSibling) {
                    activeEl.previousElementSibling.style.left = "0%";
                    activeEl.classList.remove('active');
                    activeEl.previousElementSibling.classList.add('active');
                    activeEl.previousElementSibling.style.zIndex = parseInt(activeEl.style.zIndex) + 1;
                    this.classList.remove('no_active');
                    next.classList.remove('no_active');
                    if (!activeEl.previousElementSibling.previousElementSibling) {
                        this.classList.add('no_active');
                    }
                }
            })


            var close = document.querySelector('.close');
            close.addEventListener('click', function () {
                for (var i = 0; i < slides.length; i++) {
                    slides[i].style.zIndex = '';
                    slides[i].classList = 'slide';
                    slides[i].style = '';
                }
                wrapSlider.style.display = 'none';
                podlogka.style.display = 'none';
            })


        })

    }
}