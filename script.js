function calculatePurchase() {
    const amount = parseFloat(document.getElementById('purchase-amount').value) || 0;
    const baseCoins = amount; // R$ 1,00 = 1 coin
    const hasCoupon = document.getElementById('coupon-bonus').checked;
    
    let bonusPercentage = 0;
    let bonusText = '0%';
    
    // Aplicar bonificações baseadas no valor em reais
    if (amount >= 150) {
        bonusPercentage = 0.10;
        bonusText = '10%';
    } else if (amount >= 100) {
        bonusPercentage = 0.05;
        bonusText = '5%';
    }
    
    // Adicionar bonificação do cupom (pode ser usado em qualquer valor)
    if (hasCoupon) {
        bonusPercentage += 0.05;
        if (bonusText === '0%') {
            bonusText = '5%';
        } else {
            const totalBonus = Math.round(bonusPercentage * 100);
            bonusText = `${totalBonus}%`;
        }
    }
    
    const bonusCoins = Math.floor(baseCoins * bonusPercentage);
    const totalCoins = baseCoins + bonusCoins;
    const costPerCoin = amount > 0 ? amount / totalCoins : 1;
    
    // Atualizar display
    document.getElementById('base-coins').textContent = Math.floor(baseCoins);
    document.getElementById('bonus-applied').textContent = bonusText;
    document.getElementById('bonus-coins').textContent = bonusCoins;
    document.getElementById('coins-received').textContent = Math.floor(totalCoins);
    document.getElementById('cost-per-coin').textContent = totalCoins > 0 ? `R$ ${costPerCoin.toFixed(2)}` : 'R$ 1,00';
    
    // Atualizar dica
    const tipElement = document.getElementById('discount-tip');
    if (amount === 0) {
        tipElement.textContent = 'Insira um valor para calcular!';
    } else if (amount < 100) {
        const needed = 100 - amount;
        tipElement.textContent = `Compre mais R$ ${needed.toFixed(2)} para 5% de bonificação base!`;
    } else if (amount < 150) {
        const needed = 150 - amount;
        if (hasCoupon) {
            tipElement.textContent = `Compre mais R$ ${needed.toFixed(2)} para 15% total de bonificação!`;
        } else {
            tipElement.textContent = `Ative o cupom para 10% total ou compre mais R$ ${needed.toFixed(2)} para 10% base!`;
        }
    } else {
        if (hasCoupon) {
            tipElement.textContent = '🎉 Parabéns! Você tem a máxima bonificação (15%)!';
        } else {
            tipElement.textContent = '💡 Ative o cupom para 15% total de bonificação!';
        }
    }
}

function calculatePlayerPurchase() {
    const coins = parseFloat(document.getElementById('player-coins').value) || 0;
    const price = parseFloat(document.getElementById('player-price').value) || 0;
    
    if (coins === 0 || price === 0) {
        // Reset display if any field is empty
        document.getElementById('player-cost-per-coin').textContent = 'R$ 0,00';
        document.getElementById('player-discount').textContent = '0%';
        document.getElementById('player-savings').textContent = 'R$ 0,00';
        document.getElementById('official-equivalent').textContent = 'R$ 0,00';
        document.getElementById('player-tip').textContent = 'Insira os valores para calcular o preço unitário!';
        return;
    }
    
    const costPerCoin = price / coins;
    const officialPrice = coins * 1.00; // Preço oficial sem bonificações (R$ 1,00 por coin)
    const discount = ((1.00 - costPerCoin) / 1.00) * 100;
    const savings = officialPrice - price;
    
    // Atualizar display
    document.getElementById('player-cost-per-coin').textContent = `R$ ${costPerCoin.toFixed(4)}`;
    document.getElementById('player-discount').textContent = `${discount.toFixed(1)}%`;
    document.getElementById('player-savings').textContent = `R$ ${savings.toFixed(2)}`;
    document.getElementById('official-equivalent').textContent = `R$ ${officialPrice.toFixed(2)}`;
    
    // Atualizar dica
    const tipElement = document.getElementById('player-tip');
    if (discount > 0) {
        tipElement.textContent = `Ótimo negócio! Você economiza ${discount.toFixed(1)}% comprando de jogadores.`;
    } else if (discount < 0) {
        tipElement.textContent = `Cuidado! Está pagando ${Math.abs(discount).toFixed(1)}% a mais que o preço oficial.`;
    } else {
        tipElement.textContent = 'Preço igual ao oficial. Considere as bonificações da loja oficial.';
    }
}

function calculateGPConversion() {
    const coinsBought = parseFloat(document.getElementById('coins-bought').value) || 0;
    const realPaid = parseFloat(document.getElementById('real-paid').value) || 0;
    const gpPerCoin = parseFloat(document.getElementById('gp-per-coin').value) || 0;
    
    if (coinsBought === 0 || realPaid === 0 || gpPerCoin === 0) {
        // Reset display if any field is empty
        document.getElementById('real-cost-per-coin').textContent = 'R$ 0,00';
        document.getElementById('total-gp-obtained').textContent = '0 GP';
        document.getElementById('cost-1000-gp').textContent = 'R$ 0,00';
        document.getElementById('cost-1-gp').textContent = 'R$ 0,0000';
        return;
    }
    
    const realCostPerCoin = realPaid / coinsBought;
    const totalGPObtained = coinsBought * gpPerCoin;
    const costPer1000GP = (realPaid / totalGPObtained) * 1000;
    const costPer1GP = realPaid / totalGPObtained;
    
    // Atualizar display
    document.getElementById('real-cost-per-coin').textContent = `R$ ${realCostPerCoin.toFixed(2)}`;
    document.getElementById('total-gp-obtained').textContent = `${totalGPObtained.toLocaleString()} GP`;
    document.getElementById('cost-1000-gp').textContent = `R$ ${costPer1000GP.toFixed(2)}`;
    document.getElementById('cost-1-gp').textContent = `R$ ${costPer1GP.toFixed(4)}`;
}

// Event listeners
document.getElementById('purchase-amount').addEventListener('input', calculatePurchase);
document.getElementById('coupon-bonus').addEventListener('change', calculatePurchase);
document.getElementById('player-coins').addEventListener('input', calculatePlayerPurchase);
document.getElementById('player-price').addEventListener('input', calculatePlayerPurchase);
document.getElementById('coins-bought').addEventListener('input', calculateGPConversion);
document.getElementById('real-paid').addEventListener('input', calculateGPConversion);
document.getElementById('gp-per-coin').addEventListener('input', calculateGPConversion);

// Calcular valores iniciais
calculatePurchase();
calculatePlayerPurchase();
calculateGPConversion();