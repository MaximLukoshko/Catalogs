var prev_image = 0;
var oldv = 1;
var myWin;
var jst;
var cur = -1;
var prev = -1;
var sel_item = false;
var prevfind = "";
var gr;
var pgr;
var isopen = 0;
var modify = 180;
var aaa = 0;
var isfind = false;
var findup = true;
var selarr = new Array(40);
var prevselarr = new Array(40);
var dettorec = new Array(100);
var detsort = new Array(100);
var curimg = -1;
var curpos = 0;
var v = 1;
var func_groups_showed = 0;
var classifier_showed = 0;
var tree_comp_showed = 0;
var countinrec = 0;
var previd = "";
var findsize = 100;

// Переменные-индексы
// Предопределённые индексы для массива allSubgrGrData
var IND_ASGD_IMG_POS          =  0; // Позиция рисунка в массиве imgArray
var IND_ASGD_DATA_IND         =  1; // Позиция элемента в массиве data
var IND_ASGD_POSITION         =  2; // Позиция элемента на рисунке
var IND_ASGD_NAME             =  3; // Наименование
var IND_ASGD_GR_CLS_CODE      =  4; // Код группы (не равен нулю, если элемент есть в классификаторе). Позже заменяется на id элемента в классификаторе
var IND_ASGD_SOME_CODE        =  5; // Какой-то код. (SupplyCode)
var IND_ASGD_GR_SAVED         =  6; // После замены IND_ASGD_GR_CLS_CODE на id элемента в классификаторе сюда записывается сохранённый IND_ASGD_GR_CLS_CODE
var IND_ASGD_CLS_ID           =  7; // Если элемент есть в классификаторе, то сюда записывается id раздела, внутри которого содержатся рисунки элемента

// Предопределённые индексы для массива data
var IND_D_IMG                    =  0; // Номер картинки
var IND_D_POSITION               =  1; // Позиция элемента на рисунке
var IND_D_SIGN                   =  2; // Обозначение
var IND_D_NAME                   =  3; // Наименование
var IND_D_WEIGHT                 =  4; // Масса
var IND_D_COHERED_TO             =  5; // Связность
var IND_D_GROUP_FULL_NAME        =  6; // Полное название группы
var IND_D_SUBGROUP_FULL_NAME     =  7; // Полное название подгруппы

// Плавающая переменная. Её значение изменяется в зависимости от количества колонок в таблице
var IND_D_TABLELENGTH  = 11; 

// Предопределённые смещения для массива data относительно позиции IND_D_TABLELENGTH
// SH = SHIFT
var SH_D_QUANT_TO_ADD_TO_REC = -2; // Количество элементов для добавления в корзину
var SH_D_QUANT_AT_RECYCLE    = -1; // Количество в корзине
var SH_D_ITEMCODE            =  0; // Код элемента
var SH_D_INCCODE             =  1; // Код входимости



//Переменные для поиска
var curfind = -1;
var find_direction = 1;
var order_funcgroups = [];
var order_composition = [];
var order_classify = [];

function online() { }

function changetypef(f) {
    find_direction = f;
}

function isgetdetal(j) {
    for (var i = 0; i < allSubgrGrData[j].length; i++) {
        if (allSubgrGrData[j][i][IND_ASGD_POSITION] != '-1')
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

function coverTextWith_TR(text)
{
    return '<tr>' + text + '</tr>';
}

function coverTextWith_TD(text, style)
{
    style = style ? " " + style : "";

    return '<td' + style + '>' + text + '</td>';
}

function coverTextWith_TABLE(text)
{
    return '<table class=\"tdb\" style=\"width:99%;position:relative;left:5px;top:5px;\">' + text + '</table>';
}

function settables_for_subgroups(gr_ind, subgr_ind) {
    var grFullName = grNames[gr_ind][1] + ". " + grNames[gr_ind][0];
    var subgrFullName = allSubgrGrNames[gr_ind][subgr_ind][1] == "" ? "" : allSubgrGrNames[gr_ind][subgr_ind][1] + ". ";
    subgrFullName += allSubgrGrNames[gr_ind][subgr_ind][0];

    var group = document.getElementById('group');
    group.innerHTML = "<div class=\"hh2\">" + trans[0] + " / " + trans[1] + ":</div>" + "<div class=\"hh3\">" + grFullName + " / " + subgrFullName + "</div>";

    var subgr_pos = 0; // Индекс подгруппы в массиве allSubgrGrNames
    for (var i = 0; i < gr_ind; i++)
        subgr_pos += allSubgrGrNames[i].length;
    subgr_pos += subgr_ind;

    var buff = [];
    for (var k = 0; k < allSubgrGrData[subgr_pos].length; k++)
    {
        var ind = allSubgrGrData[subgr_pos][k][IND_ASGD_DATA_IND] - 1;
        buff.push(ind);
    }

    form_table_by_array(buff);
}

function settables_for_group(i) {
    var group = document.getElementById('group');
    group.innerHTML = "<div class=\"hh2\">" + trans[0] + ":</div>" + "<div class=\"hh3\">" + grNames[i][1] + ". " + grNames[i][0] + "</div>";

    var buff = [];
    form_buff_for_group(i, buff);

    form_table_by_array(buff);
}

function form_buff_for_group(gr_ind, buff)
{
    for (var i = 0; i < allSubgrGrData[gr_ind].length; i++)
        buff.push(allSubgrGrData[gr_ind][i][IND_ASGD_DATA_IND] - 1);

    for (var i = 0; i < grNames.length; i++)
        if (grNames[i][3] == gr_ind)
            form_buff_for_group(i, buff);
}

function settables_for_item(i) {
    var group = document.getElementById('group');
    var item_name = form_displaying_name(data[i]);
    group.innerHTML = "<div class=\"hh2\">" +  "</div>" + "<div class=\"hh3\">" + item_name + "</div>";

    var buff = [];
    form_buff_for_item(i, buff);

    form_table_by_array(buff);
}

function form_buff_for_item(item_ind, buff)
{
    buff.push(item_ind);
    for (var i = 0; i < data.length; i++)
        if (data[i][IND_D_TABLELENGTH + SH_D_INCCODE] == item_ind)
            form_buff_for_item(i, buff);
}

function formCommonPartForTable(cur_ind)
{
    var r = "";
    for (var m = 0; m < IND_D_TABLELENGTH + SH_D_QUANT_TO_ADD_TO_REC; m++)
        r += coverTextWith_TD(data[cur_ind][m]);
    return r;
}

function formAddPartForTable(cur_ind)
{
    var r = "";
    r += coverTextWith_TD("<div style='width:80px'><input type=\"text\" onkeypress=\"return isNumberlnput(this, event);\" style=\"width:40px; border: 1px solid #a6abaf; margin-top: 4px; margin-bottom: 2px; height: 20px;\" value='0' name=\"countIn\" id=\"count" + cur_ind + "\">");
    r += coverTextWith_TD("<div id='t" + cur_ind + "'>" + data[cur_ind][IND_D_TABLELENGTH + SH_D_QUANT_AT_RECYCLE] + "</div>");
    return r;
}

function formDeletePartForTable(cur_ind)
{
    var r = "";
    r += coverTextWith_TD("<div style='width:80px'><input type=\"text\" onkeypress=\"return isNumberlnput(this, event);\" onblur=\"endedit(" + cur_ind + "," + (IND_D_TABLELENGTH + SH_D_QUANT_AT_RECYCLE) + ")\" style=\"width:40px; border: 1px solid #a6abaf; margin-top: 4px; margin-bottom: 2px; height: 20px;\" value='" + data[cur_ind][IND_D_TABLELENGTH + SH_D_QUANT_AT_RECYCLE] + "' name=\"countInRec\" id='countrec" + cur_ind + "'>");
    r += coverTextWith_TD("<img src=\"./img/recucledel.gif\" onclick=\"setunCheck(" + cur_ind + ")\">");
    return r;
}

function form_table_by_array(ind_array) {
    ind_array.sort(function (a, b) { return a - b; });

    var table = document.getElementById('tablID');
    var trList = table.getElementsByTagName('tr');
    var tdListName = trList[0].getElementsByTagName('td');
    var s = "";
    for (var j = 0; j < IND_D_TABLELENGTH; j++)
        s += coverTextWith_TD(tdListName[j].innerHTML, "class=\"h\"");
    s = coverTextWith_TR(s);
    for (var i = 0; i < ind_array.length; i++) {
        var cur_ind = ind_array[i];
        dettorec[i] = cur_ind;
        detsort[i] = cur_ind;

        s += coverTextWith_TR(formCommonPartForTable(cur_ind) + formAddPartForTable(cur_ind));
    }
    dettorec[ind_array.length] = -1;
    detsort[ind_array.length] = -1;

    s = coverTextWith_TABLE(s);

    table.innerHTML = s;
    doResizeCode();
}


function form_recucle_table()
{
    countinrec = 0;

    var table = document.getElementById('tablID');
    var trList = table.getElementsByTagName('tr');
    var tdListName = trList[0].getElementsByTagName('td');

    var s = "";

    for (var j = 0; j < IND_D_TABLELENGTH + SH_D_QUANT_TO_ADD_TO_REC; j++)
        s += coverTextWith_TD(tdListName[j].innerHTML, "class=\"h\"");
    s += coverTextWith_TD(trans[5], "class=\"h\"");
    s += coverTextWith_TD(trans[6], "class=\"h\"");

    s = coverTextWith_TR(s);

    for (var cur_ind = 0; cur_ind < data.length; cur_ind++)
        if (data[cur_ind][IND_D_TABLELENGTH + SH_D_QUANT_AT_RECYCLE] > 0)
        {
            s += coverTextWith_TR(formCommonPartForTable(cur_ind) + formDeletePartForTable(cur_ind));
            countinrec++;
        }

    s = coverTextWith_TABLE(s);

    return s;
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
    data[ii][IND_D_TABLELENGTH + SH_D_QUANT_AT_RECYCLE] = c;
}

function openRecucle(ii) {
    var dd = document.getElementById("recucle");
    var s = "";
    if (ii == 0) {
        s = s + "<div id='recle' class='fgr'>";
        s = s + "<img name='l1' id='up' src='./img/plusbig.gif' class='up' onClick='openRecucle(1);'>";
        s = s + "<div class='recucle' onClick='openRecucle(1);'>" + trans[14] + "</div>";
        s = s + "<div class=\"submit\" onclick=\"exportRecToCsv('Recucle.csv');\" id=\"exportToCSV\" style=\"position:absolute;width:80px;height:22px\">CSV</div>";
        s = s + "<div class=\"submit\" onclick=\"exportRecToXml('Recucle.xml');\" id=\"exportToXML\" style=\"position:absolute;width:80px;height:22px\">XML</div>";
        s = s + "<div class=\"submit\" id='online'  onClick=\"online();\">" + trans[2] + "</div>";
        modify = 180;
        isopen = 0;
    } else {
        s = s + "<div id='recle' class='fgr'>";
        s = s + "<img name='l1' id='dawn' src='./img/minusbig.gif' class='up' onClick='openRecucle(0);'>";
        s = s + "<div class='recucle' onClick='openRecucle(0);'>" + trans[14] + "</div>";
        s = s + "<div class=\"submit\" onclick=\"exportRecToCsv('Recucle.csv');\" id=\"exportToCSV\" style=\"position:absolute;width:80px;height:22px\">CSV</div>";
        s = s + "<div class=\"submit\" onclick=\"exportRecToXml('Recucle.xml');\" id=\"exportToXML\" style=\"position:absolute;width:80px;height:22px\">XML</div>";
        s = s + "<div class=\"submit\" id='online'  onClick=\"online();\">" + trans[2] + "</div>";
        s = s + "<div class='rectable'>" + form_recucle_table() + "</div>";
        isopen = 1;
        modify = 300;
    }
    dd.innerHTML = s;
    doResizeCode();
}

function setup(ul) {
    document.show.src = "./img/back_img.jpg";
    document.show.style.width = '600px';
    var t = 0;
    while (t < selarr.length) {
        prevselarr[t] = -1;
        selarr[t] = -1;
        t++;
    }
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
        recucle_str = recucle_str + "<div class='recucle' onClick='openRecucle(1);'>" + trans[14] + "</div>";
        recucle_str = recucle_str + "<div class=\"submit\" onclick=\"exportRecToCsv('Recucle.csv');\" id=\"exportToCSV\" style=\"position:absolute;width:80px;height:22px\">CSV</div>";
        recucle_str = recucle_str + "<div class=\"submit\" onclick=\"exportRecToXml('Recucle.xml');\" id=\"exportToXML\" style=\"position:absolute;width:80px;height:22px\">XML</div>";
        recucle_str = recucle_str + "<div class=\"submit\" id='online' onClick=\"online();\">" + trans[2] + "</div>";
        recucle_elem.innerHTML = recucle_str;
    }
 
    var table = document.getElementById('tablID');
    var trList = table.getElementsByTagName('tr');
    var tdListName = trList[0].getElementsByTagName('td');
    IND_D_TABLELENGTH = tdListName.length;


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var asgd_ind = 0;
    for (var i = 0; i < grNames.length; i++) {
        for (var j = 0; j < allSubgrGrNames[i].length; j++) {
            for (var k = 0; k < allSubgrGrData[asgd_ind].length; k++) {
                var cur_asgd = allSubgrGrData[asgd_ind][k];
                var cur_dat_ind = cur_asgd[IND_ASGD_DATA_IND] - 1;
                var cur_data = data[cur_dat_ind];
                var cur_gr_name = grNames[i];
                var cur_subgr_name = allSubgrGrNames[i][j];

                fillEmptyFields(cur_asgd, cur_data, cur_gr_name, cur_subgr_name);
            }
            asgd_ind++;
        }
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Проверяем, в каком браузере открывается страница
    var os = navigator.userAgent;
    hasIE = false;
    hasOpera = !!window.opera && window.opera.version && window.opera.version();
    hasChrome = !!window.chrome && (/chrome\/([\d\.]+)/i.exec(navigator.userAgent)[1] || true);
    hasFireFox = !!window.sidebar && (/firefox\/([\d\.]+)/i.exec(navigator.userAgent)[1] || true);
    hasSafari = !window.external && !hasOpera && (/safari\/([\d\.]+)/i.exec(navigator.userAgent)[1] || true);
    if (hasOpera != false || hasFireFox != false || hasSafari != false)
        alert("Корректная работа HTML-каталога обеспечиватся только для броузеров Google Chrome и Microsoft Explorer(версии 9.0 и выше). Для вашего типа броузера часть функций либо весь HTML-каталог могут неработоспособны!");

    if (os.indexOf("MSIE") >= 0) {
        var uaVers = os.substr(os.indexOf("MSIE") + 5, 3);
        if (uaVers.charAt(0) < '9' && uaVers.charAt(1) == '.') {
            alert('Вы используете устаревшую версию Internet Explorer, необходима версия 9.0 и выше');
            close();
        }
    }


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Строим дерево по функциональным группам

    //Корректируем данные, если вдруг родителя какой-то группы нет среди выгруженных
    for (var i = 0; i < grNames.length; i++) {
        var parent_ind = -1;
        for (var j = 0; j < grNames.length; j++)
            if (grNames[i][3] == grNames[j][2]) {
                parent_ind = j;
                break;
            }
        grNames[i][3] = parent_ind;
    }

    var buff = []; //Массив строк, содержащих HTML-код дерева функциональных групп
    func_group(-1, buff);
    ul.innerHTML = "<br>" + '' + buff.join('');


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Строим дерево классификаторов
    class_tree();



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Строим дерево по составу

    //Корректируем данные, если вдруг элемент входит в состав того, которого нет среди выгруженных
    for (var i = 0; i < data.length ; i++)
    {
        var index = -1;
        for (var j = 0; j < data.length ; j++)
        {
            if (data[i][IND_D_TABLELENGTH + SH_D_INCCODE] == data[j][IND_D_TABLELENGTH + SH_D_ITEMCODE])
            {
                index = j;
                break;
            }
        }
        data[i][IND_D_TABLELENGTH + SH_D_INCCODE] = index;
    }

    buff = [];
    tree_composition(-1, buff);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var ulcomp_field = document.getElementById("ulcomp");
    if (ulcomp_field.innerHTML == "undefined")
        ulcomp_field.innerHTML = "";
    ulcomp_field.innerHTML = "<br>" + '' + buff.join('');
    setmap(-1);

    showcomposition();
    showclassify();
    showclass();

    change(-1, -1, -1, '', -1);

    doResizeCode();
}

function formatGrSubgrName( sgn, nme )
{
    if (grSubgrShowMode == 2)
        return sgn + '. ' + nme; // Код. Наименование /
    else if (grSubgrShowMode == 1)
        return sgn;
    else
        return nme;
}

function fillEmptyFields(cur_asgd, cur_data, cur_gr_name, cur_subgr_name) {
    if (cur_asgd[IND_ASGD_POSITION] == '-1')
        cur_asgd[IND_ASGD_IMG_POS] = numbimg(cur_data[IND_D_IMG]);
    cur_data[IND_D_NAME] = cur_asgd[IND_ASGD_NAME];
    cur_data[IND_D_TABLELENGTH + SH_D_QUANT_AT_RECYCLE] = 0;
    cur_data[IND_D_GROUP_FULL_NAME] = formatGrSubgrName(cur_gr_name[1], cur_gr_name[0]);
    cur_data[IND_D_SUBGROUP_FULL_NAME] = formatGrSubgrName(cur_subgr_name[1], cur_subgr_name[0]);
}

var d = 0;
var jj = 0;
var previmg = -1;
var prevpos = -1;
//Формирует элементы, входящие в группу
function func_group(par_ind, buff) {
    for (var i = 0; i < grNames.length; i++) {
        if (grNames[i][3] != par_ind)
            continue;//Выполняется только для групп, для которых par_ind является родителем
        var group_content = '';
        // Строка, формирующая подгруппы и элементы подгрупп для данной группы.
        // !!! note_001_mal !!! 'group_content' формируется без закрывающего тега </div>,
        // поэтому после завершения формирования строк с дочерними группами в buff необходимо добавить этот самый тег
        group_content += "<img id='img" + i + "' src='./img/plus.gif' onClick='javascript:changeDisplay(" + i + ");javascript:settables_for_group(" + i + ")' style='cursor:pointer'><div class='cur2' id='li" + i + "' onClick='javascript:changeDisplay(" + i + ");javascript:settables_for_group(" + i + ")'  ><font size=\"2\" color=\"navy\">" + formatGrSubgrName(grNames[i][1], grNames[i][0]) + "</font></div>";
        group_content += "<div  id='ul" + i + "' style='display:none; margin-left:10px; padding-bottom: 6px'>";
        //Формируем подгруппы, входящие в группы
        for (var j = 0; j < allSubgrGrNames[i].length; j++) {
            var nn = 0;
            group_content += "<img id='img" + i + "," + j + "' src='./img/plus.gif' style='cursor:pointer' onClick='javascript:changeDisplay(\"" + i + "," + j + "\");'><div class='cur' id='li" + i + "," + j + "' onClick='javascript:changeDisplay(\"" + i + "," + j + "\");change_image_index(" + allSubgrGrData[jj][0][IND_D_IMG] + ");boxVisible(-1,-1,false,true);settables_for_subgroups(" + i + "," + j + ");' >" + formatGrSubgrName(allSubgrGrNames[i][j][1], allSubgrGrNames[i][j][0]) + "</div>";
            group_content += "<div id='ul" + i + "," + j + "'style='display:none;margin-left:17px;cursor:pointer;padding-bottom: 4px'>";
            //Формируем элементы, входящие в группы
            for (var k = 0; k < allSubgrGrData[jj].length; k++) {

                var cur_asgd = allSubgrGrData[jj][k];
                var cur_dat_ind = cur_asgd[IND_ASGD_DATA_IND] - 1;
                var cur_data = data[cur_dat_ind];

                var img_pos = -1;
                //Позиция изображения для данного элемента
                for (var m = 0; m < grIllustration.length; m++)
                    if (grIllustration[m][0] == cur_asgd[IND_ASGD_DATA_IND]) {
                        img_pos = m;
                        break;
                    }

                var displaying_name = form_displaying_name(cur_data);

                group_content += "<img src='./img/dot_tree.gif' style='margin-left:-11px;'>";

                if (img_pos != -1)
                    group_content += "<div style='height:14px'>";

                group_content += "<a onClick='javascript:change(" + cur_asgd[IND_ASGD_DATA_IND] + "," + cur_asgd[IND_ASGD_POSITION] + "," + cur_asgd[IND_ASGD_IMG_POS] + ");'><div  class='bolt' id='" + cur_asgd[IND_ASGD_DATA_IND] + "' style='margin-top:-14px;left:0px;cursor:pointer;text-indent:-2px;width:200px'>&nbsp;" + displaying_name + "</div></a>";

                if (img_pos != -1)
                    group_content += "<img src='./img/foto.gif' style='position:relative;top:-14px;left:200px' onclick=\"return OpenImagePopup('" + grIllustration[img_pos][1] + "', 'Деталь', 'Закрыть','" + cur_asgd[IND_ASGD_NAME] + " " + cur_data[IND_D_SIGN] + "');\"></div>";

                order_funcgroups.push([cur_asgd[IND_ASGD_DATA_IND] - 1, jj, k, displaying_name]);
                d++;
            }
            jj++;
            group_content += "</div>"
        }
        buff.push(group_content);
        //Формируем дочерние группы для данной
        func_group(i, buff);
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
                var cur_asgd = allSubgrGrData[jj][k];
                if (grClassify[n][0] == cur_asgd[IND_ASGD_GR_CLS_CODE])
                {
                    var data_ind = cur_asgd[IND_ASGD_DATA_IND] - 1;
                    var s = form_displaying_name(data[data_ind]);

                    if (v && isnotElemIn(mas, s)) {
                        var m = p + 1000000;
                        var displaying_name = form_displaying_name(data[data_ind]);
                        v.innerHTML += "<img id='img" + m + "' src='./img/plus.gif' onClick='javascript:changeDisplay(" + m + ");'><div id='li" + m + "'  onClick='javascript:changeDisplay(" + m + ");' class='curclass' style='margin-top:-14px;margin-left:10px;font-weight:normal;cursor:pointer' >" + displaying_name + "</div>" + "<div id='ul" + m + "' style='display:none;margin-left:15px'>";
                        mas[p] = s;
                        p++;
                    }
                    break;
                }
            }
    }
    for (var n = 0; n < grClassify.length; n++) {
        var kk = 0;
        for (var jj = 0; jj < allSubgrGrData.length; jj++)
            for (var k = 0; k < allSubgrGrData[jj].length; k++)
            {
                var cur_asgd = allSubgrGrData[jj][k];
                if (grClassify[n][0] == cur_asgd[IND_ASGD_GR_CLS_CODE]) {
                    var data_ind = cur_asgd[IND_ASGD_DATA_IND] - 1;
                    var cur_data = data[data_ind];
                    var s = form_displaying_name(cur_data);

                    for (var d = 0; d < mas.length; d++) {
                        if (mas[d] == s)
                        {
                            var m = d + 1000000;
                            v = document.getElementById("ul" + m);
                            if (v) {
                                if (cur_data[IND_D_POSITION] == "")
                                    cur_asgd[IND_ASGD_IMG_POS] = numbimg(cur_data[IND_D_IMG]);

                                var tr_comp_id = cur_asgd[IND_ASGD_DATA_IND] + 2000000;
                                var displaying_name = form_displaying_name(cur_data);
                                order_classify.push([data_ind, jj, k, displaying_name]);

                                bol = cur_asgd[IND_ASGD_DATA_IND] + 1000000;
                                v.innerHTML += "<img src='./img/dot_tree.gif' style='margin-left:-11px;'><a style='cursor:pointer' onClick='javascript:change(" + cur_asgd[IND_ASGD_DATA_IND] + "," + cur_asgd[IND_ASGD_POSITION] + "," + cur_asgd[IND_ASGD_IMG_POS] + ");scrollIV(\"ul" + tr_comp_id + "\",\"ulcomp\");scrollIV(" + cur_asgd[IND_ASGD_DATA_IND] + ",\"uls\");'><div  style='margin-top:-14px;left:0px;cursor:pointer;text-indent:-2px;' class='bolt' id='b" + bol + "'>" + trans[12] + " " + cur_data[IND_D_IMG] + ", " + trans[13] + " " + cur_data[IND_D_POSITION] + "</div></a>";
                                cur_asgd[IND_ASGD_GR_SAVED] = cur_asgd[IND_ASGD_GR_CLS_CODE];
                                cur_asgd[IND_ASGD_CLS_ID] = m;
                                cur_asgd[IND_ASGD_GR_CLS_CODE] = bol;
                            }
                            bol++;
                        }
                    }
                }
                kk++;
            }
    }
}

function form_displaying_name(cur_data)
{
    var ret = cur_data[IND_D_NAME] + " " + cur_data[IND_D_SIGN];
    return ret == " " ? cur_data[IND_D_TABLELENGTH + SH_D_ITEMCODE] : ret;
}

function tree_composition(par_gr, buff) {
    var arr = [];
    for (var i = 0; i < allSubgrGrData.length; i++)
    {
        for (var j = 0; j < allSubgrGrData[i].length; j++)
        {
            var cur_asgd = allSubgrGrData[i][j];
            var data_ind = cur_asgd[IND_ASGD_DATA_IND] - 1;
            var cur_data = data[data_ind];
            var displaying_name = form_displaying_name(cur_data);

            if (par_gr == cur_data[IND_D_TABLELENGTH + SH_D_INCCODE] && isnotElemIn(arr, displaying_name))
            {
                var m_composition = cur_asgd[IND_ASGD_DATA_IND] + 2000000;
                var source = "";

                source += "<img id='img" + m_composition + "' src='./img/plus.gif' onClick='javascript:changeDisplay(" + m_composition + ");javascript:settables_for_item(" + data_ind + ");'><div id='li" + m_composition + "'  onClick='javascript:changeDisplay(" + m_composition + ");javascript:settables_for_item(" + data_ind + ");' class='curclass' style='margin-top:-14px;margin-left:10px;font-weight:normal;cursor:pointer' >" + displaying_name + "</div>" + "<div id='ul" + m_composition + "' style='display:none;margin-left:15px'>";
                arr.push(displaying_name);
                for (var ii = 0; ii < allSubgrGrData.length; ii++)
                {
                    for (var jj = 0; jj < allSubgrGrData[ii].length; jj++)
                    {
                        var cur_asgd_temp = allSubgrGrData[ii][jj];
                        var data_ind_temp = cur_asgd_temp[IND_ASGD_DATA_IND] - 1;
                        var cur_data_temp = data[data_ind_temp];
                        var displaying_name_temp = form_displaying_name(cur_data_temp);

                        if (displaying_name == displaying_name_temp && cur_data_temp[IND_D_TABLELENGTH + SH_D_INCCODE] == par_gr)
                        {
                            var tc_ind = cur_asgd_temp[IND_ASGD_DATA_IND] + 2000000;
                            source += "<img src='./img/dot_tree.gif' style='margin-left:-11px;'><a style='cursor:pointer' onClick='javascript:change(" + cur_asgd_temp[IND_ASGD_DATA_IND] + "," + cur_asgd_temp[IND_ASGD_POSITION] + "," + cur_asgd_temp[IND_ASGD_IMG_POS] + ");'><div  style='margin-top:-14px;left:0px;cursor:pointer;text-indent:-2px;' class='bolt' id='tc" + tc_ind + "'>" + trans[12] + " " + cur_data_temp[IND_D_IMG] + ", " + trans[13] + " " + cur_data_temp[IND_D_POSITION] + "</div></a>";
                            order_composition.push([data_ind_temp, ii, jj, displaying_name]);
                        }
                    }
                }
                buff.push(source);
                tree_composition(data_ind, buff);
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
                    ss += "<img id='img" + grClassify[i][0] + "' src='./img/plus.gif' onClick='javascript:changeDisplay(" + grClassify[i][0] + ")'><div id='li" + grClassify[i][0] + "' onClick='javascript:changeDisplay(" + grClassify[i][0] + ");setColoredAndScroll(\"li" + grClassify[i][0] + "\",\"#abc3e7\");change_image_index(" + grClassify[i][3] + ");' class='curclass' style='margin-top:-14px;margin-left:10px;cursor:pointer' >" + grClassify[i][2] + "</div>";
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
                var i = allSubgrGrData[ii][jj][IND_ASGD_IMG_POS];
                var j = allSubgrGrData[ii][jj][IND_ASGD_POSITION];
                var c = allSubgrGrData[ii][jj][IND_ASGD_DATA_IND];
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
    for (j = 0; j < IND_D_TABLELENGTH; j++) {
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
    var s = "";
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
            data[detsort[l]][IND_D_TABLELENGTH + SH_D_QUANT_AT_RECYCLE] = cc.value;
            var a = 0;
            var v = document.getElementById("t" + detsort[l]);
            v.innerHTML = cc.value;
            if (cc.value == '')
                data[detsort[l]][IND_D_TABLELENGTH + SH_D_QUANT_AT_RECYCLE] = 0;
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
                                    data[grCoher[ii][j] - 1][IND_D_TABLELENGTH + SH_D_QUANT_AT_RECYCLE] = val;
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
        s = s + "<div class=\"submit\" onclick=\"exportRecToCsv('Recucle.csv');\" id=\"exportToCSV\" style=\"position:absolute;width:80px;height:22px\">CSV</div>";
        s = s + "<div class=\"submit\" onclick=\"exportRecToXml('Recucle.xml');\" id=\"exportToXML\" style=\"position:absolute;width:80px;height:22px\">XML</div>";
        s = s + "<div class=\"submit\" id='online' style=\"position:absolute;width:120px;height:22px;\" onClick=\"online();\">" + trans[2] + "</div>";
        s = s + "<div class='rectable'>" + form_recucle_table() + "<div>";
        var dd = document.getElementById("recucle");
        dd.innerHTML = s;
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
        data[i][IND_D_TABLELENGTH + SH_D_QUANT_AT_RECYCLE] = 0;
        if (isopen == 1) {
            s = s + "<div id='recle' class='fgr'>";
            s = s + "<img name='l1' id='dawn' src='./img/minusbig.gif' class='up' onClick='openRecucle(0);'>";
            s = s + "<div class='recucle' onClick='openRecucle(0);'>" + trans[14] + "</div>";
            s = s + "<div class=\"submit\" id='online' style=\"position:absolute;width:120px;height:22px;\" onClick=\"online();\">" + trans[2] + "</div>";
            s = s + "<div class='rectable'>" + form_recucle_table() + "</div>";
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
            var indexx = allSubgrGrData[ll + i][0][IND_ASGD_DATA_IND] - 1;
            ii = numbimg(data[indexx][IND_D_IMG]);
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
    if (findtype == 0)
    {
        find_by_name(order_funcgroups);
        if (func_groups_showed == 1)
            showclass();
    }

    if (findtype == 1)
    {
        find_by_name(order_composition);
        if (tree_comp_showed == 1)
            showcomposition();
    }

    if (findtype == 2)
    {
        find_by_name(order_classify);
        if (classifier_showed == 1)
            showclassify();
    }
}

//find_array : [[data_index, allsubgrgrdata_i, allsubgrgrdata_j, displaying name ],...]
function find_by_name(find_array)
{
    if (find_array.length <= 0)
    {
        curfind = -1;
        change(-1, -1, -1);
        return;
    }

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
        var s = find_array[cur_index][3] + "";
        s = s.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "");
        if (s.toLowerCase().indexOf(findv.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").toLowerCase()) + 1)
        {
            var asgd_i=find_array[cur_index][1];
            var asgd_j=find_array[cur_index][2];
            change(allSubgrGrData[asgd_i][asgd_j][IND_ASGD_DATA_IND], allSubgrGrData[asgd_i][asgd_j][IND_ASGD_POSITION], allSubgrGrData[asgd_i][asgd_j][IND_ASGD_IMG_POS]);
            curfind = dat_ind;
            return;
        }

        cur_index += find_direction;
    }

    if (cur_index == start_index)
    {
        var dat_ind = find_array[cur_index][0];
        var s = find_array[cur_index][3] + "";
        s = s.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "");
        if (s.toLowerCase().indexOf(findv.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").toLowerCase()) + 1) {
            var asgd_i = find_array[cur_index][1];
            var asgd_j = find_array[cur_index][2];
            change(allSubgrGrData[asgd_i][asgd_j][IND_ASGD_DATA_IND], allSubgrGrData[asgd_i][asgd_j][IND_ASGD_POSITION], allSubgrGrData[asgd_i][asgd_j][IND_ASGD_IMG_POS]);
            curfind = dat_ind;
            return;
        }
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

function setColoredAndScroll(current, color) {
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
            if (data[k - 1][IND_D_IMG] == data[current - 1][IND_D_IMG] && data[k - 1][IND_D_POSITION] == data[current - 1][IND_D_POSITION]) {
                if (data[current - 1][IND_D_POSITION] == '' && k != current)
                    continue;

                selarr[selindex] = k;
                selindex++;
                setItemColoredById(k, color);
                scrollItemsById(k);


            }
        }
        prev = current;
    }
    var t = 0;
    while (t < selarr.length)
    {
        if (selarr[t] != prevselarr[t])
            setItemColoredById(prevselarr[t], "#ffffff");
        t++;
    }
    t = 0;
    while (t < selarr.length)
    {
        prevselarr[t] = selarr[t];
        selarr[t] = -1;
        t++;
    }
}

function scrollItemsById(current) {
    if (prev != current) {
        scrollIV(current, "uls");

        current += 1000000;
        scrollIV('b' + current, "ulclassify");

        current += 1000000;
        scrollIV('tc' + current, "ulcomp");
    }
}

function setItemColoredById(current, color, need_scroll) {
    if (prev != current)
    {
        setBackGroundColorById(current, color);

        //Красим запись в дереве по составу
        current += 1000000;
        setBackGroundColorById('b' + current, color);

        //Красим запись в классификаторах
        current += 1000000;
        setBackGroundColorById('tc' + current, color);
    }
}

function setBackGroundColorById(current, color)
{
    var kk = document.getElementById(current);
    if (kk)
        kk.style.background = color;
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
    if (classifier_showed == 1) {
        img.src = "./img/minusbig.gif";
        var gr = document.getElementById("group");
        var t = document.getElementById("tablID");
        var uls = document.getElementById("ulclassify");
        var h1 = gr.offsetHeight;
        var h2 = t.offsetHeight;
        if (func_groups_showed == 1 && tree_comp_showed == 1)
            uls.style.height = document.body.clientHeight - 160 + "px";
        else
            uls.style.height = h1 + h2 + "px";
        classifier_showed = 0;
    } else {
        var uls = document.getElementById("ulclassify");
        uls.style.height = "0px";
        img.src = "./img/plusbig.gif";
        classifier_showed = 1;
    }
}

function showclass() {
    var img = document.getElementById('classimg');
    if (func_groups_showed == 1) {
        img.src = "./img/minusbig.gif";
        var uls = document.getElementById("uls");
        var gr = document.getElementById("group");
        var t = document.getElementById("tablID");
        var h1 = gr.offsetHeight;
        var h2 = t.offsetHeight;
        var ulsc = document.getElementById("ulclassify");
        if (tree_comp_showed == 0)
            showcomposition();
        if (classifier_showed == 0)
            ulsc.style.height = h1 + h2 + "px";
        uls.style.height = document.body.clientHeight - 310 + "px";
        func_groups_showed = 0;
    } else {
        var uls = document.getElementById("uls");
        uls.style.height = "0px";
        var ulsc = document.getElementById("ulclassify");
        if (classifier_showed == 0)
            ulsc.style.height = document.body.clientHeight - 165 + "px";
        img.src = "./img/plusbig.gif";
        func_groups_showed = 1;
    }
}

function showcomposition() {
    var img = document.getElementById('classcompimg');
    if (tree_comp_showed == 1) {
        img.src = "./img/minusbig.gif";
        var ulcomp = document.getElementById("ulcomp");
        var gr = document.getElementById("group");
        var t = document.getElementById("tablID");
        var h1 = gr.offsetHeight;
        var h2 = t.offsetHeight;
        var ulsc = document.getElementById("ulclassify");
        if (func_groups_showed == 0)
            showclass();
        if (classifier_showed == 0)
            ulsc.style.height = h1 + h2 + "px";
        ulcomp.style.height = document.body.clientHeight - 310 + "px";
        tree_comp_showed = 0;
    } else {
        var ulcomp = document.getElementById("ulcomp");
        ulcomp.style.height = "0px";
        var ulsc = document.getElementById("ulclassify");
        if (classifier_showed == 0)
            ulsc.style.height = document.body.clientHeight - 165 + "px";
        img.src = "./img/plusbig.gif";
        tree_comp_showed = 1;
    }
}

function change(current, area_index, img_index, p, pp) {
    if (current != -1) {
        if (area_index != -1) {
            curpos = area_index;
            if (curimg != img_index)
                change_image_index(img_index);
            tree_item_opened = true;
            if (data[current - 1][IND_D_POSITION] != '') {
                boxVisible(img_index, area_index, tree_item_opened, true);
                setColoredAndScroll(current, "#abc3e7");
            }
        } else {
            if (img_index != '-1') {
                if (curimg != img_index)
                    change_image_index(img_index);
                setColoredAndScroll(current, "#BBBBBB");
                boxVisible(-1, -1, true, true);
                tree_item_opened = true;
            }
            else {
                setColoredAndScroll(current, "#EE0000");
                curimg = -1;
                var image = document.getElementById("mainImage");
                image.src = "./img/back_img.jpg";
            }
        }
        sel_item = true;
        if (current > 0) {
            cur = current - 1;
            settables_for_item(cur);

            var f = false;
            var t = 0;
            var h = 0;
            for (var q = 0; q < grNames.length; q++)
                for (var q1 = 0; q1 < allSubgrGrNames[q].length; q1++) {
                    h = h + allSubgrGrData[t].length;
                    if (h > current - 1) {

                        setOpen(q + "," + q1);  // Раскрываем подгруппу
                        openGroupTree(q);       // Раскрываем дерево групп
                        scrollIV(current, "uls");

                        openItemTree(current - 1);  //Раскрываем дерево по составу


                        var aa = current - (h - allSubgrGrData[t].length) - 1;
                        var c = allSubgrGrData[t][aa][IND_ASGD_GR_CLS_CODE];
                        if (c != 0) {
                            var cl = allSubgrGrData[t][aa][IND_ASGD_GR_SAVED];
                            setOpen(allSubgrGrData[t][aa][IND_ASGD_CLS_ID]);
                            img = document.getElementById("img" + c);
                            if (img)
                                img.src = "./img/minus.gif";
                            open_tree(c, cl);
                        } else {
                            if (prev != -1) {
                                var s = document.getElementById('tc'+prev);
                                if (s != undefined)
                                    s.style.background = "#ffffff";
                            }
                            if (prev != -1) {
                                var s = document.getElementById('b'+prev);
                                if (s != undefined)
                                    s.style.background = "#ffffff";
                            }
                        }
                        if (data[current - 1][IND_D_POSITION] == '') {
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
        var group = document.getElementById('group');
        group.innerHTML = "<div class=\"hh2\"></div><div class=\"hh3\"></div>";
        if (trList.length > 1)
        {
            var tdListName = trList[1].getElementsByTagName('td');
            for (j = 0; j < IND_D_TABLELENGTH; j++)
                tdListName[j].innerHTML = "";
        }
        boxVisible(-1, -1, true, true);
        setColoredAndScroll(-1, "#ffffff");
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
    openItemTree(data[ind][IND_D_TABLELENGTH + SH_D_INCCODE]);
}

function openGroupTree(ind)
{
    if (ind < 0 || ind >= grNames.length)
        return;
    setOpen(ind);
    openGroupTree(grNames[ind][3]);
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
    if (num > newCoords[imageNum].length || newCoords[imageNum].length == 0)
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
            var line_width = 4;
            var box_width  = c[2] - c[0] + line_width;
            var box_height = c[3] - c[1] + line_width;
            var plus = new Array(
                new Array(p.x + c[0] - line_width / 2, p.y + c[1] - line_width / 2, box_width, line_width),
                new Array(p.x + c[2] - line_width / 2, p.y + c[1] - line_width / 2, line_width, box_height),
                new Array(p.x + c[0] - line_width / 2, p.y + c[3] - line_width / 2, box_width, line_width),
                new Array(p.x + c[0] - line_width / 2, p.y + c[1] - line_width / 2, line_width, box_height)
                );
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
    k = document.getElementById('tc'+prev);
    if (k != undefined)
        k.style.background = "#ffffff";
    k = document.getElementById('b' + prev);
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
    if (curimg < 0)
        return;

    document.images.show.src = imgarray[curimg][0];
    document.images.show.useMap = "#coordmap" + curimg;
    var imgname = document.getElementById("imgname");
    var ss = trans[12] + ": " + imgarray[curimg][1];
    imgname.innerHTML = ss;
    if (curimg < newCoords.length) {
        var imgd = document.getElementById("imgD");
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
        document.images.show.style.widths = imageDiv.style.width;
        document.images.show.style.height = imageDiv.style.height;
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

var addEvent = function (elem, type, eventHandle) {
    if (elem == null || elem == undefined)
        return;
    if (elem.addEventListener) {
        elem.addEventListener(type, eventHandle, false);
    } else if (elem.attachEvent) {
        elem.attachEvent("on" + type, eventHandle);
    }
};

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
    countinrec = countinrec > 6 ? 6 : countinrec; // Если больше шести элементов в корзине, то появляется бегунок для прокрутки
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
    typef.style.left = "98px";
    typef.style.top = "32px";
    var typef = document.getElementById("btnf");
    typef.style.position = "absolute";
    typef.style.left = "4px";
    typef.style.top = "32px";
    var typef = document.getElementById("btnclsf");
    typef.style.position = "absolute";
    typef.style.left = "192px";
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
        bt.style.top = "-57px";
        //bt.style.top = "-35px";
        bt.style.width = "80px";
        bt.style.height = "22px";
    }

    bt = document.getElementById("exportToCSV");
    if (bt != null) {
        // bt.style.left = imgA.offsetWidth - 250 + "px";
        bt.style.left = imgA.offsetWidth - 205 + "px";
        bt.style.position = "relative";
        bt.style.top = "-13px";
        //bt.style.top = "-35px";
        bt.style.width = "80px";
        bt.style.height = "22px";
    }

    bt = document.getElementById("exportToXML");
    if (bt != null) {
        // bt.style.left = imgA.offsetWidth - 250 + "px";
        bt.style.left = imgA.offsetWidth - 288 + "px";
        bt.style.position = "relative";
        bt.style.top = "-35px";
        //bt.style.top = "-35px";
        bt.style.width = "80px";
        bt.style.height = "22px";
    }

    var uls = document.getElementById("uls");
    var ulcomp = document.getElementById("ulcomp");

    if (func_groups_showed == 0 && tree_comp_showed == 1)
        uls.style.height = document.body.clientHeight - 310 + "px";
    else if (tree_comp_showed == 0 && func_groups_showed == 1)
        ulcomp.style.height = document.body.clientHeight - 310 + "px";

    if (classifier_showed == 0)
    {
        var gr = document.getElementById("group");
        var t = document.getElementById("tablID");
        var h1 = gr.offsetHeight;
        var h2 = t.offsetHeight;
        var ulsc = document.getElementById("ulclassify");
        var show_cls = func_groups_showed==1 && tree_comp_showed==1;
        if (show_cls == 1)
            ulsc.style.height = document.body.clientHeight - 160 + "px";
        else
            ulsc.style.height = h1 + h2 + "px";
    }
}

function exportRecToCsv(filename) {
    var table = document.getElementById('tablID');
    var trList = table.getElementsByTagName('tr');
    var tdList = trList[0].getElementsByTagName('td');

    var csvFile = "";
    csvFile += trans[0] + ";" + trans[1] + ";";
    for (j = IND_D_SIGN; j < IND_D_TABLELENGTH; j++)
        if(j!=IND_D_TABLELENGTH+SH_D_QUANT_TO_ADD_TO_REC)
            csvFile += tdList[j].innerHTML + ";";
    csvFile += "\n";

    for (var i = 0; i < data.length; i++) {
        var cur_data = data[i];
        if (cur_data[IND_D_TABLELENGTH+SH_D_QUANT_AT_RECYCLE] > 0) {

            csvFile += cur_data[IND_D_GROUP_FULL_NAME] + ";" + cur_data[IND_D_SUBGROUP_FULL_NAME] + ";";

            for (j = IND_D_SIGN; j < IND_D_TABLELENGTH; j++)
                if (j != IND_D_TABLELENGTH + SH_D_QUANT_TO_ADD_TO_REC)
                    csvFile += cur_data[j] + ";";
            csvFile += "\n"
        }
    }

    csvFile = "\uFEFF" + csvFile;
    var blob = new Blob([csvFile], { type: 'text/csv;charset=UTF-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

function exportRecToXml(filename) {
    var table = document.getElementById('tablID');
    var trList = table.getElementsByTagName('tr');
    var tdList = trList[0].getElementsByTagName('td');

    var columnNames = [];
    for (j = 0; j < IND_D_TABLELENGTH; j++) {
        columnNames.push(tdList[j].innerHTML);
        while (-1 != columnNames[j].indexOf(' '))
            columnNames[j]=columnNames[j].replace(' ', '');
    }

    var xmlFile = "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n";
    xmlFile += "<OmegaProduction>\n";

    for (var i = 0; i < data.length; i++) {
        var cur_data = data[i];
        if (cur_data[IND_D_TABLELENGTH + SH_D_QUANT_AT_RECYCLE] > 0) {
            xmlFile += "<item ";
            for (j = IND_D_SIGN; j < IND_D_TABLELENGTH; j++)
                if (j != IND_D_TABLELENGTH + SH_D_QUANT_TO_ADD_TO_REC)
                    xmlFile += columnNames[j] + "=\"" + cur_data[j] + "\" ";
            xmlFile += "/>\n";
        }
    }

    xmlFile += "</OmegaProduction>";

    xmlFile = "\uFEFF" + xmlFile;
    var blob = new Blob([xmlFile], { type: 'text/xml;charset=UTF-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}