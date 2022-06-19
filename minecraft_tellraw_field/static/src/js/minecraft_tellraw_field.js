odoo.define("minecraft_tellraw_field.minecraft_tellraw_field", function (require) {
  "use strict";

  const AbstractFieldOwl = require("web.AbstractFieldOwl");
  const OwlDialog = require("web.OwlDialog");
  const core = require("web.core");

  const _lt = core._lt;

  const {Component} = owl;
  const {useState, useRef} = owl.hooks;

  class MinecraftTellrawHoverEventTextDialog extends Component {
    constructor(...args) {
      super(...args);
      this._newDialogRef = useRef("newDialog");
      this.state = useState({
        customFont: false,
        defaultColor: true,
        value: {},
        previewText: "",
      });
    }
    mounted() {
      if (Object.keys(this.props.editValue).length) {
        this._setEditValue(this.props.editValue);
      }
    }
    patched() {
      this._generatePreviewText();
    }
    onChangeCustomFont(event) {
      this.state.customFont = event.target.checked;
    }
    onChangeDefaultColor(event) {
      this.state.defaultColor = event.target.checked;
    }
    onChangeText(event) {
      const value = event.target.value;
      if (value) {
        this.state.value.text = value;
      } else {
        this.state.value.text = "";
      }
    }
    onChangeColor(event) {
      if (!this.state.defaultColor) {
        const color = event.target.value;
        if (color) {
          this.state.value.color = color;
        }
      }
    }
    onChangeBold(event) {
      this.state.value.bold = event.target.checked;
    }
    onChangeItalic(event) {
      this.state.value.italic = event.target.checked;
    }
    onChangeUnderlined(event) {
      this.state.value.underlined = event.target.checked;
    }
    onChangeStrikethrough(event) {
      this.state.value.strikethrough = event.target.checked;
    }
    onChangeObfuscated(event) {
      this.state.value.obfuscated = event.target.checked;
    }
    onChangeFont(event) {
      if (this.state.customFont) {
        const font = event.target.value;
        if (font) {
          this.state.value.font = font;
        }
      }
    }
    onClickSave() {
      this.__owl__.parent.state.values.push(this.state.value);
      this._newDialogRef.comp._close();
    }
    onClickCancel() {
      this._newDialogRef.comp._close();
    }
    _generatePreviewText() {
      const value = this.state.value;
      if (value) {
        if (value.hasOwnProperty("text")) {
          const valueSpan = $("<span />");
          valueSpan.text(value.text);
          if (value.hasOwnProperty("color")) {
            valueSpan.css("color", value.color);
          }
          if (value.hasOwnProperty("bold")) {
            valueSpan.css("font-weight", value.bold ? "bold" : "normal");
          }
          if (value.hasOwnProperty("italic")) {
            valueSpan.css("font-style", value.italic ? "italic" : "normal");
          }
          if (value.hasOwnProperty("underlined")) {
            valueSpan.css("text-decoration", value.underlined ? "underline" : "none");
          }
          if (value.hasOwnProperty("strikethrough")) {
            valueSpan.css(
              "text-decoration",
              value.strikethrough ? "line-through" : valueSpan.css("text-decoration")
            );
          }
          if (
            value.hasOwnProperty("underlined") &&
            value.hasOwnProperty("strikethrough") &&
            value.underlined &&
            value.strikethrough
          ) {
            valueSpan.css("text-decoration", "underline line-through");
          }
          this.state.previewText = valueSpan[0].outerHTML;
        }
      }
    }
    _setEditValue(value) {
      this.state.value = value;
      this.__owl__.parent.state.editValue = {};
    }
  }

  Object.assign(MinecraftTellrawHoverEventTextDialog, {
    components: {
      Dialog: OwlDialog,
    },
    editValue: Object,
    template: "MinecraftTellrawHoverEventTextDialog",
  });

  class MinecraftTellrawDialog extends Component {
    constructor(...args) {
      super(...args);
      this.state = useState({
        clickEvent: false,
        hoverEvent: false,
        customFont: false,
        defaultColor: true,
        minecraftTellrawHoverEventTextDialog: false,
        value: {},
        values: [],
        text: "",
        previewText: "",
        editValue: {},
      });
      this._dialogRef = useRef("dialog");
    }
    mounted() {
      if (Object.keys(this.props.editValue).length) {
        this._setEditValue(this.props.editValue);
      }
    }
    patched() {
      this._generatePreviewText();
      this._generateText();
      this._reInitDropdown();
    }
    onChangeClickEvent(event) {
      const value = event.target.value;
      if (value && value !== "none") {
        this.state.clickEvent = value;
      } else {
        this.state.clickEvent = false;
      }
    }
    onChangeHoverEvent(event) {
      const value = event.target.value;
      if (value && value !== "none") {
        this.state.hoverEvent = value;
      } else {
        this.state.hoverEvent = false;
      }
    }
    onChangeCustomFont(event) {
      this.state.customFont = event.target.checked;
    }
    onChangeDefaultColor(event) {
      this.state.defaultColor = event.target.checked;
    }
    onChangeText(event) {
      const value = event.target.value;
      if (value) {
        this.state.value.text = value;
      } else {
        this.state.value.text = "";
      }
    }
    onChangeColor(event) {
      if (!this.state.defaultColor) {
        const color = event.target.value;
        if (color) {
          this.state.value.color = color;
        }
      }
    }
    onChangeBold(event) {
      this.state.value.bold = event.target.checked;
    }
    onChangeItalic(event) {
      this.state.value.italic = event.target.checked;
    }
    onChangeUnderlined(event) {
      this.state.value.underlined = event.target.checked;
    }
    onChangeStrikethrough(event) {
      this.state.value.strikethrough = event.target.checked;
    }
    onChangeObfuscated(event) {
      this.state.value.obfuscated = event.target.checked;
    }
    onChangeFont(event) {
      if (this.state.customFont) {
        const font = event.target.value;
        if (font) {
          this.state.value.font = font;
        }
      }
    }
    onChangeClickEventValue(event) {
      const clickEvent = this.state.clickEvent;
      if (clickEvent && clickEvent !== "none") {
        this.state.value.clickEvent = {
          action: clickEvent,
          value: event.target.value,
        };
      }
    }
    onChangeHoverEventValue(event) {
      const hoverEvent = this.state.hoverEvent;
      if (hoverEvent && hoverEvent !== "none") {
        this.state.value.hoverEvent = {
          action: hoverEvent,
          value: event.target.value,
        };
      }
    }
    onClickSave() {
      this.__owl__.parent.state.values.push(this.state.value);
      this.__owl__.parent.state.minecraftTellrawTextDialog = false;
    }
    onClickCancel() {
      this.__owl__.parent.state.minecraftTellrawTextDialog = false;
    }
    onClickRemoveText(index) {
      this.state.values.splice(index, 1);
    }
    onClickEditText(index) {
      this.state.editValue = this.state.values[index];
      this.state.minecraftTellrawHoverEventTextDialog = true;
    }
    openText() {
      this.state.minecraftTellrawHoverEventTextDialog = true;
    }
    openLineBreak() {
      this.state.values.push("\n");
    }
    onDialogClosed() {
      this.state.minecraftTellrawHoverEventTextDialog = false;
    }
    _reInitDropdown() {
      $(document).ready(function () {
        $(".dropdown-toggle").dropdown();
      });
    }
    _generatePreviewText() {
      const value = this.state.value;
      if (value) {
        if (value.hasOwnProperty("text")) {
          const valueSpan = $("<span />");
          valueSpan.text(value.text);
          if (value.hasOwnProperty("color")) {
            valueSpan.css("color", value.color);
          }
          if (value.hasOwnProperty("bold")) {
            valueSpan.css("font-weight", value.bold ? "bold" : "normal");
          }
          if (value.hasOwnProperty("italic")) {
            valueSpan.css("font-style", value.italic ? "italic" : "normal");
          }
          if (value.hasOwnProperty("underlined")) {
            valueSpan.css("text-decoration", value.underlined ? "underline" : "none");
          }
          if (value.hasOwnProperty("strikethrough")) {
            valueSpan.css(
              "text-decoration",
              value.strikethrough ? "line-through" : valueSpan.css("text-decoration")
            );
          }
          if (
            value.hasOwnProperty("underlined") &&
            value.hasOwnProperty("strikethrough") &&
            value.underlined &&
            value.strikethrough
          ) {
            valueSpan.css("text-decoration", "underline line-through");
          }
          this.state.previewText = valueSpan[0].outerHTML;
        }
      }
    }
    _generateText() {
      this.state.text = this.state.values
        .map((value) => {
          if (value.hasOwnProperty("text")) {
            const valueSpan = $("<span />");
            valueSpan.text(value.text);
            if (value.hasOwnProperty("color")) {
              valueSpan.css("color", value.color);
            }
            if (value.hasOwnProperty("bold")) {
              valueSpan.css("font-weight", value.bold ? "bold" : "normal");
            }
            if (value.hasOwnProperty("italic")) {
              valueSpan.css("font-style", value.italic ? "italic" : "normal");
            }
            if (value.hasOwnProperty("underlined")) {
              valueSpan.css("text-decoration", value.underlined ? "underline" : "none");
            }
            if (value.hasOwnProperty("strikethrough")) {
              valueSpan.css(
                "text-decoration",
                value.strikethrough ? "line-through" : "none"
              );
            }
            if (
              value.hasOwnProperty("underlined") &&
              value.hasOwnProperty("strikethrough")
            ) {
              valueSpan.css("text-decoration", "underline line-through");
            }
            return valueSpan[0].outerHTML;
          }
          return value;
        })
        .join("");
    }
    _setEditValue(value) {
      this.state.value = value;
      this.__owl__.parent.state.editValue = {};
    }
  }

  Object.assign(MinecraftTellrawDialog, {
    components: {
      Dialog: OwlDialog,
      MinecraftTellrawHoverEventTextDialog,
    },
    editValue: Object,
    template: "FieldMinecraftTellrawText",
  });

  class MinecraftTellrawField extends AbstractFieldOwl {
    constructor(...args) {
      super(...args);
      this.state = useState({
        minecraftTellrawTextDialog: false,
        values: [""],
        text: "",
        editValue: {},
      });
      if (this.value.values) {
        this.state.values = this.value.values;
        this._generateText();
      }
    }
    patched() {
      this._generateText();
      const val = {values: this.state.values};
      this._setValue(val);
    }
    onClickRemoveText(index) {
      this.state.values.splice(index, 1);
    }
    onClickEditText(index) {
      this.state.editValue = this.state.values[index];
      this.state.minecraftTellrawTextDialog = true;
    }
    openText() {
      this.state.minecraftTellrawTextDialog = true;
    }
    openLineBreak() {
      this.state.values.push("\n");
    }
    // Buggy if you want to close the dialog if you opened a second one before
    onDialogClosed() {
      this.state.minecraftTellrawTextDialog = false;
    }
    _setValue(value, options) {
      // We try to avoid doing useless work, if the value given has not changed.
      if (this._isLastSetValue(value)) {
        return Promise.resolve();
      }
      this._lastSetValue = value;
      this._isValid = true;
      if (!(options && options.forceChange) && this._isSameValue(value)) {
        return Promise.resolve();
      }
      return new Promise((resolve, reject) => {
        const changes = {};
        changes[this.name] = value;
        this.trigger("field-changed", {
          dataPointID: this.dataPointId,
          changes: changes,
          viewType: this.viewType,
          doNotSetDirty: options && options.doNotSetDirty,
          notifyChange: !options || options.notifyChange !== false,
          allowWarning: options && options.allowWarning,
          onSuccess: resolve,
          onFailure: reject,
        });
      });
    }
    _generateText() {
      this.state.text = this.state.values
        .map((value) => {
          if (value.hasOwnProperty("text")) {
            const valueSpan = $("<span />");
            valueSpan.text(value.text);
            if (value.hasOwnProperty("color")) {
              valueSpan.css("color", value.color);
            }
            if (value.hasOwnProperty("bold")) {
              valueSpan.css("font-weight", value.bold ? "bold" : "normal");
            }
            if (value.hasOwnProperty("italic")) {
              valueSpan.css("font-style", value.italic ? "italic" : "normal");
            }
            if (value.hasOwnProperty("underlined")) {
              valueSpan.css("text-decoration", value.underlined ? "underline" : "none");
            }
            if (value.hasOwnProperty("strikethrough")) {
              valueSpan.css(
                "text-decoration",
                value.strikethrough ? "line-through" : "none"
              );
            }
            if (
              value.hasOwnProperty("underlined") &&
              value.hasOwnProperty("strikethrough")
            ) {
              valueSpan.css("text-decoration", "underline line-through");
            }
            return valueSpan[0].outerHTML;
          }
          return value;
        })
        .join("");
    }
  }

  Object.assign(MinecraftTellrawField, {
    components: {
      MinecraftTellrawDialog,
    },
    template: "FieldMinecraftTellraw",
    supportedFieldTypes: ["serialized"],
    description: _lt("Minecraft Tellraw Field"),
  });

  return {
    MinecraftTellrawField: MinecraftTellrawField,
  };
});
