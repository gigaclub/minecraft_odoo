odoo.define("minecraft_tellraw_field.minecraft_tellraw_field", function (require) {
  "use strict";

  const AbstractField = require("web.AbstractField");
  const Dialog = require("web.Dialog");
  const core = require("web.core");

  const _lt = core._lt;
  const QWeb = core.qweb;

  const MinecraftTellrawField = AbstractField.extend({
    description: _lt("Minecraft Tellraw Field"),
    supportedFieldTypes: ["serialized"],
    template: "FieldMinecraftTellraw",
    events: _.extend({}, AbstractField.prototype.events, {
      "click button[name='text']": "openText",
      "click button[name='lineBreak']": "openLineBreak",
    }),
    openText: function () {
      console.log("openText");
      new Dialog(this, {
        size: "large",
        title: _lt("Text"),
        $content: $(QWeb.render("FieldMinecraftTellrawText")),
        buttons: [
          {
            text: _lt("Save"),
            classes: "btn-primary",
            click: function () {
              console.log("test");
            },
            close: true,
          },
          {
            text: _lt("Cancel"),
            close: true,
          },
        ],
      }).open();
    },
    openLineBreak: function () {
      console.log("openLineBreak");
    },
  });

  return {
    MinecraftTellrawField: MinecraftTellrawField,
  };
});
