export function monthToLT(month: string): string {
  switch (month) {
    case "January":
      return "Sausio";
    case "February":
      return "Vasario";
    case "March":
      return "Kovo";
    case "April":
      return "Balandžio";
    case "May":
      return "Gegužės";
    case "June":
      return "Birželio";
    case "July":
      return "Liepos";
    case "August":
      return "Rugpjūčio";
    case "September":
      return "Rugsėjo";
    case "October":
      return "Spalio";
    case "November":
      return "Lapkričio";
    case "December":
      return "Gruodžio";
    default:
      return "nera";
  }
}
