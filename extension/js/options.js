// Saves options to chrome.storage
function save_options() {
    var header = document.getElementById('header').value;
    var date = document.getElementById('date').value;
    var footer = document.getElementById('footer').value;
    var currentDay = document.getElementById('currentDay').checked;


    var dateM = moment(date);
    if (dateM.isAfter(moment())) {
        alert("Date must be in the past!");
        return;
    }

    chrome.storage.sync.set({
        header: header,
        date: date,
        footer: footer,
        currentDay: currentDay
    }, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });
}

function restore_options() {

    chrome.storage.sync.get({
        header: "I am here ",
        date: "2016-01-01",
        footer: "days ",
        currentDay: true
    }, function (obj) {
        console.log(obj);
        document.getElementById('header').value = obj.header;
        document.getElementById('date').value = moment(obj.date).format("YYYY-MM-DD");
        document.getElementById('footer').value = obj.footer;
        document.getElementById('currentDay').checked = obj.currentDay;
    });

}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
