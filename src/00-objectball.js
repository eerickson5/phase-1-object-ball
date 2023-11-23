gameObject = () => {
    let obj = {
        home: {
            teamName: "Brooklyn Nets",
            colors: ["Black", "White"],
            players: []
        },
        away: {
            teamName: "Charlotte Hornets",
            colors: ["Turquoise", "Purple"],
            players: []
        }
    }

    let hNames = ["Alan Anderson", "Reggie Evans", "Brook Lopez", "Mason Plumlee", "Jason Terry"];
    let hNumbers = [0,30,11,1,31];
    let hShoes = [16,14,17,19,15];
    let hPoints = [22,12,17,26,19];
    let hRebounds = [12,12,19,12,2]
    let hAssists = [12,12,10,6,2];
    let hSteals = [3,12,3,3,4];
    let hBlocks = [1,12,1,8,11];
    let hDunks = [1,7,15,5,1];

    let aNames = ["Jeff Adrien",	"Bismak Biyombo",	"DeSagna Diop",	"Ben Gordon",	"Brendan Haywood"];
    let aNumbers = [4,	0,	2,	8,	33];
    let aShoes = [18,	16,	14,	15,	15];
    let aPoints = [10,	12,	24,	33,	6];
    let aRebounds = [1,	4,	12,	3,	12]
    let aAssists = [1,	7,	12,	2,	12];
    let aSteals = [2,	7,	4,	1,	22];
    let aBlocks = [7,	15,	5,	1,	5];
    let aDunks = [2,	10,	5,	0,	12];

    setData = (names, numbers, shoes, points, rebounds,assists,steals,blocks,dunks) => {
        let playersArray = [];
        for (let i = 0; i < 5; i ++){
            let newPlayer = {
                name: names[i],
                number: numbers[i],
                shoe: shoes[i],
                points: points[i],
                rebounds: rebounds[i],
                assists: assists[i],
                steals: steals[i],
                blocks: blocks[i],
                slamDunks: dunks[i]
            }
            playersArray.push(newPlayer);
        }
        return playersArray;
    }


    obj.home.players = setData(hNames, hNumbers, hShoes, hPoints, hRebounds,hAssists,hSteals,hBlocks,hDunks);
    obj.away.players = setData(aNames, aNumbers, aShoes, aPoints, aRebounds,aAssists,aSteals,aBlocks,aDunks);

    return(obj);
}

// Helpers

//given property to search and value to search it by returns returnProperty from FIRST instance of match
returnSingleProperty = (evalProperty, evalMatch, returnProperty) => {
    let game = gameObject();
    for (const team in game){
        if(game[team][evalProperty] === evalMatch){
            return game[team][returnProperty];
        } else {
            for(const player of game[team].players){
                if(player[evalProperty] === evalMatch){
                    if(returnProperty === "allStats"){
                        let statsObject = {...player}
                        delete statsObject.name;
                        return(statsObject);
                    } else {
                        return player[returnProperty];
                    }
                }
            }
        }
        
    }
    console.log("No property of that type matches the given property name.")
    return undefined;
}

//given teamName, returns array of each player in that team's returnProperty
returnTeamProperties = (teamName, returnProperty) => {
    let game = gameObject();
    if(teamName === "all"){
        let returnArray = [];
        for (const team in game){
            for(const player of game[team].players){
                returnArray.push(player[returnProperty]);
            }
        }
        return returnArray;
    } else {
        for (const team in game){
            if(game[team].teamName === teamName){
                let returnArray = [];
                for(const player of game[team].players){
                    returnArray.push(player[returnProperty]);
                }
                return returnArray;
            }
        }
    }

}

//given a property to evaluate, finds the highest value of that property and returns that player's returnProperty
returnPropertyBasedOnHighest = (evalProperty, returnProperty) => {
    let allEvalArray = returnTeamProperties("all", evalProperty);
    let max = allEvalArray[0];
    for(let i = 1; i < allEvalArray.length; i++){
        if(allEvalArray[i] > max){
            max = allEvalArray[i];
        }
    }
    return returnSingleProperty(evalProperty, max, returnProperty);
}



//Basic Functions
numPointsScored = (name) => returnSingleProperty("name", name, "points");
shoeSize = name => returnSingleProperty("name", name, "shoe");
teamColors = teamName => returnSingleProperty("teamName", teamName, "colors");
teamNames = () => {
    let game = gameObject();
    return [
        game.home.teamName,
        game.away.teamName
    ];
}
playerNumbers = teamName => returnTeamProperties(teamName, "number");
playerStats = name => returnSingleProperty("name", name, "allStats");
bigShoeRebounds = () => returnPropertyBasedOnHighest("shoe", "rebounds");


//Bonus Functions
mostPointsScored = () => returnPropertyBasedOnHighest("points", "name");
winningTeam = () => {
    //[0] is h, [1] is away per teamNames();
    //I know that's not good coding but I'm getting tired of this project
    let teamNamesArray = teamNames();

    let teamH = returnTeamProperties(teamNamesArray[0], "points");
    let teamHPoints = 0;
    for(let points of teamH){
        teamHPoints += points;
    }

    let teamA = returnTeamProperties(teamNamesArray[1], "points");
    let teamAPoints = 0;
    for(let points of teamA){
        teamAPoints += points;
    }
    
    return teamHPoints > teamAPoints ? teamNamesArray[0] : teamNamesArray[1];
}
playerWithLongestName = () => {
    let namesArray = returnTeamProperties("all", "name");
    let longestName = namesArray[0];
    for (let name of namesArray) {
        if (name.length > longestName.length){
            longestName = name;
        }
    }
    return longestName;
}