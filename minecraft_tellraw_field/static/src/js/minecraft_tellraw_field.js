odoo.define("minecraft_tellraw_field.minecraft_tellraw_field", function (require) {
  "use strict";

  const AbstractFieldOwl = require("web.AbstractFieldOwl");
  const core = require("web.core");

  const _lt = core._lt;

  const {Component} = owl;
  const {useState, useRef} = owl.hooks;

  const components = {
    Dialog: require("web.OwlDialog"),
  };

  class MinecraftTellrawDialog extends Component {
    constructor(...args) {
      super(...args);
      this._dialogRef = useRef("dialog");
      console.log(this._dialogRef);
    }
  }

  Object.assign(MinecraftTellrawDialog, {
    components,
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
      console.log("openText");
      event.preventDefault();
      this.state.minecraftTellrawTextDialog = true;
    }
    openLineBreak() {
      console.log("openLineBreak");
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
