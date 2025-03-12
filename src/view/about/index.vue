<template>
  <div class="about-page">
    <Header />

    <div class="top-part max1290 special-width">
      <el-row :gutter="20">
        <el-col :span="12" :xs="24">
          <div class="tab-content-title">Welcome to Coinflake</div>
          <div class="tab-content-tip">
            Coinflake is an innovative cryptocurrency exchange who providing safe and
            trustworthy digital currencies exchange services to its users.
          </div>
          <div class="tab-content-tip">
            Users can enjoy the simplest way to start trading and Zero-Fee Deposit, and
            trading hundreds of Cryptos with your local FAIT pairs in Coinflake
          </div>
        </el-col>
        <el-col :span="10" :xs="24">
          <div class="part-img">
            <img :src="aboutus_icons_01" />
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="top-part gray max1290 special-width">
      <el-row :gutter="30">
        <el-col :span="11" :xs="24">
          <div class="tab-content-title">Our mission</div>
          <div class="tab-content-tip">
            We strive to eliminate the barriers and evolve the global economy. We are
            dedicated to innovate and improve our user experience to make cryptocurrency
            trading and investing available for everyone
          </div>
        </el-col>
        <el-col :span="10" :xs="24">
          <div class="part-img">
            <img :src="aboutus_icons_02" />
          </div>
        </el-col>
      </el-row>
    </div>

    <div>
      <div class="top-part max1290" v-if="windowWidth > 769">
        <el-row class="last-width">
          <el-col :span="10" :xs="24">
            <div class="part-img">
              <img :src="aboutus_icons_03" />
            </div>
          </el-col>
          <el-col :span="11" :xs="24">
            <div class="tab-content-title">Trust & Transparency</div>
            <div class="tab-content-tip">
              Trust & Transparency are at the heart of everything we do. From the
              beginning, we made user protection and transparency our top priority. We
              implement highly sophisticated multi-layered security for users funds and
              data.
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="top-part max1290" v-else>
        <el-row :gutter="30" class="min-pad">
          <el-col :span="11" :xs="24">
            <div class="tab-content-title">Trust & Transparency</div>
            <div class="tab-content-tip">
              Trust & Transparency are at the heart of everything we do. From the
              beginning, we made user protection and transparency our top priority. We
              implement highly sophisticated multi-layered security for users funds and
              data.
            </div>
          </el-col>
          <el-col :span="10" :xs="24">
            <div class="part-img">
              <img :src="aboutus_icons_03" />
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="top-part gray max1290 special-width">
      <el-row :gutter="30" class="min-pad">
        <el-col :span="11" :xs="24">
          <div class="tab-content-title">Working with regulators</div>
          <div class="tab-content-tip">
            COINFLAKE is committed to meeting the highest standards for regulatory
            compliance to maintain our responsibility to our users.
          </div>
        </el-col>
        <el-col :span="10" :xs="24">
          <div class="part-img">
            <img :src="aboutus_icons_04" />
          </div>
        </el-col>
      </el-row>
    </div>
    <div>
      <div class="top-part max1290" v-if="windowWidth > 769">
        <el-row :gutter="30" class="last-width">
          <el-col :span="10" :xs="24">
            <div class="part-img">
              <img :src="aboutus_icons_05" />
            </div>
          </el-col>
          <el-col :span="11" :xs="24">
            <div class="tab-content-title" style="margin-top: 50px;">Coinflake’s registered</div>
            <div class="tab-content-tip" style="line-height: 44px">
              Coinflake’s registered <br />
              Australian Transaction Reports & Analysis Centre <br />
              100872254 <br />
              Digital Currency Exchange <br />
              DCE100872254-001 
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="top-part max1290" v-else>
        <el-row :gutter="30">
          <el-col :span="11" :xs="24">
            <div class="tab-content-title">Coinflake’s registered</div>
            <div class="tab-content-tip" style="line-height: 44px">
              Coinflake’s registered <br />
              Australian Transaction Reports & Analysis Centre <br />
              100872254 <br />
              Digital Currency Exchange <br />
              DCE100872254-001 
            </div>
          </el-col>
          <el-col :span="10" :xs="24">
            <div class="part-img">
              <img :src="aboutus_icons_05" />
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <footer v-if="windowWidth > 769">
      <div class="footer-box max1290">
        <div class="footer-logo">
          <div class="footer-title">
            {{ $t("messages.footer.start") }}
          </div>
          <div class="footer-trade">
            <div class="buy" @click="goToKyc('buy')">{{ $t("messages.footer.buy") }}</div>
            <div class="sell" @click="goToKyc('sell')">
              {{ $t("messages.footer.sell") }}
            </div>
          </div>
          <div class="footer-info">
            <div class="info">{{ $t("messages.footer.smsf") }}</div>
            <a href="/centerContent/11" style="color: #f0b90a; font-size: 14px">{{
              $t("messages.footer.more")
            }}</a>
            <div
              style="
                margin-top: 32px;
                margin-bottom: 20px;
                font-size: 14px;
                color: #808080;
              "
            >
              {{ $t("messages.footer.purchase") }}
            </div>
          </div>
          <!-- <div class="lan-box">
          <div class="lan-icon">
            <img :src="top_en" alt="" />
          </div>
          <el-select
            v-model="currentLanguage"
            class="selectLan"
            placeholder="Select"
            size="large"
            @change="changeLanguage"
            :popper-append-to-body="false"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div> -->
        </div>

        <div class="link-cards">
          <ul class="link-list">
            <li>{{ $t("messages.footer.about") }}</li>
            <li>
              <a
                href="javascript:void(0)"
                @click="goToKyc('buy')"
                style="color: rgb(144, 144, 144); text-decoration: none"
                >{{ $t("messages.footer.about_us") }}</a
              >
            </li>
            <li>
              <a
                href="javascript:void(0)"
                @click="goToKyc('sell')"
                style="color: rgb(144, 144, 144); text-decoration: none"
                >{{ $t("messages.footer.contact_us") }}</a
              >
            </li>
          </ul>
          <ul class="link-list">
            <li>{{ $t("messages.footer.legal") }}</li>
            <li>
              <a
                href="/au/learnList?type=1"
                style="color: rgb(144, 144, 144); text-decoration: none"
                >{{ $t("messages.footer.terms") }}</a
              >
            </li>
            <li>
              <a
                href="/au/learnList?type=2"
                style="color: rgb(144, 144, 144); text-decoration: none"
                >{{ $t("messages.footer.privacy") }}</a
              >
            </li>
            <li>
              <a
                href="/au/learnList?type=3"
                style="color: rgb(144, 144, 144); text-decoration: none"
                >{{ $t("messages.footer.EOFY") }}</a
              >
            </li>
            <li>
              <a
                href="/au/learnList?type=4"
                style="color: rgb(144, 144, 144); text-decoration: none"
                >{{ $t("messages.footer.FAQs") }}</a
              >
            </li>
            <li>
              <a
                href="/au/learnList?type=5"
                style="color: rgb(144, 144, 144); text-decoration: none"
                >{{ $t("messages.footer.fifth_label") }}</a
              >
            </li>
            <!-- <li @click="dialogTableVisible = true">
            {{ $t("messages.footer.kyc_aml") }}
          </li> -->
          </ul>
          <ul class="link-list">
            <li>{{ $t("messages.footer.service") }}</li>
            <li>
              <a href="/au" style="color: #909090; text-decoration: none"
                ><span class="flag-icon" :class="'flag-icon-au'"></span>
                {{ $t("messages.footer.service_instant") }}</a
              >
            </li>
            <!-- <li>
              <a href="/nz" style="color: #909090; text-decoration: none"
                ><span class="flag-icon" :class="'flag-icon-nz'"></span>
                {{ $t("messages.footer.Zealand") }}</a
              >
            </li> -->
            <!-- <li>{{ $t("messages.footer.service_spot_trading") }}</li> -->
          </ul>
          <ul class="link-list">
            <li>{{ $t("messages.footer.LEGAL") }}</li>
            <li>
              <a href="/centerContent/25" style="color: #909090; text-decoration: none">{{
                $t("messages.footer.terms_conditions")
              }}</a>
            </li>
            <li>
              <a href="/centerContent/26" style="color: #909090; text-decoration: none">{{
                $t("messages.footer.policy")
              }}</a>
            </li>
            <li>
              <a href="/centerContent/27" style="color: #909090; text-decoration: none">{{
                $t("messages.footer.aml")
              }}</a>
            </li>
          </ul>
          <ul class="link-list">
            <li>{{ $t("messages.footer.support") }}</li>
            <li>
              <router-link
                v-if="$route.path.startsWith('/au')"
                to="/au/about"
                style="color: #909090; text-decoration: none"
                >{{ $t("messages.footer.us") }}
              </router-link>
              <router-link
                v-if="$route.path.startsWith('/nz')"
                to="/nz/about"
                style="color: #909090; text-decoration: none"
                >{{ $t("messages.footer.us") }}
              </router-link>
            </li>
            <li>
              <router-link
                v-if="$route.path.startsWith('/nz')"
                to="/nz/contact"
                style="color: #909090; text-decoration: none"
              >
                {{ $t("messages.footer.support_center") }}
              </router-link>
              <router-link
                v-if="$route.path.startsWith('/au')"
                to="/au/contact"
                style="color: #909090; text-decoration: none"
              >
                {{ $t("messages.footer.support_center") }}
              </router-link>
            </li>
            <!-- <li>
            <a
              href="/contact"
              style="color: rgb(144, 144, 144); text-decoration: none"
              >{{ $t("messages.footer.support_connect") }}</a
            >
          </li> -->
          </ul>
        </div>
      </div>
    </footer>
    <footer v-else>
      <div class="footer-links" style="padding: 20px">
        <div class="footer-logo">
          <div class="footer-title">
            {{ $t("messages.footer.start") }}
          </div>
          <div class="footer-trade" style="justify-content: flex-start">
            <div class="buy" @click="goToKyc('buy')">Buy</div>
            <div class="sell" @click="goToKyc('sell')">Sell</div>
          </div>
          <div class="footer-info">
            <div class="info">{{ $t("messages.footer.smsf") }}</div>
            <a href="/centerContent/11" style="color: #f0b90a; font-size: 14px">{{
              $t("messages.footer.more")
            }}</a>
            <div
              style="
                margin-top: 32px;
                margin-bottom: 20px;
                font-size: 14px;
                color: #808080;
              "
            >
              {{ $t("messages.footer.purchase") }}
            </div>
          </div>
          <!-- <div class="lan-box">
          <div class="lan-icon">
            <img :src="top_en" alt="" />
          </div>
          <el-select
            v-model="currentLanguage"
            class="selectLan"
            placeholder="Select"
            size="large"
            @change="changeLanguage"
            :popper-append-to-body="false"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div> -->
        </div>

        <div class="footer-logoinfo"></div>
        <div class="link-list">
          <div class="part09-collapse">
            <el-collapse v-model="activeNamesFoot" @change="handleFootChange">
              <el-collapse-item name="1">
                <template #title>
                  <div class="el-collapse-item-title">
                    {{ $t("messages.footer.about") }}
                  </div>
                </template>
                <div class="list-item">
                  <a
                    href="javascript:void(0)"
                    @click="goToKyc('buy')"
                    style="color: rgb(144, 144, 144); text-decoration: none"
                    >{{ $t("messages.footer.about_us") }}</a
                  >
                </div>
                <div class="list-item">
                  <a
                    href="javascript:void(0)"
                    @click="goToKyc('sell')"
                    style="color: rgb(144, 144, 144); text-decoration: none"
                    >{{ $t("messages.footer.contact_us") }}</a
                  >
                </div>
                <!--                <div class="list-item">-->
                <!--                  <a-->
                <!--                      href="/fees"-->
                <!--                      style="color: rgb(144, 144, 144); text-decoration: none"-->
                <!--                  >{{ $t("messages.footer.fees") }}</a-->
                <!--                  >-->
                <!--                </div>-->
              </el-collapse-item>
              <el-collapse-item name="2">
                <template #title>
                  <div class="el-collapse-item-title">
                    {{ $t("messages.footer.legal") }}
                  </div>
                </template>
                <div class="list-item">
                  <a
                    href="/au/learnList?type=1"
                    style="color: rgb(144, 144, 144); text-decoration: none"
                    >{{ $t("messages.footer.terms") }}</a
                  >
                </div>
                <div class="list-item">
                  <a
                    href="/au/learnList?type=2"
                    style="color: rgb(144, 144, 144); text-decoration: none"
                    >{{ $t("messages.footer.privacy") }}</a
                  >
                </div>
                <!-- <div class="list-item" @click="dialogTableVisible = true">
                  {{ $t("messages.footer.EOFY") }}
                </div> -->
                <div class="list-item">
                  <a
                    href="/au/learnList?type=3"
                    style="color: rgb(144, 144, 144); text-decoration: none"
                    >{{ $t("messages.footer.EOFY") }}</a
                  >
                </div>
                <div class="list-item">
                  <a
                    href="/au/learnList?type=4"
                    style="color: rgb(144, 144, 144); text-decoration: none"
                    >{{ $t("messages.footer.FAQs") }}</a
                  >
                </div>
              </el-collapse-item>
              <el-collapse-item name="3">
                <template #title>
                  <div class="el-collapse-item-title">
                    {{ $t("messages.footer.service") }}
                  </div>
                </template>
                <div class="list-item">
                  <a href="/au" style="color: #909090; text-decoration: none"
                    ><span class="flag-icon" :class="'flag-icon-au'"></span>
                    {{ $t("messages.footer.service_instant") }}</a
                  >
                </div>
                <!-- <div class="list-item">
                  <a href="/nz" style="color: #909090; text-decoration: none"
                    ><span class="flag-icon" :class="'flag-icon-nz'"></span>
                    {{ $t("messages.footer.Zealand") }}</a
                  >
                </div> -->
              </el-collapse-item>
              <el-collapse-item name="4">
                <template #title>
                  <div class="el-collapse-item-title">
                    {{ $t("messages.footer.LEGAL") }}
                  </div>
                </template>
                <div class="list-item">
                  <a
                    href="/centerContent/25"
                    style="color: #909090; text-decoration: none; display: block"
                  >
                    {{ $t("messages.footer.terms_conditions") }}
                  </a>
                </div>
                <div class="list-item">
                  <a
                    href="/centerContent/26"
                    style="color: #909090; text-decoration: none; display: block"
                  >
                    {{ $t("messages.footer.policy") }}
                  </a>
                </div>
                <div class="list-item">
                  <a
                    href="/centerContent/27"
                    style="color: #909090; text-decoration: none; display: block"
                  >
                    {{ $t("messages.footer.aml") }}
                  </a>
                </div>
              </el-collapse-item>
              <el-collapse-item name="5">
                <template #title>
                  <div class="el-collapse-item-title">
                    {{ $t("messages.footer.support") }}
                  </div>
                </template>
                <div class="list-item">
                  <a href="/au/contact" style="color: #909090; text-decoration: none">
                    {{ $t("messages.footer.support_center") }}</a
                  >
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
        <!--        <div class="icon-links-min" style="font-size: 14px; color: #808080; line-height: 19px">-->
        <!--          {{ $t("messages.footer.dce_num") }}-->
        <!--        </div>-->
      </div>
    </footer>

    <Footer v-if="windowWidth > 769" />
    <FooterMobile v-if="windowWidth <= 769" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from "vue";
import Header from "../../layout/Header/Header.vue";
import FooterMobile from "../../layout/Footer/FooterMobile.vue";
import Footer from "../../layout/Footer/Footer.vue";
import joinCrypto from "../../layout/joinStarted/joinCrypto.vue";
import { useRouter } from "vue-router";

import aboutus_icons_01 from "../../assets/home/aboutus_icons_01.svg";
import aboutus_icons_02 from "../../assets/home/aboutus_icons_02.svg";
import aboutus_icons_03 from "../../assets/home/aboutus_icons_03.svg";
import aboutus_icons_04 from "../../assets/home/aboutus_icons_04.svg";
import aboutus_icons_05 from "../../assets/home/aboutus_icons_05.svg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const router = useRouter();
const windowWidth = ref(window.document.body.offsetWidth);
onMounted(() => {
  window.addEventListener("resize", resetWidth);

  gsap.from(".top-part-box", {
    opacity: 0,
    scale: 1.5, // Begin slightly larger to create a zoom effect
    duration: 2,
    ease: "power4.out",
    stagger: 0.05,
    delay: 0.2,
  });
  // 左边背景图的动画
  gsap.from(".back-left img", {
    duration: 2.5, // 动画持续时间
    x: -100, // 从左侧开始移动
    opacity: 0, // 从完全透明开始
    ease: "power2.out", // 平滑的缓动效果
    delay: 0.2, // 动画开始前的延迟
  });

  // 右边背景图的动画
  gsap.from(".back-right img", {
    duration: 2.5, // 动画持续时间
    x: 100, // 从右侧开始移动
    opacity: 0, // 从完全透明开始
    ease: "power2.out", // 平滑的缓动效果
    delay: 0.2, // 动画开始前的延迟
  });
  gsap.to(".back-center img", {
    scale: 1.5, // 略微放大到原始大小的105%
    duration: 2.5, // 动画持续时间
    ease: "power1.inOut", // 平滑的进出缓动效果
    yoyo: true, // 动画在放大和缩小之间循环
    repeat: -1, // 无限重复动画
    transformOrigin: "bottom center",
  });
  gsap.from(".part-box", {
    opacity: 0,
    y: 80,
    stagger: 0.2, // 依次动画
    duration: 1.6,
    scrollTrigger: {
      trigger: ".center-part",
      start: "top bottom", // 当部分进入视图中央时开始动画
      toggleActions: "play none reverse none",
    },
  });
});
onUnmounted(() => {
  window.removeEventListener("resize", resetWidth);
});
function resetWidth() {
  windowWidth.value = window.document.body.offsetWidth;
}
const active = ref("");
const active1 = ref("");
const active2 = ref("");
const active3 = ref("");
const activeNamesFoot = ref([""]);
const handleFootChange = (val: string[]) => {
  console.log(val);
};

const yr = () => {
  active.value = "background:#fff";
};
const yr1 = () => {
  active1.value = "background:#fff";
};
const yr2 = () => {
  active2.value = "background:#fff";
};
const yr3 = () => {
  active3.value = "background:#fff";
};
const yc = () => {
  active.value = "";
};
const yc1 = () => {
  active1.value = "";
};
const yc2 = () => {
  active2.value = "";
};
const yc3 = () => {
  active3.value = "";
};
function seventhMore() {
  router.push("/learnCenter");
}
const scamDialogVisible = ref(false);
const currentType = ref("");
const goToKyc = (type: string) => {
  scamDialogVisible.value = true;
  currentType.value = type;
};
const goKyc = (type: string) => {
  scamDialogVisible.value = true;
  currentType.value = type;
};
</script>

<style scoped lang="scss">
.about-page {
  background: #fff;
  position: relative;
  overflow: hidden;
  min-height: calc(100vh - 0px);
  .gray {
    background: #fafafa !important;
    position: relative;
    z-index: 1;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100%;
      background-color: #fafafa;
      z-index: -1;
    }
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: -100vw;
      width: 100vw;
      height: 100%;
      background-color: #fafafa;
      z-index: -1;
    }
  }
  .top-part {
    width: 100%;
    height: 600px;
    position: relative;
    display: flex;
    // max-width: 1440px;
    margin: auto;

    .back-center {
      position: absolute;
      bottom: -4px;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    .back-left {
      position: absolute;
      bottom: 0;
      width: 420px;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    .back-right {
      position: absolute;
      width: 420px;
      right: 0;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    .top-part-box {
      margin: auto;
      text-align: center;
      margin-top: 193px;

      @media (max-width: 985px) {
        margin: auto !important;
      }

      .top-part-img {
        width: 378px;
      }

      .top-part-content {
        width: 50%;
        margin: auto;
        font-size: 16px;
        color: #ffffff;
        margin-top: 30px;
        line-height: 20px;
      }
    }
  }
}

.part {
  // padding-bottom: 46px ;
  max-width: 1290px;
  margin: 0 auto;
}

@media (min-width: 985px) and (max-width: 1400px) {
  .part {
    max-width: 940px;
  }

  .part-title {
    width: 80% !important;
    font-size: 27px !important;
    //margin-top: 14px !important;
    line-height: 1;
    // margin: 0 !important;
  }

  .top-part-content {
    width: 60% !important;
  }

  .back-left {
    bottom: 48px !important;
    width: 400px !important;
    left: -70px !important;
  }

  .back-right {
    bottom: 48px !important;
    right: -32px !important;
    width: 400px !important;
  }
}

@media (min-width: 1400px) {
  .part-box {
    height: 580px !important;
  }

  .part-msg {
    margin-top: 130px !important;
  }

  .part-content {
    margin-top: 70px !important;
  }

  .top-part-content {
    width: 60% !important;
  }

  .back-right {
    top: 80px !important;
  }
}

@media (max-width: 985px) {
  .about-page .top-part {
    padding: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .about-page .top-part .hand_left {
    top: 80%;
  }

  .about-page .part-box {
    height: 300px !important;
    text-align: center;
    padding: 4% 5% 10% 5%;
  }

  .part-title {
    //padding-top: 5px !important;
    font-size: 20px !important;
    float: none !important;
    margin: 0 !important;
  }

  .top-part {
    height: 450px !important;
    @media (max-width: 992px) {
      height: 500px !important;
    }
  }

  .top-part-box {
    padding: 0 2%;
    position: absolute !important;
    top: 115px !important;
  }

  .top-part-content {
    width: 88% !important;
    font-size: 14px !important;
  }

  .top-part-img {
    & {
      width: 260px !important;
    }
  }

  .part-img {
    img{
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    @media (max-width: 992px) {
      margin-top: 30px;
      width: 206px;
    }
  }

  .part-content {
    // float: left;
    padding-top: 33px;
    font-size: 14px !important;
    margin: 0 !important;
  }

  .part-content-forth {
    font-size: 14px !important;
  }

  .part {
    max-width: none;
  }

  .center-part {
    height: 350px;
  }

  .back-left {
    width: 120px !important;
    bottom: 20px !important;
  }

  .back-right {
    width: 120px !important;
    //top: 140px !important;
  }
}
.top-part {
  .tab-content-title {
    font-size: 42px;
    color: #1e252f;
    line-height: 34px;
    font-weight: 500;
    @media (max-width: 992px) {
      font-size: 28px;
      margin-top: 20px;
    }
  }

  .tab-content-tip {
    font-size: 20px;
    color: #878787;
    line-height: 30px;
    font-weight: 400;
    margin-top: 30px;
    @media (max-width: 985px) {
      margin-top: 10px;
      font-size: 16px;
      line-height: 22px !important;
    }
  }
  :deep(.el-row) {
    justify-content: space-between;
    align-items: center;
    width: 90%;
    // @media (max-width: 1200px) {
    //   width: 80%;
    // }
  }
  :deep(.el-col-10) {
    max-width: 20%;
    @media (max-width: 985px) {
      max-width: 70%;
    }
    @media (max-width: 768px) {
      max-width: 50%;
    }
  }
}
.special-width{
  :deep(.el-row) {
    @media (max-width: 1200px) {
      width: 90%;
    }
    // @media (max-width: 768px) {
    //   width: 100%;
    // }
  }
}
.footer-trade {
  display: flex;
  justify-content: flex-start;
  gap: 11px;
  margin-top: 23px;
  font-size: 17px;
  color: #202630;
  line-height: 21px;

  .buy {
    width: 140px;
    height: 38px;
    border: 1px solid #f0b90a;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .sell {
    width: 140px;
    height: 38px;
    background: #f0b90a;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
}
.footer-title {
  font-size: 36px;
  color: #202630;
  line-height: 44px;
  font-weight: bold;
  @media (max-width: 992px) {
    font-size: 32px !important;
  }
}
.footer-info {
  margin-top: 50px;

  .info {
    font-size: 14px;
    line-height: 17px;
    margin-bottom: 9px;
    color: #202630;
  }
}

.max1290 {
  max-width: 1290px;
  margin: 0 auto;
}


@media (max-width: 1400px) {
  .max1290 {
    max-width: 940px;
    margin: 0 auto;
  }
}

@media (max-width: 985px) {
  .max1290 {
    width: auto !important;
    max-width: none;
    // padding-left: 30px !important;
    // padding-right: 30px !important;
    margin: 0 auto;
  }
}
.last-width{
  :deep(.el-row){
    width: 100% !important;
  }
  width: 100% !important;

  @media (max-width: 985px) {
    width: 90% !important;
  }
}
footer {
  background: #fafafa;
  width: 100%;
  height: 100%;

  div.footer-box {
    box-sizing: border-box;
    border-bottom: none;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    //padding: 10px 20px 30px 20px;
    @media (max-width: 985px) {
      & {
        height: auto;
        padding-bottom: 30px;
        flex-direction: column;
      }
    }

    .lan-box {
      position: relative;

      .lan-icon {
        width: 20px;
        position: absolute;
        top: 7px;
        left: 10px;
        z-index: 999;
      }

      .selectLan {
        width: 148px;

        .selectOption {
          :deep(.el-select-dropdown__item.selected) {
            color: red !important;
          }
        }

        :deep() {
          .el-input--large .el-input__inner {
            color: #e3e3e3;
            margin-left: 20px;
            font-size: 14px;
          }

          .el-input__wrapper {
            height: 34px;
            background-color: #1d262f;
            box-shadow: 0 0 0 1px #5c6368;
          }

          .el-input__suffix-inner > :first-child {
            margin-left: 0;
          }
        }
      }
    }

    .footer-logo-md {
      display: none;
      padding-top: 30px;
      @media (max-width: 985px) {
        & {
          display: flex;
          align-items: center;
        }
      }

      img.logo {
        width: 142px;
        height: auto;
        margin-right: 20px;
      }

      span {
        cursor: pointer;
        display: block;
        font-size: 14px;
        color: #6c6c6c;
        margin-right: 20px;
        padding-top: 10px;
      }

      button.language-chose {
        display: flex;
        align-items: center;
        width: 140px;
        height: 37px;

        img {
          width: 16px;
          margin-right: 6px;
          vertical-align: middle;
        }

        svg {
          margin-left: 4px;
        }

        line-height: 19px;
        font-size: 14px;
        color: #e3e3e3;
        background: none;
        border: 1px solid #5c6368;
        border-radius: 1px;
        padding: 0.5rem 1rem;
      }
    }

    .footer-logo {
      display: inline-block;
      width: 40%;
      padding-top: 40px;
      @media (max-width: 985px) {
        & {
          display: none; //頁面<985
        }
      }

      img.logo {
        width: 142px;
        height: auto;
      }

      span {
        cursor: pointer;
        display: block;
        margin: 0.8rem 0;
        font-size: 14px;
        color: #6c6c6c;
        letter-spacing: 0;
        line-height: 19px;
      }
    }

    .link-cards {
      display: flex;
      width: 100%;
      vertical-align: top;
      justify-content: space-around;
      padding: 0 0 0 3%;
      gap: 20px;

      @media (max-width: 985px) {
        & {
          padding: 0;
          justify-content: space-between;
          margin-left: 0;
        }
      }

      ul.link-list {
        list-style: none;
        padding-top: 50px;
        width: 100%;
        @media (max-width: 985px) {
          & {
            padding-top: 40px;
          }
        }

        li:nth-child(1) {
          font-size: 20px;
          color: #242933;
          font-weight: 500;
          margin-bottom: 16px;

          &:hover {
            color: #3d4656;
          }
        }

        li {
          font-size: 14px;
          color: #242933;
          cursor: pointer;
          margin-bottom: 16px;

          &:hover {
            color: #f0b90a;

            a {
              color: #f0b90a !important;
            }
          }
        }
      }
    }

    .icon-links {
      padding: 6px 0;
      padding-top: 40px;
      width: 170px;
      vertical-align: middle;
      flex-wrap: wrap;
      flex-shrink: 0;
      @media (max-width: 1400px) {
        & {
          display: none;
        }
      }

      img {
        cursor: pointer;
        width: 16px;
        margin: 12px 12px 0 0;
        height: 16px;
      }
    }
  }

  .icon-links-lg {
    padding-bottom: 10px;
    display: none;
    align-items: center;
    @media (max-width: 1400px) {
      & {
        display: flex;
      }
    }

    img {
      cursor: pointer;
      width: 24px;
      margin: 12px 12px 0 0;
      height: 24px;
    }
  }

  .footer-bottom-box {
    background: #fafafa;
    overflow: hidden;

    div.footer-bottom {
      width: 100vw;
      height: 60px;
      background: #fafafa;
      line-height: 60px;
      font-size: 0.8rem;
      color: #909090;
      letter-spacing: 0;
      box-sizing: border-box;

      .final-span {
        margin-right: 8px;
      }

      .final-links {
        margin-right: 16px;
      }

      span {
        cursor: pointer;
      }

      span:hover {
        color: #fafafa;
      }
    }
  }
}

footer {
  background: #fafafa;
  width: 100%;
  height: 100%;

  div.footer-links {
    box-sizing: border-box;
    width: 100vw;
    // height: 40vh;
    background: #fafafa;
    border-bottom: none;

    .footer-logoinfo {
      display: inline-block;
      width: 100%;
      padding: 20px 0 0 20px;

      img.logo {
        width: 43%;
        margin-bottom: 12px;
      }

      button.labguage-chose {
        display: flex;
        align-items: center;

        img {
          width: 16px;
          margin-right: 6px;
          vertical-align: middle;
        }

        svg {
          margin-left: 4px;
        }

        font-size: 14px;
        color: #e3e3e3;
        background: none;
        border: 1px solid #5c6368;
        border-radius: 3px;
        padding: 0.5rem 1rem;
      }
    }

    .link-list {
      margin-top: 20px;
      padding: 0 20px;

      .part09-collapse {
        width: 100%;
        border: none;

        .list-item {
          height: 44px;
        }

        :deep() {
          .el-collapse {
            border: none;
          }

          .el-collapse-item__header {
            background-color: transparent;
            color: #242933;
            border: none;
            height: 52px;
          }

          .el-collapse-item-title {
            font-weight: 400;
            font-size: 16px;
          }

          .el-collapse-item__content {
            background-color: transparent;
            font-size: 14px;
            color: #909090;
            padding-left: 20px;
            padding-bottom: 0;
            padding-top: 8px;
          }

          .el-collapse-item__wrap {
            background-color: transparent;
            border: none;
          }

          .el-collapse-item__arrow {
            transform: rotate(90deg);
          }

          .el-collapse-item__arrow.is-active {
            transform: rotate(270deg);
          }
        }
      }
    }

    .icon-links {
      display: flex;
      align-items: center;
      padding: 6px 20px;
      // padding-top: 50px;
      width: 100%;
      vertical-align: center;
      flex-wrap: wrap;

      img {
        width: 24px;
        margin: 12px 12px 0 0;
      }
    }
  }

  div.footer-bottom {
    //width: 100vw;
    font-weight: 400;
    background: #fafafa;
    font-size: 16px;
    color: #808080;
    letter-spacing: 0;
    padding: 10px 5.3vw;
    box-sizing: border-box;

    span {
      display: block;
      font-size: 16px;
      color: #808080;
      font-weight: 400;
    }
  }
}
.min-pad{
  @media (max-width: 768px) {
    width: 90% !important;
  }
}
</style>
