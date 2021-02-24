<template>
  <div class="lin-live-comment">
    <slot name="title">
      <p class="lin-live-comment-title">
        {{ title || t("LinViewUI.LiveComment.title") }}
      </p>
    </slot>
    <slot name="view-count">
      <p class="lin-live-comment-view-count">
        {{ viewCount }}{{ t("LinViewUI.LiveComment.viewPeople") }}
      </p>
    </slot>
    <div class="lin-live-comment-content" ref="scroll" @scroll="onScroll">
      <slot v-for="(item, index) in commentList" :item="item">
        <div class="lin-live-comment-item" :key="index">
          <lin-image
            errorMsg
            class="lin-live-comment-user-avator"
            :imgUrl="[item._avatorUrl, defaultAvator]"
          />
          <div class="lin-live-comment-info-box">
            <div class="lin-live-comment-user-name">
              <span>{{ item._username }}</span>
              <span>{{ item._createTimeTip }}</span>
            </div>
            <div
              class="lin-live-comment-info"
              v-html="changeContent(item._content)"
            ></div>
          </div>
        </div>
      </slot>
    </div>
    <div class="lin-live-comment-fix" v-if="!isScrollToBottom && fixComment">
      <span>{{ fixComment._username }}：</span>
      <span v-html="changeContent(fixComment._content)"></span>
      <span @click="toBottom">
        <span>{{ t("LinViewUI.LiveComment.see") }}</span>
        <i class="lin-icon-downarrow"></i>
      </span>
    </div>
    <div class="lin-live-comment-input">
      <div class="lin-live-comment-mask" v-if="!arrowComment">
        <slot name="mask">
          <span class="lin-live-comment-mask-default">
            {{ t("LinViewUI.LiveComment.publishOpinion") }} /
            <span class="lin-live-comment-login-btn" @click="gotoLogin">{{
              t("LinViewUI.LiveComment.login")
            }}</span>
            {{ t("LinViewUI.LiveComment.commentAfter") }}
          </span>
        </slot>
      </div>
      <textarea
        :value="value"
        v-bind="textareaAttr"
        @keyup="onInput"
        class="lin-live-comment-textarea"
      ></textarea>
      <span class="lin-live-comment-send-btn" @click="publishComment">{{
        btnText || t("LinViewUI.LiveComment.btnText")
      }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Mixins, Component, Prop, Watch } from 'vue-property-decorator';
import LocaleMixin from 'src/mixins/locale';
import Image from 'packages/Image/index';
import defaultAvator from 'src/images/default_avatar.png';
import { Obj } from './type';

@Component({
  name: 'LinLiveComment',
  components: {
    [Image.name]: Image
  }
})
export default class LinLiveComment extends Mixins(LocaleMixin) {
  @Prop({ type: Array, default: () => [] })
  commentList!: any[];

  @Prop({ type: Object, default: null })
  fixComment!: Record<string, any>;

  @Prop({ type: String, default: '' })
  value!: string;

  @Prop({ type: String })
  btnText!: string;

  @Prop({ type: Boolean, default: false })
  arrowComment!: boolean;

  @Prop({ type: String })
  placeholder!: string;

  @Prop({ type: Number, default: -1 })
  maxlength!: number;

  @Prop({ type: Boolean, default: true })
  throttle!: boolean;

  @Prop({ type: String })
  title!: string;

  @Prop({ type: Number, default: 0 })
  viewCount!: number;

  @Prop({ type: String, default: defaultAvator })
  defaultAvator!: string;

  @Prop({ type: Boolean, default: false })
  isLoading!: boolean;

  isScrollToBottom = true;

  scrollTimer: number | null = null;

  get commentPlaceholder () {
    if (this.placeholder) {
      return this.placeholder;
    }
    return this.t('LinViewUI.LiveComment.placeholder');
  }

  get textareaAttr () {
    const obj: Obj = {};
    if (this.maxlength !== -1) {
      obj.maxlength = this.maxlength;
    }
    if (this.arrowComment) {
      obj.placeholder = this.commentPlaceholder;
    }
    return obj;
  }

  @Watch('commentList', { immediate: true })
  onCommentListChange (newVal) {
    if (newVal.length > 0 && this.isScrollToBottom) {
      this.$nextTick(() => {
        const scroll = this.$refs.scroll as HTMLElement;
        scroll.scrollTop = scroll.scrollHeight;
      });
    }
  }

  beforeDestroy () {
    if (this.scrollTimer) {
      clearTimeout(this.scrollTimer);
    }
  }

  onScroll (e) {
    if (this.scrollTimer) {
      clearTimeout(this.scrollTimer);
    }
    if (this.throttle) {
      this.scrollTimer = window.setTimeout(() => {
        this.handlerOnScroll(e);
      }, 500);
    } else {
      this.handlerOnScroll(e);
    }
  }

  handlerOnScroll (e) {
    const { scrollTop, scrollHeight, offsetHeight } = e.target;
    if (scrollTop + offsetHeight + 40 < scrollHeight) {
      this.isScrollToBottom = false;
    } else {
      this.isScrollToBottom = true;
      this.$emit('toBottom');
    }
    this.$emit('scroll', e);
  }

  changeContent (str) {
    if (!str) {
      return '';
    }
    return str.replace(/\n/g, '<br/>');
  }

  toBottom () {
    const scroll = this.$refs.scroll as HTMLElement;
    scroll.scrollTop = scroll.scrollHeight;
    this.isScrollToBottom = true;
  }

  publishComment () {
    if (this.isLoading) {
      return;
    }
    this.$emit('sendBtnClick');
  }

  onInput (e) {
    const { value } = e.target;
    this.$emit('input', value);
  }

  gotoLogin () {
    this.$emit('loginBtnClick');
  }
}
</script>
