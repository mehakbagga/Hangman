$(document).ready(function() {

    let img_src=["hangman1.jpg","hangman2.jpg","hangman3.jpg","hangman4.jpg","hangman5.jpg","hangman6.jpg"]
    let words=["ANTIQUE","JEWELLERY","RELAY","CLEAN","VERDICT", "PHOTOGRAPH","KEYBOARD","PENGUIN","BOOMBOX","RINSE","KILOMETER","YARD","BUCKET","RANDOM","DOOMED","BRANCH"]

    const keySound = () => new Audio(`sounds/vintage-keyboard-1.wav`)
    const wrongSound = () => new Audio(`sounds/wrong.mp3`)
    const winner = ()=>new Audio("sounds/applause.wav"); 
    const loser = ()=>new Audio("sounds/scream.wav");
    let tries=0; player_score=0; lost_score = 0;counter=0;
    let word_array=[],  guessed_letter=[], found_letter=[];
    let word;
    const new_game=()=>{
        
        tries=0
        found_letter=[]; word_array=[]
        counter+=1
        guessed_letter.splice(0, guessed_letter.length);
        $("img").attr("src","images/hangman.jpg")
        $(".dashes").children().html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")
        $(".alph").removeClass("highlight")
        $(".won").html(`You won: ${player_score}`)
        $(".lost").html(`You lost: ${lost_score}`)
        word=words[Math.floor(Math.random()*words.length)]
        word_array= word.split("")
        if (word_array.length>0){
            for(let i=0; i<word_array.length; i++){
                $(".dashes").append(`<div id='dash' class='dash_${i}'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>`)
            }   
        }
        return true
    }

    const initiate=(key)=>{
        if (word_array.includes(key)&& !found_letter.includes(key)){
            keySound().play()
            let ind=[];
            let word_count=0;

            for(let i=0; i<word_array.length; i++){
                if(key==word_array[i]){
                    ind.push(i)
                }
            }
            word_count=word_count+ind.length
            ind.forEach(id=>{
                found_letter[id]=key
                    let c_dash=".dash_"+id 
                        $(c_dash).html("&nbsp;&nbsp;&nbsp;"+found_letter[id]+"&nbsp;&nbsp;")  
            })    
            if(found_letter.length ===word_array.length && (!found_letter.includes(undefined))){
                winner().play()
                player_score+=1;
                // guessed_letter=[]
                setTimeout(()=>{
                    if(confirm("Congratulations! you win!")){
                        $(".dashes #dash").each(function(){
                            $("#dash").remove()
                        })
                        new_game()
                    }
                }, 200)}
        }

        else if(tries<6 && !word_array.includes(key)){
                let source="images/"+img_src[tries]
                $("img").attr("src",source)
                tries++
                wrongSound().play()
            }

           
        if(tries===6){
            loser().play()
            lost_score+=1;
            // guessed_letter=[]
            setTimeout(()=>{
                if(confirm(`Better luck next time... The word is ${word}`)){
                    $(".dashes #dash").each(function(){
                        $("#dash").remove()
                    })  
                    new_game()
                }
            }, 200)}
    }
    if(new_game()){

        $(".alph").on("click", event=>{
            let letter_event=$(event.currentTarget)
            let letter=letter_event.html()
            letter_event.addClass("highlight")
            if(!guessed_letter.includes(letter)){
                keySound().play()
                initiate(letter) 
                guessed_letter.push(letter)
            }
            else{
                letter_event.addClass("selected")
            }
             
            
        })   
        $(this).keypress(e=>{
            let key=e.key.toUpperCase()
            $(`.${e.key}`).addClass("highlight")
            if(!guessed_letter.includes(key)){
                keySound().play()
                initiate(key) 
                guessed_letter.push(key)
            }
            else{
                $(`.${e.key}`).addClass("selected")
            }
        })
    }

    $(".Reset").on("click", event=>{
        player_score =0;
        lost_score =0;
        $(".dashes #dash").each(function(){
            $("#dash").remove()
        })  
        new_game();
    })
});