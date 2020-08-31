const FortniteCard = async (wins, kd, kills) => {
  return `
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width="210"
    height="120"
  >
    <rect
      x="2"
      y="2"
      height="115"
      width="205"
      rx="20"
      ry="20"
      fill="#98e7f6"
    />
    <text
      x="14"
      y="28"
      font-family="Fantasy, Arial, Helvetica, sans-serif"
      font-size="22"
      fill="white"
    >
      ⛏️Fortnite Stats⛏️
    </text>
    <line x1="48" y1="31" x2="160" y2="31" stroke="white" stroke-width="1" />
    <text
      x="53"
      y="54"
      font-family="Fantasy, Arial, Helvetica, sans-serif"
      font-size="19"
      fill="white"
    >
      🏆 Wins: ${wins}
    </text>
    <text
      x="53"
      y="79"
      font-family="Fantasy, Arial, Helvetica, sans-serif"
      font-size="19"
      fill="white"
    >
      🎮 KD: ${kd}
    </text>
    <text
      x="53"
      y="104"
      font-family="Fantasy, Arial, Helvetica, sans-serif"
      font-size="19"
      fill="white"
    >
      ☠️ Kills: ${kills}
    </text>
  </svg>
    `;
};

module.exports = FortniteCard;
