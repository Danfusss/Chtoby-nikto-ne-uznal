<script>
// @ts-nocheck

  import { onMount } from 'svelte';

  let exchangeRates = {};
  let baseCurrency = 'USD';
  let targetCurrency = 'EUR';
  let conversionAmount = 0;
  let convertedAmount = 0;

  function fetchExchangeRates() {
    fetch(`https://open.er-api.com/v6/latest/${baseCurrency}?api_key=f9f6105255e540829e4c6687`)
      .then(response => {
        const reader = response.body.getReader();
        return reader.read();
      })
      .then(result => {
        const decoder = new TextDecoder('utf-8');
        const data = decoder.decode(result.value);
        const parsedData = JSON.parse(data);
        exchangeRates = parsedData.rates;
        updateConvertedAmount();
      })
      .catch(error => {
        console.error('Error fetching exchange rates:', error);
      });
  }

  function handleBaseCurrencyChange(event) {
    baseCurrency = event.target.value;
    fetchExchangeRates();
  }

  function handleTargetCurrencyChange(event) {
    targetCurrency = event.target.value;
    updateConvertedAmount();
  }

  function handleConversionAmountInput(event) {
    conversionAmount = Number(event.target.value);
    updateConvertedAmount();
  }

  function updateConvertedAmount() {
    convertedAmount = conversionAmount * (exchangeRates[targetCurrency] / exchangeRates[baseCurrency]);
  }

  onMount(fetchExchangeRates);
</script>

<h1>Мой первый код на Svelte</h1>

<select bind:value={baseCurrency} on:change={handleBaseCurrencyChange}>
  <option value="USD">USD</option>
  <option value="EUR">EUR</option>
  <option value="RUB">RUB</option>
  <option value="AUD">AUD</option>
  <option value="CHF">CHF</option>
  <option value="CNY">CNY</option>
  <option value="GBP">GBP</option>
  <option value="BZD">BZD</option>
  <option value="RUB">RUB</option>

</select>

<select bind:value={targetCurrency} on:change={handleTargetCurrencyChange}>
  <option value="EUR">EUR</option>
  <option value="USD">USD</option>
  <option value="RUB">RUB</option>
  <option value="CHF">CHF</option>
  <option value="CNY">CNY</option>
  <option value="GBP">GBP</option>
  <option value="BZD">BZD</option>
  <option value="RUB">RUB</option>
</select>

<input type="number" bind:value={conversionAmount} on:input={handleConversionAmountInput}>

<p>Конвертированная валюта: {convertedAmount.toFixed(2)}</p>