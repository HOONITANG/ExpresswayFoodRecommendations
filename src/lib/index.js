export default lib = function() {
      // 라스트 
      String.prototype.splitLast = function(sp) {
        var rtnArray = new Array();
        var lastIndex = this.lastIndexOf(sp);
        var firstString = "", secondString = "";

        if (lastIndex > 0) {
            firstString = this.substring(0, lastIndex);
            secondString = this.substring(lastIndex + sp.length, this.length);
        } else {
            firstString = this.toString();
        }
        rtnArray.push(firstString);
        if (secondString != "")
            rtnArray.push(secondString);

        return rtnArray;

    }

    Date.prototype.format = function(f) {
        if (!this.valueOf()) return " ";
    
        var weekName = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
        var d = this;
    
        // replace callback
        return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
            switch ($1) {
                case "yyyy": return d.getFullYear();
                case "yy": return (d.getFullYear() % 1000).zf(2);
                case "MM": return (d.getMonth() + 1).zf(2);
                case "dd": return d.getDate().zf(2);
                case "E": return weekName[d.getDay()];
                case "HH": return d.getHours().zf(2);
                case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
                case "mm": return d.getMinutes().zf(2);
                case "ss": return d.getSeconds().zf(2);
                case "a/p": return d.getHours() < 12 ? "오전" : "오후";
                default: return $1;
            }
        });
    };
    
    String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
    String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
    Number.prototype.zf = function(len){return this.toString().zf(len);};

    return {  
        test: function (a, b) {
            // something...
        },
        percentage: { 
            progressCalculate: function (n1, n2) {
                // n1: proceedDays
                // n2: totalDays
                const diff = (n1 / n2);
                const MAX_BAR = 1.0;
                let barStatus = MAX_BAR - diff;
                return  Number(barStatus.toFixed(2));
            }
        },
        date: {
            dateDiff: {
                inMinute: function (d1, d2) {
                    let t2 = d2.getTime();
                    let t1 = d1.getTime();
            
                    return parseInt((t2 - t1) / 1000 / 60)
                },
                inHours: function (d1, d2) {
                    let t2 = d2.getTime();
                    let t1 = d1.getTime();
            
                    return parseInt((t2 - t1) / 1000 / 60 / 60)
                },
                inDays: function (d1, d2) {
                    let t2 = d2.getTime();
                    let t1 = d1.getTime();
                
                    return Math.round((t2 - t1) / (24 * 3600 * 1000));
                },
                inWeeks: function (d1, d2) {
                    let t2 = d2.getTime();
                    let t1 = d1.getTime();
            
                    return parseInt((t2 - t1) / (24 * 3600 * 1000 * 7));
                },
                inMonths: function (d1, d2) {
                    let d1Y = d1.getFullYear();
                    let d2Y = d2.getFullYear();
                    let d1M = d1.getMonth();
                    let d2M = d2.getMonth();
            
                    return (d2M + 12 * d2Y) - (d1M + 12 * d1Y);
                },
                inYears: function (d1, d2) {
                    return d2.getFullYear() - d1.getFullYear();
                },
            },
            dateSplit: function(str, ch) {
                let words="";
                if (str != null && str != "") {
                    words = str.split(ch);
                }
                return words;
            }
        }
    }

}();