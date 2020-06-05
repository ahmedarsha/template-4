/*********** Scroll To Top   ************/
let scrollTop = document.querySelector(".scrollTop");
scrollTop.addEventListener("click",function(){
    //window.scrollTo(0,0);
    document.getElementById("home").scrollIntoView({
        behavior:"smooth"
    });
});

/* smoth scroll to section when click on bullets */
let bullets = document.querySelector(".nav-bullets"),
    sectionBullet = document.querySelectorAll(".nav-bullets .bullet"); 
sectionBullet.forEach(bullet => {
    bullet.addEventListener("click", (e)=>{
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior:"smooth"
        });
    });
});
// check if the local storage contains option-bullet
let optionBullets = localStorage.getItem("option-bullet");
 if(optionBullets !== null){
     
    document.querySelectorAll(".option-bullets .active").forEach(bullet => {
        // Remove Class Active From All span
        bullet.classList.remove("active");
    });
    if(optionBullets === "true"){
        document.querySelector(".option-bullets .yes").classList.add("active");
        bullets.style.display = "block" ;
    }else{
        document.querySelector(".option-bullets .no").classList.add("active");
        bullets.style.display = "none" ;
    } 
}
/* show / hidden the option bullets */
document.querySelectorAll(".option-bullets span").forEach( ele =>{
    ele.addEventListener("click",function(e){
        // Remove Class Active From All span
        e.target.parentElement.querySelectorAll(".active").forEach(ele =>{
            ele.classList.remove("active");
        });
        if(e.target.classList.contains("yes")){
            bullets.style.display = "block" ;
            document.querySelector(".option-bullets .yes").classList.add("active");
            localStorage.setItem("option-bullet",true);
            
        }else{
            bullets.style.display = "none" ;
            document.querySelector(".option-bullets .no").classList.add("active");
            localStorage.setItem("option-bullet",false);
        }
    });
});


/*check if there's color choosed storage in local*/
const colorsList = document.querySelectorAll(".option-colors li");
let mainColor = localStorage.getItem("favColor");
if(mainColor !== null){
    /* Change The Main Color Of Page to The Choosed Color */
    document.documentElement.style.setProperty("--main-color",mainColor);
    // loop for all colors items
    colorsList.forEach(li =>{
        // Remove Class Active From All List Colors
        li.classList.remove("active");
        // check if main color equlal to data color of this element   
        if(li.dataset.color === mainColor)
            // Add Class Active To The choosed color
            li.classList.add("active");
    });
}

/* Change the Image of Header's background every 10s */
const bgImageList = document.querySelectorAll(".option-bgImages span");
let optionBgImg = localStorage.getItem("bgOption"),
    bgInterval;
let header = document.querySelector("header"),
    bgImages = ["bg-01","bg-03","bg-05","bg-07","bg-09","bg-10"];
function randomBgImage(){    
    bgInterval = setInterval( ()=>{
        let randomeNum = Math.floor(Math.random()*bgImages.length);
        header.style.backgroundImage = "url(images/"+bgImages[randomeNum]+".jpg)";
    },10000);    
}    
if(optionBgImg !== null){
    bgImageList.forEach(span => {
        // Remove Class Active From All span
        span.classList.remove("active");
    });
    if(optionBgImg === "true"){
        randomBgImage(bgInterval);
        document.querySelector(".option-bgImages .yes").classList.add("active");
    }else{
        clearInterval(bgInterval);
        document.querySelector(".option-bgImages .no").classList.add("active");
    } 
}
/* Swich Off/On The Random Background Image */
bgImageList.forEach(span => {
    span.addEventListener("click",function(){
        // Remove Class Active From All span
        this.parentElement.querySelectorAll(".active").forEach(ele =>{
            ele.classList.remove("active");
        });
        // Add Class Active To The choosed span
        this.classList.add("active");
        // Swich on If User Choose Yes  
        if(this.classList.contains("yes")){
            randomBgImage();
            localStorage.setItem("bgOption",true);
        // Swich on If User Choose No  
        }else{
            clearInterval(bgInterval);
            localStorage.setItem("bgOption",false);
        }
    });
    
});

/* Show and hidden The Setting Box Option */
let toggleMenu = document.querySelector(".toggle-menu .fa-cog");
toggleMenu.onclick = function(){
    this.classList.toggle("fa-spin");
    document.querySelector(".box-options").classList.toggle("open");
};

/* Change The Main Color Of Page to The selected Color */
colorsList.forEach(li => {
    li.style.backgroundColor = li.dataset.color;
    li.addEventListener("click",function(){
        /* Change The Main Color Of Page to The Choosed Color */
        document.documentElement.style.setProperty("--main-color",this.dataset.color);
        /* set the choosed favorite color in the local storage*/
        localStorage.setItem("favColor",this.dataset.color);
        // Remove Class Active From All List Colors
        this.parentElement.querySelectorAll(".active").forEach(ele =>{
            ele.classList.remove("active");
        });
        // Add Class Active To The choosed color
        this.classList.add("active");
    });    
});

/* show and hidden the navbar*/
document.querySelector(".navbar-menu .navbar-toggle .fa-bars").onclick = function(e){
    e.target.parentElement.parentElement.classList.toggle("open");
};

/* smoth scroll to the section that has class active*/
let navLink = document.querySelectorAll(".navbar-nav li a"); 
navLink.forEach( link =>{
    link.onclick = function(e){
        e.preventDefault();
        /* remove class active from all links*/
        e.target.parentElement.parentElement.querySelectorAll(".active").forEach(ele =>{
            ele.classList.remove("active");
        });
        /* add class active to the selected link */
        e.target.parentElement.classList.add("active");
        secID = document.querySelector(e.target.attributes.href.value);
        if(secID !== null){
           // scrollTo(0,secID.offsetTop);
            secID.scrollIntoView({
                behavior:"smooth"
            });
        }
    };
});

/* create popup when selecte the image */
document.querySelectorAll(".box-gallery img").forEach(img => {
    img.onclick = function(){
        //create oveley with class popup-overley when click on eny image
        let overley = document.createElement("div");
        overley.className = "overley popup-overley";
        // add the overley inside the body
        document.body.appendChild(overley);
        //create popup with class popup-box
        let popupBox = document.createElement("div");
        popupBox.className = "popup-box";
        //create the title of popup
        if(img.alt !== null){
            let popupTitle =document.createElement("h3"),
                //create the text title of popup
                titleText = document.createTextNode(img.alt);
            popupTitle.appendChild(titleText);
            popupBox.appendChild(popupTitle);
        }
        //clone this image
        let popupImg = document.createElement("img");
        popupImg.src =this.src;
        //create close icone 
        let popupClose = document.createElement('i');
        popupClose.className = "fa fa-times";
        //add this image to the popup
        popupBox.appendChild(popupImg);
        popupBox.appendChild(popupClose);
        //add the popup to the body
        document.body.appendChild(popupBox);
        // close the popup
        popupClose.addEventListener("click",function(e){
            e.target.parentNode.remove();
            document.querySelector(".popup-overley").remove();
        });
    };
});

/* While Scroll The Window*/
 window.onscroll = function(){
    /* show/hidden the button scrollToTop */
    if(this.pageYOffset > 1000 ){
        scrollTop.style.visibility = "visible";
        scrollTop.style.opacity = 1;
    }else{
        scrollTop.style.visibility = "hidden";
        scrollTop.style.opacity = 0;
    }
    
    /* set the navBar fixed */
    let navbar = document.querySelector(".navbar");
    if(this.pageYOffset > 1){
        navbar.classList.add("fixed");
    }else{
        navbar.classList.remove("fixed");
    }
    
    /* sync the bullets with it's section*/
    document.querySelectorAll(".section").forEach(sec =>{
        secID = document.getElementById(sec.id);  
        if(this.pageYOffset >= secID.offsetTop){
            let navBullet = document.querySelector(".nav-bullets .bullet[data-section='#"+sec.id+"']"); 
             if(navBullet !== null){
                // remove class active from all bullets
                navBullet.parentElement.querySelectorAll(".active").forEach(ele =>{
                    ele.classList.remove("active");
                });
                // add class active to link of this section
                navBullet.classList.add("active");
            }
        }              
    });
    
    /* sync the links with it's section*/
    document.querySelectorAll(".section").forEach(sec =>{
        secID = document.getElementById(sec.id);  
        if(this.pageYOffset >= secID.offsetTop){
            let navLink = document.querySelector(".navbar-nav li a[href='#"+sec.id+"']");
            if(navLink !== null){
                /* remove class active from all links*/
                navLink.parentElement.parentElement.querySelectorAll(".active").forEach(ele =>{
                    ele.classList.remove("active");
                });
                /* add class active to link of this section*/
                navLink.parentElement.classList.add("active");
            }
        }              
    });
    
    /* animate the width of progress when scrolled   */
    let mySkill = document.querySelector(".skills"),
        myProgPercent = document.querySelectorAll(".skills .skill-progress .prog-percent span");
    if(this.pageYOffset >= mySkill.offsetTop){
        myProgPercent.forEach(span =>{
            span.style.width = span.dataset.percent;
            span.innerHTML = span.dataset.percent;
        });
    } 
 };