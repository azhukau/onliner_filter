// ==UserScript==
// @name       Onliner filter
// @namespace  http://use.i.E.your.homepage/
// @version    0.2
// @description  enter something useful
// @match      http://baraholka.onliner.by/viewforum.php?f=*
// @copyright  2012+, You
// ==/UserScript==

var storedMin = localStorage.getItem('onliner_filter_min') || '';
var storedMax = localStorage.getItem('onliner_filter_max') || '';

var minPriceInput = $("<input id='filtermin' />").val(storedMin);
var maxPriceInput = $("<input id='filtermax' />").val(storedMax);

var filterFunc = function(){
    var min = minPriceInput.val();
    var max = maxPriceInput.val();
    localStorage.setItem('onliner_filter_min', min);
	localStorage.setItem('onliner_filter_max', max);
    
    console.log((min == "") + "|" + !!max);
    $(".ba-tbl-list__table > tbody > tr").each(function(){
        try{
            var descr = $("td.frst", this);
            var price = Number($(".cost big strong", this).text());
            var name = $(".wraptxt a", descr).text();         
            var hide = false;
            if (min && price < min)
                hide = true;
            if (max && max < price)
                hide = true;
            if (hide)
                $(this).hide();
            else
                $(this).show();
            console.log(name + " = " + price + "| hide = " + hide);
        }catch(e){}
    });
}

$(".b-mnforum-search")
	.append($("<div/>").text("Минимальная цена"))
	.append(minPriceInput)
	.append($("<div/>").text("Максимальная цена"))
	.append(maxPriceInput)
	.append($("button").click(filterFunc).text("Filter"));

filterFunc();
