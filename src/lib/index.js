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
        price : {
            comma : function(price) {
                return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }
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
        },
        helper: {
            rad : function (x) {
                return ( x * Math.PI ) / 180;
            },
            getDistance: function (p1, p2) {
                // latitude : yValue
                // longditude: xValue
                const R = 6378; // Earth’s mean radius in meter 6378137
                const dLat = this.rad(p2.yValue - p1.latitude);
                const dLong = this.rad(p2.xValue - p1.longitude);
                
                const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + 
                Math.cos(this.rad(p1.latitude)) * Math.cos(this.rad(p2.yValue)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                const d = R * c;
                return parseInt(d); // returns the distance in meter
            },
            nearPoints: function (arr, p1) { //p1 => 내위치
                // 위치 속성 삽입
                return arr.map((rows) => {
                    return { ...rows, nearPoint: this.getDistance(p1, rows)}
                })
            },
            orderBynearPointList: function(arr, p1) { //p1 => 내위치
                // 위치 순 정렬
                arr.sort((a, b) => {
                    return +(a.nearPoint > b.nearPoint) || +(a.nearPoint === b.nearPoint) - 1;
                })
            },
            getJoinColumn : function(arr, value, colKey, colStr) {
                /* 
                    '배열 하나'와 '다른 배열의 키 값'을 받아 '특정 컬럼'을 반환하는 함수
                    arr: 비교할 배열
                    value: 비교할 키 값
                    colKey: 키 값 string
                    colStr: 꺼내야할 키값
                */
                let result = "";
                for(i = 0; i < arr.length; i++) {
                    if (arr[i][colKey] == value) {
                        result = arr[i];
                    }
                }
                return result[colStr];
            },
            getJoinObj : function(arr, value, colKey) {
                /* 
                    '배열 하나'와 '다른 배열의 키 값'을 받아 '특정 컬럼'의 객체를 반환하는 함수
                    arr: 비교할 배열
                    value: 비교할 키 값
                    colKey: 키 값 string
                */
                let result = "";
                for(i = 0; i < arr.length; i++) {
                    if (arr[i][colKey] == value) {
                        result = arr[i];
                    }
                }
                return result;
            },
            getJoinArr : function (arr, arr2, colKey, ...args) { 
                /*
                    배열 두개를 join하여 특정 컬럼을 합쳐 배열로 반환하는 함수
                    arr: 비교할 배열 1
                    arr2: 비교할 배열 2
                    colKey: 비교 할 수 있는 키 값 string
                    colStr: 객체에서 꺼내야할 프로퍼티 값
                */
                let result = [];
                if(Array.isArray(arr)) {
                    result = arr.map((rows) => {
                        const joinObj = this.getJoinObj(arr2, rows[colKey], colKey) ;
                        args.map((col) => {
                            rows[col] = joinObj[col];
                        })
                        return { ...rows }
                    })
                }
                return result;
            }, 
            findByIds : function(arr, arrStr, colKey) {
                let result = [];
                if(Array.isArray(arr) && Array.isArray(arrStr)) { 
                    result = arr.filter((element, index, array) => {
                        return arrStr.includes(element[colKey]);
                    })
                }
                return result;
            }, 
            getUniqObjFromArray : function(arr, param) {
                return arr.filter(function(element, index, array){
                    return array.map(function(mItem){ return mItem[param]; }).indexOf(element[param]) === index;
                })
            }
            // function uniq(a, param){
            //     return a.filter(function(item, pos, array){
            //         return array.map(function(mapItem){ return mapItem[param]; }).indexOf(item[param]) === pos;
            //     })
            // }
        }
    }

}();