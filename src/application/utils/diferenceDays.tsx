export function handleDaysDifference(currentDay: Date, lastDay: Date) {
  let diff = currentDay.getTime() - lastDay.getTime();
  let daysDifference = Math.round(diff / (1000 * 60 * 60 * 24)); //Diferencia en dia
  return daysDifference;
}

export const getExpiresAt = (expires_in: string): string => {
  let today = new Date();
  let expires_in_milliseconds = Number.parseInt(expires_in, 10) * 1000;
  let expires_at = new Date(today.getTime() + expires_in_milliseconds);
  return `${expires_at}`;
};
