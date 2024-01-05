function calculate() {
    const fromCurrency = document.getElementById('fromCurrency').value;
    const amount = parseFloat(document.getElementById('amount').value);
    if (!amount) {
        alert('請填入兌換金額！')
    } else {
        fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
            .then(function (res) {
                return res.json();
            })
            .then(function (data) {
                // 設定要兌換的幣值
                let toCurrencies = ["USD", "EUR", "JPY", "GBP", "CAD", "AUD", "CHF", "CNY", "TWD", "KRW"];
                // 過濾選取的幣值
                toCurrencies = toCurrencies.filter((e) => {
                    return e != fromCurrency;
                });

                // 清空表格
                var resultTableBody = document.getElementById("resultTableBody");
                resultTableBody.innerHTML = "";

                toCurrencies.forEach((toCurr) => {
                    const rate = data.rates[toCurr];
                    var convertedAmt = amount * rate;
                    addRow(resultTableBody, toCurr, rate, convertedAmt.toFixed(2));
                });

            });
    }
}

function addRow(tableBody, currency, rate, amount) {
    var row = tableBody.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    cell1.innerHTML = currency;
    cell2.innerHTML = amount;
    cell3.innerHTML = "1 ： " + rate;
}
