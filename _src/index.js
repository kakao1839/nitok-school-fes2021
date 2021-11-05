window.addEventListener("load", function () {
    const optDateUtc = document.documentElement.getAttribute("data-target-date-utc"), endDate = new Date(optDateUtc),
        interval = 1e3;
    document.querySelector(".js-countdown") && function countdownTimer() {
        var nowDate = new Date, jisa = nowDate.getTimezoneOffset(), period = endDate - nowDate - 6e4 * jisa,
            addZero = function (n) {
                return ("0" + n).slice(-2)
            };
        if (period >= 0) {
            var day = Math.floor(period / 864e5);
            period -= 864e5 * day;
            var hour = Math.floor(period / 36e5);
            period -= 36e5 * hour;
            var minute = Math.floor(period / 6e4);
            period -= 6e4 * minute;
            var second = Math.floor(period / 1e3);
            document.querySelector(".js-countdown-days").textContent = ("00" + day).slice(-3), document.querySelector(".js-countdown-hours").textContent = addZero(hour), document.querySelector(".js-countdown-mins").textContent = addZero(minute), document.querySelector(".js-countdown-secs").textContent = addZero(second), document.querySelector(".js-label-days").textContent = day > 1 ? "Days" : "Day", document.querySelector(".js-label-hours").textContent = hour > 1 ? "Hrs" : "Hr", document.querySelector(".js-label-mins").textContent = minute > 1 ? "Mins" : "Min", document.querySelector(".js-label-secs").textContent = second > 1 ? "Secs" : "Sec", setTimeout(countdownTimer, interval)
        } else document.querySelector(".js-countdown-days").textContent = "000", document.querySelector(".js-countdown-hours").textContent = "00", document.querySelector(".js-countdown-mins").textContent = "00", document.querySelector(".js-countdown-secs").textContent = "00"
    }()
}), window.addEventListener("load", function () {
    const banner = document.querySelector(".js-prebuild"), toggleBtn = document.querySelector(".js-prebuild-toggle");
    banner && toggleBtn.addEventListener("click", function () {
        banner.classList.toggle("is-minimize")
    })
});
