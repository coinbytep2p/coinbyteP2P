<template>
  <div class="overview-date-page">
    <div v-if="windowWidth > 985">
      <el-row :gutter="15">
        <el-col :span="16" class="left-box">
          <div class="left-value clearfloat">
            <div class="value-top">
              {{ $t("messages.wallet.Overview_balance") }}
              <img :src="overview_eye" />
            </div>
            <div class="value-center">
              <div>₮{{ selectedBalance }}</div>
              <el-select v-model="firstSelect" placeholder="Select" style="width: 127px;margin-left: 10px;">
                <template #prefix>
                  <img :src="firstIcon" v-show="firstIcon" style="width: 20px;height: 20px;margin-right: 5px;" />
                </template>
                <el-option v-for="item in currenciesTypesCrypto" :label="item.slug" :value="item.slug" :key="item.id">
                  <div style="
                      width: 20px;
                      display: flex;
                      align-items: center;
                      font-size: 14px !important;
                      color: #000;
                      margin-left: -5px;
                    ">
                    <img :src="item.icon" v-show="item.icon" style="
                      width: 100%;
                      height: 100%;
                      margin-right: 5px;
                    " />
                    {{ item.slug }}
                  </div>
                </el-option>
              </el-select>
            </div>
            <div class="value-bottom clearfloat">
              <div class="bottom-btn">
                <router-link to="/wallet/depositCrypto">
                  <GetButton class="deposit-btn" type="success" :text="t('messages.wallet.Overview_depositBtn')" />
                </router-link>
                <GetButton class="func-btn" :text="t('messages.wallet.Overview_Convert')" />
                <router-link to="/wallet/WithdrawCrypto">
                  <GetButton class="func-btn" :text="t('messages.wallet.Overview_Withdraw')" />
                </router-link>
                <GetButton class="func-btn" :text="t('messages.wallet.Overview_Transfer')" />
              </div>
            </div>
            <div class="value-table">
              <div class="table-header">
                <div class="header-input">
                  <el-input v-model="tableInput" class="w-50 m-2" :placeholder="t('messages.wallet.search')"
                    :prefix-icon="Search" />
                </div>
                <div class="header-hide">
                  <el-checkbox v-model="checked" :label="t('messages.wallet.hide')" size="small" />
                </div>
              </div>
              <el-divider style="margin: 1px"></el-divider>
              <div class="table-body">
                <Table :sourceData="tableData">
                  <template v-slot:columns>
                    <el-table-column :label="t('messages.wallet.label_Crypto')" width="200">
                      <template #default="scope">
                        <div style="
                            display: flex;
                            float: left;
                            align-items: center;
                          ">
                          <img :src="scope.row.icon" style="width: 32px" />
                        </div>
                        <div class="table-crypto">
                          <div>
                            {{ scope.row.crypto }}
                          </div>
                          <div class="tip-text">
                            {{ scope.row.fullname }}
                          </div>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="Balance" :label="t('messages.wallet.label_Type')" width="200">
                      <template #default="scope">
                        <div>
                          {{ scope.row.asset }}
                        </div>
                        <div class="tip-text">
                          {{ scope.row.amount }}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column :label="t('messages.wallet.label_portfolio')" width="200">
                      <template #default="scope">
                        <div class="progress">
                          <span>{{ scope.row.TxID }} %</span>
                          <el-progress :show-text="false" :percentage="parseFloat(scope.row.TxID)" class="progress-bar" />
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column :label="t('messages.wallet.label_Action')" width="220" fixed="right" align="right">
                      <template #default="scope">
                        <div>
                          <el-button link class="table-btn">{{
                            scope.row.buy
                          }}</el-button>
                          <el-divider direction="vertical" />
                          <el-button link class="table-btn">{{
                            scope.row.sell
                          }}</el-button>
                          <el-divider direction="vertical" />
                          <el-dropdown trigger="click">
                            <el-button link>
                              {{ scope.row.more }}
                            </el-button>

                            <template #dropdown>
                              <el-dropdown-menu style="width: 179px">
                                <el-dropdown-item>{{
                                  $t("messages.wallet.Overview_Withdraw")
                                }}</el-dropdown-item>
                                <el-dropdown-item>{{
                                  $t("messages.wallet.Overview_Buy")
                                }}</el-dropdown-item>
                                <el-dropdown-item>{{
                                  $t("messages.wallet.Overview_Sell")
                                }}</el-dropdown-item>
                                <el-dropdown-item>{{
                                  $t("messages.wallet.Overview_Trade")
                                }}</el-dropdown-item>
                                <el-dropdown-item>{{
                                  $t("messages.wallet.Overview_Convert")
                                }}</el-dropdown-item>
                                <el-dropdown-item>{{
                                  $t("messages.wallet.Overview_Transfer")
                                }}</el-dropdown-item>
                              </el-dropdown-menu>
                            </template>
                          </el-dropdown>
                        </div>
                      </template>
                    </el-table-column>
                  </template>
                </Table>
              </div>
              <div class="value-view-more">
                {{ $t("messages.wallet.wallet_more") }} &gt;
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="8" class="right-box">
          <div class="right-recent">
            <el-card class="recent-card">
              <template #header>
                <div class="card-header">
                  <span>{{ $t("messages.wallet.Overview_transactions") }}</span>
                </div>
              </template>
              <template v-if="viewTransactions">
                <template v-for="item in transactions">
                  <!-- <div class="recent-box">
                    <div class="box-left clearfloat">
                      <div class="rencent-image"><img :src="icon_convert" /></div>
                      <div class="recent-title">Convert USDT</div>
                      <div class="recent-date">09/30/2022, 18:00:00</div>
                    </div>
                    <div class="recent-count down">-100 USDT</div>
                  </div>
                  <el-divider style="margin-left: -20px; width: 200%" /> -->
                  <div class="recent-box">
                    <div class="box-left clearfloat">
                      <div class="rencent-image">
                        <img :src="iconCollectsState[item.type].icon" />
                      </div>
                      <div class="recent-title">
                        {{ transactionsTitle(item) }}
                      </div>
                      <div class="recent-date">
                        {{ moment(item.createTime).format("YY/DD/YYYY") }}
                      </div>
                    </div>
                    <div :class="iconCollectsState[item.type].class">
                      {{ transactionsAmount(item) }}
                    </div>
                  </div>
                  <el-divider style="margin-left: -20px; width: 200%" />
                </template>

                <div class="view-more">
                  {{ $t("messages.wallet.wallet_more") }} &gt;
                </div>
              </template>
              <template v-else>
                <div class="empty-transactions">
                  <div class="value-bottom">
                    <div class="bottom-image">
                      <img :src="wallet_search_none" />
                    </div>
                    <div class="bottom-title minMainFont">
                      {{ $t("messages.wallet.Overview_noTransaction") }}
                    </div>
                  </div>
                </div>
              </template>
              <!-- <div class="recent-box">
                <div class="box-left clearfloat">
                  <div class="rencent-image"><img :src="icon_convert" /></div>
                  <div class="recent-title">Convert USDT</div>
                  <div class="recent-date">09/30/2022, 18:00:00</div>
                </div>
                <div class="recent-count down">-100 USDT</div>
              </div>
              <el-divider style="margin-left: -20px; width: 200%" />
              <div class="recent-box">
                <div class="box-left clearfloat">
                  <div class="rencent-image"><img :src="icon_convert" /></div>
                  <div class="recent-title">Convert ETH</div>
                  <div class="recent-date">09/30/2022, 18:00:00</div>
                </div>
                <div class="recent-count up">+0.0776 ETH</div>
              </div>
              <el-divider style="margin-left: -20px; width: 200%" />
              <div class="recent-box">
                <div class="box-left clearfloat">
                  <div class="rencent-image"><img :src="icon_deposit" /></div>
                  <div class="recent-title">Deposit USDT</div>
                  <div class="recent-date">09/30/2022, 18:00:00</div>
                </div>
                <div class="recent-count up">+3,499 USDT</div>
              </div>
              <el-divider style="margin-left: -20px; width: 200%" />
              <div class="recent-box">
                <div class="box-left clearfloat">
                  <div class="rencent-image">
                    <img :src="icon_withdrawal" />
                  </div>
                  <div class="recent-title">Withdrawal USDT</div>
                  <div class="recent-date">09/30/2022, 18:00:00</div>
                </div>
                <div class="recent-count down">-3,431 USDT</div>
              </div>
              <el-divider style="margin-left: -20px; width: 200%" />
              <div class="recent-box">
                <div class="box-left clearfloat">
                  <div class="rencent-image"><img :src="icon_gift" /></div>
                  <div class="recent-title">Get From Activity ETHW</div>
                  <div class="recent-date">09/30/2022, 18:00:00</div>
                </div>
                <div class="recent-count up">+0.01 ETHW</div>
              </div>
              <el-divider style="margin-left: -20px; width: 200%" /> -->

              <!-- <div class="view-more">{{ $t('messages.wallet.wallet_more') }} &gt;</div> -->
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
    <div v-if="windowWidth <= 985">
      <el-row>
        <el-col :span="24" class="left-box">
          <div class="left-value clearfloat">
            <div class="value-top">
              {{ $t("messages.wallet.Overview_balance") }}
              <img :src="overview_eye" />
            </div>
            <div class="value-center">
              <div>₮{{ selectedBalance }}</div>
              <el-select v-model="firstSelect" placeholder="Select" style="width: 127px;margin-left: 10px;">
                <template #prefix>
                  <img :src="firstIcon" v-show="firstIcon" style="width: 20px;height: 20px;margin-right: 5px;" />
                </template>
                <el-option v-for="item in currenciesTypesCrypto" :label="item.slug" :value="item.slug" :key="item.id">
                  <div style="
                      width: 20px;
                      display: flex;
                      align-items: center;
                      font-size: 14px !important;
                      color: #000;
                      margin-left: -5px;
                    ">
                    <img :src="item.icon" v-show="item.icon" style="
                      width: 100%;
                      height: 100%;
                      margin-right: 5px;
                    " />
                    {{ item.slug }}
                  </div>
                </el-option>
              </el-select>
            </div>
            <div class="value-bottom clearfloat">
              <div class="bottom-btn">
                <GetButton class="deposit-btn" type="success" :text="t('messages.wallet.Overview_depositBtn')" />
                <GetButton class="func-btn" :text="t('messages.wallet.Overview_Convert')" />
                <GetButton class="func-btn" :text="t('messages.wallet.Overview_Withdraw')" />
                <GetButton class="func-btn" :text="t('messages.wallet.Overview_Transfer')" />
              </div>
            </div>
            <div class="value-table">
              <div class="table-header">
                <div class="header-input">
                  <el-input v-model="tableInput" class="w-50 m-2" :placeholder="t('messages.wallet.search')"
                    :prefix-icon="Search" />
                </div>
                <div class="header-hide">
                  <el-checkbox v-model="checked" :label="t('messages.wallet.hide')" size="small" />
                </div>
              </div>
              <el-divider style="margin: 1px"></el-divider>
              <div class="table-body">
                <Table :sourceData="tableData">
                  <template v-slot:columns>
                    <el-table-column :label="t('messages.wallet.label_Crypto')" width="230">
                      <template #default="scope">
                        <div style="
                            display: flex;
                            float: left;
                            align-items: center;
                          ">
                          <img :src="scope.row.icon" style="width: 32px" />
                        </div>
                        <div class="table-crypto">
                          <div>
                            {{ scope.row.crypto }}
                          </div>
                          <div class="tip-text">
                            {{ scope.row.fullname }}
                          </div>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="Balance" :label="t('messages.wallet.label_Type')" width="230">
                      <template #default="scope">
                        <div>
                          {{ scope.row.asset }}
                        </div>
                        <div class="tip-text">
                          {{ scope.row.amount }}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column :label="t('messages.wallet.label_portfolio')" width="230">
                      <template #default="scope">
                        <div class="progress">
                          <span>{{ scope.row.TxID }} %</span>
                          <el-progress :show-text="false" :percentage="parseFloat(scope.row.TxID)" class="progress-bar" />
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column :label="t('messages.wallet.label_Action')" width="220" fixed="right" align="right">
                      <template #default="scope">
                        <div>
                          <el-button link class="table-btn">{{
                            scope.row.buy
                          }}</el-button>
                          <el-divider direction="vertical" />
                          <el-button link class="table-btn">{{
                            scope.row.sell
                          }}</el-button>
                          <el-divider direction="vertical" />
                          <el-dropdown trigger="click">
                            <el-button link>
                              {{ scope.row.more }}
                            </el-button>

                            <template #dropdown>
                              <el-dropdown-menu style="width: 179px">
                                <el-dropdown-item>{{
                                  $t("messages.wallet.Overview_Withdraw")
                                }}</el-dropdown-item>
                                <el-dropdown-item>{{
                                  $t("messages.wallet.Overview_Buy")
                                }}</el-dropdown-item>
                                <el-dropdown-item>{{
                                  $t("messages.wallet.Overview_Sell")
                                }}</el-dropdown-item>
                                <el-dropdown-item>{{
                                  $t("messages.wallet.Overview_Trade")
                                }}</el-dropdown-item>
                                <el-dropdown-item>{{
                                  $t("messages.wallet.Overview_Convert")
                                }}</el-dropdown-item>
                                <el-dropdown-item>{{
                                  $t("messages.wallet.Overview_Transfer")
                                }}</el-dropdown-item>
                              </el-dropdown-menu>
                            </template>
                          </el-dropdown>
                        </div>
                      </template>
                    </el-table-column>
                  </template>
                </Table>
              </div>
              <div class="value-view-more">
                {{ $t("messages.wallet.wallet_more") }} &gt;
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="24" class="right-box">
          <div class="right-recent">
            <el-card class="recent-card">
              <template #header>
                <div class="card-header">
                  <span>{{ $t("messages.wallet.Overview_transactions") }}</span>
                </div>
              </template>
              <template v-if="viewTransactions">
                <template v-for="item in transactions">
                  <!-- <div class="recent-box">
                    <div class="box-left clearfloat">
                      <div class="rencent-image"><img :src="icon_convert" /></div>
                      <div class="recent-title">Convert USDT</div>
                      <div class="recent-date">09/30/2022, 18:00:00</div>
                    </div>
                    <div class="recent-count down">-100 USDT</div>
                  </div>
                  <el-divider style="margin-left: -20px; width: 200%" /> -->
                  <div class="recent-box">
                    <div class="box-left clearfloat">
                      <div class="rencent-image">
                        <img :src="iconCollectsState[item.type].icon" />
                      </div>
                      <div class="recent-title">
                        {{ transactionsTitle(item) }}
                      </div>
                      <div class="recent-date">
                        {{ moment(item.createTime).format("YY/DD/YYYY") }}
                      </div>
                    </div>
                    <div :class="iconCollectsState[item.type].class">
                      {{ transactionsAmount(item) }}
                    </div>
                  </div>
                  <el-divider style="margin-left: -20px; width: 200%" />
                </template>

                <div class="view-more">
                  {{ $t("messages.wallet.wallet_more") }} &gt;
                </div>
              </template>
              <template v-else>
                <div class="empty-transactions">
                  <div class="value-bottom">
                    <div class="bottom-image">
                      <img :src="wallet_search_none" />
                    </div>
                    <div class="bottom-title minMainFont">
                      {{ $t("messages.wallet.Overview_noTransaction") }}
                    </div>
                  </div>
                </div>
              </template>
              <!-- <div class="recent-box">
                <div class="box-left clearfloat">
                  <div class="rencent-image"><img :src="icon_convert" /></div>
                  <div class="recent-title">Convert USDT</div>
                  <div class="recent-date">09/30/2022, 18:00:00</div>
                </div>
                <div class="recent-count down">-100 USDT</div>
              </div>
              <el-divider style="margin-left: -20px; width: 200%" />
              <div class="recent-box">
                <div class="box-left clearfloat">
                  <div class="rencent-image"><img :src="icon_convert" /></div>
                  <div class="recent-title">Convert ETH</div>
                  <div class="recent-date">09/30/2022, 18:00:00</div>
                </div>
                <div class="recent-count up">+0.0776 ETH</div>
              </div>
              <el-divider style="margin-left: -20px; width: 200%" />
              <div class="recent-box">
                <div class="box-left clearfloat">
                  <div class="rencent-image"><img :src="icon_deposit" /></div>
                  <div class="recent-title">Deposit USDT</div>
                  <div class="recent-date">09/30/2022, 18:00:00</div>
                </div>
                <div class="recent-count up">+3,499 USDT</div>
              </div>
              <el-divider style="margin-left: -20px; width: 200%" />
              <div class="recent-box">
                <div class="box-left clearfloat">
                  <div class="rencent-image">
                    <img :src="icon_withdrawal" />
                  </div>
                  <div class="recent-title">Withdrawal USDT</div>
                  <div class="recent-date">09/30/2022, 18:00:00</div>
                </div>
                <div class="recent-count down">-3,431 USDT</div>
              </div>
              <el-divider style="margin-left: -20px; width: 200%" />
              <div class="recent-box">
                <div class="box-left clearfloat">
                  <div class="rencent-image"><img :src="icon_gift" /></div>
                  <div class="recent-title">Get From Activity ETHW</div>
                  <div class="recent-date">09/30/2022, 18:00:00</div>
                </div>
                <div class="recent-count up">+0.01 ETHW</div>
              </div>
              <el-divider style="margin-left: -20px; width: 200%" /> -->

              <!-- <div class="view-more">{{ $t('messages.wallet.wallet_more') }} &gt</div> -->
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onUnmounted, onMounted, computed, inject } from "vue";
import type { Ref } from "vue";
import { ArrowDown, Search, Paperclip } from "@element-plus/icons-vue";
import GetButton from "../../../../components/GetButton.vue";
import Table from "../History/component/Table.vue";

import overview_eye from "../../../../assets/wallet/overview_eye.png";
import wallet_select_usdt_on from "../../../../assets/wallet/wallet_select_usdt_on.png";
import wallet_search_none from "../../../../assets/wallet/wallet_search_none.png";
import icon_convert from "../../../../assets/wallet/icon_convert.png";
import icon_deposit from "../../../../assets/wallet/icon_deposit.png";
import icon_withdrawal from "../../../../assets/wallet/icon_withdrawal.png";
import moment from "moment";
import { getMyAssets } from "../../../../api/wallet";
import type { Transaction } from "../../../../models/transactions";

import { useI18n } from "vue-i18n";
import { AssetsData } from "../../../../models/assets";
import { CurrencyType } from "../../../../models/currencyType";
import { queryCurrenciesType } from "../../../../api/currencies";
const { t } = useI18n();

const windowWidth = ref(window.document.body.offsetWidth);
const currenciesTypesCrypto = ref<CurrencyType[]>([])
onMounted(async () => {
  window.addEventListener("resize", resetWidth);
  // 
  const res = await queryCurrenciesType()
  console.log(res)
  if (res.status == 200) {
    if (res.data.content) {
      currenciesTypesCrypto.value = res.data.content?.sort((e:CurrencyType, f:CurrencyType)=> e.id-f.id)
    }
  }
});
onUnmounted(() => {
  window.removeEventListener("resize", resetWidth);
});
function resetWidth() {
  windowWidth.value = window.document.body.offsetWidth;
}

const firstSelect = ref("")
const firstIcon = computed(()=>{
  if(firstSelect){
    const arr = currenciesTypesCrypto.value.find((e)=> e.slug == firstSelect.value)
    return arr ? arr.icon : ""
  }
  return ""
})
const assetsData = inject<Ref<AssetsData[]>>("assetsData");
const TotalAmount = computed(() => {
  let count = 0;
  if (assetsData) {
    assetsData.value.forEach((v) => {
      count += parseFloat(v.balance);
    });
    return count.toFixed(2);
  } else {
    return 0;
  }
});
const selectedBalance = computed(() => {
  const arr = assetsData?.value.find((e) => e.alphabeticCode == firstSelect.value)
  if (arr) {
    return Number(arr.balance).toFixed(4)
  }
  return 0.0.toFixed(4)
});
const tableData = computed(() => {
  if (assetsData) {
    return assetsData.value.map((v) => {
      let isAsset =
        (Number(parseFloat(v.balance).toFixed(4)) / Number(TotalAmount.value)) *
        100;
      return {
        crypto: v.caption,
        fullname: v.currency,
        icon: currenciesTypesCrypto.value.find((e)=> e.slug == v.alphabeticCode)?.icon,
        asset: parseFloat(v.balance).toFixed(4),
        amount: "₮" + parseFloat(v.balance).toFixed(2),
        TxID: isNaN(isAsset) ? 0 : isAsset,
        buy: "Buy",
        sell: "Sell",
        more: "More",
      };
    });
  }
});
const noneOverView = computed(() => {
  if (assetsData) {
    return !(assetsData.value.length > 0);
  } else {
    return false;
  }
});
//transactions
const transactions = inject<Ref<Transaction[]>>("transactions");
const viewTransactions = computed(() => {
  if (transactions) {
    return !!(transactions.value.length > 0);
  } else {
    return false;
  }
});

//Recent transactions --- icon
const iconCollectsState = ref({
  deposit: {
    icon: icon_deposit,
    class: ["recent-count", "up"],
    prefix: "+",
  },
  exchange: {
    icon: icon_convert,
    class: ["recent-count"],
    prefix: "",
  },
  external: {
    icon: "",
    class: ["recent-count"],
    prefix: "",
  },
  partner: {
    icon: icon_convert,
    class: ["recent-count"],
    prefix: "",
  },
  transfer: {
    icon: "",
    class: ["recent-count"],
    prefix: "",
  },
  withdrawal: {
    icon: icon_withdrawal,
    class: ["recent-count", "down"],
    prefix: "-",
  },
});
//Recent transactions --- title
const transactionsTitle = (data: Transaction) => {
  console.log(data);
  if (data.method) {
    return data.method.name;
  } else {
    return `Wallet ${data.debitDetails.currency.alphabeticCode} | ${data.debitDetails.account.accountNumber}`;
  }
};
const transactionsAmount = (data: Transaction) => {
  let amount = "";
  let currency = "";
  if (data.debitDetails) {
    amount = parseFloat(data.debitDetails.amount).toFixed(
      data.debitDetails.currency.minorUnit
    );
    currency = data.debitDetails.currency.alphabeticCode;
  } else if (data.creditDetails) {
    amount = parseFloat(data.creditDetails.amount).toFixed(
      data.creditDetails.currency.minorUnit
    );
    currency = data.creditDetails.currency.alphabeticCode;
  }
  return iconCollectsState.value[data.type].prefix + amount + " " + currency;
};

interface User {
  date: string;
  name: string;
  address: string;
}
const format = (percentage: number) =>
  percentage === 100 ? "Full" : `${percentage}%`;
const deposit = ref("Deposit");
const buy = ref("Buy");
const convert = ref("Convert");
const withdraw = ref("Withdraw");
const transfer = ref("Transfer");

const tableInput = ref("");
const checked = ref(false);
// const tableData = ref([
//   {
//     crypto: "USDT",
//     fullname: "Tether",
//     icon: crypto_icon_usdt,
//     asset: "868.0000",
//     amount: "₮868.00",
//     TxID: "88.45",
//     buy: "Buy",
//     sell: "Sell",
//     more: "More",
//   },
//   {
//     crypto: "ETH",
//     fullname: "Ethereum",
//     icon: crypto_icon_eth,
//     asset: "0.0100",
//     amount: "₮113.19",
//     TxID: "11.53",
//     buy: "Buy",
//     sell: "Sell",
//     more: "More",
//   },
//   {
//     crypto: "BTC",
//     fullname: "Bitcoin",
//     icon: crypto_icon_btc,
//     asset: "0.0100",
//     amount: "₮0.10",
//     TxID: "0.01",
//     buy: "Buy",
//     sell: "Sell",
//     more: "More",
//   },
//   {
//     crypto: "USDC",
//     fullname: "USD Coin",
//     icon: crypto_icon_usdc,
//     asset: "0.0000",
//     amount: "₮0.00",
//     TxID: "0.00",
//     buy: "Buy",
//     sell: "Sell",
//     more: "More",
//   },
//   {
//     crypto: "USDC",
//     fullname: "USD Coin",
//     icon: crypto_icon_usdc,
//     asset: "0.0000",
//     amount: "₮0.00",
//     TxID: "0.00",
//     buy: "Buy",
//     sell: "Sell",
//     more: "More",
//   },
//   {
//     crypto: "USDC",
//     fullname: "USD Coin",
//     icon: crypto_icon_usdc,
//     asset: "0.0000",
//     amount: "₮0.00",
//     TxID: "0.00",
//     buy: "Buy",
//     sell: "Sell",
//     more: "More",
//   },
//   {
//     crypto: "USDC",
//     fullname: "USD Coin",
//     icon: crypto_icon_usdc,
//     asset: "0.0000",
//     amount: "₮0.00",
//     TxID: "0.00",
//     buy: "Buy",
//     sell: "Sell",
//     more: "More",
//   },
//   {
//     crypto: "USDC",
//     fullname: "USD Coin",
//     icon: crypto_icon_usdc,
//     asset: "0.0000",
//     amount: "₮0.00",
//     TxID: "0.00",
//     buy: "Buy",
//     sell: "Sell",
//     more: "More",
//   },
//   {
//     crypto: "USDC",
//     fullname: "USD Coin",
//     icon: crypto_icon_usdc,
//     asset: "0.0000",
//     amount: "₮0.00",
//     TxID: "0.00",
//     buy: "Buy",
//     sell: "Sell",
//     more: "More",
//   },
//   {
//     crypto: "USDC",
//     fullname: "USD Coin",
//     icon: crypto_icon_usdc,
//     asset: "0.0000",
//     amount: "₮0.00",
//     TxID: "0.00",
//     buy: "Buy",
//     sell: "Sell",
//     more: "More",
//   },
//   {
//     crypto: "USDC",
//     fullname: "USD Coin",
//     icon: crypto_icon_usdc,
//     asset: "0.0000",
//     amount: "₮0.00",
//     TxID: "0.00",
//     buy: "Buy",
//     sell: "Sell",
//     more: "More",
//   },
// ]);
// const tableData = computed(() => {
//   if (checked.value === false) return tableData;
//   return tableData.filter((v) => v.tag.includes(tableData.value));
// });
</script>

<style scoped lang="scss">
$fontCol: #7b8293;
$fontSizeMax: 42px;
$fontSizeMedPro: 28px;
$fontSizeMed: 24px;
$fontSizeDefPro: 18px;
$fontSizeDef: 16px;
$fontSizeMinPro: 14px;
$fontSizeMin: 12px;

.minMainFont {
  font-size: $fontSizeDef;
  color: #7b8293;
  line-height: $fontSizeDefPro;
}

:deep() {
  .el-card {
    --el-card-border-radius: 5px;
  }
}

.overview-date-page {
  max-width: 1290px;
  margin: auto;

  .left-box {
    .left-value {
      width: 100%;
      padding: 24px 23px 21px 23px;
      border: 1px solid #ebebeb;
      border-radius: 5px;

      .value-top {
        font-size: 18px;
        color: #000;
        line-height: 22px;

        img {
          margin-left: 15px;
          width: 17px;
          height: 13px;
        }
      }

      .value-center {
        margin-top: 18px;
        display: flex;
        font-size: 32px;
        color: #000;
        line-height: 38px;
        float: left;

        @media (max-width: 768px) {
          // display: none;
        }

        button.language-chose {
          margin-left: 19px;
          margin-top: 3px;
          display: flex;
          align-items: center;
          width: 103px;
          height: 30px;
          line-height: 19px;
          font-size: 14px;
          background: none;
          border: 1px solid #e2e2e2;
          border-radius: 2px;
          padding: 0 10px;

          img {
            width: 20px;
            margin-right: 6px;
            vertical-align: middle;
          }

          svg {
            margin-left: 5px;
          }

          :deep(el-icon) {
            width: 18px !important;
          }
        }
      }

      .value-bottom {
        text-align: center;

        @media (max-width: 768px) {
          width: 295px;
        }

        :deep(.button) {
          width: 110px;
        }

        .bottom-image {
          margin-top: 17px;
        }

        .bottom-btn {
          margin-top: 21px;
          display: flex;
          float: right;
          justify-content: space-between;

          :depp(.button) {
            padding: 0;
            font-size: 12px;
          }

          .deposit-btn {
            margin-left: -10px;
            font-size: 12px;
            width: 70px;
            height: 30px;
            padding: 0;
            font-weight: 100;
          }

          .func-btn {
            width: 70px;
            height: 30px;
            font-size: 12px;

            margin-left: 10px;
            font-weight: 100;
            color: #000;
            background: #fff;
            border: 1px solid #dfdfe5;
            padding: 0;

            @media (max-width: 768px) {
              margin-left: 5px;
              // margin-top: 5px;
            }
          }
        }
      }

      .value-table {
        .table-header {
          margin-top: 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .header-input {
            :deep() {
              .el-input__wrapper {
                padding: 0px;
                box-shadow: none;
              }

              .el-input__prefix-inner> :first-child,
              .el-input__prefix-inner> :first-child.el-input__icon {
                width: 20px;
              }

              .el-icon svg {
                width: 20px;
                height: 20px;
              }
            }
          }

          .header-hide {
            :deep(.el-checkbox) {
              font-size: 12px;
              color: #000000;
              line-height: 14px;
              font-weight: 400;
              --el-checkbox-checked-input-border-color: #01c19a;
              --el-checkbox-checked-bg-color: #01c19a;
              --el-checkbox-input-border-color-hover: #01c19a;

              .el-checkbox__input.is-checked+.el-checkbox__label {
                color: #000;
              }
            }
          }
        }

        .table-body {
          :deep() {
            .el-table .cell {
              line-height: 16px;
              padding: 0 18px;
            }

            .el-progress-bar__inner {
              background-color: #01c19a;
            }
          }

          .table-crypto {
            float: left;
            margin-left: 16px;
          }

          .tip-text {
            font-size: 12px;
            color: #9b9b9b;
          }

          .progress {
            .progress-bar {
              float: right;
              margin-top: 5px;
              width: 100px;
            }
          }

          .table-btn {
            color: #01c19a !important;
          }
        }
      }
    }
  }

  .right-recent {
    @media (max-width: 1000px) {
      margin-top: 24px;
    }

    .card-header {
      span {
        font-size: 18px;
        color: #000000;
        line-height: 23px;
      }
    }

    .recent-card {
      box-shadow: none;
      width: 100%;
      padding-bottom: 16px;

      .recent-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 21px;

        .up {
          font-size: 16px;
          color: #01c19a;
          line-height: 18px;
          text-align: right;
        }

        .down {
          font-size: 16px;
          color: #f35854;
          line-height: 18px;
          text-align: right;
        }

        .box-left {

          // width: 80%;
          .rencent-image {
            float: left;
            width: 30px;

            img {
              width: 100%;
              height: 100%;
              object-fit: contain;
            }
          }

          .recent-title {
            font-size: 14px;
            color: #000000;
            line-height: 16px;
            margin-left: 43px;
          }

          .recent-date {
            margin-left: 43px;
            margin-top: 4px;
            font-size: 12px;
            color: #7b8293;
            line-height: 14px;
          }
        }
      }

      .recent-count {
        text-align: right;
      }

      .view-more {
        float: right;
        font-size: 14px;
        color: #7b8293;
        line-height: 16px;
      }
    }
  }
}

.value-view-more {
  float: right;
  font-size: 14px;
  color: #7b8293;
  line-height: 16px;
  padding-top: 20px;
}

.empty-transactions {
  .value-bottom {
    text-align: center;

    .bottom-image {
      width: 85px;
      margin: auto 42%;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
}
</style>
