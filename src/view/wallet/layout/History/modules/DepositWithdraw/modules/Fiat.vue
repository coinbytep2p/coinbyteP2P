<template>
  <div class="flat">
    <div class="flat-search">
      <!-- <FilterSelect title="Type"></FilterSelect>
      <FilterSelect title="Time"></FilterSelect>
      <FilterSelect title="Flat"></FilterSelect>
      <FilterSelect title="Status"></FilterSelect> -->
      <div class="search-left">
        <template v-for="item in selectMap">
          <el-form-item>
            <FilterSelect
              :title="item.title"
              :options="item.options"
              :selectValue="item.selectValue"
              key="item.title"
            ></FilterSelect>
          </el-form-item>
        </template>
        <el-form-item>
          <CustomButton
            :title="t('messages.wallet.tab_search')"
            @handleClick="submitForm"
          ></CustomButton>
          <CustomButton
            :title="t('messages.wallet.tab_reset')"
            @handleClick="submitForm"
            bgc="#F1F1F1"
            fc="#000"
          ></CustomButton>
        </el-form-item>
      </div>
      <div>
        <div class="search-right">
          <div class="custom-link">
            <a href="#">{{ $t("messages.wallet.tab_arrive") }}</a>
          </div>
          <div class="custom-link">
            <img :src="download" alt="" />
            <div>{{ $t("messages.wallet.tab_Download") }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="deposit-fiat-table">
      <Table v-if="noFound">
        <template v-slot:columns>
          <el-table-column prop="time" label="Time" width="210" />
              <el-table-column prop="coin" label="Coin" width="210" />
              <el-table-column prop="amount" label="Amount" width="240" />
              <el-table-column label="Status" width="230">
                <template #default="scope">
                  <div
                    v-if="scope.row.status === 'Successful'"
                    style="color: #01c19a"
                  >
                    Successful
                  </div>
                  <div v-else-if="scope.row.status === 'Faild'">Faild</div>
                </template>
              </el-table-column>
              <el-table-column label="Information">
                <template #default="scope">
                  <template v-if="!isFoldArr.includes(scope.row.key)">
                    <div class="info">
                      <p>Payment Method:</p>
                      <p>{{ scope.row.payment_method }}</p>
                    </div>
                  </template>
                  <template v-else>
                    <div class="info">
                      <p>Payment Method:</p>
                      <p>{{ scope.row.payment_method }}</p>
                    </div>
                    <div class="info">
                      <p>indicated Amount:</p>
                      <p>{{ scope.row.indicated_amount }}</p>
                    </div>
                    <div class="info">
                      <p>Fee:</p>
                      <p>{{ scope.row.fee }}</p>
                    </div>
                    <div class="info">
                      <p>Order ID:</p>
                      <p>{{ scope.row.order_ID }}</p>
                    </div>
                  </template>
                </template>
              </el-table-column>
              <el-table-column label="">
                <template #default="scope">
                  <el-button
                    type="text"
                    :class="{
                      icon_button: true,
                      isRotate: isFoldArr.includes(scope.row.key),
                    }"
                    @click="getKey(scope.row.key)"
                    ><el-icon style="color: #9b9b9b"><CaretBottom /></el-icon
                  ></el-button>
                </template>
              </el-table-column>
        </template>
      </Table>
      <div v-else>
        <div v-if="windowWidth > 820">
          <Table :sourceData="tableData">
            <template v-slot:columns>
              <el-table-column prop="time" :label="t('messages.wallet.fiat_Time')" width="210" />
              <el-table-column prop="coin" :label="t('messages.wallet.fiat_Coin')" width="210" />
              <el-table-column prop="amount" :label="t('messages.wallet.fiat_Amount')" width="240" />
              <el-table-column :label="t('messages.wallet.fiat_Status')" width="230">
                <template #default="scope">
                  <div
                    v-if="scope.row.status === 'Successful'"
                    style="color: #01c19a"
                  >
                    Successful
                  </div>
                  <div v-else-if="scope.row.status === 'Faild'">Faild</div>
                </template>
              </el-table-column>
              <el-table-column :label="t('messages.wallet.fiat_Information')">
                <template #default="scope">
                  <template v-if="!isFoldArr.includes(scope.row.key)">
                    <div class="info">
                      <p>Payment Method:</p>
                      <p>{{ scope.row.payment_method }}</p>
                    </div>
                  </template>
                  <template v-else>
                    <div class="info">
                      <p>Payment Method:</p>
                      <p>{{ scope.row.payment_method }}</p>
                    </div>
                    <div class="info">
                      <p>indicated Amount:</p>
                      <p>{{ scope.row.indicated_amount }}</p>
                    </div>
                    <div class="info">
                      <p>Fee:</p>
                      <p>{{ scope.row.fee }}</p>
                    </div>
                    <div class="info">
                      <p>Order ID:</p>
                      <p>{{ scope.row.order_ID }}</p>
                    </div>
                  </template>
                </template>
              </el-table-column>
              <el-table-column label="">
                <template #default="scope">
                  <el-button
                    type="text"
                    :class="{
                      icon_button: true,
                      isRotate: isFoldArr.includes(scope.row.key),
                    }"
                    @click="getKey(scope.row.key)"
                    ><el-icon style="color: #9b9b9b"><CaretBottom /></el-icon
                  ></el-button>
                </template>
              </el-table-column>
            </template>
          </Table>
        </div>
        <div v-else>
          <el-card
            class="fiat-card"
            v-for="(item, index) in tableData"
            :key="index"
          >
            <div class="card-item">
              Time : <span>{{ item.time }}</span>
            </div>
            <div class="card-item">
              Coin : <span>{{ item.coin }}</span>
            </div>
            <div class="card-item">
              Amount : <span>{{ item.amount }}</span>
            </div>
            <div class="card-item">
              Status :
              <span :class="getStatusClass(item.status)">{{
                item.status
              }}</span>
            </div>
            <el-divider></el-divider>
            <div class="card-item">
              Information :

              <span v-if="!isFoldArr.includes(item.key)"
                >Payment Method: {{ item.payment_method }}
              </span>
              <span v-else>
                <div class="info">
                  <p>Payment Method:</p>
                  <p>{{ item.payment_method }}</p>
                </div>
                <div class="info">
                  <p>indicated Amount:</p>
                  <p>{{ item.indicated_amount }}</p>
                </div>
                <div class="info">
                  <p>Fee:</p>
                  <p>{{ item.fee }}</p>
                </div>
                <div class="info">
                  <p>Order ID:</p>
                  <p>{{ item.order_ID }}</p>
                </div>
              </span>
              <el-button
                type="text"
                :class="{
                  icon_button: true,
                  isRotate: isFoldArr.includes(item.key),
                }"
                @click="getKey(item.key)"
                ><el-icon style="color: #9b9b9b"><CaretBottom /></el-icon
              ></el-button>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted, onMounted } from "vue";
import type { FormInstance, FormRules } from "element-plus";

import FilterSelect from "../../../component/FilterSelect.vue";
import CustomButton from "../../../component/CustomButton.vue";
import Table from "../../../component/Table.vue";
import { CaretBottom } from "@element-plus/icons-vue";
import download from "../../../../../../../assets/wallet/wallet_download.png";

import { useI18n } from "vue-i18n";
const { t } = useI18n();
const noFound = ref(false);

const windowWidth = ref(window.document.body.offsetWidth);
onMounted(() => {
  window.addEventListener("resize", resetWidth);
});
onUnmounted(() => {
  window.removeEventListener("resize", resetWidth);
});
function resetWidth() {
  windowWidth.value = window.document.body.offsetWidth;
}
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};
const selectMap = ref([
  {
    title: t("messages.wallet.tab_Type"),
    options: [
      {
        value: "Deposit",
        label: "Deposit",
      },
      {
        value: "Option2",
        label: "Option2",
      },
    ],
    selectValue: "Deposit",
  },
  {
    title: t("messages.wallet.tab_Time"),
    options: [
      {
        value: "Past 30 days",
        label: "Past 30 days",
      },
      {
        value: "Option2",
        label: "Option2",
      },
    ],
    selectValue: "Past 30 days",
  },
  {
    title: t("messages.wallet.tab_Fiat"),
    options: [
      {
        value: "All",
        label: "All",
      },
      {
        value: "Option2",
        label: "Option2",
      },
    ],
    selectValue: "All",
  },
  {
    title: t("messages.wallet.tab_Status"),
    options: [
      {
        value: "All",
        label: "All",
      },
      {
        value: "Option2",
        label: "Option2",
      },
    ],
    selectValue: "All",
  },
]);
const tableData = ref([
  {
    time: "2020-10-03 00:22:00",
    coin: "AUD",
    amount: "31000.00",
    status: "Successful",
    payment_method: "PayID/Osko",
    indicated_amount: "3800.00",
    fee: "0",
    order_ID: "PAC23212232112121211",
    key: "1",
  },
  {
    time: "2020-10-03 00:22:00",
    coin: "AUD",
    amount: "31000.00",
    status: "Successful",
    payment_method: "PayID/Osko",
    indicated_amount: "3800.00",
    fee: "0",
    order_ID: "PAC23212232112121211",
    key: "2",
  },
  {
    time: "2020-10-03 00:22:00",
    coin: "AUD",
    amount: "31000.00",
    status: "Successful",
    payment_method: "PayID/Osko",
    indicated_amount: "3800.00",
    fee: "0",
    order_ID: "PAC23212232112121211",
    key: "3",
  },
  {
    time: "2020-10-03 00:22:00",
    coin: "AUD",
    amount: "31000.00",
    status: "Successful",
    payment_method: "PayID/Osko",
    indicated_amount: "3800.00",
    fee: "0",
    order_ID: "PAC23212232112121211",
    key: "4",
  },
  {
    time: "2020-10-03 00:22:00",
    coin: "AUD",
    amount: "31000.00",
    status: "Successful",
    payment_method: "PayID/Osko",
    indicated_amount: "3800.00",
    fee: "0",
    order_ID: "PAC23212232112121211",
    key: "5",
  },
  {
    time: "2020-10-03 00:22:00",
    coin: "AUD",
    amount: "31000.00",
    status: "Successful",
    payment_method: "PayID/Osko",
    indicated_amount: "3800.00",
    fee: "0",
    order_ID: "PAC23212232112121211",
    key: "6",
  },
  {
    time: "2020-10-03 00:22:00",
    coin: "AUD",
    amount: "31000.00",
    status: "Successful",
    payment_method: "PayID/Osko",
    indicated_amount: "3800.00",
    fee: "0",
    order_ID: "PAC23212232112121211",
    key: "7",
  },
  {
    time: "2020-10-03 00:22:00",
    coin: "AUD",
    amount: "31000.00",
    status: "Successful",
    payment_method: "PayID/Osko",
    indicated_amount: "3800.00",
    fee: "0",
    order_ID: "PAC23212232112121211",
    key: "8",
  },
  {
    time: "2020-10-03 00:22:00",
    coin: "AUD",
    amount: "31000.00",
    status: "Successful",
    payment_method: "PayID/Osko",
    indicated_amount: "3800.00",
    fee: "0",
    order_ID: "PAC23212232112121211",
    key: "9",
  },
]);
const getStatusClass = (status: string) => {
  return status === "Processing" ? "text-red" : "text-green";
};

const dataSource = computed(() => {});
const isFoldArr = ref<string[]>([]);
const getKey = (key: string) => {
  let index = isFoldArr.value.indexOf(key);
  if (index >= 0) {
    isFoldArr.value.splice(index, 1);
  } else {
    isFoldArr.value.push(key);
  }
};
</script>

<style lang="scss" scoped>
.flat {
  &-search {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    margin-bottom: 15px;
    @media (max-width: 769px) {
      gap: 10px;
    }
  }
  .info {
    display: flex;
    gap: 9px;
    p:nth-child(1) {
      color: #9b9b9b;
      width: 117px;
    }
    p:nth-child(2) {
      width: 180px;
    }
  }
  .icon_button {
    transition: all 0.2s;
    transform: rotate(0deg);
  }
  .isRotate {
    transform: rotate(180deg);
  }
}
.fiat-card {
  margin-top: 10px;
  .card-item {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
}
.text-red {
  color: #f49542;
}

.text-green {
  color: #01c19a;
}
.flat-search{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.search-left {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  @media (max-width: 769px) {
    gap: 10px;
  }
}
.search-right {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.custom-link {
  height: 41px;
  display: flex;
  align-items: flex-end;
  gap: 8px;
  a {
    font-size: 14px;
    color: #01c19a;
  }
  img {
    width: 19px;
    height: 19px;
    // background: #01C19A;
    filter: invert(100%);
  }
}
</style>
