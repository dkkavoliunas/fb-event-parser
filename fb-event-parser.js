var profiles= 
[

];

var events = []

$.each(profiles, function(index, p) {
    	$.get( p, function( data ) {
		data =  data.replace("<!--","").replace(/(<!--)|(-->)/g," ")
        
		$.each($(data).find("li._153g ._4eq1 ._gx8"), function(index, item) {
                var link = 'https://www.facebook.com' + $(item).attr("href").split('?')[0];

                $.get(link, function( data ) {
                    data =  data.replace("<!--","").replace(/(<!--)|(-->)/g," ")

                    var div = $(data).find("div._5xhk")[0]   

                    var spans = $(div).find("span") //spanai
                
                    if(spans.length == 4){
                        events.push(
                        {
                            link: link,
                            date: new Date($($(data).find("._5xhk")[0]).attr("content").split(" to ")[0]),
                            time: spans[2].innerHTML + ' - '+ spans[3].innerHTML,
                            title: $(data).find("._5v1l")[0] == undefined ? $($(data).find("._5gmw")[0]).find("span")[0].innerHTML : $($(data).find("._5v1l")[0]).find('a')[0].innerHTML,
                            profiles: [p]
                        })

                        console.log("parsed span 4")
                    }
                    else if(spans.length == 3){
                        events.push(
                        {
                            link: link,
                            date: new Date($($(data).find("._5xhk")[0]).attr("content").split(" to ")[0]),
                            time: spans[2].innerHTML,
                            title: $(data).find("._5v1l")[0] == undefined ? $($(data).find("._5gmw")[0]).find("span")[0].innerHTML : $($(data).find("._5v1l")[0]).find('a')[0].innerHTML,
                            profiles: [p]
                        })

                        console.log("parsed span 3")
                    }
                    else if(spans.length == 2){
                        events.push(
                        {
                            link: link,
                            date: new Date($($(data).find("._5xhk")[0]).attr("content").split(" to ")[0]),
                            time: $($(data).find("div._5xhp")[0]).find("span")[0].innerHTML,
                            title: $(data).find("._5v1l")[0] == undefined ? $($(data).find("._5gmw")[0]).find("span")[0].innerHTML : $($(data).find("._5v1l")[0]).find('a')[0].innerHTML,
                            profiles: [p]
                        })

                        console.log("parsed span 2")
                    }
                    else{
                        console.log("failed to parse")
                        console.log(link)
                    }
                });
		});
	});
});



setTimeout(function(){ 
    events.sort(function(a, b){return a.date - b.date})
    
    var filteredEvents = []

    for(var i=0;i<events.length;i++){
        var ev = getFilteredEvent(filteredEvents, events[i].link)

        if(ev == null){
            filteredEvents.push(events[i])
        }
        else{
            ev.profiles = ev.profiles.concat(events[i].profiles)
        }
    }

    var date = new Date()
    date = new Date(date.setDate(date.getDate() + 7))

    $.each(filteredEvents, function(index, e) {
        
            if(e.date > date)
                return;  

            console.log(e.date); 
            console.log(e.time); 
            console.log(e.title); 
            console.log(e.link); 
            console.log(e.profiles); 
            console.log(""); 

            //window.open(e.link, '_blank');
    })

}, 100000);

function getFilteredEvent(events, link){
    for(var i=0;i<events.length;i++){
        if(events[i].link == link)
            return events[i]
    }

    return null;
}