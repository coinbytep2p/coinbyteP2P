<template>
  <div>
    <div class="center-box" v-if="windowWidth > 769"  v-loading="loading">
      <div class="center-part max1290">
        <el-row :gutter="20">
          <el-col :span="6" v-for="(item, index) in blogs?.content" :key="index">
            <router-link :to="'/centerContent/' + item.id" style="text-decoration: none">
              <div class="content clearfloat">
                <div class="image">
                  <img :src="item.banner_url" />
                </div>
                <div class="message">{{ item.title }}</div>
              </div>
            </router-link>
          </el-col>
        </el-row>
      </div>
      <!-- <div class="center-part max1290">
        <el-row :gutter="20">
          <el-col :span="6" v-for="(item, index) in secondCenter" :key="index">
            <div class="content clearfloat">
              <div class="image">
                <img :src="item.image" />
              </div>
              <div class="message">{{ item.message }}</div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="center-part max1290">
        <el-row :gutter="20">
          <el-col :span="6" v-for="(item, index) in thirdCenter" :key="index">
            <div class="content clearfloat">
              <div class="image">
                <img :src="item.image" />
              </div>
              <div class="message">{{ item.message }}</div>
            </div>
          </el-col>
        </el-row>
      </div> -->
<!--      <el-row>-->
<!--        <el-col :span="24">-->
<!--          <div class="example-pagination-block" style="width: 100%;">-->
<!--            <el-pagination background :pager-count="4" layout="prev, pager, next" :total="blogs?.totalElements" @current-change="pageChange"/>-->
<!--          </div>-->
<!--        </el-col>-->
<!--      </el-row>-->
    </div>
    <div class="center-box max1290" v-if="windowWidth <= 769">
      <div class="center-part">
        <el-row>
          <el-col :span="24" style="margin: auto" v-for="(item, index) in blogs?.content" :key="index">
            <router-link :to="'/centerContent/' + item.id" style="text-decoration: none">
              <div class="content clearfloat">
                <div class="image">
                  <!-- <img :src="item.icon" /> -->
                  <img :src="item.banner_url" />
                </div>
                <div class="message">{{ item.title }}</div>
              </div>
            </router-link>
          </el-col>
        </el-row>
      </div>
      <!-- <div class="center-part">
        <el-row>
          <el-col :span="24" style="margin: auto" v-for="(item, index) in secondCenter" :key="index">
            <div class="content clearfloat">
              <div class="image">
                <img :src="item.image" />
              </div>
              <div class="message">{{ item.message }}</div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="center-part">
        <el-row>
          <el-col :span="24" style="margin: auto" v-for="(item, index) in thirdCenter" :key="index">
            <div class="content clearfloat">
              <div class="image">
                <img :src="item.image" />
              </div>
              <div class="message">{{ item.message }}</div>
            </div>
          </el-col>
        </el-row>
      </div> -->

<!--      <div class="example-pagination-block">-->
<!--        <el-pagination background :pager-count="4" layout="prev, pager, next" :total="blogs?.totalElements"  @current-change="pageChange"/>-->
<!--      </div>-->

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onUnmounted, onMounted, watch, nextTick } from "vue";

import learn_image01 from "../../../assets/home/learn_image01.png";
import learn_image02 from "../../../assets/home/learn_image02.png";
import learn_image03 from "../../../assets/home/learn_image03.png";
import learn_image04 from "../../../assets/home/learn_image04.png";
import learn_image08 from "../../../assets/home/learn_image08.png";
import learn_image13 from "../../../assets/home/learn_image13.png";
import learn_image14 from "../../../assets/home/learn_image14.png";
import learn_image15 from "../../../assets/home/learn_image15.png";
import learn_image16 from "../../../assets/home/learn_image16.png";
import learn_image17 from "../../../assets/home/learn_image17.png";
import learn_image18 from "../../../assets/home/learn_image18.png";
import learn_image19 from "../../../assets/home/learn_image19.png";

import { Blog, GetBlogs } from "../../../models/blog";

const props = defineProps<
  {
    toGetBlogs: (getConfig: any) => Promise<{
      content: any[];
      totalElements: number;
    } | undefined>;
    index: number;
  }
>();


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

const firstCenter = [
  {
    image: learn_image03,
    message: "Start trading cryptocurrency on COINBYTE",
  },
  {
    image: learn_image01,
    message: "How to buy and sell cryptocurrency on COINBYTE",
  },
  {
    image: learn_image02,
    message:
      "How to deposit and withdraw BTC and other crypto assets on COINBYTE",
  },
  {
    image: learn_image13,
    message: "How to deposit and withdraw crypto using the COINBYTE app",
  },
];
const secondCenter = [
  {
    image: learn_image14,
    message: "How to secure your cryptocurrency exchange account on COINBYTE",
  },
  {
    image: learn_image15,
    message:
      "Cryptocurrency wallets and keys — an introduction to digital asset custody...",
  },
  {
    image: learn_image04,
    message: "Cryptocurrency trading 101",
  },
  {
    image: learn_image16,
    message: "Dollar-cost average crypto with COINBYTE recurring buy",
  },
];
const thirdCenter = [
  {
    image: learn_image08,
    message: "Bitcoin and cryptocurrency arbitrage explained",
  },
  {
    image: learn_image19,
    message: "How to earn free Bitcoin on COINBYTE",
  },
  {
    image: learn_image18,
    message:
      "How to earn referral rewards and affiliate commissions on COINBYTE",
  },
  {
    image: learn_image17,
    message: "Can algo trading beat the market?",
  },
];

const blogs = ref<{
  content: any[];
  totalElements: number;
}>();
const loading = ref(false);
onMounted(() => {
  nextTick(() => {
    console.log(props.index);
    if(props.index === 0) {
      getBlogsValue(1);
    }
  })
})
watch(() => props.index, () => {
  console.log(props.index, 'watch');
  getBlogsValue(props.index);
})

const getBlogsValue = async (typeIndex: number, pageIndex: number = 1) => {
  try {
    loading.value = true;
    const res: any = await props.toGetBlogs(
      {
        page: pageIndex,
        limit: 12,
        type: typeIndex
      }
    );
    blogs.value = {
      content: res.content,
      totalElements: 1000,
    };
    loading.value = false;
  } catch(e) {
    console.log(e);
    loading.value = false;
  }
}

const pageChange = (value: number) => {
  getBlogsValue(props.index, value);
}

</script>

<style scoped lang="scss">
$headerBackGround: #1d262f;
$bg-color: #fff;
$main-color: #01c19a;
$fontSizeMax: 42px;
$fontSizeMedPro: 28px;
$fontSizeMed: 24px;
$fontSizeDefPro: 18px;
$fontSizeDef: 16px;
$fontSizeMinPro: 14px;
$fontSizeMin: 12px;

.max1290 {
  max-width: 1290px;
  margin: 0 auto;
}

.center-box {
  // width: auto;
  margin-top: -15px;
  min-height: 300px;
  @media (max-width: 769px) {
    & {
      padding: 0;
    }
  }

  .content {
    margin-top: 40px;

    .image {
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    .message {
      margin-top: 9px;
      color: #000000;
      line-height: 20px;
      font-weight: 400;

      @media (max-width: 769px) {
        text-align: center;
      }
    }
  }
}

.example-pagination-block {
  // float: right;
  margin-top: 60px;
  color: #9b9b9b;
  display: flex;
  justify-content: flex-end;

  :deep() {

    // .el-pager{
    //   margin-top: 15px;
    // }
    .el-pager li {
      color: #9b9b9b;
    }

    .el-pagination.is-background .el-pager li {
      background-color: #ffffff;
    }

    .el-pager li.is-active {
      background-color: #f1f1f1 !important;
      color: #000;
    }

    .el-pagination.is-background .btn-next,
    .el-pagination.is-background .btn-prev,
    .el-pagination.is-background .el-pager li {
      background-color: #ffffff;
    }

    // .el-pager li:hover {
    //   color: #01c19a !important;
    // }
    .el-pagination {
      --el-pagination-border-radius: 4px;
      --el-pagination-font-size: 16px;
    }
  }
}
</style>
