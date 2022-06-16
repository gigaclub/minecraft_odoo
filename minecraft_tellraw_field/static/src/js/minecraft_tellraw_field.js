odoo.define("minecraft_tellraw_field.minecraft_tellraw_field", function (require) {
  "use strict";

  const AbstractFieldOwl = require("web.AbstractFieldOwl");
  const OwlDialog = require("web.OwlDialog");
  const core = require("web.core");

  const _lt = core._lt;

  const {Component} = owl;
  const {useState, useRef} = owl.hooks;

  const values = [""];

  class MinecraftTellrawDialog extends Component {
    constructor(...args) {
      super(...args);
      this._dialogRef = useRef("dialog");
      this.state = useState({
        clickEvent: false,
        hoverEvent: false,
      });
      console.log(this._dialogRef);
    }
    buildValues(event) {
      const $element = $(event.target.parentElement.parentElement);
      const value = {};
      const text = $element.find("#text").val();
      if (text) {
        value.text = text;
      }
      const color = $element.find("#color").val();
      if (color) {
        value.color = color;
      }
      const bold = $element.find("#bold").prop("checked");
      if (bold) {
        value.bold = true;
      }
      const italic = $element.find("#italic").prop("checked");
      if (italic) {
        value.italic = true;
      }
      const underlined = $element.find("#underlined").prop("checked");
      if (underlined) {
        value.underlined = true;
      }
      const strikethrough = $element.find("#strikethrough").prop("checked");
      if (strikethrough) {
        value.strikethrough = true;
      }
      const obfuscated = $element.find("#obfuscated").prop("checked");
      if (obfuscated) {
        value.obfuscated = true;
      }
      const font = $element.find("#font").val();
      if (font) {
        value.font = font;
      }
      const clickEvent = $element.find("#click-event").val();
      if (clickEvent && clickEvent !== "none") {
        value.clickEvent = {
          action: clickEvent,
          value: $element.find(`[name=${clickEvent}]`).val(),
        };
      }
      const hoverEvent = $element.find("#hover-event").val();
      if (hoverEvent && hoverEvent !== "none") {
        value.hoverEvent = {
          action: hoverEvent,
          value: $element.find(`[name=${hoverEvent}]`).val(),
        };
      }
      values.push(value);
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
    onClickSave(event) {
      this.buildValues(event);
      this._dialogRef.comp._close();
    }
    onClickCancel() {
      this._dialogRef.comp._close();
    }
    onClickOpenDropdown(event) {
      const $element = $(event.target);
      console.log($element.attr("aria-expanded"));
      if ($element.attr("aria-expanded") === "true") {
        $element.dropdown("hide");
      } else {
        $element.dropdown("toggle");
      }
    }
  }

  Object.assign(MinecraftTellrawDialog, {
    components: {
      Dialog: OwlDialog,
    },
    template: "FieldMinecraftTellrawText",
  });

  class MinecraftTellrawField extends AbstractFieldOwl {
    constructor(...args) {
      super(...args);
      this.state = useState({
        minecraftTellrawTextDialog: false,
      });
    }
    openText(event) {
      event.preventDefault();
      this.state.minecraftTellrawTextDialog = true;
    }
    openLineBreak() {
      values.push("\n");
      console.log(values);
    }
    onDialogClosedModerationDiscard() {
      console.log(values);
      this.state.minecraftTellrawTextDialog = false;
    }
    onClickOpenDropdown() {
      console.log("test");
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
