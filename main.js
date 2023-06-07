// http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={API key}
// http://api.openweathermap.org/data/2.5/solar_radiation?lat={lat}&lon={lon}&appid={API key}
// https://history.openweathermap.org/data/2.5/aggregated/year?lat=35&lon=139&appid={API key}
// https://api.openweathermap.org/data/2.5/roadrisk?appid={API key}
audio = new Audio('song/rain.mp3')
function hide()
{
   let btn = document.getElementById('btn1');
   let para = document.getElementById('para')
  
   btn.addEventListener('click', function run()
   {
    //    alert('read me');
    if(para.style.display != 'none')
   {
    para.style.display = 'none';
   }
   else if(para.style.display == 'none'){
    para.style.display = 'block';
   }

   })
   

}

const weatherapi ={
    key: "6ab256a6cd7f1de9144e881ee82015c3",
    baseurl0: "http://api.openweathermap.org/data/2.5/forecast" ,  //done
    baseurl1: "http://api.openweathermap.org/geo/1.0/direct",     //done
    baseurl2: "http://api.openweathermap.org/data/2.5/air_pollution",  //done
    baseurl3: "http://api.openweathermap.org/data/2.5/solar_radiation",   //
    baseurl4: "https://history.openweathermap.org/data/2.5/aggregated/year"   //
}
const searchinputbox = document.getElementById('input-box');

searchinputbox.addEventListener('keypress',(event) =>
{
    
     if(event.keyCode == 13){
       console.log(searchinputbox.value);
       getWeatherReport(searchinputbox.value);
      
     }
})


function getWeatherReport(city)
{
    fetch(`${weatherapi.baseurl1}?q=${city}&appid=${weatherapi.key}&units=metric`)
    .then((weather) =>
        {
            return weather.json();
        }).then(showweatherreport);
}
//show
 function showweatherreport(asg)
{
    console.log(asg)
    const lat = asg[0].lat;
    const lon = asg[0].lon;
    console.log(lat)
    console.log(lon)
    let p = fetch(`${weatherapi.baseurl2}?lat=${lat}&lon=${lon}&appid=${weatherapi.key}`)
    p.then((value1) =>{
       return value1.json();
    }).then((value2) =>{
       aqi(value2);
    });
    fetch(`${weatherapi.baseurl0}?lat=${lat}&lon=${lon}&appid=${weatherapi.key}&units=metric`)
    .then(weather2 =>
      {
          //console.log( weather2.json());
          return weather2.json();
      }).then(showweatherreport1)

    //   let p1 = fetch(`${weatherapi.baseurl4}?lat=${lat}&lon=${lon}&appid=${weatherapi.key}`)
    //   p1.then((value3) =>{
    //      return value3.json();
    //   }).then((value4) =>{
    //      console.log(value4)
    //   });
}

function showweatherreport1(weather)
{
    console.log(weather)



    let city = document.getElementById('city');
    city.innerText = `${weather.city.name},${weather.city.country}`;

    let tempra = document.getElementById('temp')
    tempra.innerHTML = `${Math.round(weather.list[0].main.temp)}°C`

    let minmax = document.getElementById('min-max')
    minmax.innerText = `${Math.floor(weather.list[0].main.temp_min)}°C(min)/${Math.ceil(weather.list[0].main.temp_max)}°C(max)`

    let weathertype = document.getElementById('weather')
     weathertype.innerText =`${weather.list[0].weather[0].main}`

    

    let date  = document.getElementById('date')
    let todaydate = new Date();
    date.innerText = datemessage(todaydate);

    let img = document.getElementById('img')
    // img.innerHTML= `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />`

    if(weathertype.textContent == 'Mist || Fog')
    {
        img.innerHTML= `<img src="icons/fog.png" height= 100px ,width= 100px>`
        // document.background.style.background-Image; "url('../icons/storm.png')";
        let xo = document.getElementById('home');
         xo.style.backgroundImage = 'url("background/Mist.jpg")';
    }
    if(weathertype.textContent == 'Clouds')
    {
        img.innerHTML= `<img src="icons/cloudy.png" height= 100px ,width= 100px>`
        // document.background.style.background-Image; "url('../icons/storm.png')";
        let xo = document.getElementById('home');
         xo.style.backgroundImage = 'url("background/cloudy.jpg")';
        //  xo.innerHTML = `<audio> <source src="song/rain-01.mp3" type="audio/mpeg"/></audio>`
         
    }
    if(weathertype.textContent == 'Clear')
    {
        img.innerHTML= `<img src="icons/clear.png" height= 100px ,width= 100px>`
        let xo = document.getElementById('home');
         xo.style.backgroundImage = 'url("background/clear.jpg")';
         
    }
    if(weathertype.textContent == 'Snow')
    {
        img.innerHTML= `<img src="icons/snow.png" height= 100px ,width= 100px>`
        // document.background.style.background-Image; "url('../icons/storm.png')";
        let xo = document.getElementById('home');
         xo.style.backgroundImage = 'url("background/snow.jpg")';
    }
    if(weathertype.textContent == 'Thunderstorm')
    {
        img.innerHTML= `<img src="icons/thunderstorm.png" height= 100px ,width= 100px>`
        // document.background.style.background-Image; "url('../icons/storm.png')";
        let xo = document.getElementById('home');
         xo.style.backgroundImage = 'url("background/thunderstorm.jpg")';
    }
    if(weathertype.textContent == 'Rain')
    {
        img.innerHTML= `<img src="icons/rain.png" height= 100px ,width= 100px>`
        // document.background.style.background-Image; "url('../icons/storm.png')";
        let xo = document.getElementById('home');
         xo.style.backgroundImage = 'url("background/rain.jpg")';
         audio.play()
    }

      let feel = document.getElementById("feel")
      feel.innerText = `${Math.round(weather.list[0].main.feels_like)}`
      let hum = document.getElementById("Humidity")
      hum.innerText = `${weather.list[0].main.humidity}%`
      let press = document.getElementById("pressure")
      press.innerText = `${weather.list[0].main.pressure}mbar`
      let wind= document.getElementById("wind")
      wind.innerText = `${weather.list[0].wind.speed}M/sec`;
     let max1 = document.getElementById('max1')
     let max2 = document.getElementById('max2')
     let max3 = document.getElementById('max3')
     let max4 = document.getElementById('max4')
     let max5 = document.getElementById('max5')
     let week1 = document.getElementById('week1')
     let week2 = document.getElementById('week2')
     let week3 = document.getElementById('week3')
     let week4 = document.getElementById('week4')
     let week5 = document.getElementById('week5')
     max1.innerHTML = `${Math.floor(weather.list[6].main.temp_min)}°C(min)/${Math.ceil(weather.list[6].main.temp_max)}°C(max)`
     max2.innerHTML = `${Math.floor(weather.list[16].main.temp_min)}°C(min)/${Math.ceil(weather.list[16].main.temp_max)}°C(max)`
     max3.innerHTML = `${Math.floor(weather.list[22].main.temp_min)}°C(min)/${Math.ceil(weather.list[22].main.temp_max)}°C(max)`
     max4.innerHTML = `${Math.floor(weather.list[31].main.temp_min)}°C(min)/${Math.ceil(weather.list[31].main.temp_max)}°C(max)`
     max5.innerHTML = `${Math.floor(weather.list[37].main.temp_min)}°C(min)/${Math.ceil(weather.list[37].main.temp_max)}°C(max)`
     let img1 = weather.list[6].weather[0].main;
     let img2 = weather.list[16].weather[0].main;
     let img3 = weather.list[22].weather[0].main;
     let img4 = weather.list[31].weather[0].main;
     let img5 = weather.list[37].weather[0].main;
     console.log(img1)
     
    
     let im = document.getElementById('img1')
     im.innerHTML= printimage(img1)
 
     
     let im2 = document.getElementById('img2')
     im2.innerHTML= printimage(img2)

     
     let im3 = document.getElementById('img3')
     im3.innerHTML= printimage(img3)
     
     let im4 = document.getElementById('img4')
     im4.innerHTML= printimage(img4)
 
 
     let im5 = document.getElementById('img5')
     im5.innerHTML= printimage(img5)
    //  const mylist = []
     let days1 = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
     let today = new Date()
    
let x = today.getDay()
let names =  new Array(5)
x = x+1;
for(let i =0;i<5;i++)
{
    if(x>6)
    x=0;
    if(x<=6){
    names[i]=x;
    x++;
    }
}
      
   
    week1.innerText = days1[names[0]]
     week2.innerText = days1[names[1]]
     week3.innerText =days1[names[2]]
    week4.innerText = days1[names[3]]
     week5.innerText =days1[names[4]]
    
    
   console.log("hii")

    let sunrise = weather.city.sunrise;
    let sunset = weather.city.sunset;
    const datesun = new Date(sunset);
    let sunrise1 = document.getElementById('sunrise')
    let sunset1 = document.getElementById('sunset')
    sunrise1.innerHTML = `5:57`
    sunset1.innerHTML = `6:23`
console.log(datesun);

    
}
 function datemessage(datearg)
 {
    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    let months = ['January','February','March','April','May','June','July','August','September','October','November','December']

    let year = datearg.getFullYear();
    let month = months[datearg.getMonth()]
    let date = datearg.getDate()
    let day = days[datearg.getDay()]

    return `${date} ${month} (${day}), ${year}`;
 }

 function printimage(asm)
 {
    if(asm == 'Clouds')
    {
        
       return `<img src="icons/cloudy.png" height= 80px ,width= 80px>`
    }
    if(asm == 'Mist || Fog')
    {
       return `<img src="icons/fog.png" height= 80px ,width= 80px>`
    }
    if(asm == 'Clear')
    {
        return `<img src="icons/clear.png" height= 80px ,width= 80px>`
    }
    if(asm == 'Snow')
    {
        return`<img src="icons/snow.png" height= 80px ,width= 80px>`
    }
    if(asm == 'Rain')
    {
        return `<img src="icons/rain.png" height= 80px ,width= 80px>`
    }
     if(asm == 'Thunderstorm')
    {
        return `<img src="icons/thunderstorm.png" height= 80px ,width= 80px>`
    }
//     let p = fetch(`${weatherapi.baseurl2}?lat=${lat}&lon=${lon}&appid=${weatherapi.key}`)
//  p.then((value1) =>{
//     return value1.json();
//  }).then((value2) =>{
//     console.log(value2);
//  })
 }
//  function run (){
//  let p = fetch(`${weatherapi.baseurl2}?lat=${lat}&lon=${lon}&appid=${weatherapi.key}`)
//  p.then((value1) =>{
//     return value1.json();
//  }).then((value2) =>{
//     console.log(value2);
//  })
// }

function aqi(asg)
{
    console.log(asg)
    console.log(asg.list[0].main.aqi)
    let aqi = document.getElementById('aqi')
    aqi.innerHTML =`AQI - ${ asg.list[0].main.aqi}`;
    // let para = document.getElementById('para');
    para.innerHTML = `Having <b>PM2.5=${asg.list[0].components.pm2_5}</b>, <b>PM10=${asg.list[0].components.pm10}</b>,
    CO=${asg.list[0].components.co}, NO=${asg.list[0].components.no}, NO2=${asg.list[0].components.no2}, O3=${asg.list[0].components.o3}, SO2=${asg.list[0].components.so2}`
    // para.innerText = `co=asg.`
}