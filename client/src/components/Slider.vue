<!-- Vue-Slider from  https://github.com/NightCatSama/vue-slider-component -->
<template lang="html">
    <div>
        <vue-slider ref="slider" v-model="value" v-bind="options">
            <div class="tooltipSlider" slot="tooltip" slot-scope="{value}">
                <!-- {{value}} -->
                {{formateToolTip(value)}}
            </div>
            <!-- <div class="labelSlider" slot="label" slot-scope="{label}">


            </div> -->
             <div class="">
             </div>
        </vue-slider>
    </div>
</template>

<script>
import vueSlider from 'vue-slider-component';
import { mapState } from 'vuex';

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
        }
    },
    watch: {
        value: function () {
            // console.log("HEHEHE")
            // console.log("Value",this.value)
            if (this.value != 0) {
                // console.log(this.value)
                this.$store.dispatch('updateCurrent', this.value);
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
                    "backgroundColor": "red"
                },
                processStyle:{ // Style of what's to the left of our selector
                    "backgroundColor": "red"
                },
                tooltipStyle: {
                    "backgroundColor": "red",
                    "borderColor": "red"
                },
                sliderStyle: {
                    "backgroundColor": "red"
                },
                piecewiseStyle: { // the "dots" when right of slider
                    "backgroundColor": "red",
                    "visability": "visable",
                    "width": "12px",
                    "height": "12px"
                },
                piecewiseActiveStyle: { //"dots" left of slider
                    "backgroundColor": "red"
                },
                labelActiveStyle: {
                    "color": "red"
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
    .tooltipSlider{
        display: block;
        font-size: 14px;
        white-space: nowrap;
        padding: 2px 5px;
        min-width: 20px;
        text-align: center;
        color: #fff;
        border-radius: 5px;
        border: 1px solid #3498db;
        background-color: #3498db;
    }
</style>
