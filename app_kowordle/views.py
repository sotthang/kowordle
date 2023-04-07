from django.shortcuts import render

# Create your views here.
def kowordle(request):
    answer_word = '공인'
    description = '공적인 일에 종사하는 사람'

    context = {
        'answer_word': answer_word,
        'description': description,
    }
    return render(request, 'kowordle_web.html', context)
    