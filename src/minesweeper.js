var dir = "";
var mines = [];
var shown = [];
var gridx = 8;
var gridy = 8;
var maxmines = 10;
// Measurements for different elements of the
// Minesweeper board.
var gridSq = gridx * 16;
var grid8 = gridSq - 128;
var grid16 = gridx - 8;
var grid32 = grid16 * 8;
var grid64 = grid16 * 16;
var topBarWidth = 8 + grid64;
var menuBarWidth = 86 + grid64;
var wideWidth = gridx * 16;
var highHeight = gridy * 16;
var cplLeft = 6 + grid32;
var cplRight = 4 + grid32;
var totalWidth = gridSq + 32;
var tW6 = totalWidth - 6;
var ww2 = wideWidth + 2;

// Assigning names to number images
var num = new Array(10);

for (var i = 0; i < 10; i++) {
    num[i] = new Image();
    num[i].src = i + ".gif"
}

function newgame() {
    // reset state arrays. mines holds the position of each mine. shown keeps
    // track of the image shown at each grid location
    var y;
    for (y = 0; y < gridy; ++y) {
        mines[y] = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
        shown[y] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    // Place the mines, making sure positions are unique
    var m;
    for (m = 0; m < maxmines; ++m) {
        var x, yy;
        do {
            x = Math.floor(Math.random() * gridx);
            yy = Math.floor(Math.random() * gridy);
        } while (mines[yy][x]);
        mines[yy][x] = true;
    }

    // initialize game variables
    squaresleft = gridy * gridx;
    flagsleft = maxmines;
    elapsedtime = 0;
    playing = true;
    clicked = false;
    placeflag = false;

    // insert the grid into the document
    buildgrid();

    // start the clock
    setInterval("ticker()", 1000);
}

// clock tick handler
function ticker() {
    if (playing) {
        if (clicked) {
            elapsedtime++;
            setStatus();
        }
    }
}

// Refreshing control panel
function setStatus() {
    document.images.elapse3.src = num[elapsedtime - (Math.floor(elapsedtime / 10)) * 10].src;
    document.images.elapse2.src = num[Math.floor((elapsedtime - (Math.floor(elapsedtime / 100)) * 100) / 10)].src;
    document.images.elapse1.src = num[Math.floor(elapsedtime / 100)].src;
    document.images.flag3.src = num[flagsleft - (Math.floor(flagsleft / 10)) * 10].src;
    document.images.flag2.src = num[Math.floor((flagsleft - (Math.floor(flagsleft / 100)) * 100) / 10)].src;
    document.images.flag1.src = num[Math.floor(flagsleft / 100)].src;

}

// *******************************************************************************
// This is the function to build the game's grid.
// *******************************************************************************
function buildgrid() {
    document.write("<!-- Window --><DIV align=center id='mswp-container'> "
        + "<!-- Top Bar --> <table width="
        + totalWidth
        + " border=0 cells"
        + "pacing=0 cellpadding=0> <tr bgcolor=#bbbbbb heigh"
        + "t=1> <td width=1 bgcolor=#bbbbbb></td><td width"
        + "=1 bgcolor=#bbbbbb></td> <td width=1 bgcolor=#bbb"
        + "bbb></td><td width="
        + tW6
        + " bgcolor=#bbbbbb></td> <t"
        + "d width=1 bgcolor=#bbbbbb></td> <td width=1 bgcol"
        + "or=#bbbbbb></td> <td width=1 bgcolor=#000000></td"
        + "></tr><tr height=1><td width=1 bgcolor=#bbbb"
        + "bb></td><td width=1 bgcolor=#ffffff></td><td w"
        + "idth=1 bgcolor=#ffffff></td><td bgcolor=#ffffff>"
        + "</td><td width=1 bgcolor=#ffffff></td><td widt"
        + "h=1 bgcolor=#888888></td><td width=1 bgcolor=#00"
        + "0000></td></tr><tr height=1><td width=1 bgco"
        + "lor=#bbbbbb></td><td width=1 bgcolor=#ffffff></t"
        + "d><td width=1 bgcolor=#bbbbbb></td><td bgcolor"
        + "=#bbbbbb></td><td width=1 bgcolor=#bbbbbb></td> "
        + "<td width=1 bgcolor=#888888></td><td width=1 bg"
        + "color=#000000></td></tr></table><!-- Title -->"
        + "<table border=0 cellspacing=0 cellpadding=0><t"
        + "r height=18><td width=1 bgcolor=#bbbbbb></td><"
        + "td width=1 bgcolor=#ffffff></td><td width=1 bgco"
        + "lor=#bbbbbb></td><td bgcolor=#000088 width=134><img src='t"
        + "itle.gif'><img src='a.gif' height=1 width="
        + topBarWidth
        + " name="
        + "'titleBarEmptySpace'></td><td><img id='minesweeper-close-btn' src='close."
        + "gif'></td><td width=1 bgcolor=#bbbbbb></td><td"
        + " width=1 bgcolor=#888888></td><td width=1 bgcolo"
        + "r=#000000></td></tr></table><table width="
        + totalWidth
        + " border=0 cellspacing=0 cellpadd"
        + "ing=0> <tr height=33> <td width=1 bgcolor=#bbbbb"
        + "b></td> <td width=1 bgcolor=#ffffff></td> <td wi"
        + "dth=1 bgcolor=#bbbbbb></td> <td><img src='cplleft"
        + ".gif' height=33 width=11></td> <td> <!-- Control"
        + " Panel --> <table width="
        + ww2
        + " border=0 cellspacing="
        + "0 cellpadding=0><tr height=4 width="
        + ww2
        + "><td bgcolor=#bbbbbb"
        + "></td></tr></table> <table width="
        + ww2
        + " border=0 cel"
        + "lspacing=0 cellpadding=0><tr height=26><td "
        + "width=5 bgcolor=#bbbbbb></td><td><!-- Mines Remai"
        + "ning --> <table width=41 border=0 cellspacing=0 c"
        + "ellpadding=0><tr bgcolor=#888888><td></td><td>"
        + "</td><td></td> <td></td><td></td><td></td> <td><"
        + "/td><td></td> <td width=1 bgcolor=#bbbbbb></td></"
        + "tr> <tr bgcolor=#000000> <td width=1 bgcolor=#88"
        + "8888></td> <td></td><td></td> <td></td><td></td>"
        + "<td></td><td></td><td></td> <td width=1 bgcolor"
        + "=#ffffff></td></tr> <tr bgcolor=#000000> <td wid"
        + "th=1 bgcolor=#888888></td> <td width=1 bgcolor=#0"
        + "00000></td> <td><img src='0.gif' name='flag1'></t"
        + "d><td width=2></td><td><img src='1.gif' name='"
        + "flag2'></td><td width=2></td><td><img src='0.g"
        + "if' name='flag3'></td><td width=1></td> <td wid"
        + "th=1 bgcolor=#ffffff></td></tr> <tr bgcolor=#0000"
        + "00> <td width=1 bgcolor=#888888></td> <td></td><"
        + "td></td> <td></td><td></td><td></td> <td></td><t"
        + "d></td> <td width=1 bgcolor=#ffffff></td></tr> <"
        + "tr bgcolor=#ffffff> <td width=1 bgcolor=#bbbbbb><"
        + "/td> <td></td><td></td> <td></td><td></td><td></"
        + "td> <td></td><td></td> <td></td></tr><"
        + "tr bgcolor=#bbbbbb> <td width=1 bgcolor=#bbbbbb><"
        + "/td> <td></td><td></td> <td></td><td></td><td></"
        + "td> <td></td><td></td> <td></td></tr></table><!--"
        + " End Mines Remaini"
        + "ng --> </td> <td bgcolor=#bbbbbb><img height=1 "
        + "src='a.gif' width=" + cplLeft + "name='cplLeft'>"
        + "<td><img src='btnsmile.gif' name='condition' onmo"
        + "usedown='document.images.condition.s"
        + 'rc="btnsmil2.gif"'
        + ";' onmouseu"
        + "p='document.images.condition.s"
        + 'rc="btnsmile.gif";location.reload();'
        + ";'></td> <td width=4 bgcolor=#bbbbbb>"
        + "<img height=1 src='a.gif'"
        + " width=" + cplRight + ">"
        + "</td> <td> <!-- Elapsed Time --> <table width=4"
        + "1 border=0 cellspacing=0 cellpadding=0> <tr bgcol"
        + "or=#888888> <td></td><td></td><td></td> <td></td"
        + "><td></td><td></td><td></td><td></td> <td width"
        + "=1 bgcolor=#bbbbbb></td></tr> <tr bgcolor=#000000"
        + "> <td width=1 bgcolor=#888888></td> <td></td><td"
        + "></td> <td></td><td></td><td></td> <td></td><td>"
        + "</td> <td width=1 bgcolor=#ffffff></td></tr> <tr"
        + " bgcolor=#000000> <td width=1 bgcolor=#888888></t"
        + "d> <td width=1 bgcolor=#000000></td> <td><img sr"
        + "c='0.gif' name='elapse1'></td> <td width=2></td> "
        + "<td><img src='0.gif' name='elapse2'></td> <td wi"
        + "dth=2></td> <td><img src='0.gif' name='elapse3'><"
        + "/td> <td width=1></td> <td width=1 bgcolor=#ffff"
        + "ff></td></tr> <tr bgcolor=#000000> <td width=1 b"
        + "gcolor=#888888></td> <td></td><td></td> <td></td"
        + "><td></td><td></td> <td></td><td></td> <td width"
        + "=1 bgcolor=#ffffff></td></tr> <tr bgcolor=#ffffff"
        + "> <td width=1 bgcolor=#bbbbbb></td> <td></td><td"
        + "></td> <td></td><td></td><td></td> <td></td><td>"
        + "</td> <td></td></tr> <"
        + "tr bgcolor=#bbbbbb> <td width=1 bgcolor=#bbbbbb><"
        + "/td> <td></td><td></td> <td></td><td></td><td></"
        + "td> <td></td><td></td> <td></td></tr> "
        + "</table> <!-- End Elapsed Time --> </td> <td "
        + "width=7 bgcolor=#bbbbbb></td></tr></table><table "
        + "width="
        + ww2
        + " border=0 cellspacing=0 cellpadding=0> "
        + "<tr height=3><td bgcolor=#bbbbbb></td></tr></table"
        + "> <!-- End Control Panel --> </td> <td><img src"
        + "='cplright.gif' height=33 width=11></td> <td><img"
        + " src='right.gif' height=33 width=5></td> </tr></t"
        + "able><!-- Separator --> <table border=0 cells"
        + "pacing=0 cellpadding=0> <tr height=11 width="
        + totalWidth
        + "> "
        + "<td width=1 bgcolor=#bbbbbb></td> <td width=1 bg"
        + "color=#ffffff></td> <td width=1 bgcolor=#bbbbbb><"
        + "/td> <td><img src='ml.gif'></td><td><img src='"
        + "separatr.gif' width="
        + wideWidth
        + " height=11></td><td><img"
        + " src='mr.gif'></td><td><img src='right.gif' width"
        + "=5></td></tr></table> <!-- Mine Field --> <table"
        + " width="
        + totalWidth
        + " border=0 cellspacing=0 cellpadding=0> "
        + "<tr height="
        + highHeight
        + "> <td width=1 bgcolor=#bbbbbb></td>"
        + " <td width=1 bgcolor=#ffffff></td> <td width=1 b"
        + "gcolor=#bbbbbb></td> <td><img src='fielside.gif' "
        + "width=12 height="
        + highHeight
        + "></td> <td> <!-- Game Field -"
        + "->");
    var s = "";
    var x, y;
    for (y = 0; y < gridy; ++y) {
        for (x = 0; x < gridx; ++x) {
            s = s + '<a href="javascript:gridclick(' + y + ',' + x + ');">' +
                '<img src="' + dir + 'sqt0.gif" name="grd' + y + '_' + x + '" border=0></a>'
        }
        s = s + "<br>";
    }
    document.write(s);
    document.write('</td><td'
        + ' valign=right><img src="fielside.gif" width=12 heig'
        + 'ht='
        + highHeight
        + '></td><td valign=right><img src="right.gif'
        + '" width=5 height='
        + highHeight
        + '></td></tr></table><table width='
        + totalWidth
        + ' border=0 cellspacing=0 cellpadding=0><tr heigh'
        + 't=12> <td width=1 bgcolor=#bbbbbb></td> <td widt'
        + 'h=1 bgcolor=#ffffff></td><td width=1 bgcolor=#bb'
        + 'bbbb></td> <td><img src="bl.gif"></td><td><img '
        + 'src="footer.gif" width='
        + wideWidth
        + ' height=12></td><td><i'
        + 'mg src="br.gif"></td> <td><img src="right.gif" he'
        + 'ight=12></td></tr></table><table width='
        + totalWidth
        + ' border=0 cellspacing=0 cellpadding=0'
        + '><tr bgcolor=#bbbbbb height=1><td width=1 bgco'
        + 'lor=#bbbbbb></td><td width=1 bgcolor=#ffffff></t'
        + 'd><td width=1 bgcolor=#bbbbbb></td><td width='
        + tW6
        + ' bgcolor=#bbbbbb></td><td width=1 bgcolor=#bbb'
        + 'bbb></td><td width=1 bgcolor=#888888></td><td '
        + 'width=1 bgcolor=#000000></td></tr><tr height=1'
        + '><td width=1 bgcolor=#bbbbbb></td><td width=1 '
        + 'bgcolor=#888888></td><td width=1 bgcolor=#888888'
        + '></td><td bgcolor=#888888></td> <td width=1 bgc'
        + 'olor=#888888></td><td width=1 bgcolor=#888888></'
        + 'td> <td width=1 bgcolor=#000000></td> </tr> <tr'
        + ' height=1><td width=1 bgcolor=#000000></td> <td'
        + ' width=1 bgcolor=#000000></td> <td width=1 bgcolo'
        + 'r=#000000></td><td bgcolor=#000000></td> <td wi'
        + 'dth=1 bgcolor=#000000></td> <td width=1 bgcolor=#'
        + '000000></td><td width=1 bgcolor=#000000></td> <'
        + '/tr></table></div>');
}


// *******************************************************************************
// These are functions that run during the game.
// *******************************************************************************
// Function to calculate the number of mines adjacent to a grid location
function surrounding(y, x) {
    var count = 0;
    if (y > 0 && x > 0 && mines[y - 1][x - 1]) count++;
    if (y > 0 && mines[y - 1][x]) count++;
    if (y > 0 && x < gridx - 1 && mines[y - 1][x + 1]) count++;
    if (x > 0 && mines[y][x - 1]) count++;
    if (x < gridx - 1 && mines[y][x + 1]) count++;
    if (y < gridy - 1 && x > 0 && mines[y + 1][x - 1]) count++;
    if (y < gridy - 1 && mines[y + 1][x]) count++;
    if (y < gridy - 1 && x < gridx - 1 && mines[y + 1][x + 1]) count++;
    return count;
}

// Recursive function to 'roll back' the grid when user clicks on a tile
// with no surrounding mines
function rollback(y, x) {
    if (y >= 0 && y < gridy && x >= 0 && x < gridx) {
        if (shown[y][x] != 3) {
            var c = surrounding(y, x);
            shown[y][x] = 3;
            squaresleft--;
            document.images["grd" + y + "_" + x].src = dir + "sq" + c + ".gif";
            if (c == 0) {
                rollback(y - 1, x - 1);
                rollback(y - 1, x);
                rollback(y - 1, x + 1);
                rollback(y, x - 1);
                rollback(y, x + 1);
                rollback(y + 1, x - 1);
                rollback(y + 1, x);
                rollback(y + 1, x + 1);
            }
        }
    }
}

// Function called when player steps on a mine. All mine locations are uncovered
function dead() {
    var y, x;
    for (y = 0; y < gridy; ++y) {
        for (x = 0; x < gridx; ++x) {
            if (mines[y][x]) {
                if (shown[y][x] != 1) {
                    document.images["grd" + y + "_" + x].src = dir + "mine.gif";
                }
            }
            else if (shown[y][x] == 1) {
                document.images["grd" + y + "_" + x].src = dir + "nomine.gif";
            }
        }
    }
    document.images.condition.src = dir + "btndead.gif";
    playing = false;
    clicked = false;
}

// handler called whenever the grid is clicked
function gridclick(y, x) {
    if (playing) {
        clicked = true;
        if (placeflag) {
            if (shown[y][x] < 3) {
                var s = shown[y][x];
                var change = true;
                if (s == 1) {
                    flagsleft++;
                    squaresleft++;
                }
                if (flagsleft == 0 && s == 0) {
                    change = false;
                }
                else {
                    if (s == 2) s = 0;
                    else s++;
                    if (s == 1) {
                        flagsleft--;
                        squaresleft--;
                    }
                }
                if (change) {
                    shown[y][x] = s;
                    document.images["grd" + y + "_" + x].src = dir + "sqt" + s + ".gif";
                    setStatus();
                }
                if (squaresleft == 0) {
                    document.images.condition.src = dir + "btncool.gif";
                    playing = false;
                }
            }
        }

        // check not flagged as a mine
        else if (shown[y][x] != 1) {
            if (mines[y][x]) {
                document.images["grd" + y + "_" + x].src = dir + "minered.gif";
                dead();
            }
            else {
                rollback(y, x);
            }
        }
    }
}

// Start the game
newgame();

//event handler
$("#minesweeper-close-btn").on('click', function() {
    parent.postMessage("minesweeperClose",'http://schnogz.com');
});