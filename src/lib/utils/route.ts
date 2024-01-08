import { browser } from '$app/environment';
import { goto } from '$app/navigation';

function to(path: string): void {
  if (browser) goto(path);
}
function back(): void {
  if (browser) history.back();
}

export {
  to,
  back,
};