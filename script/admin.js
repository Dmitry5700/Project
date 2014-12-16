
function btnAddClick(e)
{
    
    var lessonTitle = $('.inp-add-lesson');
    

    if (lessonTitle.val().trim() != '') {

        $('#divContentLesson').append('<div class=\"div-title-lesson\">' + lessonTitle.val() + '</div>');
        $('.inp-add-lesson').val('').css('display', 'none').fadeIn();

    }
    else {
        lessonTitle.css('background-color', 'aliceblue').focus();
        setTimeout(function () { lessonTitle.css('background-color', 'white') }, 3000);
    }

}






function ClearValues()
{

   $('.inp-add-lesson').val('');
  


}


