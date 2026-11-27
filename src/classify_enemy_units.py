#!/usr/bin/env python3

import json
import os


def main():

    # Load classification rules
    with open("./data/unit_classification.json") as f:
        unit_classes = json.load(f)

    # Load enemy positions
    with open("./data/enemy_positions/enemy_positions_latest.json") as f:
        enemy_positions = json.load(f)

    categories = unit_classes["categories"]
    priority_order = unit_classes["priority_order"]
    fallback = unit_classes["fallback"]

    enemy_positions_icons = {}

    for name_enemy, pos_enemy in enemy_positions.items():
        assigned = False
        # Check categories in priority order
        for category_name in priority_order:
            category = categories[category_name]
            kws = category["keywords"]
            # Check if any keyword matches (case-insensitive)
            for kw in kws:
                if kw.lower() in name_enemy.lower():
                    enemy_positions_icons[name_enemy] = [
                        category["suggested_icon"], pos_enemy[0]
                    ]
                    assigned = True
                    break  # Stop checking other keywords for this category
            if assigned:
                break  # Stop checking other categories
        
        # Fallback if no category matched
        if not assigned:
            enemy_positions_icons[name_enemy] = [
                categories[fallback]["suggested_icon"], pos_enemy[0]
            ]

    # Write output
    output_path = "./data/enemy_positions/enemy_positions_icons_latest.json"
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w") as f:
        json.dump(enemy_positions_icons, f, indent=2)

    print(f"Classification complete. Output written to {output_path}")


if __name__ == "__main__":
    main()
