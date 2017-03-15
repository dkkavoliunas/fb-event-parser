#### Purpose

Scrape fb events of your friends and see all of them in one place!

#### Usage

* Download script
* In `peofiles` section add urls to your friends' fb events pages, e.g.

```
var profiles= 
[
"https://www.facebook.com/xxxxxxxxx/events",
"https://www.facebook.com/yyyyyyyyy/events",
"https://www.facebook.com/zzzzzzzzzz/events"
];
```

* Set `date` until which to show events, default is set to current day + week
```
date = new Date(date.setDate(date.getDate() + 7))
```
* In your browser install `jQuery` injector, for Chrome [https://chrome.google.com/webstore/detail/jquerify/gbmifchmngifmadobkcpijhhldeeelkc]

* Open Facebook, inject jQuery, copy paste script into the console window. Wait
