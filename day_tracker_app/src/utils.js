export function currencyFormatter(time) {
  var hours = 0
  while(time > 60){
    hours += 1
    time -= 60
  }
  if (hours > 0) return hours + "h " + time + "m"
  return time + "m"
}