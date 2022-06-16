odoo.define("minecraft_tellraw_field.minecraft_tellraw_field", function (require) {
  "use strict";

  const AbstractFieldOwl = require("web.AbstractFieldOwl");
  const OwlDialog = require("web.OwlDialog");
  const core = require("web.core");

  const _lt = core._lt;

  const {Component} = owl;
  const {useState, useRef} = owl.hooks;

  class MinecraftTellrawDialog extends Component {
    constructor(...args) {
      super(...args);
      this._dialogRef = useRef("dialog");
      this.state = useState({
        clickEvent: false,
        hoverEvent: false,
      });
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
    onClickSave() {
      this._dialogRef.comp._close();
    }
    onClickCancel() {
      this._dialogRef.comp._close();
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
      console.log("openLineBreak");
    }
    onDialogClosedModerationDiscard() {
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
