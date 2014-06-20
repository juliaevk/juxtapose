// smoothScroll.init({
//     offset: 50
// });


var stepOnePreview;
var stepTwoPreview;
var stepOneData;
var stepTwoData;

function imageDataFromForm() {
    return [
        { 
            src: $("#before-src").val(),
            label: $("#before-label").val(),
            credit: $("#before-credit").val()
        },
        { 
            src: $("#after-src").val(),
            label: $("#after-label").val(),
            credit: $("#after-credit").val()
        }
    ];
}

function optionsFromForm() {
    var pos = $("#starting-position").val();
    if (pos === '') {
        pos = '50';
    }
    try {
        var test = parseInt(pos);
    } catch(e) {
        console.log('invalid position');
        pos = '50';
    }
    return {
        animate: $("#animate").prop('checked'),
        showLabels: $("#show-labels").prop('checked'),
        showCredits: $("#show-credits").prop('checked'),
        startingPosition: pos
    }
}

function createSliderFromForm() {
    $("#create-slider-preview").html('');
    window.slider_preview = new juxtapose.JXSlider("#create-slider-preview", imageDataFromForm(), optionsFromForm());
    updateEmbedCode();
}
$("#update-preview").click(createSliderFromForm);

function imageTagForObject(o) {
    return '<img src="' + o.src 
    + '" data-label="'
    + o.label
    + '" data-credit="'
    + o.credit
    + '">';
}

function updateEmbedCode() {
    var imgs = imageDataFromForm();
    var opts = optionsFromForm();
    /*
            animate: w.getAttribute('data-animate'),
            showLabels: w.getAttribute('data-showlabels'),
            showCredits: w.getAttribute('data-showcredits'),
            startingPosition: w.getAttribute('data-startingposition')

    */
    code =  '<div class="juxtapose" data-startingposition="' 
                + opts.startingPosition 
                + '" data-showlabels="'
                + opts.showLabels
                + '" data-showcredits="'
                + opts.showCredits
                +'" data-animate="'
                + opts.animate
                +'">\n' 
                + imageTagForObject(imgs[0])
                + '\n' 
                + imageTagForObject(imgs[1])
                +'\n' 
            + '</div>'

    $('#embed-code').text(code);
}

$('a.help').popover({
    trigger: 'manual'
}).click(function(event) {
    if(!$(this).next().hasClass('popover')) {
        $('a.help').not(this).popover('hide');
    }     
    $(this).popover('toggle');
    event.stopPropagation();
});

$(document).click(function(e) {
    $('a.help').popover('hide');
});


$("#authoring-form input.auto-update").change(function(evt) {
    createSliderFromForm();
})

$("#authoring-form input#starting-position").change(function(evt) {
    try {
        var value = parseInt($(evt.target).val());
        if (value < 0 || value > 100) {
            evt.preventDefault();
        } else {
            slider_preview.updateSlider(value,false);
        }
    } catch(e) {
        evt.preventDefault();
    }

    console.log(value);
    console.log(typeof(value));
})

$("#use-current-position").click(function(){
    var pos = slider_preview.getPosition();
    pos = pos.replace('%','').split('.')[0];
    $("#starting-position").val(pos);
    updateEmbedCode();
});

createSliderFromForm();