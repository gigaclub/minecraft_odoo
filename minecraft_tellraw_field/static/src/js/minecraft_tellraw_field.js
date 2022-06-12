odoo.define("minecraft_tellraw_field.minecraft_tellraw_field", function (require) {
  "use strict";

  const AbstractField = require("web.AbstractField");
  const core = require("web.core");

  const _lt = core._lt;

  const MinecraftTellrawField = AbstractField.extend({
    description: _lt("Minecraft Tellraw Field"),
    supportedFieldTypes: ["serialized"],
    template: "FieldMinecraftTellraw",
  });

  return {
    MinecraftTellrawField: MinecraftTellrawField,
  };
});
