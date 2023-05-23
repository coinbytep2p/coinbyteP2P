<script setup lang="ts">
import { createChart } from "lightweight-charts";

import {
  ref,
  onMounted,
  onUnmounted,
  watch,
  defineExpose,
  defineProps,
} from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "line",
  },
  data: {
    type: Array,
    required: true,
  },
  autosize: {
    default: true,
    type: Boolean,
  },
  chartOptions: {
    type: Object,
  },
  // gridOptions: {
  //   type: Object,
  //   default: () => ({ visible: false }),
  // },
  seriesOptions: {
    type: Object,
  },
  timeScaleOptions: {
    type: Object,
  },
  priceScaleOptions: {
    type: Object,
  },
});

// Function to get the correct series constructor name for current series type.
function getChartSeriesConstructorName(type: string) {
  return `add${type.charAt(0).toUpperCase() + type.slice(1)}Series`;
}

// Lightweight Charts™ instances are stored as normal JS variables
// If you need to use a ref then it is recommended that you use `shallowRef` instead
let series: any;
let chart: any;

const chartContainer = ref();

const fitContent = () => {
  if (!chart) return;
  chart.timeScale().fitContent();
};

const getChart = () => {
  return chart;
};
const resizeChart = () => {
  if (!chart || !chartContainer.value) return;
  const dimensions = chartContainer.value.getBoundingClientRect();
  chart.resize(dimensions.width, dimensions.height);
};

defineExpose({ fitContent, getChart,resizeChart });

// Auto resizes the chart when the browser window is resized.
const resizeHandler = () => {
  if (!chart || !chartContainer.value) return;
  const dimensions = chartContainer.value.getBoundingClientRect();
  chart.resize(dimensions.width, dimensions.height);
};

// Creates the chart series and sets the data.
const addSeriesAndData = (props: any) => {
  const seriesConstructor = getChartSeriesConstructorName(props.type);
  series = chart[seriesConstructor](props.seriesOptions);
  series.setData(props.data);
};

onMounted(() => {
  // Create the Lightweight Charts Instance using the container ref.
  chart = createChart(chartContainer.value, props.chartOptions);
  addSeriesAndData(props);

  if (props.priceScaleOptions) {
    chart.priceScale().applyOptions(props.priceScaleOptions);
  }
  // if (props.gridOptions) {
  //   chart.applyOptions({ grid: props.gridOptions });
  // }
  
  if (props.timeScaleOptions) {
    chart.timeScale().applyOptions(props.timeScaleOptions);
  }

  chart.timeScale().fitContent();

  if (props.autosize) {
    window.addEventListener("resize", resizeHandler);
  }
});

onUnmounted(() => {
  if (chart) {
    chart.remove();
    chart = null;
  }
  if (series) {
    series = null;
  }
  window.removeEventListener("resize", resizeHandler);
});

/*
 * Watch for changes to any of the component properties.

 * If an options property is changed then we will apply those options
 * on top of any existing options previously set (since we are using the
 * `applyOptions` method).
 *
 * If there is a change to the chart type, then the existing series is removed
 * and the new series is created, and assigned the data.
 *
 */
watch(
  () => props.autosize,
  (enabled) => {
    if (!enabled) {
      window.removeEventListener("resize", resizeHandler);
      return;
    }
    window.addEventListener("resize", resizeHandler);
  }
);

watch(
  () => props.type,
  (newType) => {
    if (series && chart) {
      chart.removeSeries(series);
    }
    addSeriesAndData(props);
  }
);

watch(
  () => props.data,
  (newData) => {
    if (!series) return;
    series.setData(newData);
  }
);

watch(
  () => props.chartOptions,
  (newOptions) => {
    if (!chart) return;
    chart.applyOptions(newOptions);
  }
);
// watch(
//   () => props.gridOptions,
//   (newOptions) => {
//     // if (!chart) return;
//     chart.applyOptions({ grid: newOptions });
//   }
// );
watch(
  () => props.seriesOptions,
  (newOptions) => {
    if (!series) return;
    series.applyOptions(newOptions);
  }
);

watch(
  () => props.priceScaleOptions,
  (newOptions) => {
    if (!chart) return;
    chart.priceScale().applyOptions(newOptions);
  }
);

watch(
  () => props.timeScaleOptions,
  (newOptions) => {
    if (!chart) return;
    chart.timeScale().applyOptions(newOptions);
  }
);
watch(
  () => props.autosize,
  (enabled) => {
    if (!enabled) {
      window.removeEventListener("resize", resizeHandler);
      return;
    }
    window.addEventListener("resize", resizeHandler);
  }
);
</script>

<template>
  <div class="lw-chart" ref="chartContainer"></div>
</template>

<style scoped>
.lw-chart {
  width: 100%;
  height: 100%;
}
</style>