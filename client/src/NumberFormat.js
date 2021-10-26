
export const NumberFormat = (value) =>
new Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD'
}).format(value);