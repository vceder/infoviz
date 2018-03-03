<template lang="html">
    <div>
        <vue-slider ref="slider" v-model="value" v-bind="options">
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
    methods: {
        getData(){
            console.log("HEJ!")
            console.log("Top100",this.top100)
            return[10,50,30]
        }
    },
    computed: {
        ...mapState(['top100']),
        test(){
            console.log("HEJ")
        }
    },
    data () {
        return {
            value: 10,
            options: {
                interval: 10, //Should be changed when using real data for the distrubation
                piecewise: true,
                piecewiseLabel: true,
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
                },
                data: this.getData()
            }
        }
    },
    mounted() {}
}
</script>

<style lang="css">
</style>
