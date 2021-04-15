export default helper = function () {
    return {
        test: function (a, b) {
            // something...
        },
        findRestLocations: function (data, column) {
            var pipeline = [this.getColumnFromArray, this.getUniqueItems]
            var result = pipeline.reduce((total, func) => {
                return func(total, column)
            }, data)
            return result;
        },
        getColumnFromArray: function (array, column) {
            return array.map(e => {
                return typeof e[column] !== 'undefined' && e[column]
            })
        },
        getColumnFromArray2: function(arr, value, colKey){
            const result = "";
            for(i = 0; i < arr.length; i++) {
                if (arr[i][colKey] == value) {
                    result = arr[i][colKey]
                }
            }
            return result;
        },
        getUniqueItems: function(array) {
            return array.filter((e, i, self) => {
                return self.indexOf(e) === i
            });
        },
        addPropertyToArray: function (arr, arr2, colStr, colKey) { //p1 => 내위치
            // 위치 속성 삽입
            return arr.map((rows) => {
                rows[colStr] = this.this.getColumnFromArray2(arr2, rows[colKey], colKey ) ;
                return { ...rows }
            })
        }
    }
}();