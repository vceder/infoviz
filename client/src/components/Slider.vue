<!-- Vue-Slider from  https://github.com/NightCatSama/vue-slider-component -->
<template lang="html">
    <div class="slider-container">
        <vue-slider ref="slider" v-model="value" v-bind="options" v-on:drag-start="dragStart" v-on:drag-end="dragStop">
            <div class="tooltipSlider" style="tooltipStyles" slot="tooltip" slot-scope="{value}">
                {{formateToolTip(value)}}
            </div>
        </vue-slider>
        <div class="now" v-on:click="now">
            Now
        </div>
        <div class="start" v-on:click="start">
            24 hours ago
        </div>
    </div>
</template>

<script>
import vueSlider from 'vue-slider-component';
import { mapState } from 'vuex';
import moment from "moment";

var isDragged = false;

export default {
    components: {
        vueSlider
    },
    computed: {
        ...mapState(['top100']),
        ...mapState(['current'])
    },
    methods: {
        getData(){
            return Object.keys(this.top100).reverse();
        },
        getCurrent(){
            if(this.current){
                // console.log("Current: ", this.current)
                // console.log("Raw timestamp: " , this.current.timestamp)
                // console.log("Parsed: ", moment(this.current.timestamp).format("YYYYMMDDHHmm"))
                // console.log("Data key: ", this.options.data[this.options.data.length -1])
                // console.log("DÅ")
                // this.options.piecewiseStyle.backgroundColor = "#fff"
                return moment(this.current.timestamp).format("YYYYMMDDHHmm")
            }
            return this.options.data[this.options.data.length -1]
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
        dragStart(){
            isDragged = true;
        },
        dragStop(){
            isDragged = false;
            this.$store.dispatch('updateStarCount', this.value)
        },
        now(){
            this.value = this.options.data[this.options.data.length -1]
        },
        start(){
            this.value = this.options.data[0]
        }

    },
    watch: {
        value: function () {
            if (this.value != 0) {
                if (isDragged) {
                    this.$store.dispatch('updateCurrent', this.value);

                }else{
                    this.$store.dispatch('updateCurrent', this.value);
                    this.$store.dispatch('updateStarCount', this.value)
                }
            }
        },
        top100: function () {
            this.options.data = this.getData()
            this.value = this.options.data[this.options.data.length -1]
        }
    },
    data () {
        return {
            value: 0,
            options: {
                data: [],
                piecewise: true,
                piecewiseLabel: false,
                bgStyle: { // Base style of the slider
                    //"backgroundColor": "#fff",
                    //"height": "1px",
                    "height":"0px",
                    "padding-top": "1px",
                    // "backgroundColor": "#2b2b2b",
                    "backgroundColor":"black",
                    //"height": "3px",
                    "padding-top": "1px"
                },
                processStyle:{ // Style of what's to the left of our selector
                    // "background": "#241a3e",
                    "background": "black",
                    "height": "3px",
                    "padding-top": "1px"
                },
                sliderStyle: { //The style of the dragable dot
                    "backgroundColor": "#3CDCA0" //här
                },
                piecewiseStyle: { // the "dots" when right of slider
                    "backgroundColor":"rgba(145, 105, 248, 0.3)",
                    "visability": "visable",
                    "width": "5px",
                    "height": "5px"
                },
                piecewiseActiveStyle: { //"dots" left of slider
                    // "background": "#9169F8",
                    "backgroundColor":"rgba(145, 105, 248, 1)"
                }
            }
        }
    },
    mounted: function () {
        this.options.data = this.getData()
        this.value = this.getCurrent(); //this.options.data[this.options.data.length -1]
    }
}
</script>

<style lang="css">
    .slider-container {
      z-index: 100;
      position: fixed;
      bottom: 2vh;
      left: 10vw;
      width: 76vw;
      height: 6vh;
    }
    .tooltipSlider{
        display: block;
        font-size: 25px;
        padding: 8px 17px 8px 8px;
        min-width: 50px;
        text-align: center;
        color: #fff;
        border-radius: 13px;
        /*border: 1px solid #9FFF70;*/
    }
    .start{
        text-align: left;
        margin-left: 5px;
        color: #3CDCA0;
        width: 15%;
    }
    .now{
        float: right;
        margin-right: 5px;
        color: #3CDCA0;
    }
</style>
