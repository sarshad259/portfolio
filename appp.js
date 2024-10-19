const cars = [
    { src: "./img/car1.avif", heading: "LAMBORGHINI" },
    { src: "./img/car2.jpg", heading: "FERARRI" },
    { src: "./img/car3.jpg", heading: "PORSCHE" },
    { src: "./img/car4.jpg", heading: "KOINEGSEGG" },
    { src: "./img/car5.jpg", heading: "BUGATTI" }
  ];
  
  const loader = document.querySelector("#loader");
  
  let currind = 0;
  let mainImage = document.querySelector("#mainimg");
  let nextImage = document.querySelector("#nextimg");
  let heading = document.querySelector("#heading");
  let isFirstImageChange = true;
  
  function updateImage(index) {
    mainImage.classList.add("fade-out");
    nextImage.src = cars[index].src;
    nextImage.classList.add("fade-in");
    setTimeout(() => {
      if (isFirstImageChange) {
        detypeText(cars[index].heading);
      } else {
        typeText(cars[index].heading);
      }
      mainImage.src = cars[index].src;
      mainImage.classList.remove("fade-out");
      nextImage.classList.remove("fade-in");
    }, 1000);
  }
  
  function typeText(text) {
    heading.textContent = "";
    let i = 0;
    let interval = setInterval(() => {
      if (i < text.length) {
        heading.textContent += text[i];
        i++;
      } else {
        clearInterval(interval);
      }
    }, 50);
  }
  
  function detypeText(text) {
    let i = text.length - 1;
    let interval = setInterval(() => {
      if (i >= 0) {
        heading.textContent = heading.textContent.substring(0, i);
        i--;
      } else {
        clearInterval(interval);
        typeText(text);
      }
    }, 50);
  }
  
  mainImage.src = cars[currind].src;
  typeText(cars[currind].heading);
  
  const previous = document.querySelector("#previous");
  const next = document.querySelector("#next");
  
  previous.addEventListener('click', () => {
    currind = (currind > 0) ? currind - 1 : cars.length - 1;
    updateImage(currind);
  });
  
  next.addEventListener('click', () => {
    currind = (currind < cars.length - 1) ? currind + 1 : 0;
    updateImage(currind);
  });