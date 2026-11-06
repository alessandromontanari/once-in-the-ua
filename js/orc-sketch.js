// Single orc sketch as a reusable template
window.orcSketch = `
    <rect class="face" x="0" y="20" width="110" height="90" rx="50" ry="30"
      fill="green" stroke="black" stroke-width="3" />
    // Pointy ears
    <polygon points="20,35 40,35 20,7"
      style="fill:darkgreen;stroke:black;stroke-width:3;fill-rule:evenodd;" />
    <polygon points="70,35 90,35 90,7"
      style="fill:darkgreen;stroke:black;stroke-width:3;fill-rule:evenodd;" />
    // Eyes
    <circle class="eye" cx="30" cy="55" r="12" />
    <circle class="eye" cx="80" cy="55" r="12" />
    // Mouth teeth
    <polygon points="20,75 30,75 25,90"
      style="fill:white;stroke:black;stroke-width:1.2;fill-rule:evenodd;" />
    <polygon points="30,75 40,75 35,90"
      style="fill:white;stroke:black;stroke-width:1.2;fill-rule:evenodd;" />
    <polygon points="40,75 50,75 45,90"
      style="fill:white;stroke:black;stroke-width:1.2;fill-rule:evenodd;" />
    <polygon points="50,75 60,75 55,90"
      style="fill:white;stroke:black;stroke-width:1.2;fill-rule:evenodd;" />
    <polygon points="60,75 70,75 65,90"
      style="fill:white;stroke:black;stroke-width:1.2;fill-rule:evenodd;" />
    <polygon points="70,75 80,75 75,90"
      style="fill:white;stroke:black;stroke-width:1.2;fill-rule:evenodd;" />
    <polygon points="80,75 90,75 85,90"
      style="fill:white;stroke:black;stroke-width:1.2;fill-rule:evenodd;" />
`;