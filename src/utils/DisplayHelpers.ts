export const checkIfInputIsZwaluwen = (input: string) => {
  return input.toLowerCase().includes('zwaluwen');
}

interface Match {
  stats: {
    home: {
      score: number;
    };
    away: {
      score: number;
    };
  };
  teams: {
    home: {
      name: string;
    };
    away: {
      name: string;
    };
  };
}

export const checkIfZwaluwenWins = (match: Match) => {
  return match.stats.home.score > match.stats.away.score && checkIfInputIsZwaluwen(match.teams.home.name) || match.stats.home.score < match.stats.away.score && checkIfInputIsZwaluwen(match.teams.away.name)
}
