    $(document).ready(function() {
        $(".ap_tabbed_menu a").click(function(event) {
            event.preventDefault();
            $(this).parent().addClass("ap_current");
            $(this).parent().siblings().removeClass("ap_current");
            var ap_tabs = $(this).attr("href");
            $(".ap_tabbed_content").not(ap_tabs).css("display", "none");
            $(ap_tabs).fadeIn();
        });

        $(".ap_template_menu a").click(function(event) {
            event.preventDefault();
            $(this).parent().addClass("ap_current");
            $(this).parent().siblings().removeClass("ap_current");
            var ap_template_tabs = $(this).attr("href");
            $(".ap_template_content").not(ap_template_tabs).css("display", "none");
            $(ap_template_tabs).fadeIn();
        });

         $(".ap_images_menu a").click(function(event) {
            event.preventDefault();
            $(this).parent().addClass("ap_current");
            $(this).parent().siblings().removeClass("ap_current");
            var ap_template_tabs = $(this).attr("href");
            $(".ap_images_content").not(ap_template_tabs).css("display", "none");
            $(ap_template_tabs).fadeIn();
        });

        $(".ap_vmenu a").click(function(event) {
            event.preventDefault();
            $(this).parent().addClass("ap_current");
            $(this).parent().siblings().removeClass("ap_current");
            var ap_template_tabs = $(this).attr("href");
            $(".ap_vmenu_content").not(ap_template_tabs).css("display", "none");
            $(ap_template_tabs).fadeIn();
        });


        $(".ap_barcode_menu a").click(function(event) {
            event.preventDefault();
            $(this).parent().addClass("ap_current");
            $(this).parent().siblings().removeClass("ap_current");
            var ap_tabs = $(this).attr("href");
            $(".ap_barcode_content").not(ap_tabs).css("display", "none");
            $(ap_tabs).fadeIn();
        });

    });


    /************section-1*******************/
var leftPanel = document.getElementById("ap_section_one");
var height = leftPanel.offsetHeight;
var newHeight = height - 50;
leftPanel.style.height = newHeight + 'px';

/************section-1 products-list*******************/
var itemsList = document.getElementById("ap_products_list");
var newHeight = leftPanel.offsetHeight - 371 ;
itemsList.style.height = newHeight + 'px';

/************section-1 templates-list*******************/
var itemsList = document.getElementById("ap_templates_list");
var newHeight = leftPanel.offsetHeight - 360 ;
itemsList.style.height = newHeight + 'px';

/************section-1 templates-list*******************/
var itemsList = document.getElementById("ap_templates_list_new");
var newHeight = leftPanel.offsetHeight - 360 ;
itemsList.style.height = newHeight + 'px';

/************section-1 design-list*******************/
var itemsList = document.getElementById("ap_design_list");
var newHeight = leftPanel.offsetHeight - 371 ;
itemsList.style.height = newHeight + 'px';

/************section-2*******************/
var middlePanel = document.getElementById("ap_work_space_id");
var height = middlePanel.offsetHeight;
var newHeight = height - 50;
middlePanel.style.height = newHeight + 'px';

/************section-2 t-shirt bg*******************/
var itemsList = document.getElementById("ap_product_image");
var newHeight = leftPanel.offsetHeight - 208 ;
//itemsList.style.height = newHeight + 'px';

/************section-3*******************/
var rightPanel = document.getElementById("ap_layers_right");
var height = rightPanel.offsetHeight;
var newHeight = height - 50;
rightPanel.style.height = newHeight + 'px';

/********************section-3 pattern images************/
var newHeight = leftPanel.offsetHeight - 485 ;
document.getElementById("ap_pattern_images_list").style.height = newHeight + 'px';

/********************section-3 gallery images************/
var newHeight = leftPanel.offsetHeight - 533 ;
document.getElementById("ap_gallery_list").style.height = newHeight + 'px';

/********************section-3 gallery images************/
var newHeight = leftPanel.offsetHeight - 389 ;
document.getElementById("ap_fonts_list").style.height = newHeight + 'px';

/************onclick for color-picker*******************/
var accItem = document.getElementsByClassName('ap_accordionItem');
var accHD = document.getElementsByClassName('ap_accordionItemHeading');
for (i = 0; i < accHD.length; i++) {
    accHD[i].addEventListener('click', toggleItem, false);
}

function toggleItem() {
    var itemClass = this.parentNode.className;
    for (i = 0; i < accItem.length; i++) {
        accItem[i].className = 'ap_accordionItem close';

        var newHeight = leftPanel.offsetHeight - 371;
        document.getElementById("ap_products_list").style.height = newHeight + 'px';

        var designHeight = leftPanel.offsetHeight - 371 ;
        console.log(designHeight);
        document.getElementById("ap_design_list").style.height = designHeight + 'px';
    }
    if (itemClass == 'ap_accordionItem close') {
        this.parentNode.className = 'ap_accordionItem open';

        var newHeight = leftPanel.offsetHeight - 523;
        document.getElementById("ap_products_list").style.height = newHeight + 'px';

        var designHeight = leftPanel.offsetHeight - 579 ;
        document.getElementById("ap_design_list").style.height = designHeight + 'px';
        }
}