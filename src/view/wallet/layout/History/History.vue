<template>
  <div class="history-view">
    <el-scrollbar>
      <div class="scrollbar-flex-content">
        <el-tabs
          v-model="activeName"
          class="demo-tabs"
          @tab-click="handleClick"
        >
          <el-tab-pane
            :label="t('messages.wallet.history_Deposit')"
            name="first"
          >
          </el-tab-pane>
          <el-tab-pane :label="t('messages.wallet.history_Buy')" name="second">
          </el-tab-pane>
          <el-tab-pane
            :label="t('messages.wallet.history_Convert')"
            name="third"
          >
          </el-tab-pane>
          <el-tab-pane :label="t('messages.wallet.history_Spot')" name="fourth">
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-scrollbar>
    <div class="min-height" v-if="activeName === 'first'">
      <DepositWithdraw />
    </div>
    <div class="min-height" v-if="activeName === 'second'">
      <BuySell />
    </div>
    <div class="min-height" v-if="activeName === 'third'">
      <Convert />
    </div>
    <div class="min-height" v-if="activeName === 'fourth'">
      <Spot></Spot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeMount } from "vue";
import type { TabsPaneContext } from "element-plus";
import DepositWithdraw from "./modules/DepositWithdraw/DepositWithdraw.vue";
import Spot from "./modules/Spot/Spot.vue";
import BuySell from "./modules/BuySell/BuySell.vue";
import Convert from "./modules/Convert/Convert.vue";
import { useRoute, useRouter } from "vue-router";

import { useI18n } from "vue-i18n";
const { t } = useI18n();

// const activeName = ref("first");
const route = useRoute();

const handleClick = (tabs: TabsPaneContext, event: Event) => {
  console.log(tabs, event);
};
const activeName = ref<any>("first");

watch(route, () => {
  activeName.value = route.meta.tabs;
});

onBeforeMount(() => {
  const tabs = route.meta.tabs;

  if (tabs) {
    activeName.value = tabs;
  }
});

// children: [
//           {
//             path: 'depositHistory',
//             name: 'depositHistory',
//             component: () => import('../view/wallet/index.vue'),
//             meta: { tab: 'first' } // 设置meta信息，用于在mounted钩子函数中设置activeName
//           },
//           {
//             path: 'buyHistory',
//             name: 'buyHistory',
//             component: () => import('../view/wallet/index.vue'),
//             meta: { tab: 'second' }
//           },
//           {
//             path: 'convertHistory',
//             name: 'convertHistory',
//             component: () => import('../view/wallet/index.vue'),
//             meta: { tab: 'third' }
//           },
//           {
//             path: 'spotHistory',
//             name: 'spotHistory',
//             component: () => import('../view/wallet/index.vue'),
//             meta: { tab: 'third' }
//           },
//         ]
</script>

<style lang="scss" scoped>
.history-view {
  .scrollbar-flex-content {
    display: flex;
  }
  :deep() {
    .el-tabs__nav-wrap::after {
      height: 0;
    }
    .el-tabs__item {
      line-height: 38px;
      font-size: 15px;
    }
  }
}
</style>
