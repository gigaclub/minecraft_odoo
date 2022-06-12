odoo.define("minecraft_tellraw_field.field_registry", function (require) {
  "use strict";

  const MinecraftTellrawField = require("minecraft_tellraw_field.minecraft_tellraw_field");

  const registry = require("web.field_registry");

  registry.add("minecraft_tellraw_field", MinecraftTellrawField.MinecraftTellrawField);
});
