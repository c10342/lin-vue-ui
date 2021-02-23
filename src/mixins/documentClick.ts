
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class DocumentClickMixin extends Vue {
  mounted () {
    document.addEventListener('click', this._onDocumentClick);
  }

  beforeDestroy () {
    document.removeEventListener('click', this._onDocumentClick);
  }

  _onDocumentClick (event:Event) {
    if (typeof this.onDocumentClick === 'function') {
      this.onDocumentClick(event);
    }
  }

  onDocumentClick (event) {
    console.log(event);
  }
}
