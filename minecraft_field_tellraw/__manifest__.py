{
    "name": "Minecraft Field Tellraw",
    "version": "16.0.1.0.0",
    "category": "Minecraft",
    "author": "GigaClub.net",
    "website": "https://GigaClub.net/",
    "license": "AGPL-3",
    "depends": ["web", "base_sparse_field"],
    "qweb": [
        "static/src/xml/minecraft_tellraw_field.xml",
    ],
    "data": [],
    "demo": [],
    "assets": {
        "web.assets_backend": [
            "minecraft_field_tellraw/static/src/js/field_utils.js",
            "minecraft_field_tellraw/static/src/js/minecraft_tellraw_field.js",
            "minecraft_field_tellraw/static/src/js/field_registry.js"
        ]
    },
    "installable": True,
    "auto_install": False,
}
