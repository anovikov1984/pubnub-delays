var pubnub = PUBNUB.init({
    publish_key: "pub-c-8ef7e630-2aff-4a02-9225-843942a32ef7",
    subscribe_key: "sub-c-0675159c-d4c6-11e5-a9b2-02ee2ddab7fe"
});


$(function () {
    var delayTemplate = _.template($("#delay-template").html()),
        table         = $("#results");

    pubnub.history({
        channel: 'logs-history',
        count: 3,
        callback: function (delays) {
            delays[0].forEach(insertDelay);
            pubnub.subscribe({
                channel: 'logs-history',
                connect: function () {
                },
                message: insertDelay
            });
        }
    });

    function insertDelay(msg) {
        table.append(delayTemplate(msg));
    }
});
