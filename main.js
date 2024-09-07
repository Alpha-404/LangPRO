document.getElementById("terminal").value = ""
var user = {username: "", password: "", token: ""}

var mods = {
    1: 13817,
    2: 13822,
    3: 13818,
    4: 13821,
    5: 13816,
    6: 13815,
    7: 13819,
    8: 13823,
    9: 13820,
    10: 13828,
    11: 13829,
    12: 13830,
    13: 13864,
    14: 13863,
    15: 13862,
    16: 13878,
    17: 13899,
    18: 13901,
    19: 13860,
    20: 13857,
    21: 13855,
    22: 13859,
    23: 13861,
    24: 13854,
    25: 13858,
    26: 13856
}

function log(message) {
    console.log(message)
    document.getElementById("terminal").value += "\n" + message
}

function login() {
    user.username = document.getElementById("username").value
    user.password = document.getElementById("password").value
    console.log(user.username + ":" + user.password)
    fetch("https://api.languagenut.com/loginController/attemptlogin?cacheBreaker=" + Date.now().toString() + "", {
          "headers": {
            "accept": "text/plain, */*; q=0.01",
            "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Brave\";v=\"121\", \"Chromium\";v=\"121\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Linux\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "sec-gpc": "1"
          },
          "referrer": "https://www.languagenut.com/",
          "referrerPolicy": "strict-origin-when-cross-origin",
          "body": "username=" + user.username + "&pass=" + user.password + "&languagenutTimeMarker=" + Date.now().toString() + "&lastLanguagenutTimeMarker=" + Date.now().toString() + "&apiVersion=9",
          "method": "POST",
          "mode": "cors",
          "credentials": "omit"
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the response body as JSON
    })
    .then(data => {
        console.log('Data received:', data);
        document.getElementById("statusbox").innerHTML = data.personName
        user.token = data.newToken
        log("Logged in as " + data.personName)
        log("Last 5 characters of token: " + user.token.slice(-5))
    })
    .catch(error => {
        //log('There was a problem with the fetch operation:', error);
        console.error(error);
    });
}

var checkboxes = {
    cataAns: document.getElementById("cataAns"),
    genMedals: document.getElementById("genMedals"),
    modAns: document.getElementById("modAns"),
    downData: document.getElementById("downData"),
    compHW: document.getElementById("compHW"),
    printCurMedals: document.getElementById("printCurMedals")
}

checkboxes.cataAns.addEventListener('change', function(event) {
    if (checkboxes.cataAns.checked) {
        document.getElementById("cataAnsTb").style.display = "inline-block";
        checkboxes.genMedals.checked = false
        checkboxes.modAns.checked = false
        checkboxes.compHW.checked = false
        document.getElementById("medalAm").style.display = "none";
        document.getElementById("modTB").style.display = "none";
        document.getElementById("compHWtb").style.display = "none";
    } else {
        document.getElementById("cataAnsTb").style.display = "none";
    }
});

checkboxes.genMedals.addEventListener('change', function(event) {
    if (checkboxes.genMedals.checked) {
        document.getElementById("medalAm").style.display = "inline-block";
        checkboxes.cataAns.checked = false
        checkboxes.compHW.checked = false
        checkboxes.modAns.checked = false
        document.getElementById("cataAnsTb").style.display = "none";
        document.getElementById("compHWtb").style.display = "none";
        document.getElementById("modTB").style.display = "none";
    } else {
        document.getElementById("medalAm").style.display = "none";
    }
});

checkboxes.modAns.addEventListener('change', function(event) {
    if (checkboxes.modAns.checked) {
        document.getElementById("modTB").style.display = "inline-block";
        checkboxes.genMedals.checked = false
        checkboxes.cataAns.checked = false
        checkboxes.compHW.checked = false
        document.getElementById("medalAm").style.display = "none";
        document.getElementById("compHWtb").style.display = "none";
        document.getElementById("cataAnsTb").style.display = "none";
    } else {
        document.getElementById("modTB").style.display = "none";
    }
});

checkboxes.compHW.addEventListener('change', function(event) {
    if (checkboxes.compHW.checked) {
        document.getElementById("compHWtb").style.display = "inline-block";
        checkboxes.genMedals.checked = false
        checkboxes.cataAns.checked = false
        document.getElementById("medalAm").style.display = "none";
        document.getElementById("cataAnsTb").style.display = "none";
        document.getElementById("modTB").style.display = "none";
    } else {
        document.getElementById("compHWtb").style.display = "none";
    }
})

/*
checkboxes.downData.addEventListener('change', function(event) {
    if (checkboxes.downData.checked) {
        document.getElementById("datedown").style.display = "inline-block";
    } else {
        document.getElementById("datedown").style.display = "none";
    }
})
*/

function completeHW(data) {
    var counter = 0
    for (var j in data.tasks) {
        fetch("https://api.languagenut.com/gameDataController/addGameScore?cacheBreaker=" + Date.now().toString() + "", {
          "headers": {
            "accept": "text/plain, */*; q=0.01",
            "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Brave\";v=\"121\", \"Chromium\";v=\"121\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Linux\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "sec-gpc": "1"
          },
          "referrer": "https://www.languagenut.com/",
          "referrerPolicy": "strict-origin-when-cross-origin",
          "body": "moduleUid=" + data.tasks[j].rel_module_uid +"&gameUid=" + data.tasks[j].game_uid + "&gameType=" + data.tasks[j].gameType + "&isTest=true&toietf=de&fromietf=en-GB&score=4600&correctVocabs=26492%2C26496%2C26497%2C26509%2C26501%2C26495%2C26500%2C26503%2C26488%2C26508%2C26486%2C26489%2C26502%2C26494%2C26506%2C26507%2C26499%2C26498%2C26504%2C26487%2C26490%2C26455%2C26505&incorrectVocabs=&homeworkUid=" + data.id + "&featureUid="+ data.tasks[j].feature_uid + "&isSentence=false&isALevel=false&isVerb=false&grammarCatalogUid=" + data.tasks[j].rel_module_uid + "&isGrammar=false&isExam=false&timeStamp=178499&vocabNumber=23&rel_module_uid=" + data.tasks[j].rel_module_uid + "&dontStoreStats=true&correctStudentAns=das+Tanzen%2Cdas+Hockey%2Cdas+Eishockey%2Cdas+Yoga%2Cdas+Rugby%2Cder+Fu%C3%9Fball%2Cdas+Schwimmen%2Cdas+Skifahren%2Cder+Basketball%2Cder+Volleyball%2Cdas+Aerobic%2Cdas+Snooker%2Cdas+Skateboardfahren%2Cdas+Pferdereiten%2Cdas+Tischtennis%2Cdas+Segeln%2Cdas+Judo%2Cdas+Joggen%2Cdas+Surfen%2Cdie+Leichtathletik%2Cdas+Boxen%2CIch+fahre+Rad%2Cdas+Tennis&incorrectStudentAns=&product=secondary&languagenutTimeMarker=" + Date.now().toString() + "&lastLanguagenutTimeMarker=" + Date.now().toString() + "&apiVersion=9&token=" + user.token,
          "method": "POST",
          "mode": "cors",
          "credentials": "omit"
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log(response)
            return response.json();
        })
        .then(data => {
            user.token = data.newToken
            log("Completed homework tasks: " + counter)
            counter++;
        })
        .catch(error => {
            //log('There was a problem with the fetch operation:', error);
            console.error("error ", error)
        });

    }
}

function hack() {
    if (user.token == "") {
        alert("Login first!")
        return "fail"
    }
    if (checkboxes.cataAns.checked) {
        if (document.getElementById("cataAnsTb").value != "") {
            fetch("https://api.languagenut.com/vocabTranslationController/getVocabTranslations?cacheBreaker=" + Date.now().toString() + "", {
              "headers": {
                "accept": "text/plain, */*; q=0.01",
                "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Brave\";v=\"121\", \"Chromium\";v=\"121\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Linux\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "sec-gpc": "1"
              },
              "referrer": "https://www.languagenut.com/",
              "referrerPolicy": "strict-origin-when-cross-origin",
              "body": "catalogUid%5B%5D="+document.getElementById("cataAnsTb").value+"&toLanguage=de&fromLanguage=en-GB&homeworkUid=&languagenutTimeMarker=" + Date.now().toString() + "&lastLanguagenutTimeMarker=" + Date.now().toString() + "&apiVersion=9&token=" + user.token,
              "method": "POST",
              "mode": "cors",
              "credentials": "omit"
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Parse the response body as JSON
            })
            .then(data => {
                console.log('Data received:', data);
                user.token = data.newToken

                console.log(data.vocabTranslations)

                data.vocabTranslations.forEach(function(item) {
                    log(item.word + " : " + item.originalWord)
                });
            })
            .catch(error => {
                console.error(error);
                //log('There was a problem with the fetch operation:', error);
            });
        } else {
            alert("No catalog uid!, put one in")
        }
    }else if (checkboxes.modAns.checked) {
        if (document.getElementById("modTB").value != "") {
            var catuid = ""
            fetch("https://api.languagenut.com/screensController/getCatalogUid?cacheBreaker=" + Date.now().toString() + "", {
                  "headers": {
                    "accept": "text/plain, */*; q=0.01",
                    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Brave\";v=\"121\", \"Chromium\";v=\"121\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"Linux\"",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-site",
                    "sec-gpc": "1"
                  },
                  "referrer": "https://www.languagenut.com/",
                  "referrerPolicy": "strict-origin-when-cross-origin",
                  "body": "moduleUid="+document.getElementById("modTB").value+"&catalogUid=&homeworkUid=&packageUid=34&ietf=de&newPageTrigger=true&newPage=Catalog&languagenutTimeMarker=" + Date.now().toString() + "&lastLanguagenutTimeMarker=" + Date.now().toString() + "&apiVersion=9&token=" + user.token,
                  "method": "POST",
                  "mode": "cors",
                  "credentials": "omit"
                }).then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json(); // Parse the response body as JSON
                })
                .then(data => {
                    user.token = data.newToken
                    catuid = data.catalogUid
                    log("got new token + got catuid of " + catuid)
                    fetch("https://api.languagenut.com/vocabTranslationController/getVocabTranslations?cacheBreaker=" + Date.now().toString() + "", {
                      "headers": {
                        "accept": "text/plain, */*; q=0.01",
                        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Brave\";v=\"121\", \"Chromium\";v=\"121\"",
                        "sec-ch-ua-mobile": "?0",
                        "sec-ch-ua-platform": "\"Linux\"",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-site",
                        "sec-gpc": "1"
                      },
                      "referrer": "https://www.languagenut.com/",
                      "referrerPolicy": "strict-origin-when-cross-origin",
                      "body": "catalogUid%5B%5D="+catuid+"&toLanguage=de&fromLanguage=en-GB&homeworkUid=&languagenutTimeMarker=" + Date.now().toString() + "&lastLanguagenutTimeMarker=" + Date.now().toString() + "&apiVersion=9&token=" + user.token,
                      "method": "POST",
                      "mode": "cors",
                      "credentials": "omit"
                    }).then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json(); // Parse the response body as JSON
                    })
                    .then(data => {
                        console.log('Data received:', data);
                        user.token = data.newToken
                    
                        console.log(data.vocabTranslations)
                    
                        data.vocabTranslations.forEach(function(item) {
                            log(item.word + " : " + item.originalWord)
                        });
                    })
                    .catch(error => {
                        console.error(error);
                        //log('There was a problem with the fetch operation:', error);
                    });
                })
                .catch(error => {
                    console.error(error);
                    //log('There was a problem with the fetch operation:', error);
                });
        } else {
            alert("No module uid!, put one in")
        }
    }else if (checkboxes.genMedals.checked) {
        if (document.getElementById("medalAm").value != "") {
            var c = 1;
            fetch("https://api.languagenut.com/userDataController/getUserData?cacheBreaker=" + Date.now().toString() + "", {
              "headers": {
                "accept": "text/plain, */*; q=0.01",
                "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Brave\";v=\"121\", \"Chromium\";v=\"121\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Linux\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "sec-gpc": "1"
              },
              "referrer": "https://www.languagenut.com/",
              "referrerPolicy": "strict-origin-when-cross-origin",
              "body": "languagenutTimeMarker=" + Date.now().toString() + "&lastLanguagenutTimeMarker=" + Date.now().toString() + "&apiVersion=9&token=" + user.token,
              "method": "POST",
              "mode": "cors",
              "credentials": "omit"
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Parse the response body as JSON
            })
            .then(data => {
                user.token = data.newToken
                log("You currently have " + data.goldMedals + " gold medals")
                log("cooking medals...")
            })
            .catch(error => {
                //log('There was a problem with the fetch operation:', error);
                console.error(error);
            });
            for (i = 0; i < document.getElementById("medalAm").value; i++) {
                var m = mods[c]
                fetch("https://api.languagenut.com/gameDataController/addGameScore?cacheBreaker=" + Date.now().toString() + "", {
                    "headers": {
                      "accept": "text/plain, */*; q=0.01",
                      "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                      "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Brave\";v=\"121\", \"Chromium\";v=\"121\"",
                      "sec-ch-ua-mobile": "?0",
                      "sec-ch-ua-platform": "\"Linux\"",
                      "sec-fetch-dest": "empty",
                      "sec-fetch-mode": "cors",
                      "sec-fetch-site": "same-site",
                      "sec-gpc": "1"
                    },
                    "referrer": "https://www.languagenut.com/",
                    "referrerPolicy": "strict-origin-when-cross-origin",
                    "body": "moduleUid=" + m + "&gameUid=10&gameType=reading&isTest=true&toietf=de&fromietf=en-GB&score=1800&correctVocabs=26094%2C26097%2C26089%2C26091%2C26092%2C26096%2C26093%2C26090%2C26088&incorrectVocabs=26095&isSentence=false&isALevel=false&isVerb=false&grammarCatalogUid=13816&isGrammar=false&isExam=false&timeStamp=64628&vocabNumber=10&correctStudentAns=orange%2Cgr%C3%BCn%2Cblau%2Cgelb%2Cbraun%2Crot%2Cschwarz%2Cgrau%2Cwei%C3%9F&incorrectStudentAns=schwarz&product=secondary&languagenutTimeMarker=" + Date.now().toString() + "&lastLanguagenutTimeMarker=" + Date.now().toString() + "&apiVersion=9&token=" + user.token,
                    "method": "POST",
                    "mode": "cors",
                    "credentials": "omit"
                }).then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json(); // Parse the response body as JSON
                })
                .then(data => {
                    console.log('Data received:', data);
                    document.getElementById("statusbox").innerHTML = data.personName
                    user.token = data.newToken
                })
                .catch(error => {
                    console.error(error);
                });
                c++
            }
            fetch("https://api.languagenut.com/userDataController/getUserData?cacheBreaker=" + Date.now().toString() + "", {
              "headers": {
                "accept": "text/plain, */*; q=0.01",
                "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Brave\";v=\"121\", \"Chromium\";v=\"121\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Linux\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "sec-gpc": "1"
              },
              "referrer": "https://www.languagenut.com/",
              "referrerPolicy": "strict-origin-when-cross-origin",
              "body": "languagenutTimeMarker=" + Date.now().toString() + "&lastLanguagenutTimeMarker=" + Date.now().toString() + "&apiVersion=9&token=" + user.token,
              "method": "POST",
              "mode": "cors",
              "credentials": "omit"
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Parse the response body as JSON
            })
            .then(data => {
                user.token = data.newToken
                //log("You currently have " + data.goldMedals + " gold medals")
                log("Successfully cooked medals, it may take a few seconds to show up")
            })
            .catch(error => {
                ////log('There was a problem with the fetch operation:', error);
                console.error(error);
            });
        }else {
            alert("Specify how many medals you want (1-inf)")
        }
    }else if (checkboxes.compHW.checked) {
        if (document.getElementById("compHWtb").value != "") {
            var hwinfo = {tasks: {}}
            fetch("https://api.languagenut.com/assignmentController/getViewableAll?cacheBreaker=" + Date.now().toString() + "", {
              "headers": {
                "accept": "text/plain, */*; q=0.01",
                "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Brave\";v=\"121\", \"Chromium\";v=\"121\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Linux\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "sec-gpc": "1"
              },
              "referrer": "https://www.languagenut.com/",
              "referrerPolicy": "strict-origin-when-cross-origin",
              "body": "languagenutTimeMarker=" + Date.now().toString() + "&lastLanguagenutTimeMarker=" + Date.now().toString() + "&apiVersion=9&token=" + user.token,
              "method": "POST",
              "mode": "cors",
              "credentials": "omit"
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Parse the response body as JSON
            })
            .then(data => {
                console.log('Data received:', data);
                user.token = data.newToken
                
                hwinfo["id"] = data.homework[document.getElementById("compHWtb").value].id
                
                var count = 0
                data.homework[document.getElementById("compHWtb").value].tasks.forEach(function(j) {
                    hwinfo["tasks"][count] = j
                    count++
                })
                console.log(hwinfo)
                completeHW(hwinfo)
            })
            .catch(error => {
                //log('There was a problem with the fetch operation:', error);
                console.error(error)
            });
        }
    }

    if (checkboxes.downData.checked) {
        log("Downloading your data from servers....")
        fetch("https://api.languagenut.com/userDataController/getUserData?cacheBreaker="+Date.now().toString()+"", {
            "headers": {
                  "accept": "text/plain, */*; q=0.01",
                  "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                  "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                  "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Brave\";v=\"121\", \"Chromium\";v=\"121\"",
                  "sec-ch-ua-mobile": "?0",
                  "sec-ch-ua-platform": "\"Linux\"",
                  "sec-fetch-dest": "empty",
                  "sec-fetch-mode": "cors",
                  "sec-fetch-site": "same-site",
                  "sec-gpc": "1"
                },
                "referrer": "https://www.languagenut.com/",
                "referrerPolicy": "strict-origin-when-cross-origin",
                "body": "languagenutTimeMarker="+Date.now().toString()+"&lastLanguagenutTimeMarker="+Date.now().toString()+"&apiVersion=9&token=" + user.token,
                "method": "POST",
                "mode": "cors",
                "credentials": "omit"
            })
            .then(response => response.json())
            .then(data => {
                var blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
                var url = URL.createObjectURL(blob);
                var link = document.createElement('a');
                var userid = data.userUid
                link.href = url;
                link.download = "userdata.json";
                link.click();
                URL.revokeObjectURL(url);
                data.newToken = user.token
                log("Fetched user data")
                var date = new Date(document.getElementById("datedown").value)
                log(userid)
            })
            .catch(error => {log('Error fetching data:' + error); console.error(error)});
    }

    if (checkboxes.printCurMedals.checked) {
        fetch("https://api.languagenut.com/userDataController/getUserData?cacheBreaker=" + Date.now().toString() + "", {
              "headers": {
                "accept": "text/plain, */*; q=0.01",
                "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Brave\";v=\"121\", \"Chromium\";v=\"121\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Linux\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "sec-gpc": "1"
              },
              "referrer": "https://www.languagenut.com/",
              "referrerPolicy": "strict-origin-when-cross-origin",
              "body": "languagenutTimeMarker=" + Date.now().toString() + "&lastLanguagenutTimeMarker=" + Date.now().toString() + "&apiVersion=9&token=" + user.token,
              "method": "POST",
              "mode": "cors",
              "credentials": "omit"
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Parse the response body as JSON
            })
            .then(data => {
                user.token = data.newToken
                log("You currently have " + data.goldMedals + " gold medals")
            })
    }
    
}


log("LangPro++ loaded !!!!!!")
