<template>
  <div class="kyc-page">
    <Header/>
    <div class="kyc-box">
      <div id="sumsub-websdk-container"></div>
      <div v-show="reviewAnswer === 'RED'" class="recertification-btn" @click="resetBtn">Recertification</div>
    </div>
    <Footer v-if="windowWidth > 769"/>
    <FooterMobile v-if="windowWidth <= 769" />
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onUnmounted, watch} from "vue";
import snsWebSdk from '@sumsub/websdk';

import Header from "../../layout/Header/Header.vue";
import FooterMobile from "../../layout/Footer/FooterMobile.vue";
import Footer from "../../layout/Footer/Footer.vue";

import {genKycToken,resetKyc} from "../../api/kyc";
import { getUserInfo } from "../../api/user";
import {useRoute, useRouter} from "vue-router";
import {useI18n} from "vue-i18n";

const {t} = useI18n();
const route = useRoute();
const router = useRouter();
const windowWidth = ref(window.document.body.offsetWidth);

const reviewAnswer = ref()

onMounted(() => {
  window.addEventListener("resize", resetWidth);
  // 买 buy 卖 sell
  const type = route.query.type as string;
  genKycToken({type}).then((res) => {
    launchWebSdk(res.data.data.token);
  });
  componentDidMount()
});
onUnmounted(() => {
  window.removeEventListener("resize", resetWidth);
});

function resetWidth() {
  windowWidth.value = window.document.body.offsetWidth;
}

function launchWebSdk(token: string) {
  let snsWebSdkInstance = snsWebSdk.init(
      token,
      () => getNewAccessToken()
  )
      .withConf({
        lang: 'en', //language of WebSDK texts and comments (ISO 639-1 format)
        email: "",
        phone: "",
        // i18n: '', //JSON of custom SDK Translations
        uiConf: {
          customCss: "https://url.com/styles.css"
        },
      })
      .withOptions({addViewportTag: false, adaptIframeHeight: true})
      // see below what kind of messages WebSDK generates
      .on('idCheck.stepCompleted', (payload) => {
        console.log('stepCompleted------idCheck.stepCompleted', payload)
      })
      .on('idCheck.onError', (error) => {
        console.log('onError*******idCheck.onError', error)
      })
      .on('idCheck.applicantStatus', (res:any) => {
        console.log(res,'*******')
        if (res.reviewStatus === 'completed') {
          reviewAnswer.value = res.reviewResult.reviewAnswer;
        }
      })
      .build();

  snsWebSdkInstance.launch('#sumsub-websdk-container')
}
let time:any = null;
function componentDidMount() {
  time = setInterval(() => {
    getUserInfo({}).then((res) => {
      const kycData = res.data.data.kyc;
      const filteredData = kycData.filter((kyc:any) => kyc.type === 'buy' && kyc.status === 'GREEN');
      if(route.query.type === 'buy' && filteredData.length > 0) {
        router.push('/user/depositFiat');
      }
      const filteredSell = kycData.filter((kyc:any) => kyc.type === 'sell' && kyc.status === 'GREEN');
      if(route.query.type === 'sell' && filteredSell.length > 0) {
        router.push('/user/bankaccount');
      }
    })
  }, 5000)
}
function resetBtn() {
  resetKyc({"type": route.query.type as string}).then((
      res
  ) => {
    genKycToken({type: route.query.type as string}).then((res) => {
      launchWebSdk(res.data.data.token);
    });
  })
}
function getNewAccessToken() {
  return Promise.resolve("xxxx")// get a new token from your backend
}
watch(() => route.path, () => {
  if (route.path === '/user/depositFiat') {
    checkKYCStatus();
    console.log('watch触发更新 deposit')
  }
});

function checkKYCStatus() {
  const storedData = JSON.parse(localStorage.getItem('useInfo') || '{}');
  const kycStatus = storedData.userInfo && storedData.userInfo.kyc && storedData.userInfo.kyc[0].status;
  console.log(kycStatus); // 这应该打印出 'GREEN'
  if (kycStatus === 'GREEN') {
    // 如果 KYC 状态为 'GREEN'，则重新加载页面
  setTimeout(() => {
    router.push('/user/depositFiat');
    console.log('触发跳转');
  }, 500);
  } else {
    console.log('失败');
  }
}
</script>

<style scoped lang="scss">
$fontSizeMax: 42px;
$fontSizeMed: 24px;
$fontSizeDefPro: 18px;
$fontSizeDef: 16px;
$fontSizeMin: 12px;
.kyc-box {
  position: relative;
  min-height: calc(100vh - 120px);
  @media(max-width: 768px) {
    min-height: calc(100vh - 10px);
  }
}
.recertification-btn{
  //position: absolute;
  //right: 50px;
  //top: 20%;
  width: 15%;
  margin: auto;
  border-radius: 10px;
  border: 1px solid rgb(142,146,155);
  color: rgb(142,146,155);
  padding: 5px 10px;
  cursor: pointer;
  text-align: center
}

.part {
  max-width: 1290px;
  margin: auto;
}

.kyc-page {
  position: relative;

  .top-part {
    background: #1d262f;
    width: 100%;
    height: 440px;
    position: relative;
    display: flex;

    .top-part-box {
      margin: auto;
      text-align: center;
      width: 654px;
      @media (max-width: 769px) {
        & {
          padding: 0 5%;
        }
      }

      .top-part-title {
        font-size: $fontSizeMax;
        color: #01c19a;
        font-weight: 600;
        line-height: 51px;
        // @media (max-width: 769px) {
        //   & {
        //     font-size: $fontSizeMed !important;
        //   }
        // }
      }

      .top-part-content {
        font-size: $fontSizeMed;
        color: #ffffff;
        margin-top: 12px;
        line-height: 29px;
        @media (max-width: 769px) {
          & {
            font-size: $fontSizeDef !important;
            width: 70%;
            margin: auto;
          }
        }
      }

      .top-part-msg {
        font-size: $fontSizeDef;
        color: #ffffff;
        line-height: 19px;
        margin-top: 18px;
        @media (max-width: 769px) {
          & {
            font-size: $fontSizeMin !important;
            width: 80%;
            margin: auto;
            margin-top: 10px;
          }
        }
      }
    }
  }

  .center-part {
    background-color: #ffffff;
    margin-top: 110px;
    @media (max-width: 1400px) {
      & {
        max-width: 940px;
      }
    }
    @media (max-width: 985px) {
      margin-top: 60px;
    }

    :deep(.el-row) {
      @media (max-width: 985px) {
        width: 100%;
        flex-direction: column;
        gap: 45px;
      }
    }

    .center-box {
      width: 100%;
      background-color: #ffffff;
      box-shadow: 0 0 15px 0 rgba(95, 95, 95, 0.19);
      border-radius: 8px;
      text-align: center;
      padding: 20px;
      height: 440px;
      @media (max-width: 1400px) {
        width: 310px;
      }
      @media (max-width: 985px) {
        width: 320px;
        height: 340px;
      }

      .center-img {
        display: flex;
        margin: auto;
        width: 73px;
        height: auto;
        margin-top: -44px;
        @media (max-width: 985px) {
          width: 63px;
          height: auto;
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }

      .center-title {
        font-size: $fontSizeMed;
        color: #01c19a;
        font-weight: bold;
        padding-top: 30px;
        @media (max-width: 985px) {
          & {
            padding-top: 20px !important;
            font-size: $fontSizeDef !important;
          }
        }
      }

      .center-tips {
        font-size: $fontSizeDef;
        color: #060606;
        font-weight: bold;
        margin-top: 18px;
        @media (max-width: 985px) {
          & {
            padding-top: 10px !important;
            font-size: $fontSizeMin !important;
          }
        }
      }

      .rate {
        padding: 20px 0;

        .center-currency {
          font-size: 26px;
          color: #01c19a;
          font-weight: bold;
          padding-top: 40px;
          display: flex;
          padding-left: 18%;

          img {
            width: 100%;
            height: 100%;
          }

          @media (max-width: 1400px) {
            & {
              padding-left: 12%;
            }
          }
          @media (max-width: 985px) {
            & {
              padding-top: 30px !important;
              font-size: $fontSizeMed !important;
            }
          }
        }

        .center-number {
          margin-top: -60px;
          font-weight: bold;
          font-size: 100px;
          color: #01c19a;
          @media (max-width: 985px) {
            & {
              margin-top: -46px !important;
              font-size: 70px !important;
            }
          }
        }
      }

      .msg {
        line-height: 26px;
        color: #878787;
        font-size: $fontSizeDef;
        @media (max-width: 985px) {
          & {
            font-size: $fontSizeMin !important;
          }
        }
      }
    }
  }

  .bottom-part {
    background-color: #f8f8f8;
  }
}
</style>
