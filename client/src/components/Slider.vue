<template>
    <div class="">
        <svg @mousemove="mousover()" :width="width" :height="height">
            <g :style="{transform: 'translate(${margin.left}px, ${margin.top}px)'}">
                <!-- <path class="" :d=""/> template for path -->
                <path id="axis" class="line" :d="paths.line" :style="{transform: 'translate(${width})'}" />
                <path id="slideSelector" class="selector" :d="paths.selector" />
            </g>
        </svg>
    </div>
</template>

<script>
// @ is an alias to /src
import * as d3 from 'd3';

// const data = [0000, 0030, 0100, 0130, 0200, 0230, 0300]; // Dummy data, later to be replaced with data from firebase with our current time intervalls

const props = {
    data: {
        type: Array,
        default: () => ["2018-03-01 12:00:00", "2018-03-01 12:30:00"],
    },
    margin: {
        type: Object,
        default: () => ({
            top: 50,
            right: 50,
            bottom: 0,
            left: 50
        })
    },
    ceil: {
        type: Number,
        default: 100,
    }
};

export default {
    name: 'Slider',
    data() {
        return {
            width: 0,
            height: 0,
            paths: {
                line: '',
                selector: '',
            },
            scaled: {
                x: null,
                y: null,
            },
            data: ["2018-03-01 12:00:00", "2018-03-01 12:30:00"],
        };
    },
    computed: {
        padded() {
            const width = this.width - this.margin.left - this.margin.right;
            const height = this.height - this.margin.top - this.margin.bottom;
            return {width, height}
        }
    },
    mounted() {
        // window.addEventListener('resize', this.onResize);
        // this.onResize();
        this.update();

    },
    beforeDestroy(){
        // window.removeEventListener('resize', this.onResize);
    },
    watch: {
        data: function dataChanged(newData, oldData) {
            //Function for updateing slider, if this is nessecery
        },
        width: function widthChanged() {
            // this.initialaize();
            this.update();
        },
    },
    methods: {
        update() {
            const line = d3.line();
            // console.log(this.data[this.data.length -1])
            let x = d3.scaleTime()
                .domain([this.data[0], this.data[this.data.length - 1]])
                .range([0, this.width])
                .clamp(true);




        },
        mouseover(){
            console.log("EVENT!")
        }
    },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
