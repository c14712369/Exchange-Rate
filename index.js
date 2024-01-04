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
        });
}

const chineseNames = {
    USD: '美元',
    EUR: '歐元',
    JPY: '日圓',
    GBP: '英鎊',
    CAD: '加拿大元',
    AUD: '澳大利亞元',
    CHF: '瑞士法郎',
    CNY: '人民幣',
    SEK: '瑞典克朗',
    NZD: '新西蘭元',
};

const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');

// 生成選項並加入 select 元素
for (const currencyCode in chineseNames) {
    const option = document.createElement('option');
    option.value = currencyCode;
    option.text = chineseNames[currencyCode];
    fromCurrencySelect.add(option);

    const option2 = document.createElement('option');
    option2.value = currencyCode;
    option2.text = chineseNames[currencyCode];
    toCurrencySelect.add(option2);
}
