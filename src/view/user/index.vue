<template>
  <div class="wallet-page">
    <Header></Header>
    <div class="center-part">
      <el-scrollbar>
        <div class="scrollbar-flex-content">
          <el-tabs
            v-model="activeName"
            class="demo-tabs"
          >
            <el-tab-pane :label="t('messages.user.label_overview')" name="first" :lazy="true">
              <template #label>
                <div class="click-success" @click="changeTab('')">
                  {{ t('messages.user.label_overview') }}
                </div>
              </template>
            </el-tab-pane>

            <el-tab-pane :label="t('messages.user.label_orders')" name="second" :lazy="true">
              <template #label>
                <div class="click-success" @click="changeTab('depositFiat')">
                  {{ t('messages.user.label_orders') }}
                </div>
              </template>
            </el-tab-pane>

            <el-tab-pane :label="t('messages.user.label_Bank')" name="fourth" :lazy="true">
              <template #label>
                <div class="click-success" @click="changeTab('bankaccount')">
                  {{ t('messages.user.label_Bank') }}
                </div>
              </template>
            </el-tab-pane>
            <el-tab-pane :label="t('messages.user.label_Verification')" name="third" :lazy="true">
              <template #label>
                <div class="click-success" @click="changeTab('verification')">
                  {{ t('messages.user.label_Verification') }}
                </div>
              </template>
            </el-tab-pane>


            <el-tab-pane :label="t('messages.user.label_Preferences')" name="fifth" :lazy="true">
              <template #label>
                <div class="click-success" @click="changeTab('accountstatement')">
                  {{ t('messages.user.label_Preferences') }}
                </div>
              </template>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-scrollbar>
      <div class="min-height" v-if="activeName === 'first'">
        <OverView />
      </div>
      <div class="min-height" v-if="activeName === 'second'">
        <!-- <Security /> -->
        <router-view></router-view>

      </div>
      <div class="min-height" v-if="activeName === 'third'">
        <Verification />
      </div>
      <div class="min-height" v-if="activeName === 'fourth'">
        <BankAccount />
      </div>
      <div class="min-height" v-if="activeName === 'fifth'">
        <AccountStatement />
      </div>
    </div>

    <Footer v-if="windowWidth > 769" />
    <FooterMobile v-if="windowWidth <= 769"></FooterMobile>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onBeforeMount, onMounted, computed, watch } from "vue";
import { windowWidth } from "../../components/WindowWidth"
import Header from "../../layout/Header/Header.vue";
import Footer from "../../layout/Footer/Footer.vue";
import FooterMobile from "../../layout/Footer/FooterMobile.vue";
import OverView from "./layout/OverView/OverView.vue";
import Security from "./layout/Security/Security.vue";
import Verification from "../transaction/layout/OverView/WithdrawFiat.vue";
import BankAccount from "./layout/BankAccount/BankAccount.vue";
import AccountStatement from "./layout/AccountStatement/AccountStatement.vue";
import { StarFilled, Search } from "@element-plus/icons-vue";
import { getMyAssets } from "../../api/wallet";
import { getTransactions } from "../../api/transactions";
import type { TabsPaneContext } from "element-plus";

import { useRoute, useRouter } from "vue-router";

import { useI18n } from "vue-i18n";
const { t } = useI18n();
const router = useRouter();

const activeName = ref<any>("first");
const route = useRoute();

watch(route, () => {
  activeName.value = route.meta.tab;
});

onBeforeMount(() => {
  const tab = route.meta.tab;

  if (tab) {
    activeName.value = tab;
  }
});
const changeTab = (path: string) => {
  const url = path ? '/user/' + path : '/user'
  router.push(url)
}
</script>

<style scoped lang="scss">
:deep(.el-tabs__item){
  padding: 0px;
  margin: 0 20px !important;
}
.center-part {
  max-width: 1290px;
  min-height: calc(100vh + -120px);
  margin: auto;
  padding: 21px 0 70px 0;
  position: relative;
  @media (max-width: 1400px) {
    // padding: 21px 20px 135px 20px;
    max-width: 940px;
  }
  @media (max-width: 992px) {
    padding: 21px 20px 50px 20px;
  }
  .scrollbar-flex-content {
    @media (max-width: 600px) {
      display: flex;
    }
  }
}

:deep() {
  // .el-scrollbar__bar.is-horizontal > div {
  //   height: 0; //iPhone滑动样式高度
  // }
  .el-tabs__item {
    color: #9b9b9b !important;
    font-size: 16px;
    line-height: 19px;
  }
  .el-table__inner-wrapper {
    margin-top: 10px;
    margin-left: -10px;
  }
  .el-table__header {
    font-size: 14px;
    line-height: 16px;
    color: #878787;
  }
  .el-tabs__item is-top {
    --el-menu-active-color: #01c19a;
    font-size: 16px;
    line-height: 19px;
  }
  .el-tabs__item.is-active {
    color: #01c19a !important;
    font-weight: 500;
  }
  .el-tabs__active-bar {
    background-color: #01c19a;
    height: 3px;
  }
  .el-tabs__nav-wrap::after {
    border: 1px solid #EBEBEB !important;
    bottom: -1px;
  }

  .el-radio-button {
    &:hover span {
      color: #01c19a;
    }
    .el-radio-button__inner {
      border-radius: 6px !important;
      border: none !important;
      box-shadow: none;
      font-size: 14px;
      line-height: 17px;
    }
    --el-radio-button-checked-bg-color: #f1f1f1;
    --el-radio-button-checked-text-color: #01c19a !important;
  }
  .el-table .descending .sort-caret.descending {
    border-top-color: #01c19a;
  }
  .el-table .ascending .sort-caret.ascending {
    border-bottom-color: #01c19a;
  }
  .el-radio-button__inner {
    color: #9b9b9b;
  }
}

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.demo-tabs .custom-tabs-label {
  :deep(.el-icon) {
    vertical-align: middle;
    font-size: 25px;
    color: #dfdfdf;
  }
}
.demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}
:deep(.el-table__inner-wrapper::before) {
  height: 0px;
}
:deep(.el-table__row) {
  height: 70px;
}
.click-success{
  height: 100% !important;
}
</style>
