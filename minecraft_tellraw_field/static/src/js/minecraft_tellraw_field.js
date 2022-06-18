odoo.define("minecraft_tellraw_field.minecraft_tellraw_field", function (require) {
  "use strict";

  const AbstractFieldOwl = require("web.AbstractFieldOwl");
  const OwlDialog = require("web.OwlDialog");
  const core = require("web.core");

  const _lt = core._lt;

  const {Component} = owl;
  const {useState, useRef} = owl.hooks;

  class MinecraftTellrawHoverEventTextDialog extends Component {
    constructor(props) {
      super(props);
      console.log("test");
    }
  }

  Object.assign(MinecraftTellrawHoverEventTextDialog, {
    components: {
      Dialog: OwlDialog,
    },
    template: "MinecraftTellrawHoverEventTextDialog",
  });

  class MinecraftTellrawDialog extends Component {
    constructor(...args) {
      super(...args);
      this._dialogRef = useRef("dialog");
      this.state = useState({
        clickEvent: false,
        hoverEvent: false,
        customFont: false,
        defaultColor: true,
        minecraftTellrawHoverEventTextDialog: false,
        value: {},
      });
      this.values = this.__owl__.parent.state.values;
    }
    patched() {
      this._reInitDropdown();
      console.log(this.values);
      console.log(this.state.value);
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
      this.values.push(this.state.value);
      this._dialogRef.comp._close();
    }
    onClickCancel() {
      this._dialogRef.comp._close();
    }
    openText() {
      console.log("openText");
      this.state.minecraftTellrawHoverEventTextDialog = true;
    }
    openLineBreak() {
      console.log("openLineBreak");
    }
    onDialogClosed() {
      console.log("onDialogClosed");
      this.state.minecraftTellrawHoverEventTextDialog = false;
    }
    _reInitDropdown() {
      console.log("_reInitDropdown");
      $(document).ready(function () {
        $(".dropdown-toggle").dropdown();
      });
    }
  }

  Object.assign(MinecraftTellrawDialog, {
    components: {
      Dialog: OwlDialog,
      MinecraftTellrawHoverEventTextDialog,
    },
    template: "FieldMinecraftTellrawText",
  });

  class MinecraftTellrawField extends AbstractFieldOwl {
    constructor(...args) {
      super(...args);
      this.state = useState({
        minecraftTellrawTextDialog: false,
        values: [""],
      });
    }
    openText(event) {
      event.preventDefault();
      this.state.minecraftTellrawTextDialog = true;
    }
    openLineBreak() {
      this.state.values.push("\n");
      console.log(this.state.values);
    }
    onDialogClosed() {
      console.log(this.state.values);
      this.state.minecraftTellrawTextDialog = false;
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
