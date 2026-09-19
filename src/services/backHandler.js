/**
 * Centralized Stack-Based Back Handler Registry
 * Allows active modals, camera viewfinders, and sheets to intercept the
 * hardware/system Android Back button before screen-level navigation happens.
 */
const backHandlers = [];

export function registerBackHandler(handler) {
  backHandlers.push(handler);
  return () => {
    const index = backHandlers.lastIndexOf(handler);
    if (index !== -1) {
      backHandlers.splice(index, 1);
    }
  };
}

export function triggerBack() {
  for (let i = backHandlers.length - 1; i >= 0; i--) {
    const handler = backHandlers[i];
    try {
      if (handler()) {
        return true;
      }
    } catch (e) {
      console.warn("Back handler execution error:", e);
    }
  }
  return false;
}
