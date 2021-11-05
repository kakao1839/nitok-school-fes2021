/*@license
 *
 * Kitekure:
 *   licenses: MIT
 *   Copyright (c) 2021 sanographix
 *   https://github.com/sanographix/kitekure
 * CSV.js:
 *   licenses: MIT
 *   Copyright (c) 2014 Kash Nouroozi
 *   https://github.com/knrz/CSV.js
 */
function csv_data(dataPath) {
    const request = new XMLHttpRequest;
    request.addEventListener("load", event => {
        csv_array(event.target.responseText)
    }), request.open("GET", dataPath, !0), request.send()
}

function csv_array(data) {
    const array = new CSV(data, {
        header: ["option", "value1", "value2", "value3", "value4", "value5", "required", "description"],
        cast: !1
    }).parse();
    console.log(array);
    const optEventTitle = array.filter(value => "Event Title" === value.option),
        optEventDate = array.filter(value => "Date (Local Time)" === value.option),
        valEventTitle = optEventTitle[0].value1, valEventDate = optEventDate[0].value1,
        encodedEventTitle = encodeURIComponent(valEventTitle),
        siteTitle = new String(valEventTitle + " | " + valEventDate), encodedSiteTitle = encodeURIComponent(siteTitle);
    document.title = siteTitle;
    const siteUrl = `${location.protocol}//${location.hostname}/`;
    try {
        const valFavicon = array.filter(value => "Site Icon (favicon)" === value.option)[0].value1;
        document.getElementById("favicon").href = valFavicon
    } catch (error) {
        console.error("Error: favicon")
    }
    const valOgImage = array.filter(value => "Share Image" === value.option)[0].value1,
        optIntroduction = array.filter(value => "Introduction" === value.option),
        valIntroduction = optIntroduction[0].value1;
    try {
        const OGP = [{property: "og:description", content: valIntroduction}, {
            property: "og:title",
            content: siteTitle
        }, {property: "og:url", content: siteUrl}, {
            name: "og:image",
            content: siteUrl + valOgImage
        }, {name: "twitter:title", content: siteTitle}, {
            name: "twitter:description",
            content: valIntroduction
        }, {name: "twitter:image", content: siteUrl + valOgImage}];
        for (let i = 0; i < OGP.length; i++) {
            const metaTag = document.createElement("meta");
            for (let prop in OGP[i]) metaTag.setAttribute(prop, OGP[i][prop]);
            document.head.appendChild(metaTag)
        }
    } catch (error) {
        console.error("Error: OGP")
    }
    try {
        if ("✅" == array.filter(value => "Hide on Search Results" === value.option)[0].value1) {
            const metaRobots = document.createElement("meta");
            metaRobots.setAttribute("name", "robots"), metaRobots.setAttribute("content", "noindex"), document.head.appendChild(metaRobots)
        }
    } catch (error) {
        console.error("Error: meta-noindex")
    }
    const valDateUtc = array.filter(value => "Date (UTC)" === value.option)[0].value1;
    document.documentElement.setAttribute("data-target-date-utc", valDateUtc), "" == valDateUtc && document.querySelector(".js-countdown").remove();
    try {
        const valTheme = array.filter(value => "Theme" === value.option)[0].value1;
        document.documentElement.setAttribute("data-theme", valTheme)
    } catch (error) {
        console.error("Error: theme")
    }
    try {
        const valAccentColor = array.filter(value => "Accent Color (Hex)" === value.option)[0].value1;
        if ("" != valAccentColor) {
            switch (document.head.insertAdjacentHTML("beforeend", "<style>:root{--color-primary:" + valAccentColor + "}</style>"), document.documentElement.setAttribute("data-accent-color", valAccentColor), document.getElementById("meta-theme-color").content = valAccentColor, hexcolor = valAccentColor, (299 * parseInt(hexcolor.substr(1, 2), 16) + 587 * parseInt(hexcolor.substr(3, 2), 16) + 114 * parseInt(hexcolor.substr(5, 2), 16)) / 1e3 < 128 ? "white" : "black") {
                case"black":
                    document.head.insertAdjacentHTML("beforeend", "<style>:root{--color-btn-primary-text: var(--color-black)}</style>");
                    break;
                case"white":
                    document.head.insertAdjacentHTML("beforeend", "<style>:root{--color-btn-primary-text: var(--color-white)}</style>")
            }
        }
    } catch (error) {
        console.error("Error: accent-color")
    }
    var hexcolor;
    try {
        const domHeaderVideo = document.querySelector(".js-header-video"),
            domHeaderImage = document.querySelector(".js-header-image"),
            optHeader = array.filter(value => "Header" === value.option), optHeaderType = optHeader[0].value1,
            optHeaderSrc = optHeader[0].value2;
        switch (optHeaderType) {
            case"Video":
                domHeaderVideo.setAttribute("src", optHeaderSrc), domHeaderImage.remove();
                break;
            case"Image":
                domHeaderImage.setAttribute("src", optHeaderSrc), domHeaderVideo.remove();
                break;
            default:
                domHeaderVideo.remove(), domHeaderImage.remove()
        }
    } catch (error) {
        console.error("Error: header")
    }
    try {
        const domTitle = document.querySelector(".js-title");
        domTitle.textContent = valEventTitle, valEventTitle.length > 20 && domTitle.classList.add("is-string-count-long")
    } catch (error) {
        console.error("Error: header title")
    }
    try {
        if ("✅" == array.filter(value => "Reverse Title Color on Image" === value.option)[0].value1) {
            document.querySelector(".js-title").classList.toggle("is-reverse-color")
        }
    } catch (error) {
        console.error("Error: Reverse title color")
    }
    try {
        const domHeaderSubtitleWrap = document.querySelector(".js-header-subtitle-wrap"),
            domHeaderSubtitle = document.querySelector(".js-header-subtitle"),
            optHeaderSubtitle = array.filter(value => "Header Subtitle" === value.option);
        for (let i = 0; i < optHeaderSubtitle.length; i++) {
            const domHeaderSubtitleClone = domHeaderSubtitle.cloneNode(!0);
            domHeaderSubtitleClone.textContent = optHeaderSubtitle[i].value1, domHeaderSubtitleWrap.appendChild(domHeaderSubtitleClone)
        }
        domHeaderSubtitle.remove(), "" == optHeaderSubtitle[0].value1 && domHeaderSubtitleWrap.remove()
    } catch (error) {
        console.error("Error: Header subtitle")
    }
    try {
        const domActionButton = document.querySelector(".js-action-button"),
            optActionButton = array.filter(value => "Action Button" === value.option),
            valActionButtonLabel = optActionButton[0].value1, valActionButtonUrl = optActionButton[0].value2;
        domActionButton.textContent = valActionButtonLabel, domActionButton.setAttribute("href", valActionButtonUrl), "" == valActionButtonLabel && domActionButton.remove()
    } catch (error) {
        console.error("Error: Action button")
    }
    try {
        const domCalloutWrap = document.querySelector(".js-callout-wrap"),
            domCallout = document.querySelector(".js-callout"),
            optCallout = array.filter(value => "Callout" === value.option);
        for (let i = 0; i < optCallout.length; i++) {
            const domCalloutClone = domCallout.cloneNode(!0);
            domCalloutClone.textContent = optCallout[i].value1, domCalloutWrap.appendChild(domCalloutClone)
        }
        domCallout.remove(), "" == optCallout[0].value1 && domCalloutWrap.remove()
    } catch (error) {
        console.error("Error: callout")
    }
    try {
        const domStreamPlayer = document.querySelector(".js-stream-player"),
            optStream = array.filter(value => "Stream" === value.option), valStreamService = optStream[0].value1,
            valStreamChannel = optStream[0].value2;
        switch (valStreamService) {
            case"Twitch":
                domStreamPlayer.setAttribute("src", "https://player.twitch.tv/?channel=" + valStreamChannel + "&parent=" + location.hostname), document.getElementById("youtube-embed").remove();
                break;
            case"Youtube Live":
                domStreamPlayer.setAttribute("src", "https://www.youtube.com/embed/" + valStreamChannel), document.getElementById("twitch-embed").remove();
                break;
            default:
                domStreamPlayer.remove()
        }
        "" == valStreamChannel && document.querySelector(".js-stream").remove()
    } catch (error) {
        console.error("Error: Stream")
    }
    try {
        const domShareTwitter = document.querySelector(".js-share-tw"),
            domShareFacebook = document.querySelector(".js-share-fb"),
            twitterLink = "https://twitter.com/share?text=" + encodedSiteTitle + "&url=" + siteUrl;
        domShareTwitter.setAttribute("href", twitterLink);
        const facebookLink = "http://www.facebook.com/sharer.php?u=" + siteUrl;
        domShareFacebook.setAttribute("href", facebookLink)
    } catch (error) {
        console.error("Error: Share buttons")
    }
    try {
        const addCalendarBtn = document.querySelector(".js-add-google-calendar");
        if ("" == valDateUtc) addCalendarBtn.remove(); else {
            const utcDate = new Date(valDateUtc),
                googleCalendarUrl = "https://www.google.com/calendar/event?action=TEMPLATE",
                calDate = utcDate.getFullYear() + "" + ("0" + (utcDate.getMonth() + 1)).slice(-2) + ("0" + utcDate.getDate()).slice(-2) + "T" + ("0" + utcDate.getHours()).slice(-2) + ("0" + utcDate.getMinutes()).slice(-2) + ("0" + utcDate.getSeconds()).slice(-2) + "Z",
                calLink = googleCalendarUrl + "&text=" + encodedEventTitle + "&details=" + siteUrl + "&dates=" + calDate + "/" + calDate;
            addCalendarBtn.setAttribute("href", calLink)
        }
    } catch (error) {
        console.error("Error: Google calendar")
    }
    try {
        const domIntroductionHeading = document.querySelector(".js-introduction-heading"),
            valIntroductionHeading = array.filter(value => "Introduction Heading" === value.option)[0].value1;
        domIntroductionHeading.textContent = valIntroductionHeading, document.querySelector(".js-nav-link-about").textContent = valIntroductionHeading
    } catch (error) {
        console.error("Error: Introduction heading")
    }
    try {
        const domIntroductionWrap = document.querySelector(".js-introduction-wrap"),
            domIntroduction = document.querySelector(".js-introduction");
        for (let i = 0; i < optIntroduction.length; i++) {
            const domIntroductionClone = domIntroduction.cloneNode(!0);
            domIntroductionClone.textContent = optIntroduction[i].value1, domIntroductionWrap.appendChild(domIntroductionClone)
        }
        domIntroduction.remove()
    } catch (error) {
        console.error("Error: Introduction")
    }
    try {
        const domScheduleHeading = document.querySelector(".js-schedule-heading"),
            valScheduleHeading = array.filter(value => "Schedule Heading" === value.option)[0].value1;
        domScheduleHeading.textContent = valScheduleHeading, document.querySelector(".js-nav-link-schedule").textContent = valScheduleHeading
    } catch (error) {
        console.error("Error: Schedule heading")
    }
    try {
        const domScheduleWrap = document.querySelector(".js-schedule-wrap"),
            domSchedule = document.querySelector(".js-schedule"),
            optSchedule = array.filter(value => "Schedule" === value.option);
        for (let i = 0; i < optSchedule.length; i++) {
            const domScheduleClone = domSchedule.cloneNode(!0);
            domScheduleClone.querySelector(".js-schedule-time").textContent = optSchedule[i].value1, domScheduleClone.querySelector(".js-schedule-name").textContent = optSchedule[i].value2, domScheduleClone.querySelector(".js-schedule-description").textContent = optSchedule[i].value3, domScheduleWrap.appendChild(domScheduleClone)
        }
        domSchedule.remove()
    } catch (error) {
        console.error("Error: Schedule")
    }
    try {
        const domMemberHeading = document.querySelector(".js-member-heading"),
            valMemberHeading = array.filter(value => "Member Heading" === value.option)[0].value1;
        domMemberHeading.textContent = valMemberHeading, document.querySelector(".js-nav-link-member").textContent = valMemberHeading
    } catch (error) {
        console.error("Error: Member heading")
    }
    try {
        const domMemberWrap = document.querySelector(".js-member-wrap"),
            domMember = document.querySelector(".js-member"),
            optMember = array.filter(value => "Member" === value.option);
        for (let i = 0; i < optMember.length; i++) {
            const domMemberClone = domMember.cloneNode(!0);
            domMemberClone.querySelector(".js-member-name").textContent = optMember[i].value1, domMemberClone.querySelector(".js-member-image").setAttribute("alt", optMember[i].value1), domMemberClone.querySelector(".js-member-image").setAttribute("src", optMember[i].value2), domMemberClone.querySelector(".js-member-profile").textContent = optMember[i].value4, "" != optMember[i].value3 ? domMemberClone.querySelector(".js-member-role").textContent = optMember[i].value3 : domMemberClone.querySelector(".js-member-role").remove(), "" != optMember[i].value5 ? domMemberClone.querySelector(".js-member-url").setAttribute("href", optMember[i].value5) : domMemberClone.querySelector(".js-member-link").remove(), domMemberWrap.appendChild(domMemberClone)
        }
        domMember.remove()
    } catch (error) {
        console.error("Error: Member")
    }
    const optEventVenueAddress = array.filter(value => "Address" === value.option);
    try {
        document.querySelector(".js-event-title").textContent = valEventTitle
    } catch (error) {
        console.error("Error: Overview event title")
    }
    try {
        document.querySelector(".js-event-date").textContent = valEventDate
    } catch (error) {
        console.error("Error: Overview date")
    }
    try {
        const domEventVenueLabel = document.querySelector(".js-event-venue-label"),
            domEventVenueContent = document.querySelector(".js-event-venue-content"),
            optEventVenue = array.filter(value => "Venue" === value.option);
        if (domEventVenueLabel && optEventVenue) {
            const valEventVenueHeading = optEventVenue[0].value1, valEventVenueTitle = optEventVenue[0].value2;
            domEventVenueLabel.textContent = valEventVenueHeading, domEventVenueContent.textContent = valEventVenueTitle
        }
    } catch (error) {
        console.error("Error: Overview venue")
    }
    try {
        const domEventVenueAddress = document.querySelector(".js-event-venue-address");
        if (domEventVenueAddress && optEventVenueAddress) {
            const valEventVenueAddress = optEventVenueAddress[0].value1;
            domEventVenueAddress.textContent = valEventVenueAddress
        } else domEventVenueAddress.remove()
    } catch (error) {
        console.error("Error: Overview address")
    }
    try {
        const domMap = document.querySelector(".js-event-venue-map");
        "" != optEventVenueAddress[0].value2 ? domMap.setAttribute("src", "https://www.google.com/maps/embed?pb=" + optEventVenueAddress[0].value2) : domMap.remove()
    } catch (error) {
        console.error("Error: Overview map")
    }
    try {
        const domOverview = document.querySelector(".js-overview"),
            domOverviewLabel = document.querySelector(".js-overview-label"),
            domOverviewContent = document.querySelector(".js-overview-content"),
            optOverview = array.filter(value => "Overview" === value.option);
        for (let i = 0; i < optOverview.length; i++) {
            const domOverviewLabelClone = domOverviewLabel.cloneNode(!0),
                domOverviewContentClone = domOverviewContent.cloneNode(!0);
            domOverviewLabelClone.textContent = optOverview[i].value1, domOverview.appendChild(domOverviewLabelClone), domOverviewContentClone.textContent = optOverview[i].value2, domOverview.appendChild(domOverviewContentClone)
        }
        domOverviewLabel.remove(), domOverviewContent.remove()
    } catch (error) {
        console.error("Error: Overview additional")
    }
    try {
        const domNoticeWrap = document.querySelector(".js-notice-wrap"),
            domNotice = document.querySelector(".js-notice"),
            optNotice = array.filter(value => "Notice" === value.option);
        for (let i = 0; i < optNotice.length; i++) {
            const domNoticeClone = domNotice.cloneNode(!0);
            domNoticeClone.textContent = optNotice[i].value1, domNoticeWrap.appendChild(domNoticeClone)
        }
        domNotice.remove()
    } catch (error) {
        console.error("Error: Notice")
    }
    document.querySelector(".js-footer-eventTitle").textContent = valEventTitle;
    try {
        const domFooterText = document.querySelector(".js-footer-text"),
            valFooterText = array.filter(value => "Footer Text" === value.option)[0].value1;
        "" != valFooterText ? domFooterText.textContent = valFooterText : domFooterText.remove()
    } catch (error) {
        console.error("Error: Footer text")
    }
    "?prebuild=true" === location.search && (document.querySelector(".js-prebuild").remove(), window.addEventListener("load", function () {
        let snapshot = (new XMLSerializer).serializeToString(document);
        snapshot = snapshot.replace('<script src="_src/preview.js"><\/script>', "");
        let blob = new Blob([snapshot], {type: "text/plan"}), link = document.createElement("a");
        link.href = URL.createObjectURL(blob), link.download = "index.html", link.click()
    }))
}

!function (t, e) {
    "function" == typeof define && define.amd ? define([], e) : "object" == typeof module && module.exports ? module.exports = e() : t.CSV = e()
}(this, function () {
    "use strict";

    function e(t) {
        return "string" == typeof t
    }

    function c(t, e) {
        return function (t) {
            return null != t
        }(t) ? t : e
    }

    function u(t, e) {
        for (var n = 0, i = t.length; i > n && !1 !== e(t[n], n); n += 1) ;
    }

    function s(t) {
        return t.replace(/"/g, '\\"')
    }

    function a(t) {
        return "attrs[" + t + "]"
    }

    function l(t, e) {
        return function (t) {
            return !isNaN(+t)
        }(t) ? "Number(" + a(e) + ")" : function (t) {
            return 0 == t || 1 == t
        }(t) ? "Boolean(" + a(e) + " == true)" : "String(" + a(e) + ")"
    }

    function f(t, n, i, r) {
        var o = [];
        return 3 == arguments.length ? (n ? g(n) ? u(i, function (i, r) {
            e(n[r]) ? n[r] = n[r].toLowerCase() : t[n[r]] = n[r], o.push("deserialize[cast[" + r + "]](" + a(r) + ")")
        }) : u(i, function (t, e) {
            o.push(l(t, e))
        }) : u(i, function (t, e) {
            o.push(a(e))
        }), o = "return [" + o.join(",") + "]") : (n ? g(n) ? u(i, function (i, c) {
            e(n[c]) ? n[c] = n[c].toLowerCase() : t[n[c]] = n[c], o.push('"' + s(r[c]) + '": deserialize[cast[' + c + "]](" + a(c) + ")")
        }) : u(i, function (t, e) {
            o.push('"' + s(r[e]) + '": ' + l(t, e))
        }) : u(i, function (t, e) {
            o.push('"' + s(r[e]) + '": ' + a(e))
        }), o = "return {" + o.join(",") + "}"), Function("attrs", "deserialize", "cast", o)
    }

    function h(t, e) {
        var n, i = 0;
        return u(e, function (e) {
            var r, o = e;
            -1 != p.indexOf(e) && (o = "\\" + o), (r = t.match(RegExp(o, "g"))) && r.length > i && (i = r.length, n = e)
        }), n || e[0]
    }

    var p = ["|", "^"], d = [",", ";", "  ", "|", "^"], m = ["\r\n", "\r", "\n"], g = Array.isArray || function (t) {
        return "[object Array]" === toString.call(t)
    }, y = function () {
        function n(t, n) {
            if (n || (n = {}), g(t)) this.mode = "encode"; else {
                if (!e(t)) throw Error("Incompatible format!");
                this.mode = "parse"
            }
            this.data = t, this.options = {header: c(n.header, !1), cast: c(n.cast, !0)};
            var i = n.lineDelimiter || n.line, r = n.cellDelimiter || n.delimiter;
            this.isParser() ? (this.options.lineDelimiter = i || h(this.data, m), this.options.cellDelimiter = r || h(this.data, d), this.data = function (t, e) {
                return t.slice(-e.length) != e && (t += e), t
            }(this.data, this.options.lineDelimiter)) : this.isEncoder() && (this.options.lineDelimiter = i || "\r\n", this.options.cellDelimiter = r || ",")
        }

        function i(t, e, n, i, r) {
            t(new e(n, i, r))
        }

        function s(n) {
            return g(n) ? "array" : function (t) {
                var e = typeof t;
                return "function" === e || "object" === e && !!t
            }(n) ? "object" : e(n) ? "string" : function (t) {
                return null == t
            }(n) ? "null" : "primitive"
        }

        return n.prototype.set = function (t, e) {
            return this.options[t] = e
        }, n.prototype.isParser = function () {
            return "parse" == this.mode
        }, n.prototype.isEncoder = function () {
            return "encode" == this.mode
        }, n.prototype.parse = function (t) {
            function e() {
                s = {escaped: !1, quote: !1, cell: !0}
            }

            function o(t) {
                m.line.push(s.escaped ? t.slice(1, -1).replace(/""/g, '"') : t), m.cell = "", e()
            }

            function c(t) {
                o(t.slice(0, 1 - p.lineDelimiter.length))
            }

            function u() {
                d ? g(d) ? (a = f(y, p.cast, m.line, d), (u = function () {
                    i(t, a, m.line, y, p.cast)
                })()) : d = m.line : (a || (a = f(y, p.cast, m.line)), (u = function () {
                    i(t, a, m.line, y, p.cast)
                })())
            }

            if ("parse" == this.mode) {
                if (0 === this.data.trim().length) return [];
                var s, a, l, h = this.data, p = this.options, d = p.header, m = {cell: "", line: []},
                    y = this.deserialize;
                t || (l = [], t = function (t) {
                    l.push(t)
                }), 1 == p.lineDelimiter.length && (c = o);
                var v, A, D, b = h.length, j = p.cellDelimiter.charCodeAt(0),
                    w = p.lineDelimiter.charCodeAt(p.lineDelimiter.length - 1);
                for (e(), v = 0, A = 0; b > v; v++) D = h.charCodeAt(v), s.cell && (s.cell = !1, 34 == D) ? s.escaped = !0 : s.escaped && 34 == D ? s.quote = !s.quote : (s.escaped && s.quote || !s.escaped) && (D == j ? (o(m.cell + h.slice(A, v)), A = v + 1) : D == w && (c(m.cell + h.slice(A, v)), A = v + 1, (m.line.length > 1 || "" !== m.line[0]) && u(), m.line = []));
                return l || this
            }
        }, n.prototype.deserialize = {
            string: function (t) {
                return t + ""
            }, number: function (t) {
                return +t
            }, boolean: function (t) {
                return !!t
            }
        }, n.prototype.serialize = {
            object: function (t) {
                var e = this, n = Object.keys(t), i = Array(n.length);
                return u(n, function (n, r) {
                    i[r] = e[s(t[n])](t[n])
                }), i
            }, array: function (t) {
                var e = this, n = Array(t.length);
                return u(t, function (t, i) {
                    n[i] = e[s(t)](t)
                }), n
            }, string: function (t) {
                return '"' + (t + "").replace(/"/g, '""') + '"'
            }, null: function () {
                return ""
            }, primitive: function (t) {
                return t
            }
        }, n.prototype.encode = function (t) {
            function n(t) {
                return t.join(c.cellDelimiter)
            }

            if ("encode" == this.mode) {
                if (0 == this.data.length) return "";
                var i, r, o = this.data, c = this.options, a = c.header, l = o[0], f = this.serialize, h = 0;
                t || (r = Array(o.length), t = function (t, e) {
                    r[e + h] = t
                }), a && (g(a) || (a = i = Object.keys(l)), t(n(f.array(a)), 0), h = 1);
                var p, d = s(l);
                return "array" == d ? (g(c.cast) ? (p = Array(c.cast.length), u(c.cast, function (t, n) {
                    e(t) ? p[n] = t.toLowerCase() : (p[n] = t, f[t] = t)
                })) : (p = Array(l.length), u(l, function (t, e) {
                    p[e] = s(t)
                })), u(o, function (e, i) {
                    var r = Array(p.length);
                    u(e, function (t, e) {
                        r[e] = f[p[e]](t)
                    }), t(n(r), i)
                })) : "object" == d && (i = Object.keys(l), g(c.cast) ? (p = Array(c.cast.length), u(c.cast, function (t, n) {
                    e(t) ? p[n] = t.toLowerCase() : (p[n] = t, f[t] = t)
                })) : (p = Array(i.length), u(i, function (t, e) {
                    p[e] = s(l[t])
                })), u(o, function (e, r) {
                    var o = Array(i.length);
                    u(i, function (t, n) {
                        o[n] = f[p[n]](e[t])
                    }), t(n(o), r)
                })), r ? r.join(c.lineDelimiter) : this
            }
        }, n.prototype.forEach = function (t) {
            return this[this.mode](t)
        }, n
    }();
    return y.parse = function (t, e) {
        return new y(t, e).parse()
    }, y.encode = function (t, e) {
        return new y(t, e).encode()
    }, y.forEach = function (t, e, n) {
        return 2 == arguments.length && (n = e), new y(t, e).forEach(n)
    }, y
}), csv_data("../config.csv");