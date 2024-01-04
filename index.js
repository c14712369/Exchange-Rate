function calculate() {
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const amount = parseFloat(document.getElementById('amount').value);

    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            const rate = data.rates[toCurrency];
            document.getElementById('rate').innerHTML = `1 ${fromCurrency} = ${rate} ${toCurrency}`;
            document.getElementById('result').innerHTML = `兌換結果：${(amount * rate).toFixed(4)} ${toCurrency}`;

            // 清空結果表格
            var resultTableBody = document.getElementById("resultTableBody");
            resultTableBody.innerHTML = "";

            // 添加兌換結果行
            addRow(resultTableBody, fromCurrency, amount);

            // 添加其他幣值的兌換結果行
            var toCurrencies = ["USD", "EUR", "JPY"];  // 添加其他常用幣值
            toCurrencies.forEach(function(toCurr) {
                if (toCurr !== fromCurrency) {
                    var convertedAmt = amount * rate;
                    addRow(resultTableBody, toCurr, convertedAmt.toFixed(2));
                }
            });
        });
}

function addRow(tableBody, currency, amount) {
    var row = tableBody.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = currency;
    cell2.innerHTML = amount;
}
