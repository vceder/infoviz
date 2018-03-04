<template>
<div>
<div id="particles-js"></div>

<div class="holder">
<!-- <div class="staticHeadline">INSERT STARTCOUNT VARIABLE HERE</div>
<div class="changingValues">INSERT CHANGING VALUES HERE</div>
<div class="staticHeadline">INSERT STARTCOUNT VARIABLE HERE</div>
<div class="changingValues">INSERT CHANGING VALUES HERE</div>
<div class="staticHeadline">INSERT STARTCOUNT VARIABLE HERE</div>
<div class="changingValues">INSERT CHANGING VALUES HERE</div>
<div class="staticHeadline">INSERT STARTCOUNT VARIABLE HERE</div>
<div class="changingValues">INSERT CHANGING VALUES HERE</div> -->
<h1>This is particles (always running in App.vue)</h1>
</div>
</div>

</template>

<script>
var currentViewers = 1000; //DENNA SKA VI BYTA TILL STARCOUNT
const particlesSettings = {
    //I DENNA SKA VI ÄNDRA VALUE TILL CURRENT VIEWERS! (Max kan typ vara 10 000 annars blir det för plottrigt, så vi får göra en D3.scaleLinear eller typ en map function då antalet kommer vara typ 700 000)
    //Value area bestämmer hur många particles som visas
    "particles": {
      "number": {
        "value": currentViewers,
        "density": {
          "enable": true,
          "value_area": 100
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.8,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      //SIZE GÖR SÅ ATT STJÄRNORNA BLINKAR!
      "size": {
        "value": 0.5,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 4,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": false,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 0,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": false,
          "mode": "repulse"
        },
        "onclick": {
          "enable": false,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  }


export default {
name: 'particles',
mounted() {
    require('particles.js');
    this.$nextTick(() => {
      this.initParticles();
    });
  },
methods: {
    initParticles() {
      particlesJS('particles-js', particlesSettings);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import url(http://fonts.googleapis.com/css?family=Lato:300,400,700);

#particles-js{
  width: 100%;
  height: auto;
  overflow: scroll;
  bottom: 0;
  position: absolute;
  left:0px;
  top:0px;
  z-index: -1;
}
.holder{
    float: right;
    margin: 10% 5% 0 0;
}

.staticHeadline{
    color: white;
    font-family: Lato;
    font-weight: 300;
    font-size: 15px;
}
.changingValues{
    color:#E81B5F;
    font-family: Lato;
    font-weight: 400;
    margin-bottom: 5%;
    font-size: 20px;

}
</style>
