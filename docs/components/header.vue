<template>
  <header class="page-header">
    <div class="header-container">
      <router-link :to="{ name: 'index' }">
        <img src="../assets/img/logo.png" width="100" />
      </router-link>
      <div>
        <router-link :to="{ name: 'giud' }">
          {{ componentTitle }}
        </router-link>
        <lin-dropdown
          @command="handleCommand"
          trigger="click"
          class="doc-dropdown"
        >
          <span class="doc-dropdown-link">
            {{ langTitle }}
            <i class="lin-icon-down"></i>
          </span>
          <lin-dropdown-group slot="dropdown">
            <lin-dropdown-item :command="langType.zh">中文</lin-dropdown-item>
            <lin-dropdown-item :command="langType.en"
              >English</lin-dropdown-item
            >
          </lin-dropdown-group>
        </lin-dropdown>
        <a
          style="margin-left: 30px"
          href="http://wxui.linjiafu.top"
          target="_blank"
          >{{ wechatTitle }}</a
        >
      </div>
    </div>
  </header>
</template>

<script>
import { getLang, setLang, langType } from "../utils/lang";
import langConfig from "../i18n/index";
const lang = getLang();
export default {
  data() {
    return {
      langType,
    };
  },
  methods: {
    handleCommand(com) {
      if (com === langType.zh && lang !== langType.zh) {
        setLang(langType.zh);
        window.location.reload();
      } else if (com === langType.en && lang !== langType.en) {
        setLang(langType.en);
        window.location.reload();
      }
    },
  },
  computed: {
    componentTitle() {
      return langConfig[lang].header.component;
    },
    langTitle() {
      return langConfig[lang].header.langTitle;
    },
    wechatTitle() {
      return langConfig[lang].header.wechatTitle;
    },
  },
};
</script>

<style lang="scss">
@import "../assets/styles/var.scss";
.page-header {
  background-color: #fff;
  opacity: 0.98;
  position: relative !important;
  top: 0;
  left: 0;
  width: 100%;
  height: $header-height;
  transition: all 0.3s;
  z-index: 100;
  box-sizing: border-box;
  border-bottom: 1px solid #dcdfe6;
  .header-container {
    padding: 0 $padding;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    align-items: center;
    height: 100%;
    justify-content: space-between;
  }
  .doc-dropdown {
    margin-left: 30px;
  }
  .doc-dropdown-link {
    color: #888;
    &:hover {
      color: #409eff;
    }
  }
}
</style>
