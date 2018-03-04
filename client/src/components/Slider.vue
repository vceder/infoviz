<!-- Vue-Slider from  https://github.com/NightCatSama/vue-slider-component -->
<template lang="html">
    <div class="slider-container">
        <vue-slider ref="slider" v-model="value" v-bind="options" v-on:drag-start="dragStart" v-on:drag-end="dragStop">
            <div class="tooltipSlider" style="tooltipStyles" slot="tooltip" slot-scope="{value}">
                <!-- {{value}} -->
                {{formateToolTip(value)}}
            </div>
            <!-- <div class="labelSlider" slot="label" slot-scope="{label}">


            </div> -->
             <div class="">
             </div>
        </vue-slider>
        <div class="now">
            Now
        </div>
        <div class="start">
            24 hours ago
        </div>
    </div>
</template>

<script>
import vueSlider from 'vue-slider-component';
import { mapState } from 'vuex';

var isDragged = false;

export default {
    components: {
        vueSlider
    },
    computed: {
        ...mapState(['top100']),
        ...mapState(['isLoading']),
        ...mapState(['current'])
    },
    methods: {
        getData(){
            return Object.keys(this.top100).reverse();
        },
        formateToolTip(value){
            if (!value) return "LOADING...";
            var tmp = value.slice(8);
            tmp = tmp.slice(0,2) + ":" + tmp.slice(2)
            return tmp
        },
        getIndex(value){
            if(!this.value) return "";
            var index = this.options.data.indexOf(label)
            return index
        },
        dragStart(value){
            console.log("HEJ", value)
            isDragged = true;
            console.log(isDragged)
        },
        dragStop(){
            console.log("DÅ")
            isDragged = false;
            this.$store.dispatch('updateStarCount', this.value)
        }

    },
    watch: {
        value: function () {
            // console.log("HEHEHE")
            // console.log("Value",this.value)
            if (this.value != 0) {
                // console.log(this.value)
                if (isDragged) {
                    this.$store.dispatch('updateCurrent', this.value);

                }else{
                    this.$store.dispatch('updateCurrent', this.value);
                    this.$store.dispatch('updateStarCount', this.value)
                }
            }
        },
        isLoading: function () {
            // console.log("Loading Change")
            // console.log(this.getData())
            this.options.data = this.getData()
            // console.log(this.getData()[0])
            this.value = this.options.data[this.options.data.length -1]
        },
        top100: function () {
            this.options.data = this.getData()
            // console.log(this.getData()[0])
            this.value = this.options.data[this.options.data.length -1]
        }
    },
    data () {
        return {
            value: 0,
            options: {
                data: [],
                // interval: , //Should be changed when using real data for the distrubation
                piecewise: true,
                piecewiseLabel: false,
                bgStyle: { // Base style of the slider
                    "backgroundColor": "#F7766F"
                },
                processStyle:{ // Style of what's to the left of our selector
                    "backgroundColor": "#F7766F"
                },
                tooltipStyle: {
                    "backgroundColor": "#F7766F",
                    "borderColor": "#F7766F"
                },
                sliderStyle: {
                    "backgroundColor": "#9FFF70"
                },
                piecewiseStyle: { // the "dots" when right of slider
                    "backgroundColor": "#F7766F",
                    "visability": "visable",
                    "width": "12px",
                    "height": "12px"
                },
                piecewiseActiveStyle: { //"dots" left of slider
                    "backgroundColor": "#F7766F"
                },
                labelActiveStyle: {
                    "color": "#F7766F"
                }
            }
        }
    },
    created: function () {
        // console.log(this.getData())
        // this.options.data = this.getData()
        // console.log(this.getData()[0])
        // this.value = this.getData()[0]
    },
    mounted: function () {
        // console.log(this.getData())
        this.options.data = this.getData()
        // console.log(this.getData()[0])
        // console.log("testing update of data: ", this.current.timestamp)
        // this.value = this.current
    }
}
</script>

<style lang="css">
    .slider-container {
      z-index: 100;
      position: fixed;
      bottom: 2vh;
      left: 2vw;
      width: 96vw;
      height: 6vh;
    }
    .tooltipSlider{
        display: block;
        font-size: 14px;
        white-space: nowrap;
        padding: 2px 5px;
        min-width: 20px;
        text-align: center;
        color: #fff;
        border-radius: 5px;
        border: 1px solid #9FFF70;
        background-color: #9FFF70;
    }
    .start{
        text-align: left;
        margin-left: 5px;
        color: #9FFF70;

    }
    .now{
        float: right;
        margin-right: 5px;
        color: #9FFF70;
    }
</style>
