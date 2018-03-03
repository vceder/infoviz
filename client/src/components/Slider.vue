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
    computed: {
        ...mapState(['top100']),
        ...mapState(['isLoading'])
    },
    methods: {
        getData(){
            return Object.keys(this.top100)
        }
    },
    watch: {
        value: function () {
            console.log("HEHEHE")
            console.log("Value",this.value)
            if (this.value != '') {
                console.log(this.value)
                this.$store.dispatch('updateCurrent', this.value);
            }
        },
        isLoading: function () {
            console.log("Loading Change")
            console.log(this.getData())
            this.options.data = this.getData()
            console.log(this.getData()[0])
            this.value = this.getData()[0]
        }
    },
    data () {
        return {
            value: 0,
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
                }
            }
        }
    },
    created: function () {
        console.log(this.getData())
        this.options.data = this.getData()
        console.log(this.getData()[0])
        this.value = this.getData()[0]
    },
    mounted: function () {
        console.log(this.getData())
        this.options.data = this.getData()
        console.log(this.getData()[0])
        this.value = this.getData()[0]
    }
}
</script>

<style lang="css">
</style>
