odoo.define("minecraft_tellraw_field.field_registry", function (require) {
  "use strict";
  // Grepper odoo add field to registry
  const MinecraftTellrawField = require("minecraft_tellraw_field.minecraft_tellraw_field");

  const registry = require("web.field_registry_owl");

  registry.add("minecraft_tellraw_field", MinecraftTellrawField.MinecraftTellrawField);
  // End grepper
});
