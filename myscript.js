$(document).ready(function() {
    play = false;
    startElemet = [];
    cellArr = [];
    neighArr = [];
    resultA = [];
    resultIn = [];
    iterations = [];
    itrCount = -1;
    counter = 0;
    nCounter = 0;
    fristTime = true;
    delayValue = 100;

    function getStartElement() {
        startElemet = [];
        var val = $("#board").val();
        for (var w = 0; w < val; w++) {
            for (var o = 0; o < val; o++) {
                cells = $("#" + w + '-' + o);
                if ($(cells).css('background-color') == "rgb(102, 0, 51)") {
                    startElemet.push(w + '-' + o);
                }
            }
        }
        return startElemet;
    }

    $("#next").on("click", function() {
        playGame();
    });

    // previous button function
    $("#prev").on("click", function() {
        if (itrCount > 0) {
            $("#grid-board").html("");
            itrCount--;
            $(iterations[itrCount]).appendTo("#grid-board");
        }

    });

    $("#start").on("click", function() {
        if ($(this).html() == "Start") {
            $(this).html("Pause");

            // check if the first iteration to clone the div
            if (fristTime == true) {
                itr = $("#grid-board").clone(true);
                itrCount++;
                iterations.push(itr);
                fristTime = false;
            }
            play = true;
            interval = setInterval(playGame, delayValue);

        } else {
            if ($(this).html("Start")) {
                play = false;
                clearInterval(interval);
            }
        }
    });


    // get the value of the dropdown delay list 
    $("#delay").on("change", function() {
        clearInterval(interval);
        delayValue = $("#delay").val();
        interval = setInterval(playGame, delayValue);
    });

    // function to play the game
    function playGame() {
        startElemets = getStartElement();
        for (var x = 0; x < startElemets.length; x++) {
            element = startElemets[x];
            parts = element.split('-');
            ii = parts[0];
            jj = parts[1];
            i = parseInt(ii);
            j = parseInt(jj);
            cell1 = $("#" + i + '-' + j);
            cell2 = $("#" + i + '-' + (j + 1));
            cellArr.push(cell2);
            cell3 = $("#" + i + '-' + (j - 1));
            cellArr.push(cell3);
            cell4 = $("#" + (i - 1) + '-' + j);
            cellArr.push(cell4);
            cell5 = $("#" + (i + 1) + '-' + j);
            cellArr.push(cell5);

            cell6 = $("#" + (i - 1) + '-' + (j - 1));
            cellArr.push(cell6);

            cell7 = $("#" + (i - 1) + '-' + (j + 1));
            cellArr.push(cell7);

            cell8 = $("#" + (i + 1) + '-' + (j + 1));
            cellArr.push(cell8);

            cell9 = $("#" + (i + 1) + '-' + (j - 1));
            cellArr.push(cell9);
            for (var z = 0; z < cellArr.length; z++) {

                //check which cell is active
                if ($(cellArr[z]).css('background-color') == "rgb(102, 0, 51)") {
                    counter++;
                }

            }
            if ((counter < 2) || (counter > 3)) {
                resultIn.push("#" + i + '-' + j);
            } else if ((counter == 2) || (counter == 3)) {
                resultA.push("#" + i + '-' + j);
            }


            cellArr = [];
            counter = 0;
        }

        var val = $("#board").val();
        for (var y = 0; y < val; y++) {
            for (var g = 0; g < val; g++) {

                cell = $("#" + y + '-' + g);
                if ($(cell).css('background-color') != "rgb(102, 0, 51)") {
                    //get 8 neighboors of inactive cells for all board
                    neigh1 = $("#" + y + '-' + (g + 1));
                    neighArr.push(neigh1);

                    neigh2 = $("#" + y + '-' + (g - 1));
                    neighArr.push(neigh2);

                    neigh3 = $("#" + (y - 1) + '-' + g);
                    neighArr.push(neigh3);
                    neigh4 = $("#" + (y + 1) + '-' + g);
                    neighArr.push(neigh4);

                    neigh5 = $("#" + (y - 1) + '-' + (g - 1));
                    neighArr.push(neigh5);

                    neigh6 = $("#" + (y - 1) + '-' + (g + 1));
                    neighArr.push(neigh6);

                    neigh7 = $("#" + (y + 1) + '-' + (g + 1));
                    neighArr.push(neigh7);

                    neigh8 = $("#" + (y + 1) + '-' + (g - 1));
                    neighArr.push(neigh8);

                    //check the count of the active neighboors for in active cell
                    for (var q = 0; q < neighArr.length; q++) {
                        if ($(neighArr[q]).css('background-color') == "rgb(102, 0, 51)") {
                            nCounter++;
                        }
                    }
                    if (nCounter == 3) {
                        resultA.push("#" + y + '-' + g);
                    }
                }
                neighArr = [];
                nCounter = 0;

            }
        }


        //change the cells will be inactive
        for (var p = 0; p < resultIn.length; p++) {
            $(resultIn[p]).css('background-color', '');
        }
        //change the cells will be active
        for (var b = 0; b < resultA.length; b++) {
            $(resultA[b]).css('background-color', 'rgb(102, 0, 51)');

        }

        // save the board status after the iteration
        itr = $("#grid-board").clone(true);
        itrCount++;
        iterations.push(itr);
        resultA = [];
        resultIn = [];
        cellArr = [];
        neighArr = [];

    }
    //get the value of board size      
    $("#board").on("change", function() {
        $("#grid-board").html("");
        var val = $(this).val();
        tableCreate(val);


    });

    //reset Button Function
    $("#reset").on("click", function() {
        var val = $("#board").val();
        $("#grid-board").html("");
        console.log(val);
        tableCreate(val);
        play = false;
        startElemet = [];
        cellArr = [];
        neighArr = [];
        activeCell = [];
        inactiveCell = [];
        resultIn = [];
        resultA = [];
        counter = 0;

    });


    //draw the default board
    tableCreate(20);
    // function to create table 
    function tableCreate(size) {
        var grid = $("#grid-board");
        var table = document.createElement('table');
        table.style.width = '1500px';
        table.align = "center";
        table.style.height = '900px';
        table.setAttribute('border', '1');
        // table.style.border="solid";

        var tbdy = document.createElement('tbody');
        for (var i = 0; i < size; i++) {
            var tr = document.createElement('tr');
            for (var j = 0; j < size; j++) {

                var td = document.createElement('td');
                cell = document.createElement("div");
                $(cell).attr("id", (i + "-" + j));
                $(cell).attr("class", "cella");
                cell.style.height = "100%";
                cell.style.width = "100%";
                td.appendChild(cell);
                tr.appendChild(td)

            }
            tbdy.appendChild(tr);
        }
        table.appendChild(tbdy);

        grid.append(table)

        //select function to change the color of div
        $(function() {
            $('.cella').on("click", function() {
                //flag to check if the play started disable div select
                if (play == false) {

                    if ($(this).css('background-color') == 'rgb(102, 0, 51)') {
                        $(this).css('background-color', '');
                    } else {
                        $(this).css('background-color', 'rgb(102, 0, 51)');
                    }

                }
            });
        });
    }

});