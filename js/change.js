var prev_image = 0;
var oldv = 1;
var myWin;
var jst;
var cur = -1;
var prev = -1;
var prev1 = -1;
var prev2 = -1;
var sel_item = false;
var prevfind = "";
var gr;
var pgr;
var isinrec;
var isopen = 0;
var modify = 180;
var aaa = 0;
var isfind = false;
var findup = true;
var razn;
var selarr = new Array(40);
var prevselarr = new Array(40);
var dettorec = new Array(100);
var detsort = new Array(100);
var curimg = -1;
var curpos = 0;
var v = 1;
var showcls = 0;
var showcls2 = 0;
var showcls3 = 0;
var tablelenth = 0;
var countinrec = 0;
var previd = "";
var findsize = 100;

//Переменные для поиска
var curfind = -1;
var find_direction = 1;
var order_funcgroups = [];
var order_composition = [];
var order_classify = [];

function online() { }
function changetypef(f) {
    //findtype = f;
    find_direction = f;
}
function isgetdetal(j) {
    for (var i = 0; i < allSubgrGrData[j].length; i++) {
        if (allSubgrGrData[j][i][2] != '-1')
            return true;
    }
    return false;
}
function sSort(i, ii) {
    // По картинке (возрастание)
    if (i[0] > ii[0])
        return 1;
    else if (i[0] <= ii[0]) {
        if (i[2] > ii[2])
            return 1;
        else if (i[2] < ii[2])
            return -1;
        else
            return 0;
    }
}
function settables(i) {
    var table = document.getElementById('tablID');
    var trList = table.getElementsByTagName('tr');
    var tdListName = trList[0].getElementsByTagName('td');
    var s = "";
    var group = document.getElementById('group');
    var kk = allSubgrGrData[i][0][1] - 1;
    group.innerHTML = "<div class=\"hh2\">" + trans[0] + " / " + trans[1] + ":</div>" + "<div class=\"hh3\">" + data[kk][tablelenth - 1] + " / " + data[kk][tablelenth] + "</div>";
    s = s + '<td class=\"hk\">' + tdListName[0].innerHTML + '</td>';
    for (var j = 1; j < tablelenth; j++)
        s = s + '<td class=\"h\">' + tdListName[j].innerHTML + '</td>';
    s = '<tr>' + s + '</tr>';
    var dataarr = [];
    for (var j = 1; j < allSubgrGrData[i].length; j++) {
        dataarr[j - 1] = allSubgrGrData[i][j];
    }
    dataarr.sort(sSort);
    for (var j = 0; j < dataarr.length; j++) {
        dettorec[j] = kk;
        detsort[j] = dataarr[j][1] - 1;
        kk++;
        s = s + '<tr>';
        for (var m = 0; m < tablelenth; m++) {
            //if (dataarr[j][2]!=-1)
            var r = '';
            if (m < tablelenth - 2) {
                //if (dataarr[j][m]!= '')
                r = data[dataarr[j][1] - 1][m];
            } else {
                if (m == tablelenth - 2) {
                    r = "<div style='width:80px'><input type=\"text\" onkeypress=\"return isNumberlnput(this, event);\" style=\"width:40px; border: 1px solid #a6abaf; margin-top: 4px; margin-bottom: 2px; height: 20px;\" value='0' name=\"countIn\" id=\"count" + (dataarr[j][1] - 1) + "\">";
                }
                if (m == tablelenth - 1)
                    r = "<div id='t" + (dataarr[j][1] - 1) + "'>" + data[dataarr[j][1] - 1][isinrec - 1] + "</div>";
            }
            s = s + '<td>' + r + '</td>';
        }
        s = s + '</tr>';
    }
    dettorec[dataarr.length] = -1;
    s = '<table id=\"tabl\" class=\"tdb\" style=\"width:99%;height:99%;position:relative;left:5px;\">' + s + '</table>';
    table.innerHTML = s;
    doResizeCode();
}
function numbimg(i) {
    var k = 0;
    while (k < imgarray.length) {
        var str = imgarray[k][1];
        var j = 0;
        var cmp = '';
        while (str.charAt(j) != '.') {
            cmp = cmp + str.charAt(j);
            j++;
        }
        if (cmp == i)
            return k;
        k++;
    }
    return -1;
}
function endedit(ii, j) {
    var dd = document.getElementById('countrec' + ii);
    var c = dd.value;
    dd = document.getElementById('t' + ii);
    if (dd != null)
        dd.innerHTML = c;
    data[ii][j] = c;
}
function openRecucle(ii) {
    var dd = document.getElementById("recucle");
    var s = "";
    if (ii == 0) {
        s = s + "<div id='recle' class='fgr'>";
        s = s + "<img name='l1' id='up' src='./img/plusbig.gif' class='up' onClick='openRecucle(1);'>";
        s = s + "<div class='recucle' onClick='openRecucle(1);'>" + trans[14] + "</div>";
        s = s + "<div class=\"submit\" id='online'  onClick=\"online();\">" + trans[2] + "</div>";
        //s = s +"<div class=\"submit\" id='exel'  onClick=\"newXLS();\">"+ trans[3] +"</div>";    
        modify = 180;
        isopen = 0;
    } else {
        s = s + "<div id='recle' class='fgr'>";
        s = s + "<img name='l1' id='dawn' src='./img/minusbig.gif' class='up' onClick='openRecucle(0);'>";
        s = s + "<div class='recucle' onClick='openRecucle(0);'>" + trans[14] + "</div>";
        s = s + "<div class=\"submit\" id='online'  onClick=\"online();\">" + trans[2] + "</div>";
        //s = s +"<div class=\"submit\" id='exel' onClick=\"newXLS();\">"+ trans[3] +"</div>";
        s = s + "<div class='rectable'><table style=\"width:99%;position:relative;left:5px;top:10px;\">";
        var table = document.getElementById('tablID');
        var trList = table.getElementsByTagName('tr');
        var tdList = trList[0].getElementsByTagName('td');
        s = s + "<td class='h'>" + trans[4] + "</td>";
        s = s + "<td class='h'>" + trans[5] + "</td>";
        s = s + "<td class='h'>" + trans[6] + "</td>";
        s = s + "</tr>";
        var countDet = 0;
        countinrec = 0;
        while (countDet < colbolts - 1) {
            if (data[countDet][isinrec - 2] == '1') {
                countinrec++;
                s = s + "<tr >";
                var ss = "";
                for (j = 2; j < tdList.length - 2; j++) {
                    if (j != tdList.length - 3)
                        if (data[countDet][j] != "")
                            ss = ss + data[countDet][j] + ",  ";
                        else
                            ss = ss + data[countDet][j];
                }
                s = s + "<td style='font: 11px Tahoma; color: #000000; border: 1px solid #cacaca; height: 22px; padding-left: 6px;'>" + ss + "</td>"
                //  s=s+"<td style='font: 11px Tahoma;color: #000000; border: 1px solid #cacaca; height: 22px; padding-left: 6px;'>" + data[countDet][isinrec-1] + "</td>";
                s = s + "<td style='font: 11px Tahoma;color: #000000; border: 1px solid #cacaca; height: 22px; padding-left: 6px;'> <div style='width:80px'><input type=\"text\" onkeypress=\"return isNumberlnput(this, event);\" onblur=\"endedit(" + countDet + "," + (isinrec - 1) + ")\" style=\"width:40px; border: 1px solid #a6abaf; margin-top: 4px; margin-bottom: 2px; height: 20px;\" value='" + data[countDet][isinrec - 1] + "' name=\"countInRec\" id='countrec" + countDet + "'></td>";
                s = s + "<td style='font: 11px Tahoma;color: #000000; border: 1px solid #cacaca; height: 22px; padding-left: 6px;'><img src=\"./img/recucledel.gif\" onclick=\"setunCheck(" + countDet + ")\"> </td>";
                s = s + "</tr>";
            }
            countDet++;
        }
        s = s + "</table></div>";
        isopen = 1;
        modify = 300;
    }
    dd.innerHTML = s;
    doResizeCode();
}
function setup(ul) {
    // var imageDiv = document.getElementById("mainImage");
    document.show.src = "./img/back_img.jpg";
    document.show.style.width = '600px';
    //document.show.style.position='absolute';
    //document.show.style.left='200px';
    //document.show.style.top='50px';
    var t = 0;
    while (t < selarr.length) {
        prevselarr[t] = -1;
        selarr[t] = -1;
        t++;
    }
    var gr = document.getElementById("group");
    var t = document.getElementById("tablID");
    var ulsc = document.getElementById("ulclassify");
    var h1 = gr.offsetHeight;
    var h2 = t.offsetHeight;
    ulsc.style.height = h1 + h2 + "px";
    var ff = document.getElementById("space");
    var ffs = "";
    for (var i = 0; i < 10; i++) {
        ffs = ffs + "<div class='empty_div' id='div0" + i + "'></div><div class='empty_div' id='div1" + i + "'></div><div class='empty_div' id='div2" + i + "'></div><div class='empty_div' id='div3" + i + "'></div><div class='empty_div'  id='div4" + i + "'></div>";
    }
    ff.innerHTML = ffs;
    {
        // Кнопка "Корзина"
        var recucle_str = "";
        var recucle_elem = document.getElementById("recucle");
        recucle_str = recucle_str + "<div id='recle' class='fgr'>";
        recucle_str = recucle_str + "<img name='l1' id='up' src='./img/plusbig.gif' class='up' onClick='openRecucle(1);'>";
        //recucle_str =recucle_str+ "<img name='l2' id='dawn' src='./img/dawn.gif' class='dawn' onClick='openRecucle(0);'>"; 
        recucle_str = recucle_str + "<div class='recucle' onClick='openRecucle(1);'>" + trans[14] + "</div>";
        recucle_str = recucle_str + "<div class=\"submit\" id='online' onClick=\"online();\">" + trans[2] + "</div>";
        //recucle_str = recucle_str +"<div class=\"submit\" id='exel' onClick=\"newXLS();\">"+ trans[3] +"</div>";  
        recucle_elem.innerHTML = recucle_str;
    }
    isinrec = data[0].length + 1;
    var table = document.getElementById('tablID');
    var trList = table.getElementsByTagName('tr');
    var tdListName = trList[0].getElementsByTagName('td');
    tablelenth = tdListName.length;
    /* for (j = 0; j < tablelenth - 2; j++) {
        var ss = '';

   

        if (tdListName[j].innerText== trans[0])
             gr=j;
   
        if (tdListName[j].innerText == trans[1])
	    pgr=j;

     }  */
    var os = navigator.userAgent;
    var osArr = ["Windows NT 5.1", "Windows NT 5.2", "Windows NT 6.1", "Windows NT 6.0"];
    var isNormalOs = false;
    for (var i = 0; i < osArr.length; i++) {
        if (os.indexOf(osArr[i]) >= 0)
            isNormalOs = true;
    }
    hasIE = /*@cc_on (@_jscript_version+"").replace(/\d\./, ''); @*/
    false;
    hasOpera = !!window.opera && window.opera.version && window.opera.version();
    hasChrome = !!window.chrome && (/chrome\/([\d\.]+)/i.exec(navigator.userAgent)[1] || true);
    hasFireFox = !!window.sidebar && (/firefox\/([\d\.]+)/i.exec(navigator.userAgent)[1] || true);
    hasSafari = !window.external && !hasOpera && (/safari\/([\d\.]+)/i.exec(navigator.userAgent)[1] || true);
    if (hasOpera != false || hasFireFox != false || hasSafari != false)
        alert("Корректная работа HTML-каталога обеспечиватся только для броузеров Google Chrome и Microsoft Explorer(версии 9.0 и выше). Для вашего типа броузера часть функций либо весь HTML-каталог могут неработоспособны!");
    if (isNormalOs != true) {
        var osver = os.substr(indexOf("Windows"), 14);
        alert("Вы используете " + osver + " и Internet Explorer" + os.substr(os.indexOf("MSIE") + 5, 3) + " Для работы с каталогом необходима операционная система Windows XP и выше, Internet Explorer 9.0 и выше");
        close();
    }
    var uaVers;
    if (os.indexOf("MSIE") >= 0) {
        uaVers = os.substr(os.indexOf("MSIE") + 5, 3);
        if (uaVers.charAt(0) < '9' && uaVers.charAt(1) == '.') {
            alert('Вы используете устаревшую версию Internet Explorer, необходима версия 9.0 и выше');
            close();
        }
        ;
    }
    //Строим дерево классификаторов
    class_tree();
    //Корректируем данные, если вдруг родителя какой-то группы нет среди выгруженных
    for (var i = 0; i < grNames.length; i++) {
        var clear_parent = true;
        for (var j = 0; j < grNames.length; j++)
            if (grNames[i][3] == grNames[j][2]) {
                clear_parent = false;
                break;
            }
        if (clear_parent == true)
            grNames[i][3] = 0;
    }
    var buff = [];
    //Массив строк, содержащих HTML-код дерева функциональных групп
    funk_group(0, buff);
    ul.innerHTML = "<br>" + '' + buff.join('');
    buff = [];
    for (var i = 0; i < data.length ; i++)
    {
        var index = -1;
        for (var j = 0; j < data.length ; j++)
        {
            if(data[i][12]==data[j][11])
            {
                index = j;
                break;
            }
        }
        
        data[i][12] = index;
    }

    tree_composition(-1, buff);
    
    var ulcomp_field = document.getElementById("ulcomp");
    if (ulcomp_field.innerHTML == "undefined")
        ulcomp_field.innerHTML = "";
    ulcomp_field.innerHTML = "<br>" + '' + buff.join('');
    setmap(-1);

    showcomposition();
    showclassify();
    showclass();

    doResizeCode()
}
var d = 0;
var jj = 0;
var previmg = -1;
var prevpos = -1;
//Формирует элементы, входящие в группу
function funk_group(par_gr, buff) {
    for (var i = 0; i < grNames.length; i++) {
        if (grNames[i][3] != par_gr)
            continue;//Выполняется только для групп, для которых par_gr является родителем
        var group_content = '';
        // Строка, формирующая подгруппы и элементы подгрупп для данной группы.
        // !!! note_001_mal !!! 'group_content' формируется без закрывающего тега </div>,
        // поэтому после завершения формирования строк с дочерними группами в buff необходимо добавить этот самый тег
        group_content += "<img id='img" + i + "' src='./img/plus.gif' onClick='javascript:changeDisplay(" + i + ");' style='cursor:pointer'><div class='cur2' id='li" + i + "' onClick='javascript:changeDisplay(" + i + ");'  ><font size=\"2\" color=\"navy\">" + grNames[i][1] + ". " + grNames[i][0] + "</font></div>";
        group_content += "<div  id='ul" + i + "' style='display:none; margin-left:10px; padding-bottom: 6px'>";
        //Формируем подгруппы, входящие в группы
        for (var j = 0; j < allSubgrGrNames[i].length; j++) {
            var nn = 0;
            if (allSubgrGrData[jj][0][2] == '-1')
                allSubgrGrData[jj][0][0] = numbimg(data[allSubgrGrData[jj][0][1] - 1][0]);
            allSubgrGrNames[i][j][1] = '';
            group_content += "<img id='img" + i + "," + j + "' src='./img/plus.gif' style='cursor:pointer' onClick='javascript:changeDisplay(\"" + i + "," + j + "\");'><div class='cur' id='li" + i + "," + j + "' onClick='javascript:changeDisplay(\"" + i + "," + j + "\");change_image_index(" + allSubgrGrData[jj][0][0] + ");boxVisible(-1,-1,false,true);settables(" + jj + ");' >" + allSubgrGrNames[i][j][1] + " " + allSubgrGrNames[i][j][0] + "</div>";
            group_content += "<div id='ul" + i + "," + j + "'style='display:none;margin-left:17px;cursor:pointer;padding-bottom: 4px'>";
            //Формируем элементы, входящие в группы
            for (var k = 0; k < allSubgrGrData[jj].length; k++) {
                var img_pos = -1;
                //Позиция изображения для данного элемента
                for (var m = 0; m < grIllustration.length; m++)
                    if (grIllustration[m][0] == allSubgrGrData[jj][k][1]) {
                        img_pos = m;
                        break;
                    }
                //Какая-то магия
                //Начало магии
                if (allSubgrGrData[jj][k][0] != 0)
                    razn = data[allSubgrGrData[jj][k][1] - 1][0] - allSubgrGrData[jj][k][0];
                if (allSubgrGrData[jj][k][2] == '-1')
                    allSubgrGrData[jj][k][0] = numbimg(data[allSubgrGrData[jj][k][1] - 1][0]);
                var ss = "";
                data[allSubgrGrData[jj][k][1] - 1][3] = allSubgrGrData[jj][k][3];
                if (allSubgrGrData[jj][k][5] != 0 && allSubgrGrData[jj][k][3] != data[allSubgrGrData[jj][k][1] - 1][2])
                    ss = " " + data[allSubgrGrData[jj][k][1] - 1][2];
                if (allSubgrGrData[jj][k][3] == data[allSubgrGrData[jj][k][1] - 1][2]) {
                    data[allSubgrGrData[jj][k][1] - 1][3] = data[allSubgrGrData[jj][k][1] - 1][2];
                    data[allSubgrGrData[jj][k][1] - 1][2] = '';
                }
                data[allSubgrGrData[jj][k][1] - 1][isinrec - 1] = 0;
                data[allSubgrGrData[jj][k][1] - 1][tablelenth - 1] = grNames[i][1] + " " + grNames[i][0];
                data[allSubgrGrData[jj][k][1] - 1][tablelenth] = allSubgrGrNames[i][j][1] + " " + allSubgrGrNames[i][j][0];
                //Конец магии
                if (img_pos == -1)
                    group_content = group_content + "<img src='./img/dot_tree.gif' style='margin-left:-11px;'><a onClick='javascript:change(" + allSubgrGrData[jj][k][1] + "," + allSubgrGrData[jj][k][2] + "," + allSubgrGrData[jj][k][0] + ");'><div class='bolt' style='margin-top:-14px;left:0px;cursor:pointer;text-indent:-2px;' id='" + allSubgrGrData[jj][k][1] + "' >&nbsp;" + allSubgrGrData[jj][k][3] + ss + "</div></a>";
                else
                    group_content = group_content + "<img src='./img/dot_tree.gif' style='margin-left:-11px;'><div style='height:14px'><a onClick='javascript:change(" + allSubgrGrData[jj][k][1] + "," + allSubgrGrData[jj][k][2] + "," + allSubgrGrData[jj][k][0] + ");'><div  class='bolt' id='" + allSubgrGrData[jj][k][1] + "' style='margin-top:-14px;left:0px;cursor:pointer;text-indent:-2px;width:200px'>&nbsp;" + allSubgrGrData[jj][k][3] + ss + "</div></a><img src='./img/foto.gif' style='position:relative;top:-14px;left:200px' onclick=\"return OpenImagePopup('" + grIllustration[img_pos][1] + "', 'Деталь', 'Закрыть','" + allSubgrGrData[jj][k][3] + " " + data[allSubgrGrData[jj][k][1] - 1][2] + "');\"></div>";
                var displaying_name = allSubgrGrData[jj][k][3] + ss;
                order_funcgroups.push([allSubgrGrData[jj][k][1] - 1, jj, k, displaying_name]);
                d++;
            }
            jj++;
            group_content += "</div>"
        }
        buff.push(group_content);
        //Формируем дочерние группы для данной
        funk_group(grNames[i][2], buff);
        buff.push("</div>");
        // См. note_001_mal
    }
}
function class_tree() {
    var v;
    var i = 0
      , j = 0
      , k = 0;
    s = "";
    ulc = document.getElementById("ulclassify");
    for (var n = 0; n < grClassify.length; n++) {
        var f = true;
        for (var l = 0; l < grClassify.length; l++) {
            if (n != l && grClassify[n][1] == grClassify[l][0]) {
                f = false;
                break;
            }
        }
        if (f)
            grClassify[n][1] = 0;
    }
    build_tree(0, 0);
    ulc.innerHTML = "<br>" + ss;
    var bol = 100000;
    var p = 0;
    var pp = 0;
    var mas = [];
    for (var n = 0; n < grClassify.length; n++) {
        v = document.getElementById("ul" + grClassify[n][0]);
        if (v.innerHTML == "undefined")
            v.innerHTML = "";
        for (var jj = 0; jj < allSubgrGrData.length; jj++)
            for (var k = 0; k < allSubgrGrData[jj].length; k++) {
                if (grClassify[n][0] == allSubgrGrData[jj][k][4]) //if (allSubgrGrData[jj][k][4]==bol)
                {
                    var s;
                    if (data[allSubgrGrData[jj][k][1] - 1][2] != "")
                        s = data[allSubgrGrData[jj][k][1] - 1][2];
                    if (data[allSubgrGrData[jj][k][1] - 1][2] == "")
                        s = allSubgrGrData[jj][k][3];
                    if (v && isnotElemIn(mas, s)) {
                        var m = p + 1000000;
                        var displaying_name = allSubgrGrData[jj][k][3] + " " + data[allSubgrGrData[jj][k][1] - 1][2];
                        v.innerHTML += "<img id='img" + m + "' src='./img/plus.gif' onClick='javascript:changeDisplay(" + m + ");'><div id='li" + m + "'  onClick='javascript:changeDisplay(" + m + ");' class='curclass' style='margin-top:-14px;margin-left:10px;font-weight:normal;cursor:pointer' >" + displaying_name + "</div>" + "<div id='ul" + m + "' style='display:none;margin-left:15px'>";
                        mas[p] = s;
                        //allSubgrGrData[jj][k][3];
                        p++;
                    }
                    break;
                }
            }
    }
    for (var n = 0; n < grClassify.length; n++) {
        var kk = 0;
        for (var jj = 0; jj < allSubgrGrData.length; jj++)
            for (var k = 0; k < allSubgrGrData[jj].length; k++) {
                if (grClassify[n][0] == allSubgrGrData[jj][k][4]) {
                    for (var d = 0; d < mas.length; d++) {
                        var s;
                        if (data[allSubgrGrData[jj][k][1] - 1][2] != "")
                            s = data[allSubgrGrData[jj][k][1] - 1][2];
                        if (data[allSubgrGrData[jj][k][1] - 1][2] == "")
                            s = allSubgrGrData[jj][k][3];
                        if (mas[d] == s) {
                            var m = d + 1000000;
                            v = document.getElementById("ul" + m);
                            if (v) {
                                if (data[kk][1] == "")
                                    allSubgrGrData[jj][k][0] = numbimg(data[kk][0]);
                                var tr_comp_id = allSubgrGrData[jj][k][1] + 2000000;
                                var displaying_name = allSubgrGrData[jj][k][3] + " " + data[allSubgrGrData[jj][k][1] - 1][2];
                                order_classify.push([allSubgrGrData[jj][k][1] - 1, jj, k, displaying_name]);
                                v.innerHTML += "<img src='./img/dot_tree.gif' style='margin-left:-11px;'><a style='cursor:pointer' onClick='javascript:change(" + allSubgrGrData[jj][k][1] + "," + allSubgrGrData[jj][k][2] + "," + allSubgrGrData[jj][k][0] + ");scrollIV(\"ul" + tr_comp_id + "\",\"ulcomp\");scrollIV(" + allSubgrGrData[jj][k][1] + ",\"uls\");'><div  style='margin-top:-14px;left:0px;cursor:pointer;text-indent:-2px;' class='bolt' id='b" + bol + "'>" + trans[12] + " " + data[kk][0] + ", " + trans[13] + " " + data[kk][1] + "</div></a>";
                                allSubgrGrData[jj][k][6] = allSubgrGrData[jj][k][4];
                                allSubgrGrData[jj][k][7] = m;
                                allSubgrGrData[jj][k][4] = bol;
                            }
                            bol++;
                        }
                    }
                    //break;
                }
                kk++;
            }
    }
}

var m_composition = 0;
function tree_composition(par_gr, buff) {
    var arr = [];
    for (var i = 0; i < allSubgrGrData.length; i++) {
        for (var j = 0; j < allSubgrGrData[i].length; j++) {
            var name = "";
            if (data[allSubgrGrData[i][j][1] - 1][2] != "")
                name = data[allSubgrGrData[i][j][1] - 1][2];
            else
                name = allSubgrGrData[i][j][3];
            if (par_gr == data[allSubgrGrData[i][j][1] - 1][12] && isnotElemIn(arr, name)) {
                m_composition = allSubgrGrData[i][j][1] + 2000000;
                var source = "";

                var displaying_name = allSubgrGrData[i][j][3] + " " + data[allSubgrGrData[i][j][1] - 1][2];
                source += "<img id='img" + m_composition + "' src='./img/plus.gif' onClick='javascript:changeDisplay(" + m_composition + ");'><div id='li" + m_composition + "'  onClick='javascript:changeDisplay(" + m_composition + ");' class='curclass' style='margin-top:-14px;margin-left:10px;font-weight:normal;cursor:pointer' >" + displaying_name + "</div>" + "<div id='ul" + m_composition + "' style='display:none;margin-left:15px'>";
                arr.push(name);
                for (var ii = 0; ii < allSubgrGrData.length; ii++)
                {
                    for (var jj = 0; jj < allSubgrGrData[ii].length; jj++)
                    {
                        var name_temp = "";

                        if (data[allSubgrGrData[ii][jj][1] - 1][2] != "")
                            name_temp = data[allSubgrGrData[ii][jj][1] - 1][2];
                        else
                            name_temp = allSubgrGrData[ii][jj][3];

                        if (name == name_temp)
                        {
                            var tc_ind = allSubgrGrData[ii][jj][1] + 2000000;
                            order_composition.push([allSubgrGrData[ii][jj][1] - 1, ii, jj, displaying_name]);
                            source += "<img src='./img/dot_tree.gif' style='margin-left:-11px;'><a style='cursor:pointer' onClick='javascript:change(" + allSubgrGrData[ii][jj][1] + "," + allSubgrGrData[ii][jj][2] + "," + allSubgrGrData[ii][jj][0]+");'><div  style='margin-top:-14px;left:0px;cursor:pointer;text-indent:-2px;' class='bolt' id='tc" + tc_ind + "'>" + trans[12] + " " + data[allSubgrGrData[ii][jj][1]-1][0] + ", " + trans[13] + " " + data[allSubgrGrData[ii][jj][1]-1][1] + "</div></a>";
//                            break;
                        }
                        
                    }
                }
                buff.push(source);
                //tree_composition(data[allSubgrGrData[i][j][1] - 1][11], buff);
                var pos = allSubgrGrData[i][j][1] - 1;
                tree_composition(pos, buff);
                buff.push("</div>");
            }
        }
    }
}
var ss = "";
function build_tree(codegr, codeupgr) {
    if (codegr != -1)
        for (var i = 0; i < grClassify.length; i++) {
            if (grClassify[i][1] == codegr) {
                if (grClassify[i][3] == 0)
                    ss += "<img id='img" + grClassify[i][0] + "' src='./img/plus.gif' onClick='javascript:changeDisplay(" + grClassify[i][0] + ");'><div id='li" + grClassify[i][0] + "' onClick='javascript:changeDisplay(" + grClassify[i][0] + ");' class='curclass' style='margin-top:-14px;margin-left:10px;cursor:pointer' >" + grClassify[i][2] + "</div>";
                else
                    ss += "<img id='img" + grClassify[i][0] + "' src='./img/plus.gif' onClick='javascript:changeDisplay(" + grClassify[i][0] + ")'><div id='li" + grClassify[i][0] + "' onClick='javascript:changeDisplay(" + grClassify[i][0] + ");setcolored(\"li" + grClassify[i][0] + "\",\"#abc3e7\");change_image_index(" + grClassify[i][3] + ");' class='curclass' style='margin-top:-14px;margin-left:10px;cursor:pointer' >" + grClassify[i][2] + "</div>";
                ss += "<div id='ul" + grClassify[i][0] + "' style='display:none;margin-left:10px'>";
                build_tree(grClassify[i][0], grClassify[i][1])
                ss += "</div>";
            }
        }
}
function isnotElemIn(mas, elem) {
    for (var i = 0; i < mas.length; i++) {
        if (mas[i] == elem)
            return false;
    }
    return true;
}
function setmap(indx) {
    if (indx != -1) {
        var ss = document.getElementById("maps");
        var f = "";
        f += "<map name='coordmap" + indx + "'>";
        var posar = [];
        var nn = 0;
        for (var ii = 0; ii < allSubgrGrData.length; ii++)
            for (var jj = 0; jj < allSubgrGrData[ii].length; jj++) {
                var i = allSubgrGrData[ii][jj][0];
                var j = allSubgrGrData[ii][jj][2];
                var c = allSubgrGrData[ii][jj][1];
                if (i == indx)
                    if (i != "-1" && j != -1) {
                        var t = coords[indx][j][0];
                        var kl = 0;
                        while (kl < coords[indx].length) {
                            if (coords[indx][kl][0] == t) {
                                var v = 5;
                                var note = "";
                                var b = coords[indx][kl].length;
                                if (b > 5)
                                    while (v < b) {
                                        if (coords[indx][kl][v] != '') {
                                            var no = coords[indx][kl][v];
                                            no = no.replace(new RegExp("</br>", 'g'), "\n");
                                            note = note + no + '\n';
                                        }
                                        v++;
                                    }
                                f = f + "<area alt='detal' title='" + setToolTip(c, note) + "' id= 'area" + indx + "_" + kl + "' shape='rect' coords='" + coords[indx][kl][1] + "," + coords[indx][kl][2] + "," + coords[indx][kl][3] + "," + coords[indx][kl][4] + "' href='javascript:change(" + c + "," + kl + "," + indx + ");javascript:boxVisible(" + indx + "," + kl + ",true,true);scrollIV(" + c + ",\"uls\")' onmouseover='javascript:boxVisible(" + indx + "," + kl + ",true,false);'   onmouseout='javascript:boxVisible(-1,-1,true,true);boxVisible(curimg,curpos,true,false);'>";
                                posar[nn] = t;
                                nn++;
                            }
                            kl++;
                        }
                    }
            }
        kl = 0;
        while (kl < coords[indx].length) {
            var r = true;
            nn = 0;
            while (nn < posar.length) {
                if (posar[nn] == coords[indx][0]) {
                    r = false;
                    break;
                }
                nn++;
            }
            var note = '';
            var v = 5;
            var b = coords[indx][kl].length;
            if (b > 5)
                while (v < b) {
                    var no = coords[indx][kl][v];
                    no = no.replace(new RegExp("</br>", 'g'), "\n");
                    note = note + no + '\n';
                    v++;
                }
            if (r)
                f = f + "<area alt='detal' title='" + note + "' id= 'area" + indx + "_" + kl + "' shape='rect' coords='" + coords[indx][kl][1] + "," + coords[indx][kl][2] + "," + coords[indx][kl][3] + "," + coords[indx][kl][4] + "' href='javascript:boxVisible(" + indx + "," + kl + ",true,true);' onmouseover='javascript:boxVisible(" + indx + "," + kl + ",true,false);'   onmouseout='javascript:boxVisible(-1,-1,true,true);boxVisible(curimg, curpos,true,false);'>";
            kl++;
        }
        f = f + "</map>";
        ss.innerHTML = f;
    }
}
function setToolTip(numbdetal, note) {
    //  if (data[numbdetal - 1][1] != '') {
    var table = document.getElementById('tablID');
    var trList = table.getElementsByTagName('tr');
    var tdListName = trList[0].getElementsByTagName('td');
    var s = "";
    var table = document.getElementById('tablID');
    var trList = table.getElementsByTagName('tr');
    var tdListName = trList[0].getElementsByTagName('td');
    var kp, kl, km, kk, kc;
    var a = numbdetal - findsize;
    if (a <= 1)
        a = 1;
    var aa = numbdetal + findsize;
    if (aa >= data.length)
        aa = data.length;
    for (j = 0; j < tablelenth - 1; j++) {
        if (tdListName[j].innerText == trans[7])
            kk = j;
        if (tdListName[j].innerText == trans[8])
            kc = j;
        if (tdListName[j].innerText == trans[9])
            kp = j;
        if (tdListName[j].innerText == trans[11])
            km = j;
    }
    for (var k = a; k <= aa; k++) {
        if (data[k - 1][0] == data[numbdetal - 1][0] && data[k - 1][1] == data[numbdetal - 1][1]) {
            s = s + trans[7] + ": " + data[k - 1][kk] + "\n";
            s = s + trans[8] + ": " + data[k - 1][kc] + "\n";
            s = s + trans[9] + ": " + data[k - 1][kp] + "\n";
            s = s + trans[10] + ": " + data[k - 1][kc + 1] + "\n";
            s = s + trans[11] + ": " + data[k - 1][km] + "\n";
            if (note != "")
                s = s + note;
            s = s + "-------------------------\n";
        }
        //else selarr[selindex] = -1;
    }
    s = s.replace(new RegExp("</br>", 'g'), "\n");
    return s;
}
function setCheck() {
    var dd = document.getElementById("recucle");
    var s = "";
    //if(i!=undefined)
    {
        var l = 0;
        var table = document.getElementById('tablID');
        var trList = table.getElementsByTagName('tr');
        var tdListName = trList[0].getElementsByTagName('td');
        var len = tdListName.length;
        var min = dettorec[0];
        var val = 0;
        while (dettorec[l] != -1) {
            var cc = document.getElementById("count" + detsort[l]);
            if (cc != null && cc.value != 0) {
                data[detsort[l]][isinrec - 2] = '1';
                data[detsort[l]][isinrec - 1] = cc.value;
                var a = 0;
                var v = document.getElementById("t" + detsort[l]);
                v.innerHTML = cc.value;
                if (cc.value == '')
                    data[detsort[l]][isinrec - 1] = 0;
                val = cc.value;
                cc.value = 0;
                var msg = "Добавлен в корзину";
                if (grCoher.length != 0)
                    for (var ii = 0; ii < grCoher.length; ii++) {
                        if (grCoher[ii][0] == dettorec[l]) {
                            //ss="Добавлен в корзину. В корзину помещены также следующие детали:" ;
                            for (var j = 1; j < grCoher[ii].length; j++) {
                                var n = grCoher[ii][j];
                                var v = document.getElementById("t" + (n - 1));
                                if (v)
                                    v.innerHTML = val;
                                var m = 1;
                                for (var t = 0; t < allSubgrGrData.length; t++) {
                                    m = allSubgrGrData[t].length - 1;
                                    if (n < m) {
                                        ss = ss + "  " + allSubgrGrData[t][n][3] + ", ";
                                        data[grCoher[ii][j] - 1][isinrec - 2] = '1';
                                        data[grCoher[ii][j] - 1][isinrec - 1] = val;
                                        break;
                                    } else
                                        n -= m;
                                }
                            }
                            //alert(ss);
                        }
                    }
            }
            l++;
        }
        if (isopen == 1) {
            s = s + "<div id='recle' class='fgr'>";
            s = s + "<img name='l1' id='dawn' src='./img/minusbig.gif' class='up' onClick='openRecucle(0);'>";
            s = s + "<div class='recucle' onClick='openRecucle(0);'>" + trans[14] + "</div>";
            s = s + "<div class=\"submit\" id='online' style=\"position:absolute;width:120px;height:22px;\" onClick=\"online();\">" + trans[2] + "</div>";
            //s = s +"<div class=\"submit\" id='exel' style=\"position:absolute;width:160px;height:22px;\" onClick=\"online();\">"+ trans[3] +"</div>";
            s = s + "<div class='rectable'><table style=\"width:98%;position:relative;left:10px;top:10px;\">";
            var table = document.getElementById('tablID');
            var trList = table.getElementsByTagName('tr');
            var tdList = trList[0].getElementsByTagName('td');
            s = s + "<td class='h'>" + trans[4] + "</td>";
            s = s + "<td class='h'>" + trans[5] + "</td>";
            s = s + "<td class='h'>" + trans[6] + "</td>";
            s = s + "</tr>";
            countDet = 0;
            countinrec = 0;
            while (countDet < colbolts - 1) {
                if (data[countDet][isinrec - 2] == '1') {
                    countinrec++;
                    s = s + "<tr >";
                    var ss = "";
                    for (j = 2; j < tdList.length - 2; j++) {
                        if (j != tdList.length - 3)
                            if (data[countDet][j] != "")
                                ss = ss + data[countDet][j] + ",  ";
                            else
                                ss = ss + data[countDet][j];
                    }
                    s = s + "<td style='font: 11px Tahoma; color: #000000; border: 1px solid #cacaca; height: 22px; padding-left: 6px;'>" + ss + "</td>"
                    ///   s=s+"<td style='font: 11px Tahoma;color: #000000; border: 1px solid #cacaca; height: 22px; padding-left: 6px;'>" + data[countDet][isinrec-1] + "</td>";
                    s = s + "<td style='font: 11px Tahoma;color: #000000; border: 1px solid #cacaca; height: 22px; padding-left: 6px;'> <div style='width:80px'><input type=\"text\" onkeypress=\"return isNumberlnput(this, event);\" onblur=\"endedit(" + countDet + "," + (isinrec - 1) + ")\" style=\"width:40px; border: 1px solid #a6abaf; margin-top: 4px; margin-bottom: 2px; height: 20px;\" value='" + data[countDet][isinrec - 1] + "' name=\"countInRec\" id='countrec" + countDet + "'></td>";
                    s = s + "<td style='font: 11px Tahoma;color: #000000; border: 1px solid #cacaca; height: 22px; padding-left: 6px;'><img src=\"./img/recucledel.gif\" onclick=\"setunCheck(" + countDet + ")\"> </td>";
                    s = s + "</tr>";
                }
                countDet++;
            }
            s = s + "</table><div>";
            dd.innerHTML = s;
        }
    }
    doResizeCode();
}
function setunCheck(i) {
    var dd = document.getElementById("recucle");
    var s = "";
    if (i != undefined) {
        var v = document.getElementById("t" + i);
        if (v != null)
            v.innerHTML = 0;
        data[i][isinrec - 1] = '0';
        data[i][isinrec - 2] = '0';
        if (isopen == 1) {
            s = s + "<div id='recle' class='fgr'>";
            s = s + "<img name='l1' id='dawn' src='./img/minusbig.gif' class='up' onClick='openRecucle(0);'>";
            s = s + "<div class='recucle' onClick='openRecucle(0);'>" + trans[14] + "</div>";
            s = s + "<div class=\"submit\" id='online' style=\"position:absolute;width:120px;height:22px;\" onClick=\"online();\">" + trans[2] + "</div>";
            // s = s +"<div class=\"submit\" id='exel' style=\"position:absolute;width:160px;height:22px;\" onClick=\"online();\">"+ trans[3] +"</div>";
            s = s + "<div class='rectable'><table style=\"width:98%;position:relative;left:10px;top:10px;\">";
            var table = document.getElementById('tablID');
            var trList = table.getElementsByTagName('tr');
            var tdList = trList[0].getElementsByTagName('td');
            // for (j = 2; j < tdList.length - 2; j++) {
            //       s=s+"<td class='h'>" + tdList[j].innerHTML + "</td>";
            // }
            s = s + "<td class='h'>" + trans[4] + "</td>";
            s = s + "<td class='h'>" + trans[5] + "</td>";
            s = s + "<td class='h'>" + trans[6] + "</td>";
            s = s + "</tr>";
            countDet = 0;
            countinrec = 0;
            while (countDet < colbolts - 1) {
                if (data[countDet][isinrec - 2] == '1') {
                    countinrec++;
                    s = s + "<tr >";
                    // for (j = 2; j < tdList.length - 2; j++) {
                    //       s=s+"<td  style='font: 11px Arial;color: #000000;'>" + data[countDet][j] + "</td>";
                    // }
                    var ss = "";
                    for (j = 2; j < tdList.length - 2; j++) {
                        if (j != tdList.length - 3)
                            if (data[countDet][j] != "")
                                ss = ss + data[countDet][j] + ",  ";
                            else
                                ss = ss + data[countDet][j];
                    }
                    s = s + "<td style='font: 11px Tahoma;color: #000000;border: 1px solid #cacaca; height: 22px; padding-left: 6px;'>" + ss + "</td>"
                    ///  s = s + "<td  style='font: 11px Tahoma;color: #000000;border: 1px solid #cacaca; height: 22px; padding-left: 6px;'>" + data[countDet][isinrec - 1] + "</td>";
                    s = s + "<td style='font: 11px Tahoma;color: #000000; border: 1px solid #cacaca; height: 22px; padding-left: 6px;'> <div style='width:80px'><input type=\"text\" onkeypress=\"return isNumberlnput(this, event);\" onblur=\"endedit(" + countDet + "," + (isinrec - 1) + ")\" style=\"width:40px; border: 1px solid #a6abaf; margin-top: 4px; margin-bottom: 2px; height: 20px;\" value='" + data[countDet][isinrec - 1] + "' name=\"countInRec\" id='countrec" + countDet + "'></td>";
                    s = s + "<td  style='font: 11px Tahoma;color: #000000;border: 1px solid #cacaca; height: 22px; padding-left: 6px;'><img src=\"./img/recucledel.gif\" onclick=\"setunCheck(" + countDet + ")\"> </td>";
                    s = s + "</tr>";
                }
                countDet++;
            }
            s = s + "</table></div>";
            dd.innerHTML = s;
            doResizeCode();
        }
    }
}
function isNumberlnput(field, event) {
    var key, keyChar;
    if (window.event)
        key = window.event.keyCode;
    else if (event)
        key = event.which;
    //else return true;
    // Проверка на числа
    keyChar = String.fromCharCode(key);
    if (/\d/.test(keyChar)) {
        window.status = "";
        return true;
    } else {
        window.status = "Поле принимает только числа.";
        return false;
    }
}
function isIe() {
    var browserName = navigator.appName;
    if (browserName == "Microsoft Internet Explorer") {
        return true;
    } else {
        return false;
    }
}
function closeIt() {
    close();
}
function changeD(id) {
    var preli = document.getElementById(previd);
    if (preli)
        preli.style.backgroundColor = "#FFFFFF";
    previd = "li" + id;
    var li = document.getElementById("li" + id);
    var ul = document.getElementById("ul" + id);
    var img = document.getElementById("img" + id);
    ul.style.display = 'block';
    if (img)
        img.src = "./img/minus.gif";
    var g = id.indexOf(',');
    ul = document.getElementById("ul" + id.slice(0, g));
    li.style.backgroundColor = "#AAA";
    ul.style.display = 'block';
    img = document.getElementById("img" + id.slice(0, g));
    if (img)
        img.src = "./img/minus.gif";
}
function changeDisplay(id) {
    var ul = document.getElementById("ul" + id);
    var img = document.getElementById("img" + id);
    if (previd != "") {
        var preli = document.getElementById(previd);
        if (preli)
            preli.style.backgroundColor = "#FFFFFF";
    }
    if ('none' == ul.style.display) {
        ul.style.display = 'block';
        if (img)
            img.src = "./img/minus.gif";
    } else {
        if (img)
            img.src = "./img/plus.gif";
        ul.style.display = 'none';
    }

    if (id >= 1000000)
        curimg = -1;

    var alls = "";
    var divim = document.getElementById("mainImage");
    divim.style.height = "0px";
    var divm = document.getElementById("maps");
    divm.innerHTML = "";
    var divf = document.getElementById("floatTip");
    divf.innerHTML = "";
    var imgs = document.getElementById("mainImage");
    boxVisible(-1, -1, true, true);
    var cn = 0;
    var ccn = 0;
    var ii = -1
      , jj = -1;
    var str = '';
    //id = id - 1000;
    str = str + '' + id;
    var cwidth = 2;
    var w = document.body.clientWidth;
    while (w > 1200) {
        w = w - 300;
        cwidth++;
    }
    var g = str.indexOf(',');
    if (g == -1 && id < 1000) {
        var ll = 0;
        for (var l = 0; l < id; l++) {
            ll = ll + allSubgrGrNames[l].length;
        }
        for (var i = 0; i < allSubgrGrNames[id].length; i++) {
            var k = 0;
            ii = 0;
            // while (k < allSubgrGrData[ll + i].length|| ii == "-1") ii = allSubgrGrData[ll + i][k++][0];
            var indexx = allSubgrGrData[ll + i][0][1];
            ii = numbimg(data[indexx - 1][0]);
            if (ii != jj && ii != "-1") {
                if (cn == cwidth) {
                    cn = 0;
                    ccn++;
                }
                var s = imgarray[ii][0].replace('images', 'smallimages');
                s = s.substring(0, s.lastIndexOf('.')) + ".gif";
                var hh = ""
                  , ww = "";
                if (height[ii] > widths[ii]) {
                    hh = "height:300px;";
                } else {
                    ww = "width:300px";
                }
                alls = alls + "<img  src='" + s + "' onClick='javascript:change_image_index(" + ii + ");boxVisible(-1, -1,  false, true);sel_item=false;changeD(\"" + id + "," + i + "\");settables(" + (ll + i) + "); scrollIV(" + "\"ul" + id + "," + i + "\",\"uls\");' style='position:absolute;" + hh + ww + ";margin-top:" + (20 + 350 * ccn) + "px;margin-left:" + (cn * 300 + 10) + "px'>";
                alls = alls + "<div style='position:absolute;width:300px;margin-top:" + (5 + 350 * ccn) + "px;;font-weight: bold;text-align:left;margin-left:" + (cn * 300 + 10) + "px'>" + imgarray[ii][1] + "</div>";
                cn++;
                jj = ii;
            }
        }
    }
    divm.innerHTML = alls;
    doResizeCode();
}

function findIt(findtype)
{
    if(findtype==0)
        find_by_name(order_funcgroups);

    if(findtype==1)
        find_by_name(order_composition);

    if(findtype==2)
        find_by_name(order_classify);
}

function find_by_name(find_array)
{
    var findv = document.getElementById('typef').value;
    var start_index = -1;

    
    for (var i = 0; i < find_array.length;i++)
    if (find_array[i][0] == cur)
    {
        start_index = i;
        break;
    }

    if (start_index < 0)
        start_index = find_array.length - 1;

    if (start_index >= find_array.length)
        start_index = 0;

    var cur_index = start_index + find_direction;
    while (cur_index !=start_index)
    {
        if (cur_index < 0)
        {
            cur_index = find_array.length - 1;
            continue;
        }

        if (cur_index >= find_array.length)
        {
            cur_index = 0;
            continue;
        }

        var dat_ind=find_array[cur_index][0];
        var s = find_array[cur_index][3];
        s = s.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "");
        if (s.toLowerCase().indexOf(findv.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").toLowerCase()) + 1)
        {
            var asgd_i=find_array[cur_index][1];
            var asgd_j=find_array[cur_index][2];
            change(allSubgrGrData[asgd_i][asgd_j][1], allSubgrGrData[asgd_i][asgd_j][2], allSubgrGrData[asgd_i][asgd_j][0]);
            curfind = dat_ind;
            return;
        }

        cur_index += find_direction;
    }

    curfind = -1;
    change(-1, -1, -1);
}

function scrollIV(id, ps) {
    var element = document.getElementById(id);
    var parentEl = document.getElementById(ps);
    if (element && parentEl)
        if ((element.offsetTop < parentEl.scrollTop) || (element.offsetTop > (parentEl.scrollTop + parentEl.offsetHeight)))
            parentEl.scrollTop = element.offsetTop - 20;
    //element.scrollIntoView(false);
}
function scaleIt(v, width, height) {
    var imageDiv = document.getElementById("mainImage");
    //var imgs = document.getElementById("imageDiv");
    imageDiv.style.width = (v * width[curimg]) + "px";
    imageDiv.style.height = (v * height[curimg]) + "px";
    if (curimg < newCoords.length) {
        for (i = 0; i < newCoords[curimg].length; i++) {
            for (j = 1; j < newCoords[curimg][i].length; j++) {
                newCoords[curimg][i][j] = Math.round(coords[curimg][i][j] * v);
            }
            var el = document.getElementById("area" + curimg + "_" + i);
            if (el) {
                var arr = new Array(4);
                arr[0] = newCoords[curimg][i][1];
                arr[1] = newCoords[curimg][i][2];
                arr[2] = newCoords[curimg][i][3];
                arr[3] = newCoords[curimg][i][4];
                if (newCoords[curimg][i])
                    el.coords = arr;
            }
        }
        oldv = v;
        if (sel_item)
            boxVisible(cur_image_num, cur_image_part, true, true);
    }
    boxVisible(curimg, curpos, true, true);
}
function setcolored(current, color) {
    if (current > 0)
    {
        var a = current - findsize;
        var selindex = 0;
        if (a <= 1)
            a = 1;
        var aa = current + findsize;
        if (aa >= data.length)
            aa = data.length;
        for (var k = a; k <= aa; k++) {
            if (data[k - 1][0] == data[current - 1][0] && data[k - 1][1] == data[current - 1][1]) {
                selarr[selindex] = k;
                selindex++;
                var kk = document.getElementById(k);
                kk.style.background = color;
                //          var t = k + 2000000;
                //          kk = document.getElementById("li" + t);
                //          kk.style.background = color;
            }
            //else selarr[selindex] = -1;
        }
    }
    var t = 0;
    while (t < selarr.length) {
        if (selarr[t] != prevselarr[t]) {
            var s = document.getElementById(prevselarr[t]);
            if (s != null)
                s.style.background = "#ffffff";

            //          var k = prevselarr[t] + 2000000;
            //          s = document.getElementById("li" + k);
            //          if (s != null)
            //              s.style.background = "#ffffff";
        }
        t++;
    }
    t = 0;
    while (t < selarr.length) {
        prevselarr[t] = selarr[t];
        selarr[t] = -1;
        t++;
    }
    /*if (prev!=-1 && prev!=current)
        {
            var s = document.getElementById(prev);     
            if (s!=null) s.style.background = "#ffffff";
               
        } */
    //  prev=current; 
}
function setcolored1(current) {
    var k = document.getElementById(current);
    if (prev1 != -1 && prev1 != current) {
        var s = document.getElementById(prev1);
        s.style.background = "#ffffff";
    }

    if (k)
    {
        k.style.background = "#aac3e7";
        prev1 = current;
    }
}

function setcolored2(current) {
    var k = document.getElementById(current);
    k.style.background = "#aac3e7";
    if (prev2 != -1 && prev2 != current) {
        var s = document.getElementById(prev2);
        s.style.background = "#ffffff";
    }
    prev2 = current;
}

function getImageSrc(prefix, flag) {
    if (flag)
        return prefix + "./img/minus.gif";
    else
        return prefix + "./img/plus.gif";
}
function open_tree(codegr, codeupgr) {
    for (var i = 0; i < grClassify.length; i++) {
        if (codeupgr == grClassify[i][0]) {
            setOpen(grClassify[i][0]);
            if (grClassify[i][1] == 0)
                return;
            else
                open_tree(grClassify[i][0], grClassify[i][1]);
        }
    }
}
function showclassify() {
    var img = document.getElementById('classifimg');
    if (showcls2 == 1) {
        img.src = "./img/minusbig.gif";
        var gr = document.getElementById("group");
        var t = document.getElementById("tablID");
        var uls = document.getElementById("ulclassify");
        var h1 = gr.offsetHeight;
        var h2 = t.offsetHeight;
        if (showcls == 1 && showcls3 == 1)
            uls.style.height = document.body.clientHeight - 160 + "px";
        else
            uls.style.height = h1 + h2 + "px";
        showcls2 = 0;
    } else {
        var uls = document.getElementById("ulclassify");
        uls.style.height = "0px";
        img.src = "./img/plusbig.gif";
        showcls2 = 1;
    }
}
function showclass() {
    var img = document.getElementById('classimg');
    if (showcls == 1) {
        img.src = "./img/minusbig.gif";
        var imgD = document.getElementById("imgD");
        var uls = document.getElementById("uls");
        var gr = document.getElementById("group");
        var t = document.getElementById("tablID");
        var h1 = gr.offsetHeight;
        var h2 = t.offsetHeight;
        var ulsc = document.getElementById("ulclassify");
        if (showcls3 == 0)
            showcomposition();
        if (showcls2 == 0)
            ulsc.style.height = h1 + h2 + "px";
        uls.style.height = document.body.clientHeight - 310 + "px";
        showcls = 0;
    } else {
        var uls = document.getElementById("uls");
        uls.style.height = "0px";
        var ulsc = document.getElementById("ulclassify");
        if (showcls2 == 0)
            ulsc.style.height = document.body.clientHeight - 165 + "px";
        img.src = "./img/plusbig.gif";
        showcls = 1;
    }
}
function showcomposition() {
    var img = document.getElementById('classcompimg');
    if (showcls3 == 1) {
        img.src = "./img/minusbig.gif";
        var imgD = document.getElementById("imgD");
        var ulcomp = document.getElementById("ulcomp");
        var gr = document.getElementById("group");
        var t = document.getElementById("tablID");
        var h1 = gr.offsetHeight;
        var h2 = t.offsetHeight;
        var ulsc = document.getElementById("ulclassify");
        if (showcls == 0)
            showclass();
        if (showcls2 == 0)
            ulsc.style.height = h1 + h2 + "px";
        ulcomp.style.height = document.body.clientHeight - 310 + "px";
        showcls3 = 0;
    } else {
        var ulcomp = document.getElementById("ulcomp");
        ulcomp.style.height = "0px";
        var ulsc = document.getElementById("ulclassify");
        if (showcls2 == 0)
            ulsc.style.height = document.body.clientHeight - 165 + "px";
        img.src = "./img/plusbig.gif";
        showcls3 = 1;
    }
}
function change(current, area_index, img_index, p, pp) {
    if (current != -1) {
        if (area_index != -1) {
            curpos = area_index;
            if (curimg != img_index)
                change_image_index(img_index);
            tree_item_opened = true;
            if (data[current - 1][1] != '') {
                boxVisible(img_index, area_index, tree_item_opened, true);
                setcolored(current, "#abc3e7");
            }
        } else {
            if (img_index != '-1') {
                if (curimg != img_index)
                    change_image_index(img_index);
                setcolored(current, "#BBBBBB");
                boxVisible(-1, -1, true, true);
                tree_item_opened = true;
            }
        }
        sel_item = true;
        if (current > 0) {
            cur = current - 1;
            var table = document.getElementById('tablID');
            var trList = table.getElementsByTagName('tr');
            var tdListName = trList[0].getElementsByTagName('td');
            var gr = 0
                , pgr = 0;
            var group = document.getElementById('group');
            // var kk = allSubgrGrData[i][0][1];
            group.innerHTML = "<div class=\"hh2\">" + trans[0] + " / " + trans[1] + ":</div>" + "<div class=\"hh3\">" + data[cur][tablelenth - 1] + " / " + data[cur][tablelenth] + "</div>";
            //<img src=\"./img/recucle.jpg\" onclick=\"setCheck();\" id=\"check\">";
            /* for (j = 0; j < tablelenth - 2; j++) {
        if (tdListName[j].innerText == trans[0])
            gr = j;
        if (tdListName[j].innerText == trans[1] )
            pgr = j;
    }*/
            var s = "";
            var a = current - findsize;
            if (a <= 1)
                a = 1;
            var aa = current + findsize;
            if (aa >= data.length)
                aa = data.length;
            s = s + '<td class=\"hk\">' + tdListName[0].innerHTML + '</td>';
            for (var j = 1; j < tablelenth; j++)
                s = s + '<td class=\"h\">' + tdListName[j].innerHTML + '</td>';
            s = '<tr>' + s + '</tr>';
            s = s + '<tr>';
            var detindx = 0;
            for (var k = a; k <= aa; k++) {
                if (data[k - 1][0] == data[current - 1][0] && data[k - 1][1] == data[current - 1][1]) {
                    dettorec[detindx] = k - 1;
                    detsort[detindx] = k - 1;
                    detindx++;
                    for (var m = 0; m < tablelenth; m++) {
                        if (m < tablelenth - 2)
                            s = s + '<td>' + data[k - 1][m] + '</td>';
                        else {
                            if (m == tablelenth - 2) {
                                r = "<div style='width:80px'><input type=\"text\" onkeypress=\"return isNumberlnput(this, event);\" style=\"width:40px; margin-top: 4px; margin-bottom: 2px;\" name=\"countIn\" value='0' id=\"count" + (k - 1) + "\" >";
                                /* r = r + "<img src=\"./img/recucle.jpg\" onclick=\"setCheck(" + (k - 1) + ");\" style=\"position:relative;top:3px\" name=\"Check\" id=\"check\"></div>";*/
                            }
                            // else r = data[k - 1][isinrec - 1];
                            if (m == tablelenth - 1)
                                r = "<div id='t" + (k - 1) + "'>" + data[k - 1][isinrec - 1] + "</div>";
                            s = s + '<td>' + r + '</td>';
                        }
                    }
                    s = s + '</tr>';
                    //break;
                }
            }
            dettorec[detindx] = -1;
            detsort[detindx] = -1;
            s = '<table id=\"tabl\" class=\"tdb\"style=\"width:99%;height:99%;position:relative;left:5px;\" >' + s + '</table>';
            table.innerHTML = s;
            //var k = document.getElementById('count'+cur);
            // data[cur][isinrec-1]=k.value;
            var f = false;
            //  var ch = document.getElementById('check');
            // if (data[current-1][9]=='1')
            //  ch.checked=true; else  ch.checked=false;  
            //  var k = document.getElementById('count');
            //  k.contentEditable='true'; 
            //k.value=data[current-1][10] ;
            var t = 0;
            var h = 0;
            for (var q = 0; q < grNames.length; q++)
                for (var q1 = 0; q1 < allSubgrGrNames[q].length; q1++) {
                    h = h + allSubgrGrData[t].length;
                    if (h > current - 1) {
                        setOpen(q + "," + q1);
                        setOpen(q);
                        var aa = current - (h - allSubgrGrData[t].length + 1);
                        var c = allSubgrGrData[t][aa][4];
                        if (c != 0) {
                            var cl = allSubgrGrData[t][aa][6];
                            setOpen(allSubgrGrData[t][aa][7]);
                            img = document.getElementById("img" + c);
                            if (img)
                                img.src = "./img/minus.gif";
                            setcolored1('b' + c);
                            open_tree(c, cl);
                            scrollIV('b' + c, "ulclassify");
                            openItemTree(current - 1);
                            current += 2000000;
                            setcolored2('tc' + current);
                            scrollIV('tc' + current, "ulcomp");
                            current -= 2000000;
                        } else {
                            if (prev1 != -1) {
                                var s = document.getElementById(prev1);
                                if (s != undefined)
                                    s.style.background = "#ffffff";
                            }
                            if (prev2 != -1) {
                                var s = document.getElementById(prev2);
                                if (s != undefined)
                                    s.style.background = "#ffffff";
                            }
                        }
                        if (data[current - 1][1] == '') {
                            tree_item_opened = false;
                            boxVisible(-1, -1, true, true);
                        }
                        doResizeCode();
                        return;
                    }
                    t++;
                }
        }
    } else {
        var table = document.getElementById('tablID');
        var trList = table.getElementsByTagName('tr');
        var tdListName = trList[1].getElementsByTagName('td');
        for (j = 0; j < tablelenth - 1 - 1; j++)
            tdListName[j].innerHTML = "";
        boxVisible(-1, -1, true, true);
        setcolored(-1);
    }
}
function setOpen(q) {
    var img = document.getElementById("img" + q);
    if (img)
        img.src = "./img/minus.gif";
    ul = document.getElementById('ul' + q);
    if (ul != null)
        ul.style.display = 'block';
}
function openItemTree(ind) {
    if (ind < 0 || ind >= data.length)
        return;
    var id = ind + 2000000 + 1;
    setOpen(id);
    openItemTree(data[ind][12]);
}

function boxVisible(imageNum, num, visible, force) {
    force = true;
    for (var k = 0; k < 10; ++k)
        for (i = 0; i < 5; ++i) {
            var box = document.getElementById("div" + i + "" + k);
            if (box)
                box.style.display = "none";
        }
    if (imageNum == -1 && num == -1) {
        return;
    }
    if (imageNum > newCoords.length)
        return;
    if (num > newCoords[imageNum].length)
        return;
    var cnum = newCoords[imageNum][num][0];
    var p = {
        x: 0,
        y: 0
    };
    var s = 0;
    var k = 0;
    while (s < newCoords[imageNum].length) {
        if (newCoords[imageNum][s][0] == cnum) {
            var c = new Array(4);
            c[0] = newCoords[imageNum][s][1];
            c[1] = newCoords[imageNum][s][2];
            c[2] = newCoords[imageNum][s][3];
            c[3] = newCoords[imageNum][s][4];
            // left, top,   width, height
            // 1) -   2) _| 3) _   4) |_
            var plus = new Array(new Array(p.x + c[0], p.y + c[1], c[2] - c[0], 4), new Array(p.x + c[2], p.y + c[1], 4, c[3] - c[1]), new Array(p.x + c[0], p.y + c[3], c[2] - c[0] + 4, 4), new Array(p.x + c[0], p.y + c[1], 4, c[3] - c[1] + 4));
            var box;
            for (i = 0; i < 4; ++i) {
                box = document.getElementById("div" + i + "" + k);
                if (box != null) {
                    box.style.marginLeft = plus[i][0] + "px";
                    box.style.marginTop = plus[i][1] + "px";
                    box.style.width = plus[i][2] + "px";
                    box.style.height = plus[i][3] + "px";
                    box.style.backgroundColor = "#AA0000"
                    if (visible)
                        box.style.display = "block";
                    else {
                        if (!tree_item_opened)
                            box.style.display = "none";
                    }
                }
            }
            /*box = document.getElementById("div" + 4 + "" + k);
if (box != null) {
    
    box.style.marginLeft = c[0]+2 + "px";
    box.style.marginTop = c[1]+2 + "px";
    box.style.width = c[2]-c[0] + "px";
    box.style.height = c[3] - c[1] + "px";
    box.style.opacity = "0.2";
    box.style.backgroundColor = "#AA0000";
    if (visible)
        box.style.display = "block";
    else {
        if (!tree_item_opened)
            box.style.display = "none";
    }
        
    } */
            k++;
        }
        s++;
    }
}
function change_image_index(index) {
    if (index != -1) {
        curimg = index;
    }
    change_image_flag(false);
}
function clear_sel() {
    var k = document.getElementById(prev);
    if (k != undefined)
        k.style.background = "#ffffff";
    k = document.getElementById(prev1);
    if (k != undefined)
        k.style.background = "#ffffff";
    k = document.getElementById(prev2);
    if (k != undefined)
        k.style.background = "#ffffff";
}
function change_image() {
    clear_sel();
    sel_item = false;
    boxVisible(-1, -1, true, true);
    change_image_flag(true);
}
function change_image_flag(flag) {
    document.images.show.src = imgarray[curimg][0];
    document.images.show.useMap = "#coordmap" + curimg;
    var imgname = document.getElementById("imgname");
    var ss = trans[12] + ": " + imgarray[curimg][1];
    imgname.innerHTML = ss;
    if (curimg < newCoords.length) {
        //if (prev_image !=curimg)
        {
            var imgd = document.getElementById("imgD");
            //if (widths[curimg] > height[curimg])
            //{ 
            //if (widths[curimg] / height[curimg]<1.2)
            //k = imgd.offsetWidth / widths[curimg]*0.7 ;
            // else
            // k = imgd.offsetWidth / widths[curimg]*0.9 ;}
            //else
            k = imgd.offsetHeight / height[curimg] * 0.9;
            if (k > 1) {
                demoSlider.setValue(1);
                k = 1;
            } else
                demoSlider.setValue(k);
            prev_image = curimg;
            setmap(curimg);
            scaleIt(k, widths, height);
            var imageDiv = document.getElementById("mainImage");
            //var imgs = document.getElementById("mainImage");
            document.images.show.style.widths = imageDiv.style.width;
            document.images.show.style.height = imageDiv.style.height;
        }
    } else
        flag = true;
    if (flag) {
        change(-1, -1, -1, '../');
        boxVisible(-1, -1, true, true);
    }
}
var name = "";
var cur_Ill = 0;
var cur_Ill_index = 0;
function OpenImagePopup(imgPath, title, alt, name) {
    name = "<b>" + name + "</b>";
    cur_Ill_index = 1;
    var cnt = grIllustration[cur_Ill].length - 1;
    for (var j = 0; j < grIllustration.length; j++)
        if (imgPath == grIllustration[j][1])
            cur_Ill = j;
    cnt = grIllustration[cur_Ill].length - 1;
    var win = window.open('', 'displayWindow', 'width=650,height=480,left=0,top=0,screenX=0,screenY=0,resizable=1,scrollbar=0,status=0');
    var winDoc = win.document;
    if (title == undefined)
        title = 'My Image, Click to Close';
    if (alt == undefined)
        alt = 'My Image, Click to Close';
    var content = "<script type='text/javascript' src='./js/change.js'></script>" + '<html><head> <meta http-equiv=\"Content-Type\" content=\"text/html; charset=Windows-1251\"><title>' + title + '</title>' + '<style>body{overflow: hidden;margin:0;}img{border:0;}b {font-weight: bold;}</style>' + "</head><body>" + "<div style='position:relative;height:30px;border: 1px solid #cacaca;'>";
    content += "<div id='counter' style='position:relative;font: 11px Tahoma;	color: #464546;margin-top:10px;margin-left:10px' >" + name + "      " + trans[12] + ":1/" + grIllustrationNames[cur_Ill].length + "   " + "<b>" + grIllustrationNames[cur_Ill][0] + "</b></div>";
    content += "<div style='position:relative;left:500px;top:-20px;'><table><tr>";
    content += "<td><a href='javascript:previllustr()'> << </a></td>";
    for (var j = 1; j <= cnt; j++) {
        content += "<td><a style='font: 11px Tahoma;font-weight:bold' href='javascript:setill(" + (j - 1) + ")'>" + j + "</a></td>";
    }
    content += "<td><a href='javascript:nextillustr()'> >> </a></td>";
    content += "</tr></table></div>";
    content += "<div><img id=\"image\" style=\"position:absolute;left:0px;top:50px;width:500px;height:400px\" src=\"./illustration/" + grIllustration[cur_Ill][1] + "\" ></div>";
    content += '<script type=\"text/javascript\">';
    content += "var name= '" + name + "';";
    content += "var illustr= '" + trans[12] + "';";
    content += '; var addIll=[';
    for (var a = 1; a < grIllustration[cur_Ill].length; a++)
        if (a == 1)
            content = content + "\"" + grIllustration[cur_Ill][a] + "\"";
        else
            content = content + ',' + "\"" + grIllustration[cur_Ill][a] + "\"";
    content += ']; ';
    content += 'var addIllnames=[';
    for (var a = 0; a < grIllustrationNames[cur_Ill].length; a++)
        if (a == 0)
            content = content + "\"" + grIllustrationNames[cur_Ill][a] + "\"";
        else
            content = content + ',' + "\"" + grIllustrationNames[cur_Ill][a] + "\"";
    content += ']; ';
    content += '</script></body></html>';
    win.document.write(content);
    /*winDoc.body.onload = function() {
        var obj = winDoc.getElementById('image');
        var w = obj.width, h = obj.height;
        var iHeight= document.body.clientHeight, iWidth = self.innerWidth;
     
        var left = (self.opera ? iWidth : screen.availWidth)/2 - w/2;
        var top =  (self.opera ? iHeight : screen.availHeight)/2 - h/2;
        win.resizeTo(w+16, h+46);
        win.moveTo(left, top);
    }
     
    win.onload = winDoc.body.onload; // special for Mozilla
    */
    win.document.close();
    win.focus();
}
//<input type=button onClick='previllustr()' value=' < '>" + "<input type=button onClick='nextillustr()' value=' > '>
function setill(i) {
    cur_Ill_index = i;
    var image = document.getElementById("image");
    image.src = './illustration/' + addIll[cur_Ill_index];
    setcnt(cur_Ill_index + 1);
}
function nextillustr() {
    cur_Ill_index++;
    if (addIll.length - 1 < cur_Ill_index)
        cur_Ill_index = 0;
    var image = document.getElementById("image");
    image.src = './illustration/' + addIll[cur_Ill_index];
    setcnt(cur_Ill_index + 1);
}
function previllustr() {
    cur_Ill_index--;
    if (cur_Ill_index < 0)
        cur_Ill_index = addIll.length - 1;
    var image = document.getElementById("image");
    image.src = './illustration/' + addIll[cur_Ill_index];
    setcnt(cur_Ill_index + 1);
}
function setcnt(i) {
    var c = document.getElementById('counter');
    c.innerHTML = name + "       " + illustr + ": " + i + "/" + addIll.length + " " + "<b>" + addIllnames[i - 1] + "</b>";
}
//экспорт в excel
function newXLS() {
    if (isIe()) {
        var my_xls = new ActiveXObject("Excel.Application");
        my_xls.visible = true;
        var excelSheet = my_xls.Workbooks.Add;
        excelSheet.Worksheets.Add;
        excelSheet.Worksheets(1).Activate;
        var table = document.getElementById('tabl');
        var trList = table.getElementsByTagName('tr');
        excelSheet.Worksheets(1).Columns("A").columnwidth = 100;
        excelSheet.Worksheets(1).Columns("B").columnwidth = 20;
        var i = 0;
        var tdList = trList[i].getElementsByTagName('td');
        excelSheet.Worksheets(1).Cells(1, 1).value = trans[4];
        excelSheet.Worksheets(1).Cells(1, 2).value = trans[5];
        //  excelSheet.Worksheets(1).Cells(1, tdList.length-1).value = tdList[tdList.length - 2].innerHTML;
        var i = 1;
        var countDet = 0;
        var cc = 2;
        while (countDet < colbolts - 1) {
            if (data[countDet][isinrec - 2] == '1') {
                var ss = "";
                for (j = 2; j < tdList.length - 2; j++) {
                    if (j != tdList.length - 3)
                        if (data[countDet][j] != "")
                            ss = ss + data[countDet][j] + ",  ";
                        else
                            ss = ss + data[countDet][j];
                }
                excelSheet.Worksheets(1).Cells(cc, 1).value = ss;
                excelSheet.Worksheets(1).Cells(cc, 2).value = data[countDet][isinrec - 1];
                cc++;
                i++;
            }
            countDet++;
        }
        excelSheet.Worksheets(1).Name = "engineering elements";
    } else {
        msg = 'Данная операция доступна только для Microsoft Internet Explorer версии 7.0 или выше';
        //msg="Need the internet explorer to doing this operation";
        window.alert(msg);
    }
}
var addEvent = function (elem, type, eventHandle) {
    if (elem == null || elem == undefined)
        return;
    if (elem.addEventListener) {
        elem.addEventListener(type, eventHandle, false);
    } else if (elem.attachEvent) {
        elem.attachEvent("on" + type, eventHandle);
    }
}
;
addEvent(window, "resize", function () {
    doResizeCode();
});
function doResizeCode() {
    var tablID = document.getElementById("tablID");
    var imgD = document.getElementById("imgD");
    imgD.style.width = document.body.clientWidth - 320 + "px";
    //modify = countinrec 
    if (modify != 180)
        imgD.style.height = document.body.clientHeight - modify - countinrec * 20 - 31 + "px";
        //
    else
        imgD.style.height = document.body.clientHeight - modify - 81 + "px";
    
    var rec = document.getElementById("recucle");
    if (modify != 180)
        rec.style.height = countinrec * 30 + 100 + "px";
        //300 + "px";
    else
        rec.style.height = 30 + "px";
    var handl = document.getElementById("handl");
    handl.style.width = 319 + "px";
    handl.style.height = "60px";
    var s = document.getElementById("find");
    s.style.position = "absolute";
    s.style.left = "10px";
    s.style.top = "8px";
    s = document.getElementById("finddawn");
    s.style.position = "absolute";
    s.style.left = "32px";
    s.style.top = "8px";
    var sf = document.getElementById("typef");
    sf.style.position = "absolute";
    sf.style.left = "45px";
    sf.style.top = "5px";
    sf.style.width = "254px";
    sf.style.height = "18px";
    var typef = document.getElementById("btnc");
    typef.style.position = "absolute";
    typef.style.left = "219px";
    typef.style.top = "32px";
    var typef = document.getElementById("btnf");
    typef.style.position = "absolute";
    typef.style.left = "4px";
    typef.style.top = "32px";
    var typef = document.getElementById("btnclsf");
    typef.style.position = "absolute";
    typef.style.left = "98px";
    typef.style.top = "32px";
    var imgA = document.getElementById("imageAreaDiv");
    var leftcol = document.getElementById("leftcol");
    if (leftcol) {
        leftcol.style.width = "320px";
        leftcol.style.height = imgA.offsetHeight + "px";
    }
    var l = document.getElementById("l");
    var scr = document.getElementById("scroll");
    scr.style.top = "0px";
    scr.style.height = imgA.offsetHeight - 70 + "px";
    bt = document.getElementById("check");
    if (bt != null) {
        bt.style.left = document.body.clientWidth - 108 + "px";
        bt.style.top = imgA.offsetHeight + 68 + "px";
        bt.style.width = "90px";
    }
    //bt = document.getElementById("exel");
    //if (bt != null) {
    //   bt.style.position="relative";
    //   bt.style.left = imgA.offsetWidth - 158 + "px";
    //  bt.style.top = "-35px";
    //  bt.style.width="140px";
    //  bt.style.height="22px";
    //}
    bt = document.getElementById("online");
    if (bt != null) {
        // bt.style.left = imgA.offsetWidth - 250 + "px";
        bt.style.left = imgA.offsetWidth - 105 + "px";
        bt.style.position = "relative";
        bt.style.top = "-13px";
        //bt.style.top = "-35px";
        bt.style.width = "80px";
        bt.style.height = "22px";
    }

    var uls = document.getElementById("uls");
    var ulcomp = document.getElementById("ulcomp");

    if (showcls == 0 && showcls3 == 1)
        uls.style.height = document.body.clientHeight - 310 + "px";
    else if (showcls3 == 0 && showcls == 1)
        ulcomp.style.height = document.body.clientHeight - 310 + "px";

    if (showcls2 == 0)
    {
        var gr = document.getElementById("group");
        var t = document.getElementById("tablID");
        var h1 = gr.offsetHeight;
        var h2 = t.offsetHeight;
        var ulsc = document.getElementById("ulclassify");
        var show_cls = showcls==1 && showcls3==1;
        if (show_cls == 1)
            ulsc.style.height = document.body.clientHeight - 160 + "px";
        else
            ulsc.style.height = h1 + h2 + "px";
    }
}