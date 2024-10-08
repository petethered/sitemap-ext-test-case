globalThis.process ??= {}; globalThis.process.env ??= {};
const cache = /* @__PURE__ */ new Map();
function getFromCache(key) {
  return cache.get(key);
}
function setInCache(key, value, ttl = 6e4) {
  cache.set(key, value);
  setTimeout(() => cache.delete(key), ttl);
}
async function fetchWithCache(url, ttl = 6e4) {
  const start = Date.now();
  const cachedResponse = getFromCache(url);
  if (cachedResponse) {
    console.log("----> Took " + (Date.now() - start) / 1e3);
    return cachedResponse;
  }
  const pacificTime = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hour12: false
  }).format(/* @__PURE__ */ new Date());
  const formattedTime = pacificTime.replace(/(\d+)\/(\d+)\/(\d+), (\d+)/, "$3-$1-$2-$4");
  const userAgent = `Demo Builder ${formattedTime}`;
  let requestUrl = url;
  if (!url.match(/\?/)) {
    requestUrl += "?";
  }
  requestUrl += "&timezone=" + Intl.DateTimeFormat().resolvedOptions().timeZone;
  requestUrl += "&_200=1";
  console.log("FetchWithCache", requestUrl);
  const response = await fetch(requestUrl, {
    headers: {
      "User-Agent": userAgent
    }
  });
  const data = await response.json();
  setInCache(url, data, ttl);
  console.log("----> Took Fresh " + (Date.now() - start) / 1e3);
  return data;
}

const request = async ({
  type = "divisions",
  id
}) => {
  let endpoints = endpointList();
  try {
    const response = await fetchWithCache(`${endpoints[type]["url"] + (id ? `/${id}` : "")}`);
    return response;
    return await response.json();
  } catch (error) {
    return {};
  }
};
const endpointList = () => {
  let BASE_URL = "https://statsapi.mlb.com/api/v1";
  return {
    "attendance": {
      "url": BASE_URL + "/attendance",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["teamId", "leagueId", "season", "date", "leagueListId", "gameType", "fields"],
      "required_params": [["teamId"], ["leagueId"], ["leagueListid"]]
    },
    "awards": {
      "url": BASE_URL + "/awards{awardId}{recipients}",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        },
        "awardId": {
          "type": "str",
          "default": "",
          "leading_slash": true,
          "trailing_slash": false,
          "required": false
        },
        "recipients": {
          "type": "bool",
          "default": true,
          "true": "/recipients",
          "false": "",
          "leading_slash": false,
          "trailing_slash": false,
          "required": false
        }
      },
      "query_params": ["sportId", "leagueId", "season", "hydrate", "fields"],
      "required_params": [[]],
      "note": "Call awards endpoint with no parameters to return a list of awardIds."
    },
    "conferences": {
      "url": BASE_URL + "/conferences",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["conferenceId", "season", "fields"],
      "required_params": [[]]
    },
    "divisions": {
      "url": BASE_URL + "/divisions",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["divisionId", "leagueId", "sportId"],
      "required_params": [[]],
      "note": "Call divisions endpoint with no parameters to return a list of divisions."
    },
    "draft": {
      "url": BASE_URL + "/draft{prospects}{year}{latest}",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        },
        "prospects": {
          "type": "bool",
          "default": false,
          "true": "/prospects",
          "false": "",
          "leading_slash": false,
          "trailing_slash": false,
          "required": false
        },
        "year": {
          "type": "str",
          "default": "",
          "leading_slash": true,
          "trailing_slash": false,
          "required": false
        },
        "latest": {
          "type": "bool",
          "default": false,
          "true": "/latest",
          "false": "",
          "leading_slash": false,
          "trailing_slash": false,
          "required": false
        }
      },
      "query_params": ["limit", "fields", "round", "name", "school", "state", "country", "position", "teamId", "playerId", "bisPlayerId"],
      "required_params": [[]],
      "note": 'No query parameters are honored when "latest" endpoint is queried (year is still required). Prospects and Latest cannot be used together.'
    },
    "game": {
      "url": BASE_URL + "/game/{gamePk}/feed/live",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1.1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        },
        "gamePk": {
          "type": "str",
          "default": "",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["timecode", "hydrate", "fields"],
      "required_params": [[]]
    },
    "game_diff": {
      "url": BASE_URL + "/game/{gamePk}/feed/live/diffPatch",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1.1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        },
        "gamePk": {
          "type": "str",
          "default": "",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["startTimecode", "endTimecode"],
      "required_params": [["startTimecode", "endTimecode"]]
    },
    "game_timestamps": {
      "url": BASE_URL + "/game/{gamePk}/feed/live/timestamps",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1.1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        },
        "gamePk": {
          "type": "str",
          "default": "",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": [],
      "required_params": [[]]
    },
    "game_changes": {
      "url": BASE_URL + "/game/changes",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["updatedSince", "sportId", "gameType", "season", "fields"],
      "required_params": [["updatedSince"]]
    },
    "game_contextMetrics": {
      "url": BASE_URL + "/game/{gamePk}/contextMetrics",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        },
        "gamePk": {
          "type": "str",
          "default": "",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["timecode", "fields"],
      "required_params": [[]]
    },
    "game_winProbability": {
      "url": BASE_URL + "/game/{gamePk}/winProbability",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        },
        "gamePk": {
          "type": "str",
          "default": "",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["timecode", "fields"],
      "required_params": [[]],
      "note": "If you only want the current win probability for each team, try the game_contextMetrics endpoint instad."
    },
    "game_boxscore": {
      "url": BASE_URL + "/game/{gamePk}/boxscore",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        },
        "gamePk": {
          "type": "str",
          "default": "",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["timecode", "fields"],
      "required_params": [[]]
    },
    "game_content": {
      "url": BASE_URL + "/game/{gamePk}/content",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        },
        "gamePk": {
          "type": "str",
          "default": "",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["highlightLimit"],
      "required_params": [[]]
    },
    "game_color": {
      "url": BASE_URL + "/game/{gamePk}/feed/color",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        },
        "gamePk": {
          "type": "str",
          "default": "",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["timecode", "fields"],
      "required_params": [[]]
    },
    "game_color_diff": {
      "url": BASE_URL + "/game/{gamePk}/feed/color/diffPatch",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        },
        "gamePk": {
          "type": "str",
          "default": "",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["startTimecode", "endTimecode"],
      "required_params": [["startTimeCode", "endTimeCode"]]
    },
    "game_color_timestamps": {
      "url": BASE_URL + "/game/{gamePk}/feed/color/timestamps",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        },
        "gamePk": {
          "type": "str",
          "default": "",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": [],
      "required_params": [[]]
    },
    "game_linescore": {
      "url": BASE_URL + "/game/{gamePk}/linescore",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        },
        "gamePk": {
          "type": "str",
          "default": "",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["timecode", "fields"],
      "required_params": [[]]
    },
    "game_playByPlay": {
      "url": BASE_URL + "/game/{gamePk}/playByPlay",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        },
        "gamePk": {
          "type": "str",
          "default": "",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["timecode", "fields"],
      "required_params": [[]]
    },
    "gamePace": {
      "url": BASE_URL + "/gamePace",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["season", "teamIds", "leagueIds", "leagueListId", "sportId", "gameType", "startDate", "endDate", "venueIds", "orgType", "includeChildren", "fields"],
      "required_params": [["season"]]
    },
    "highLow": {
      "url": BASE_URL + "/highLow/{orgType}",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        },
        "orgType": {
          "type": "str",
          "default": "",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["statGroup", "sortStat", "season", "gameType", "teamId", "leagueId", "sportIds", "limit", "fields"],
      "required_params": [["sortStat", "season"]],
      "note": "Valid values for orgType parameter: player, team, division, league, sport, types."
    },
    "homeRunDerby": {
      "url": BASE_URL + "/homeRunDerby/{gamePk}{bracket}{pool}",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        },
        "gamePk": {
          "type": "str",
          "default": "",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        },
        "bracket": {
          "type": "bool",
          "default": false,
          "true": "/bracket",
          "false": "",
          "leading_slash": false,
          "trailing_slash": false,
          "required": false
        },
        "pool": {
          "type": "bool",
          "default": false,
          "true": "/pool",
          "false": "",
          "leading_slash": false,
          "trailing_slash": false,
          "required": false
        }
      },
      "query_params": ["fields"],
      "required_params": [[]]
    },
    "league": {
      "url": BASE_URL + "/league",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["sportId", "leagueIds", "seasons", "fields"],
      "required_params": [["sportId"], ["leagueIds"]]
    },
    "league_allStarBallot": {
      "url": BASE_URL + "/league/{leagueId}/allStarBallot",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        },
        "leagueId": {
          "type": "str",
          "default": "",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["season", "fields"],
      "required_params": [["season"]]
    },
    "league_allStarWriteIns": {
      "url": BASE_URL + "/league/{leagueId}/allStarWriteIns",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        },
        "leagueId": {
          "type": "str",
          "default": "",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["season", "fields"],
      "required_params": [["season"]]
    },
    "league_allStarFinalVote": {
      "url": BASE_URL + "/league/{leagueId}/allStarFinalVote",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        },
        "leagueId": {
          "type": "str",
          "default": "",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["season", "fields"],
      "required_params": [["season"]]
    },
    "people": {
      "url": BASE_URL + "/people",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["personIds", "hydrate", "fields"],
      "required_params": [["personIds"]]
    },
    "people_changes": {
      "url": BASE_URL + "/people/changes",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["updatedSince", "fields"],
      "required_params": [[]]
    },
    "people_freeAgents": {
      "url": BASE_URL + "/people/freeAgents",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        },
        "leagueId": {
          "type": "str",
          "default": "",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["order", "hydrate", "fields"],
      "required_params": [[]]
    },
    "person": {
      "url": BASE_URL + "/people/{personId}",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        },
        "personId": {
          "type": "str",
          "default": "",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["hydrate", "fields"],
      "required_params": [[]]
    },
    "person_stats": {
      "url": BASE_URL + "/people/{personId}/stats/game/{gamePk}",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        },
        "personId": {
          "type": "str",
          "default": "",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        },
        "gamePk": {
          "type": "str",
          "default": "",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["fields"],
      "required_params": [[]],
      "note": `Specify "current" instead of a gamePk for a player's current game stats.`
    },
    "jobs": {
      "url": BASE_URL + "/jobs",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["jobType", "sportId", "date", "fields"],
      "required_params": [["jobType"]]
    },
    "jobs_umpires": {
      "url": BASE_URL + "/jobs/umpires",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["sportId", "date", "fields"],
      "required_params": [[]]
    },
    "jobs_umpire_games": {
      "url": BASE_URL + "/jobs/umpires/games/{umpireId}",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        },
        "umpireId": {
          "type": "str",
          "default": "",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["season", "fields"],
      "required_params": [["season"]]
    },
    "jobs_datacasters": {
      "url": BASE_URL + "/jobs/datacasters",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["sportId", "date", "fields"],
      "required_params": [[]]
    },
    "jobs_officialScorers": {
      "url": BASE_URL + "/jobs/officialScorers",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["timecode", "fields"],
      "required_params": [[]]
    },
    "schedule": {
      "url": BASE_URL + "/schedule",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["scheduleType", "eventTypes", "hydrate", "teamId", "leagueId", "sportId", "gamePk", "gamePks", "venueIds", "gameTypes", "date", "startDate", "endDate", "opponentId", "fields"],
      "required_params": [["sportId"], ["gamePk"], ["gamePks"]]
    },
    "schedule_tied": {
      "url": BASE_URL + "/schedule/games/tied",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["gameTypes", "season", "hydrate", "fields"],
      "required_params": [["season"]]
    },
    "schedule_postseason": {
      "url": BASE_URL + "/schedule/postseason",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["gameTypes", "seriesNumber", "teamId", "sportId", "season", "hydrate", "fields"],
      "required_params": [[]]
    },
    "schedule_postseason_series": {
      "url": BASE_URL + "/schedule/postseason/series",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["gameTypes", "seriesNumber", "teamId", "sportId", "season", "fields"],
      "required_params": [[]]
    },
    "schedule_postseason_tuneIn": {
      "url": BASE_URL + "/schedule/postseason/tuneIn",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["teamId", "sportId", "season", "hydrate", "fields"],
      "required_params": [[]],
      "note": "The schedule_postseason_tuneIn endpoint appears to return no data."
    },
    "seasons": {
      "url": BASE_URL + "/seasons{all}",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        },
        "all": {
          "type": "bool",
          "default": false,
          "true": "/all",
          "false": "",
          "leading_slash": false,
          "trailing_slash": false,
          "required": false
        }
      },
      "query_params": ["season", "sportId", "divisionId", "leagueId", "fields"],
      "required_params": [["sportId"], ["divisionId"], ["leagueId"]],
      "note": 'Include "all" parameter with value of true to query all seasons. The divisionId and leagueId parameters are supported when "all" is used.'
    },
    "season": {
      "url": BASE_URL + "/seasons/{seasonId}",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        },
        "seasonId": {
          "type": "str",
          "default": false,
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["sportId", "fields"],
      "required_params": [["sportId"]]
    },
    "sports": {
      "url": BASE_URL + "/sports",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["sportId", "fields"],
      "required_params": [[]]
    },
    "sports_players": {
      "url": BASE_URL + "/sports/{sportId}/players",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        },
        "sportId": {
          "type": "str",
          "default": "1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["season", "gameType", "fields"],
      "required_params": [["season"]]
    },
    "standings": {
      "url": BASE_URL + "/standings",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["leagueId", "season", "standingsTypes", "date", "hydrate", "fields"],
      "required_params": [["leagueId"]]
    },
    "stats": {
      "url": BASE_URL + "/stats",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["stats", "playerPool", "position", "teamId", "leagueId", "limit", "offset", "group", "gameType", "season", "sportIds", "sortStat", "order", "hydrate", "fields", "personId", "metrics"],
      "required_params": [["stats", "group"]],
      "note": "If no limit is specified, the response will be limited to 50 records."
    },
    "stats_leaders": {
      "url": BASE_URL + "/stats/leaders",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["leaderCategories", "playerPool", "leaderGameTypes", "statGroup", "season", "leagueId", "sportId", "hydrate", "limit", "fields", "statType"],
      "required_params": [["leaderCategories"]],
      "note": "If excluding season parameter to get all time leaders, include statType=statsSingleSeason or you will likely not get any results."
    },
    "stats_streaks": {
      "url": BASE_URL + "/stats/streaks",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["streakType", "streakSpan", "gameType", "season", "sportId", "limit", "hydrate", "fields"],
      "required_params": [["streakType", "streakSpan", "season", "sportId", "limit"]],
      "note": 'Valid streakType values: "hittingStreakOverall" "hittingStreakHome" "hittingStreakAway" "onBaseOverall" "onBaseHome" "onBaseAway". Valid streakSpan values: "career" "season" "currentStreak" "currentStreakInSeason" "notable" "notableInSeason".'
    },
    "teams": {
      "url": BASE_URL + "/teams",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["season", "activeStatus", "leagueIds", "sportId", "sportIds", "gameType", "hydrate", "fields"],
      "required_params": [[]]
    },
    "teams_history": {
      "url": BASE_URL + "/teams/history",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["teamIds", "startSeason", "endSeason", "fields"],
      "required_params": [["teamIds"]]
    },
    "teams_stats": {
      "url": BASE_URL + "/teams/stats",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["season", "sportIds", "group", "gameType", "stats", "order", "sortStat", "fields", "startDate", "endDate"],
      "required_params": [["season", "group", "stats"]],
      "note": "Use meta('statGroups') to look up valid values for group, and meta('statTypes') for valid values for stats."
    },
    "teams_affiliates": {
      "url": BASE_URL + "/teams/affiliates",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["teamIds", "sportId", "season", "hydrate", "fields"],
      "required_params": [["teamIds"]]
    },
    "team": {
      "url": BASE_URL + "/teams/{teamId}",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        },
        "teamId": {
          "type": "str",
          "default": "",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["season", "sportId", "hydrate", "fields"],
      "required_params": [[]]
    },
    "team_alumni": {
      "url": BASE_URL + "/teams/{teamId}/alumni",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        },
        "teamId": {
          "type": "str",
          "default": "",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["season", "group", "hydrate", "fields"],
      "required_params": [["season", "group"]]
    },
    "team_coaches": {
      "url": BASE_URL + "/teams/{teamId}/coaches",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        },
        "teamId": {
          "type": "str",
          "default": "",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["season", "date", "fields"],
      "required_params": [[]]
    },
    "team_personnel": {
      "url": BASE_URL + "/teams/{teamId}/personnel",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        },
        "teamId": {
          "type": "str",
          "default": "",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["date", "fields"],
      "required_params": [[]]
    },
    "team_leaders": {
      "url": BASE_URL + "/teams/{teamId}/leaders",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        },
        "teamId": {
          "type": "str",
          "default": "",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["leaderCategories", "season", "leaderGameTypes", "hydrate", "limit", "fields"],
      "required_params": [["leaderCategories", "season"]]
    },
    "team_roster": {
      "url": BASE_URL + "/teams/{teamId}/roster",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        },
        "teamId": {
          "type": "str",
          "default": "",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["rosterType", "season", "date", "hydrate", "fields"],
      "required_params": [[]]
    },
    "team_stats": {
      "url": BASE_URL + "/teams/{teamId}/stats",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        },
        "teamId": {
          "type": "str",
          "default": "",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["season", "group", "gameType", "stats", "sportIds", "sitCodes", "fields"],
      "required_params": [["season", "group"]],
      "note": "Use meta('statGroups') to look up valid values for group, meta('statTypes') for valid values for stats, and meta('situationCodes') for valid values for sitCodes. Use sitCodes with stats=statSplits."
    },
    "transactions": {
      "url": BASE_URL + "/transactions",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["teamId", "playerId", "date", "startDate", "endDate", "sportId", "fields"],
      "required_params": [["teamId"], ["playerId"], ["date"], ["startDate", "endDate"]]
    },
    "venue": {
      "url": BASE_URL + "/venues",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": ["venueIds", "season", "hydrate", "fields"],
      "required_params": [["venueIds"]]
    },
    "meta": {
      "url": BASE_URL + "/{type}",
      "path_params": {
        "ver": {
          "type": "str",
          "default": "v1",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        },
        "type": {
          "type": "str",
          "default": "",
          "leading_slash": false,
          "trailing_slash": false,
          "required": true
        }
      },
      "query_params": [[]],
      "required_params": [[]],
      "note": "The meta endpoint is used to retrieve values to be used within other API calls. Available types: awards, baseballStats, eventTypes, gameStatus, gameTypes, hitTrajectories, jobTypes, languages, leagueLeaderTypes, logicalEvents, metrics, pitchCodes, pitchTypes, platforms, positions, reviewReasons, rosterTypes, scheduleEventTypes, situationCodes, sky, standingsTypes, statGroups, statTypes, windDirection."
    }
  };
};

export { request as r };
