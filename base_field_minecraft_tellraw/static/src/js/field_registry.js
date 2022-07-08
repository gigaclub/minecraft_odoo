odoo.define("base_field_minecraft_tellraw.field_registry", function (require) {
  "use strict";
  // Grepper odoo add field to registry
  const MinecraftTellrawField = require("base_field_minecraft_tellraw.minecraft_tellraw_field");

  const registry = require("web.field_registry_owl");

  registry.add("minecraft_tellraw_field", MinecraftTellrawField.MinecraftTellrawField);
  // End grepper
});
