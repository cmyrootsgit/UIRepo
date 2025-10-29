import { useSnackbar, OptionsObject, SnackbarMessage } from "notistack";
import { useEffect } from "react";

let snackbarRef: ((msg: SnackbarMessage, options?: OptionsObject) => void) | null = null;

export const setSnackbar = (enqueue: typeof snackbarRef) => {
  snackbarRef = enqueue;
};

export const showSnackbar = (msg: SnackbarMessage, options?: OptionsObject) => {
  if (snackbarRef) {
    snackbarRef(msg, options);
  } else {
    console.warn("Snackbar not initialized yet. Did you include <GlobalSnackbar /> inside <SnackbarProvider>?");
  }
};

export default function GlobalSnackbar() {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setSnackbar(enqueueSnackbar);
  }, [enqueueSnackbar]);

  return null; 
}
