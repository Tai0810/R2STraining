export function formatCurrency(amount: number) {
  let formatAmount = "";
  while (amount > 999) {
    const temp = amount % 1000;
    const tempFormat =
      temp === 0
        ? ",000"
        : temp < 10
        ? `,00${temp}`
        : temp < 100
        ? `,0${temp}`
        : `,${temp}`;
    formatAmount = tempFormat + formatAmount;
    amount = Math.floor(amount / 1000);
  }
  if (amount > 0) {
    formatAmount = amount + formatAmount;
  }
  return amount === 0 ? "0" : formatAmount;
}

const regionalCode: Record<string, string> = {
  "+84": "VN",
  "+65": "SG",
  "+1": "US",
  "+353": "Ireland",
};

export function formatPhoneNumber(phone: string) {
  let currentRegionalCode = "";
  let i = 2;

  while (i <= 4) {
    currentRegionalCode = phone.substring(0, i);
    if (regionalCode[currentRegionalCode]) {
      break;
    }
    i++;
  }

  const phoneNumber = phone.substring(i);

  if (phoneNumber.length === 8) {
    return `(${currentRegionalCode}) ${phoneNumber.substring(
      0,
      4
    )} ${phoneNumber.substring(4)}`;
  }

  const head = `(${currentRegionalCode}) ${phoneNumber.substring(0, 3)}`;

  if (phoneNumber.length < 6) {
    return `${head} ${phoneNumber.substring(3, 6)}`;
  }

  return `${head} ${phoneNumber.substring(3, 6)} ${phoneNumber.substring(6)}`;
}

export function getTodo(
  currentTasks: Array<{ id: number; value: string }>,
  index?: number
) {
  if(!index || index < 0){
    return null
  }
  return currentTasks[index]
}
