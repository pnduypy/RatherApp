//auto resize
const container = document.querySelector('.container');
const logo = document.querySelector('.logo').getElementsByTagName('img');

let winWidth = window.innerWidth;
let winHeight = window.innerHeight;

container.style.width = winWidth + 'px';
container.style.height = winHeight + 'px';
window.onresize = function() {
  winWidth = window.innerWidth;
  winHeight = window.innerHeight;
  container.style.width = winWidth + 'px';
  container.style.height = winHeight + 'px';
  if(winWidth < 1000){
    logo[0].src = "images/icon.png";
  }
  else{
    logo[0].src = "images/logo4.png";
    closeNav();
  }
}

//custom timer
function Timer(fn, t) {
  var timerObj = setInterval(fn, t);

  this.stop = function() {
      if (timerObj) {
          clearInterval(timerObj);
          timerObj = null;
      }
      return this;
  }

  // start timer using current settings (if it's not already running)
  this.start = function() {
      if (!timerObj) {
          this.stop();
          timerObj = setInterval(fn, t);
      }
      return this;
  }

  // start with new or original interval, stop current interval
  this.reset = function(newT = t) {
      t = newT;
      return this.stop().start();
  }
}

var cssColor = '#6689FF';
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
var rColor = hexToRgb(cssColor).r;
var gColor = hexToRgb(cssColor).g;
var bColor = hexToRgb(cssColor).b;
var mainColor = `rgb(${rColor}, ${gColor}, ${bColor})`;

//side navigation
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("mySidenav").style.borderLeft = "3px solid var(--maincolor)";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("mySidenav").style.borderLeft = "none";
}

//show/hide social tag
$('.socialNetwork').hide();

$(document).on('click', function(e) {
    if ( $(e.target).closest('#openShare').length ) {
        $(".socialNetwork").fadeIn(500);
    }else if ( ! $(e.target).closest('.socialNetwork').length ) {
        $('.socialNetwork').fadeOut(500);
    }
});

//intro slide show
var slideIndex = 1;
var translateValue = 0;
const slides = document.querySelector('.slides');

var newintroNum = '0';
var oldintroNum = '0';

var hoverObj;

addIntroEffect(slideIndex);
//--orderBtn mouse hover effect
$('.whiteBtn').on('mouseenter', function(){
  $(this).children('.blueBtn').css({'display': 'block', 'background-color': 'var(--subcolor)'});
  
  isOrderBtnHover = 1;
});

$('.whiteBtn').on('mouseleave',function () { 
  if (('intro' + newintroNum) == $(this).children('.blueBtn').attr('id')){
    $(this).children('.blueBtn').css('display', 'none');
    orderBtnSlideShow(slideIndex);
  }
  else{
    $(this).children('.blueBtn').css('display', 'none');
  }
  isOrderBtnHover = 0;
});

//--auto slide show

$('#intro'+'1').css({'display': 'block', 'background-color': 'var(--maincolor)'});
newintroNum = slideIndex.toString();
function orderBtnSlideShow(n) {
  //--auto orderBtn slide show
        if (n <4){
    newintroNum = n.toString();
    
      $('.blueBtn').each(function() {
      if ($( this ).css('display') != 'none'){
        $( this ).css('display', 'none');
      }
    });
    $('#intro' + newintroNum).css({'display': 'block', 'background-color': 'var(--maincolor)'});
  }
  else{
    newintroNum = '1';
    oldintroNum = '3';
  
    $('#intro' + newintroNum).css({'display': 'block', 'background-color': 'var(--maincolor)'});
    $('#intro' + oldintroNum).css('display', 'none');
  }
  //auto orderBtn slide show--
}

function slideTrans(n) {
  $('.slides').css({
    transitionDuration: n,
    '-webkit-transform' : 'translate(' + 0 + '%, ' + translateValue + '%)',
    '-moz-transform'    : 'translate(' + 0 + '%, ' + translateValue + '%)',
    '-ms-transform'     : 'translate(' + 0 + '%, ' + translateValue + '%)',
    '-o-transform'      : 'translate(' + 0 + '%, ' + translateValue + '%)',
    'transform'         : 'translate(' + 0 + '%, ' + translateValue + '%)'
  });
}

function addIntroEffect(n) {
  setTimeout(function() {$('#introContent'+slideIndex.toString()).css('display', 'flex');},1200);
  
  $('#introContent'+slideIndex.toString()).children('span').addClass('fadeInRight');
  $('#introContent'+slideIndex.toString()).children('.introText').addClass('fadeInLeft');
  $('#introContent'+slideIndex.toString()).children('.introBtn').addClass('fadeInUp');
}
function removeIntroEffect(n) {
  setTimeout(function() {$('#introContent'+slideIndex.toString()).css('display', 'none');},0);
  $('#introContent'+slideIndex.toString()).children('span').addClass('fadeInRight');
  $('#introContent'+slideIndex.toString()).children('.introText').addClass('fadeInLeft');
  $('#introContent'+slideIndex.toString()).children('.introBtn').addClass('fadeInUp');
}

function autoSlides() {
  
  if (slideIndex < $('.images').length)
  {  
    removeIntroEffect(slideIndex);
    slideIndex++;
    orderBtnSlideShow(slideIndex);
    translateValue -= 100;
    slideTrans('1s');   
    addIntroEffect(slideIndex);
  }
  else{
    slideIndex = 1;
    translateValue = 0;
    slideTrans('0s');
  }
  
  // $('#count').html(translateValue.toString());
}

function clickSlide(n) {
  loop.reset(5000);
  
  if (slideIndex > 3){
    translateValue = 0;//img4 -> img1
    slideTrans('0s');
    slideIndex = 1;
    setTimeout(function() {
      if (n > 1){     
        translateValue = -(n - 1)*100;
        slideTrans('1s');
        slideIndex = n;
      }
    },1); 
  }
  else{
    removeIntroEffect(slideIndex);
    translateValue = -(n - 1)*100;
    slideTrans('1s');
    slideIndex = n;
    addIntroEffect(slideIndex);
  }
  orderBtnSlideShow(n); 
  
  // $('#count').html(translateValue.toString());
}  

var loop = new Timer(autoSlides,5000);

//categories zoom effect

$('.col').css('display', 'block');
$('.list').on('click',function () { 
  const value = $(this).attr('data-filter');
  const lastValue = 'all';
  $('.list').removeClass('active');
  $(this).addClass('active');
  if (value == 'all'){

    
    $('.col').removeClass('show');
    $('.col').addClass('hide');
    setTimeout(function () {
      $('.col').css('display', 'none');
    },500); 

    setTimeout(function () {
      $('.col').css('display', 'block');
      $('.col').removeClass('hide');
      $('.col').addClass('show');
    },500); 
  }
  else{

    if (lastValue == 'all'){
      $('.col').removeClass('show');
    $('.col').addClass('hide');
    setTimeout(function () {
      $('.col').css('display', 'none');
    },500); 
    }
    else{
      $('.col').not('.'+value).removeClass('show');
      $('.col').not('.'+value).addClass('hide');
      setTimeout(function() {
        $('.col').not('.'+value).css('display', 'none');
      },500);
    }
    
    setTimeout(function () {
            $('.col').filter('.'+value).removeClass('hide');
      $('.col').filter('.'+value).addClass('show');
      $('.col').filter('.'+value).css('display', 'block');
    },500); 
    var as = 'ee';
  }
  lastValue = value;

  
});

//lightbox

function openModal() {
  document.getElementById("myModal").style.display = "flex";
}

// Close the Modal
function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

var boxIndex = 1;
showSlides(boxIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(boxIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(boxIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("myBoxs");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {boxIndex = 1}
  if (n < 1) {boxIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[boxIndex-1].style.display = "flex";
  dots[boxIndex-1].className += " active";
  captionText.innerHTML = dots[boxIndex-1].alt;
}

// $('.col').css('display', 'block');
// $('.list').on('click',function () { 
//   const value = $(this).attr('data-filter');
//   if (value == 'all'){
//     setTimeout(function () {
//       $('.col').removeClass('hide');
//       $('.col').addClass('show');
//     },000); 
//   }
//   else{
//     $('.col').not('.'+value).removeClass('show');
//     $('.col').not('.'+value).addClass('hide');
    
//     setTimeout(function() {

//     },1000);
    
//     setTimeout(function () {

//       $('.col').filter('.'+value).removeClass('hide');
//       $('.col').filter('.'+value).addClass('show');
//     },000); 
//   }
// });

//DOM
// var Img1 = 'images/ux.jpg';
// var Img2 = 'images/mobile app 1.jpg';
// var Img3 = 'images/qa 1.jpg';
// var Img4 = 'images/qa 2.jpg';
// var Img5 = 'images/qa 3.jpg';
// var Img6 = 'images/mobile app 2.jpg';
// var Img7 = 'images/custom app 1.jpg';
// var Img8 = 'images/custom app 2.jpg';

// const imgarr = new Array (Img1,Img2,Img3,Img4,Img5,Img6,Img7,Img8);

// function createDOM(filter,imgSrc) {
//   const coln = document.createElement('li');
//   coln.className = 'col';
//   coln.classList.add(filter);

//   const prjImg = document.createElement('img');
//   prjImg.src = imgSrc;

//   const prjItem = coln.appendChild(prjImg);
//   return prjItem;
// }

// function deleteDOM(filter) {
//   const coln = document.createElement('li');
//   coln.className = 'col';
//   coln.classList.add(filter);

//   const prjImg = document.createElement('img');
//   prjImg.src = imgSrc;

//   const prjItem = coln.appendChild(prjImg);
//   return prjItem;
// }
